namespace rpg.ui {
    export let _UI_SPRITE_KIND_KEY = "$rpg_UI_SPRITE_KIND";
    export class UIState {
        frame: Image;
        foregroundColor: number;
        backgroundColor: number;
        selectedForegroundColor: number;
        selectedBackgroundColor: number;
        menuMargin: number;

        displaySprites: DisplaySprite[];
        menuStack: miniMenu.MenuSprite[];

        protected lastSelectedOption: string;
        protected lastSelectedEntity: Entity;
        protected buttonPressed: boolean;

        constructor() {
            this.foregroundColor = 15;
            this.backgroundColor = 1;
            this.selectedBackgroundColor = 3;
            this.selectedForegroundColor = 1;
            this.menuMargin = 0;
            this.displaySprites = [];
            this.menuStack = [];
        }

        setFrame(frame: Image) {
            this.frame = frame;

            for (const sprite of this.displaySprites) {
                sprite.updateBounds();
            }

            for (const sprite of this.menuStack) {
                sprite.setFrame(frame);
            }
        }

        setTextColor(foregroundColor: number, backgroundColor: number) {
            for (const sprite of this.menuStack) {
                sprite.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, foregroundColor)
                sprite.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, backgroundColor)
            }

            for (const sprite of this.displaySprites) {
                sprite.setTextColor(foregroundColor, backgroundColor);
            }
        }

        setSelectedTextColor(foregroundColor: number, backgroundColor: number) {
            for (const sprite of this.menuStack) {
                sprite.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, foregroundColor)
                sprite.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, backgroundColor)
            }
        }

        displayInRegion(region: ScreenRegion, source: Entity, type: DisplayType) {
            for (const sprite of this.displaySprites) {
                if (sprite.region === region) {
                    sprite.destroy();
                    this.displaySprites.removeElement(sprite);
                    break;
                }
            }

            this.displaySprites.push(createDisplaySprite(region, source, type));
        }

        destroyDisplayInRegion(region: ScreenRegion) {
            for (const sprite of this.displaySprites) {
                if (sprite.region === region) {
                    sprite.destroy();
                }
            }

            this.displaySprites = this.displaySprites.filter(d => d.region !== region);
        }

        showMenu(options: string[], region: ScreenRegion) {
            const menu = new miniMenu.MenuSprite();
            this.setMenuStyle(menu);

            const bounds = getScreenRegion(region);
            menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, bounds.width);
            menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, bounds.height);
            menu.top = bounds.top;
            menu.left = bounds.left;

            this.lastSelectedOption = undefined;
            this.buttonPressed = false;

            menu.onButtonPressed(controller.A, (selection, index) => {
                this.lastSelectedOption = selection;
                this.buttonPressed = true;
            })

            menu.setMenuItems(options.map(opt => new miniMenu.MenuItem(opt, undefined)));

            if (this.menuStack.length) {
                this.topMenu().setButtonEventsEnabled(false);
            }
            this.menuStack.push(menu);
            menu.setButtonEventsEnabled(true);
        }

        showEntityMenu(entities: Entity[], region: ScreenRegion) {
            const menu = new miniMenu.MenuSprite();
            this.setMenuStyle(menu);

            const bounds = getScreenRegion(region);
            menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, bounds.width);
            menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, bounds.height);
            menu.top = bounds.top;
            menu.left = bounds.left;

            this.lastSelectedOption = undefined;
            this.buttonPressed = false;

            menu.onButtonPressed(controller.A, (selection, index) => {
                this.lastSelectedOption = selection;
                this.lastSelectedEntity = entities[index];
                this.buttonPressed = true;
            })

            menu.onButtonPressed(controller.B, (selection, index) => {
                this.lastSelectedOption = undefined;
                this.lastSelectedEntity = undefined;
                this.buttonPressed = true;
            })

            menu.setMenuItems(entities.map(opt => new miniMenu.MenuItem(opt.name, undefined)));

            if (this.menuStack.length) {
                this.topMenu().setButtonEventsEnabled(false);
            }
            this.menuStack.push(menu);
            menu.setButtonEventsEnabled(true);
        }

        closeMenu() {
            const toDestroy = this.menuStack.pop();
            toDestroy.destroy();

            if (this.menuStack.length) {
                this.topMenu().setButtonEventsEnabled(true);
            }

            this.buttonPressed = false;
            this.lastSelectedOption = undefined;
        }

        closeAllMenus() {
            while (this.menuStack.length) this.closeMenu();
        }

        pauseUntilMenuSelection() {
            this.buttonPressed = false;
            this.lastSelectedOption = undefined;
            pauseUntil(() => this.buttonPressed);
        }

        getLastSelection() {
            return this.lastSelectedOption;
        }

        getLastSelectedEntity() {
            return this.lastSelectedEntity;
        }

        wasMenuCancelled() {
            return this.lastSelectedOption == undefined;
        }

        protected topMenu() {
            return this.menuStack[this.menuStack.length - 1];
        }

        protected setMenuStyle(menu: miniMenu.MenuSprite) {
            menu.setFlag(SpriteFlag.RelativeToCamera, true);
            menu.setFrame(this.frame);
            if (this.frame) {
                const unit = Math.idiv(this.frame.width, 3);
                menu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, this.frame.getPixel(unit, unit))
            }
            menu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, this.foregroundColor);
            menu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, this.backgroundColor);
            menu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, this.selectedForegroundColor);
            menu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, this.selectedBackgroundColor);
        }
    }
    let state: _StateFactory<UIState>;

    export function _state() {
        if (!state) {
            state = new _StateFactory(() => new UIState());
        }
        return state.state();
    }
}