/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Definitions.ts" />

class JsonGetter {
	constructor(public jQuery) { }

	getJson(url: string) {
		return new Promise<any>(function(resolve, reject) {
			this.jQuery.ajax({
				url: url,
				dataType: 'jsonp'
			}).done(resolve).fail(reject);
		});
	}
}

class Logger {
	log(logline: string, logtable?: Array<any>) {
		console.log(logline);
		if (logtable != undefined && console.table != undefined)
			console.table(logtable);
	}
}

class DomIntegrator {
	renderBballPlayerTable(heading: string, id: string, isActive: boolean, arrayOfPlayerObjects: Array<BballPlayer>, placeholderId: string) {
		var html = Handlebars.templates['bballtable.hbs']({
			heading: heading, 
			items: arrayOfPlayerObjects,
			isActive: isActive,
			id: id
		});
		document.getElementById(placeholderId).innerHTML += html;
	}

	renderBballPlayerTab(heading: string, id: string, isActive: boolean, placeholderId: string) {
		var html = Handlebars.templates['bballtab.hbs']({
			heading: heading,
			isActive: isActive,
			id: id
		});
		document.getElementById(placeholderId).innerHTML += html;
	}
}

class LocalStorageIntegrator {
	getFromStorage(key: string) {
		return new Promise<string>(function(resolve, reject) {
			var item = localStorage.getItem(key);
			if (item) {
				console.debug(`item ${key} found in LocalStorage`);
				resolve(item);
			}
			else {
				console.debug(`item ${key} not in LocalStorage`);
				reject(`item ${key} not in LocalStorage`);
			}
		});
	}

	saveInStorage(key: string, item: string) {
		return new Promise(function(resolve, reject) {
			try {
				localStorage.setItem(key, item);
				console.debug(`saved item ${key} in LocalStorage`)
				resolve();
			}
			catch (ex) {
				reject(ex);
			}
		});
	}
}

class LocalOrRemoteStorage {
    _lsi;
    constructor(lsi: LocalStorageIntegrator) {
        this._lsi = lsi;
    }

    /*
     * Gets an array of type T from LocalStorage if it exists,
     * If not, gets it remotely and stores it in LocalStorage.
     * getFromRemote: a function that is Promise that returns a raw string.
     * map: a function that maps the raw string to an array of type T.
    */
    getFromLocalStorageOrFetchFromRemote<T>(key: string, getFromRemote: (key: string) => Promise<string>, map: (html: string) => any) {
        var self = this;
        return new Promise<T>(function(resolve, reject) {
            self._lsi.getFromStorage(key)
                .then(function(result) {
                    var deserialized = JSON.parse(result);
                    resolve(deserialized);
                })
                .catch(function(err) {
                    getFromRemote(key)
                        .then(function (result) {
                            var mapped = map(result);
                            self._lsi.saveInStorage(key, JSON.stringify(mapped));
                            resolve(mapped);
                        })
                        .catch(reject);
                });
        });
    }
}
