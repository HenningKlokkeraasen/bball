
var Logger = function() {
	this.log = function(heading, array) {
		console.log(heading);
		if (array != undefined)
		{
			console.table(array);
		}
	};
};
