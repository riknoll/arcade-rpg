namespace rpg.ui {
    export class MenuBuilderItem  {
        constructor(public item: string, public handler: () => void) {
        }
    }

    export class MenuBuilder {
        items: MenuBuilderItem[];

        constructor() {
            this.items = [];
        }

        addItem(item: string, handler: () => void) {
            this.items.push(new MenuBuilderItem(item, handler));
        }

        show(region: ScreenRegion) {
            if (!this.items.length) return;
            _state().showMenu(this.items.map(i => i.item), region);
            _state().pauseUntilMenuSelection();
            const selected = _state().getLastSelection();

            for (const item of this.items) {
                if (item.item === selected) {
                    item.handler();
                    return;
                }
            }
        }
    }
}