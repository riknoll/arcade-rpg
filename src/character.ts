namespace rpg {
    export class Character extends Entity {
        equipment: Equipment;
        skills: EntityRegistry;
        inventory: EntityRegistry;

        constructor() {
            super();
            this.skills = new EntityRegistry();
            this.inventory = new EntityRegistry();
            this.equipment = new Equipment();
        }

        getStat(key: string) {
            let current = this._stats.getStat(key);

            for (const equip of this.equipment.getAll()) {
                current += equip.getStat(key);
            }

            let allEffects: Modifier[] = [];

            for (const status of this.statusEffects) {
                allEffects = allEffects.concat(status.getStatModifiers(key))
            }

            _sortStatusModifiers(allEffects);

            for (const mod of allEffects) {
                current = mod.apply(current);
            }

            return current;
        }

        clone(deep?: boolean) {
            const result = new Character();
            result.name = this.name;
            result._stats = this._stats.clone();
            result.growthRates = this.growthRates.clone();
            result.level = this.level;
            result.health = this.health;
            result.damage = this.damage;
            result.statsPerLevel = this.statsPerLevel;
            result.flags = this.flags;

            result.skills = this.skills.clone(!!deep);
            result.inventory = this.inventory.clone(!!deep);
            result.equipment = this.equipment.clone(!!deep);
            result.data = {...this.data}
            return result;
        }
    }
}