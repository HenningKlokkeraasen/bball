# Bball

A collated list of basketball players and accolades.

Uses www.basketball-reference.com as a source 
for various lists of accolades for basketball players (mainly in the NBA),
and collates them to a single matrix.

## Accolades and awards
### Basketball in general
- [x] Naismith Memorial Basketball Hall of Fame
- [x] 50 Greatest Players in NBA History (1996)
- [x] Bill Simmons Hall of Fame Pyramid (2010)
- [x] SLAM 500 Greatest NBA Players of All Time (2011)

### Per NBA season
- [x] NBA Championship titles
- [x] NBA Most Valuable Player (MVP)
- [x] NBA Finals MVP
- [x] All-NBA Team selections
- [ ] All-Defensive Team selections
- [ ] All-Rookie Team selections
- [x] NBA All-Star MVP
- [x] NBA All-Star selections
- [ ] NBA Rookie of the Year (ROY)
- [ ] NBA Defensive Player of the Year (DPOY)
- [ ] NBA Most Improved Player (MIP)
- [ ] NBA Sixth Man of the Year
- [ ] NBA league leaders in PTS, AST, REB, STL, BLK, PPG, APG, RPG, SPG, BPG, FG%, 3PT%, FT%

### NBA All-time
- [ ] NBA league leaders in PTS, AST, REB, STL, BLK, PPG, APG, RPG, SPG, BPG, FG%, 3PT%, FT%

### Per NBA game
- [ ] NBA league leaders in PTS, AST, REB, STL, BLK, FG%, 3PT%, FT%

### Per ABA season
- [ ] All-ABA Team selections
- [ ] ABA MVPs
- [ ] ABA Playoff MVP

### BAA, NBL, other leagues

### Olympics and FIBA World Cup
- [x] Dream Team
- [ ] Olympic Gold, Silver and Bronze medals
- [ ] FIBA World Cup Gold, Silver and Bronze medals

## Combined score

A subjective combined score is calculated based on the awards and accolades.

## Setting up

Data sources (download csv to \data\):
- http://www.basketball-reference.com/awards/mvp.html -> nbvamvps.csv
- http://www.basketball-reference.com/awards/finals_mvp.html -> nbafinalsmvps.csv
- http://www.basketball-reference.com/awards/all_star_mvp.html -> nbaasgmvps.csv
- http://www.basketball-reference.com/awards/nba_50_greatest.html -> 50greatest.csv
- http://www.basketball-reference.com/awards/hof.html -> http://www.convertcsv.com/html-table-to-csv.htm -> halloffame.csv
- http://www.basketball-reference.com/awards/all_league.html -> allnbaabateams.csv
- http://www.basketball-reference.com/olympics/teams/USA/1992 -> olympicteams/usa1992.csv
- http://www.basketball-reference.com/playoffs/ -> each champion page -> roster -> nbachampionshipteams/PHW_1947.csv etc
- http://www.basketball-reference.com/allstar/ -> each all-star page -> rosters -> nbaallstarteams/NBA_1951.csv etc
- http://www.basketball-reference.com/awards/simmons_pyramid.html -> simmonshofpyramid.csv
- http://www.basketball-reference.com/awards/slam_500_greatest.html -> slam500.csv

### Dev environment (Windows)
> setup-dev-env.cmd

### Install
> npm install

### Compile (Windows)
> compile.cmd

### Start node.js web server
> npm run

### Run (Windows)
> start chrome http://localhost:1337/
