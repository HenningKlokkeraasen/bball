/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCombiner {
    combine(bunchOfPlayers: Array<Array<BballPlayer>>) {
        var combinedPlayers = new Array<BballPlayer>();
        var self = this;
        for (var bunchKey in bunchOfPlayers) {
            var arrayOfPlayers = bunchOfPlayers[bunchKey];
            arrayOfPlayers.forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => p.id == player.id);
                if (existingPlayer === undefined) {
                    combinedPlayers.push(self.createNewCombinedPlayer(player));
                }
                else {
                    self.setProperties(player, existingPlayer)
                }
            });
        };
        return combinedPlayers;
	}
    
    createNewCombinedPlayer(entry: BballPlayer) {
        var newPlayer = {
            id: entry.id,
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
