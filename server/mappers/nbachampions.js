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

    numberOfHeaderRows: 1,

    mapToPlayer: function(rowArr, additionalData) {
        var number = rowArr[0];
        var player = rowArr[1];
        var playerValues = player.split('\\');
        var name = playerValues[0];
        var id = playerValues[1];
        var position = rowArr[2];
        return { id: id, name: name, position: position, nbaChampYear: additionalData }
    },

    combine: function(bunchOfPlayers) {
        var combinedPlayers = [];
        bunchOfPlayers.forEach(function(stringified) {
            // TODO get before JSON.stringify in dataProvider to avoid ser-deser-ser
            var arrayOfPlayers = JSON.parse(stringified);
            arrayOfPlayers.forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => p.id === player.id);
                if (existingPlayer === undefined)
                    combinedPlayers.push({
                        id: player.id, 
                        name: player.name, 
                        position: player.position, 
                        numberOfNbaChampionships: 1, 
                        nbaChampionshipYears: [player.nbaChampYear] });
                else {
                    existingPlayer.numberOfNbaChampionships += 1;
                    existingPlayer.nbaChampionshipYears.push(player.nbaChampYear);
                }
            });
        });
        return combinedPlayers;
    }
}