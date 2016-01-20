
class JsonGetter {
    constructor(public jQuery) {
        
    }
    
    getJson(uri: string, callback: (data, textStatus, jQXhr) => any) {
		this.jQuery.ajax({
		    url: uri,
		    dataType: 'jsonp',
			success: function(data, textStatus, jqXhr) {
				callback(data, textStatus, jqXhr);
			}
		});
    }
}