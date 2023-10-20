namespace rpg.equation {
    export enum ExpressionNodeKind {
        BinaryExpression,
        UnaryExpression,
        Literal,
        Stat,
        EntityValue,
        RandomRange,
        TernaryExpression,
        NumberData
    }

    export enum LogicalExpressionNodeKind {
        ComparisonExpression,
        BinaryLogicExpression,
        NotExpression,
        BooleanData
    }

    export enum EntityExpressionNodeKind {
        Participant,
        Equipment,
        EntityData
    }

    export class ExpressionNode {
        constructor(public kind: ExpressionNodeKind) {
        }
    }

    export class BinaryExpression extends ExpressionNode {
        constructor(public op: BinaryOperator, public left: ExpressionNode, public right: ExpressionNode) {
            super(ExpressionNodeKind.BinaryExpression);
        }
    }

    export class UnaryExpression extends ExpressionNode {
        constructor(public op: UnaryOperator, public expr: ExpressionNode) {
            super(ExpressionNodeKind.UnaryExpression);
        }
    }

    export class LiteralNode extends ExpressionNode {
        constructor(public value: number) {
            super(ExpressionNodeKind.Literal);
        }
    }

    export class StatNode extends ExpressionNode {
        constructor(public owner: EntityExpressionNode, public statKind: string) {
            super(ExpressionNodeKind.Stat);
        }
    }

    export class EntityValueNode extends ExpressionNode {
        constructor(public owner: EntityExpressionNode, public value: EntityValue) {
            super(ExpressionNodeKind.EntityValue);
        }
    }

    export class RandomRangeNode extends ExpressionNode {
        constructor(public min: ExpressionNode, public max: ExpressionNode) {
            super(ExpressionNodeKind.RandomRange);
        }
    }

    export class NumberDataNode extends ExpressionNode {
        constructor(public owner: EntityExpressionNode, public key: string) {
            super(ExpressionNodeKind.NumberData);
        }
    }

    export class TernaryExpression extends ExpressionNode {
        constructor(public condition: LogicalExpressionNode, public ifTrue: ExpressionNode, public ifFalse: ExpressionNode) {
            super(ExpressionNodeKind.TernaryExpression);
        }
    }

    export class LogicalExpressionNode {
        constructor(public kind: LogicalExpressionNodeKind) {
        }
    }

    export class ComparisonExpression extends LogicalExpressionNode {
        constructor(public op: ComparisonOperator, public left: ExpressionNode, public right: ExpressionNode) {
            super(LogicalExpressionNodeKind.ComparisonExpression);
        }
    }

    export class NotExpression extends LogicalExpressionNode {
        constructor(public expr: LogicalExpressionNode) {
            super(LogicalExpressionNodeKind.NotExpression);
        }
    }

    export class BinaryLogicExpression extends LogicalExpressionNode {
        constructor(public op: BinaryLogicOperator, public left: LogicalExpressionNode, public right: LogicalExpressionNode) {
            super(LogicalExpressionNodeKind.BinaryLogicExpression);
        }
    }

    export class BooleanDataExpression extends LogicalExpressionNode {
        constructor(public owner: EntityExpressionNode, public key: string) {
            super(LogicalExpressionNodeKind.BooleanData);
        }
    }

    export class EntityExpressionNode {
        constructor(public kind: EntityExpressionNodeKind) {
        }
    }

    export class ParticipantExpression extends EntityExpressionNode {
        constructor(public owner: ParticipantType) {
            super(EntityExpressionNodeKind.Participant);
        }
    }

    export class EquipmentExpression extends EntityExpressionNode {
        constructor(public owner: ParticipantType, public equipSlot: string) {
            super(EntityExpressionNodeKind.Equipment);
        }
    }

    export class EntityDataExpression extends EntityExpressionNode {
        constructor(public owner: EntityExpressionNode, public key: string) {
            super(EntityExpressionNodeKind.EntityData);
        }
    }

    export function evaluateDamageExpression(expr: ExpressionNode, defender: Entity, damageSource: Entity, attacker?: Entity): number {
        switch (expr.kind) {
            case ExpressionNodeKind.Literal:
                return (expr as LiteralNode).value;
            case ExpressionNodeKind.Stat:
                const owner = evaluateEntityExpression((expr as StatNode).owner, defender, damageSource, attacker);
                if (!owner) {
                    return 0;
                }
                return owner.stats.getStat((expr as StatNode).statKind);
            case ExpressionNodeKind.EntityValue:
                const eOwner = evaluateEntityExpression((expr as EntityValueNode).owner, defender, damageSource, attacker);
                if (!eOwner) {
                    return 0;
                }
                if ((expr as EntityValueNode).value === EntityValue.Health) {
                    return eOwner.health;
                }
                else {
                    return eOwner.level;
                }
            case ExpressionNodeKind.BinaryExpression:
                const bexpr = expr as BinaryExpression;
                const left = evaluateDamageExpression(bexpr.left, defender, damageSource, attacker);
                const right = evaluateDamageExpression(bexpr.right, defender, damageSource, attacker);
                switch ((expr as BinaryExpression).op) {
                    case BinaryOperator.Add:
                        return left + right;
                    case BinaryOperator.Subtract:
                        return left - right;
                    case BinaryOperator.Divide:
                        return left / right;
                    case BinaryOperator.Multiply:
                        return left * right;
                    case BinaryOperator.Exponent:
                        return left ** right;
                }
            case ExpressionNodeKind.UnaryExpression:
                const val = evaluateDamageExpression((expr as UnaryExpression).expr, defender, damageSource, attacker)
                switch ((expr as UnaryExpression).op) {
                    case UnaryOperator.SquareRoot:
                        return Math.sqrt(val);
                    case UnaryOperator.Floor:
                        return Math.floor(val);
                    case UnaryOperator.Ceiling:
                        return Math.ceil(val);
                    case UnaryOperator.Round:
                        return Math.round(val);
                }
            case ExpressionNodeKind.RandomRange:
                return Math.randomRange(
                    evaluateDamageExpression((expr as RandomRangeNode).min, defender, damageSource, attacker),
                    evaluateDamageExpression((expr as RandomRangeNode).max, defender, damageSource, attacker)
                );
            case ExpressionNodeKind.TernaryExpression:
                const texpr = expr as TernaryExpression;
                if (evaluateLogicExpression(texpr.condition, defender, damageSource, attacker)) {
                    return evaluateDamageExpression(texpr.ifTrue, defender, damageSource, attacker);
                }
                else {
                    return evaluateDamageExpression(texpr.ifFalse, defender, damageSource, attacker);
                }
            case ExpressionNodeKind.NumberData:
                const dOwner = evaluateEntityExpression((expr as NumberDataNode).owner, defender, damageSource, attacker);
                if (!dOwner) {
                    return 0;
                }
                return rpg.data.getNumber(dOwner, (expr as NumberDataNode).key) || 0;
        }

        return 0;
    }

    export function evaluateLogicExpression(expr: LogicalExpressionNode, defender: Entity, damageSource: Entity, attacker?: Entity): boolean {
        switch (expr.kind) {
            case LogicalExpressionNodeKind.BinaryLogicExpression:
                if ((expr as BinaryLogicExpression).op === BinaryLogicOperator.And) {
                    return evaluateLogicExpression((expr as BinaryLogicExpression).left, defender, damageSource, attacker) &&
                        evaluateLogicExpression((expr as BinaryLogicExpression).right, defender, damageSource, attacker);
                }
                else {
                    return evaluateLogicExpression((expr as BinaryLogicExpression).left, defender, damageSource, attacker) ||
                        evaluateLogicExpression((expr as BinaryLogicExpression).right, defender, damageSource, attacker);
                }
            case LogicalExpressionNodeKind.NotExpression:
                return !evaluateLogicExpression((expr as NotExpression).expr, defender, damageSource, attacker);
            case LogicalExpressionNodeKind.ComparisonExpression:
                const comp = expr as ComparisonExpression;
                const leftValue = evaluateDamageExpression(comp.left, defender, damageSource, attacker);
                const rightValue = evaluateDamageExpression(comp.right, defender, damageSource, attacker);

                switch (comp.op) {
                    case ComparisonOperator.Equals:
                        return leftValue == rightValue;
                    case ComparisonOperator.NotEquals:
                        return leftValue != rightValue;
                    case ComparisonOperator.GreaterThan:
                        return leftValue > rightValue;
                    case ComparisonOperator.GreaterThanEquals:
                        return leftValue >= rightValue;
                    case ComparisonOperator.LessThan:
                        return leftValue < rightValue;
                    case ComparisonOperator.LessThanEquals:
                        return leftValue <= rightValue;
                }
            case LogicalExpressionNodeKind.BooleanData:
                const dOwner = evaluateEntityExpression((expr as BooleanDataExpression).owner, defender, damageSource, attacker);
                if (!dOwner) {
                    return false;
                }
                return !!rpg.data.getBoolean(dOwner, (expr as BooleanDataExpression).key);
        }

        return false;
    }

    export function evaluateEntityExpression(expr: EntityExpressionNode, defender: Entity, damageSource: Entity, attacker?: Entity): Entity {
        switch (expr.kind) {
            case EntityExpressionNodeKind.Participant:
                return getStatOwner((expr as ParticipantExpression).owner, defender, damageSource, attacker);
            case EntityExpressionNodeKind.Equipment:
                const owner = getStatOwner((expr as EquipmentExpression).owner, defender, damageSource, attacker);
                if (owner) {
                    _assertCharacter(owner, "evaluateEntityExpression");
                    return (owner as Character).equipment.getEquip((expr as EquipmentExpression).equipSlot);
                }
                break;
            case EntityExpressionNodeKind.EntityData:
                const ownerEntity = evaluateEntityExpression((expr as EntityDataExpression).owner, defender, damageSource, attacker);

                if (ownerEntity) {
                    return rpg.data.getEntity(ownerEntity, (expr as EntityDataExpression).key);
                }
                break;
        }

        return undefined;
    }

    export function wrapNode(node: rpg.equation.ExpressionNode | number): rpg.equation.ExpressionNode {
        if (typeof node === "number") {
            return new rpg.equation.LiteralNode(node);
        }
        return node;
    }

    function getStatOwner(kind: ParticipantType, defender: Entity, damageSource: Entity, attacker?: Entity) {
        switch (kind) {
            case ParticipantType.Attacker: return attacker;
            case ParticipantType.Defender: return defender;
            case ParticipantType.DamageSource: return damageSource;
        }
    }
}