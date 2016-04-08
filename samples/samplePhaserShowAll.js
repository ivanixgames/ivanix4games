var game;
var saveCpu;

function preload() {

}

function create() {
	saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

}
game = new Phaser.Game(1920, 1280, Phaser.AUTO, 'canvas1', { preload: preload, create: create });
