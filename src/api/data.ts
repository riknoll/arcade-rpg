namespace rpg {
    //% blockId=rpg_data_dataSetNumber
    //% block="set $entity data $key to number $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataNumberKeyShadow
    //% subcategory=Data
    //% group=Number
    //% weight=100
    //% blockGap=8
    export function dataSetNumber(entity: Entity, key: string, value: number) {
        rpg.data.setNumber(entity, key, value);
    }

    //% blockId=rpg_data_dataChangeNumber
    //% block="change $entity data $key by number $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataNumberKeyShadow
    //% subcategory=Data
    //% group=Number
    //% weight=95
    //% blockGap=8
    export function dataChangeNumber(entity: Entity, key: string, value: number) {
        rpg.data.changeNumber(entity, key, value);
    }


    //% blockId=rpg_data_dataGetNumber
    //% block="$entity data $key as number"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataNumberKeyShadow
    //% subcategory=Data
    //% group=Number
    //% weight=90
    //% blockGap=8
    export function dataGetNumber(entity: Entity, key: string): number {
        return rpg.data.getNumber(entity, key);
    }

    //% blockId=rpg_data_dataSetString
    //% block="set $entity data $key to string $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataStringKeyShadow
    //% subcategory=Data
    //% group=String
    //% weight=100
    //% blockGap=8
    export function dataSetString(entity: Entity, key: string, value: string) {
        rpg.data.setString(entity, key, value);
    }

    //% blockId=rpg_data_dataGetString
    //% block="$entity data $key as string"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataStringKeyShadow
    //% subcategory=Data
    //% group=String
    //% weight=90
    //% blockGap=8
    export function dataGetString(entity: Entity, key: string): string {
        return rpg.data.getString(entity, key);
    }

    //% blockId=rpg_data_dataSetBoolean
    //% block="set $entity data $key to boolean $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataBooleanKeyShadow
    //% subcategory=Data
    //% group=Boolean
    //% weight=100
    //% blockGap=8
    export function dataSetBoolean(entity: Entity, key: string, value: boolean) {
        rpg.data.setBoolean(entity, key, value);
    }

    //% blockId=rpg_data_dataGetBoolean
    //% block="$entity data $key as boolean"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataBooleanKeyShadow
    //% subcategory=Data
    //% group=Boolean
    //% weight=90
    //% blockGap=8
    export function dataGetBoolean(entity: Entity, key: string): boolean {
        return rpg.data.getBoolean(entity, key);
    }

    //% blockId=rpg_data_dataSetImage
    //% block="set $entity data $key to image $value"
    //% entity.shadow=rpg_character_character
    //% value.shadow=screen_image_picker
    //% key.shadow=rpg_dataImageKeyShadow
    //% subcategory=Data
    //% group=Image
    //% weight=100
    //% blockGap=8
    export function dataSetImage(entity: Entity, key: string, value: Image) {
        rpg.data.setImage(entity, key, value);
    }

    //% blockId=rpg_data_dataGetImage
    //% block="$entity data $key as image"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataImageKeyShadow
    //% subcategory=Data
    //% group=Image
    //% weight=90
    //% blockGap=8
    export function dataGetImage(entity: Entity, key: string): Image {
        return rpg.data.getImage(entity, key);
    }

    //% blockId=rpg_data_dataSetLocation
    //% block="set $entity data $key to location $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataLocationKeyShadow
    //% value.shadow=mapgettile
    //% subcategory=Data
    //% group=Location
    //% weight=100
    //% blockGap=8
    export function dataSetLocation(entity: Entity, key: string, value: tiles.Location) {
        rpg.data.setLocation(entity, key, value);
    }

    //% blockId=rpg_data_dataGetLocation
    //% block="$entity data $key as location"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataLocationKeyShadow
    //% subcategory=Data
    //% group=Location
    //% weight=90
    //% blockGap=8
    export function dataGetLocation(entity: Entity, key: string): tiles.Location {
        return rpg.data.getLocation(entity, key);
    }

    //% blockId=rpg_data_dataSetSprite
    //% block="set $entity data $key to sprite $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataSpriteKeyShadow
    //% subcategory=Data
    //% group=Sprite
    //% weight=100
    //% blockGap=8
    export function dataSetSprite(entity: Entity, key: string, value: Sprite) {
        rpg.data.setSprite(entity, key, value);
    }

    //% blockId=rpg_data_dataGetSprite
    //% block="$entity data $key as sprite"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataSpriteKeyShadow
    //% subcategory=Data
    //% group=Sprite
    //% weight=90
    //% blockGap=8
    export function dataGetSprite(entity: Entity, key: string): Sprite {
        return rpg.data.getSprite(entity, key);
    }

    //% blockId=rpg_data_dataSetEntity
    //% block="set $entity data $key to entity $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataEntityKeyShadow
    //% subcategory=Data
    //% group=Entity
    //% weight=100
    //% blockGap=8
    export function dataSetEntity(entity: Entity, key: string, value: Entity) {
        rpg.data.setEntity(entity, key, value);
    }

    //% blockId=rpg_data_dataGetEntity
    //% block="$entity data $key as entity"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataEntityKeyShadow
    //% subcategory=Data
    //% group=Entity
    //% weight=90
    //% blockGap=8
    export function dataGetEntity(entity: Entity, key: string): Entity {
        return rpg.data.getEntity(entity, key);
    }

    //% blockId=rpg_data_dataSetTilemap
    //% block="set $entity data $key to tilemap $value"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataTilemapKeyShadow
    //% subcategory=Data
    //% group=Tilemap
    //% weight=100
    //% blockGap=8
    export function dataSetTilemap(entity: Entity, key: string, value: tiles.TileMapData) {
        rpg.data.setTilemap(entity, key, value);
    }

    //% blockId=rpg_data_dataGetTilemap
    //% block="$entity data $key as tilemap"
    //% entity.shadow=rpg_character_character
    //% key.shadow=rpg_dataTilemapKeyShadow
    //% subcategory=Data
    //% group=Tilemap
    //% weight=90
    //% blockGap=8
    export function dataGetTilemap(entity: Entity, key: string): tiles.TileMapData {
        return rpg.data.getTilemap(entity, key);
    }
}