namespace rpg {
    export class EquipmentSlot {
        constructor(public kind: string, public value: Entity) { }
    }

    export class Equipment {
        protected equipment: EquipmentSlot[];

        constructor() {
            this.equipment = [];
        }

        setEquip(kind: string, value: Entity) {
            for (const equip of this.equipment) {
                if (equip.kind === kind) {
                    equip.value = value;
                    return;
                }
            }

            this.equipment.push(new EquipmentSlot(kind, value));
        }

        getEquip(kind: string) {
            for (const equip of this.equipment) {
                if (equip.kind === kind) {
                    return equip.value;
                }
            }

            return undefined;
        }

        hasEquip(kind: string) {
            for (const equip of this.equipment) {
                if (equip.kind === kind && equip.value) {
                    return true;
                }
            }
            return false;
        }

        removeEquip(kind: string) {
            this.equipment = this.equipment.filter(e => e.kind !== kind);
        }

        keys(sorted = false) {
            const equips = this.equipment.map(equip => equip.kind);

            if (sorted) {
                equips.sort(stringCompare);
            }

            return equips;
        }
    }

    function stringCompare(a: string, b: string) {
        if (a === b) return 0;
        else if (a < b) return -1;
        return 1;
    }
}