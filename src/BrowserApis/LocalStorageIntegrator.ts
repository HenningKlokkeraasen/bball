
class LocalStorageIntegrator {
	getFromStorage(key: string) {
		return new Promise<string>(function(resolve, reject) {
			var item = localStorage.getItem(key);
			if (item) {
				// console.debug(`item ${key} found in LocalStorage`);
				resolve(item);
			}
			else {
				// console.debug(`item ${key} not in LocalStorage`);
				reject(`item ${key} not in LocalStorage`);
			}
		});
	}

	saveInStorage(key: string, item: string) {
		return new Promise(function(resolve, reject) {
			try {
				// TODO remove temporary skip for NBA championship
				if (key.indexOf('season') > 1 || key.indexOf('champions') > 1) {
					console.debug('skipping LS for championships');
					resolve();
				} else {
				localStorage.setItem(key, item);
				// console.debug(`saved item ${key} in LocalStorage`)
				resolve();
				}
			}
			catch (ex) {
				reject(ex);
			}
		});
	}
}
