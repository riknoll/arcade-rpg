//% color="#a85432"
namespace rpg {
    export enum StatKind {
        //% block="stat"
        Stat,
        //% block="growth rate"
        GrowthRate
    }

    //% blockId=rpg_create_entity
    //% block="create entity $entity"
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Create
    //% weight=200
    //% blockGap=8
    export function createEntity(name: string) {
        const result = new Entity();
        result.name = name;
        return result;
    }

    //% blockId=rpg_clone_entity
    //% block="clone entity $entity||and all children $deep"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% deep.defl=false
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Create
    //% weight=100
    export function cloneEntity(entity: Entity, deep = false) {
        return entity.clone(deep);
    }

    //% blockId=rpg_entity_setStat
    //% block="set $entity $stat $kind to $value"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% stat.defl="attack"
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Stats
    //% weight=100
    //% blockGap=8
    export function setStat(entity: Entity, stat: string, kind: StatKind, value: number) {
        if (kind === StatKind.GrowthRate) {
            entity.growthRates.setStat(stat, value);
        }
        else {
            entity.setStat(stat, value);
        }
    }

    //% blockId=rpg_entity_changeStat
    //% block="change $entity $stat $kind by $value"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% stat.defl="attack"
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Stats
    //% weight=90
    //% blockGap=8
    export function changeStat(entity: Entity, stat: string, kind: StatKind, value: number) {
        if (kind === StatKind.GrowthRate) {
            entity.growthRates.changeStat(stat, value);
        }
        else {
            entity.changeStat(stat, value);
        }
    }

    //% blockId=rpg_entity_getStat
    //% block="$entity $stat $kind"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% stat.defl="attack"
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Stats
    //% weight=80
    export function getStat(entity: Entity, stat: string, kind: StatKind) {
        if (kind === StatKind.GrowthRate) {
            return entity.growthRates.getStat(stat);
        }
        else {
            return entity.getStat(stat);
        }
    }

    //% blockId=rpg_entity_setValue
    //% block="$entity set $value to $val"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% inlineInputMode=inline
    //% subcategory=Entity
    //% group=Stats
    //% weight=70
    //% blockGap=8
    export function setValue(entity: Entity, value: EntityValue, val: number) {
        switch (value) {
            case EntityValue.Health:
                entity.health = val;
                break;
            case EntityValue.Level:
                entity.level = val;
                break;
            case EntityValue.StatsPerLevel:
                entity.statsPerLevel = val;
                break;
        }
    }

    //% blockId=rpg_entity_changeValueBy
    //% block="$entity change $value by $val"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=60
    //% blockGap=8
    export function changeValueBy(entity: Entity, value: EntityValue, val: number) {
        setValue(entity, value, getValue(entity, value) + val);
    }

    //% blockId=rpg_entity_getValue
    //% block="$entity $value"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=50
    export function getValue(entity: Entity, value: EntityValue) {
        switch (value) {
            case EntityValue.Health:
                return entity.health;
            case EntityValue.Level:
                return entity.level;
            case EntityValue.StatsPerLevel:
                return entity.statsPerLevel;
        }
    }

    //% blockId=rpg_entity_levelUp
    //% block="$entity level up||by $levels levels"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% levels.defl=1
    //% subcategory=Entity
    //% group=Stats
    //% weight=40
    export function levelUp(entity: Entity, levels = 1) {
        if (!(levels >= 0)) {
            levels = 0;
        }
        for (let i = 0; i < levels; i++) {
            entity.levelUp();
        }
    }

    //% blockId=rpg_entity_setName
    //% block="$entity set name to $name"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=30
    //% blockGap=8
    export function setName(entity: Entity, name: string): void {
        entity.name = name;
    }

    //% blockId=rpg_entity_getName
    //% block="$entity name"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=20
    export function getName(entity: Entity): string {
        return entity.name;
    }

    //% blockId=rpg_entity_setDamageEquation
    //% block="$entity set damage equation to $equation"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Damage
    //% weight=100
    //% blockGap=8
    export function setDamageEquation(entity: Entity, equation: rpg.equation.ExpressionNode | number) {
        entity.damage = rpg.equation.wrapNode(equation);
    }

    //% blockId=rpg_entity_dealDamage
    //% block="$attacker deal damage to $defender"
    //% attacker.shadow=variables_get
    //% attacker.defl=myEntity
    //% defender.shadow=variables_get
    //% defender.defl=defender
    //% subcategory=Entity
    //% group=Damage
    //% weight=90
    //% blockGap=8
    export function dealDamage(attacker: Entity, defender: Entity) {
        const damage = rpg.equation.evaluateDamageExpression(attacker.damage, defender, attacker, attacker);
        defender.health = Math.max(defender.health - damage, 0);
    }

    //% blockId=rpg_entity_dealDamageWith
    //% block="$attacker deal damage to $defender using $damageSource"
    //% attacker.shadow=variables_get
    //% attacker.defl=attacker
    //% defender.shadow=variables_get
    //% defender.defl=defender
    //% damageSource.shadow=variables_get
    //% damageSource.defl=myEntity
    //% subcategory=Entity
    //% group=Damage
    //% weight=80
    //% blockGap=8
    export function dealDamageWith(attacker: Entity, damageSource: Entity, defender: Entity) {
        const damage = rpg.equation.evaluateDamageExpression(damageSource.damage, defender, damageSource, attacker);
        defender.health = Math.max(defender.health - damage, 0);
    }

