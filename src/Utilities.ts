/// <reference path="../node_modules/@types/handlebars.d.ts" />
/// <reference path="Definitions.ts" />

class JsonGetter {
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