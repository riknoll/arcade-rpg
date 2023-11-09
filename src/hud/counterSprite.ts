namespace rpg.hud {
    const BOX_SPACING = 1;

    export class CounterSprite extends NumberSprite {
        protected digits: number;
        protected counterValue = 0;

        protected renderImage: Image;
        protected font: image.Font;
        protected animationState: number[];
        protected speed = 10;
        protected scrolling = false;

        protected bgColor = 1;
        protected bgShade1 = 13;
        protected bgShade2 = 11;

        constructor(kind?: number) {
            super(kind);

            this.font = image.font8
            this.setDigits(3);
            this.animationState = [];

            for (let i = 0; i < this.digits; i++) {
                this.animationState.push(0);
            }
        }

        setColors(fg: number, bg: number, bgShade1: number, bgShade2: number) {
            this.setColor(fg);
            this.bgColor = bg;
            this.bgShade1 = bgShade1;
            this.bgShade2 = bgShade2;
        }

        setDigits(digits: number) {
            this.digits = digits;

            this.setDimensions(
                this.font.charHeight + 2,
                this.digits * (this.font.charWidth + 2 + BOX_SPACING) - BOX_SPACING
            );
        }

        setScrollSpeed(speed: number) {
            this.speed = speed;
        }

        jumpToValue() {
            this.counterValue = this.displayValue;
        }

        update(deltaTimeMillis: number) {
            super.update(deltaTimeMillis);

            const moveAmount = ((this.speed / 1000) * deltaTimeMillis);

            if (this.counterValue < this.displayValue) {
                this.counterValue = Math.min(this.counterValue + moveAmount, this.displayValue);

                for (let i = 0; i < this.digits; i++) {
                    const target = Math.idiv(this.counterValue, 10 ** i) % 10;

                    if (target < this.animationState[i]) {
                        this.animationState[i] = Math.min(this.animationState[i] + moveAmount, target + 10) % 10;
                    }
                    else if (target > this.animationState[i]) {
                        this.animationState[i] = Math.min(this.animationState[i] + moveAmount, target) % 10;
                    }
                }
                this.scrolling = true;
            }
            else if (this.counterValue > this.displayValue) {
                this.counterValue = Math.max(this.counterValue - moveAmount, this.displayValue);

                for (let i = 0; i < this.digits; i++) {
                    const target = Math.idiv(this.counterValue, 10 ** i) % 10;

                    if (target < this.animationState[i]) {
                        this.animationState[i] = Math.max(this.animationState[i] - moveAmount, target) % 10;
                    }
                    else if (target > this.animationState[i]) {
                        this.animationState[i] = Math.max(this.animationState[i] - moveAmount + 10, target) % 10;
                    }
                }
                this.scrolling = true
            }
            else {
                this.scrolling = false
                for (let i = 0; i < this.digits; i++) {
                    const target = Math.idiv(this.counterValue, 10 ** i) % 10;

                    if (this.animationState[i] !== target) {
                        this.scrolling = true;
                        if (this.animationState[i] < target) {
                            if (target === 9 && this.animationState[i] < 5) {
                                this.animationState[i] = Math.max(this.animationState[i] - moveAmount + 10, target) % 10;
                            }
                            else {
                                this.animationState[i] = Math.min(this.animationState[i] + moveAmount, target) % 10;
                            }
                        }
                        else {
                            if (target === 0 && this.animationState[i] > 5) {
                                this.animationState[i] = Math.min(this.animationState[i] + moveAmount, target + 10) % 10;
                            }
                            else {
                                this.animationState[i] = Math.max(this.animationState[i] - moveAmount, target) % 10;
                            }
                        }
                    }
                }
            }
        }


        draw(left: number, top: number) {
            const BOX_HEIGHT = this.font.charHeight + 2;
            const BOX_WIDTH = this.font.charWidth + 2;
            const VERTICAL_SPACING = 2;
            const TARGET_TOP = (BOX_HEIGHT >> 1) - (this.font.charHeight >> 1);

            for (let i = 0; i < this.digits; i++) {
                const dLeft = left + (this.digits - i - 1) * (BOX_WIDTH + BOX_SPACING)
                screen.fillRect(
                    dLeft,
                    top + 2,
                    BOX_WIDTH,
                    BOX_HEIGHT - 4,
                    this.bgColor
                );
                screen.fillRect(
                    dLeft,
                    top,
                    BOX_WIDTH,
                    1,
                    this.bgShade2
                );
                screen.fillRect(
                    left + (this.digits - i - 1) * (BOX_WIDTH + BOX_SPACING),
                    top + 1,
                    BOX_WIDTH,
                    1,
                    this.bgShade1
                );
                screen.fillRect(
                    dLeft,
                    top + BOX_HEIGHT - 1,
                    BOX_WIDTH,
                    1,
                    this.bgShade2
                );
                screen.fillRect(
                    left + (this.digits - i - 1) * (BOX_WIDTH + BOX_SPACING),
                    top + BOX_HEIGHT - 2,
                    BOX_WIDTH,
                    1,
                    this.bgShade1
                );
                const digitOffset = this.animationState[i] % 1;
                const digit = this.animationState[i] | 0;

                this.drawDigit(
                    digit,
                    dLeft + 1,
                    top + TARGET_TOP + digitOffset * (this.font.charHeight + VERTICAL_SPACING),
                    left,
                    top,
                    left + (this.digits * (BOX_WIDTH + BOX_SPACING) - BOX_SPACING),
                    top + BOX_HEIGHT
                );

                this.drawDigit(
                    digit === 9 ? 0 : digit + 1,
                    dLeft + 1,
                    top + TARGET_TOP + (digitOffset - 1) * (this.font.charHeight + VERTICAL_SPACING),
                    left,
                    top,
                    left + (this.digits * (BOX_WIDTH + BOX_SPACING) - BOX_SPACING),
                    top + BOX_HEIGHT
                );

                this.drawDigit(
                    digit === 0 ? 9 : digit - 1,
                    dLeft + 1,
                    top + TARGET_TOP + (digitOffset + 1) * (this.font.charHeight + VERTICAL_SPACING),
                    left,
                    top,
                    left + (this.digits * (BOX_WIDTH + BOX_SPACING) - BOX_SPACING),
                    top + BOX_HEIGHT
                );
            }

        }

        drawDigit(digit: number, left: number, top: number, boxLeft: number, boxTop: number, boxRight: number, boxBottom: number,) {
            if (!this.renderImage) {
                this.renderImage = image.create(this.font.charWidth, this.font.charHeight);
            }
            else {
                this.renderImage.fill(0);
            }

            this.renderImage.print(digit + "", 0, 0, this.color, this.font);
            drawInBox(screen, this.renderImage, left | 0, top | 0, boxLeft | 0, boxTop | 0, boxRight | 0, boxBottom | 0);
        }
    }

    function drawInBox(target: Image, src: Image, left: number, top: number, boxLeft: number, boxTop: number, boxRight: number, boxBottom: number) {
        const xDst = Math.max(left, boxLeft);
        const yDst = Math.max(top, boxTop);
        const wDst = Math.min(left + src.width, boxRight) - xDst;
        const hDst = Math.min(top + src.height, boxBottom) - yDst;

        target.blit(
            xDst,
            yDst,
            wDst,
            hDst,
            src,
            xDst - left,
            yDst - top,
            wDst,
            hDst,
            true,
            false
        );
    }
}