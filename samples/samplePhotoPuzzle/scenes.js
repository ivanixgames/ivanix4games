var IvxScenes  = {};
IvxScenes.Main = function (ivxGame) {
    var game, thisObj;
    thisObj = this;
    game = ivxGame.game;
    console.log('IvxScenes.Main: game: ' + game);
	this._create2 = function () {
	    
	    var bg, tileGroup, btnGroup;
	
	    bg = ivxGame.bgCreate();
	    bg.bmd.addToWorld();
	    //ivanixcu: debug
	    bg.sprite = game.world.children[0];
	    bg.sprite.visible =true;
	    
	    tileGroup = new IvxTileGroup(game);
	    btnGroup = ivxGame.createHud(tileGroup);
	
	    tileGroup.prep(bg);
	
	    ivxCfg.tileGroup = tileGroup;    
	    ivxCfg.btnGroup = btnGroup;
	
	    game.stage.backgroundColor = "#000055";
	};
	this._createMsgObj = function () {
	    ivxCfg.device = ivxMsgObj.deviceInfo(game);
	    ivxMsgObj.sendCmd('Orient','port', function(ack) {    
	        ivxMsgObj.sendCmd('Device', '?', function(ack) {
	            console.log('deviceack1: ' +ack); 
	            if(!ack) {
	                ivxMsgObj.sendCmd('Device', ivxCfg.device, function(ack) {
	                    console.log('deviceack2: ' +ack);
	                    location.reload();
	                    //game.scale.setGameSize(innerWidth, innerHeight);
	                    //this._create2();
	                    
	                });            
	            } else {
	                this._create2();
	            }
	        });
	    });
	};
    //functions below called by Phaser.Game
	this.create = function () {
	    ivxGame.saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);
	    if(window.ivxMsgObj) {
	        this._createMsgObj();
	    } else {
	        this._create2();
	    }
	}
	this.preload = function () {
	    var path;
	    //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.load.spritesheet('ui', '../assets/ui.png', ivxCfg.btnSIZE, ivxCfg.btnSIZE); 
	    path = ivxCfg.assets + ivxCfg.photo;
	    game.load.image('puzzle', path);
	   
	};
}
