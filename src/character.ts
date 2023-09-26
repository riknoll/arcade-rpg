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
    }
}