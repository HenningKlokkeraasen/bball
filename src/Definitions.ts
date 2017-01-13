interface BballPlayer {
    id: string;
    name: string;
    position?: string;

    isOnFiftyGreatestList?: boolean;
    
    isOnDreamTeam?: boolean;

    numberOfTimesMvp?: number;
    mvpSeasons?: Array<string>;

    numberOfTimesFinalsMvp?: number;
    finalsMvpYears?: Array<number>;

    numberOfTimesAllStarMvp?: number;
    allStarMvpYears?: Array<number>;

    yearInductedInHof?: number;

    allStarAppearanceCount?: number;
    allStarAppearanceYears?: string;
    allStarAppearanceNotes?: string;

    numberOfTimesAllNbaFirstTeam?: number;
    numberOfTimesAllNbaSecondTeam?: number;
    numberOfTimesAllNbaThirdTeam?: number;
    
    aliases?: string;
    
    currentlyInNba?: boolean;

    combinedScore?: number;

    numberOfNbaChampionships?: number;
    nbaChampionshipYears?: Array<number>;
}

interface Link {
    uri: string,
    title: string,
    openInNewTab?: boolean
}

interface Accolade {
    tabHeading: string,
    heading: string,
    bodyText?: string,
    sourceUrl: string,
    urlSegment: string
}