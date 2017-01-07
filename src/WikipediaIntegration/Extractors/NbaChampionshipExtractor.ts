/// <reference path="ExtractorHelper.ts" />
/// <reference path="../../Definitions.ts" />
/// <reference path="../../BballAliasFinder.ts" />
/// <reference path="../../BballPlayerFactory.ts" />
/// <reference path="../../DataProvider.ts" />

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

        // TODO remove temp taking only known championships until all completed
        inputForDataProvider = inputForDataProvider.slice(0, 4);

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
                    console.log(arrayOfPlayerObjects);
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

/// Extracts the TEAMS from the Wikipedia NBA Champions page
class NbaChampionshipTeamExtractor {

	mapTableOfWinningTeamsToArray(content: string): Array<any> {
		var html = $.parseHTML(content);
        var rows = ExtractorHelper.prototype.extractRowsFromWikiTable(html, 'Year');
        var yearTeamReferences = rows.map(row => NbaChampionshipTeamExtractor.prototype.extractYearTeamReference(row));
        return yearTeamReferences;
	}

    extractYearTeamReference(tr) {
        var firstCell = $(tr).children()[0];
        var a = $(firstCell).find('a')[0];
        var yearText = $(a).text();
        var year = parseInt(yearText);

        var winnerCell = $(tr).find("td[style*='background:#FFFF99']");
        var href = $(winnerCell).find('a').attr('href');
        var wikipediaPageUrlSegment = href.replace("/wiki/", "");
        
        return { year: year, wikipediaPageUrlSegment: wikipediaPageUrlSegment};
    }
}

/// Extracts the PLAYERS from a Wikipedia team season page
class NbaChampionshipPlayerExtractor  implements IWikipediaExtractor{

    extractBballPlayerArray(content: string) : Array<BballPlayer>{
		var html = $.parseHTML(content);
		var arrayOfPlayerObjects = new Array();
        
		var self = this;
        var rows = ExtractorHelper.prototype.extractRowsFromRosterTable(html);
        rows.forEach(row => self.extractPlayerFromRow(row, arrayOfPlayerObjects));
        
		return arrayOfPlayerObjects;
    }

    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        var firstCell = $(tr).children()[0];
        var position = $(firstCell).find('a').text();
        
        var thirdCell = $(tr).children()[2];
        var fourthCell = $(tr).children()[3];
        var playerCell = $(thirdCell).html().indexOf('img') > 1 ? fourthCell : thirdCell;
        var playerValues = ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell(playerCell);
        
        // In Roster tables players are listed with "Surname, Lastname" format
        if (playerValues.name.indexOf(', ') > 1) {
            var names = playerValues.name.split(', ');
            var name = `${names[1]} ${names[0]}`;
            playerValues.name = name;
        }
        
        arrayOfPlayerObjects.push({
            id: playerValues.id,
            name : playerValues.name,
            position : position,
            numberOfNbaChampionships : 1,
            nbaChampionshipYears: [0] // todo
        });
    }
}