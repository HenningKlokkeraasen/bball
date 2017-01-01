/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="Extractors/ExtractorHelper.ts" />
/// <reference path="Extractors/HallOfFameExtractor.ts" />
/// <reference path="Extractors/FiftyGreatestExtractor.ts" />
/// <reference path="Extractors/DreamTeamExtractor.ts" />
/// <reference path="Extractors/MvpExtractor.ts" />
/// <reference path="Extractors/AllStarExtractor.ts" />
/// <reference path="Extractors/AllNbaTeamExtractor.ts" />


var htmlExtractor = new ExtractorHelper();
var hofMapper = new HallOfFameExtractor($, htmlExtractor);
var fgMapper = new FiftyGreatestExtractor($, htmlExtractor);
var dtMapper = new DreamTeamExtractor($, htmlExtractor);
var mvpMapper = new MvpExtractor($, htmlExtractor);
var asgMapper = new AllStarExtractor($, htmlExtractor);
var antMapper = new AllNbaTeamExtractor($, htmlExtractor);

var dataDefinition = [
    {
        heading: 'List of players in the Naismith Memorial Basketball Hall of Fame',
        tabHeading: 'Hall of Fame',
        wikipediaPageUrlSegment : 'List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame',
        mappingFunction: hofMapper.mapTableOfPlayersToArray
    },
    {
        heading: 'Dream Team (1992 United States men\'s Olympic basketball team)',
        tabHeading: 'Dream Team',
        wikipediaPageUrlSegment : '1992_United_States_men%27s_Olympic_basketball_team',
        mappingFunction: dtMapper.mapTableOfPlayersToArray
    },
    {
        heading: '50 Greatest Players in NBA History',
        tabHeading: '50 Greatest',
        wikipediaPageUrlSegment : '50_Greatest_Players_in_NBA_History',
        mappingFunction: fgMapper.mapTableOfPlayersToArray
    },
    {
        heading: 'NBA Most Valuable Player Award',
        tabHeading: 'NBA MVP',
        wikipediaPageUrlSegment : 'NBA_Most_Valuable_Player_Award',
        mappingFunction: mvpMapper.mapTableOfPlayersToArray
    },
    {
        heading: 'NBA All-Star',
        tabHeading: 'NBA All-Star',
        wikipediaPageUrlSegment : 'List_of_NBA_All-Stars',
        mappingFunction: asgMapper.mapTableOfPlayersToArray
    },
    {
        heading: 'All-NBA Team',
        tabHeading: 'All-NBA Team',
        wikipediaPageUrlSegment : 'All-NBA_Team',
        mappingFunction: antMapper.mapTableOfPlayersToArray
    }
];