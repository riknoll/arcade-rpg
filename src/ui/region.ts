namespace rpg.ui {
    export class Region {
        constructor(public left: number, public top: number, public right: number, public bottom: number) {
        }

        get width() {
            return this.right - this.left;
        }

        get height() {
            return this.bottom - this.top;
        }
    }

    export function getScreenRegion(region: ScreenRegion) {
        switch (region) {
            case ScreenRegion.Full:
                return new Region(0, 0, screen.width, screen.height);
            case ScreenRegion.Center:
                return new Region(10, 5, screen.width - 10, screen.height - 5);
            case ScreenRegion.Left:
                return new Region(0, 0, screen.width >> 1, screen.height);
            case ScreenRegion.Right:
                return new Region(screen.width >> 1, 0, screen.width, screen.height);
            case ScreenRegion.Top:
                return new Region(0, 0, screen.width, screen.height >> 1);
            case ScreenRegion.Bottom:
                return new Region(0, screen.height >> 1, screen.width, screen.height);
            case ScreenRegion.TopLeft:
                return new Region(0, 0, screen.width >> 1, screen.height >> 1);
            case ScreenRegion.TopRight:
                return new Region(screen.width >> 1, 0, screen.width, screen.height >> 1);
            case ScreenRegion.BottomLeft:
                return new Region(0, screen.height >> 1, screen.width >> 1, screen.height);
            case ScreenRegion.BottomRight:
                return new Region(screen.width >> 1, screen.height >> 1, screen.width, screen.height);
        }
    }
}