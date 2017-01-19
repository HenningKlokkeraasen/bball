/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="DataProvider.ts" />
/// <reference path="BrowserApis/DomRenderer.ts" />

class App {
    run(accolades: Array<Accolade>) {
        var self = this;
        accolades.forEach(self.renderTab);
        self.bindTabClick();
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

    renderInDom(accolade: Accolade, arrayOfBballPlayer: Array<BballPlayer>) {
        DomRenderer.prototype.renderBballPlayerTable(
            accolade.heading,
            accolade.bodyText,
            App.prototype.generateDomId(accolade),
            [App.prototype.makeLink(accolade.sourceUrl, 'basketball-reference.com')],
            true,
            arrayOfBballPlayer,
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

    getAccolade(e) {
        var activatedTab = e.target;
        var relatedTab = e.relatedTarget;
        
        var urlSegment = $(activatedTab).data('urlsegment');
        var heading = $(activatedTab).data('heading');
        var sourceurl = $(activatedTab).data('sourceurl');

        var havedata = $(activatedTab).data('havedata');
        if (havedata === 'true') {
            return;
        }

        // Trigger current tab, if not, new tab will be shown before data has arrived
        $(relatedTab).tab('show');

        var accolade = { heading: heading, sourceUrl: sourceurl, urlSegment: urlSegment };
        App.prototype.mapAccoladeToPromise(accolade)
            .then(function(result) {
                $(activatedTab).data('havedata', 'true');
                App.prototype.renderInDom(accolade, result);
                $(activatedTab).tab('show');
            })
            .catch();
    }

    renderTab(a: Accolade) {
        DomRenderer.prototype.renderBballPlayerTab(
            a,
            App.prototype.generateDomId(a),
            false,
            "placeholderTabs"
        );
    }

    generateDomId(accolade: Accolade) {
        return accolade.urlSegment.replace('api/', '').replace('/', '-');
    }

    bindTabClick() {
        var self = this;
        $('a[data-toggle="tab"]').on('shown.bs.tab', self.getAccolade);
    }
}