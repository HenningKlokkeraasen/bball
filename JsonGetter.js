
var JsonGetter = function(jQuery) {
	this.jQuery = jQuery;
	
	this.getJson = function(uri, callback) {
		this.jQuery.ajax({
		    url: uri,
		    dataType: 'jsonp',
			success: function(data, textStatus, jqXhr) {
				callback(data, textStatus, jqXhr);
			}
		});
	};
};
