var game = new Phaser.Game(500, 500, Phaser.AUTO, 'canvas1', { preload: preload, create: create });

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('eggman', 'assets/EggManWalking.png');
}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    var image = game.add.sprite(-150, 0, 'eggman');

    //game.physics.enable(image, Phaser.Physics.ARCADE);
    //image.body.velocity.x=50;

}