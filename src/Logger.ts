
class Logger {
    log(logline: string, logtable: Array<any>) {
		console.log(logline);
		if (logtable != undefined && console.table != undefined)
		{
			console.table(logtable);
		}
    }
}