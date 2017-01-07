/// <reference path="../ts-dts/jquery.d.ts" />
/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="WikipediaIntegration/WikipediaIntegrator.ts" />
/// <reference path="BballPlayerArrayJoiner.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="Accolades.ts" />
/// <reference path="DataProvider.ts" />
/// <reference path="App.ts" />

Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

var app = new App();

app.run(accolades);