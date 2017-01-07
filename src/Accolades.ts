/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="WikipediaIntegration/Extractors/ExtractorHelper.ts" />
/// <reference path="WikipediaIntegration/Extractors/HallOfFameExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/FiftyGreatestExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/DreamTeamExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/MvpExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/FinalsMvpExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/AllStarMvpExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/AllStarExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/AllNbaTeamExtractor.ts" />
/// <reference path="WikipediaIntegration/Extractors/NbaChampionshipExtractor.ts" />

var htmlExtractor = new ExtractorHelper();
var hofMapper = new HallOfFameExtractor($, htmlExtractor);
var fgMapper = new FiftyGreatestExtractor($, htmlExtractor);
var dtMapper = new DreamTeamExtractor($, htmlExtractor);
var mvpMapper = new MvpExtractor();
var finalsMvpMapper = new FinalsMvpExtractor();
var allStarMvpMapper = new AllStarMvpExtractor();
var asgMapper = new AllStarExtractor($, htmlExtractor);
var antMapper = new AllNbaTeamExtractor();
var nbaChampionshipExtractor = new NbaChampionshipExtractor(new NbaChampionshipPlayerExtractor());

var accolades = [
    {
        heading: 'List of players in the Naismith Memorial Basketball Hall of Fame',
        tabHeading: 'Hall of Fame',
        wikipediaPageUrlSegment : 'List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame',
        extractor: hofMapper
    },
    {
        heading: 'Dream Team (1992 United States men\'s Olympic basketball team)',
        tabHeading: 'Dream Team',
        wikipediaPageUrlSegment : '1992_United_States_men%27s_Olympic_basketball_team',
        extractor: dtMapper
    },
    {
        heading: '50 Greatest Players in NBA History',
        tabHeading: '50 Greatest',
        wikipediaPageUrlSegment : '50_Greatest_Players_in_NBA_History',
        extractor: fgMapper
    },
    {
        heading: 'NBA Most Valuable Player Award',
        tabHeading: 'NBA MVP',
        wikipediaPageUrlSegment : 'NBA_Most_Valuable_Player_Award',
        extractor: mvpMapper
    },
    {
        heading: 'NBA Finals Most Valuable Player Award',
        tabHeading: 'NBA Finals MVP',
        wikipediaPageUrlSegment : 'Bill_Russell_NBA_Finals_Most_Valuable_Player_Award',
        extractor: finalsMvpMapper
    },
    {
        heading: 'NBA All-Star Game Most Valuable Player Award',
        tabHeading: 'NBA ASG MVP',
        wikipediaPageUrlSegment : 'NBA_All-Star_Game_Most_Valuable_Player_Award',
        extractor: allStarMvpMapper
    },
    {
        heading: 'NBA All-Star',
        tabHeading: 'NBA All-Star',
        wikipediaPageUrlSegment : 'List_of_NBA_All-Stars',
        extractor: asgMapper
    },
    {
        heading: 'All-NBA Team',
        tabHeading: 'All-NBA Team',
        wikipediaPageUrlSegment : 'All-NBA_Team',
        extractor: antMapper
    },
    {
        heading: 'NBA Championships',
        tabHeading: 'NBA Championships',
        wikipediaPageUrlSegment : 'List_of_NBA_champions',
        extractor: nbaChampionshipExtractor
    }
];