/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="WikipediaIntegration/WikipediaGetter.ts" />
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
var domIntegrator = new DomIntegrator();

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

var lrs = new LocalOrRemoteStorage(new LocalStorageIntegrator());

var promises = [
    lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
        hofDef.wikipediaPageDefinition.titleInUrl, 
        wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl,
        hofDef.mappingFunction),
    lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
        fgDef.wikipediaPageDefinition.titleInUrl, 
        wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl,
        fgDef.mappingFunction),
    lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
        mvpDef.wikipediaPageDefinition.titleInUrl, 
        wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl,
        mvpDef.mappingFunction)
];

Promise.all(promises)
    .then(function(arrayOfResults) {
        domIntegrator.slapHtmlIntoPlaceholder(
            hofDef.wikipediaPageDefinition.heading,
            arrayOfResults[0],
            "placeholder"
        );

        domIntegrator.slapHtmlIntoPlaceholder(
            fgDef.wikipediaPageDefinition.heading, 
            arrayOfResults[1],
            "placeholder"
        );
        
        domIntegrator.slapHtmlIntoPlaceholder(
            mvpDef.wikipediaPageDefinition.heading, 
            arrayOfResults[2],
            "placeholder"
        );
        
        var bunchOfPlayers = new Array<Array<BballPlayer>>();
        bunchOfPlayers[hofDef.wikipediaPageDefinition.titleInUrl] = arrayOfResults[0];
        bunchOfPlayers[fgDef.wikipediaPageDefinition.titleInUrl] = arrayOfResults[1];
        bunchOfPlayers[mvpDef.wikipediaPageDefinition.titleInUrl] = arrayOfResults[2];
        
        var combinedPlayers = combiner.combine(bunchOfPlayers);

        domIntegrator.slapHtmlIntoPlaceholder(
            "Combined!", 
            combinedPlayers,
            "placeholder"
        );
    })
    .catch(function(err) {
        logger.log(err);
});