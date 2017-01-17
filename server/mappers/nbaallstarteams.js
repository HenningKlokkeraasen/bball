const mappingUtils = require('./mappingUtils.js');

var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv, additionalData) {
        return parsedCsv.slice(self.numberOfHeaderRows).map(rowArr => self.mapToPlayer(rowArr, additionalData));
    },

    numberOfHeaderRows: 2,

    mapToPlayer: function(rowArr, additionalData) {
        if (rowArr[0] === 'Player' || rowArr[0] === 'Starters' || rowArr[0] === 'Reserves' || rowArr[0] === 'Team Totals' || rowArr[1] === 'Totals')
            return undefined;
        
        var player = rowArr[0];
        var playerValues = player.split('\\');
        var name = playerValues[0];
        var id = playerValues[1];
        return { id: id, name: name, nbaAllStarYear: additionalData }
    },

    combine: function(bunchOfPlayers) {
        var combinedPlayers = [];
        bunchOfPlayers.forEach(function(arrayOfPlayers) {
            arrayOfPlayers.filter(p => p !== undefined && p !== null).forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => p.id === player.id);
                if (existingPlayer === undefined)
                    combinedPlayers.push({
                        id: player.id, 
                        name: player.name, 
                        position: player.position, 
                        allStarAppearanceCount: 1, 
                        allStarAppearanceYears: [player.nbaAllStarYear] });
                else {
                    existingPlayer.allStarAppearanceCount += 1;
                    existingPlayer.allStarAppearanceYears.push(player.nbaAllStarYear);
                }
            });
        });
        return combinedPlayers;
    }
}