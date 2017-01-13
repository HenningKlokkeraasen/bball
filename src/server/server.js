const http = require('http');
const HttpDispatcher = require('httpdispatcher');

const dataProvider = require('./dataprovider.js');
const nbamvps = require('./mappers/nbamvps.js');

const dispatcher = new HttpDispatcher();

http.createServer(handleRequest)
    .listen(1337);

console.log('Web server listening on localhost:1337');

dispatcher.onGet('/api/nbamvps', function(req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    dataProvider.get('nbamvps', 'data/nbamvps.csv', nbamvps.mapToJson)
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

function handleRequest(req, res) {
    console.log(`Incoming ${req.url}`);
    dispatcher.dispatch(req, res);
}
