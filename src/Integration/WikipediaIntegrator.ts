/// <reference path="../Utilities.ts" />

class WikipediaIntegrator {
    constructor(public jQuery, public jsonGetter: JsonGetter) { }
    
    getHtmlOfWikipediaPageByTitleInUrl(titleInUrl: string) {
        var uri = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + 
			titleInUrl + 
			'&prop=text&contentmodel=wikitext';
		var self = this;
		return new Promise<string>(function(resolve, reject) {
			self.jsonGetter.getJson(uri)
				.then(function(data) {
					var html = this.jQuery(data.parse.text)['0']['*'];
					resolve(html);
				})
				.catch(function(err) {
					reject(err);
				});
		});
    }
}
