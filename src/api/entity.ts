namespace rpg {
    export enum StatKind {
        //% block="stat"
        Stat,
        //% block="growth rate"
        GrowthRate
    }

    //% blockId=rpg_entity_setStat
    //% block="set $entity $stat $kind to $value"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=100
    export function setStat(entity: Entity, stat: string, kind: StatKind, value: number) {
        if (kind === StatKind.GrowthRate) {
            entity.growthRates.setStat(stat, value);
        }
        else {
            entity.stats.setStat(stat, value);
        }
    }

    //% blockId=rpg_entity_changeStat
    //% block="change $entity $stat $kind by $value"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=90
    export function changeStat(entity: Entity, stat: string, kind: StatKind, value: number) {
        if (kind === StatKind.GrowthRate) {
            entity.growthRates.changeStat(stat, value);
        }
        else {
            entity.stats.changeStat(stat, value);
        }
    }

    //% blockId=rpg_entity_getStat
    //% block="$entity $stat $kind"
    //% stat.shadow=rpg_statNameShadow
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=80
    export function getStat(entity: Entity, stat: string, kind: StatKind) {
        if (kind === StatKind.GrowthRate) {
            return entity.growthRates.getStat(stat);
        }
        else {
            return entity.stats.getStat(stat);
        }
    }

    //% blockId=rpg_entity_setValue
    //% block="$entity set $value to v$al"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=70
    export function setValue(entity: Entity, value: EntityValue, val: number) {
        switch (value) {
            case EntityValue.Health:
                entity.health = val;
                break;
            case EntityValue.Level:
                entity.level = val;
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
        }
    }

    //% blockId=rpg_entity_levelUp
    //% block="$entity level up"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Stats
    //% weight=40
    export function levelUp(entity: Entity) {
        entity.levelUp();
    }

    //% blockId=rpg_entity_setDamageEquation
    //% block="$entity set damage equation to $equation"
    //% entity.shadow=variables_get
    //% entity.defl=myEntity
    //% subcategory=Entity
    //% group=Damage
    //% weight=100
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
    export function dealDamageWith(attacker: Entity, damageSource: Entity, defender: Entity) {
        const damage = rpg.equation.evaluateDamageExpression(damageSource.damage, defender, damageSource, attacker);
        defender.health = Math.max(defender.health - damage, 0);
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
    export function getAttachedSprite(entity: Entity): Sprite {
        return entity.attachedSprite;
    }
}