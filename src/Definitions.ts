
interface WikipediaPageDefinition {
    titleInUrl : string;
    heading: string;
}

interface RetrieveDefinition {
    wikipediaPageDefinition: WikipediaPageDefinition;
    mappingFunction: (content: string) => Array<any>;
}

interface BballPlayer {
    // id: string; // probably won't be set, will be key in associative array instead
    name: string;
    position: string;
    isOnFiftyGreatesList?: boolean;
    numberOfTimesMvp?: number;
    yearInductedInHof?: number;
}

interface ListOfPlayersWithFlag {
    hasBeenSet: boolean;
    arrayOfPlayers: Array<BballPlayer>;
}
