const e = new rpg.Entity();

e.stats.setStat("Attack", 100);
e.stats.setStat("Defense", 56);
e.stats.setStat("Agility", 23);
e.stats.setStat("Tech", 17);
e.stats.setStat("Luck", 233);


rpg.showDisplay(e, rpg.ScreenRegion.BottomRight, rpg.DisplayType.Stats)

rpg.ui._state().setFrame(img`
. 1 1 1 1 1 1 1 .
1 1 f f f f f 1 1
1 f 1 1 1 1 1 f 1
1 f 1 1 1 1 1 f 1
1 f 1 1 1 1 1 f 1
1 f 1 1 1 1 1 f 1
1 f 1 1 1 1 1 f 1
1 1 f f f f f 1 1
. 1 1 1 1 1 1 1 .
`)

rpg.ui.log.setTextColor(0xf)
control.runInParallel(() => {
    rpg.ui.log.setVisible(true);
    rpg.ui.log.print("Ness used PSI Freeze!")
    rpg.ui.log.print("SMMMMMAAAASSSSSHHHHH!!!")
    rpg.ui.log.setVisible(false);
})