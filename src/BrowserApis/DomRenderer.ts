/// <reference path="../../ts-dts/handlebars.d.ts" />
/// <reference path="../Definitions.ts" />

class DomRenderer {
	renderBballPlayerTable(heading: string, bodyText: string, domId: string, sourceLinks: Array<Link>, isActive: boolean, 
		arrayOfPlayerObjects: Array<BballPlayer>, placeholderId: string) {
		var html = Handlebars.templates['bballtable.hbs']({
			heading: heading,
			bodyText: bodyText,
			items: arrayOfPlayerObjects,
			isActive: isActive,
			domId: domId,
			sourceLinks: sourceLinks,
			moreThanOneSourceLink: sourceLinks && sourceLinks.length > 1
		});
		document.getElementById(placeholderId).innerHTML += html;
		$(`#${domId} table`).DataTable({
			paging: false,
			info: false
		});
	}

	renderBballPlayerTab(accolade: Accolade, domId: string, isActive: boolean, placeholderId: string) {
		var html = Handlebars.templates['bballtab.hbs']({
			tabHeading: accolade.tabHeading,
			isActive: isActive,
			domId: domId,
			urlSegment: accolade.urlSegment,
			sourceUrl: accolade.sourceUrl,
			heading: accolade.heading
		});
		document.getElementById(placeholderId).innerHTML += html;
	}
}
