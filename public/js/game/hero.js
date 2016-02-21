BB.heroController = {
    preload: function()
    {
        BB.game.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    },

    create : function()
    {
        var hero = BB.game.add.sprite(100, 350, 'hero');
        hero.anchor.set(0, 1);
        hero.animations.add('attack1', Phaser.Animation.generateFrameNames('attack01', 0, 29, '', 4), 22, true);
        hero.animations.add('attack2', Phaser.Animation.generateFrameNames('attack02', 0, 16, '', 4), 22, true);
        hero.animations.add('attack3', Phaser.Animation.generateFrameNames('attack03', 0, 20, '', 4), 22, true);
        hero.animations.add('hit',     Phaser.Animation.generateFrameNames('hit', 0, 21, '', 4),      22, true);
        hero.animations.add('idle',    Phaser.Animation.generateFrameNames('idle', 0, 79, '', 4),     22, true);
        hero.animations.add('pose1', ['pose010000'],     22, true);
        hero.animations.add('pose2', ['pose020000'],     22, true);
        hero.animations.add('pose3', ['pose030000'],     22, true);
        hero.animations.play('idle');

        BB.game.hero = hero;
        BB.game.hero.current_pose = 'pose1'
    },

    setCharacterPose : function()
    {
        var all_poses = ['pose1', 'pose2', 'pose3']
        for (var i=0; i < all_poses.length; i++)
        {
            if (all_poses[i] == BB.game.hero.current_pose)
            {
                all_poses.splice(i, 1)
                break;
            }
        }
        var pose_index = Math.floor(Math.random() * all_poses.length)
        var pose = all_poses[pose_index]

        BB.game.hero.animations.play(pose);
        BB.game.hero.current_pose = pose_index;
    },

    attack : function()
    {
        var all_attacks = ['attack1', 'attack2', 'attack3'];
        var atk_index = Math.floor(Math.random() * all_attacks.length)
        var attack = all_attacks[atk_index]

        BB.game.hero.animations.play(attack, null, false);
    }


}
