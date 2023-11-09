namespace SpriteKind {
    //% isKind
    export const RPGHudSprite = SpriteKind.create();
}

namespace rpg {
    export enum HUDSpriteAnchor {
        //% block="center"
        Center,
        //% block="left"
        Left,
        //% block="top"
        Top,
        //% block="right"
        Right,
        //% block="bottom"
        Bottom
    }

    //% blockId=rpg_hud_attachHUDSprite
    //% block="attach $child to the $anchor of $parent||offset x $offsetX offset y $offsetY"
    //% child.shadow=variables_get
    //% child.defl=myHUDSprite
    //% parent.shadow=variables_get
    //% parent.defl=parentHUDSprite
    //% subcategory=HUD
    //% group=HUD
    //% weight=100
    //% blockGap=8
    export function attachHUDSprite(child: Sprite, parent: Sprite, anchor: HUDSpriteAnchor, offsetX = 0, offsetY = 0) {
        _assert(child instanceof rpg.hud.HUDSprite && parent instanceof rpg.hud.HUDSprite, "Both sprites passed to attach HUD sprite must be HUD sprites");

        (child as rpg.hud.HUDSprite).attachTo(parent as rpg.hud.HUDSprite, anchor, offsetX, offsetY);
    }

    //% blockId=rpg_hud_setHUDSpriteColor
    //% block="set HUD $sprite color to $color"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% color.shadow=colorindexpicker
    //% color.defl=1
    //% subcategory=HUD
    //% group=HUD
    //% weight=90
    //% blockGap=8
    export function setHUDSpriteColor(sprite: Sprite, color: number) {
        _assert(sprite instanceof rpg.hud.HUDSprite, "set color can only be called on HUD sprites");

        (sprite as rpg.hud.HUDSprite).setColor(color);
    }

    //% blockId=rpg_hud_setHUDSpriteEquation
    //% block="set numerical HUD $sprite equation to $equation on $entity"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% entity.shadow=rpg_character_character
    //% equation.shadow=rpg_equation_statExpression
    //% subcategory=HUD
    //% group=HUD
    //% weight=70
    //% blockGap=8
    export function setHUDSpriteEquation(sprite: Sprite, entity: Entity, equation: rpg.equation.ExpressionNode) {
        _assert(sprite instanceof rpg.hud.NumberSprite, "Equations can only be set on number sprites");

        (sprite as rpg.hud.NumberSprite).setEquation(entity, equation);
    }

    //% blockId=rpg_hud_setHUDSpriteNumericalValue
    //% block="set numerical HUD $sprite value to $value"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% subcategory=HUD
    //% group=HUD
    //% weight=60
    //% blockGap=8
    export function setHUDSpriteNumericalValue(sprite: Sprite, value: number) {
        _assert(sprite instanceof rpg.hud.NumberSprite, "Numerical values can only be set on number sprites");

        (sprite as rpg.hud.NumberSprite).setValue(value);
    }

    //% blockId=rpg_hud_createNumberTextSprite
    //% block="create number HUD with font $font color $color"
    //% blockSetVariable=myHUDSprite
    //% font.shadow=fancy_text__fontPicker
    //% color.shadow=colorindexpicker
    //% color.defl=1
    //% subcategory=HUD
    //% group=Number
    //% weight=90
    //% blockGap=8
    export function createNumberTextSprite(font: fancyText.BaseFont, color: number): Sprite {
        const sprite = new rpg.hud.NumberTextSprite(SpriteKind.RPGHudSprite);
        sprite.setFont(font)
        sprite.setColor(color);

        return sprite;
    }

    //% blockId=rpg_hud_createLabelSprite
    //% block="create label HUD with $text font $font color $color"
    //% blockSetVariable=myHUDSprite
    //% font.shadow=fancy_text__fontPicker
    //% color.shadow=colorindexpicker
    //% color.defl=1
    //% subcategory=HUD
    //% group=Static
    //% weight=100
    //% blockGap=8
    export function createLabelSprite(text: string, font: fancyText.BaseFont, color: number): Sprite {
        const sprite = new rpg.hud.LabelSprite(SpriteKind.RPGHudSprite);
        sprite.setText(text);
        sprite.setFont(font);
        sprite.setColor(color);

        return sprite;
    }

    //% blockId=rpg_hud_createRectangleSprite
    //% block="create rectangle HUD with width $width height $height color $color"
    //% blockSetVariable=myHUDSprite
    //% color.shadow=colorindexpicker
    //% color.defl=1
    //% subcategory=HUD
    //% group=Static
    //% weight=90
    //% blockGap=8
    export function createRectangleSprite(width: number, height: number, color: number): Sprite {
        const sprite = new rpg.hud.RectSprite(SpriteKind.RPGHudSprite);
        sprite.setColor(color);
        sprite.setDimensions(width, height);

        return sprite;
    }

