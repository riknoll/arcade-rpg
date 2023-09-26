namespace rpg {
    //% block="$name"
    //% blockId=rpg_equipmentNameShadow
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="_equipmentNameShadow"
    export function _equipmentNameShadow(name: string) {
        return name
    }

    //% block="$name"
    //% blockId=rpg_equipmentSlotNameShadow
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="_equipmentNameShadow"
    export function _equipmentSlotNameShadow(name: string) {
        return name
    }

    //% block="$name"
    //% blockId=rpg_skillNameShadow
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="_skillNameShadow"
    export function _skillNameShadow(name: string) {
        return name
    }

    //% block="$name"
    //% blockId=rpg_characterNameShadow
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="_characterNameShadow"
    export function _characterNameShadow(name: string) {
        return name
    }

    //% block="$name"
    //% blockId=rpg_statNameShadow
    //% blockHidden=true shim=TD_ID
    //% name.fieldEditor="autocomplete" name.fieldOptions.decompileLiterals=true
    //% name.fieldOptions.key="_statNameShadow"
    export function _statNameShadow(name: string) {
        return name
    }

    //% block="$partyType party"
    //% shim=TD_ID
    //% blockId=rpg_partyType
    //% duplicateShadowOnDrag=true
    //% blockHidden=true
    export function _partyType(partyType: PartyType): number {
        return partyType;
    }

    //% block="$region"
    //% shim=TD_ID
    //% blockId=rpg_screenRegion
    //% duplicateShadowOnDrag=true
    //% blockHidden=true
    export function _screenRegion(region: ScreenRegion): number {
        return region;
    }
}