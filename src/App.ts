/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />

class App {
    _lrs: LocalOrRemoteStorage;
    _domIntegrator: DomIntegrator;
    _wikipediaIntegrator: WikipediaIntegrator;
    _combiner: BballPlayerArrayJoiner;

    constructor(lrs: LocalOrRemoteStorage, domIntegrator: DomIntegrator, 
    wikipediaIntegrator: WikipediaIntegrator, combiner: BballPlayerArrayJoiner) {
        this._lrs = lrs;
        this._domIntegrator = domIntegrator;
        this._wikipediaIntegrator = wikipediaIntegrator;
        this._combiner = combiner;
    }

    run(data: Array<any>) {
        var self = this;

        var promises = [];
        data.forEach(e => promises.push(
            self._lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
                e.wikipediaPageUrlSegment, 
                self._wikipediaIntegrator.getHtmlOfWikipediaPageByTitleInUrl,
                e.mappingFunction)));

        Promise.all(promises)
            .then(function(arrayOfResults) {
                var bunchOfPlayers = new Array<Array<BballPlayer>>();

                for (var i = 0; i < arrayOfResults.length; i++){
                    var safeDomId = data[i].wikipediaPageUrlSegment.replace('%27', '');
                    self._domIntegrator.renderBballPlayerTab(
                        data[i].tabHeading,
                        safeDomId,
                        i === 0,
                        "placeholderTabs"
                    );
                    self._domIntegrator.renderBballPlayerTable(
                        data[i].heading,
                        safeDomId,
                        data[i].wikipediaPageUrlSegment,
                        i === 0,
                        arrayOfResults[i],
                        "placeholderTabContent"
                    );
                    bunchOfPlayers[safeDomId] = arrayOfResults[i];
                }
                
                var combinedPlayers = self._combiner.combine(bunchOfPlayers);
                self._domIntegrator.renderBballPlayerTab(
                    "Combined!",
                    "combined",
                    false,
                    "placeholderTabs"
                );
                self._domIntegrator.renderBballPlayerTable(
                    "Combined!", 
                    "combined",
                    null,
                    false,
                    combinedPlayers,
                    "placeholderTabContent"
                );
            })
            .catch(console.error);
    }
}