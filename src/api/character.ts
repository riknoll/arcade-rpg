namespace rpg {
    export enum PartyType {
        //% block="player"
        //% blockIdentity="rpg._partyType"
        Player,
        //% block="enemy"
        //% blockIdentity="rpg._partyType"
        Enemy
    }

    //% blockId=rpg_character_character
    //% block="character $name||create new $createNew"
    //% name.shadow=rpg_characterNameShadow
    //% subcategory=Characters
    //% group=Create
    //% weight=90
    export function character(name: string, createNew?: boolean): Entity {
        if (!_globalState().characters.exists(name)) {
            const c = new Character();
            c.name = name;
            _globalState().characters.add(c);
        }
        else if (createNew) {
            const c = new Character();
            c.name = name;
            return c;
        }
        return _globalState().characters.getByName(name);
    }

    //% blockId=rpg_character_equipment
    //% block="equipment $name"
    //% name.shadow=rpg_equipmentNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=90
    export function equipment(name: string): Entity {
        if (!_globalState().equipment.exists(name)) {
            const e = new Entity();
            e.name = name;
            _globalState().equipment.add(e);
        }
        return _globalState().equipment.getByName(name);
    }

    //% blockId=rpg_character_setEquipment
    //% block="set $character equipment slot $slot to $value"
    //% character.shadow=rpg_character_character
    //% slot.shadow=rpg_equipmentSlotNameShadow
    //% value.shadow=rpg_character_equipment
    //% subcategory=Characters
    //% group=Equipment
    //% weight=80
    export function setEquipment(character: Entity, slot: string, value: Entity): void {
        _assertCharacter(character, "setEquipment");

        const char = character as Character;
        char.equipment.setEquip(slot, value);
    }

    //% blockId=rpg_character_getEquipment
    //% block="$character get equipment in slot $slot"
    //% character.shadow=rpg_character_character
    //% slot.shadow=rpg_equipmentSlotNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=70
    export function getEquipment(character: Entity, slot: string): Entity {
        _assertCharacter(character, "getEquipment");

        const char = character as Character;
        return char.equipment.getEquip(slot);
    }

    //% blockId=rpg_character_hasEquipment
    //% block="$character has equipment in slot $slot"
    //% character.shadow=rpg_character_character
    //% slot.shadow=rpg_equipmentSlotNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=60
    export function hasEquipment(character: Entity, slot: string): boolean {
        _assertCharacter(character, "hasEquipment");

        const char = character as Character;
        return char.equipment.hasEquip(slot);
    }

    //% blockId=rpg_character_removeEquipment
    //% block="$character remove equipment in slot $slot"
    //% character.shadow=rpg_character_character
    //% slot.shadow=rpg_equipmentSlotNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=50
    export function removeEquipment(character: Entity, slot: string): void {
        _assertCharacter(character, "removeEquipment");

        const char = character as Character;
        char.equipment.removeEquip(slot);
    }

    //% blockId=rpg_character_skill
    //% block="skill $name"
    //% name.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=90
    export function skill(name: string): Entity {
        if (!_globalState().skills.exists(name)) {
            const e = new Entity();
            e.name = name;
            _globalState().skills.add(e);
        }
        return _globalState().skills.getByName(name);
    }

    //% blockId=rpg_character_addSkill
    //% block="$character add skill $skill"
    //% character.shadow=rpg_character_character
    //% skill.shadow=rpg_character_skill
    //% subcategory=Characters
    //% group=Skills
    //% weight=80
    export function addSkill(character: Entity, skill: Entity): void {
        _assertCharacter(character, "addSkill");

        const char = character as Character;
        char.skills.add(skill);
    }

    //% blockId=rpg_character_removeSkill
    //% block="$character remove skill $skill"
    //% character.shadow=rpg_character_character
    //% skill.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=70
    export function removeSkill(character: Entity, skill: string): void {
        _assertCharacter(character, "removeSkill");

        const char = character as Character;
        char.skills.removeByName(skill);
    }

    //% blockId=rpg_character_hasSkill
    //% block="$character has skill $skill"
    //% character.shadow=rpg_character_character
    //% skill.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=60
    export function hasSkill(character: Entity, skill: string): boolean {
        _assertCharacter(character, "hasSkill");

        const char = character as Character;
        return char.skills.exists(skill);
    }

    //% blockId=rpg_character_getSkill
    //% block="$character get skill $skill"
    //% character.shadow=rpg_character_character
    //% skill.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=50
    export function getSkill(character: Entity, skill: string): Entity {
        _assertCharacter(character, "getSkill");

        const char = character as Character;
        return char.skills.getByName(skill);
    }

    //% blockId=rpg_character_getSkills
    //% block="$character skills"
    //% character.shadow=rpg_character_character
    //% subcategory=Characters
    //% group=Skills
    //% weight=40
    export function getSkills(character: Entity): Entity[] {
        _assertCharacter(character, "getSkills");

        const char = character as Character;
        return char.skills.getAll()
    }

    //% blockId=rpg_character_item
    //% block="item $name"
    //% name.shadow=rpg_itemNameShadow
    //% subcategory=Characters
    //% group=Inventory
    //% weight=110
    export function item(name: string): Entity {
        if (!_globalState().items.exists(name)) {
            const e = new Entity();
            e.name = name;
            _globalState().items.add(e);
        }
        return _globalState().items.getByName(name);
    }

    //% blockId=rpg_character_addToInventory
    //% block="$character add $item to inventory"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_character_item
    //% subcategory=Characters
    //% group=Inventory
    //% weight=100
    export function addToInventory(character: Entity, item: Entity): void {
        _assertCharacter(character, "addToInventory");

        const char = character as Character;
        char.inventory.add(item);
    }

    //% blockId=rpg_character_getFromInventory
    //% block="$character get item with name $item from inventory"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_itemNameShadow
    //% subcategory=Characters
    //% group=Inventory
    //% weight=90
    export function getFromInventory(character: Entity, item: string): Entity {
        _assertCharacter(character, "getFromInventory");

        const char = character as Character;
        return char.inventory.getByName(item);
    }

    //% blockId=rpg_character_getInventory
    //% block="$character get all items in inventory"
    //% character.shadow=rpg_character_character
    //% subcategory=Characters
    //% group=Inventory
    //% weight=85
    export function getInventory(character: Entity): Entity[] {
        _assertCharacter(character, "getInventory");

        const char = character as Character;
        return char.inventory.getAll();
    }

    //% blockId=rpg_character_removeFromInventory
    //% block="$character remove $item from inventory"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_character_item
    //% subcategory=Characters
    //% group=Inventory
    //% weight=80
    export function removeFromInventory(character: Entity, item: Entity): void {
        _assertCharacter(character, "removeFromInventory");

        const char = character as Character;
        char.inventory.remove(item);
    }

    //% blockId=rpg_character_removeFromInventoryByName
    //% block="$character remove item with name $item from inventory||count $count"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_itemNameShadow
    //% count.defl=1
    //% subcategory=Characters
    //% group=Inventory
    //% weight=70
    export function removeFromInventoryByName(character: Entity, item: string, count = 1): void {
        _assertCharacter(character, "removeFromInventoryByName");

        const char = character as Character;
        char.inventory.removeByName(item, count);
    }

    //% blockId=rpg_character_hasInInventory
    //% block="$character get item with name $item from inventory"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_itemNameShadow
    //% subcategory=Characters
    //% group=Inventory
    //% weight=60
    export function hasInInventory(character: Entity, item: string): boolean {
        _assertCharacter(character, "hasInInventory");

        const char = character as Character;
        return char.inventory.exists(item);
    }

    //% blockId=rpg_character_countInInventory
    //% block="$character count items with name $item in inventory"
    //% character.shadow=rpg_character_character
    //% item.shadow=rpg_itemNameShadow
    //% subcategory=Characters
    //% group=Inventory
    //% weight=50
    export function countInInventory(character: Entity, item: string): number {
        _assertCharacter(character, "countInInventory");

        const char = character as Character;
        return char.inventory.count(item);
    }

    //% blockId=rpg_character_addToParty
    //% block="add $character to $party"
    //% character.shadow=rpg_character_character
    //% party.shadow=rpg_partyType
    //% subcategory=Characters
    //% group=Party
    //% weight=100
    export function addToParty(character: Entity, party: number): void {
        _assertCharacter(character, "addToParty");

        if (party === PartyType.Player) {
            _globalState().playerParty.add(character);
        }
        else {
            _globalState().enemyParty.add(character);
        }
    }

    //% blockId=rpg_character_getParty
    //% block="get characters in $party"
    //% party.shadow=rpg_partyType
    //% subcategory=Characters
    //% group=Party
    //% weight=90
    export function getParty(party: number): Entity[] {
        if (party === PartyType.Player) {
            return _globalState().playerParty.getAll();
        }
        else {
            return _globalState().enemyParty.getAll();
        }
    }

    //% blockId=rpg_character_getPartyCharacter
    //% block="get $party character with name $name"
    //% party.shadow=rpg_partyType
    //% name.shadow=rpg_characterNameShadow
    //% subcategory=Characters
    //% group=Party
    //% weight=80
    export function getPartyCharacter(party: number, name: string): Entity {
        if (party === PartyType.Player) {
            return _globalState().playerParty.getByName(name);
        }
        else {
            return _globalState().enemyParty.getByName(name);
        }
    }

    //% blockId=rpg_character_removeFromParty
    //% block="remove $party character with name $name"
    //% party.shadow=rpg_partyType
    //% name.shadow=rpg_characterNameShadow
    //% subcategory=Characters
    //% group=Party
    //% weight=70
    export function removeFromParty(party: number, name: string): void {
        if (party === PartyType.Player) {
            _globalState().playerParty.removeByName(name);
        }
        else {
            _globalState().enemyParty.removeByName(name);
        }
    }

    export function _assertCharacter(character: Entity, methodName: string) {
        if (character === null || character === undefined) {
            throw "null or undefined passed to '" + methodName + "'";
        }
        if (!(character instanceof Character)) {
            throw "'" + methodName + "' can only be used with Characters!";
        }
    }
}