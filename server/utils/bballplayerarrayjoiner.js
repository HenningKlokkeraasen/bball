const bballplayerfactory = require('./bballplayerfactory.js');
const combinedscorecalculator = require('./combinedscorecalculator.js');

var self = module.exports = {
    combine(bunchOfPlayers) {
        var combinedPlayers = [];
        bunchOfPlayers.forEach(function(stringified) {
            // TODO get before JSON.stringify in dataProvider to avoid ser-deser-ser
            var arrayOfPlayers = JSON.parse(stringified);
            arrayOfPlayers.forEach(function(player) {
                var existingPlayer = combinedPlayers.find(p => p.id === player.id);
                if (existingPlayer === undefined)
                    combinedPlayers.push(bballplayerfactory.clone(player));
                else
                    bballplayerfactory.copyNotNullProperties(player, existingPlayer)
            });
        });
        combinedPlayers.forEach(player => player.combinedScore = combinedscorecalculator.calculateScore(player));
        return combinedPlayers;
    }
}