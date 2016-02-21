var game = new Phaser.Game(1600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var resize = function(e) {
    var aspectRatio = 1.5;
    if ((window.innerWidth / window.innerHeight) > aspectRatio) {
        game.scale.width = window.innerHeight * aspectRatio;
    } else if ((window.innerWidth / window.innerHeight) < aspectRatio) {
        game.scale.width = window.innerWidth;
    } else {
        game.scale.width = window.innerWidth;
    }
    game.scale.refresh();
    centerPlayerAndMonster();
}
window.onresize = resize;

function preload() {
    game.load.image('bg_tile', '/assets/bg_tile.png');
    game.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    //monsters
    game.load.atlasJSONHash('monster', 'assets/monster.png', 'assets/monster.json');
}

function create() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    

    createBackgrounds();
    createCharacter();
    createMonster();

    resize();
}

var marginBetweenPlayerAndMonster = 10.0;
function centerPlayerAndMonster() {
    game.hero.x = game.scale.width / 2 - game.hero.width / 2 + marginBetweenPlayerAndMonster;
    game.currentMonster.x = game.scale.width / 2 + game.currentMonster.width / 2 + marginBetweenPlayerAndMonster;
}

function createCharacter()
{
    var hero = game.add.sprite(300, 350, 'hero');
    hero.anchor.set(0.5, 1);
    hero.animations.add('attack1', Phaser.Animation.generateFrameNames('attack01', 0, 29, '', 4), 22, true);
    hero.animations.add('attack2', Phaser.Animation.generateFrameNames('attack02', 0, 16, '', 4), 22, true);
    hero.animations.add('attack3', Phaser.Animation.generateFrameNames('attack03', 0, 20, '', 4), 22, true);
    hero.animations.add('hit',     Phaser.Animation.generateFrameNames('hit', 0, 21, '', 4),      22, true);
    hero.animations.add('idle',    Phaser.Animation.generateFrameNames('idle', 0, 79, '', 4),     22, true);
    hero.animations.add('pose1', ['pose010000'],     22, true);
    hero.animations.add('pose2', ['pose020000'],     22, true);
    hero.animations.add('pose3', ['pose030000'],     22, true);
    hero.animations.play('idle');

    game.hero = hero;
}

function createMonster()
{
    var monster = game.add.sprite(460, 350, 'monster');
    monster.anchor.set(0.5, 1);
    monster.animations.add('attack', ['monster_attack0000'], 22, true);
    monster.animations.add('defeat', ['monster_defeat0000'], 22, true);
    monster.animations.add('hit', ['monster_hit0000'], 22, true);
    monster.animations.add('idle', ['monster_idle0000'], 22, true);
    monster.animations.add('win', ['monster_win0000'], 22, true);

    game.currentMonster = monster;
}

current_pose = 'pose1'
function setCharacterPose()
{
    var all_poses = ['pose1', 'pose2', 'pose3']
    for (var i=0; i < all_poses.length; i++)
    {
        if (all_poses[i] == current_pose)
        {
            all_poses.splice(i, 1)
            break;
        }
    }
    var pose_index = Math.floor(Math.random() * all_poses.length)
    var pose = all_poses[pose_index]

    game.hero.animations.play(pose);
    current_pose = pose_index;
}

function attack()
{
    var all_attacks = ['attack1', 'attack2', 'attack3'];
    var atk_index = Math.floor(Math.random() * all_attacks.length)
    var attack = all_attacks[atk_index]

    game.hero.animations.play(attack, null, false);
}

function goToPreviousDay()
{
    console.log("previous day...");
}

function goToNextDay()
{
    console.log("next day...");   
}

function createBackgrounds()
{
    var bg_tile_width = 400
    var bg_tiles = 4
    var bg_group = game.add.group();

    for (var i=0; i < bg_tiles; i++)
    {
        var bg_piece = bg_group.create(i*bg_tile_width, 0, 'bg_tile');
        // game.add.sprite(i*bg_tile_width, 0, 'bg_tile')
    }
}

function update() {
}
