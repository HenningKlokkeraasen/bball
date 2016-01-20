/// <reference path="Logger.ts"" />
/// <reference path="Combiner.ts" />

class Collector {
    constructor(public logger: Logger, public combiner: Combiner) {
        
    }
	
	hasHallOfFamers: boolean;
	hallOfFameHeading: string;
	hallOfFamePlayers: Array<any>;
	
	hasFiftyGreatest: boolean;
	fiftyGreatestHeading: string;
	fiftyGreatestPlayers: Array<any>;
	
	hasMvps: boolean;
	mvpsHeading: string;
	mvps: Array<any>;
    
    // TODO interface for player type
	setHallOfFamerPlayers = (heading: string, arrayOfPlayerObjects: Array<any>) => {
		this.hasHallOfFamers = true;
		this.hallOfFameHeading = heading;
		this.hallOfFamePlayers = arrayOfPlayerObjects;
		this.notifyIfHaveAll();
	};
	
    // TODO interface for player type
	setFiftyGreatestPlayers = (heading, arrayOfPlayerObjects) => {
		this.hasFiftyGreatest = true;
		this.fiftyGreatestHeading = heading;
		this.fiftyGreatestPlayers = arrayOfPlayerObjects;
		this.notifyIfHaveAll();
	};
    
    // TODO interface for player type
    setMvpPlayers = (heading, arrayOfPlayerObjects) => {
        this.hasMvps = true;
        this.mvpsHeading = heading;
        this.mvps = arrayOfPlayerObjects;
        this.notifyIfHaveAll();
    }
	
	notifyIfHaveAll() {
//		this.logger.log('Have HOF: ' + this.hasHallOfFamers);
//		this.logger.log('Have 50G: ' + this.hasFiftyGreatest);
		if (this.hasHallOfFamers && this.hasFiftyGreatest && this.hasMvps) {
//			this.logger.log(this.hallOfFameHeading, this.hallOfFamePlayers);
//			this.logger.log(this.fiftyGreatestHeading, this.fiftyGreatestPlayers);
			this.combiner.combine(this.hallOfFamePlayers, this.fiftyGreatestPlayers, this.mvps);
		}
	};
};