    //% blockId=rpg_entity_calculateDamage
    //% block="calculate damage with attacker $attacker defender $defender||damage source $damageSource"
    //% attacker.shadow=variables_get
    //% attacker.defl=attacker
    //% defender.shadow=variables_get
    //% defender.defl=defender
    //% damageSource.shadow=variables_get
    //% damageSource.defl=myEntity
    //% subcategory=Entity
    //% group=Damage
    //% weight=70
    export function calculateDamage(attacker: Entity, defender: Entity, damageSource?: Entity): number {
        if (damageSource) {
            return rpg.equation.evaluateDamageExpression(damageSource.damage, defender, damageSource, attacker);
        }
        else {
            return rpg.equation.evaluateDamageExpression(attacker.damage, defender, damageSource, attacker);
        }
    }

    //% blockId=rpg_entity_attachToSprite
    //% block="attach $entity to $sprite"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% subcategory=Entity
    //% group=Sprites
    //% weight=100
    //% blockGap=8
    export function attachToSprite(entity: Entity, sprite: Sprite) {
        if (sprite) {
            sprite.data["$attached_entity"] = entity;
        }
        if (entity) {
            entity.attachedSprite = sprite;
        }
    }

    //% blockId=rpg_entity_getAttachedEntity
    //% block="$sprite attached entity"
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% subcategory=Entity
    //% group=Sprites
    //% weight=90
    //% blockGap=8
    export function getAttachedEntity(sprite: Sprite): Entity {
        return sprite.data["$attached_entity"];
    }

    //% blockId=rpg_entity_getAttachedSprite
    //% block="$entity attached sprite"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Sprites
    //% weight=80
    //% blockGap=8
    export function getAttachedSprite(entity: Entity): Sprite {
        return entity.attachedSprite;
    }

    //% blockId=rpg_entity_sortByStat
    //% block="sort $entities by stat $stat||in ascending order $ascending"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% stat.shadow=rpg_statNameShadow
    //% ascending.defl=true
    //% subcategory=Entity
    //% group=Arrays
    //% weight=100
    //% blockGap=8
    export function sortByStat(entities: Entity[], stat: string, ascending = true) {
        const result = entities.slice();

        result.sort((a, b) => a.getStat(stat) - b.getStat(stat));

        if (!ascending) {
            result.reverse();
        }

        return result;
    }

    //% blockId=rpg_entity_sortByValue
    //% block="sort $entities by $value||in ascending order $ascending"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% ascending.defl=true
    //% subcategory=Entity
    //% group=Arrays
    //% weight=90
    //% blockGap=8
    export function sortByValue(entities: Entity[], value: EntityValue, ascending = true) {
        const result = entities.slice();

        result.sort((a, b) => getValue(a, value) - getValue(b, value));

        if (!ascending) {
            result.reverse();
        }

        return result;
    }

    //% blockId=rpg_entity_sortByData
    //% block="sort $entities by data $key||in ascending order $ascending"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% key.shadow=rpg_dataNumberKeyShadow
    //% ascending.defl=true
    //% subcategory=Entity
    //% group=Arrays
    //% weight=80
    //% blockGap=8
    export function sortByData(entities: Entity[], key: string, ascending = true) {
        const result = entities.slice();

        result.sort((a, b) => dataGetNumber(a, key) - dataGetNumber(b, key));

        if (!ascending) {
            result.reverse();
        }

        return result;
    }

    //% blockId=rpg_entity_sortByName
    //% block="sort $entities by name||in ascending order $ascending"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% ascending.defl=true
    //% subcategory=Entity
    //% group=Arrays
    //% weight=70
    export function sortByName(entities: Entity[], ascending = true) {
        const result = entities.slice();
        result.sort();

        if (!ascending) {
            result.reverse();
        }

        return result;
    }

    //% blockId=rpg_entity_filterByBooleanData
    //% block="filter $entities by boolean data $key"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% key.shadow=rpg_dataBooleanKeyShadow
    //% subcategory=Entity
    //% group=Arrays
    //% weight=60
    //% blockGap=8
    export function filterByBooleanData(entities: Entity[], key: string) {
        return entities.filter(e => dataGetBoolean(e, key));
    }

    //% blockId=rpg_entity_filterByBooleanData
    //% block="filter $entities by has status $status"
    //% entities.shadow=variables_get
    //% entities.defl=entityList
    //% status.shadow=rpg_statusNameShadow
    //% subcategory=Entity
    //% group=Arrays
    //% weight=50
    export function filterByStatus(entities: Entity[], status: string) {
        return entities.filter(e => hasStatus(e, status));
    }

    //% blockId=rpg_entity_concat
    //% block="concatenate $a and $b"
    //% a.shadow=variables_get
    //% a.defl=entityList
    //% b.shadow=variables_get
    //% b.defl=otherEntityList
    //% ascending.defl=true
    //% subcategory=Entity
    //% group=Arrays
    //% weight=60
    export function concat(a: Entity[], b: Entity[]): Entity[] {
        return a.concat(b);
    }
}