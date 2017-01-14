module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        // console.log(parsedCsv);
        const numberOfHeaderRows = 2;
        var arr = parsedCsv.slice(numberOfHeaderRows);
        var mapped = arr.map(function(a) {
            var player = a[0];
            var playerValues = player.split('\\');
            var name = playerValues[0];
            var id = playerValues[1];
            return { id: id, name: name, isOnFiftyGreatestList: true }
        });
        return mapped;
    }
}