class BballPlayerFactory {
    clone(from: BballPlayer) {
        var newPlayer = {
            id: from.id,
            name: from.name,
            position: from.position
        };
        this.copyNotNullProperties(from, newPlayer);
        return newPlayer;
    }

    copyNotNullProperties(from: BballPlayer, to: BballPlayer) {
        if (from.isOnFiftyGreatestList)
            to.isOnFiftyGreatestList = from.isOnFiftyGreatestList;
        if (from.yearInductedInHof)
            to.yearInductedInHof = from.yearInductedInHof;
        if (from.isOnDreamTeam)
            to.isOnDreamTeam = from.isOnDreamTeam;
        if (from.currentlyInNba)
            to.currentlyInNba = from.currentlyInNba;
        BballPlayerFactory.prototype.addNbaChampionships(from, to);
        BballPlayerFactory.prototype.setMvpData(from, to);
        BballPlayerFactory.prototype.setFinalsMvpData(from, to);
        BballPlayerFactory.prototype.setAllStarMvpData(from, to);
        BballPlayerFactory.prototype.setAllNbaTeamData(from, to);
        BballPlayerFactory.prototype.setAllStarData(from, to);
        BballPlayerFactory.prototype.addPositions(from, to);
        BballPlayerFactory.prototype.addAliases(from, to);
    }

    addNbaChampionships(from: BballPlayer, to: BballPlayer) {
        if (from.numberOfNbaChampionships)
            to.numberOfNbaChampionships = from.numberOfNbaChampionships;
        if (from.nbaChampionshipYears)
            to.nbaChampionshipYears = from.nbaChampionshipYears;
    }

    setMvpData(from: BballPlayer, to: BballPlayer) {
        if (from.numberOfTimesMvp)
            to.numberOfTimesMvp = from.numberOfTimesMvp;
        if (from.mvpSeasons)
            to.mvpSeasons = from.mvpSeasons;
    }

    setFinalsMvpData(from: BballPlayer, to: BballPlayer) {
        if (from.numberOfTimesFinalsMvp)
            to.numberOfTimesFinalsMvp = from.numberOfTimesFinalsMvp;
        if (from.finalsMvpSeasons)
            to.finalsMvpSeasons = from.finalsMvpSeasons;
    }

    setAllStarMvpData(from: BballPlayer, to: BballPlayer) {
        if (from.numberOfTimesAllStarMvp)
            to.numberOfTimesAllStarMvp = from.numberOfTimesAllStarMvp;
        if (from.allStarMvpYears)
            to.allStarMvpYears = from.allStarMvpYears;
    }

    setAllNbaTeamData(from: BballPlayer, to: BballPlayer) {
        if (from.numberOfTimesAllNbaFirstTeam)
            to.numberOfTimesAllNbaFirstTeam = from.numberOfTimesAllNbaFirstTeam;
        if (from.numberOfTimesAllNbaSecondTeam)
            to.numberOfTimesAllNbaSecondTeam = from.numberOfTimesAllNbaSecondTeam;
        if (from.numberOfTimesAllNbaThirdTeam)
            to.numberOfTimesAllNbaThirdTeam = from.numberOfTimesAllNbaThirdTeam;
    }

    setAllStarData(from: BballPlayer, to: BballPlayer) {
        if (from.allStarAppearanceCount) 
            to.allStarAppearanceCount = from.allStarAppearanceCount;
        if (from.allStarAppearanceYears) 
            to.allStarAppearanceYears = from.allStarAppearanceYears;
        if (from.allStarAppearanceNotes) 
            to.allStarAppearanceNotes = from.allStarAppearanceNotes;
    };

    addPositions(from: BballPlayer, to: BballPlayer) {
        from.position = BballPlayerFactory.prototype.normalizePosition(from.position);
        to.position = BballPlayerFactory.prototype.normalizePosition(to.position);

        if (from.position && from.position !== to.position)
            to.position = to.position ? `${to.position}, ${from.position}` : from.position;
    }

    normalizePosition(position: string) {
        if (position === "Center") return "C";
        if (position === "Forward") return "F";
        if (position === "Guard") return"G";
        if (position === "Center/Forward" || position === "C-F") return "C/F";
        if (position === "Forward/Center" || position === "F-C") return "F/C";
        if (position === "Guard/Forward" || position === "G-F") return "G/F";
        if (position === "Forward/Guard" || position === "F-G") return "F/G";
        return position;
    }

    addAliases(from: BballPlayer, to: BballPlayer) {
        if (from.name && from.name !== to.name)
            to.aliases = to.aliases
                ? to.aliases.includes(from.name) 
                    ? to.aliases 
                    : `${to.aliases}, ${from.name}` 
                : from.name;
    }
}