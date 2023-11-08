namespace rpg {
    //% blockId=rpg_status_createStatus
    //% block="create status $name||with countdown $counter"
    //% blockSetVariable=myStatus
    //% name.shadow=rpg_statusNameShadow
    //% subcategory=Status
    //% group=Create
    //% weight=100
    //% blockGap=8
    export function createStatus(name: string, counter?: number): Status {
        const status = new Status(name);
        if (counter != undefined) {
            status.setCounter(counter);
        }

        return status;
    }

    //% blockId=rpg_status_cloneStatus
    //% block="clone $status"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% subcategory=Status
    //% group=Create
    //% weight=95
    export function cloneStatus(status: Status): Status {
        return status.clone();
    }

    //% blockId=rpg_status_addStatModifier
    //% block="$status add stat modifier $stat $operator $value"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% stat.shadow=rpg_statNameShadow
    //% inlineInputMode=inline
    //% subcategory=Status
    //% group=Create
    //% weight=90
    //% blockGap=8
    export function addStatModifier(status: Status, stat: string, operator: BinaryOperator, value: number) {
        status.addStatModifier(stat, operator, value);
    }

    //% blockId=rpg_status_addHealthModifier
    //% block="$status add health modifier $operator $value"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% subcategory=Status
    //% group=Create
    //% weight=80
    export function addHealthModfier(status: Status, operator: BinaryOperator, value: number) {
        status.addHealthModfier(operator, value);
    }

    //% blockId=rpg_status_setCountdown
    //% block="$status set countdown to $countdown"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% subcategory=Status
    //% group=Create
    //% weight=70
    //% blockGap=8
    export function setCountdown(status: Status, countdown: number) {
        status.setCounter(countdown);
    }

    //% blockId=rpg_status_setRemovalChance
    //% block="$status set removal chance to $value percent"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% subcategory=Status
    //% group=Create
    //% weight=60
    export function setRemovalChance(status: Status, chance: number) {
        status.setRemovalChance(chance);
    }

    //% blockId=rpg_status_applyStatus
    //% block="apply status $status to $target"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% target.shadow=rpg_character_character
    //% subcategory=Status
    //% group=Entity
    //% weight=100
    //% blockGap=8
    export function applyStatus(target: Entity, status: Status) {
        target.addStatus(status);
    }

    //% blockId=rpg_status_removeStatus
    //% block="remove status $status from $target"
    //% status.shadow=variables_get
    //% status.defl=myStatus
    //% target.shadow=rpg_character_character
    //% subcategory=Status
    //% group=Entity
    //% weight=90
    //% blockGap=8
    export function removeStatus(target: Entity, status: Status) {
        target.removeStatus(status);
    }

    //% blockId=rpg_status_removeStatusByName
    //% block="remove statuses with name $name from $target"
    //% name.shadow=rpg_statusNameShadow
    //% target.shadow=rpg_character_character
    //% subcategory=Status
    //% group=Entity
    //% weight=80
    //% blockGap=8
    export function removeStatusByName(target: Entity, name: string) {
        target.removeStatusByName(name);
    }

    //% blockId=rpg_status_advanceStatuses
    //% block="advance status countdowns on $target"
    //% target.shadow=rpg_character_character
    //% subcategory=Status
    //% group=Entity
    //% weight=70
    export function advanceStatuses(target: Entity) {
        target.advanceStatuses();
    }

    //% blockId=rpg_status_hasStatus
    //% block="$target has status with name $status"
    //% target.shadow=rpg_character_character
    //% name.shadow=rpg_statusNameShadow
    //% subcategory=Status
    //% group=Entity
    //% weight=60
    export function hasStatus(target: Entity, name: string): boolean {
        return target.hasStatus(name);
    }
}