namespace rpg.data {
    export function setNumber(entity: Entity, key: string, value: number) {
        setDataCore(entity, "num", key, value);
    }

    export function getNumber(entity: Entity, key: string): number {
        return getDataCore(entity, "num", key);
    }

    export function changeNumber(entity: Entity, key: string, delta: number): void {
        setNumber(entity, key, getNumber(entity, key) + delta);
    }

    export function setString(entity: Entity, key: string, value: string) {
        setDataCore(entity, "str", key, value);
    }

    export function getString(entity: Entity, key: string): string {
        return getDataCore(entity, "str", key);
    }

    export function setBoolean(entity: Entity, key: string, value: boolean) {
        setDataCore(entity, "bool", key, value);
    }

    export function getBoolean(entity: Entity, key: string): boolean {
        return getDataCore(entity, "bool", key);
    }

    export function setSprite(entity: Entity, key: string, value: Sprite) {
        setDataCore(entity, "spr", key, value);
    }

    export function getSprite(entity: Entity, key: string): Sprite {
        return getDataCore(entity, "spr", key);
    }

    export function setImage(entity: Entity, key: string, value: Image) {
        setDataCore(entity, "img", key, value);
    }

    export function getImage(entity: Entity, key: string): Image {
        return getDataCore(entity, "img", key);
    }

    export function setEntity(entity: Entity, key: string, value: Entity) {
        setDataCore(entity, "ent", key, value);
    }

    export function getEntity(entity: Entity, key: string): Entity {
        return getDataCore(entity, "ent", key);
    }

    export function setTilemap(entity: Entity, key: string, value: tiles.TileMapData) {
        setDataCore(entity, "tm", key, value);
    }

    export function getTilemap(entity: Entity, key: string): tiles.TileMapData {
        return getDataCore(entity, "tm", key);
    }

    export function setLocation(entity: Entity, key: string, value: tiles.Location) {
        setDataCore(entity, "loc", key, value);
    }

    export function getLocation(entity: Entity, key: string): tiles.Location {
        return getDataCore(entity, "loc", key);
    }

    function setDataCore(entity: Entity, prefix: string, field: string, value: any) {
        entity.data[prefix + field] = value;
    }

    function getDataCore(entity: Entity, prefix: string, field: string) {
        return entity.data[prefix + field];
    }
}