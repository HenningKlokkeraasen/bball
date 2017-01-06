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

    renderInDom(tabs: Array<any>, arrayOfArrayOfBballPlayer: Array<any>) {
        var self = this;
        var bunchOfPlayers = new Array<Array<BballPlayer>>();

        for (var i = 0; i < arrayOfArrayOfBballPlayer.length; i++){
            var safeDomId = tabs[i].wikipediaPageUrlSegment.replace('%27', '');
            self._domIntegrator.renderBballPlayerTab(
                tabs[i].tabHeading,
                safeDomId,
                i === 0,
                "placeholderTabs"
            );
            self._domIntegrator.renderBballPlayerTable(
                tabs[i].heading,
                tabs[i].bodyText,
                safeDomId,
                [self.makeWikipediaLink(tabs[i].wikipediaPageUrlSegment, tabs[i].heading)],
                i === 0,
                arrayOfArrayOfBballPlayer[i],
                "placeholderTabContent"
            );
            bunchOfPlayers[safeDomId] = arrayOfArrayOfBballPlayer[i];
        }
        
        var combinedPlayers = self._combiner.combine(bunchOfPlayers);
        self._domIntegrator.renderBballPlayerTab(
            "Combined",
            "combined",
            false,
            "placeholderTabs"
        );
        self._domIntegrator.renderBballPlayerTable(
            "Combined", 
            "Combined list of accolades for all players",
            "combined",
            tabs.map(e => self.makeWikipediaLink(e.wikipediaPageUrlSegment, e.heading)),
            false,
            combinedPlayers,
            "placeholderTabContent"
        );
    }

    makeWikipediaLink(wikipediaPageUrlSegment: string, title: string) : Link  {
        return {
            uri: `https://en.wikipedia.org/wiki/${wikipediaPageUrlSegment}`,
            title: `Wikipedia: ${title}`,
            openInNewTab: true
        };
    }
}