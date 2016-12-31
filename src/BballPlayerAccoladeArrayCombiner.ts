/// <reference path="Logger.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCombiner {
    combine(bunchOfPlayers: Array<Array<BballPlayer>>) {
        var combinedPlayers = new Array<BballPlayer>();
        var that = this;
        for (var bunchKey in bunchOfPlayers) {
            var element = bunchOfPlayers[bunchKey];
            for (var key in element) {
                if (combinedPlayers[key] === undefined) {
                    combinedPlayers[key] = this.createNewCombinedPlayer(element[key]);
                }
                else {
                    that.setProperties(element[key], combinedPlayers[key])
                }
            };
        };
        return combinedPlayers;
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
