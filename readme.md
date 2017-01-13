A collated list of basketball players and accolades.

Uses www.basketball-reference.com as a source 
for various lists of accolades for basketball players (mainly in the NBA),
and collates them to a single matrix.

## Accolades and awards
- [ ] 50 Greatest players
- [ ] Dream Team
- [ ] Hall of Fame
- [ ] NBA Championship titles
- [x] NBA Most Valuable Player (MVP)
- [ ] NBA Finals MVPs
- [ ] All-NBA Team selections
- [ ] All-Defensive Team selections
- [ ] All-Rookie Team selections
- [ ] NBA All-Star selections
- [ ] NBA Rookie of the Year (ROY)
- [ ] NBA Defensive Player of the year (DPOY)
- [ ] NBA Most Improved Player (MIP)
- [ ] NBA 6th Man
- [ ] NBA league leaders for PTS, AST, REB, STL, BLK, PPG, APG, RPG, SPG, FG%, 3PT%, FT% for all-time, season, game
- [ ] Olympic Gold, Silver and Bronze medals

## Setting up

Data sources (download csv to \data\):
- http://www.basketball-reference.com/awards/mvp.html -> nbvamvps.csv

Dev environment:
- See setup-dev-env.cmd (Windows)

How to compile:
> tsc

see run.cmd for list of handlebars templates to precompile

(from root folder)

How to run:
> node src/server/server.js
- open index.html in a browser

OR: How to compile and run, automated (on Windows)
> run.cmd
