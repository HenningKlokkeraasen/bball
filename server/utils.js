const fs = require('fs');
const csvparse = require('csv-parse');
const NodeCache = require('node-cache');

const myCache = new NodeCache();

module.exports = {
    readFile: function(filePath) {
        return new Promise(function(resolve, reject) {
            fs.readFile(filePath, 'utf8', function(err, data) {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    },

    parseCsv: function(input) {
        // console.log(input);
        return new Promise(function(resolve, reject) {
            var options = { relax_column_count: true };
            csvparse(input, options, function(err, data) {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    },

    storeInCache: function(key, object) {
        return new Promise(function(resolve, reject) {
            myCache.set(key, object, function(err, success) {
                if (err)
                    reject(err);
                    
                if (success)
                    console.log(`stored data with key ${key} in cache`);
                else
                    console.error(`could not store data with key ${key} in cache`);

                resolve(object);
            });
        });
    },

    getFromCache: function(key) {
        return new Promise(function(resolve, reject) {
            myCache.get(key, function(err, value) {
                if (err)
                    reject(err);
                resolve(value);
            });
        });
    }
}