/// <reference path="../../../../ts-dts/jquery.d.ts" />
/// <reference path="../ExtractorHelper.ts" />

class DepthChartExtractor {
    extractPlayersFromRowInDepthChart(tr) {
        var firstCell = $(tr).children()[0];
        var position = $(firstCell).find('a').text();

        var players = new Array();

        var starterCellValues = DepthChartExtractor.prototype.extractPlayerFromCellIfApplicable(tr, 1);
        if (starterCellValues)
            players.push({ id: starterCellValues.id, name: starterCellValues.name, position: position});

        var benchCellValues = DepthChartExtractor.prototype.extractPlayerFromCellIfApplicable(tr, 2);
        if (benchCellValues)
            players.push({ id: benchCellValues.id, name: benchCellValues.name, position: position});

        var reserveCellValues = DepthChartExtractor.prototype.extractPlayerFromCellIfApplicable(tr, 3);
        if (reserveCellValues)
            players.push({ id: reserveCellValues.id, name: reserveCellValues.name, position: position});

        var inactiveCellValues = DepthChartExtractor.prototype.extractPlayerFromCellIfApplicable(tr, 4);
        if (inactiveCellValues)
            players.push({ id: inactiveCellValues.id, name: inactiveCellValues.name, position: position});

        return players;
    }

    extractPlayerFromCellIfApplicable(tr, cellIndex) {
        var cell = $(tr).children()[cellIndex];
        if ($(cell).text().length > 0)
            return ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(cell);
        return undefined;
    }

    hasDepthChart(html) {
        return $(html).text().indexOf('Depth chart') > -1;
    }

    extractRowsFromDepthChart(html) {
        var tbodys = $(html).find('tbody');
        var rows = new Array();
        $.each(tbodys, function(i, tbody) {
            if ($(tbody).find('th').text().indexOf('Starter') > -1) {
                $.each($(tbody).children(), function(j, tr) {
                    if (j > 0)
                        rows.push(tr);
                });
            }
        });
        return rows;
    }
}