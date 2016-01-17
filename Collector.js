
var Collector = function(logger, combiner) {
	this.logger = logger;
	this.combiner = combiner;
	
	this.hasHallOfFamers = false;
	this.hallOfFameHeading = '';
	this.hallOfFamePlayers = [];
	
	this.hasFiftyGreatest = false;
	this.fiftyGreatestHeading = '';
	this.fiftyGreatestPlayers = [];
	
	var that = this;
	
	this.assignHallOfFamers = function(heading, arrayOfPlayerObjects) {
		that.hasHallOfFamers = true;
		that.hallOfFameHeading = heading;
		that.hallOfFamePlayers = arrayOfPlayerObjects;
		that.notifyIfHaveAll();
	};
	
	this.assignFiftyGreatest = function(heading, arrayOfPlayerObjects) {
		that.hasFiftyGreatest = true;
		that.fiftyGreatestHeading = heading;
		that.fiftyGreatestPlayers = arrayOfPlayerObjects;
		that.notifyIfHaveAll();
	};
	
	this.notifyIfHaveAll = function() {
//		this.logger.log('Have HOF: ' + this.hasHallOfFamers);
//		this.logger.log('Have 50G: ' + this.hasFiftyGreatest);
		if (this.hasHallOfFamers && this.hasFiftyGreatest) {
//			this.logger.log(this.hallOfFameHeading, this.hallOfFamePlayers);
//			this.logger.log(this.fiftyGreatestHeading, this.fiftyGreatestPlayers);
			this.combiner.combine(this.hallOfFameHeading, this.hallOfFamePlayers, this.fiftyGreatestHeading, this.fiftyGreatestPlayers);
		}
	};
};
