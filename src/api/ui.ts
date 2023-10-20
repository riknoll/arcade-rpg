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
    //% subcategory=UI
    //% group=Menu
    //% weight=100
    export function showMenu(options: string[], region: number) {
        rpg.ui._state().showMenu(options, region);
    }

    //% blockId=rpg_ui_showEntityMenu
    //% block="show entity menu for $entities in $region"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group=Menu
    //% weight=95
    export function showEntityMenu(entities: Entity[], region: number) {
        rpg.ui._state().showEntityMenu(entities, region);
    }

    //% blockId=rpg_ui_pauseUntilMenuSelection
    //% block="pause until selection is made"
    //% subcategory=UI
    //% group=Menu
    //% weight=90
    export function pauseUntilMenuSelection() {
        rpg.ui._state().pauseUntilMenuSelection();
    }

    //% blockId=rpg_ui_getMenuSelectionString
    //% block="last menu selected string"
    //% subcategory=UI
    //% group=Menu
    //% weight=80
    export function getMenuSelectionString(): string {
        return rpg.ui._state().getLastSelection();
    }

    //% blockId=rpg_ui_getMenuSelection
    //% block="last menu selected entity"
    //% subcategory=UI
    //% group=Menu
    //% weight=70
    export function getMenuSelection(): Entity {
        return rpg.ui._state().getLastSelectedEntity();
    }

    //% blockId=rpg_ui_wasMenuCancelled
    //% block="was menu cancelled"
    //% subcategory=UI
    //% group=Menu
    //% weight=70
    export function wasMenuCancelled(): boolean {
        return rpg.ui._state().wasMenuCancelled();
    }

    //% blockId=rpg_ui_closeMenu
    //% block="close menu"
    //% subcategory=UI
    //% group=Menu
    //% weight=60
    export function closeMenu() {
        rpg.ui._state().closeMenu();
    }

    //% blockId=rpg_ui_closeAllMenus
    //% block="close all menus"
    //% subcategory=UI
    //% group=Menu
    //% weight=50
    export function closeAllMenus() {
        rpg.ui._state().closeAllMenus();
    }

    //% blockId=rpg_ui_setMenuFrame
    //% block="set menu frame $frame"
    //% subcategory=UI
    //% group=Menu
    //% weight=40
    export function setMenuFrame(frame: Image) {
        rpg.ui._state().setFrame(frame);
    }

    //% blockId=rpg_ui_setMenuTextColor
    //% block="set menu colors foreground $foregroundColor background $backgroundColor"
    //% subcategory=UI
    //% group=Menu
    //% weight=30
    export function setMenuTextColor(foregroundColor: number, backgroundColor: number) {
        rpg.ui._state().setTextColor(foregroundColor, backgroundColor);
    }

    //% blockId=rpg_ui_setMenuSelectedTextColor
    //% block="set menu selected colors foreground $foregroundColor background $backgroundColor"
    //% subcategory=UI
    //% group=Menu
    //% weight=20
    export function setMenuSelectedTextColor(foregroundColor: number, backgroundColor: number) {
        rpg.ui._state().setSelectedTextColor(foregroundColor, backgroundColor);
    }

    //% blockId=rpg_ui_showDisplay
    //% block="show display of $source $type in $region"
    //% source.shadow=variables_get
    //% source.defl=myEntity
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group=Display
    //% weight=100
    export function showDisplay(source: Entity, region: number, type: DisplayType) {
        rpg.ui._state().displayInRegion(region, source, type);
    }

    //% blockId=rpg_ui_destroyDisplay
    //% block="destroy display in $region"
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group=Display
    //% weight=90
    export function destroyDisplay(region: number) {
        rpg.ui._state().destroyDisplayInRegion(region);
    }

    //% blockId=rpg_ui_showPartyMenu
    //% block="show $party party menu in $region"
    //% party.shadow=rpg_partyType
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group="Character Menus"
    //% weight=100
    export function showPartyMenu(party: number, region: number) {
        rpg.ui._state().showEntityMenu(getParty(party), region);
    }

    //% blockId=rpg_ui_showSkillMenu
    //% block="show skill menu for $character in $region"
    //% character.shadow=rpg_character_character
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group="Character Menus"
    //% weight=90
    export function showSkillMenu(character: Entity, region: number) {
        _assertCharacter(character, "showSkillMenu");

        rpg.ui._state().showEntityMenu((character as Character).skills.getAll(), region);
    }

    //% blockId=rpg_ui_showEquipMenu
    //% block="show equip menu for $character in $region"
    //% character.shadow=rpg_character_character
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group="Character Menus"
    //% weight=80
    export function showEquipMenu(character: Entity, region: number) {
        _assertCharacter(character, "showEquipMenu");

        rpg.ui._state().showEntityMenu((character as Character).equipment.getAll(), region);
    }

    //% blockId=rpg_ui_showInventoryMenu
    //% block="show inventory menu for $character in $region"
    //% character.shadow=rpg_character_character
    //% region.shadow=rpg_screenRegion
    //% subcategory=UI
    //% group="Character Menus"
    //% weight=70
    export function showInventoryMenu(character: Entity, region: number) {
        _assertCharacter(character, "showInventoryMenu");

        rpg.ui._state().showEntityMenu((character as Character).inventory.getAll(), region);
    }

    //% blockId=rpg_ui_printToTextLog
    //% block="print to text log $text"
    //% subcategory=UI
    //% group="Text Log"
    //% weight=100
    export function printToTextLog(text: string) {
        rpg.ui.log.print(text);
    }

    //% blockId=rpg_ui_setTextLogVisible
    //% block="show text log $visible"
    //% subcategory=UI
    //% group="Text Log"
    //% weight=90
    export function setTextLogVisible(visible: boolean) {
        rpg.ui.log.setVisible(visible);
    }

    //% blockId=rpg_ui_setTextLogFrame
    //% block="set text log frame $frame"
    //% subcategory=UI
    //% group="Text Log"
    //% weight=80
    export function setTextLogFrame(frame: Image) {
        rpg.ui.log.setFrame(frame);
    }

    //% blockId=rpg_ui_setTextLogTextColor
    //% block="set text log text color $color"
    //% subcategory=UI
    //% group="Text Log"
    //% weight=70
    export function setTextLogTextColor(color: number) {
        rpg.ui.log.setTextColor(color);
    }

    //% blockId=rpg_ui_setTextLogZIndex
    //% block="set text log z index $z"
    //% subcategory=UI
    //% group="Text Log"
    //% weight=60
    export function setTextLogZIndex(z: number) {
        rpg.ui.log.setZIndex(z);
    }
}