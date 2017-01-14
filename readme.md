# Bball

A collated list of basketball players and accolades.

Uses www.basketball-reference.com as a source 
for various lists of accolades for basketball players (mainly in the NBA),
and collates them to a single matrix.

## Accolades and awards
### Basketball in general
- [x] 50 Greatest players in the NBA
- [x] Hall of Fame

### NBA seasons
- [ ] NBA Championship titles
- [x] NBA Most Valuable Player (MVP)
- [x] NBA Finals MVPs
- [x] All-NBA Team selections
- [ ] All-Defensive Team selections
- [ ] All-Rookie Team selections
- [x] NBA All-Star MVPs
- [ ] NBA All-Star selections
- [ ] NBA Rookie of the Year (ROY)
- [ ] NBA Defensive Player of the year (DPOY)
- [ ] NBA Most Improved Player (MIP)
- [ ] NBA 6th Man
- [ ] NBA league leaders for PTS, AST, REB, STL, BLK, PPG, APG, RPG, SPG, FG%, 3PT%, FT% for all-time, season, game

### ABA seasons
- [ ] All-ABA Team selections
- [ ] ABA MVPs
- [ ] ABA Playoff MVPs

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

Dev environment:
- See setup-dev-env.cmd (Windows)

How to compile:
> tsc

see run.cmd for list of handlebars templates to precompile

(from root folder)

How to run:
> node server/server.js

How to view
- open index.html in a browser

OR: How to compile, run and view, automated (on Windows)
> run.cmd
