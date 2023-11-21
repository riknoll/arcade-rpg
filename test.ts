// function doPlayersTurn (name: string) {
//     rpg.dataSetBoolean(rpg.character(name), "defending", false)
//     rpg.closeAllMenus()
//     rpg.printToTextLog("It's " + name + "'s turn")
//     if (rpg.dataGetBoolean(rpg.character(name), "ollie")) {
//         rpg.dataSetBoolean(rpg.character(name), "ollie", false)
//         tempEnemy = rpg.character(rpg.dataGetString(rpg.character(name), "delayedTarget"))
//         if (rpg.isInParty(rpg.PartyType.Enemy, tempEnemy)) {
//             rpg.printToTextLog("" + name + " comes crashing down on " + rpg.dataGetString(rpg.character(name), "delayedTarget") + "!")
//             tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
//             rpg.dealDamageWith(rpg.character(name), rpg.getSkill(rpg.character(name), "Ollie"), tempEnemy)
//             rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
//             if (rpg.getValue(tempEnemy, rpg.EntityValue.Health) == 0) {
//                 rpg.printToTextLog("" + rpg.getName(tempEnemy) + " has perished! O7")
//                 rpg.removeFromPartyByName(rpg.PartyType.Enemy, rpg.getName(tempEnemy))
//             }
//         } else {
//             rpg.printToTextLog("" + name + " beefs it!")
//         }
//         rpg.setTextLogVisible(false)
//         return
//     }
//     if (rpg.dataGetBoolean(rpg.character(name), "shadowy")) {
//         rpg.dataChangeNumber(rpg.character(name), "shadowyTurns", -1)
//         if (rpg.dataGetNumber(rpg.character(name), "shadowyTurns") == 0) {
//             rpg.dataSetBoolean(rpg.character(name), "shadowy", false)
//             rpg.printToTextLog("" + name + " returns to the physical realm!")
//         }
//     }
//     rpg.setTextLogVisible(false)
//     rpg.showMenu(["Fight", "Skill", "Defend"], rpg.ScreenRegion.BottomLeft)
//     if (rpg.getMenuSelectionString() == "Skill") {
//         rpg.showSkillMenu(rpg.character(name), rpg.ScreenRegion.BottomRight)
//         tempSkill = rpg.getMenuSelection()
//         executeSkill(name, rpg.getName(tempSkill))
//     } else if (rpg.getMenuSelectionString() == "Fight") {
//         rpg.showEntityMenu(rpg.getParty(rpg.PartyType.Enemy), rpg.ScreenRegion.BottomRight)
//         tempEnemy = rpg.getMenuSelection()
//         rpg.closeAllMenus()
//         rpg.printToTextLog("" + name + " attacks " + rpg.getName(tempEnemy) + "!")
//         tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
//         rpg.dealDamage(rpg.character(name), tempEnemy)
//         rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
//         rpg.dataSetBoolean(rpg.character(name), "charging", false)
//         if (rpg.getValue(tempEnemy, rpg.EntityValue.Health) == 0) {
//             rpg.printToTextLog("" + rpg.getName(tempEnemy) + " has perished! O7")
//             rpg.removeFromPartyByName(rpg.PartyType.Enemy, rpg.getName(tempEnemy))
//         }
//     } else {
//         rpg.printToTextLog("" + name + " cowers!")
//         rpg.dataSetBoolean(rpg.character(name), "defending", true)
//     }
// }
// function createStrengthEquation (powerLevel: number) {
//     return rpg.binaryExpression(rpg.BinaryOperator.Max, 1, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.binaryExpression(rpg.BinaryOperator.Subtract, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), "attack"), powerLevel), rpg.binaryExpression(rpg.BinaryOperator.Divide, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defense"), rpg.statExpression(rpg.equipmentExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "armor"), "defense")), 2)), getModifiers()))
// }
// function getModifiers () {
//     return rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.ternaryExpression(rpg.entityBooleanDataExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "shadowy"), 0.5, 1), rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.ternaryExpression(rpg.entityBooleanDataExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defending"), 0.5, 1), rpg.ternaryExpression(rpg.entityBooleanDataExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), "charging"), 2.5, 1)))
// }
// function createEnemies () {
//     rpg.setStat(rpg.character("Crickosaur"), "attack", rpg.StatKind.GrowthRate, 3)
//     rpg.setStat(rpg.character("Crickosaur"), "defense", rpg.StatKind.GrowthRate, 2)
//     rpg.setStat(rpg.character("Crickosaur"), "speed", rpg.StatKind.GrowthRate, 2)
//     rpg.setStat(rpg.character("Crickosaur"), "magic", rpg.StatKind.GrowthRate, 1)
//     rpg.setStat(rpg.character("Crickosaur"), "max health", rpg.StatKind.GrowthRate, 2)
//     rpg.setDamageEquation(rpg.character("Crickosaur"), createStrengthEquation(0.5))
//     rpg.setStat(rpg.character("Groomba"), "attack", rpg.StatKind.GrowthRate, 1)
//     rpg.setStat(rpg.character("Groomba"), "defense", rpg.StatKind.GrowthRate, 1)
//     rpg.setStat(rpg.character("Groomba"), "speed", rpg.StatKind.GrowthRate, 1)
//     rpg.setStat(rpg.character("Groomba"), "magic", rpg.StatKind.GrowthRate, 5)
//     rpg.setStat(rpg.character("Groomba"), "max health", rpg.StatKind.GrowthRate, 10)
//     rpg.setDamageEquation(rpg.character("Groomba"), createMagicEquation(0.5, 5))
//     rpg.addToParty(rpg.character("Groomba"), rpg.PartyType.Enemy)
//     rpg.addToParty(rpg.character("Crickosaur"), rpg.PartyType.Enemy)
//     for (let value of rpg.getParty(rpg.PartyType.Enemy)) {
//         rpg.levelUp(value, 20)
//         rpg.setValue(value, rpg.EntityValue.Health, rpg.getStat(value, "max health", rpg.StatKind.Stat))
//     }
// }
// function executeSkill (character: string, skill: string) {
//     if (rpg.dataGetBoolean(rpg.skill(skill), "targetsEnemy")) {
//         rpg.showEntityMenu(rpg.getParty(rpg.PartyType.Enemy), rpg.ScreenRegion.BottomRight)
//         tempEnemy = rpg.getMenuSelection()
//     }
//     rpg.closeAllMenus()
//     if (rpg.dataGetBoolean(rpg.skill(skill), "damaging")) {
//         rpg.printToTextLog("" + character + " used " + skill + " on " + rpg.getName(tempEnemy) + "!")
//         tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
//         rpg.dealDamageWith(rpg.character(character), tempSkill, tempEnemy)
//         rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
//         rpg.dataSetBoolean(rpg.character(character), "charging", false)
//         if (rpg.getValue(tempEnemy, rpg.EntityValue.Health) == 0) {
//             rpg.printToTextLog("" + rpg.getName(tempEnemy) + " has perished! O7")
//             rpg.removeFromPartyByName(rpg.PartyType.Enemy, rpg.getName(tempEnemy))
//         }
//     } else if (rpg.skill(skill) == rpg.skill("Charge")) {
//         rpg.printToTextLog("" + character + " is charging up for the next attack!")
//         rpg.dataSetBoolean(rpg.character(character), "charging", true)
//     } else if (rpg.skill(skill) == rpg.skill("Karaoke")) {

