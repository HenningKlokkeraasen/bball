const http = require('http');
const HttpDispatcher = require('httpdispatcher');

const dataProvider = require('./dataprovider.js');
const nbamvps = require('./mappers/nbamvps.js');
const nbafinalsmvps = require('./mappers/nbafinalsmvps.js');
const nbaasgmvps = require('./mappers/nbaasgmvps.js');
const fiftygreatest = require('./mappers/50greatest.js');
const halloffame = require('./mappers/halloffame.js');
const allnbaabateams = require('./mappers/allnbaabateams.js');

const dispatcher = new HttpDispatcher();

http.createServer(handleRequest)
    .listen(1337);

console.log('Web server listening on localhost:1337');

setupApi('nbamvps', nbamvps.mapToJson);
setupApi('nbafinalsmvps', nbafinalsmvps.mapToJson);
setupApi('nbaasgmvps', nbaasgmvps.mapToJson);
setupApi('50greatest', fiftygreatest.mapToJson);
setupApi('halloffame', halloffame.mapToJson);
setupApi('allnbaabateams', allnbaabateams.mapToJson);

function handleRequest(req, res) {
    console.log(`Incoming ${req.url}`);
    dispatcher.dispatch(req, res);
}

function setupApi(resource, mapToJson) {
    dispatcher.onGet(`/api/${resource}`, function(req, res) {
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

        dataProvider.get(`${resource}`, `server/data/${resource}.csv`, mapToJson)
            .then(function(result) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(result);
                res.end();
            })
            .catch(function(err) {
                console.error(err);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('500 Internal Server Error');
                res.end();
            });
    });
}