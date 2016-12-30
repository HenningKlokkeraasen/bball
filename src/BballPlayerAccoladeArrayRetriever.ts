/// <reference path="WikipediaGetter.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayRetriever {
    constructor(public wikipediaGetter: WikipediaGetter, public collector: BballPlayerAccoladeArrayCollector){
        
    }
    
    retrieve(
        title: string, 
        heading: string, 
        mapFunc: (content: string) => Array<BballPlayer>
        ) {
            var self = this;
            self.wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(title, function(content) {
                var arrayOfPlayerObjects = mapFunc.call(null, content);
                self.collector.setListOfPlayers(title, arrayOfPlayerObjects);
		});
    }
}