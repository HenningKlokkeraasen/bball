
var jsonGetter = new JsonGetter($);
var wikipediaGetter = new WikipediaGetter($, jsonGetter);
var logger = new Logger();
var combiner = new Combiner($, logger);
var collector = new Collector(logger, combiner);
var retriever = new Retriever(wikipediaGetter);

retriever.retrieve('List_of_players_in_the_Naismith_Memorial_Basketball_Hall_of_Fame', 
	'List of players in the Naismith Memorial Basketball Hall of Fame', 
	new HallOfFameHelper($).mapTableOfPlayersToArray,
	collector.assignHallOfFamers);

retriever.retrieve('50_Greatest_Players_in_NBA_History', 
	'50 Greatest Players in NBA History',
	new FiftyGreatestHelper($).mapTableOfPlayersToArray,
	collector.assignFiftyGreatest);

retriever.retrieve('NBA_Most_Valuable_Player_Award', 
	'NBA Most Valuable Player Award', 
	new MvpsHelper($).mapTableOfPlayersToArray,
	collector.assignMvps);
