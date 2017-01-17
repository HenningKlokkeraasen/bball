const http = require('http');
const HttpDispatcher = require('httpdispatcher');

const dataProvider = require('./dataprovider.js');
const nbamvps = require('./mappers/nbamvps.js');
const nbafinalsmvps = require('./mappers/nbafinalsmvps.js');
const nbaasgmvps = require('./mappers/nbaasgmvps.js');
const fiftygreatest = require('./mappers/50greatest.js');
const dreamteam = require('./mappers/dreamteam.js');
const halloffame = require('./mappers/halloffame.js');
const allnbaabateams = require('./mappers/allnbaabateams.js');
const nbachampions = require('./mappers/nbachampions.js');
const nbaallstarteams = require('./mappers/nbaallstarteams.js');

const combiner = require('./utils/bballplayerarrayjoiner');

const dispatcher = new HttpDispatcher();

http.createServer(handleRequest)
    .listen(1337);

console.log('Web server listening on localhost:1337');

const accoladesResources = [
    { resource: 'nbamvps', mapper: nbamvps.mapToJson },
    { resource: 'nbafinalsmvps', mapper: nbafinalsmvps.mapToJson },
    { resource: 'nbaasgmvps', mapper: nbaasgmvps.mapToJson },
    { resource: '50greatest', mapper: fiftygreatest.mapToJson },
    { resource: 'olympicteams/usa1992', mapper: dreamteam.mapToJson },
    { resource: 'halloffame', mapper: halloffame.mapToJson },
    { resource: 'allnbaabateams', mapper: allnbaabateams.mapToJson }
];

accoladesResources.forEach(r => setupAccoladeResource(r.resource, r.mapper));

const teamsResources = [
    { resource: 'nbachampionshipteams', mapper: nbachampions.mapToJson, combiner: nbachampions.combine },
    { resource: 'nbaallstarteams', mapper: nbaallstarteams.mapToJson, combiner: nbaallstarteams.combine }
];

teamsResources.forEach(r => setupTeamResource(r.resource, r.mapper, r.combiner));

function handleRequest(req, res) {
    console.log(`Incoming ${req.url}`);
    dispatcher.dispatch(req, res);
}

function setupAccoladeResource(resource, mapToJson) {
    dispatcher.onGet(`/api/${resource}`, function(req, res) {
        dataProvider.getResource(`${resource}`, `server/data/${resource}.csv`, mapToJson)
            .then(data => return200(res, data))
            .catch(err => return500(res, err));
    });
}

function setupTeamResource(resource, mapToJson, combine) {
    dispatcher.onGet(`/api/${resource}`, function(req, res) {
        dataProvider.getTeams(resource, mapToJson, combine)
        .then(data => return200(res, data))
        .catch(err => return500(res, err));
    });
}

dispatcher.onGet('/api/combined', function(req, res) {
    dataProvider.getResources('combined', accoladesResources, teamsResources, combiner.combine)
        .then(data => return200(res, data))
        .catch(err => return500(res, err));
});

function return200(res, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(data);
    res.end();
}

function return500(res, err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('500 Internal Server Error');
    res.end();
}