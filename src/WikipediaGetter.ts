/// <reference path="JsonGetter.ts" />

class WikipediaGetter {
    constructor(public jQuery, public jsonGetter: JsonGetter) {
        
    }
    
    getHtmlOfWikipediaPageByTitleInUrl(titleInUrl: string, callback: (html: string) => any) {
        this.jsonGetter.getJson(
			'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + 
			titleInUrl + 
			'&prop=text&contentmodel=wikitext',
			function(data, textStatus, jqXhr) {
				var html = this.jQuery(data.parse.text)['0']['*'];
				callback(html);
			});
    }
}
