
console.log('Loading: scenes.js');
var IvxScenes  = {};
IvxScenes.Main = function (ivxGame) {
    var game, thisObj;

    game = ivxGame.game;
    console.log('IvxScenes.Main: game: ' + game);


	this.create = function () {
        console.log('IvxScenes.Main.create: game: ' + game);

        var groupMain = game.add.physicsGroup(Phaser.Physics.ARCADE);
        ivxGame.groupMain = groupMain;

        game.world.bounds.height -= 20;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //game.time.desiredFps = 30;
        game.physics.arcade.gravity.y = 250;
 
        //var barTop = game.add.sprite(0,0,'bar');
        //var barBottom = game.add.sprite(0,game.world.bounds.height - 50,'bar');

        
        ivxGame.poopFactory = new IvxPoopFactory(ivxGame);
        ivxGame.houseArr = IvxHouse(ivxGame);
        ivxGame.treeArr = IvxTree(ivxGame);
        ivxGame.snowManArr = IvxSnowman(ivxGame);

        ivxGame.player = IvxPlayer(ivxGame);
        ivxGame.sledArr = IvxSleds(ivxGame);
       
        ivxGame.poopFactory.create();
        
        window.setTimeout(function() {
            ivxGame.poopFactory.enable = true;
        }, ivxCfg.poop.enableTS);
	};
	this.preload = function () {
	    var path;
        console.log('IvxScenes.Main.create: preload: ' + game);
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    };
    this.update = function() {
        game.physics.arcade.collide(ivxGame.groupMain);        
    };
    this.render = function() {
        /*
        game.debug.body(ivxGame.player);
        
        var arr = ivxGame.treeArr;
        var len = arr.length;
        for(var i = 0; i < len; i +=1) {
            game.debug.body(arr[i]);
        }
        
        var node = ivxGame.sledArr[0];
        while (node) {
            game.debug.body(node);
            node = node.next;
        }
        */
    };
}
IvxScenes.Invite = function (ivxGame) {
    var game, thisObj;
    thisObj = this;
    game = ivxGame.game;
    console.log('IvxScenes.Invite: game: ' + game);

	this.eventStory = function() {
        hud = document.querySelector('#ivx-hud-story');
        hud.style.display = "block";
        btnPlay = hud.querySelector('a');
        btnPlay.addEventListener('click',function() {
            hud.style.display = "none";
            console.log('IvxScenes.Invite.eventStory: starting game');
            game.state.start('Main'); 
        });
	};	
 
	this.create = function () {
        console.log('IvxScenes.Invite.create:');
	    // ivxGame.saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);
        var hud, btnPlay;
	    game.stage.backgroundColor = "#000055";
        this.bg = game.add.sprite(0,0,'splash');
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        
        hud = document.querySelector('#ivx-hud-play');
        hud.style.display = "block";
        btnPlay = hud.querySelector('a');
        btnPlay.addEventListener('click',function() {
            hud.style.display = "none";
			thisObj.eventStory();
        });
        //todo: remove after dev!
        /*
        hud.style.display = "none";
        game.state.start('Main');
        */
	};
	this.preload = function () {
        console.log('IvxScenes.Invite.preload:');
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.load.image('splash', 'rsc/splash.png'); 
        game.load.spritesheet('sprites', 'rsc/sprites.png', ivxCfg.sprites.width, ivxCfg.sprites.height);
        game.load.image('bar','rsc/bar.png');
    };
}
