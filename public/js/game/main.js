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
    
}

function create() {
    BB.game.scale.pageAlignHorizontally = true;
    BB.game.scale.pageAlignVertically = true;
    

    createBackgrounds();
    BB.heroController.create();
    BB.monsterController.create();

    resize();
}

var marginBetweenPlayerAndMonster = 10.0;
function centerPlayerAndMonster() {
    BB.game.hero.x = BB.game.scale.width / 2 - BB.game.hero.width / 2 + marginBetweenPlayerAndMonster;
    BB.game.currentMonster.x = BB.game.scale.width / 2 + BB.game.currentMonster.width / 2 + marginBetweenPlayerAndMonster;
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
    var bg_group = BB.game.add.group();

    for (var i=0; i < bg_tiles; i++)
    {
        var bg_piece = bg_group.create(i*bg_tile_width, 0, 'bg_tile');
        // game.add.sprite(i*bg_tile_width, 0, 'bg_tile')
    }
}

function update() {
}
