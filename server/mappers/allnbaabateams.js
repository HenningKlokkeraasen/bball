const mappingUtils = require('./mappingUtils.js');

var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        var players = parsedCsv.slice(self.numberOfHeaderRows).map(self.mapToPlayers).reduce(self.flatten, []);
        return self.distinctObjects(players);
    },

    numberOfHeaderRows: 1,

    distinctObjects: function(notNormalizedArray) {
        var unique = [];
        notNormalizedArray.forEach(function(m) {
            var existing = unique.find(e => e.id === m.id);
            if (existing) {
                if (m.team === '1st' && m.league === 'NBA') {
                    if (existing.numberOfTimesAllNbaFirstTeam) {
                        existing.numberOfTimesAllNbaFirstTeam += 1;
                        existing.allNbaFirstTeamSeasons.push(m.season);
                    } else {
                        existing.numberOfTimesAllNbaFirstTeam = 1;
                        existing.allNbaFirstTeamSeasons = [m.season];
                    }
                }
                else if (m.team === '2nd' && m.league === 'NBA') {
                    if (existing.numberOfTimesAllNbaSecondTeam) {
                        existing.numberOfTimesAllNbaSecondTeam += 1;
                        existing.allNbaSecondTeamSeasons.push(m.season);
                    } else {
                        existing.numberOfTimesAllNbaSecondTeam = 1;
                        existing.allNbaSecondTeamSeasons = [m.season];
                    }
                }
                else if (m.team === '3rd' && m.league === 'NBA') {
                    if (existing.numberOfTimesAllNbaThirdTeam) {
                        existing.numberOfTimesAllNbaThirdTeam += 1;
                        existing.allNbaThirdTeamSeasons.push(m.season);
                    } else {
                        existing.numberOfTimesAllNbaThirdTeam = 1;
                        existing.allNbaThirdTeamSeasons = [m.season];
                    }
                }
            } else {
                var obj = { id: m.id, name: m.name };
                if (m.team === '1st' && m.league === 'NBA') {
                    obj.numberOfTimesAllNbaFirstTeam = 1;
                    obj.allNbaFirstTeamSeasons = [m.season];
                }
                else if (m.team === '2nd' && m.league === 'NBA') {
                    obj.numberOfTimesAllNbaSecondTeam = 1;
                    obj.allNbaSecondTeamSeasons = [m.season];
                }
                else if (m.team === '3rd' && m.league === 'NBA') {
                    obj.numberOfTimesAllNbaThirdTeam = 1;
                    obj.allNbaThirdTeamSeasons = [m.season];
                }
                unique.push(obj);
            }
        });
        return unique;
    },

    mapToPlayers: function(rowArr) {
        var season = rowArr[0];
        var league = rowArr[1];
        var team = rowArr[2];
        var players = self.getPlayers(rowArr);
        var mapped = players.map(function(p) { 
            return { 
                id: mappingUtils.generateAssumedId(p.name.split(' ')), 
                name: p.name, 
                position: p.position, 
                season: season, 
                league: league, 
                team: team
            };
        });
        return mapped;
    },

    getPlayers: function(rowArr) {
        return rowArr.slice(3, 8).map(self.getPlayerArray).reduce(self.flatten, []);
    },

    flatten: (acc, cur) => acc.concat(cur),

    getPlayerArray: function(cell) {
        if (cell.indexOf('(T)') > -1) {
            return self.getPlayersWhenTied(cell);
        }
        else {
            var player = cell.substring(0, cell.length - 2);
            var position = cell.substring(cell.length, cell.length - 1);
            return [ { name: player, position: position } ];
        }
    },

    getPlayersWhenTied: function(cell) {
        var regex = /\s[\w]{1}\s/; // matches the two " C " instances in "Dan Issel C Zelmo Beaty C (T)"
        var players = cell.split(regex);
        var playerA = players[0];
        var playerB = players[1];
        var positionA = cell.substring(playerA.length + 1, playerA.length + 2);
        var positionB = cell.substring(cell.length - 5, cell.length - 4);
        return [
            { name: playerA, position: positionA },
            { name: playerB, position: positionB }
        ];
    }
}