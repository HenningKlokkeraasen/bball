interface BballPlayer {
    id: string;
    name: string;
    position: string;
    isOnFiftyGreatesList?: boolean;
    isOnDreamTeam?: boolean;
    numberOfTimesMvp?: number;
    yearInductedInHof?: number;

    allStarAppearanceCount?: number;
    allStarAppearanceYears?: string;
    allStarAppearanceNotes?: string;

    numberOfTimesAllNbaFirstTeam?: number;
    numberOfTimesAllNbaSecondTeam?: number;
    numberOfTimesAllNbaThirdTeam?: number;
    
    aliases?: string;
    currentlyInNba?: boolean;
}