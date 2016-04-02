var IvxScenes  = {};
IvxScenes.Main = function (ivxGame) {
    var game, thisObj;
    thisObj = this;
    game = ivxGame.game;
    console.log('IvxScenes.Main: game: ' + game);
	this.create = function () {
	    
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

        tileGroup.eventCompleted = function() {
            ivxGame.eventCompleted();
        }

	};
	this.preload = function () {
	    var path;
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.load.spritesheet('ui', '../assets/ui.png', ivxCfg.btnSIZE, ivxCfg.btnSIZE); 
	    game.load.spritesheet('bgpat', '../assets/bg.png', ivxCfg.btnSIZE, ivxCfg.btnSIZE); 
	    //path = ivxCfg.assets + ivxCfg.photo;
        path = ivxCfg.plist[ivxGame.picidx];
	    game.load.image('puzzle', path);
	   
	};
}
IvxScenes.Invite = function (ivxGame) {
    var game, thisObj;
    thisObj = this;
    game = ivxGame.game;
    console.log('IvxScenes.Main: game: ' + game);
    this.eventPlay = function() {
        if (game.device.mobileSafari) {
            //note: cannot fullscreen in iOS 

            game.state.start('Main');
            return;
        }
        if(!window.ivxMsgObj) {
          game.state.start('Main');
          return;
        }
        ivxMsgObj.sendCmd('AskFullScreen', null, function(ack) {
            console.log('IvxScenes.Invite.eventPlay: ' +ack); 
            game.paused = false;
            if(ack === 'yes') {
                //ivxGame.mode = 'restartFS';
                ivxMsgObj.sendCmd('FullScreen', true);
            } else {
                game.state.start('Main');
            }
        });       
    };
	this._create2 = function () {
        var hud, btnPlay;
	    game.stage.backgroundColor = "#000055";
        this.bg = game.add.sprite(0,0,'invite');
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        
        hud = document.querySelector('#ivx-hud-play');
        hud.style.display = "block";
        btnPlay = hud.querySelector('a');
        btnPlay.addEventListener('click',function() {
            hud.style.display = "none";
            thisObj.eventPlay();
        });
        
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
	                });            
	            } else {
	                thisObj._create2();
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
	    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    game.load.image('invite', 'rsc/media/invite.png'); 
	};
}
