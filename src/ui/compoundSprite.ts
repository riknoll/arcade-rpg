namespace rpg {
    export class _CompoundSprite extends sprites.ExtendableSprite {
        protected children: Sprite[];

        constructor(public root: Sprite) {
            super(img`.`, SpriteKind.rpg_UI);
            this.children = [];
            this.resposition();
        }

        addChild(child: Sprite, dx: number, dy: number) {
            child.data["$compound_dx"] = dx;
            child.data["$compound_dy"] = dy;
            child.setFlag(SpriteFlag.Ghost, true);
            this.children.push(child);
            this.resposition();
        }

        update(deltaTimeMillis: number): void {
            this.resposition();
            this.copyState(this.root);
            for (const child of this.children) {
                this.copyState(child);
            }
            this.root.z = this.z;
        }

        destroy(effect?: effects.ParticleEffect, duration?: number): void {
            super.destroy(effect, duration);
            this.update(0);
        }

        destroyChildren() {
            for (const child of this.children) {
                child.destroy();
            }
            this.children = [];
        }

        protected resposition() {
            let left = this.root.left;
            let top = this.root.top;
            let bottom = this.root.bottom;
            let right = this.root.right;

            for (const child of this.children) {
                const l = this.root.left + child.data["$compound_dx"];
                const t = this.root.top + child.data["$compound_dy"];

                left = Math.min(left, l);
                top = Math.min(top, t);
                right = Math.max(right, l + child.width);
                bottom = Math.max(bottom, t + child.height);
            }

            this.setDimensions(right - left, bottom - top);

            this.root.left = this.left + (this.root.left - left);
            this.root.top = this.top + (this.root.top - top);

            // console.log(`ROOT ${this.root.left} ${this.root.top}`)

            for (const child of this.children) {
                child.left = this.root.left + child.data["$compound_dx"];
                child.top = this.root.top + child.data["$compound_dy"];

                // console.log(`CHILD ${child.left} ${child.top}`)
            }
        }

        protected copyState(child: Sprite) {
            if (this.flags & sprites.Flag.Destroyed) {
                child.destroy();
                return;
            }
            child.z = this.z + 0.1;
            child.setFlag(SpriteFlag.RelativeToCamera, !!(this.flags & SpriteFlag.RelativeToCamera));
            child.setFlag(SpriteFlag.Invisible, !!(this.flags & SpriteFlag.Invisible));
        }
    }
}