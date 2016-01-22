/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />

class HallOfFameExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) {
        
    }
    
    mapTableOfPlayersToArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
        
		var that = this
		this.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
                
                
                
                
                
                
				that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
					if (j > 0) {
                        that.extractPlayerFromRow(tr, arrayOfPlayerObjects);
					}
				});
			}
		});
        
        
		return arrayOfPlayerObjects;
    }
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<HallOfFamePlayer>) {
        var firstCell = this.jQuery(tr).children()[0];
        var year = this.jQuery(firstCell).text();
        
        var secondCell = this.jQuery(tr).children()[1];
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(secondCell);
        
        var thirdCell = this.jQuery(tr).children()[2];
        var position = this.jQuery(thirdCell).text();
        
        
        
        
        
        arrayOfPlayerObjects[playerValues.id] = {
            'name' : playerValues.name,
            'position' : position,
            'yearInducted' : year
        };
        
    }
}
