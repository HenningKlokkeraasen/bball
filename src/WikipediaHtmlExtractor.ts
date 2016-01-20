
class WikipediaHtmlExtractor {
    constructor(public jQuery) {
        
    }
    
    extractPlayerValuesFromLinkInCell(cell) {
        var link = this.jQuery(cell).find('a')[0];
        var href = this.jQuery(link).attr('href');
        var id = href.replace('/wiki/', '');
        var name = this.jQuery(link).text();
        return {
            id: id,
            name: name
        }
    }
}