namespace rpg {
    export enum ScreenRegion {
        //% block="full screen"
        //% blockIdentity="rpg._screenRegion"
        Full,
        //% block="center"
        //% blockIdentity="rpg._screenRegion"
        Center,
        //% block="left half"
        //% blockIdentity="rpg._screenRegion"
        Left,
        //% block="right half"
        //% blockIdentity="rpg._screenRegion"
        Right,
        //% block="top half"
        //% blockIdentity="rpg._screenRegion"
        Top,
        //% block="bottom half"
        //% blockIdentity="rpg._screenRegion"
        Bottom,
        //% block="top left corner"
        //% blockIdentity="rpg._screenRegion"
        TopLeft,
        //% block="top right corner"
        //% blockIdentity="rpg._screenRegion"
        TopRight,
        //% block="bottom left corner"
        //% blockIdentity="rpg._screenRegion"
        BottomLeft,
        //% block="bottom right corner"
        //% blockIdentity="rpg._screenRegion"
        BottomRight
    }

    export enum DisplayType {
        //% block="stats"
        Stats,
        //% block="equipment"
        Equipment,
        //% block="skills"
        Skills
    }

    //% blockId=rpg_ui_showMenu
    //% block="show menu with options $options in $region"
    //% options.shadow=lists_create_with
    //% options.defl=text
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group=Menu
    //% weight=100
    export function showMenu(options: string[], region: number) {
        rpg.ui._state().showMenu(options, region);
    }

    //% blockId=rpg_ui_pauseUntilMenuSelection
    //% block="pause until selection is made"
    //% subcategory=Display
    //% group=Menu
    //% weight=90
    export function pauseUntilMenuSelection() {
        rpg.ui._state().pauseUntilMenuSelection();
    }

    //% blockId=rpg_ui_getMenuSelection
    //% block="last menu selection"
    //% subcategory=Display
    //% group=Menu
    //% weight=80
    export function getMenuSelection(): string {
        return rpg.ui._state().getLastSelection();
    }

    //% blockId=rpg_ui_wasMenuCancelled
    //% block="was menu cancelled"
    //% subcategory=Display
    //% group=Menu
    //% weight=70
    export function wasMenuCancelled(): boolean {
        return rpg.ui._state().wasMenuCancelled();
    }

    //% blockId=rpg_ui_closeMenu
    //% block="close menu"
    //% subcategory=Display
    //% group=Menu
    //% weight=60
    export function closeMenu() {
        rpg.ui._state().closeMenu();
    }

    //% blockId=rpg_ui_closeAllMenus
    //% block="close all menus"
    //% subcategory=Display
    //% group=Menu
    //% weight=50
    export function closeAllMenus() {
        rpg.ui._state().closeAllMenus();
    }

    //% blockId=rpg_ui_showDisplay
    //% block="show display of $source $type in $region"
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group=Display
    //% weight=100
    export function showDisplay(source: Entity, region: number, type: DisplayType) {
        rpg.ui._state().displayInRegion(region, source, type);
    }

    //% blockId=rpg_ui_destroyDisplay
    //% block="destroy display in $region"
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group=Display
    //% weight=90
    export function destroyDisplay(region: number) {
        rpg.ui._state().destroyDisplayInRegion(region);
    }

    //% blockId=rpg_ui_showPartyMenu
    //% block="show $party party menu in $region"
    //% party.shadow=rpg_partyType
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group="Character Menus"
    //% weight=100
    export function showPartyMenu(party: number, region: number) {
        rpg.ui._state().showMenu(getParty(party).map(n => n.name), region);
    }

    //% blockId=rpg_ui_showSkillMenu
    //% block="show skill menu for $character in $region"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group="Character Menus"
    //% weight=90
    export function showSkillMenu(character: Entity, region: number) {
        _assertCharacter(character, "showSkillMenu");

        rpg.ui._state().showMenu((character as Character).skills.getNames(), region);
    }

    //% blockId=rpg_ui_showEquipMenu
    //% block="show equip menu for $character in $region"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group="Character Menus"
    //% weight=80
    export function showEquipMenu(character: Entity, region: number) {
        _assertCharacter(character, "showEquipMenu");

        rpg.ui._state().showMenu((character as Character).equipment.keys(), region);
    }

    //% blockId=rpg_ui_showInventoryMenu
    //% block="show inventory menu for $character in $region||and collapse duplicate entries $dedupe"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% region.shadow=rpg_screenRegion
    //% subcategory=Display
    //% group="Character Menus"
    //% weight=70
    export function showInventoryMenu(character: Entity, region: number, dedupe = false) {
        _assertCharacter(character, "showInventoryMenu");

        const entries = dedupe ? (character as Character).inventory.getUniqueNames() :
            (character as Character).inventory.getNames()

        rpg.ui._state().showMenu(entries, region);
    }
}