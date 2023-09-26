namespace rpg {
    export enum PartyType {
        //% block="player"
        //% blockIdentity="rpg._partyType"
        Player,
        //% block="enemy"
        //% blockIdentity="rpg._partyType"
        Enemy
    }

    //% blockId=rpg_character_createCharacter
    //% block="create character $name"
    //% name.shadow=rpg_characterNameShadow
    //% subcategory=Characters
    //% group=Create
    //% weight=100
    export function createCharacter(name: string): Entity {
        const c = new Character();
        c.name = name;
        _globalState().characters.add(c);

        return c as Entity;
    }

    //% blockId=rpg_character_character
    //% block="character $name"
    //% name.shadow=rpg_characterNameShadow
    //% subcategory=Characters
    //% group=Create
    //% weight=90
    export function character(name: string): Entity {
        return _globalState().characters.getByName(name);
    }

    //% blockId=rpg_character_createEquipment
    //% block="create equipment $name"
    //% name.shadow=rpg_equipmentNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=100
    export function createEquipment(name: string): Entity {
        const e = new Entity();
        e.name = name;
        _globalState().equipment.add(e);

        return e;
    }

    //% blockId=rpg_character_equipment
    //% block="equipment $name"
    //% name.shadow=rpg_equipmentNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=90
    export function equipment(name: string): Entity {
        return _globalState().equipment.getByName(name);
    }

    //% blockId=rpg_character_setEquipment
    //% block="set $character equipment slot $slot to $value"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% slot.shadow=rpg_equipmentSlotNameShadow
    //% subcategory=Characters
    //% group=Equipment
    //% weight=50
    export function removeEquipment(character: Entity, slot: string): void {
        _assertCharacter(character, "removeEquipment");

        const char = character as Character;
        char.equipment.removeEquip(slot);
    }

    //% blockId=rpg_character_createSkill
    //% block="create skill $name"
    //% name.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=100
    export function createSkill(name: string): Entity {
        const e = new Entity();
        e.name = name;
        _globalState().skills.add(e);

        return e;
    }

    //% blockId=rpg_character_skill
    //% block="skill $name"
    //% name.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=90
    export function skill(name: string): Entity {
        return _globalState().skills.getByName(name);
    }

    //% blockId=rpg_character_addSkill
    //% block="$character add skill $skill"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% skill.shadow=rpg_skillNameShadow
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
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
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% skill.shadow=rpg_skillNameShadow
    //% subcategory=Characters
    //% group=Skills
    //% weight=50
    export function getSkill(character: Entity, skill: string): Entity {
        _assertCharacter(character, "getSkill");

        const char = character as Character;
        return char.skills.getByName(skill);
    }

    //% blockId=rpg_character_addToParty
    //% block="add $character to $party"
    //% character.shadow=variables_get
    //% character.defl=myCharacter
    //% party.shadow=rpg_partyType
    //% subcategory=Characters
    //% group=Party
    //% weight=100
    export function addToParty(character: Entity, party: PartyType): void {
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
    export function getParty(party: PartyType): Entity[] {
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
    export function getPartyCharacter(party: PartyType, name: string): Entity {
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
    export function removeFromParty(party: PartyType, name: string): void {
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