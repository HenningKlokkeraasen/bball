var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapMvpishCsvToJson: function(parsedCsv, buildObject) {
        var mapped = self.mapMvpishCsvData(parsedCsv);
        var distinct = self.distinctMvpishObjects(mapped);
        var final = distinct.map(buildObject);
        return final;
    },

    // Maps CSV data on the format Season,League,Player,...
    mapMvpishCsvData: function(parsedCsv) {
        const numberOfHeaderRows = 2;
        var twoDimArr = parsedCsv.slice(numberOfHeaderRows);
        var mapped = twoDimArr.map(function(rowArr) {
            var season = rowArr[0];
            var player = rowArr[2];
            var playerValues = player.split('\\');
            var name = playerValues[0];
            var id = playerValues[1];
            return { id: id, name: name, season: season }
        });
        return mapped;
    },

    distinctMvpishObjects: function(notNormalizedArray) {
        var unique = [];
        notNormalizedArray.forEach(function(m) {
            var existing = unique.find(e => e.id === m.id);
            if (existing) {
                existing.numberOfTimes += 1;
                existing.seasons.push(m.season);
            } else {
                unique.push( { id: m.id, name: m.name, numberOfTimes: 1, seasons: [m.season] } );
            }
        });
        return unique;
    }
}