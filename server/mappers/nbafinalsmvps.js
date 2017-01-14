const mappingUtils = require('./mappingUtils.js');

module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        // console.log(parsedCsv);
        var mapped = mappingUtils.mapMvpishCsvData(parsedCsv);

        var unique = [];
        mapped.forEach(function(m) {
            var existing = unique.find(e => e.id === m.id);
            if (existing) {
                existing.numberOfTimesFinalsMvp += 1;
                existing.finalsMvpSeasons.push(m.season);
            } else {
                unique.push( { id: m.id, name: m.name, numberOfTimesFinalsMvp: 1, finalsMvpSeasons: [m.season] } );
            }
        });
        return unique;
    }
}