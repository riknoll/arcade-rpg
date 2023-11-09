namespace rpg.hud {
    export class NumberSprite extends HUDSprite {
        protected entity: Entity;
        protected equation: rpg.equation.ExpressionNode;
        protected value: number;

        protected displayValue = 0;

        constructor(kind?: number) {
            super(kind);
        }

        update(deltaTimeMillis: number): void {
            super.update(deltaTimeMillis);

            if (this.entity && this.equation) {
                this.displayValue = rpg.equation.evaluateDamageExpression(this.equation, this.entity, this.entity, this.entity);
            }
            else if (this.value !== undefined && !Number.isNaN(this.value)) {
                this.displayValue = this.value;
            }
            else {
                this.displayValue = 0;
            }
        }

        setEquation(entity: Entity, equation: rpg.equation.ExpressionNode) {
            this.entity = entity;
            this.equation = equation;
            this.value = undefined;
        }

        setValue(value: number) {
            this.value = value;
            this.entity = undefined;
            this.equation = undefined;
        }
    }
}