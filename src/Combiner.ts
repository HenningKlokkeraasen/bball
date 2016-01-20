/// <reference path="Logger.ts" />

class Combiner {
    constructor(public jQuery, public logger: Logger) {
        
    }
	
    // TODO extract interfaces for these parameters
	combine(hallOfFamePlayers, fiftyGreatestPlayers, mvps) {
		var combinedPlayers = new Array();
		
		this.jQuery.each(fiftyGreatestPlayers, function(index, fiftyPlayer) {
			if (combinedPlayers[fiftyPlayer.id] === undefined) {
//				console.log('adding to array 50G ' + fiftyPlayer.name);
				combinedPlayers[fiftyPlayer.id] = {
					'id' :  fiftyPlayer.id,
					'name' : fiftyPlayer.name,
					'position' : fiftyPlayer.position,
					'isOnFiftyGreatestList' : true
				};
			} else {
//				console.log('exists in array 50G ' + fiftyPlayer.name);
				combinedPlayers[fiftyPlayer.id].isOnFiftyGreatestList = true;
			}
		});
		
		this.jQuery.each(hallOfFamePlayers, function(index, hofPlayer) {
			if (combinedPlayers[hofPlayer.id] === undefined) {
//				console.log('adding to array HOF ' + hofPlayer.name);
				combinedPlayers[hofPlayer.id] = {
					'id' :  hofPlayer.id,
					'name' : hofPlayer.name,
					'position' : hofPlayer.position,
					'yearInductedInHof' : hofPlayer.yearInducted
				};
			} else {
//				console.log('exists in array HOF ' + hofPlayer.name);
				combinedPlayers[hofPlayer.id].yearInductedInHof = hofPlayer.yearInducted;
			}
		});
        
		for (var key in mvps) {
            // console.log(key);
			if (combinedPlayers[key] === undefined) {
				// console.log('adding to array MVP ' + mvps[key].name);
				combinedPlayers[key] = {
					'id' :  mvps[key].id,
					'name' : mvps[key].name,
					'position' : mvps[key].position,
					'numberOfTimesMvp' : mvps[key].numberOfTimesMvp
				};
			} else {
				// console.log('exists in array MVP ' + mvps[key].name);
				combinedPlayers[key].numberOfTimesMvp = mvps[key].numberOfTimesMvp;
			}
		}
		
		this.logger.log('Combined', combinedPlayers);
	};
};
