function createStrengthEquation (powerLevel: number) {
    return rpg.binaryExpression(rpg.BinaryOperator.Subtract, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), "attack"), powerLevel), rpg.binaryExpression(rpg.BinaryOperator.Divide, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defense"), rpg.statExpression(rpg.equipmentExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "armor"), "defense")), 2))
}
function createEnemies () {
    rpg.setStat(rpg.character("Crickosaur"), "attack", rpg.StatKind.GrowthRate, 3)
    rpg.setStat(rpg.character("Crickosaur"), "defense", rpg.StatKind.GrowthRate, 2)
    rpg.setStat(rpg.character("Crickosaur"), "speed", rpg.StatKind.GrowthRate, 5)
    rpg.setStat(rpg.character("Crickosaur"), "magic", rpg.StatKind.GrowthRate, 1)
    rpg.setDamageEquation(rpg.character("Crickosaur"), createStrengthEquation(0.5))
    rpg.setValue(rpg.character("Crickosaur"), rpg.EntityValue.Health, 150)
    rpg.setStat(rpg.character("Groomba"), "attack", rpg.StatKind.GrowthRate, 4)
    rpg.setStat(rpg.character("Groomba"), "defense", rpg.StatKind.GrowthRate, 1)
    rpg.setStat(rpg.character("Groomba"), "speed", rpg.StatKind.GrowthRate, 1)
    rpg.setStat(rpg.character("Groomba"), "magic", rpg.StatKind.GrowthRate, 5)
    rpg.setDamageEquation(rpg.character("Groomba"), createMagicEquation(0.5, 5))
    rpg.setValue(rpg.character("Groomba"), rpg.EntityValue.Health, 1000)
    for (let index = 0; index < 28; index++) {
        rpg.levelUp(rpg.character("Crickosaur"))
        rpg.levelUp(rpg.character("Groomba"))
    }
    rpg.addToParty(rpg.character("Crickosaur"), rpg.PartyType.Enemy)
    rpg.addToParty(rpg.character("Groomba"), rpg.PartyType.Enemy)
}
function createMagicEquation (powerLevel: number, spellAttack: number) {
    return rpg.binaryExpression(rpg.BinaryOperator.Subtract, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), "magic"), 2), spellAttack), powerLevel), rpg.binaryExpression(rpg.BinaryOperator.Divide, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defense"), rpg.statExpression(rpg.equipmentExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "armor"), "magic defense")), 4))
}
function createParty () {
    rpg.setStat(rpg.character("Joey"), "attack", rpg.StatKind.Stat, 40)
    rpg.setStat(rpg.character("Joey"), "defense", rpg.StatKind.Stat, 40)
    rpg.setStat(rpg.character("Joey"), "speed", rpg.StatKind.Stat, 40)
    rpg.setStat(rpg.character("Joey"), "magic", rpg.StatKind.Stat, 20)
    rpg.setDamageEquation(rpg.character("Joey"), createStrengthEquation(0.5))
    rpg.addSkill(rpg.character("Joey"), rpg.skill("Pet - Follow Up"))
    rpg.setDamageEquation(rpg.skill("Pet - Follow Up"), createStrengthEquation(1.5))
    rpg.addSkill(rpg.character("Joey"), rpg.skill("Pet - Charm Enemy"))
    rpg.setDamageEquation(rpg.skill("Pet - Charm Enemy"), createMagicEquation(1, 5))
    rpg.setEquipment(rpg.character("Joey"), "armor", rpg.equipment("Leather Doublet"))
    rpg.setStat(rpg.equipment("Leather Doublet"), "defense", rpg.StatKind.Stat, 20)
    rpg.setStat(rpg.equipment("Leather Doublet"), "magic defense", rpg.StatKind.Stat, 20)
    rpg.setStat(rpg.character("Thomas"), "attack", rpg.StatKind.Stat, 10)
    rpg.setStat(rpg.character("Thomas"), "defense", rpg.StatKind.Stat, 20)
    rpg.setStat(rpg.character("Thomas"), "speed", rpg.StatKind.Stat, 20)
    rpg.setStat(rpg.character("Thomas"), "magic", rpg.StatKind.Stat, 90)
    rpg.setDamageEquation(rpg.character("Thomas"), createStrengthEquation(0.5))
    rpg.addSkill(rpg.character("Thomas"), rpg.skill("Eldritch Storm"))
    rpg.setDamageEquation(rpg.skill("Eldritch Storm"), createMagicEquation(2, 10))
    rpg.addSkill(rpg.character("Thomas"), rpg.skill("Shadowy Form"))
    rpg.setEquipment(rpg.character("Thomas"), "armor", rpg.equipment("Skull Robe"))
    rpg.setStat(rpg.equipment("Skull Robe"), "defense", rpg.StatKind.Stat, 10)
    rpg.setStat(rpg.equipment("Skull Robe"), "magic defense", rpg.StatKind.Stat, 30)
    rpg.setStat(rpg.character("Richard"), "attack", rpg.StatKind.Stat, 60)
    rpg.setStat(rpg.character("Richard"), "defense", rpg.StatKind.Stat, 20)
    rpg.setStat(rpg.character("Richard"), "speed", rpg.StatKind.Stat, 80)
    rpg.setStat(rpg.character("Richard"), "magic", rpg.StatKind.Stat, 5)
    rpg.addSkill(rpg.character("Richard"), rpg.skill("50 Punches"))
    rpg.setDamageEquation(rpg.skill("50 Punches"), createStrengthEquation(2))
    rpg.addSkill(rpg.character("Richard"), rpg.skill("Charge"))
    rpg.setEquipment(rpg.character("Richard"), "armor", rpg.equipment("Torn Shirt"))
    rpg.setStat(rpg.equipment("Torn Shirt"), "defense", rpg.StatKind.Stat, 40)
    rpg.setStat(rpg.equipment("Torn Shirt"), "magic defense", rpg.StatKind.Stat, 0)
    rpg.addToParty(rpg.character("Joey"), rpg.PartyType.Player)
    rpg.addToParty(rpg.character("Thomas"), rpg.PartyType.Player)
    rpg.addToParty(rpg.character("Richard"), rpg.PartyType.Player)
}
let tempNumber = 0
let tempEnemy: rpg.Entity = null
let tempSkill: rpg.Entity = null
createEnemies()
createParty()
forever(function () {
    rpg.setTextLogVisible(true)
    rpg.setTextLogTextColor(15)
    rpg.setMenuTextColor(15, 1)
    rpg.setTextLogFrame(img`
        . . 1 1 1 1 1 1 1 1 1 1 1 . .
        . 1 1 f f f f f f f f f 1 1 .
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
        . 1 1 f f f f f f f f f 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 . .
        `)
    rpg.setMenuFrame(img`
        . . 1 1 1 1 1 1 1 1 1 1 1 . .
        . 1 1 f f f f f f f f f 1 1 .
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
        1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
        . 1 1 f f f f f f f f f 1 1 .
        . . 1 1 1 1 1 1 1 1 1 1 1 . .
        `)
    rpg.printToTextLog("The battle begins!")
    pause(100)
    for (let value of rpg.getParty(rpg.PartyType.Player)) {
        rpg.printToTextLog("It's " + rpg.getName(value) + "'s turn")
        rpg.setTextLogVisible(false)
        rpg.showMenu([
        "Fight",
        "Skill",
        "Defend",
        "Run"
        ], rpg.ScreenRegion.Bottom)
        if (rpg.getMenuSelectionString() == "Skill") {
            rpg.showSkillMenu(value, rpg.ScreenRegion.Bottom)
            tempSkill = rpg.getMenuSelection()
            rpg.showEntityMenu(rpg.getParty(rpg.PartyType.Enemy), rpg.ScreenRegion.Bottom)
            tempEnemy = rpg.getMenuSelection()
            rpg.closeAllMenus()
            rpg.printToTextLog("" + rpg.getName(value) + " used " + rpg.getName(tempSkill) + " on " + rpg.getName(tempEnemy) + "!")
            tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
            rpg.dealDamageWith(value, tempSkill, tempEnemy)
            rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
        }
    }
    for (let value of rpg.getParty(rpg.PartyType.Enemy)) {
        rpg.printToTextLog("It's " + rpg.getName(value) + "'s turn")
        tempEnemy = rpg.getParty(rpg.PartyType.Player)._pickRandom()
        rpg.printToTextLog("" + rpg.getName(value) + " attacked " + rpg.getName(tempEnemy) + "!")
        tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
        rpg.dealDamage(value, tempEnemy)
        rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
    }
})
