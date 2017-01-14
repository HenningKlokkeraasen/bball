const mappingUtils = require('./mappingUtils.js');

var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        return parsedCsv.slice(self.numberOfHeaderRows).map(self.mapToPlayer);
    },

    numberOfHeaderRows: 1,

    mapToPlayer: function(rowArr) {
        var player = rowArr[0];
        var playerValues = player.split('\\');
        var name = playerValues[0];
        var id = mappingUtils.generateAssumedId(name.split(' '));
        return { id: id, name: name, isOnDreamTeam: true }
    }
}