BB.monsterController = {
	preload : function()
	{
		BB.game.load.atlasJSONHash('monster', 'assets/monster.png', 'assets/monster.json');
	},

	create : function()
	{
	    var monster = BB.game.add.sprite(1200, 350, 'monster');
	    monster.anchor.set(1, 1);
	    monster.animations.add('attack', Phaser.Animation.generateFrameNames('monster_attack', 0, 34, '', 4), 22, true);
	    monster.animations.add('defeat', Phaser.Animation.generateFrameNames('monster_defeat', 0, 15, '', 4), 22, true);
	    monster.animations.add('hit', Phaser.Animation.generateFrameNames('monster_hit', 0, 14, '', 4), 22, true);
	    monster.animations.add('idle', Phaser.Animation.generateFrameNames('monster_idle', 0, 14, '', 4), 22, true);
	    monster.animations.add('win', Phaser.Animation.generateFrameNames('monster_win', 0, 9, '', 4), 22, true);

	    BB.game.currentMonster = monster;
	    BB.game.currentMonster.animations.play('idle');
	},

	hitCurrent : function()
	{
		BB.game.currentMonster.animations.play('hit', null, false);
	},

	addAllMonsters : function()
	{
		console.log("Monsters json:");
		console.log(BB.game.monsters_json);
	}


}
