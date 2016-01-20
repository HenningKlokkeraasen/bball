/// <reference path="Logger.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCombiner {
    constructor(public jQuery, public logger: Logger) {
        
    }
    
	combine(
        hallOfFamePlayers: Array<HallOfFamePlayer>, 
        fiftyGreatestPlayers: Array<FiftyGreatestPlayer>, 
        mvps: Array<MvpPlayer>) {
		var combinedPlayers = new Array();
		
		for (var key in fiftyGreatestPlayers) {
			if (combinedPlayers[key] === undefined) {
				combinedPlayers[key] = this.createNewCombinedPlayer(fiftyGreatestPlayers[key]);
			}
            combinedPlayers[key].isOnFiftyGreatestList = true;
		};
		
		for (var key in hallOfFamePlayers) {
			if (combinedPlayers[key] === undefined) {
				combinedPlayers[key] = this.createNewCombinedPlayer(hallOfFamePlayers[key]);
			}
            combinedPlayers[key].yearInductedInHof = hallOfFamePlayers[key].yearInducted;
		};
        
		for (var key in mvps) {
			if (combinedPlayers[key] === undefined) {
				combinedPlayers[key] = this.createNewCombinedPlayer(mvps[key]);
			}
            combinedPlayers[key].numberOfTimesMvp = mvps[key].numberOfTimesMvp;
		}
		
		this.logger.log('Combined', combinedPlayers);
	}
	
    createNewCombinedPlayer(entry: BballPlayerBase) {
        return {
            'name' : entry.name,
            'position' : entry.position
        };
    }
}
