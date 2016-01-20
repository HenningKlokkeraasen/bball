/// <reference path="../libs/jquery.d.ts" />
/// <reference path="JsonGetter.ts" />
/// <reference path="WikipediaGetter.ts" />
/// <reference path="Logger.ts" />
/// <reference path="BballPlayerAccoladeArrayCombiner.ts" />
/// <reference path="BballPlayerAccoladeArrayCollector.ts" />
/// <reference path="BballPlayerAccoladeArrayRetriever.ts" />
/// <reference path="WikipediaHtmlExtractor.ts" />
/// <reference path="Mappers/HallOfFameMapper.ts" />
/// <reference path="Mappers/FiftyGreatestMapper.ts" />
/// <reference path="Mappers/MvpMapper.ts" />
/// <reference path="App.ts" />
/// <reference path="Definitions.ts" />

var jsonGetter = new JsonGetter($);
var wikipediaGetter = new WikipediaGetter($, jsonGetter);
var logger = new Logger();
var combiner = new BballPlayerAccoladeArrayCombiner($, logger);
var collector = new BballPlayerAccoladeArrayCollector(logger, combiner);
var retriever = new BballPlayerAccoladeArrayRetriever(wikipediaGetter);
var htmlExtractor = new WikipediaHtmlExtractor($);
var hofMapper = new HallOfFameMapper($, htmlExtractor);
var fgMapper = new FiftyGreatestMapper($, htmlExtractor);
var mvpMapper = new MvpMapper($, htmlExtractor);

var hofDef = {
    wikipediaPageDefinition : {
        titleInUrl : 'List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame',
        heading: 'List of players in the Naismith Memorial Basketball Hall of Fame'
    },
    mappingFunction: hofMapper.mapTableOfPlayersToArray,
    notifyWhenDoneCallback: collector.setHallOfFamerPlayers
}

var fgDef = {
    wikipediaPageDefinition : {
        titleInUrl : '50_Greatest_Players_in_NBA_History',
        heading: '50 Greatest Players in NBA History'
    },
    mappingFunction: fgMapper.mapTableOfPlayersToArray,
    notifyWhenDoneCallback: collector.setFiftyGreatestPlayers
}

var mvpDef = {
    wikipediaPageDefinition : {
        titleInUrl : 'NBA_Most_Valuable_Player_Award',
        heading: 'NBA Most Valuable Player Award'
    },
    mappingFunction: mvpMapper.mapTableOfPlayersToArray,
    notifyWhenDoneCallback: collector.setMvpPlayers
}

var defs = [
    hofDef,
    fgDef,
    mvpDef
];

new App(retriever).run(defs);