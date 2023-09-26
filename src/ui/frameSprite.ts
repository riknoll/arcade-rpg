namespace rpg.ui {
    export class _FrameSprite extends sprites.ExtendableSprite {
        protected frame: Image;

        constructor(protected contentWidth: number, protected contentHeight: number) {
            super(img`1`, SpriteKind.rpg_UI);

            this.updateDimensions();
            this.data[_UI_SPRITE_KIND_KEY] = "frame";
        }

        setFrame(frame: Image) {
            this.frame = frame;

            this.updateDimensions();
        }

        setContentDimensions(contentWidth: number, contentHeight: number) {
            this.contentWidth = contentWidth;
            this.contentHeight = contentHeight;

            this.updateDimensions();
        }

        draw(drawLeft: number, drawTop: number): void {
            if (!this.frame) return;
            fancyText.drawFrame(screen, this.frame, drawLeft, drawTop, this.width, this.height);
        }

        protected updateDimensions() {
            if (this.frame) {
                this.setDimensions(
                    this.contentWidth + (Math.idiv(this.frame.width, 3) << 1),
                    this.contentHeight + (Math.idiv(this.frame.width, 3) << 1)
                );
            }
            else {
                this.setDimensions(
                    this.contentWidth,
                    this.contentHeight
                );
            }
        }
    }
}