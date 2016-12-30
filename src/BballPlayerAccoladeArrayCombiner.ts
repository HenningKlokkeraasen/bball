/// <reference path="Logger.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCombiner {
    constructor(public jQuery, public logger: Logger) {
        
    }
    
	combine(bunchOfPlayers: Array<ListOfPlayersWithFlag>) {
        var combinedPlayers = new Array<BballPlayer>();
        var that = this;
        for (var bunchKey in bunchOfPlayers) {
            var element = bunchOfPlayers[bunchKey];
            for (var key in element.arrayOfPlayers) {
                if (combinedPlayers[key] === undefined) {
                    combinedPlayers[key] = this.createNewCombinedPlayer(element.arrayOfPlayers[key]);
                }
                else {
                    that.setProperties(element.arrayOfPlayers[key], combinedPlayers[key])
                }
            };
        };
		
		this.logger.log('Combined', combinedPlayers);
	}
    
    createNewCombinedPlayer(entry: BballPlayer) {
        var newPlayer = {
            name: entry.name,
            position: entry.position
        };
        this.setProperties(entry, newPlayer);
        return newPlayer;
    }

    setProperties(from: BballPlayer, to: BballPlayer) {
        if (from.isOnFiftyGreatesList)
            to.isOnFiftyGreatesList = from.isOnFiftyGreatesList;
        if (from.numberOfTimesMvp)
            to.numberOfTimesMvp = from.numberOfTimesMvp;
        if (from.yearInductedInHof)
            to.yearInductedInHof = from.yearInductedInHof;
    }
}
