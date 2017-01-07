/// <reference path="ExtractorHelper.ts" />
/// <reference path="../../Definitions.ts" />
/// <reference path="../../BballAliasFinder.ts" />
/// <reference path="../../BballPlayerFactory.ts" />

class MvpExtractor implements IWikipediaExtractor {
	extractBballPlayerArray = (content: string) => {
		var html = $.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
        
		var self = this;
        var rows = ExtractorHelper.prototype.extractRowsFromWikiTable(html, 'Season');
        rows.forEach(row => self.extractPlayerFromRow(row, arrayOfPlayerObjects));
        
		return arrayOfPlayerObjects;
	}
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        var firstCell = $(tr).children()[0];
        var season = $(firstCell).text();
        
        var secondCell = $(tr).children()[1];
        var playerValues = ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(secondCell);
        
        var thirdCell = $(tr).children()[2];
        var position = $(thirdCell).text();
        
        var player = arrayOfPlayerObjects.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, playerValues.id));
        if (player) {
            player.numberOfTimesMvp = player.numberOfTimesMvp + 1;
            if (player.mvpSeasons === undefined)
                player.mvpSeasons = new Array<string>();
            player.mvpSeasons.push(season);
            BballPlayerFactory.prototype.addAliases({ id: playerValues.id, name: playerValues.name, position: null }, player);
        }
        else {
            arrayOfPlayerObjects.push({
                id: playerValues.id,
                name : playerValues.name,
                position : position,
                numberOfTimesMvp : 1,
                mvpSeasons: [season]
            });
        }
    }
}
