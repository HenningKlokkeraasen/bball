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
        var rank = rowArr[0]
        var player = rowArr[1];
        var playerValues = player.split('\\');
        var name = playerValues[0];
        var id = playerValues[1];
        return { id: id, name: name, simmonsHofPyramidRank: rank }
    }
}