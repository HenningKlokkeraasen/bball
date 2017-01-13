/// <reference path="../../../../ts-dts/jquery.d.ts" />
/// <reference path="../ExtractorHelper.ts" />

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
