var game = new Phaser.Game(500, 500, Phaser.AUTO, 'canvas1', { preload: preload, create: create });


function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('eggman', 'assets/EggManWalking.png');
    
    //game.stage.backgroundColor = '#ffffff'; 
}
var g = {};
function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
   var sprite;

    Cjs2Phaser.init(game, lib);


    // create 1st sprite from cjs lib.EggManWalking, main cjs scene sprite.
    sprite = new Cjs2Phaser.Sprite(lib.EggManWalking, 0, 0, {srclib: true});
    /*
     * same as:
     
      var boundaryEMW = {width: lib.properties.width, height: lib.properties.height, x: 0, y:0};
      var sprite = new Cjs2Phaser.Sprite(lib.EggManWalking, 0, 0, boundaryEMW);
   */
    game.world.add(sprite);
      
    // allow access to sprite from webconsole
    g.emw = sprite;  
    
    // create 2nd sprite from lib.Man cjs sprite.
    sprite = new Cjs2Phaser.Sprite(lib.Man, 350, 230);
    sprite.cjsSprite.timeline.duration=39;
    sprite.scale  = {x: 0.5, y: 0.5};
    sprite.CJSFPS  = 48;
    game.world.add(sprite);
    
    // allow access to sprite from webconsole
    g.man = sprite;
    
    
    sprite = new Cjs2Phaser.Sprite(lib.Eye);
    game.world.add(sprite);
    
    g.eye = sprite;
 
}