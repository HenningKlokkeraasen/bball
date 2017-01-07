/// <reference path="BrowserApis/LocalStorageIntegrator.ts" />

class DataProvider {
    /*
     * Gets an array of type T from LocalStorage if it exists,
     * If not, gets it remotely and stores it in LocalStorage.
     * getFromRemote: a function that is Promise that returns a raw string.
     * extractor: a class that has a function that maps the raw string to an array of type T.
    */
    getFromLocalStorageOrFetchFromRemote<T>(key: string, getFromRemote: (key: string) => Promise<string>, extractor: IWikipediaExtractor) {
        var self = this;
        return new Promise<T>(function(resolve, reject) {
            LocalStorageIntegrator.prototype.getFromStorage(key)
                .then(function(result) {
                    var deserialized = JSON.parse(result);
                    resolve(deserialized);
                })
                .catch(function(err) {
                    getFromRemote(key)
                        .then(function (result) {
                            var bballPlayerArray = extractor.extractBballPlayerArray(result);
                            LocalStorageIntegrator.prototype.saveInStorage(key, JSON.stringify(bballPlayerArray));
                            resolve(bballPlayerArray);
                        })
                        .catch(reject);
                });
        });
    }
}
