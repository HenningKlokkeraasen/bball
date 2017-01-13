class RosterNavboxExtractor {

    hasRosterNavbox(html) {
        // TODO make more robust
        var navbox = $(html).find('.navbox-list');
        return navbox.length > 0;
    }

    extractLinksFromRosterNavbox(html) {
        var rows = new Array();
        var navbox = $(html).find('.navbox-list')[0];
        
        var p = $(navbox).find('p')[0];
        if (p) {
            $.each($(p).html().split(' | '), function(j, playerOrCoach) {
                if (playerOrCoach.indexOf('Coach') < 0) {
                    var start = playerOrCoach.indexOf('<');
                    var end = playerOrCoach.indexOf('>') + 1;
                    var firstAnchorElement = playerOrCoach.substr(start, end);
                    rows.push(firstAnchorElement);
                }
            });
            var playerValues = rows.map(ExtractorHelper.prototype.extractPlayerValuesFromLinkUsingTitle);
            return playerValues;
        } else {
            var navboxes = $(html).find('.navbox-list');
            $.each($(navboxes), function(k, n) {
                if (!($(n).html().indexOf('season') > -1)) {
                    var uls = $(n).find('ul');
                    $.each($(uls), function(i, ul) {
                        if ($(ul).children().length > 3) {
                            $.each($(ul).children(), function(j, li) {
                                rows.push(li);
                            });
                        }
                    });
                }
            });
            var playerValues = rows.map(ExtractorHelper.prototype.extractPlayerValuesFromLinkInCell);
            return playerValues;
        }
    }
}