/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />

class MvpExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) {
        
    }
	
	mapTableOfPlayersToArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
        
		var that = this;
		this.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
                var tbody = that.jQuery(child).children()[0];
                var tr = that.jQuery(tbody).children()[0];
                var cell = that.jQuery(tr).children()[0];
                var text = cell.innerText
                if (text == 'Season')
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
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<MvpPlayer>) {
        var firstCell = this.jQuery(tr).children()[0];
        var season = this.jQuery(firstCell).text();
        
        var secondCell = this.jQuery(tr).children()[1];
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(secondCell);
        
        var thirdCell = this.jQuery(tr).children()[2];
        var position = this.jQuery(thirdCell).text();
        
        if (arrayOfPlayerObjects[playerValues.id] != undefined) {
            arrayOfPlayerObjects[playerValues.id].numberOfTimesMvp = arrayOfPlayerObjects[playerValues.id].numberOfTimesMvp + 1;
        }
        else {
            arrayOfPlayerObjects[playerValues.id] = {
                'name' : playerValues.name,
                'position' : position,
                'numberOfTimesMvp' : 1
            };
        }
    }
}
