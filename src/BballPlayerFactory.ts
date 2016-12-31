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
        if (from.isOnFiftyGreatesList)
            to.isOnFiftyGreatesList = from.isOnFiftyGreatesList;
        if (from.numberOfTimesMvp)
            to.numberOfTimesMvp = from.numberOfTimesMvp;
        if (from.yearInductedInHof)
            to.yearInductedInHof = from.yearInductedInHof;
        if (from.isOnDreamTeam)
            to.isOnDreamTeam = from.isOnDreamTeam;
        BballPlayerFactory.prototype.addPositions(from, to);
        BballPlayerFactory.prototype.addAliases(from, to);
    }

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