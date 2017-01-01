class ExtractorHelper {
    extractPlayerValuesFromLinkInCell(cell) {
        var link = $(cell).find('a')[0];
        if (!link) {
            console.debug('not able to find anchor element in')
            console.debug(cell);
            return { id: null, name: null };
        }
        var href = $(link).attr('href');
        var id = href.replace('/wiki/', '');
        var name = $(link).text();
        return {
            id: id,
            name: name
        }
    }
}