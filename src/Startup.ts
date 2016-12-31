/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Integration/WikipediaIntegrator.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
/// <reference path="Extractors/ExtractorHelper.ts" />
/// <reference path="Extractors/HallOfFameExtractor.ts" />
/// <reference path="Extractors/FiftyGreatestExtractor.ts" />
/// <reference path="Extractors/MvpExtractor.ts" />
/// <reference path="Definitions.ts" />

var jsonGetter = new JsonGetter($);
var wikipediaGetter = new WikipediaIntegrator($, jsonGetter);
var logger = new Logger();
var combiner = new BballPlayerArrayJoiner();
var htmlExtractor = new ExtractorHelper($);
var hofMapper = new HallOfFameExtractor($, htmlExtractor);
var fgMapper = new FiftyGreatestExtractor($, htmlExtractor);
var mvpMapper = new MvpExtractor($, htmlExtractor);
var domIntegrator = new DomIntegrator();

var data = [
    {
        wikipediaPageDefinition : {
            titleInUrl : 'List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame',
            heading: 'List of players in the Naismith Memorial Basketball Hall of Fame'
        },
        mappingFunction: hofMapper.mapTableOfPlayersToArray
    },
    {
        wikipediaPageDefinition : {
            titleInUrl : '50_Greatest_Players_in_NBA_History',
            heading: '50 Greatest Players in NBA History'
        },
        mappingFunction: fgMapper.mapTableOfPlayersToArray
    },
    {
        wikipediaPageDefinition : {
            titleInUrl : 'NBA_Most_Valuable_Player_Award',
            heading: 'NBA Most Valuable Player Award'
        },
        mappingFunction: mvpMapper.mapTableOfPlayersToArray
    }
];

var lrs = new LocalOrRemoteStorage(new LocalStorageIntegrator());

var promises = [];
data.forEach(e => promises.push(
    lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
        e.wikipediaPageDefinition.titleInUrl, 
        wikipediaGetter.getHtmlOfWikipediaPageByTitleInUrl,
        e.mappingFunction)));

Promise.all(promises)
    .then(function(arrayOfResults) {
        var bunchOfPlayers = new Array<Array<BballPlayer>>();

        for (var i = 0; i < arrayOfResults.length; i++){
            domIntegrator.slapHtmlIntoPlaceholder(
                data[i].wikipediaPageDefinition.heading,
                arrayOfResults[i],
                "placeholder"
            );
            bunchOfPlayers[data[i].wikipediaPageDefinition.titleInUrl] = arrayOfResults[i];
        }
        
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