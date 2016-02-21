BB.game = new Phaser.Game(1600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var resize = function(e) {
    var aspectRatio = 1.5;
    if ((window.innerWidth / window.innerHeight) > aspectRatio) {
        BB.game.scale.width = window.innerHeight * aspectRatio;
    } else if ((window.innerWidth / window.innerHeight) < aspectRatio) {
        BB.game.scale.width = window.innerWidth;
    } else {
        BB.game.scale.width = window.innerWidth;
    }
    BB.game.scale.refresh();
    centerPlayerAndMonster();
}
window.onresize = resize;

function preload() {
    BB.game.load.image('bg_tile', '/assets/bg_tile.png');
    //monsters
    BB.heroController.preload();
    BB.monsterController.preload();
    BB.game.load.image('level_buttons_small', '/assets/levelButtons0001.png');
    BB.game.load.image('level_buttons_big', '/assets/levelButtons0002.png');

}

function create() {
    BB.game.scale.pageAlignHorizontally = true;
    BB.game.scale.pageAlignVertically = true;
    
    createBackgrounds();

    var big_button = BB.game.add.sprite(460, 370, 'level_buttons_big');
    big_button.anchor.set(0.5, 1);
    BB.game.big_button = big_button;

    BB.monsterController.create();
    BB.heroController.create();
    
    
    resize();
}

function centerPlayerAndMonster() {
    BB.game.hero.x = BB.game.scale.width / 2 - BB.game.hero.width / 2 + 14;
    BB.game.currentMonster.x = BB.game.scale.width / 2 + BB.game.currentMonster.width / 2 - 20;
    BB.game.big_button.x = BB.game.scale.width / 2;
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
    var bg_tiles = 10
    var bg_group = BB.game.add.group();

    for (var i=0; i < bg_tiles; i++)
    {
        var bg_piece = bg_group.create(i*bg_tile_width, 0, 'bg_tile');
        // game.add.sprite(i*bg_tile_width, 0, 'bg_tile')
    }
}

function update() {
}
