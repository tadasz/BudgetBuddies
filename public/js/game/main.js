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
    game.load.atlasJSONArray('hero', 'assets/hero.png', 'assets/hero.json');
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
    hero.anchor.set(0.5, 1);
    hero.animations.add('attack1', Phaser.ArrayUtils.numberArray(0, 29), 22, true);
    hero.animations.add('attack2', Phaser.ArrayUtils.numberArray(30, 48), 22, true);
    hero.animations.add('attack3', Phaser.ArrayUtils.numberArray(49, 59), 22, true);
    hero.animations.add('idle', Phaser.ArrayUtils.numberArray(80, 179), 22, true);
    hero.animations.play('idle');
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
