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
                existing.numberOfTimesMvp += 1;
                existing.mvpSeasons.push(m.season);
            } else {
                unique.push( { id: m.id, name: m.name, numberOfTimesMvp: 1, mvpSeasons: [m.season] } );
            }
        });
        return unique;
    }
}