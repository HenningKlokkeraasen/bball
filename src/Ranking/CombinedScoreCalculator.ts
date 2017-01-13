/// <reference path="../Definitions.ts" />

class CombinedScoreCalculator {
    calculateScore(player: BballPlayer) : number {
        var score = 0;
        
        if (player.isOnDreamTeam)
            score += WeightedScoreKeeper.DreamTeam;
        if (player.isOnFiftyGreatesList)
            score += WeightedScoreKeeper.FiftyGreatest;
        if (player.yearInductedInHof)
            score += WeightedScoreKeeper.HallOfFame;

        if (player.numberOfNbaChampionships)
            score += player.numberOfNbaChampionships * WeightedScoreKeeper.NbaChamp;

        if (player.numberOfTimesMvp)
            score += player.numberOfTimesMvp * WeightedScoreKeeper.Mvp;
        if (player.numberOfTimesFinalsMvp)
            score += player.numberOfTimesFinalsMvp * WeightedScoreKeeper.FinalsMvp;
        if (player.numberOfTimesAllStarMvp)
            score += player.numberOfTimesAllStarMvp * WeightedScoreKeeper.AllStarMvp;

        if (player.allStarAppearanceCount)
            score += player.allStarAppearanceCount * WeightedScoreKeeper.AllStar;

        if (player.numberOfTimesAllNbaFirstTeam)
            score += player.numberOfTimesAllNbaFirstTeam * WeightedScoreKeeper.AllNbaFirst;
        if (player.numberOfTimesAllNbaSecondTeam)
            score += player.numberOfTimesAllNbaSecondTeam * WeightedScoreKeeper.AllNbaSecond;
        if (player.numberOfTimesAllNbaThirdTeam)
            score += player.numberOfTimesAllNbaThirdTeam * WeightedScoreKeeper.AllNbaThird;

        return score;
    }
}

class WeightedScoreKeeper {
    public static readonly DreamTeam = 100;
    public static readonly FiftyGreatest = 100;
    public static readonly HallOfFame = 100;
    
    public static readonly NbaChamp = 100;
    
    public static readonly Mvp = 100;
    public static readonly FinalsMvp = 100;

    public static readonly AllNbaFirst = 100;
    public static readonly AllNbaSecond = 75;
    public static readonly AllNbaThird = 50;
    
    public static readonly AllStarMvp = 50;
    public static readonly AllStar = 25;
}