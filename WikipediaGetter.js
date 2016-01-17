
var WikipediaGetter = function(jQuery, jsonGetter) {
	this.jQuery = jQuery;
	this.jsonGetter = jsonGetter;
	var that = this;
	
	this.getContentOfWikipediaPageByTitleInUrl = function(titleInUrl, callback) {
		this.jsonGetter.getJson(
			'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + 
			titleInUrl + 
			'&prop=text&contentmodel=wikitext',
			function(data, textStatus, jqXhr) {
				var html = that.jQuery(data.parse.text)['0']['*'];
				callback(html);
			});
	};
};
