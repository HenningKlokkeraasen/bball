
class ExtractorHelper {
    constructor(public jQuery) {
        
    }
    
    extractPlayerValuesFromLinkInCell(cell) {
        var link = this.jQuery(cell).find('a')[0];
        if (!link) {
            console.debug('not able to find anchor element in')
            console.debug(cell);
            return { id: null, name: null };
        }
        var href = this.jQuery(link).attr('href');
        var id = href.replace('/wiki/', '');
        var name = this.jQuery(link).text();
        return {
            id: id,
            name: name
        }
    }
}