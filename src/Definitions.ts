
interface WikipediaPageDefinition {
    titleInUrl : string;
    heading: string;
}

interface RetrieveDefinition {
    wikipediaPageDefinition: WikipediaPageDefinition;
    mappingFunction: (content: string) => Array<any>;
    notifyWhenDoneCallback: (heading: string, arrayOfPlayers: Array<any>) => any;
}
