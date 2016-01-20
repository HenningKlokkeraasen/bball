/// <reference path="Logger.ts"" />
/// <reference path="BballPlayerAccoladeArrayCombiner.ts" />
/// <reference path="Definitions.ts" />

class BballPlayerAccoladeArrayCollector {
	hasHallOfFamers: boolean;
	hallOfFameHeading: string;
	hallOfFamePlayers: Array<HallOfFamePlayer>;
	
	hasFiftyGreatest: boolean;
	fiftyGreatestHeading: string;
	fiftyGreatestPlayers: Array<FiftyGreatestPlayer>;
	
	hasMvps: boolean;
	mvpsHeading: string;
	mvps: Array<MvpPlayer>;
    
    constructor(public logger: Logger, public combiner: BballPlayerAccoladeArrayCombiner) {
        
    }
	
	setHallOfFamerPlayers = (heading: string, arrayOfPlayerObjects: Array<HallOfFamePlayer>) => {
		this.hasHallOfFamers = true;
		this.hallOfFameHeading = heading;
		this.hallOfFamePlayers = arrayOfPlayerObjects;
		this.notifyIfHaveAll();
	}
	
	setFiftyGreatestPlayers = (heading: string, arrayOfPlayerObjects: Array<FiftyGreatestPlayer>) => {
		this.hasFiftyGreatest = true;
		this.fiftyGreatestHeading = heading;
		this.fiftyGreatestPlayers = arrayOfPlayerObjects;
		this.notifyIfHaveAll();
	}
    
    setMvpPlayers = (heading: string, arrayOfPlayerObjects: Array<MvpPlayer>) => {
        this.hasMvps = true;
        this.mvpsHeading = heading;
        this.mvps = arrayOfPlayerObjects;
        this.notifyIfHaveAll();
    }
	
	notifyIfHaveAll() {
		if (this.hasHallOfFamers && this.hasFiftyGreatest && this.hasMvps) {
			this.combiner.combine(this.hallOfFamePlayers, this.fiftyGreatestPlayers, this.mvps);
		}
	}
}
