interface BballPlayer {
    id: string;
    name: string;
    position?: string;

    isOnFiftyGreatestList?: boolean;
    
    isOnDreamTeam?: boolean;

    numberOfTimesMvp?: number;
    mvpSeasons?: Array<string>;

    numberOfTimesFinalsMvp?: number;
    finalsMvpSeasons?: Array<string>;

    numberOfTimesAllStarMvp?: number;
    allStarMvpSeasons?: Array<number>;

    yearInductedInHof?: number;

    allStarAppearanceCount?: number;
    allStarAppearanceYears?: string;
    allStarAppearanceNotes?: string;

    numberOfTimesAllNbaFirstTeam?: number;
    numberOfTimesAllNbaSecondTeam?: number;
    numberOfTimesAllNbaThirdTeam?: number;

    allNbaFirstTeamSeasons?: Array<string>;
    allNbaSecondTeamSeasons?: Array<string>;
    allNbaThirdTeamSeasons?: Array<string>;
    
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
    sourceUrl?: string,
    urlSegment: string
}