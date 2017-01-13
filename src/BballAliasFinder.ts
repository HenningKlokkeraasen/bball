/// <reference path="Definitions.ts" />

class BballAliasFinder {
    knownSpecialCases : Array<any>;
    /*
     * Handles special cases (e.g. Lew Alcindor / Kareem Abdul-Jabbar)
     */
    findByIdOrAlternateId(element: BballPlayer, playerId: string) {
        if (element.id === playerId)
            return true;
        var found = false;
        for (var i = 0; i < BballAliasFinder.prototype.knownSpecialCases.length; i++) {
            var sc = BballAliasFinder.prototype.knownSpecialCases[i];
            if ((element.id === sc.idA && playerId === sc.idB)
            || (element.id === sc.idB && playerId === sc.idA)) {
                // console.debug(`found special case ${sc.idA} / ${sc.idB}`);
                found = true;
                break;
            }
        }
        if (found)
            return true;
        return false;
    }
}

BballAliasFinder.prototype.knownSpecialCases = [
    { idA: 'Lew_Alcindor',      idB: 'Kareem_Abdul-Jabbar'},
    { idA: 'Earvin_Johnson',    idB: 'Magic_Johnson' },
    { idA: 'Ron_Artest',        idB: 'Metta_World_Peace' },
    { idA: 'Anfernee_Hardaway', idB: 'Penny_Hardaway' },
    { idA: 'Tom_Sanders',       idB: 'Satch_Sanders' },
    { idA: 'Nate_Archibald',    idB: 'Tiny_Archibald' },
    { idA: 'Toni_Kukoc',        idB: 'Toni_Kuko%C4%8D' },
    { idA: 'A.C._Green',        idB: 'A._C._Green' },
    { idA: 'Byron_Scott',       idB: 'Byron_Scott_(basketball)' }
];