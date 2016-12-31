/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerArrayJoiner {
    combine(bunchOfPlayers: Array<Array<BballPlayer>>) {
        var combinedPlayers = new Array<BballPlayer>();
        var self = this;
        for (var bunchKey in bunchOfPlayers) {
            var arrayOfPlayers = bunchOfPlayers[bunchKey];
            arrayOfPlayers.forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => self.findByIdOrAlternateId(p, player.id));
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
        if (from.position && from.position !== to.position)
            to.position = to.position ? `${to.position}, ${from.position}` : from.position;
        if (from.name && from.name !== to.name)
            to.aliases = to.aliases ? `${to.aliases}, ${from.name}` : from.name;
    }

    /*
     * Handles special cases for Lew Alcindor / Kareem Abdul-Jabbar
     */
    findByIdOrAlternateId(element: BballPlayer, playerId: string) {
        if (element.id === playerId)
            return true;
        if (element.id === 'Lew_Alcindor' && playerId === 'Kareem_Abdul-Jabbar') {
            console.debug('found special case Lew Alcindor / Kareem Abdul-Jabbar')
            return true;
        }
        if (element.id === 'Kareem_Abdul-Jabbar' && playerId === 'Lew_Alcindor') {
            console.debug('found special case Lew Alcindor / Kareem Abdul-Jabbar')
            return true;
        }
        return false;
    }
}