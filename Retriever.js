
var Retriever = function(wikipediaGetter) {
	this.wikipediaGetter = wikipediaGetter;
	
	this.retrieve = function(title, heading, mapFunc, callback) {
		this.wikipediaGetter.getContentOfWikipediaPageByTitleInUrl(title, function(content) {
			var arrayOfPlayerObjects = mapFunc.call(null, content);
			callback(heading, arrayOfPlayerObjects);
		});
	};
};
