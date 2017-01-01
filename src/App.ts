/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />

class App {
    _lrs: LocalOrRemoteStorage;
    _domIntegrator: DomRenderer;
    _wikipediaIntegrator: WikipediaIntegrator;
    _combiner: BballPlayerArrayJoiner;

    constructor(lrs: LocalOrRemoteStorage, domIntegrator: DomRenderer, 
    wikipediaIntegrator: WikipediaIntegrator, combiner: BballPlayerArrayJoiner) {
        this._lrs = lrs;
        this._domIntegrator = domIntegrator;
        this._wikipediaIntegrator = wikipediaIntegrator;
        this._combiner = combiner;
    }

    run(data: Array<any>) {
        var self = this;
        var promises = self.mapDataToPromises(data);
        Promise.all(promises)
            .then(arrayOfResults => self.renderInDom(data, arrayOfResults))
            .catch(console.error);
    }

    mapDataToPromises(data: Array<any>) {
        var self = this;
        var promises = [];
        data.forEach(e => promises.push(
            self._lrs.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
                e.wikipediaPageUrlSegment, 
                self._wikipediaIntegrator.getWikiText,
                e.mappingFunction)));
        return promises;
    }

    renderInDom(data: Array<any>, arrayOfResults: Array<any>) {
        var self = this;
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
    }
}