BB.game = new Phaser.Game(1600, 400, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
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
    BB.game.load.image('bg_tile01', '/assets/bg_tile01.jpg');
    BB.game.load.image('bg_tile02', '/assets/bg_tile02.jpg');
    BB.game.load.image('bg_tile03', '/assets/bg_tile03.jpg');
    BB.game.load.atlasJSONHash('rain', '/assets/rain.png', '/assets/rain.json');
    //monsters
    BB.heroController.preload();
    BB.monsterController.preload();
    BB.piggyController.preload();

}

function create() {
    BB.game.scale.pageAlignHorizontally = true;
    BB.game.scale.pageAlignVertically = true;

    createBackgrounds();
    createRain();

    var big_button = BB.game.add.sprite(460, 370, 'level_buttons_big');
    big_button.anchor.set(0.5, 1);
    BB.game.big_button = big_button;

    BB.monsterController.create();
    BB.heroController.create();

    BB.monsterController.addSmallMonsters()
    BB.piggyController.create();



    resize();
}

function createRain()
{
    var rain_width = 400
    var rain_tiles = 4
    var rain_group = BB.game.add.group();

    BB.game.rain = rain_group;

    for (var i=0; i < rain_tiles; i++)
    {
        var rain_piece = rain_group.create(i*rain_width, 0, 'rain');
        rain_piece.animations.add('pour', Phaser.Animation.generateFrameNames('raining_', 0, 4), 22, true);
        rain_piece.animations.play('pour')
    }

    rain_group.alpha = 0;
}

var marginBetweenPlayerAndMonster = -30;
function centerPlayerAndMonster() {
    BB.game.hero.x = BB.game.scale.width / 2 - BB.game.hero.width - marginBetweenPlayerAndMonster;
    BB.game.currentMonster.x = BB.game.scale.width / 2 + BB.game.currentMonster.width + marginBetweenPlayerAndMonster;
    BB.game.big_button.x = BB.game.scale.width / 2;
    BB.game.big_button.scale.x = 1.5;

    for (var i = 0; i < BB.game.small_buttons_before.length; i++) {
        var item = BB.game.small_buttons_before[i];
        var mini_monster =  BB.game.small_monsters_before[i];
        item.x = BB.game.scale.width / 2 - 200 - 100 * i;
        mini_monster.x = item.x - 10; //to center
    }

    var lastEnemyPossitionX = BB.game.currentMonster.x;
    for (var i = 0; i < BB.game.small_buttons_after.length; i++) {
        var item = BB.game.small_buttons_after[i];
        item.x = BB.game.scale.width / 2 + 250 + 100 * i;
        var mini_monster =  BB.game.small_monsters_after[i];
        mini_monster.x = item.x - 10; //to center

        lastEnemyPossitionX = mini_monster.x;
    }

    BB.game.piggy.x = lastEnemyPossitionX + 200;
}

function finishDay() {
    var playerWon = Math.floor(Math.random() * 2) == 1
    playerWon = BB.expensesSum < 100 ? true : false;

    if (playerWon) {
        BB.game.hero.animations.play('attack3', null, false);
        BB.game.currentMonster.animations.play('defeat', null, false);

        BB.game.piggy.animations.play('cheer');
    } else {
        BB.game.hero.animations.play('hit', null, false);
        BB.game.currentMonster.animations.play('attack', null, false);
        BB.game.currentMonster.animations.currentAnim.onComplete.add(function () {
            BB.game.currentMonster.animations.play('win');
            BB.game.piggy.animations.play('worry');
        });
    }
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
    var bg_group03 = BB.game.add.group();
    var bg_group02 = BB.game.add.group();
    var bg_group01 = BB.game.add.group();

    BB.game.bg_group01 = bg_group01;
    BB.game.bg_group02 = bg_group02;
    BB.game.bg_group03 = bg_group03;

    for (var i=0; i < bg_tiles; i++)
    {
        var bg_piece3 = bg_group03.create(i*bg_tile_width, 0, 'bg_tile03');
        var bg_piece2 = bg_group02.create(i*bg_tile_width, 0, 'bg_tile02');
        var bg_piece1 = bg_group01.create(i*bg_tile_width, 0, 'bg_tile01');
        // game.add.sprite(i*bg_tile_width, 0, 'bg_tile')
    }
}

function setBackgroundAttention()
{
    console.log("setting BackgroundAttention");

    BB.game.add.tween(BB.game.bg_group01).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);


}

function setBackgroundDanger()
{
    console.log("setting BackgroundDanger");
    BB.game.add.tween(BB.game.bg_group02).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
    BB.game.add.tween(BB.game.rain).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
}

function update() {
    BB.monsterController.update();
}

function render() {
    // BB.game.debug.spriteInfo(BB.game.currentMonster);
}


