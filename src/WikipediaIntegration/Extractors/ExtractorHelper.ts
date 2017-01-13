class ExtractorHelper {
    extractPlayerValuesFromLinkInCell(cell) {
        var link = $(cell).find('a')[0];
        if (!link) {
            console.debug('not able to find anchor element in')
            console.debug(cell);
            return { id: null, name: null };
        }
        var id = ExtractorHelper.prototype.extractWikipediaPageUrlSegmentFromLink(link);
        var name = $(link).text();
        return { id: id, name: name }
    }

    extractRowsFromWikiTable(html, textInFirstCell: string) {
        var rows = new Array();
		$.each(html, function(i, child) {
			if ($(child).is('table.wikitable')) {
                var tbody = $(child).children()[0];
                var tr = $(tbody).children()[0];
                var cell = $(tr).children()[0];
                var text = cell.innerHTML;
                if (text == textInFirstCell)
                {
                    $.each($(child).find('tr'), function(j, tr) {
                        if (j > 0) {
                            rows.push(tr);
                        }
                    });
                }
			}
		});
        return rows;
    }

    extractWikipediaPageUrlSegmentFromLink(link) {
        var href = $(link).attr('href');
        var id = href.replace('/wiki/', '');
        return id;
    }

    extractPlayerValuesFromLinkUsingTitle(link) {
        var id = ExtractorHelper.prototype.extractWikipediaPageUrlSegmentFromLink(link);
        var name = $(link).attr('title');
        var indexOfUnwantedStuff = name.indexOf(' (basketball');
        if (indexOfUnwantedStuff > -1)
            name = name.substr(0, indexOfUnwantedStuff);
        return { id: id, name: name }
    }
}