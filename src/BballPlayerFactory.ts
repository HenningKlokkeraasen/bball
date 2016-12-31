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
        this.addPositions(from, to);
        this.addAliases(from, to);
    }

    addPositions(from: BballPlayer, to: BballPlayer) {
        if (from.position && from.position !== to.position)
            to.position = to.position ? `${to.position}, ${from.position}` : from.position;
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