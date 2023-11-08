namespace rpg {
    export class Stat {
        constructor(public kind: string, public value: number) { }
    }

    export class Stats {
        protected stats: Stat[];

        constructor() {
            this.stats = [];
        }

        setStat(kind: string, value: number) {
            for (const stat of this.stats) {
                if (stat.kind === kind) {
                    stat.value = value;
                    return;
                }
            }

            this.stats.push(new Stat(kind, value));
        }

        getStat(kind: string) {
            for (const stat of this.stats) {
                if (stat.kind === kind) {
                    return stat.value;
                }
            }

            return 0;
        }

        hasStat(kind: string) {
            for (const stat of this.stats) {
                if (stat.kind === kind) {
                    return true;
                }
            }
            return false;
        }

        changeStat(kind: string, by: number) {
            this.setStat(kind, Math.max(this.getStat(kind), 0) + by);
        }

        keys(sorted = false) {
            const stats = this.stats.map(stat => stat.kind);

            if (sorted) {
                stats.sort((a, b) => {
                    return this.getStat(b) - this.getStat(a)
                });
            }

            return stats;
        }

        sumAll() {
            let sum = 0;

            for (const stat of this.stats) {
                sum += stat.value;
            }

            return sum;
        }

        clone() {
            const result = new Stats();

            for (const stat of this.stats) {
                result.setStat(stat.kind, stat.value)
            }

            return result;
        }
    }
}