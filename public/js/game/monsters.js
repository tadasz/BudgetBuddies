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
	    monster.animations.add('attack', Phaser.Animation.generateFrameNames('monster_attack', 0, 34, '', 4), 22, false);
	    monster.animations.add('defeat', Phaser.Animation.generateFrameNames('monster_defeat', 0, 22, '', 4), 22, false);
	    monster.animations.add('hit', Phaser.Animation.generateFrameNames('monster_hit', 0, 14, '', 4), 22, false);
	    monster.animations.add('idle', Phaser.Animation.generateFrameNames('monster_idle', 0, 14, '', 4), 22, true);
	    monster.animations.add('win', Phaser.Animation.generateFrameNames('monster_win', 0, 9, '', 4), 22, false);

	    BB.game.currentMonster = monster;
	    BB.game.currentMonster.animations.play('idle');
	},

	hitCurrent : function()
	{
		BB.game.currentMonster.animations.play('hit', null, false);
        BB.game.currentMonster.animations.currentAnim.onComplete.add(function () {
		    BB.game.currentMonster.animations.play('idle');

		});

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
			small_monster.alive = true;
			var dead_monsters = [1, 3, 4]

			if (dead_monsters.indexOf(i) != -1)
			{
				small_monster.animations.add('dead', ['monster_dead0000'], 22, false);
				small_monster.animations.play('dead')
				small_monster.y = 350;
				small_monster.alive = false;
			}

			BB.game.physics.enable(small_monster, Phaser.Physics.ARCADE);
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
			BB.game.physics.enable(small_monster, Phaser.Physics.ARCADE);
			BB.game.small_monsters_after.push(small_monster);

		}
	},

	addPopup: function(x, y, alive) {
		var drawnObject;
		var width = 200 // example;
		var height = 100 // example;
		var shd = 3;
		var bmd = BB.game.add.bitmapData(width, height);

		bmd.ctx.beginPath();
		bmd.ctx.rect(shd, shd, width, height);
		bmd.ctx.fillStyle = '#0a0a0a';
		bmd.ctx.fill();
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, width-shd, height-shd);
		bmd.ctx.fillStyle = '#ffffff';
		bmd.ctx.fill();
		drawnObject = BB.game.add.sprite(x, y, bmd);
		drawnObject.anchor.setTo(0, 1);


		var text;
		var style;
		if (alive) {
			style = { font: "14px Verdana", fill: "#B50100",  wordWrap: true, wordWrapWidth: 190 };
			text = "This monster is still alive because you overspent $15.34 on that day."
		} else {
			style = { font: "14px Verdana", fill: "#00841A",  wordWrap: true, wordWrapWidth: 190 };
			text = "BAM! You defeated this monster by saving $3.14 that day"
		}
		var label = BB.game.add.text(10, -95, text, style);
		drawnObject.addChild(label);

		return drawnObject;
	},

	update: function() {
		var small_monsters = BB.game.small_monsters_before;
		for (var i=0; i < small_monsters.length; i++)
		{
			var minimon = small_monsters[i]
			if (Phaser.Rectangle.contains(minimon.body, BB.game.input.x, BB.game.input.y))
        	{
        		if (!minimon.dialog) {
        			minimon.dialog = BB.monsterController.addPopup(BB.game.input.x, BB.game.input.y, minimon.alive)
        		}
        		minimon.dialog.x = BB.game.input.x;
        		minimon.dialog.y = BB.game.input.y;
        	}
        	else {
        		if (minimon.dialog) {
        			minimon.dialog.kill();
        			minimon.dialog = null;
        		}
        	}
		}
	}
}
