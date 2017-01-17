/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
/// <reference path="DataProvider.ts" />
/// <reference path="BrowserApis/DomRenderer.ts" />

class App {
    run(accolades: Array<Accolade>) {
        var self = this;
        var promises = accolades.map(self.mapAccoladeToPromise);
        Promise.all(promises)
            .then(resultOfPromise => self.renderInDom(accolades, resultOfPromise))
            .catch(console.error);
    }

    mapAccoladeToPromise(a: Accolade) {
        return DataProvider.prototype.getFromLocalStorageOrFetchFromRemote<Array<BballPlayer>>(
            a.urlSegment, 
            function(key) {
                return new Promise<string>(function(resolve, reject) {
                    JsonGetter.prototype.getJson(`http://localhost:1337/${key}`)
                        .then(resolve)
                        .catch(reject);
                });
            }
        );
    }

    renderInDom(tabs: Array<Accolade>, arrayOfArrayOfBballPlayer: Array<Array<BballPlayer>>) {
        var self = this;
        for (var i = 0; i < arrayOfArrayOfBballPlayer.length; i++) {
            var safeDomId = tabs[i].urlSegment.replace('api/', '').replace('/', '-');
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
        }
    }

    makeLink(url: string, title: string) : Link  {
        return {
            uri: url,
            title: title,
            openInNewTab: true
        };
    }
}