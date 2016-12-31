/// <reference path="../libs/jquery.d.ts" />
/// <reference path="JsonGetter.ts" />
/// <reference path="WikipediaIntegration/WikipediaGetter.ts" />
/// <reference path="Logger.ts" />
/// <reference path="BballPlayerAccoladeArrayCombiner.ts" />
/// <reference path="Extractors/ExtractorHelper.ts" />
/// <reference path="Extractors/HallOfFameExtractor.ts" />
/// <reference path="Extractors/FiftyGreatestExtractor.ts" />
/// <reference path="Extractors/MvpExtractor.ts" />
/// <reference path="Definitions.ts" />

var jsonGetter = new JsonGetter($);
var wikipediaGetter = new WikipediaGetter($, jsonGetter);
var logger = new Logger();
var combiner = new BballPlayerAccoladeArrayCombiner();
var htmlExtractor = new ExtractorHelper($);
var hofMapper = new HallOfFameExtractor($, htmlExtractor);
var fgMapper = new FiftyGreatestExtractor($, htmlExtractor);
var mvpMapper = new MvpExtractor($, htmlExtractor);

var hofDef = {
    wikipediaPageDefinition : {
        titleInUrl : 'List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame',
        heading: 'List of players in the Naismith Memorial Basketball Hall of Fame'
    },
    mappingFunction: hofMapper.mapTableOfPlayersToArray
}

var fgDef = {
    wikipediaPageDefinition : {
        titleInUrl : '50_Greatest_Players_in_NBA_History',
        heading: '50 Greatest Players in NBA History'
    },
    mappingFunction: fgMapper.mapTableOfPlayersToArray
}

var mvpDef = {
    wikipediaPageDefinition : {
        titleInUrl : 'NBA_Most_Valuable_Player_Award',
        heading: 'NBA Most Valuable Player Award'
    },
    mappingFunction: mvpMapper.mapTableOfPlayersToArray
}

var promises = [
    wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(hofDef.wikipediaPageDefinition.titleInUrl),
    wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(fgDef.wikipediaPageDefinition.titleInUrl),
    wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl(mvpDef.wikipediaPageDefinition.titleInUrl)
];

Promise.all(promises)
    .then(function(arrayOfResults) {
        var arrayOfPlayerObjects1 = hofDef.mappingFunction(arrayOfResults[0]);
        var arrayOfPlayerObjects2 = fgDef.mappingFunction(arrayOfResults[1]);
        var arrayOfPlayerObjects3 = mvpDef.mappingFunction(arrayOfResults[2]);

        logger.log(hofDef.wikipediaPageDefinition.heading, arrayOfPlayerObjects1);
        logger.log(fgDef.wikipediaPageDefinition.heading, arrayOfPlayerObjects2);
        logger.log(mvpDef.wikipediaPageDefinition.heading, arrayOfPlayerObjects3);
        
        var bunchOfPlayers = new Array<Array<BballPlayer>>();
        bunchOfPlayers[hofDef.wikipediaPageDefinition.titleInUrl] = arrayOfPlayerObjects1;
        bunchOfPlayers[fgDef.wikipediaPageDefinition.titleInUrl] = arrayOfPlayerObjects2;
        bunchOfPlayers[mvpDef.wikipediaPageDefinition.titleInUrl] = arrayOfPlayerObjects3;
        
        var combinedPlayers = combiner.combine(bunchOfPlayers);
        logger.log('Combined', combinedPlayers);
    })
    .catch(function(err) {
        logger.log(err);
});