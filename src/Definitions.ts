
interface WikipediaPageDefinition {
    titleInUrl : string;
    heading: string;
}

interface RetrieveDefinition {
    wikipediaPageDefinition: WikipediaPageDefinition;
    mappingFunction: (content: string) => Array<any>;
    notifyWhenDoneCallback: (heading: string, arrayOfPlayers: Array<any>) => any;
}

interface BballPlayerBase {
    // id: string; // probably won't be set, will be key in associative array instead
    name: string;
    position: string;
}

interface FiftyGreatestPlayer extends BballPlayerBase {
}

interface MvpPlayer extends BballPlayerBase {
    numberOfTimesMvp: number;
}

interface HallOfFamePlayer extends BballPlayerBase {
    yearInducted: number;
}
