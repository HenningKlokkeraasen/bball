/// <reference path="../libs/jquery.d.ts" />
/// <reference path="JsonGetter.ts" />
/// <reference path="WikipediaGetter.ts" />
/// <reference path="Logger.ts" />
/// <reference path="BballPlayerAccoladeArrayCombiner.ts" />
/// <reference path="BballPlayerAccoladeArrayCollector.ts" />
/// <reference path="BballPlayerAccoladeArrayRetriever.ts" />
/// <reference path="Extractors/ExtractorHelper.ts" />
/// <reference path="Extractors/HallOfFameExtractor.ts" />
/// <reference path="Extractors/FiftyGreatestExtractor.ts" />
/// <reference path="Extractors/MvpExtractor.ts" />
/// <reference path="App.ts" />
/// <reference path="Definitions.ts" />

var jsonGetter = new JsonGetter($);
var wikipediaGetter = new WikipediaGetter($, jsonGetter);
var logger = new Logger();
var combiner = new BballPlayerAccoladeArrayCombiner($, logger);
var collector = new BballPlayerAccoladeArrayCollector(logger, combiner);
var retriever = new BballPlayerAccoladeArrayRetriever(wikipediaGetter, collector);
var htmlExtractor = new ExtractorHelper($);
var hofMapper = new HallOfFameExtractor($, htmlExtractor);
var fgMapper = new FiftyGreatestExtractor($, htmlExtractor);
var mvpMapper = new MvpExtractor($, htmlExtractor);
var app = new App(retriever);

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

var bunchOfPlayers = new Array<ListOfPlayersWithFlag>();
bunchOfPlayers[hofDef.wikipediaPageDefinition.titleInUrl] = { hasBeenSet: false,  arrayOfPlayers: Array<BballPlayer>() };
bunchOfPlayers[fgDef.wikipediaPageDefinition.titleInUrl] = { hasBeenSet: false,  arrayOfPlayers: Array<BballPlayer>() };
bunchOfPlayers[mvpDef.wikipediaPageDefinition.titleInUrl] = { hasBeenSet: false,  arrayOfPlayers: Array<BballPlayer>() };

collector.initiate(bunchOfPlayers)

var defs = [
    hofDef,
    fgDef,
    mvpDef
];

app.run(defs);