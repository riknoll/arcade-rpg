namespace rpg {
    export enum EntityFlags {
        RandomLevelUp = 1 << 0
    }

    export class Entity {
        name: string;
        flags: number;
        level: number;

        statusEffects: Status[];
        growthRates: Stats;
        statsPerLevel: number;

        health: number;
        damage: rpg.equation.ExpressionNode;
        attachedSprite: Sprite;
        data: any;

        _stats: Stats;

        constructor() {
            this.flags = 0;
            this.level = 0;
            this.statsPerLevel = 5;
            this._stats = new Stats();
            this.growthRates = new Stats();
            this.health = 0;
            this.damage = new rpg.equation.LiteralNode(0);
            this.data = {};
            this.statusEffects = [];
        }

        levelUp() {
            this.level ++;

            if (this.statsPerLevel <= 0) return;

            // Initialize stats
            for (const stat of this.growthRates.keys()) {
                if (!this._stats.hasStat(stat)) {
                    this._stats.setStat(stat, 0);
                }
            }

            if (this._stats.keys().length === 0) {
                return;
            }

            if (this.flags & EntityFlags.RandomLevelUp) {
                this.randomLevelUp();
                return;
            }

            // Use the growth rates as a percentage and allocate each stat
            const totalStats = this.level * this.statsPerLevel;
            const growthTotal = this.growthRates.sumAll();

            if (growthTotal) {
                for (const stat of this._stats.keys()) {
                    const rate = Math.max(0, this.growthRates.getStat(stat));

                    this._stats.setStat(stat, Math.floor((rate / growthTotal) * totalStats));
                }
            }


            // Allocate leftover stats by highest growth rate to lowest
            let allocatedStats = this._stats.sumAll();
            let growthStats = this.growthRates.keys(true);

            if (!growthStats.length) {
                growthStats = this._stats.keys();
            }

            while (allocatedStats < totalStats) {
                for (const stat of growthStats) {
                    allocatedStats++;
                    this._stats.changeStat(stat, 1);
                    if (allocatedStats >= totalStats) break;
                }
            }
        }

        clone(deep?: boolean) {
            const result = new Entity();
            result.name = this.name;
            result._stats = this._stats.clone();
            result.growthRates = this.growthRates.clone();
            result.level = this.level;
            result.health = this.health;
            result.damage = this.damage;
            result.statsPerLevel = this.statsPerLevel;
            result.flags = this.flags;
            result.data = {...this.data};
            return result;
        }

        getStat(key: string) {
            let current = this._stats.getStat(key);

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

        getRawStat(key: string) {
            return this._stats.getStat(key);
        }

        setStat(key: string, value: number) {
            this._stats.setStat(key, value);
        }

        changeStat(key: string, value: number) {
            this._stats.changeStat(key, value)
        }

        advanceStatuses() {
            let healthModifiers: Modifier[] = [];

            for (const status of this.statusEffects) {
                status.advance();
                healthModifiers = healthModifiers.concat(status.getHealthModifiers());
            }

            _sortStatusModifiers(healthModifiers);

            for (const mod of healthModifiers) {
                this.health = mod.apply(this.health);
            }

            this.statusEffects = this.statusEffects.filter(s => !s.isCompleted());
        }

        hasStatus(name: string) {
            for (const status of this.statusEffects) {
                if (status.name === name) {
                    return true;
                }
            }

            return false;
        }

        addStatus(status: Status) {
            this.statusEffects.push(status);
        }

        removeStatus(status: Status) {
            this.statusEffects = this.statusEffects.filter(s => s !== status)
        }

        removeStatusByName(name: string) {
            this.statusEffects = this.statusEffects.filter(s => s.name !== name);
        }

        protected randomLevelUp() {
            const growthTotal = this.growthRates.sumAll();
            const growthStats = this.growthRates.keys();

            // Randomly allocate stats using the growth rates as a percent chance
            for (let i = 0; i < this.statsPerLevel; i++) {
                const index = Math.floor(Math.random() * growthTotal);
                let current = 0;

                for (const stat of growthStats) {
                    current += this.growthRates.getStat(stat);

                    if (current > index) {
                        this._stats.changeStat(stat, 1);
                        break;
                    }
                }
            }
        }
    }
}