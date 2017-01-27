/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../node_modules/@types/handlebars/index.d.ts" />
/// <reference path="Utilities.ts" />
/// <reference path="Definitions.ts" />
/// <reference path="Accolades.ts" />
/// <reference path="DataProvider.ts" />
/// <reference path="App.ts" />

Handlebars.registerHelper("counter", function (index){
    return index + 1;
});

var app = new App();

app.run(accolades);