    //% blockId=rpg_hud_createCounterSprite
    //% block="create counter HUD with $digits digits and scroll speed $scrollSpeed"
    //% blockSetVariable=myHUDSprite
    //% digits.defl=3
    //% scrollSpeed.defl=15
    //% subcategory=HUD
    //% group=Counter
    //% weight=100
    //% blockGap=8
    export function createCounterSprite(digits: number, scrollSpeed: number): Sprite {
        const sprite = new rpg.hud.CounterSprite(SpriteKind.RPGHudSprite);
        sprite.setDigits(digits)
        sprite.setScrollSpeed(scrollSpeed);

        return sprite;
    }

    //% blockId=rpg_hud_setCounterSpriteColors
    //% block="set counter HUD $sprite colors to text $fg bg $bg shade1 $bgShade1 shade2 $bgShade2"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% fg.shadow=colorindexpicker
    //% fg.defl=15
    //% bg.shadow=colorindexpicker
    //% bg.defl=1
    //% bgShade1.shadow=colorindexpicker
    //% bgShade1.defl=13
    //% bgShade2.shadow=colorindexpicker
    //% bgShade2.defl=11
    //% inlineInputMode=inline
    //% subcategory=HUD
    //% group=Counter
    //% weight=90
    //% blockGap=8
    export function setCounterSpriteColors(sprite: Sprite, fg: number, bg: number, bgShade1: number, bgShade2: number) {
        _assert(sprite instanceof rpg.hud.CounterSprite, "set counter sprite colors can only be called on a counter sprite");

        (sprite as rpg.hud.CounterSprite).setColors(fg, bg, bgShade1, bgShade2);
    }

    //% blockId=rpg_hud_counterSpriteJumpToValue
    //% block="counter HUD $sprite jump to current value"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% inlineInputMode=inline
    //% subcategory=HUD
    //% group=Counter
    //% weight=80
    //% blockGap=8
    export function counterSpriteJumpToValue(sprite: Sprite) {
        _assert(sprite instanceof rpg.hud.CounterSprite, "counter sprite jump to value can only be called on a counter sprite");

        (sprite as rpg.hud.CounterSprite).jumpToValue();
    }

    //% blockId=rpg_hud_createStatusBarSprite
    //% block="create status bar HUD with width $width height $height fill $fillColor background $backgroundColor||vertical $vertical"
    //% blockSetVariable=myHUDSprite
    //% height.defl=5
    //% width.defl=20
    //% fillColor.shadow=colorindexpicker
    //% fillColor.defl=7
    //% backgroundColor.shadow=colorindexpicker
    //% backgroundColor.defl=11
    //% inlineInputMode=inline
    //% subcategory=HUD
    //% group="Status Bar"
    //% weight=100
    //% blockGap=8
    export function createStatusBarSprite(width: number, height: number, fillColor: number, backgroundColor: number, vertical = false): Sprite {
        const sprite = new rpg.hud.BarSprite(SpriteKind.RPGHudSprite);
        sprite.setColors(fillColor, backgroundColor);
        sprite.setVertical(vertical);
        sprite.setDimensions(width, height);

        return sprite;
    }

    //% blockId=rpg_hud_setStatusBarMaxEquation
    //% block="set status bar HUD $sprite max equation to $equation on $entity"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% entity.shadow=rpg_character_character
    //% equation.shadow=rpg_equation_statExpression
    //% subcategory=HUD
    //% group="Status Bar"
    //% weight=70
    //% blockGap=8
    export function setStatusBarMaxEquation(sprite: Sprite, entity: Entity, equation: rpg.equation.ExpressionNode) {
        _assert(sprite instanceof rpg.hud.BarSprite, "Max equation can only be set on status bar sprites");

        (sprite as rpg.hud.BarSprite).setMaxEquation(entity, equation);
    }

    //% blockId=rpg_hud_setStatusBarMaxValue
    //% block="set status bar HUD $sprite max to $value"
    //% sprite.shadow=variables_get
    //% sprite.defl=myHUDSprite
    //% max.defl=100
    //% subcategory=HUD
    //% group="Status Bar"
    //% weight=60
    //% blockGap=8
    export function setStatusBarMaxValue(sprite: Sprite, value: number) {
        _assert(sprite instanceof rpg.hud.BarSprite, "Max value can only be set on status bar sprites");

        (sprite as rpg.hud.BarSprite).setMaxValue(value);
    }

    function _assert(condition: boolean, message: string) {
        if (!condition) {
            throw message;
        }
    }
}