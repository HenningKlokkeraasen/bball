class JsonGetter {
    constructor(public jQuery) { }
    
    getJson(url: string) {
		return new Promise<any>(function(resolve, reject) {
			this.jQuery.ajax({
				url: url,
				dataType: 'jsonp'
			}).done(resolve).fail(reject);
		});
    }
}