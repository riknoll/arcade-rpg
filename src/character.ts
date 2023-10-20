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


        clone(deep?: boolean) {
            const result = new Character();
            result.name = this.name;
            result.stats = this.stats.clone();
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