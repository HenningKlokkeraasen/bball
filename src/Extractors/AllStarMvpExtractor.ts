/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />
/// <reference path="../BballAliasFinder.ts" />
/// <reference path="../BballPlayerFactory.ts" />

class AllStarMvpExtractor {
    _latestYearRead: number;

	mapTableOfPlayersToArray = (content: string) => {
		var html = $.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
        
		var self = this;
        var rows = ExtractorHelper.prototype.extractRowsFromTable(html, 'Season');
        rows.forEach(row => self.extractPlayerFromRow(row, arrayOfPlayerObjects));
        
		return arrayOfPlayerObjects;
	}
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        // For multiple winners in a season, first cell of the first winner has rowspan=2
        // so for the second winner there is no cell with the year
        var numberOfCells = $(tr).children().length;
        var rowIsTheSecondWinnerOfAYearWithMultipleWinners = numberOfCells === 4;

        var firstCell = $(tr).children()[0];
        var year;
        if (!rowIsTheSecondWinnerOfAYearWithMultipleWinners) {
            var yearText = $(firstCell).text();
            var yearTextWithoutFootnote = yearText.substr(0, 4);
            year = parseInt(yearTextWithoutFootnote);
            this._latestYearRead = year;
        }
        else {
            year = this._latestYearRead;
        }

        // Special case for lockout in 1999
        if (year === 1999)
            return;
        
        var playerCellIndex = rowIsTheSecondWinnerOfAYearWithMultipleWinners ? 0 : 1;
        var positionCellIndex = rowIsTheSecondWinnerOfAYearWithMultipleWinners ? 1: 2;

        var playerCell = $(tr).children()[playerCellIndex];
        var playerValues = ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(playerCell);

        var positionCell = $(tr).children()[positionCellIndex];
        var position = $(positionCell).text();
        
        var player = arrayOfPlayerObjects.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, playerValues.id));
        if (player) {
            player.numberOfTimesAllStarMvp = player.numberOfTimesAllStarMvp + 1;
            if (player.allStarMvpYears === undefined)
                player.allStarMvpYears = new Array<number>();
            player.allStarMvpYears.push(year);
            BballPlayerFactory.prototype.addAliases({ id: playerValues.id, name: playerValues.name, position: null }, player);
        }
        else {
            arrayOfPlayerObjects.push({
                id: playerValues.id,
                name : playerValues.name,
                position : position,
                numberOfTimesAllStarMvp : 1,
                allStarMvpYears: [year]
            });
        }
    }
}
