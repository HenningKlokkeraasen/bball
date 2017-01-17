const utils = require('./utils.js');

var self = module.exports = {
    getResource: function(cacheKey, filePath, mapToJson, additionalDataForMapper) {
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
                                return mapToJson(parsedData, additionalDataForMapper);
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
    },

    getResources: function(cacheKey, accoladesResources, teamResources, combine) {
        return new Promise(function(resolve, reject) {
            utils.getFromCache(cacheKey)
                .then(function(cachedData) {
                    if (cachedData) {
                        console.log(`data with key ${cacheKey} is in cache`);
                        resolve(cachedData);
                    } else {
                        console.log(`data with key ${cacheKey} is not in cache`);
                        Promise.all(accoladesResources.map(r => self.getResource(`${r.resource}`, `server/data/${r.resource}.csv`, r.mapper)))
                            .then(function(resultArray) {
                                Promise.all(teamResources.map(r => self.getTeams(r.resource, r.mapper, r.combiner)))
                                    .then(function(resultArray2) {
                                        var joined = [resultArray.map(JSON.parse), resultArray2.map(JSON.parse)].reduce(utils.flatten, []);
                                        var combined = combine(joined);
                                        return JSON.stringify(combined);
                                    })
                                    .then(function(stringified) {
                                        return utils.storeInCache(cacheKey, stringified);
                                    })
                                    .then(function(stringified) {
                                        resolve(stringified);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    },

    getTeams: function(cacheKey, mapToJson, combine) {
        return new Promise(function(resolve, reject) {
            utils.getFromCache(cacheKey)
                .then(function(cachedData) {
                    if (cachedData) {
                        console.log(`data with key ${cacheKey} is in cache`);
                        resolve(cachedData);
                    } else {
                        console.log(`data with key ${cacheKey} is not in cache`);
                        utils.enumerateFiles(`server/data/${cacheKey}`)
                            .then(function(files) {
                                Promise.all(files.map(r => self.getResource(`${cacheKey}_${r}`, `server/data/${cacheKey}/${r}`, mapToJson, r.substring(4, 8))))
                                    .then(function(resultArray) {
                                        var combined = combine(resultArray.map(JSON.parse));
                                        return JSON.stringify(combined);
                                    })
                                    .then(function(stringified) {
                                        return utils.storeInCache(cacheKey, stringified);
                                    })
                                    .then(function(stringified) {
                                        resolve(stringified);
                                    })
                                    .catch(reject);
                            })
                            .catch(reject);
                    }
                })
                .catch(reject);
        });
    }
};