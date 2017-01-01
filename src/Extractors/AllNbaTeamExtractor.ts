/// <reference path="ExtractorHelper.ts" />
/// <reference path="../Definitions.ts" />



class AllNbaTeamExtractor {
    constructor(public jQuery, public htmlExtractor: ExtractorHelper) { }
    
    mapTableOfPlayersToArray = (content: string) => {
		var html = this.jQuery.parseHTML(content);
		var arrayOfPlayerObjects = [];
		var foundCount = 0;
        var that = this;
		that.jQuery.each(html, function(i, child) {
			if (that.jQuery(child).is('table.wikitable')) {
				if (that.jQuery(child).children().children().length > 10 && foundCount < 3)
				{
					foundCount++;



						that.jQuery.each(that.jQuery(child).find('tr'), function(j, tr) {
                            if (j > 1) {
								that.extractPlayerFromRow(tr, arrayOfPlayerObjects);
							}
					    	});
					
				}
			}
		});
		return arrayOfPlayerObjects;
    }
    
    extractPlayerFromRow(tr, arrayOfPlayerObjects: Array<BballPlayer>) {
        var firstCell = this.jQuery(tr).children()[0];
        var isFirstRow = firstCell.attributes["rowspan"];

        var indexOfFirstPlayerCell = isFirstRow ? 1 : 0;
        var indexOfSecondPlayerCell = isFirstRow ? 3 : 2;
        var indexOfThirdPlayerCell = isFirstRow ? 5 : 4;

        var data1 = this.extractPlayerFromCell(tr, arrayOfPlayerObjects, indexOfFirstPlayerCell);
        var data2 = this.extractPlayerFromCell(tr, arrayOfPlayerObjects, indexOfSecondPlayerCell);
        var data3 = this.extractPlayerFromCell(tr, arrayOfPlayerObjects, indexOfThirdPlayerCell);

        this.upsertPlayer(tr, arrayOfPlayerObjects, data1.player, data1.values, data1.currentlyInNba,
            () => {
                if (data1.player.numberOfTimesAllNbaFirstTeam)
                    data1.player.numberOfTimesAllNbaFirstTeam = data1.player.numberOfTimesAllNbaFirstTeam + 1;
                else
                    data1.player.numberOfTimesAllNbaFirstTeam = 1;
            },
            (player) => {
                player.numberOfTimesAllNbaFirstTeam = 1;
            }
        );

        this.upsertPlayer(tr, arrayOfPlayerObjects, data2.player, data2.values, data2.currentlyInNba,
            () => {
                if (data2.player.numberOfTimesAllNbaSecondTeam)
                    data2.player.numberOfTimesAllNbaSecondTeam = data2.player.numberOfTimesAllNbaSecondTeam + 1;
                else
                    data2.player.numberOfTimesAllNbaSecondTeam = 1;
            },
            (player) => {
                player.numberOfTimesAllNbaSecondTeam = 1;
            }
        );

        this.upsertPlayer(tr, arrayOfPlayerObjects, data3.player, data3.values, data1.currentlyInNba,
            () => {
                if (data3.player.numberOfTimesAllNbaThirdTeam)
                    data3.player.numberOfTimesAllNbaThirdTeam = data3.player.numberOfTimesAllNbaThirdTeam + 1;
                else
                    data3.player.numberOfTimesAllNbaThirdTeam = 1;
            },
            (player) => {
                player.numberOfTimesAllNbaThirdTeam = 1;
            }
        );
    }

    extractPlayerFromCell(tr, arrayOfPlayerObjects: Array<BballPlayer>, index: number) {
        var cell = this.jQuery(tr).children()[index];
        var values  = undefined;
        var player = undefined;
        var currentlyInNba  = undefined;
        if (cell) {
            values = this.htmlExtractor.extractPlayerValuesFromLinkInCell(cell);
            currentlyInNba = cell.innerText.indexOf("^") > 0
            player = arrayOfPlayerObjects.find(p => BballAliasFinder.prototype.findByIdOrAlternateId(p, values.id));
        }
        return {
            player: player,
            currentlyInNba: currentlyInNba,
            values: values
        }
    }

    upsertPlayer(tr, arrayOfPlayerObjects: Array<BballPlayer>, player: BballPlayer, playerValues, currentlyInNba,
        setOrIncreaseCount: () => void,
        setProperty: (BballPlayer) => void) {
        if (player) {
            setOrIncreaseCount();
            BballPlayerFactory.prototype.addAliases({ id: playerValues.id, name: playerValues.name, position: null }, player);
        }
        else if (playerValues) {
            var p = {
                id: playerValues.id,
                name : playerValues.name,
                position : null,
                currentlyInNba: currentlyInNba
            };
            setProperty(p);
            arrayOfPlayerObjects.push(p);
        }
    }
}
