namespace rpg {
    export enum BinaryOperator {
        //% block="+"
        Add,
        //% block="-"
        Subtract,
        //% block="*"
        Multiply,
        //% block="/"
        Divide,
        //% block="**"
        Exponent
    }

    export enum ComparisonOperator {
        //% block="=="
        Equals,
        //% block="≠"
        NotEquals,
        //% block="<"
        LessThan,
        //% block="≤"
        LessThanEquals,
        //% block=">"
        GreaterThan,
        //% block="≥"
        GreaterThanEquals
    }

    export enum BinaryLogicOperator {
        //% block="and"
        And,
        //% block="or"
        Or,
    }

    export enum ParticipantType {
        //% block="attacker"
        Attacker,
        //% block="defender"
        Defender,
        //% block="damage source"
        DamageSource
    }

    export enum EntityValue {
        //% block="level"
        Level,
        //% block="health"
        Health
    }

    export enum UnaryOperator {
        //% block="square root"
        SquareRoot,
        //% block="floor"
        Floor,
        //% block="round"
        Round,
        //% block="ceiling"
        Ceiling,
    }

    //% blockId=rpg_equation_binaryExpression
    //% block="$left $op $right"
    //% left.shadow=math_number
    //% right.shadow=math_number
    //% subcategory=Equation
    //% group=Math
    //% weight=100
    export function binaryExpression(op: BinaryOperator, left: rpg.equation.ExpressionNode | number, right: rpg.equation.ExpressionNode | number): rpg.equation.ExpressionNode {
        return new rpg.equation.BinaryExpression(op, rpg.equation.wrapNode(left), rpg.equation.wrapNode(right));
    }

    //% blockId=rpg_equation_unaryExpression
    //% block="$op $expr"
    //% expr.shadow=math_number
    //% subcategory=Equation
    //% group=Math
    //% weight=90
    export function unaryExpression(op: UnaryOperator, expr: rpg.equation.ExpressionNode | number): rpg.equation.ExpressionNode {
        return new rpg.equation.UnaryExpression(op, rpg.equation.wrapNode(expr));
    }

    //% blockId=rpg_equation_randomRangeExpression
    //% block="random number between $min and $max"
    //% min.shadow=math_number
    //% max.shadow=math_number
    //% subcategory=Equation
    //% group=Math
    //% weight=80
    export function randomRangeExpression(min: rpg.equation.ExpressionNode | number, max: rpg.equation.ExpressionNode | number): rpg.equation.ExpressionNode {
        return new rpg.equation.RandomRangeNode(rpg.equation.wrapNode(min), rpg.equation.wrapNode(max));
    }

    //% blockId=rpg_equation_statExpression
    //% block="$owner stat $stat"
    //% owner.shadow=rpg_equation_participantExpression
    //% stat.shadow=rpg_statNameShadow
    //% subcategory=Equation
    //% group=Entity
    //% weight=100
    export function statExpression(owner: rpg.equation.EntityExpressionNode, stat: string): rpg.equation.ExpressionNode {
        return new rpg.equation.StatNode(owner, stat);
    }

    //% blockId=rpg_equation_entityValueExpression
    //% block="$owner $kind"
    //% owner.shadow=rpg_equation_participantExpression
    //% subcategory=Equation
    //% group=Entity
    //% weight=90
    export function entityValueExpression(owner: rpg.equation.EntityExpressionNode, kind: EntityValue): rpg.equation.ExpressionNode {
        return new rpg.equation.EntityValueNode(owner, kind);
    }

    //% blockId=rpg_equation_entityNumberDataExpression
    //% block="$owner data $key as number"
    //% owner.shadow=rpg_equation_participantExpression
    //% key.shadow=rpg_dataNumberKeyShadow
    //% subcategory=Equation
    //% group=Entity
    //% weight=80
    export function entityNumberDataExpression(owner: rpg.equation.EntityExpressionNode, key: string): rpg.equation.ExpressionNode {
        return new rpg.equation.NumberDataNode(owner, key);
    }

