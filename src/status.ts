namespace rpg {
    export class Modifier {
        constructor(public operator: BinaryOperator, public value: number) {}

        clone() {
            return new Modifier(this.operator, this.value);
        }

        apply(value: number) {
            switch (this.operator) {
                case BinaryOperator.Add:
                    return value + this.value;
                case BinaryOperator.Subtract:
                    return value - this.value;
                case BinaryOperator.Multiply:
                    return value * this.value;
                case BinaryOperator.Divide:
                    return value / this.value;
                case BinaryOperator.Exponent:
                    return value ** this.value;
                case BinaryOperator.Max:
                    return Math.max(value, this.value);
                case BinaryOperator.Min:
                    return Math.min(value, this.value);
            }
        }
    }

    export class StatModifier {
        constructor(public stat: string, public modifier: Modifier) {}

        clone() {
            return new StatModifier(this.stat, this.modifier.clone());
        }
    }

    export class Status {
        protected statModifiers: StatModifier[];
        protected healthModifiers: Modifier[];
        protected counter: number;
        protected removalChance: number;

        constructor(public name: string) {
            this.statModifiers = [];
            this.healthModifiers = [];
            this.counter = -1;
            this.removalChance = -1;
        }

        addStatModifier(stat: string, operator: BinaryOperator, value: number) {
            this.statModifiers.push(new StatModifier(stat, new Modifier(operator, value)));
        }

        addHealthModfier(operator: BinaryOperator, value: number) {
            this.healthModifiers.push(new Modifier(operator, value));
        }

        getStatModifiers(stat: string) {
            const result: Modifier[] = [];

            for (const mod of this.statModifiers) {
                if (mod.stat === stat) {
                    result.push(mod.modifier);
                }
            }

            return result;
        }

        getHealthModifiers() {
            return this.healthModifiers.slice();
        }

        setCounter(value: number) {
            this.counter = value;
        }

        getCounter() {
            return this.counter;
        }

        setRemovalChance(value: number) {
            this.removalChance = value;
        }

        advance() {
            if (this.removalChance >= 0) {
                if (Math.percentChance(this.removalChance)) {
                    this.counter = 0;
                }
            }
            if (this.counter > 0) {
                this.counter --;
            }

            return this.counter;
        }

        isCompleted() {
            return this.counter === 0;
        }

        clone() {
            const result = new Status(this.name);

            for (const mod of this.statModifiers) {
                result.statModifiers.push(mod.clone());
            }
            for (const mod of this.healthModifiers) {
                result.healthModifiers.push(mod.clone());
            }
            result.counter = this.counter;
            result.removalChance = this.removalChance;

            return result;
        }
    }

    function operatorPrecedence(operator: BinaryOperator) {
        switch (operator) {
            case BinaryOperator.Exponent:
                return 10;
            case BinaryOperator.Multiply:
            case BinaryOperator.Divide:
                return 9;
            case BinaryOperator.Add:
            case BinaryOperator.Subtract:
                return 8;
            case BinaryOperator.Max:
            case BinaryOperator.Min:
                return 1;
        }
    }

    function compareModifierPrecedence(a: Modifier, b: Modifier) {
        return operatorPrecedence(b.operator) - operatorPrecedence(a.operator);
    }

    export function _sortStatusModifiers(modifiers: Modifier[]) {
        modifiers.sort(compareModifierPrecedence)
    }
}