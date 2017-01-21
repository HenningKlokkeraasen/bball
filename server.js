const http = require('http');
const path = require('path');
const express = require('express');

const dataProvider = require('./server/dataprovider.js');
const nbamvps = require('./server/mappers/nbamvps.js');
const nbafinalsmvps = require('./server/mappers/nbafinalsmvps.js');
const nbaasgmvps = require('./server/mappers/nbaasgmvps.js');
const fiftygreatest = require('./server/mappers/50greatest.js');
const dreamteam = require('./server/mappers/dreamteam.js');
const halloffame = require('./server/mappers/halloffame.js');
const allnbaabateams = require('./server/mappers/allnbaabateams.js');
const nbachampions = require('./server/mappers/nbachampions.js');
const nbaallstarteams = require('./server/mappers/nbaallstarteams.js');
const simmonshofpyramid = require('./server/mappers/simmonshofpyramid.js');
const slam500 = require('./server/mappers/slam500.js');

const combiner = require('./server/utils/bballplayerarrayjoiner');

const app = express();

app.listen(1337, function () {
    console.log('Web server listening on localhost:1337');
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const accoladesResources = [
    { resource: 'nbamvps', mapper: nbamvps.mapToJson },
    { resource: 'nbafinalsmvps', mapper: nbafinalsmvps.mapToJson },
    { resource: 'nbaasgmvps', mapper: nbaasgmvps.mapToJson },
    { resource: '50greatest', mapper: fiftygreatest.mapToJson },
    { resource: 'olympicteams/usa1992', mapper: dreamteam.mapToJson },
    { resource: 'halloffame', mapper: halloffame.mapToJson },
    { resource: 'allnbaabateams', mapper: allnbaabateams.mapToJson },
    { resource: 'simmonshofpyramid', mapper: simmonshofpyramid.mapToJson },
    { resource: 'slam500', mapper: slam500.mapToJson }
];

accoladesResources.forEach(r => setupAccoladeResource(r.resource, r.mapper));

const teamsResources = [
    { resource: 'nbachampionshipteams', mapper: nbachampions.mapToJson, combiner: nbachampions.combine },
    { resource: 'nbaallstarteams', mapper: nbaallstarteams.mapToJson, combiner: nbaallstarteams.combine }
];

teamsResources.forEach(r => setupTeamResource(r.resource, r.mapper, r.combiner));

function setupAccoladeResource(resource, mapToJson) {
    app.get(`/api/${resource}`, function(req, res) {
        dataProvider.getResource(`${resource}`, `server/data/${resource}.csv`, mapToJson)
            .then(data => return200(res, data))
            .catch(err => return500(res, err));
    });
}

function setupTeamResource(resource, mapToJson, combine) {
    app.get(`/api/${resource}`, function(req, res) {
        dataProvider.getTeams(resource, mapToJson, combine)
        .then(data => return200(res, data))
        .catch(err => return500(res, err));
    });
}

app.get('/api/combined', function(req, res) {
    dataProvider.getResources('combined', accoladesResources, teamsResources, combiner.combine)
        .then(data => return200(res, data))
        .catch(err => return500(res, err));
});

function return200(res, data) {
    res.type('json').send(data);
}

function return500(res, err) {
    console.error(err.stack);
    res.status(500).send('500 Internal Server Error');
}