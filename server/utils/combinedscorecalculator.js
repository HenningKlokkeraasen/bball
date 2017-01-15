var self = module.exports = {
    calculateScore: function(player) {
        var score = 0;
        
        if (player.isOnDreamTeam)
            score += self.WeightedScoreKeeper.DreamTeam;
        if (player.isOnFiftyGreatestList)
            score += self.WeightedScoreKeeper.FiftyGreatest;
        if (player.yearInductedInHof)
            score += self.WeightedScoreKeeper.HallOfFame;

        if (player.numberOfNbaChampionships)
            score += player.numberOfNbaChampionships * self.WeightedScoreKeeper.NbaChamp;

        if (player.numberOfTimesMvp)
            score += player.numberOfTimesMvp * self.WeightedScoreKeeper.Mvp;
        if (player.numberOfTimesFinalsMvp)
            score += player.numberOfTimesFinalsMvp * self.WeightedScoreKeeper.FinalsMvp;
        if (player.numberOfTimesAllStarMvp)
            score += player.numberOfTimesAllStarMvp * self.WeightedScoreKeeper.AllStarMvp;

        if (player.allStarAppearanceCount)
            score += player.allStarAppearanceCount * self.WeightedScoreKeeper.AllStar;

        if (player.numberOfTimesAllNbaFirstTeam)
            score += player.numberOfTimesAllNbaFirstTeam * self.WeightedScoreKeeper.AllNbaFirst;
        if (player.numberOfTimesAllNbaSecondTeam)
            score += player.numberOfTimesAllNbaSecondTeam * self.WeightedScoreKeeper.AllNbaSecond;
        if (player.numberOfTimesAllNbaThirdTeam)
            score += player.numberOfTimesAllNbaThirdTeam * self.WeightedScoreKeeper.AllNbaThird;

        return score;
    },

    WeightedScoreKeeper: {
        DreamTeam: 100,
        FiftyGreatest: 100,
        HallOfFame: 100,
        
        NbaChamp: 100,
        
        Mvp: 100,
        FinalsMvp: 100,

        AllNbaFirst: 100,
        AllNbaSecon: 75,
        AllNbaThird: 50,
        
        AllStarMvp: 50,
        AllStar: 25,
    }
}