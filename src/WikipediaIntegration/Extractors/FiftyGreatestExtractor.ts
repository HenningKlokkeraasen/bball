/// <reference path="ExtractorHelper.ts" />
/// <reference path="../../Definitions.ts" />



class FiftyGreatestExtractor implements IWikipediaExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) { }
    
    extractBballPlayerArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
		var isVoters = true;
        var that = this;
		that.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
				if (that.jQuery(child).children().children().length == 51)
				{
					if (isVoters){
						isVoters = false;
					}
					else {
						that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
                            if (j > 0) {
								that.extractPlayerFromRow(tr, arrayOfPlayerObjects);
							}
						});
					}
				}
			}
		});
		return arrayOfPlayerObjects;
    }
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        var firstCell = this.jQuery(tr).children()[0];
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(firstCell);
        
        
        
        
        var thirdCell = this.jQuery(tr).children()[2];
        var position = this.jQuery(thirdCell).text();
        
        
        
        
        
        arrayOfPlayerObjects.push({
            id: playerValues.id,
			name : playerValues.name,
            position : position,
			isOnFiftyGreatesList: true
		});
        
    }
}
