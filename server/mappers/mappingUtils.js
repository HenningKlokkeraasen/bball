module.exports = {

    // Maps CSV data on the format Season,League,Player,...
    mapMvpishCsvData: function(parsedCsv) {
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
        return mapped;
    }
}