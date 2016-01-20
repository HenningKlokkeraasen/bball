/// <reference path="WikipediaGetter.ts" />

class Retriever {
    constructor(public wikipediaGetter: WikipediaGetter){
        
    }
    
    // TODO interface for arrayOfPlayerObjects
    retrieve(title: string, heading: string, mapFunc: (content: string) => Array<any>, callback: (heading: string, arrayOfPlayerObjects: Array<any>) => any) {
        this.wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(title, function(content) {
			var arrayOfPlayerObjects = mapFunc.call(null, content);
			callback(heading, arrayOfPlayerObjects);
		});
    }
}