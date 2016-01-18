
var MvpsHelper = function(jQuery) {
	this.jQuery = jQuery;
	var that = this;
	
	this.mapTableOfPlayersToArray = function(content) {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
		
		this.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
                var tbody = that.jQuery(child).children()[0];
                var tr = that.jQuery(tbody).children()[0];
                var cell = that.jQuery(tr).children()[0];
                var text = cell.innerText
                //console.log(text);
                if (text == 'Season')
                {
                    that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
                        if (j > 0) {
                            var firstCell = that.jQuery(tr).children()[0];
                            var season = that.jQuery(firstCell).text();
                            
                            var secondCell = that.jQuery(tr).children()[1];
                            var link = that.jQuery(secondCell).find('a')[0];
                            var href = that.jQuery(link).attr('href');
                            var id = href.replace('/wiki/', '');
                            var name = that.jQuery(link).text();
                            
                            var thirdCell = that.jQuery(tr).children()[2];
                            var position = that.jQuery(thirdCell).text();
                            
                            if (arrayOfPlayerObjects[id] != undefined) {
                                arrayOfPlayerObjects[id].numberOfTimesMvp = arrayOfPlayerObjects[id].numberOfTimesMvp + 1;
                                //console.log(id + ' already in assoc array. increasing to ' + arrayOfPlayerObjects[id].numberOfTimesMvp);
                            }
                            else {
                                arrayOfPlayerObjects[id] = {
                                    'id' : id,
                                    'name' : name,
                                    'position' : position,
                                    'numberOfTimesMvp' : 1
                                };
                                //console.log('inserting ' + id);
                            }
                        }
                    });
                }
			}
		});
		return arrayOfPlayerObjects;
	};
};
