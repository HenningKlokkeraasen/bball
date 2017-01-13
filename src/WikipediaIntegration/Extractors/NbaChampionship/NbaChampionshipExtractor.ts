/// <reference path="../ExtractorHelper.ts" />
/// <reference path="../../../Definitions.ts" />
/// <reference path="../../../BballAliasFinder.ts" />
/// <reference path="../../../BballPlayerFactory.ts" />
/// <reference path="../../../DataProvider.ts" />
/// <reference path="RosterTableExtractor.ts" />
/// <reference path="NbaChampionshipPlayerExtractor.ts" />
/// <reference path="NbaChampionshipTeamExtractor.ts" />
/// <reference path="../../WikipediaIntegrator.ts" />

/// Two-step operation:
/// 1. Get all the teams from the Wikipedia List of NBA champions page
/// 2. For each team, get the roster
class NbaChampionshipExtractor implements IWikipediaExtractor {
    _playerExtractor: NbaChampionshipPlayerExtractor;
    
    constructor(playerExtractor: NbaChampionshipPlayerExtractor) {
        this._playerExtractor = playerExtractor;
    }

    extractBballPlayerArray(content: string) {
        return this.extractBballPlayerArrayAsync(content);
    }

	async extractBballPlayerArrayAsync(content: string) {
        var yearTeamReferences = NbaChampionshipTeamExtractor.prototype.mapTableOfWinningTeamsToArray(content);
		var self = this;

        var inputForDataProvider = yearTeamReferences.map(e => self.mapYearsAndTeamReferencesToInputForDataProvider(e));

        var promises = self.mapDataToPromises(inputForDataProvider);

        var arrayOfPlayerObjects = await self.getAllPlayers(inputForDataProvider, promises);

		return arrayOfPlayerObjects;
	}

    mapYearsAndTeamReferencesToInputForDataProvider(yearTeamReference) {
		var self = this;
        return {
            year: yearTeamReference.year, 
            wikipediaPageUrlSegment: yearTeamReference.wikipediaPageUrlSegment,
            extractor: this._playerExtractor,
        }
    }

    mapDataToPromises(data: Array<any>) {
        var self = this;
        var promises = [];
        data.forEach(e => promises.push(
            DataProvider.prototype.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
                e.wikipediaPageUrlSegment, 
                WikipediaIntegrator.prototype.getWikiText,
                e.extractor)));
        return promises;
    }

    getAllPlayers(data, promises) {
		var self = this;
        return new Promise(resolve => {
            Promise.all(promises)
                .then(function(arrayOfResults) {
                    var arrayOfPlayerObjects = self.extractAllPlayers(data, arrayOfResults);
                    resolve(arrayOfPlayerObjects);
                })
                .catch(console.error) 
        });
    }

    extractAllPlayers(tabs: Array<any>, arrayOfArrayOfBballPlayers: Array<any>) {
        var self = this;
        
        var combinedPlayers = new Array<BballPlayer>();

        for (var i = 0; i < arrayOfArrayOfBballPlayers.length; i++) {
            var arrayOfBballPlayers = arrayOfArrayOfBballPlayers[i];

            for (var j = 0; j < arrayOfBballPlayers.length; j++) {
                var playerValues = arrayOfBballPlayers[j];
                
                var player = combinedPlayers.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, playerValues.id));
                if (player) {
                    player.numberOfNbaChampionships = player.numberOfNbaChampionships + 1;
                    if (player.nbaChampionshipYears === undefined)
                        player.nbaChampionshipYears = new Array<number>();
                    player.nbaChampionshipYears.push(0);// todo
                    BballPlayerFactory.prototype.addAliases({ id: playerValues.id, name: playerValues.name, position: null }, player);
                }
                else {
                    combinedPlayers.push({
                        id: playerValues.id,
                        name : playerValues.name,
                        position : playerValues.position,
                        numberOfNbaChampionships : 1,
                        nbaChampionshipYears: [0] // todo
                    });
                }
            }
        }
        
        return combinedPlayers;
    }
}