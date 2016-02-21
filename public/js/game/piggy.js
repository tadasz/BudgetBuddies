BB.piggyController = {
	preload : function()
	{
		BB.game.load.atlasJSONHash('piggy', 'assets/piggy.png', 'assets/piggy.json');
	},

	create : function()
	{
	    var piggy = BB.game.add.sprite(1200, 360, 'piggy');
	    piggy.anchor.set(0.5, 1);
	    piggy.animations.add('cheer', Phaser.Animation.generateFrameNames('piggy_cheer', 0, 20, '', 4), 22, true);
	    piggy.animations.add('idle', Phaser.Animation.generateFrameNames('piggy_idle', 0, 29, '', 4), 22, true);
	    piggy.animations.add('worry', Phaser.Animation.generateFrameNames('piggy_worry', 0, 15, '', 4), 22, true);
	    
	    BB.game.piggy = piggy;
	    BB.game.piggy.animations.play('idle');	    
	}
}