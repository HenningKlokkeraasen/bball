/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Integration/WikipediaIntegrator.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="DataDefinition.ts" />
/// <reference path="App.ts" />

Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

var app = new App(
    new LocalOrRemoteStorage(new LocalStorageIntegrator()), 
    new DomIntegrator(), 
    new WikipediaIntegrator(), 
    new BballPlayerArrayJoiner());

app.run(dataDefinition);