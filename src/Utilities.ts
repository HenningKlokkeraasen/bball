/// <reference path="../ts-dts/handlebars.d.ts" />
/// <reference path="Definitions.ts" />

class CrossDomainJsonGetter {
	getJson(url: string) {
		return new Promise<any>(function(resolve, reject) {
			$.ajax({
				url: url,
				dataType: 'json'
			})
			.done(resolve)
			.fail(reject);
		});
	}
}

class Logger {
	log(logline: string, logtable?: Array<any>) {
		console.log(logline);
		if (logtable != undefined && console.table != undefined)
			console.table(logtable);
	}
}
