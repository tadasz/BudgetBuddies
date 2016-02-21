BB.monsterController = {
	preload : function()
	{
		BB.game.load.atlasJSONHash('monster', 'assets/monster.png', 'assets/monster.json');
		BB.game.load.atlasJSONHash('monster_small', 'assets/monster.png', 'assets/monster.json');
	    BB.game.load.image('level_buttons_small', '/assets/levelButtons0001.png');
	    BB.game.load.image('level_buttons_big', '/assets/levelButtons0002.png');
	},

	create : function()
	{
	    var monster = BB.game.add.sprite(1200, 350, 'monster');
	    monster.anchor.set(1, 1);
	    monster.animations.add('attack', Phaser.Animation.generateFrameNames('monster_attack', 0, 34, '', 4), 22, true);
	    monster.animations.add('defeat', Phaser.Animation.generateFrameNames('monster_defeat', 0, 22, '', 4), 22, true);
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
		console.log("Monsters!:");
		console.log(BB.game.monsters_json);
	},

	addSmallMonsters : function()
	{
		BB.game.small_buttons_before = [];
		BB.game.small_monsters_before = [];
		//add monsters before
		for (var i = 0; i < 5; i++) {
			var small_button = BB.game.add.sprite(100, 370, 'level_buttons_small');
			small_button.anchor.set(0.5, 1);
			BB.game.small_buttons_before.push(small_button);

			var small_monster = BB.game.add.sprite(100, 340, 'monster_small');
			small_monster.anchor.set(0.5, 1);
			small_monster.scale.x = 0.4;
			small_monster.scale.y = 0.4;
			var dead_monsters = [1, 3, 4]

			if (dead_monsters.indexOf(i) != -1)
			{
				small_monster.animations.add('dead', ['monster_dead0000'], 22, false);
				small_monster.animations.play('dead')
				small_monster.y = 350;
			}

			BB.game.small_monsters_before.push(small_monster);


		}

		BB.game.small_buttons_after = [];
		BB.game.small_monsters_after = [];
		//add monsters before
		for (var i = 0; i < 4; i++) {
			var small_button = BB.game.add.sprite(100, 370, 'level_buttons_small');
			small_button.anchor.set(0.5, 1);
			BB.game.small_buttons_after.push(small_button);

			var small_monster = BB.game.add.sprite(100, 340, 'monster_small');
			small_monster.anchor.set(0.5, 1);
			small_monster.scale.x = 0.4;
			small_monster.scale.y = 0.4;
			BB.game.small_monsters_after.push(small_monster);

		}
	}

}
