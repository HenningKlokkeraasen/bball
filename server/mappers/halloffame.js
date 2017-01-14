var self = module.exports = {

    // parsedCsv: [
    //     lineOneArray[],
    //     lineTwoArray[],
    //     ...
    // ]
    mapToJson: function(parsedCsv) {
        return parsedCsv.filter(self.isPlayer).map(self.mapToPlayer);
    },

    isPlayer: function(rowArr) {
        return rowArr[2] === 'Player';
    },

    mapToPlayer: function(rowArr) {
        var year = rowArr[0];
        var player = rowArr[1];
        var playerValues = player.split(' ');
        var names = playerValues.filter(self.isName);
        var name = names.join(' ');
        var assumedId = self.generateAssumedId(names);
        return { id: assumedId, name: name, yearInductedInHof: year };
    },

    isName: function(nameCandidate) {
        return nameCandidate.indexOf('CBB') < 0
            && nameCandidate.indexOf('coach') < 0
            && nameCandidate.indexOf('Player') < 0
            && nameCandidate.indexOf('/') < 0
            && nameCandidate.indexOf('Euro') < 0
            && nameCandidate.indexOf('Oly') < 0
            && nameCandidate.indexOf('player') < 0
            && nameCandidate.indexOf('WNBA') < 0
            && nameCandidate.indexOf('Coach') < 0
            && nameCandidate.indexOf('Exec') < 0
            && nameCandidate.indexOf('NBL') < 0
    },

    generateAssumedId: function(names) {
        var firstName = names[0];
        var lastTwoLetters = firstName.substring(0, 2);
        
        var lastName = names[names.length - 1];
        var firstLetters = lastName.length <= 5 ? lastName
            : lastName.substring(0, 5);

        var assumedId = `${firstLetters.toLowerCase()}${lastTwoLetters.toLowerCase()}01`;
        return assumedId;
    }
}