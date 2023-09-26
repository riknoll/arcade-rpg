namespace SpriteKind {
    export const rpg_UI = SpriteKind.create();
}

namespace rpg {
    export class _StateFactory<U> {
        protected stateStack: U[];

        constructor(create: () => U) {
            this.stateStack = [create()];

            game.addScenePushHandler(() => {
                this.stateStack.push(create());
            });

            game.addScenePopHandler(() => {
                this.stateStack.pop();
                if (this.stateStack.length === 0) {
                    this.stateStack.push(create());
                }
            });
        }

        state(): U {
            return this.stateStack[this.stateStack.length - 1];
        }
    }
}