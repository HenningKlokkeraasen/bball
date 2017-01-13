class PlayerStatsExtractor {
    
    hasPlayerStatsTable(html) {
        // TODO make more robust
        return $(html).text().indexOf('Player stats') > -1;
        // return $(html).find('.wikitable').length > 0;
    }

    extractRowsFromPlayerStatsTable(html) {
        var rows = new Array();
        var tables = $(html).find('tbody');
        $.each(tables, function(i, tbody) {
            var tr = $(tbody).children()[0];
            var th = $(tr).children()[0];
            if ($(th).text().indexOf('Player') > -1) {
                $.each($(tbody).find('tr'), function(j, tr) {
                    if (j > 0)
                        rows.push(tr);
                });
            }
        });
        return rows;
    }

    extractPlayerFromRowInPlayerStatsTable(tr) {
        var firstCell = $(tr).children()[0];
        var playerValues = ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(firstCell);
        
        return {
            id: playerValues.id,
            name : playerValues.name,
            numberOfNbaChampionships : 1,
            nbaChampionshipYears: [0] // todo
        };
    }
}