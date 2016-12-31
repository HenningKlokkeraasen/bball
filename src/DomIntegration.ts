/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Definitions.ts" />

class DomIntegrator {
    SlapTableOntoPlaceholder(heading: string, arrayOfPlayerObjects: Array<BballPlayer>, placeholderId: string) {
        var html = Handlebars.templates['bballtable.hbs']({
            title: heading, 
            items: arrayOfPlayerObjects
        });
        document.getElementById(placeholderId).innerHTML += html;
    }
}