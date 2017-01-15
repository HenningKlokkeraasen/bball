var self = module.exports = {
    clone: function(from) {
        var newPlayer = {
            id: from.id,
            name: from.name,
            position: from.position
        };
        self.copyNotNullProperties(from, newPlayer);
        return newPlayer;
    },

    copyNotNullProperties: function(from, to) {
        if (from.isOnFiftyGreatestList)
            to.isOnFiftyGreatestList = from.isOnFiftyGreatestList;
        if (from.yearInductedInHof)
            to.yearInductedInHof = from.yearInductedInHof;
        if (from.isOnDreamTeam)
            to.isOnDreamTeam = from.isOnDreamTeam;
        if (from.currentlyInNba)
            to.currentlyInNba = from.currentlyInNba;
        self.addNbaChampionships(from, to);
        self.setMvpData(from, to);
        self.setFinalsMvpData(from, to);
        self.setAllStarMvpData(from, to);
        self.setAllNbaTeamData(from, to);
        self.setAllStarData(from, to);
        self.addPositions(from, to);
        self.addAliases(from, to);
    },

    addNbaChampionships: function(from, to) {
        if (from.numberOfNbaChampionships)
            to.numberOfNbaChampionships = from.numberOfNbaChampionships;
        if (from.nbaChampionshipYears)
            to.nbaChampionshipYears = from.nbaChampionshipYears;
    },

    setMvpData: function(from, to) {
        if (from.numberOfTimesMvp)
            to.numberOfTimesMvp = from.numberOfTimesMvp;
        if (from.mvpSeasons)
            to.mvpSeasons = from.mvpSeasons;
    },

    setFinalsMvpData: function(from, to) {
        if (from.numberOfTimesFinalsMvp)
            to.numberOfTimesFinalsMvp = from.numberOfTimesFinalsMvp;
        if (from.finalsMvpSeasons)
            to.finalsMvpSeasons = from.finalsMvpSeasons;
    },

    setAllStarMvpData: function(from, to) {
        if (from.numberOfTimesAllStarMvp)
            to.numberOfTimesAllStarMvp = from.numberOfTimesAllStarMvp;
        if (from.allStarMvpSeasons)
            to.allStarMvpSeasons = from.allStarMvpSeasons;
    },

    setAllNbaTeamData: function(from, to) {
        if (from.numberOfTimesAllNbaFirstTeam)
            to.numberOfTimesAllNbaFirstTeam = from.numberOfTimesAllNbaFirstTeam;
        if (from.numberOfTimesAllNbaSecondTeam)
            to.numberOfTimesAllNbaSecondTeam = from.numberOfTimesAllNbaSecondTeam;
        if (from.numberOfTimesAllNbaThirdTeam)
            to.numberOfTimesAllNbaThirdTeam = from.numberOfTimesAllNbaThirdTeam;

        if (from.allNbaFirstTeamSeasons)
            to.allNbaFirstTeamSeasons = from.allNbaFirstTeamSeasons;
        if (from.allNbaSecondTeamSeasons)
            to.allNbaSecondTeamSeasons = from.allNbaSecondTeamSeasons;
        if (from.allNbaThirdTeamSeasons)
            to.allNbaThirdTeamSeasons = from.allNbaThirdTeamSeasons;
    },

    setAllStarData: function(from, to) {
        if (from.allStarAppearanceCount) 
            to.allStarAppearanceCount = from.allStarAppearanceCount;
        if (from.allStarAppearanceYears) 
            to.allStarAppearanceYears = from.allStarAppearanceYears;
        if (from.allStarAppearanceNotes) 
            to.allStarAppearanceNotes = from.allStarAppearanceNotes;
    },

    addPositions: function(from, to) {
        from.position = self.normalizePosition(from.position);
        to.position = self.normalizePosition(to.position);

        if (from.position && from.position !== to.position)
            to.position = to.position ? `${to.position}, ${from.position}` : from.position;
    },

    normalizePosition: function(position) {
        if (position === "Center") return "C";
        if (position === "Forward") return "F";
        if (position === "Guard") return"G";
        if (position === "Center/Forward" || position === "C-F") return "C/F";
        if (position === "Forward/Center" || position === "F-C") return "F/C";
        if (position === "Guard/Forward" || position === "G-F") return "G/F";
        if (position === "Forward/Guard" || position === "F-G") return "F/G";
        return position;
    },

    addAliases: function(from, to) {
        if (from.name && from.name !== to.name)
            to.aliases = to.aliases
                ? to.aliases.includes(from.name) 
                    ? to.aliases 
                    : `${to.aliases}, ${from.name}` 
                : from.name;
    }
}