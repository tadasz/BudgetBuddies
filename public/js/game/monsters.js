BB.monsterController = {
	preload : function() 
	{
		BB.game.load.atlasJSONHash('monster', 'assets/monster.png', 'assets/monster.json');
	},

	create : function()
	{
	    var monster = BB.game.add.sprite(460, 350, 'monster');
	    monster.anchor.set(0.5, 1);
	    monster.animations.add('attack', ['monster_attack0000'], 22, true);
	    monster.animations.add('defeat', ['monster_defeat0000'], 22, true);
	    monster.animations.add('hit', ['monster_hit0000'], 22, true);
	    monster.animations.add('idle', ['monster_idle0000'], 22, true);
	    monster.animations.add('win', ['monster_win0000'], 22, true);

	    BB.game.currentMonster = monster;
	},

	addAllMonsters : function()
	{
		console.log("Monsters json:");
		console.log(BB.game.monsters_json);
	}


}