    //% blockId=rpg_equation_participantExpression
    //% block="$owner"
    //% subcategory=Equation
    //% group=Entity
    //% weight=70
    export function participantExpression(owner: ParticipantType): rpg.equation.EntityExpressionNode {
        return new rpg.equation.ParticipantExpression(owner);
    }

    //% blockId=rpg_equation_equipmentExpression
    //% block="$owner equipment $equipSlot"
    //% owner.shadow=rpg_equation_participantExpression
    //% equipSlot.shadow=rpg_equipmentSlotNameShadow
    //% subcategory=Equation
    //% group=Entity
    //% weight=60
    export function equipmentExpression(owner: rpg.equation.EntityExpressionNode, equipSlot: string): rpg.equation.EntityExpressionNode {
        return new rpg.equation.EquipmentExpression(owner, equipSlot);
    }

    //% blockId=rpg_equation_entityEntityDataExpression
    //% block="$owner data $key as entity"
    //% owner.shadow=rpg_equation_participantExpression
    //% key.shadow=rpg_dataEntityKeyShadow
    //% subcategory=Equation
    //% group=Entity
    //% weight=50
    export function entityEntityDataExpression(owner: rpg.equation.EntityExpressionNode, key: string): rpg.equation.EntityExpressionNode {
        return new rpg.equation.EntityDataExpression(owner, key);
    }

    //% blockId=rpg_equation_ternaryExpression
    //% block="if $condition then $ifTrue else $ifFalse"
    //% ifTrue.shadow=math_number
    //% ifFalse.shadow=math_number
    //% condition.shadow=rpg_equation_comparisonExpression
    //% subcategory=Equation
    //% group=Logic
    //% weight=100
    export function ternaryExpression(condition: rpg.equation.LogicalExpressionNode, ifTrue: rpg.equation.ExpressionNode | number, ifFalse: rpg.equation.ExpressionNode | number): rpg.equation.ExpressionNode {
        return new rpg.equation.TernaryExpression(condition, rpg.equation.wrapNode(ifTrue), rpg.equation.wrapNode(ifFalse));
    }

    //% blockId=rpg_equation_comparisonExpression
    //% block="$left $op $right"
    //% left.shadow=math_number
    //% right.shadow=math_number
    //% subcategory=Equation
    //% group=Logic
    //% weight=90
    export function comparisonExpression(op: ComparisonOperator, left: rpg.equation.ExpressionNode | number, right: rpg.equation.ExpressionNode | number): rpg.equation.LogicalExpressionNode {
        return new rpg.equation.ComparisonExpression(op, rpg.equation.wrapNode(left), rpg.equation.wrapNode(right));
    }

    //% blockId=rpg_equation_binaryLogicExpression
    //% block="$left $op $right"
    //% left.shadow=rpg_equation_comparisonExpression
    //% right.shadow=rpg_equation_comparisonExpression
    //% subcategory=Equation
    //% group=Logic
    //% weight=80
    export function binaryLogicExpression(op: BinaryLogicOperator, left: rpg.equation.LogicalExpressionNode, right: rpg.equation.LogicalExpressionNode): rpg.equation.LogicalExpressionNode {
        return new rpg.equation.BinaryLogicExpression(op, left, right);
    }

    //% blockId=rpg_equation_notExpression
    //% block="not $expr"
    //% expr.shadow=rpg_equation_comparisonExpression
    //% subcategory=Equation
    //% group=Logic
    //% weight=70
    export function notExpression(expr: rpg.equation.LogicalExpressionNode): rpg.equation.LogicalExpressionNode {
        return new rpg.equation.NotExpression(expr);
    }

    //% blockId=rpg_equation_entityBooleanDataExpression
    //% block="$owner data $key as boolean"
    //% owner.shadow=rpg_equation_participantExpression
    //% key.shadow=rpg_dataBooleanKeyShadow
    //% subcategory=Equation
    //% group=Logic
    //% weight=60
    export function entityBooleanDataExpression(owner: rpg.equation.EntityExpressionNode, key: string): rpg.equation.LogicalExpressionNode {
        return new rpg.equation.BooleanDataExpression(owner, key);
    }
}