//     } else if (rpg.skill(skill) == rpg.skill("Ollie")) {
//         rpg.printToTextLog("" + character + " ollies up high!")
//         rpg.dataSetBoolean(rpg.character(character), "ollie", true)
//         rpg.dataSetString(rpg.character(character), "delayedTarget", rpg.getName(tempEnemy))
//     } else if (rpg.skill(skill) == rpg.skill("Pet - Charm Enemy")) {
//         rpg.printToTextLog("" + character + " tries to charm " + rpg.getName(tempEnemy) + "!")
//         if (Math.percentChance(75)) {
//             rpg.dataSetBoolean(tempEnemy, "charmed", true)
//             rpg.printToTextLog("" + rpg.getName(tempEnemy) + " is feeling funny!")
//         } else {
//             rpg.printToTextLog("...but it failed to work")
//         }
//     } else if (rpg.skill(skill) == rpg.skill("Shadowy Form")) {
//         rpg.printToTextLog("" + character + " vanishes into the shadows!")
//         rpg.dataSetNumber(rpg.character(character), "shadowyTurns", 2)
//         rpg.dataSetBoolean(rpg.character(character), "shadowy", true)
//     } else {

//     }
// }
// function doEnemyTurn (name: string) {
//     rpg.closeAllMenus()
//     rpg.printToTextLog("It's " + name + "'s turn")
//     if (rpg.dataGetBoolean(rpg.character(name), "charmed")) {
//         rpg.printToTextLog("" + name + " is charmed!")
//         if (Math.percentChance(30)) {
//             rpg.printToTextLog(" ...but it wore off!")
//             rpg.dataSetBoolean(rpg.character(name), "charmed", false)
//         } else if (Math.percentChance(50)) {
//             rpg.printToTextLog("" + name + " is unwilling to attack!")
//             return
//         }
//     }
//     tempEnemy = rpg.getParty(rpg.PartyType.Player)._pickRandom()
//     rpg.printToTextLog("It attacks " + rpg.getName(tempEnemy) + " !")
//     if (rpg.dataGetBoolean(tempEnemy, "ollie")) {
//         rpg.printToTextLog("But " + rpg.getName(tempEnemy) + " is way up high!")
//     } else {
//         tempNumber = rpg.getValue(tempEnemy, rpg.EntityValue.Health)
//         rpg.dealDamage(rpg.character(name), tempEnemy)
//         rpg.printToTextLog("It did " + (tempNumber - rpg.getValue(tempEnemy, rpg.EntityValue.Health)) + " damage!")
//         if (rpg.getValue(tempEnemy, rpg.EntityValue.Health) == 0) {
//             rpg.printToTextLog("" + rpg.getName(tempEnemy) + " has perished! O7")
//             rpg.removeFromPartyByName(rpg.PartyType.Player, rpg.getName(tempEnemy))
//         }
//     }
// }
// function createMagicEquation (powerLevel: number, spellAttack: number) {
//     return rpg.binaryExpression(rpg.BinaryOperator.Max, 1, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.binaryExpression(rpg.BinaryOperator.Subtract, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.binaryExpression(rpg.BinaryOperator.Multiply, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), "magic"), 2), spellAttack), powerLevel), rpg.binaryExpression(rpg.BinaryOperator.Divide, rpg.binaryExpression(rpg.BinaryOperator.Add, rpg.statExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defense"), rpg.statExpression(rpg.equipmentExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "armor"), "magic defense")), 4)), rpg.ternaryExpression(rpg.entityBooleanDataExpression(rpg.participantExpression(rpg.ParticipantType.Defender), "defending"), 0.5, 1)))
// }
// function createParty () {
//     rpg.setStat(rpg.character("Joey"), "max health", rpg.StatKind.GrowthRate, 25)
//     rpg.setStat(rpg.character("Joey"), "attack", rpg.StatKind.GrowthRate, 40)
//     rpg.setStat(rpg.character("Joey"), "defense", rpg.StatKind.GrowthRate, 40)
//     rpg.setStat(rpg.character("Joey"), "speed", rpg.StatKind.GrowthRate, 40)
//     rpg.setStat(rpg.character("Joey"), "magic", rpg.StatKind.GrowthRate, 20)
//     rpg.setDamageEquation(rpg.character("Joey"), createStrengthEquation(1))
//     rpg.addSkill(rpg.character("Joey"), rpg.skill("Pet - Follow Up"))
//     rpg.setDamageEquation(rpg.skill("Pet - Follow Up"), createStrengthEquation(1.5))
//     rpg.addSkill(rpg.character("Joey"), rpg.skill("Pet - Charm Enemy"))
//     rpg.setEquipment(rpg.character("Joey"), "armor", rpg.equipment("Leather Doublet"))
//     rpg.setStat(rpg.equipment("Leather Doublet"), "defense", rpg.StatKind.Stat, 20)
//     rpg.setStat(rpg.equipment("Leather Doublet"), "magic defense", rpg.StatKind.Stat, 20)
//     rpg.setStat(rpg.character("Thomas"), "max health", rpg.StatKind.GrowthRate, 15)
//     rpg.setStat(rpg.character("Thomas"), "attack", rpg.StatKind.GrowthRate, 10)
//     rpg.setStat(rpg.character("Thomas"), "defense", rpg.StatKind.GrowthRate, 20)
//     rpg.setStat(rpg.character("Thomas"), "speed", rpg.StatKind.GrowthRate, 20)
//     rpg.setStat(rpg.character("Thomas"), "magic", rpg.StatKind.GrowthRate, 90)
//     rpg.setDamageEquation(rpg.character("Thomas"), createStrengthEquation(1))
//     rpg.addSkill(rpg.character("Thomas"), rpg.skill("Eldritch Storm"))
//     rpg.setDamageEquation(rpg.skill("Eldritch Storm"), createMagicEquation(2, 10))
//     rpg.addSkill(rpg.character("Thomas"), rpg.skill("Shadowy Form"))
//     rpg.setEquipment(rpg.character("Thomas"), "armor", rpg.equipment("Skull Robe"))
//     rpg.setStat(rpg.equipment("Skull Robe"), "defense", rpg.StatKind.Stat, 10)
//     rpg.setStat(rpg.character("Thomas"), "max health", rpg.StatKind.GrowthRate, 15)
//     rpg.setStat(rpg.equipment("Skull Robe"), "magic defense", rpg.StatKind.Stat, 30)
//     rpg.setStat(rpg.character("Richard"), "attack", rpg.StatKind.GrowthRate, 60)
//     rpg.setStat(rpg.character("Richard"), "max health", rpg.StatKind.GrowthRate, 80)
//     rpg.setStat(rpg.character("Richard"), "defense", rpg.StatKind.GrowthRate, 20)
//     rpg.setStat(rpg.character("Richard"), "speed", rpg.StatKind.GrowthRate, 80)
//     rpg.setStat(rpg.character("Richard"), "magic", rpg.StatKind.GrowthRate, 5)
//     rpg.addSkill(rpg.character("Richard"), rpg.skill("50 Punches"))
//     rpg.setDamageEquation(rpg.skill("50 Punches"), createStrengthEquation(2))
//     rpg.addSkill(rpg.character("Richard"), rpg.skill("Charge"))
//     rpg.setEquipment(rpg.character("Richard"), "armor", rpg.equipment("Torn Shirt"))
//     rpg.setDamageEquation(rpg.character("Richard"), createStrengthEquation(1))
//     rpg.setStat(rpg.equipment("Torn Shirt"), "defense", rpg.StatKind.Stat, 40)
//     rpg.setStat(rpg.equipment("Torn Shirt"), "magic defense", rpg.StatKind.Stat, 0)
//     rpg.setStat(rpg.character("Sarah"), "max health", rpg.StatKind.GrowthRate, 10)
//     rpg.setStat(rpg.character("Sarah"), "attack", rpg.StatKind.GrowthRate, 1)
//     rpg.setStat(rpg.character("Sarah"), "defense", rpg.StatKind.GrowthRate, 10)
//     rpg.setStat(rpg.character("Sarah"), "speed", rpg.StatKind.GrowthRate, 50)
//     rpg.setStat(rpg.character("Sarah"), "magic", rpg.StatKind.GrowthRate, 60)
//     rpg.addSkill(rpg.character("Sarah"), rpg.skill("Singing (Bad)"))
//     rpg.setDamageEquation(rpg.skill("Singing (Bad)"), createMagicEquation(2, 5))
//     rpg.addSkill(rpg.character("Sarah"), rpg.skill("Karaoke"))
//     rpg.setEquipment(rpg.character("Sarah"), "armor", rpg.equipment("Purple Coveralls"))
//     rpg.setDamageEquation(rpg.character("Sarah"), createStrengthEquation(1))
//     rpg.setStat(rpg.equipment("Purple Coveralls"), "defense", rpg.StatKind.Stat, 10)
//     rpg.setStat(rpg.equipment("Purple Coveralls"), "magic defense", rpg.StatKind.Stat, 30)
//     rpg.setStat(rpg.character("Ben"), "max health", rpg.StatKind.GrowthRate, 30)
//     rpg.setStat(rpg.character("Ben"), "attack", rpg.StatKind.GrowthRate, 40)
//     rpg.setStat(rpg.character("Ben"), "defense", rpg.StatKind.GrowthRate, 40)
//     rpg.setStat(rpg.character("Ben"), "speed", rpg.StatKind.GrowthRate, 60)
//     rpg.setStat(rpg.character("Ben"), "magic", rpg.StatKind.GrowthRate, 5)
//     rpg.addSkill(rpg.character("Ben"), rpg.skill("Shove-it"))
//     rpg.setDamageEquation(rpg.skill("Shove-it"), createStrengthEquation(1.8))
//     rpg.addSkill(rpg.character("Ben"), rpg.skill("Ollie"))
//     rpg.setDamageEquation(rpg.skill("Ollie"), createStrengthEquation(2))
//     rpg.setEquipment(rpg.character("Ben"), "armor", rpg.equipment("Skateboard"))
//     rpg.setStat(rpg.equipment("Skateboard"), "defense", rpg.StatKind.Stat, 25)
//     rpg.setStat(rpg.equipment("Skateboard"), "magic defense", rpg.StatKind.Stat, 15)
//     rpg.setDamageEquation(rpg.character("Ben"), createStrengthEquation(1))
//     rpg.addToParty(rpg.character("Joey"), rpg.PartyType.Player)
//     rpg.addToParty(rpg.character("Thomas"), rpg.PartyType.Player)
//     rpg.addToParty(rpg.character("Richard"), rpg.PartyType.Player)
//     rpg.addToParty(rpg.character("Sarah"), rpg.PartyType.Player)
//     rpg.addToParty(rpg.character("Ben"), rpg.PartyType.Player)
//     for (let value of rpg.getParty(rpg.PartyType.Player)) {
//         rpg.levelUp(value, 20)
//         rpg.setValue(value, rpg.EntityValue.Health, rpg.getStat(value, "max health", rpg.StatKind.Stat))
//     }
//     rpg.dataSetBoolean(rpg.skill("Pet - Charm Enemy"), "damaging", false)
//     rpg.dataSetBoolean(rpg.skill("Pet - Charm Enemy"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Pet - Follow Up"), "damaging", true)
//     rpg.dataSetBoolean(rpg.skill("Pet - Follow Up"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Eldritch Storm"), "damaging", true)
//     rpg.dataSetBoolean(rpg.skill("Eldritch Storm"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Shadowy Form"), "damaging", false)
//     rpg.dataSetBoolean(rpg.skill("Shadowy Form"), "targetsEnemy", false)
//     rpg.dataSetBoolean(rpg.skill("50 Punches"), "damaging", true)
//     rpg.dataSetBoolean(rpg.skill("50 Punches"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Charge"), "damaging", false)
//     rpg.dataSetBoolean(rpg.skill("Charge"), "targetsEnemy", false)
//     rpg.dataSetBoolean(rpg.skill("Singing (Bad)"), "damaging", true)
//     rpg.dataSetBoolean(rpg.skill("Singing (Bad)"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Karaoke"), "damaging", false)
//     rpg.dataSetBoolean(rpg.skill("Karaoke"), "targetsEnemy", false)
//     rpg.dataSetBoolean(rpg.skill("Ollie"), "damaging", false)
//     rpg.dataSetBoolean(rpg.skill("Ollie"), "targetsEnemy", true)
//     rpg.dataSetBoolean(rpg.skill("Shove-it"), "damaging", true)
//     rpg.dataSetBoolean(rpg.skill("Shove-it"), "targetsEnemy", true)
// }
// let tempSkill: rpg.Entity = null
// let tempNumber = 0
// let tempEnemy: rpg.Entity = null
// let myEntity = 0
// rpg.setTextLogTextColor(15)
// rpg.setMenuTextColor(15, 1)
// rpg.setTextLogFrame(img`
//     . . 1 1 1 1 1 1 1 1 1 1 1 . .
//     . 1 1 f f f f f f f f f 1 1 .
//     1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
//     . 1 1 f f f f f f f f f 1 1 .
//     . . 1 1 1 1 1 1 1 1 1 1 1 . .
//     `)
// rpg.setMenuFrame(img`
//     . . 1 1 1 1 1 1 1 1 1 1 1 . .
//     . 1 1 f f f f f f f f f 1 1 .
//     1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 f 1 1 1 1 1 1 1 1 1 1 1 f 1
//     1 1 f 1 1 1 1 1 1 1 1 1 f 1 1
//     . 1 1 f f f f f f f f f 1 1 .
//     . . 1 1 1 1 1 1 1 1 1 1 1 . .
//     `)
// rpg.setMenuMargin(4)
// createEnemies()
// createParty()
// forever(function () {
//     rpg.printToTextLog("The battle begins!")
//     for (let value2 of rpg.sortByStat(rpg.concat(rpg.getParty(rpg.PartyType.Player), rpg.getParty(rpg.PartyType.Enemy)), "speed")) {
//         if (rpg.getValue(value2, rpg.EntityValue.Health) == 0) {
//             continue;
//         }
//         if (rpg.isInParty(rpg.PartyType.Player, value2)) {
//             doPlayersTurn(rpg.getName(value2))
//         } else {
//             doEnemyTurn(rpg.getName(value2))
//         }
//     }
// })


// function createHUD() {
//     let top = 40;
//     let left = 5;
//     for (const p of rpg.getParty(rpg.PartyType.Player)) {
//         const s = rpg.createCounterSprite(3, 10)
//         rpg.setHUDSpriteEquation(s, p, rpg.entityValueExpression(rpg.participantExpression(rpg.ParticipantType.Attacker), rpg.EntityValue.Health));
//         s.top = top;
//         s.left = left;


//         const label = rpg.createLabelSprite(p.name.substr(0, 4), fancyText.defaultArcade, 1);
//         rpg.attachHUDSprite(label, s, rpg.HUDSpriteAnchor.Top, 0, -1)
//         // top += s.height + label.height + 2;
//         left += 30;
//     }
// }

// createHUD();