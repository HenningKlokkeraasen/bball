
var HallOfFameHelper = function(jQuery) {
	this.jQuery = jQuery;
	var that = this;
	
	this.mapTableOfPlayersToArray = function(content) {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
		
		this.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
				that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
					if (j > 0) {
						var firstCell = that.jQuery(tr).children()[0];
						var year = that.jQuery(firstCell).text();
						
						var secondCell = that.jQuery(tr).children()[1];
						var link = that.jQuery(secondCell).find('a')[0];
						var href = that.jQuery(link).attr('href');
						var id = href.replace('/wiki/', '');
						var name = that.jQuery(link).text();
						
						var thirdCell = that.jQuery(tr).children()[2];
						var position = that.jQuery(thirdCell).text();
						
						arrayOfPlayerObjects.push({
							'id' : id,
							'name' : name,
							'yearInducted' : year,
							'position' : position
						});
					}
				});
			}
		});
		return arrayOfPlayerObjects;
	};
};
