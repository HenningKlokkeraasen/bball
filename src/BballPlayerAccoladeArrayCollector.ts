/// <reference path="Logger.ts"" />
/// <reference path="BballPlayerAccoladeArrayCombiner.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCollector {
	bunchOfPlayers = undefined;
    
    constructor(public logger: Logger, public combiner: BballPlayerAccoladeArrayCombiner) {

    }
	
    initiate = (bunchOfPlayers: Array<ListOfPlayersWithFlag>) => {
        this.bunchOfPlayers = bunchOfPlayers;
    }
    
    setListOfPlayers = (key: string, arrayOfPlayers: Array<BballPlayer>) => {
        this.bunchOfPlayers[key].arrayOfPlayers = arrayOfPlayers;
        this.bunchOfPlayers[key].hasBeenSet = true;
        this.notifyIfHaveAll();
    }
    
	notifyIfHaveAll() {
        var haveAll = true;
		for (var key in bunchOfPlayers) {
			if (!bunchOfPlayers[key].hasBeenSet) {
                haveAll = false;
            }
        };
        
        if (haveAll) {
            this.combiner.combine(this.bunchOfPlayers);
        }
	}
}
