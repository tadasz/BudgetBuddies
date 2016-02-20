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
}
window.onresize = resize;

function preload() {
    game.load.image('bg_tile', '/assets/bg_tile.png');
    game.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
}

function create() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    resize();

    createBackgrounds();
    createCharacter();


}

function createCharacter()
{
    var hero = game.add.sprite(300, 350, 'hero');
    hero.anchor.set(0, 1);
    hero.animations.add('attack1', Phaser.Animation.generateFrameNames('attack01', 0, 29, '', 4), 22, true);
    hero.animations.add('attack2', Phaser.Animation.generateFrameNames('attack02', 0, 16, '', 4), 22, true);
    hero.animations.add('attack3', Phaser.Animation.generateFrameNames('attack03', 0, 20, '', 4), 22, true);
    hero.animations.add('hit',     Phaser.Animation.generateFrameNames('hit', 0, 21, '', 4),      22, true);
    hero.animations.add('idle',    Phaser.Animation.generateFrameNames('idle', 0, 79, '', 4),     22, true);
    hero.animations.play('idle');

    all_animations = ['attack1', 'attack2', 'attack3', 'hit', 'idle'];
    current_anim = 0;
    game.input.keyboard.onDownCallback = function(e) {
        // console.log(e.keyCode);
        if (e.keyCode == 32) {
            current_anim++;
            if (current_anim >= all_animations.length) {
                current_anim = 0;
            }
            next_anim = all_animations[current_anim];
            hero.animations.play(next_anim);
        }
    }
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
