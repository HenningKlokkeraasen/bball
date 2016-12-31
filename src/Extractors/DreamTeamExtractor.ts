/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />



class DreamTeamExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) { }
    
    mapTableOfPlayersToArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
		var found = false;
        var that = this;
		that.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
				if (that.jQuery(child).children().children().length == 13 && !found)
				{
					found = true;



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
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(firstCell);
        
        
        
        
        
        
        
        
        
        
        
        arrayOfPlayerObjects.push({
            id: playerValues.id,
			name : playerValues.name,
            position : null,
			isOnDreamTeam: true
		});
        
    }
}
