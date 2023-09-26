namespace rpg {
    export class EntityRegistry {
        protected entities: Entity[];

        constructor() {
            this.entities = [];
        }

        add(character: Entity) {
            this.entities.push(character);
        }

        get(index: number) {
            return this.entities[index];
        }

        exists(name: string) {
            return !!this.getByName(name);
        }

        getByName(name: string) {
            for (const char of this.entities) {
                if (char.name === name) {
                    return char;
                }
            }
            return undefined;
        }

        remove(index: number) {
            this.entities.removeAt(index);
        }

        removeByName(name: string) {
            this.entities = this.entities.filter(c => c.name !== name);
        }

        getAll() {
            return this.entities.slice();
        }

        getNames() {
            return this.entities.map(e => e.name);
        }

        count(name: string) {
            let count = 0;

            for (const entity of this.entities) {
                if (entity.name === name) count++;
            }

            return count;
        }

        getUniqueEntries() {
            const out: Entity[] = [];

            for (const entity of this.entities) {
                if (!out.some(e => e.name === entity.name)) {
                    out.push(entity);
                }
            }

            return out;
        }

        getUniqueNames() {
            const out: string[] = [];

            for (const entity of this.entities) {
                if (out.indexOf(entity.name) === -1) {
                    out.push(entity.name);
                }
            }

            return out;
        }
    }
}