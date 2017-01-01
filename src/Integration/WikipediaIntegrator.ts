/// <reference path="../Utilities.ts" />

class WikipediaIntegrator {
    getWikiText(pageUrlSegment: string) {
        var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&page=' + 
			pageUrlSegment + 
			'&prop=text&contentmodel=wikitext';
		return new Promise<string>(function(resolve, reject) {
			CrossDomainJsonGetter.prototype.getJson(url)
				.then(wikipediaResult => resolve($(wikipediaResult.parse.text)['0']['*']))
				.catch(reject);
		});
    }
}
