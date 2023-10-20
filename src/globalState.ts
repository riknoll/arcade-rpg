namespace rpg {
    let _state: _StateFactory<_GlobalState>;

    export function _globalState() {
        if (!_state) {
            _state = new _StateFactory(() => new _GlobalState());
        }

        return _state.state();
    }

    export class _GlobalState {
        characters: EntityRegistry;
        skills: EntityRegistry;
        equipment: EntityRegistry;
        playerParty: EntityRegistry;
        enemyParty: EntityRegistry;
        items: EntityRegistry;

        constructor() {
            this.characters = new EntityRegistry();
            this.skills = new EntityRegistry();
            this.equipment = new EntityRegistry();
            this.playerParty = new EntityRegistry();
            this.enemyParty = new EntityRegistry();
            this.items = new EntityRegistry();
        }
    }
}