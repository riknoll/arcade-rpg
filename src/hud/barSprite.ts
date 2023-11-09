namespace rpg.hud {
    export class BarSprite extends NumberSprite {
        protected isVertical = false;
        protected bgColor = 0;

        protected maxValue: number;
        protected maxEquation: rpg.equation.ExpressionNode;
        protected maxEntity: Entity;
        protected maxDisplayValue = 100;

        constructor(kind?: number) {
            super(kind);
            this.setDimensions(20, 4);
        }

        update(deltaTimeMillis: number): void {
            super.update(deltaTimeMillis);

            if (this.maxEntity && this.maxEquation) {
                this.maxDisplayValue = rpg.equation.evaluateDamageExpression(this.maxEquation, this.maxEntity, this.maxEntity, this.maxEntity);
            }
            else if (this.maxValue !== undefined && !Number.isNaN(this.maxValue)) {
                this.maxDisplayValue = this.maxValue;
            }
            else {
                this.maxDisplayValue = 100;
            }
        }

        setMaxEquation(entity: Entity, equation: rpg.equation.ExpressionNode) {
            this.maxEntity = entity;
            this.maxEquation = equation;
            this.maxValue = undefined;
        }

        setMaxValue(value: number) {
            this.maxEntity = undefined;
            this.maxEquation = undefined;
            this.maxValue = value;
        }

        setColors(fg: number, bg: number) {
            this.setColor(fg);
            this.bgColor = bg;
        }

        setVertical(vertical: boolean) {
            this.isVertical = vertical;
        }

        draw(left: number, top: number) {
            if (this.bgColor) {
                screen.fillRect(left, top, this.width, this.height, this.bgColor);
            }

            if (this.isVertical) {
                const fillHeight = Math.round((this.displayValue / this.maxDisplayValue) * this.height);
                screen.fillRect(left, top, this.width, fillHeight, this.bgColor);
            }
            else {
                const fillWidth = Math.round((this.displayValue / this.maxDisplayValue) * this.width);
                screen.fillRect(left, top, fillWidth, this.height, this.bgColor);
            }
        }
    }
}