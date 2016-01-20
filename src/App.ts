/// <reference path="Retriever.ts" />
/// <reference path="Definitions.ts" />

class App {
    constructor(public retriever: Retriever) {
        
    }
    
    run(thingsToRetrieve: Array<RetrieveDefinition>) {
        thingsToRetrieve.forEach(element => {
            this.retriever.retrieve(
                element.wikipediaPageDefinition.titleInUrl, 
                element.wikipediaPageDefinition.heading, 
                element.mappingFunction,
                element.notifyWhenDoneCallback);
        });
    }
}
