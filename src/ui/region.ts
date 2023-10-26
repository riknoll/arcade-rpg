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
        let result: Region;
        switch (region) {
            case ScreenRegion.Full:
                result = new Region(0, 0, screen.width, screen.height);
                break;
            case ScreenRegion.Center:
                result = new Region(10, 5, screen.width - 10, screen.height - 5);
                break;
            case ScreenRegion.Left:
                result = new Region(0, 0, screen.width >> 1, screen.height);
                break;
            case ScreenRegion.Right:
                result = new Region(screen.width >> 1, 0, screen.width, screen.height);
                break;
            case ScreenRegion.Top:
                result = new Region(0, 0, screen.width, screen.height >> 1);
                break;
            case ScreenRegion.Bottom:
                result = new Region(0, screen.height >> 1, screen.width, screen.height);
                break;
            case ScreenRegion.TopLeft:
                result = new Region(0, 0, screen.width >> 1, screen.height >> 1);
                break;
            case ScreenRegion.TopRight:
                result = new Region(screen.width >> 1, 0, screen.width, screen.height >> 1);
                break;
            case ScreenRegion.BottomLeft:
                result = new Region(0, screen.height >> 1, screen.width >> 1, screen.height);
                break;
            case ScreenRegion.BottomRight:
                result = new Region(screen.width >> 1, screen.height >> 1, screen.width, screen.height);
                break;
        }

        const padding = _state().menuMargin;

        if (padding) {
            result.left += padding;
            result.right -= padding;
            result.top += padding;
            result.bottom -= padding;
        }

        return result;
    }
}