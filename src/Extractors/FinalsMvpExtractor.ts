/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />
/// <reference path="../BballAliasFinder.ts" />
/// <reference path="../BballPlayerFactory.ts" />

class FinalsMvpExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) { }
	
	mapTableOfPlayersToArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
        
		var that = this;
		that.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
                var tbody = that.jQuery(child).children()[0];
                var tr = that.jQuery(tbody).children()[0];
                var cell = that.jQuery(tr).children()[0];
                var text = cell.innerHTML;
                if (text == 'Year')
                {
                    that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
                        if (j > 0) {
                            that.extractPlayerFromRow(tr, arrayOfPlayerObjects);
                        }
                    });
                }
			}
		});
        
		return arrayOfPlayerObjects;
	}
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        var firstCell = this.jQuery(tr).children()[0];
        var year = this.jQuery(firstCell).text();
        
        var secondCell = this.jQuery(tr).children()[1];
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(secondCell);
        
        var thirdCell = this.jQuery(tr).children()[2];
        var position = this.jQuery(thirdCell).text();
        
        var player = arrayOfPlayerObjects.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, playerValues.id));
        if (player) {
            player.numberOfTimesFinalsMvp = player.numberOfTimesFinalsMvp + 1;
            if (player.finalsMvpYears === undefined)
                player.finalsMvpYears = new Array<number>();
            player.finalsMvpYears.push(year);
            BballPlayerFactory.prototype.addAliases({ id: playerValues.id, name: playerValues.name, position: null }, player);
        }
        else {
            arrayOfPlayerObjects.push({
                id: playerValues.id,
                name : playerValues.name,
                position : position,
                numberOfTimesFinalsMvp : 1,
                finalsMvpYears: [year]
            });
        }
    }
}
