/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
/// <reference path="WikipediaIntegration/WikipediaIntegrator.ts" />
/// <reference path="DataProvider.ts" />
/// <reference path="BrowserApis/DomRenderer.ts" />

class App {
    run(accolades: Array<Accolade>) {
        var self = this;
        var promises = self.mapAccoladesToPromises(accolades);
        Promise.all(promises)
            .then(resultOfPromise => self.renderInDom(accolades, resultOfPromise))
            .catch(console.error);
    }

    mapAccoladesToPromises(acolades: Array<Accolade>) {
        var self = this;
        var promises = [];
        acolades.forEach(a => promises.push(
            DataProvider.prototype.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
                a.wikipediaPageUrlSegment, 
                WikipediaIntegrator.prototype.getWikiText,
                a.extractor)));
        return promises;
    }

    renderInDom(tabs: Array<Accolade>, arrayOfArrayOfBballPlayer: Array<Array<BballPlayer>>) {
        var self = this;
        var bunchOfPlayers = new Array<Array<BballPlayer>>();

        for (var i = 0; i < arrayOfArrayOfBballPlayer.length; i++) {
            var safeDomId = tabs[i].wikipediaPageUrlSegment.replace('%27', '');
            DomRenderer.prototype.renderBballPlayerTab(
                tabs[i].tabHeading,
                safeDomId,
                i === 0,
                "placeholderTabs"
            );
            DomRenderer.prototype.renderBballPlayerTable(
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
        
        var combinedPlayers = BballPlayerArrayJoiner.prototype.combine(bunchOfPlayers);
        DomRenderer.prototype.renderBballPlayerTab(
            "Combined",
            "combined",
            false,
            "placeholderTabs"
        );
        DomRenderer.prototype.renderBballPlayerTable(
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