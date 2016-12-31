/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballAliasFinder.ts" />
/// <reference path="BballPlayerFactory.ts" />

class BballPlayerArrayJoiner {
    combine(bunchOfPlayers: Array<Array<BballPlayer>>) {
        var combinedPlayers = new Array<BballPlayer>();
        var self = this;
        for (var bunchKey in bunchOfPlayers) {
            var arrayOfPlayers = bunchOfPlayers[bunchKey];
            arrayOfPlayers.forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, player.id));
                if (existingPlayer === undefined)
                    combinedPlayers.push(BballPlayerFactory.prototype.clone(player));
                else
                    BballPlayerFactory.prototype.copyNotNullProperties(player, existingPlayer)
            });
        };
        return combinedPlayers;
	}
}