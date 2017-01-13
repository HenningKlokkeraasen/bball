/// <reference path="../ExtractorHelper.ts" />
/// <reference path="../../../Definitions.ts" />
/// <reference path="RosterTableExtractor.ts" />
/// <reference path="RosterNavboxExtractor.ts" />
/// <reference path="DepthChartExtractor.ts" />
/// <reference path="PlayerStatsExtractor.ts" />

/// Extracts the PLAYERS from a Wikipedia team season page
class NbaChampionshipPlayerExtractor  implements IWikipediaExtractor{

    extractBballPlayerArray(content: string) : Array<BballPlayer>{
		var html = $.parseHTML(content);
		var arrayOfPlayerObjects = new Array();

        if (RosterTableExtractor.prototype.hasRosterTable(html)) {
            var rows = RosterTableExtractor.prototype.extractRowsFromRosterTable(html);
            if (rows.length > 1) {
                arrayOfPlayerObjects = rows.map(RosterTableExtractor.prototype.extractPlayerFromRowInRosterTable);
            } else {
                console.warn('could not find any rows in roster table');
            }
        }
        else if (DepthChartExtractor.prototype.hasDepthChart(html)) {
            var rows = DepthChartExtractor.prototype.extractRowsFromDepthChart(html);
            rows.forEach(function(row) {
                var players = DepthChartExtractor.prototype.extractPlayersFromRowInDepthChart(row);
                players.forEach(p => arrayOfPlayerObjects.push(p));
            });
        }
        else if (PlayerStatsExtractor.prototype.hasPlayerStatsTable(html)) {
            var rows = PlayerStatsExtractor.prototype.extractRowsFromPlayerStatsTable(html);
            arrayOfPlayerObjects = rows.map(PlayerStatsExtractor.prototype.extractPlayerFromRowInPlayerStatsTable);
        }
        else if (RosterNavboxExtractor.prototype.hasRosterNavbox(html)) {
            var playerValues = RosterNavboxExtractor.prototype.extractLinksFromRosterNavbox(html);
            playerValues.forEach(p => {
                arrayOfPlayerObjects.push({
                    id: p.id,
                    name : p.name,
                    numberOfNbaChampionships : 1,
                    nbaChampionshipYears: [0] // todo
                })
            });
        }

		return arrayOfPlayerObjects;
    }
}