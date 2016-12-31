/// <reference path="Definitions.ts" />

class BballAliasFinder {
    knownSpecialCases : Array<any>;
    /*
     * Handles special cases 
     *  - Lew Alcindor / Kareem Abdul-Jabbar
     *  - Ron Artest / Metta World Peace
     */
    findByIdOrAlternateId(element: BballPlayer, playerId: string) {
        if (element.id === playerId)
            return true;
        var found = false;
        for (var i = 0; i < BballAliasFinder.prototype.knownSpecialCases.length; i++) {
            var sc = BballAliasFinder.prototype.knownSpecialCases[i];
            if ((element.id === sc.oldName && playerId === sc.newName)
            || (element.id === sc.newName && playerId === sc.oldName)) {
                console.debug(`found special case ${sc.oldName} / ${sc.newName}`);
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
    { oldName: 'Lew_Alcindor', newName: 'Kareem_Abdul-Jabbar'},
    { oldName: 'Ron_Artest', newName: 'Metta_World_Peace' }
];