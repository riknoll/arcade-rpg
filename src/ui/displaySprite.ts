namespace rpg.ui {
    export class DisplaySprite extends _CompoundSprite {
        protected bounds: Region;
        protected columns: string[][];

        constructor(public region: ScreenRegion) {
            super(new _FrameSprite(0, 0));

            this.bounds = getScreenRegion(region);
            this.columns = [];
            this.updateBounds();
            this.setFlag(SpriteFlag.RelativeToCamera, true);
        }

        updateBounds() {
            this.left = this.bounds.left;
            this.top = this.bounds.top;
            const state = _state();

            const frame = state.frame;
            const frameUnit = frame ? Math.idiv(frame.width, 3) : 0;

            const frameSprite = this.root as _FrameSprite;
            frameSprite.setFrame(frame);
            frameSprite.setContentDimensions(
                this.bounds.width - (frameUnit << 1),
                this.bounds.height - (frameUnit << 1),
            );
            this.destroyChildren();

            if (!this.columns.length) {
                return;
            }

            if (this.columns.length === 1) {
                const child = new miniMenu.MenuSprite();
                child.setKind(SpriteKind.rpg_UI);
                child.setButtonEventsEnabled(false);
                child.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, this.bounds.width - (frameUnit << 1));
                child.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, this.bounds.height - (frameUnit << 1));
                child.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1);
                child.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, this.columns[0].length);
                child.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, state.backgroundColor);
                child.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, state.foregroundColor);
                this.addChild(child, frameUnit, frameUnit);

                return;
            }

            const right = new miniMenu.MenuSprite();
            right.setKind(SpriteKind.rpg_UI);
            right.setButtonEventsEnabled(false);
            right.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, this.bounds.height - (frameUnit << 1));
            right.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1);
            right.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, this.columns[0].length);
            right.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, state.backgroundColor);
            right.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, state.foregroundColor);

            const left = new miniMenu.MenuSprite();
            left.setKind(SpriteKind.rpg_UI);
            left.setButtonEventsEnabled(false);
            left.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, this.bounds.height - (frameUnit << 1));
            left.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 1);
            left.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, this.columns[1].length);
            left.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, state.backgroundColor);
            left.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, state.foregroundColor);

            const leftItems: miniMenu.MenuItem[] = [];
            const rightItems: miniMenu.MenuItem[] = [];
            for (const item of this.columns[0]) {
                leftItems.push(new miniMenu.MenuItem(item, undefined));
            }

            for (const item of this.columns[1]) {
                rightItems.push(new miniMenu.MenuItem(item, undefined));
            }

            left.setMenuItems(leftItems);
            right.setMenuItems(rightItems);

            left.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, this.bounds.width - right.width - (frameUnit << 1));

            this.addChild(left, frameUnit, frameUnit);
            this.addChild(right, frameUnit + left.width, frameUnit);
        }

        setTextColor(foregroundColor: number, backgroundColor: number) {
            for (const child of this.children) {
                if (child instanceof miniMenu.MenuSprite) {
                    (child as miniMenu.MenuSprite).setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, backgroundColor);
                    (child as miniMenu.MenuSprite).setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Foreground, foregroundColor);
                }
            }
        }

        setColumns(columns: string[][]) {
            this.columns = columns.map(c => c.slice());
            this.updateBounds();
        }
    }

    export function createDisplaySprite(region: ScreenRegion, source: Entity, type: DisplayType) {
        const result = new DisplaySprite(region);

        switch (type) {
            case DisplayType.Equipment:
                _assertCharacter(source, "createDisplaySprite");
                result.setColumns([
                    (source as Character).equipment.keys(),
                    (source as Character).equipment.keys().map(key => (source as Character).equipment.getEquip(key).name)
                ]);
                break;
            case DisplayType.Stats:
                result.setColumns([
                    source._stats.keys(),
                    source._stats.keys().map(key => source._stats.getStat(key) + "")
                ]);
                break;
            case DisplayType.Skills:
                _assertCharacter(source, "createDisplaySprite");
                result.setColumns([
                    (source as Character).skills.getAll().map(s => s.name)
                ]);
                break;
        }

        return result;
    }
}