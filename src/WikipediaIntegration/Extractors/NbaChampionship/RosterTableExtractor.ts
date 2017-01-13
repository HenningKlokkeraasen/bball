/// <reference path="../../../../ts-dts/jquery.d.ts" />
/// <reference path="../ExtractorHelper.ts" />

class RosterTableExtractor {
    
    extractPlayerFromRowInRosterTable(tr) {
        var firstCell = $(tr).children()[0];
        var position = $(firstCell).find('a').text();
        
        var thirdCell = $(tr).children()[2];
        var fourthCell = $(tr).children()[3];
        var playerCell = $(thirdCell).html().indexOf('img') > -1 ? fourthCell : thirdCell;
        var playerValues = ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(playerCell);
        // In Roster tables players are listed with "Surname, Lastname" format
        if (playerValues.name.indexOf(', ') > 1) {
            var names = playerValues.name.split(', ');
            var name = `${names[1].trim()} ${names[0].trim()}`;
            playerValues.name = name;
        }
        
        return {
            id: playerValues.id,
            name : playerValues.name,
            position : position,
            numberOfNbaChampionships : 1,
            nbaChampionshipYears: [0] // todo
        };
    }

    hasRosterTable(html) {
        // TODO make more robust
        return $(html).find('table.sortable').length > 0;
    }

    extractRowsFromRosterTable(html) {
        var rows = new Array();
        var tables = $(html).find('table.sortable');
        $.each(tables, function(i, table) {
            var tbody = $(table).find('tbody')[0];
            var tr = $(tbody).find('tr')[0];
            var th = $(tr).find('th')[0];
            if ($(th).text().indexOf('Pos.') > -1) {
                // console.debug('found');
                $.each($(tbody).children(), function(j, tr) {
                    if (j > 0)
                        rows.push(tr);
                });
            } else {
            }
        });
        return rows;
    }
}