namespace rpg.ui.log {
    class TextLogState {
        sprite: fancyText.TextSprite;

        constructor() {
            this.sprite = new fancyText.TextSprite("", SpriteKind.rpg_UI);
            this.sprite.setFlag(SpriteFlag.Invisible, true);
            this.sprite.setFlag(SpriteFlag.RelativeToCamera, true);
            this.sprite.setFlag(SpriteFlag.Ghost, true);
            this.sprite.setMaxLines(2);
            this.sprite.setMaxWidth(screen.width - 4);
            this.sprite.setTextFlag(fancyText.Flag.AlwaysOccupyMaxWidth, true);
            this.sprite.setTextFlag(fancyText.Flag.ChangeHeightWhileAnimating, false);
            this.sprite.setTextFlag(fancyText.Flag.ChangeWidthWhileAnimating, false);
            this.positionSprite();
        }

        printText(text: string) {
            this.setVisible(true);

            this.sprite.setText(text);
            this.sprite.cancelAnimation();
            this.sprite.setStartLine(0);

            let lastPage = false;

            while (!lastPage) {
                lastPage = !this.sprite.hasNextPage();
                this.sprite.animateAtSpeed(30);
                this.sprite.pauseUntilAnimationIsComplete();
                controller.A.pauseUntil(ControllerButtonEvent.Released);
                this.sprite.nextPage();
            }
        }

        setFrame(frame: Image) {
            this.sprite.setFrame(frame);
            this.positionSprite();
        }

        setVisible(visible: boolean) {
            this.sprite.setFlag(SpriteFlag.Invisible, !visible);
        }

        setTextColor(color: number) {
            this.sprite.setColor(color);
        }

        protected positionSprite() {
            this.sprite.x = screen.width >> 1;
            this.sprite.top = 1;
        }
    }

    let state: _StateFactory<TextLogState>;

    function _init() {
        if (state) return;
        state = new _StateFactory(() => new TextLogState());
    }

    export function setVisible(visible: boolean) {
        _init();
        state.state().setVisible(visible);
    }

    export function print(text: string) {
        _init();
        state.state().printText(text);
    }

    export function setFrame(frame: Image) {
        _init();
        state.state().setFrame(frame);
    }

    export function setTextColor(color: number) {
        _init();
        state.state().setTextColor(color);
    }

    export function setZIndex(z: number) {
        _init();
        state.state().sprite.z = z;
    }
}