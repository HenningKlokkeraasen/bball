var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        return parsedCsv.slice(self.numberOfHeaderRows).map(self.mapToPlayer);
    },

    numberOfHeaderRows: 2,

    mapToPlayer: function(rowArr) {
        var player = rowArr[0];
        var playerValues = player.split('\\');
        var name = playerValues[0];
        var id = playerValues[1];
        return { id: id, name: name, isOnFiftyGreatestList: true }
    }
}