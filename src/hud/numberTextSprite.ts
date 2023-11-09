namespace rpg.hud {
    export class NumberTextSprite extends NumberSprite {
        protected text: string;
        protected font: fancyText.BaseFont;
        protected lines: fancyText.Line[];

        constructor(kind?: number) {
            super(kind);
            this.lines = [];
            this.font = fancyText.defaultArcade;
            this.setText("0");
        }

        update(deltaTimeMillis: number): void {
            super.update(deltaTimeMillis);

            const currentText = this.displayValue + "";

            if (this.text !== currentText) {
                this.setText(currentText);
            }
        }

        setText(text: string) {
            this.text = text;
            const spans = fancyText.getSpans(text);
            this.lines = fancyText.getLines(text, spans, 0xffffffff, this.font);

            let width = 0;
            let height = 0;

            for (const line of this.lines) {
                width = Math.max(line.width, width);
                height += line.height;
            }

            this.setDimensions(
                width,
                height
            );
        }

        setFont(font: fancyText.BaseFont) {
            this.font = font;
        }

        draw(left: number, top: number) {
            fancyText.drawFontText(left, top, this.text, this.lines, this.color, this.font, this.text.length);
        }
    }
}