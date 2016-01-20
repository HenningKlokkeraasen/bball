/// <reference path="WikipediaGetter.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayRetriever {
    constructor(public wikipediaGetter: WikipediaGetter){
        
    }
    
    retrieve(
        title: string, 
        heading: string, 
        mapFunc: (content: string) => Array<BballPlayerBase>, 
        callback: (heading: string, arrayOfPlayerObjects: Array<BballPlayerBase>) => any) {
        this.wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(title, function(content) {
			var arrayOfPlayerObjects = mapFunc.call(null, content);
			callback(heading, arrayOfPlayerObjects);
		});
    }
}