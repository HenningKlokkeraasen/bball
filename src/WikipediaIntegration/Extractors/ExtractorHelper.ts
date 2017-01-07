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

    extractRowsFromRosterTable(html) {
        var rows = new Array();
        $.each($(html).find('table.sortable'), function(i, child) {
            var tbody = $(child).find('tbody')[0];
            $.each($(tbody).children(), function(j, tr) {
                if (j > 0)
                    rows.push(tr);
            });
		});
        return rows;
    }
}