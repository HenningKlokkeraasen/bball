
var Combiner = function(jQuery, logger) {
	this.jQuery = jQuery;
	this.logger = logger;
	var that = this;
	
	this.combine = function(hallOfFameHeading, hallOfFamePlayers, fiftyGreatestHeading, fiftyGreatestPlayers) {
		var combinedPlayers = new Array();
		
		that.jQuery.each(fiftyGreatestPlayers, function(index, fiftyPlayer) {
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
		
		that.jQuery.each(hallOfFamePlayers, function(index, hofPlayer) {
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
		
		that.logger.log('Combined', combinedPlayers);
	};
};
