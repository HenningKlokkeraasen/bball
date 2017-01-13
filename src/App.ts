/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
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

    mapAccoladesToPromises(accolades: Array<Accolade>) {
        var self = this;
        var promises = [];
        accolades.forEach(a => promises.push(
            DataProvider.prototype.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
                a.urlSegment, 
                function(key) { 
                    return new Promise<string>(function(resolve, reject) {
                        CrossDomainJsonGetter.prototype.getJson(`http://localhost:1337/${key}`)
                            .then(resolve)
                            .catch(reject);
                    });
                 }
        )));
        return promises;
    }

    renderInDom(tabs: Array<Accolade>, arrayOfArrayOfBballPlayer: Array<Array<BballPlayer>>) {
        var self = this;
        var bunchOfPlayers = new Array<Array<BballPlayer>>();

        for (var i = 0; i < arrayOfArrayOfBballPlayer.length; i++) {
            var safeDomId = tabs[i].urlSegment.replace('/api/', '');
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
                [self.makeLink(tabs[i].sourceUrl, 'basketball-reference.com')],
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
            tabs.map(e => self.makeLink(e.sourceUrl, 'basketball-reference.com')),
            false,
            combinedPlayers,
            "placeholderTabContent"
        );
    }

    makeLink(url: string, title: string) : Link  {
        return {
            uri: url,
            title: title,
            openInNewTab: true
        };
    }
}