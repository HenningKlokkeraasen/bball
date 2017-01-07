/// <reference path="ExtractorHelper.ts" />
/// <reference path="../../Definitions.ts" />



class AllStarExtractor implements IWikipediaExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) { }
    
    extractBballPlayerArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
		
        var that = this;
		that.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
				if (that.jQuery(child).children().children().length > 10)
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
        var playerValues = this.htmlExtractor.extractPlayerValuesFromLinkInCell(firstCell);
        var currentlyInNba = firstCell.innerText.indexOf("^") > 0
        var secondCell = this.jQuery(tr).children()[1];
        var appearancesText = this.jQuery(secondCell).text();
        var appearancesNumber = parseInt(appearancesText);
        
        var thirdCell = this.jQuery(tr).children()[2];
        var appearancesYears = this.jQuery(thirdCell).text();
        
        var fourthCell = this.jQuery(tr).children()[3];
        var notes = this.jQuery(fourthCell).text();
        
        arrayOfPlayerObjects.push({
            id: playerValues.id,
			name : playerValues.name,
            position : null,
			allStarAppearanceCount: appearancesNumber,
            allStarAppearanceYears: appearancesYears,
            allStarAppearanceNotes: notes,
            currentlyInNba: currentlyInNba
		});
        
    }
}
