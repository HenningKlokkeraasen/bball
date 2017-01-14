const utils = require('./utils.js');

module.exports = {
    get: function(cacheKey, filePath, mapToJson) {
        return new Promise(function(resolve, reject) {
            utils.getFromCache(cacheKey)
                .then(function(cachedData) {
                    if (cachedData) {
                        console.log(`data with key ${cacheKey} is in cache`);
                        resolve(cachedData);
                    } else {
                        console.log(`data with key ${cacheKey} is not in cache`);
                        utils.readFile(filePath)
                            .then(function(csvData) {
                                return utils.parseCsv(csvData);
                            })
                            .then(function(parsedData) {
                                return mapToJson(parsedData);
                            })
                            .then(function(jsonData) {
                                return JSON.stringify(jsonData);
                            })
                            .then(function(stringified) {
                                return utils.storeInCache(cacheKey, stringified);
                            })
                            .then(function(stringified) {
                                resolve(stringified);
                            })
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    }
};