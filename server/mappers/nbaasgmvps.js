const mappingUtils = require('./mappingUtils.js');

var self = module.exports = {
    mapToJson: function(parsedCsv) {
        return mappingUtils.mapMvpishCsvToJson(parsedCsv, self.buildObject);
    },

    buildObject: function(mvpishObject) {
        return { 
            id: mvpishObject.id, 
            name: mvpishObject.name, 
            numberOfTimesAllStarMvp: mvpishObject.numberOfTimes, 
            allStarMvpSeasons: mvpishObject.seasons };
    }
}