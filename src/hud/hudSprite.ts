namespace rpg.hud {
    export class HUDSprite extends sprites.ExtendableSprite {
        protected parentConnection: Connection;
        protected children: Connection[];
        protected color: number;

        constructor(kind?: number) {
            super(img`.`, kind);

            this.children = [];

            this.flags |= SpriteFlag.RelativeToCamera;
        }

        setColor(color: number) {
            this.color = color;
        }

        getColor() {
            return this.color;
        }

        update(deltaTimeMillis: number): void {
            if (this.parentConnection) {
                if (this.parentConnection.parent.flags & sprites.Flag.Destroyed) {
                    this.destroy();
                    return;
                }
            }
            else {
                for (const connection of this.children) {
                    connection.child.reposition();
                }
            }
        }

        attachTo(parent: HUDSprite, anchor: HUDSpriteAnchor, xOffset: number, yOffset: number) {
            if (this.parentConnection) {
                this.parentConnection.parent.removeConnection(this);
                this.parentConnection = undefined;
            }

            if (!parent) return;

            parent.removeConnection(this);

            this.parentConnection = new Connection(
                parent,
                this,
                anchor,
                xOffset,
                yOffset
            );

            parent.children.push(this.parentConnection);
        }

        removeConnection(child: HUDSprite) {
            this.children = this.children.filter(connection => connection.child !== child);

            for (const connection of this.children) {
                connection.child.removeConnection(child);
            }
        }

        hasChild(child: HUDSprite) {
            if (this === child) {
                return true;
            }

            for (const children of this.children) {
                if (children.child.hasChild(child)) {
                    return true;
                }
            }

            return false;
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);

            for (const connection of this.children) {
                connection.child.destroy(effect, duration);
            }
        }

        protected reposition() {
            if (!this.parentConnection) return;

            const parent = this.parentConnection.parent;

            switch (this.parentConnection.anchor) {
                case HUDSpriteAnchor.Center:
                    this.x = parent.x + this.parentConnection.xOffset;
                    this.y = parent.y + this.parentConnection.yOffset;
                    break;
                case HUDSpriteAnchor.Left:
                    this.right = parent.left + this.parentConnection.xOffset;
                    this.y = parent.y + this.parentConnection.yOffset;
                    break;
                case HUDSpriteAnchor.Top:
                    this.x = parent.x + this.parentConnection.xOffset;
                    this.bottom = parent.top + this.parentConnection.yOffset;
                    break;
                case HUDSpriteAnchor.Right:
                    this.left = parent.right + this.parentConnection.xOffset;
                    this.y = parent.y + this.parentConnection.yOffset;
                    break;
                case HUDSpriteAnchor.Bottom:
                    this.x = parent.x + this.parentConnection.xOffset;
                    this.top = parent.bottom + this.parentConnection.yOffset;
                    break;
            }

            for (const connection of this.children) {
                connection.child.reposition();
            }
        }
    }

    class Connection {
        constructor(
            public parent: HUDSprite,
            public child: HUDSprite,
            public anchor: HUDSpriteAnchor,
            public xOffset: number,
            public yOffset: number
        ) {
        }
    }
}