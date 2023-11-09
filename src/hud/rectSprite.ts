namespace rpg.hud {
    export class RectSprite extends HUDSprite {
        constructor(kind?: number) {
            super(kind);
        }

        draw(left: number, top: number) {
            screen.fillRect(left, top, this.width, this.height, this.color);
        }
    }
}