namespace rpg {
    export enum EntityFlags {
        RandomLevelUp = 1 << 0
    }

    export class Entity {
        name: string;
        flags: number;
        level: number;

        stats: Stats;
        growthRates: Stats;
        statsPerLevel: number;

        health: number;
        damage: rpg.equation.ExpressionNode;
        attachedSprite: Sprite;
        data: any;

        constructor() {
            this.flags = 0;
            this.level = 0;
            this.statsPerLevel = 5;
            this.stats = new Stats();
            this.growthRates = new Stats();
            this.health = 0;
            this.damage = new rpg.equation.LiteralNode(0);
            this.data = {};
        }

        levelUp() {
            this.level ++;

            if (this.statsPerLevel <= 0) return;

            // Initialize stats
            for (const stat of this.growthRates.keys()) {
                if (!this.stats.hasStat(stat)) {
                    this.stats.setStat(stat, 0);
                }
            }

            if (this.stats.keys().length === 0) {
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
                for (const stat of this.stats.keys()) {
                    const rate = Math.max(0, this.growthRates.getStat(stat));

                    this.stats.setStat(stat, Math.floor((rate / growthTotal) * totalStats));
                }
            }


            // Allocate leftover stats by highest growth rate to lowest
            let allocatedStats = this.stats.sumAll();
            let growthStats = this.growthRates.keys(true);

            if (!growthStats.length) {
                growthStats = this.stats.keys();
            }

            while (allocatedStats < totalStats) {
                for (const stat of growthStats) {
                    allocatedStats++;
                    this.stats.changeStat(stat, 1);
                    if (allocatedStats >= totalStats) break;
                }
            }
        }

        clone(deep?: boolean) {
            const result = new Entity();
            result.name = this.name;
            result.stats = this.stats.clone();
            result.growthRates = this.growthRates.clone();
            result.level = this.level;
            result.health = this.health;
            result.damage = this.damage;
            result.statsPerLevel = this.statsPerLevel;
            result.flags = this.flags;
            result.data = {...this.data};
            return result;
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
                        this.stats.changeStat(stat, 1);
                        break;
                    }
                }
            }
        }
    }
}