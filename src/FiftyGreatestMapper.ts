
class FiftyGreatestMapper {
    constructor(public jQuery) {
        
    }
    
    mapTableOfPlayersToArray(content: string) {
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
								var firstCell = that.jQuery(tr).children()[0];
								var link = that.jQuery(firstCell).find('a')[0];
								var href = that.jQuery(link).attr('href');
								var id = href.replace('/wiki/', '');
								var name = that.jQuery(link).text();
								
								var thirdCell = that.jQuery(tr).children()[2];
								var position = that.jQuery(thirdCell).text();
								
								arrayOfPlayerObjects.push({
									'id' : id,
									'name' : name,
									'position' : position
								});
							}
						});
					}
				}
			}
		});
		return arrayOfPlayerObjects;
    }
}