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
            var season = a[0];
            var player = a[2];
            var playerValues = player.split('\\');
            var name = playerValues[0];
            var id = playerValues[1];
            return { id: id, name: name, season: season }
        });

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