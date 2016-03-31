
var IvxGame = function() {
    var game, thisObj;
    thisObj = this;

    Object.defineProperty(this, 'mode', {

        set: function(val) {
            localStorage.setItem('mode', val);
        },
        get: function() {
            var val;
            val = localStorage.getItem('mode');
            if(!val) {
                val = 'demo';
            }
            return val;
        }
    });

	this.createDemoHud = function () {
        var e;
        e = document.querySelector('#ivxdemo')

    }
	this.createHud = function (tileGroup) {
	   var btn, group;
	
	   group = game.add.group();
	   
	   btn = new IvxBtn(group, 0, function() {
	      tileGroup.active && tileGroup.active.turnLeft();
	   });
	   btn = new IvxBtn(group, 1,  function() {
	       tileGroup.active && tileGroup.active.flipV();
	   });
	   btn = new IvxBtn(group, 2,  function() {
	       tileGroup.active && tileGroup.active.flipH();
	   });
	   btn = new IvxBtn(group, 3,  function() {
	      tileGroup.active && tileGroup.active.turnRight();
	   });
	
	   if (!game.device.mobileSafari) {
		   btn = new IvxBtn(group, 4,  function() {
		       if(thisObj.isFullScreen()) {
		
		           thisObj.fullScreen(false);
		       } else {
		
		           thisObj.fullScreen(true);
		       }
		   });
	   }
	
	
	   group.adjustButtons = function () {
	        var i, len, avl, pad, scale, mag, groupwidth, last;
	
	       len = this.children.length;
	       groupwidth = ((ivxCfg.btnPAD + ivxCfg.btnSIZE) * len)
	       
	       scale = 1;
	       if (ivxCfg.canvasWIDTH < groupwidth ) {
	          scale = ivxCfg.canvasWIDTH / groupwidth;
	       }
	
	        console.log('adjustButtons: scale: ' + scale);
	
	        avl = Math.floor (ivxCfg.canvasWIDTH - (scale * ivxCfg.btnSIZE * len));
	        pad = Math.floor(  (avl / (len + 1)) );
	        console.log('adjustButtons: avl: ' + avl + '  pad: '  + pad);
	
	        for(i=0; i < len; i++) {
	            this.children[i].x =  (i * (ivxCfg.btnSIZE + pad) * scale);
	            mag = this.children[i].scale.getMagnitude();
	            this.children[i].scale.setMagnitude(mag * scale);
	        };
	        group.x = (ivxCfg.canvasWIDTH - group.width)/2|0;
	
	   };
	   group.adjustButtons();
	
	   tileGroup.onActive = function(tile) {
	       var bottom;
	       console.log('tileGroup.onActive: ' + tile);
	       if (tile && tile.y) {
	        if (tile.y < ivxCfg.canvasHEIGHT / 2) {
	            bottom = ivxCfg.canvasHEIGHT - ivxCfg.btnSIZE - ivxCfg.btnPAD;
	            group.y  = bottom;
	        } else {
	            group.y  = ivxCfg.btnPAD;
	        }
	       }
	
	       if (tile) {
	           group.visible = true;
	       } else {
	           group.visible = false;
	       }
	   };
	
	   group.visible = false;
	
	   return group;
	};
	this.bgFill = function(bmd) {
	    var x, y, a, sprite;
	
	    sprite = game.add.sprite(0,0,'ui', 0);
	    sprite.anchor.setTo(0.5);
	
	    game.world.removeChild(sprite);
	    sprite.visible=false;
	    sprite.scale.setMagnitude(0.7);
	
	    bmd.ctx.fillStyle="#ffffff";
	    bmd.ctx.strokeStyle="#aaaaff";
		bmd.clear();
		bmd.fill();
	
	    for(x = -sprite.width; x < bmd.width + sprite.width; x += sprite.width/2) {
	    for(y = -sprite.height; y < bmd.height + sprite.height; y += sprite.width/2) {
	            var a = (x % 360);
	            sprite.angle = a;
	            bmd.draw(sprite, x, y);
	    }
	    }
	};
    this.bgCreate = function() {
        var bg = {};
        bg.bmd = game.add.bitmapData(game.width, game.height);
        this.bgFill(bg.bmd);
        return bg;
    };

    this.isFullScreen = function() {
       if(window.ivxMsgObj) {
           return this._isFS;
       } else {
           return game.scale.isFullScreen;
       }
    };
    this._fullScreenLocal = function () {
        game.scale.refresh();
        game.renderDirty = true;
    };
    this.fullScreenLocal = function(state) {
        if(!state) {
            game.scale.stopFullScreen();
            return;
        }
        
        console.log('fullScreenLocal: true');
        game.scale.startFullScreen();
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.setExactFit();

        window.setTimeout(function () { thisObj._fullScreenLocal(); }, 1000);        
    };
    this.fullScreen = function(state) {
        if(window.ivxMsgObj) {
            ivxMsgObj.sendCmd('FullScreen', state)
        } else {
            this.fullScreenLocal(state);
        }
        
    };      
    this._bindScenes  = function() {
        var scenes, scene;
        scenes = this.scenes
        for(scene in scenes) {
            console.log('ivxGame._bindScenes: scene: ' + scene);
            game.state.add(scene, scenes[scene]);
        }
    };
    this._initScenes  = function() {
        var scenes, scene;
        scenes = {};
        for(scene in IvxScenes) {
            console.log('ivxGame._initScenes: scene: ' + scene);
            scenes[scene] = new IvxScenes[scene](this);

        }
        this.scenes = scenes;
        this._bindScenes();
    };
    this._initMsgObj = function() {
         ivxMsgObj.ackFullScreen = function(flags) {
             console.log('ackFullScren: flag: ' + flags.flag + '  last: '+flags.last);
 
             thisObj._isFS = flags.flag;
             game.paused = false;
           if(!flags.flag ) {
               console.log('ackFullScreen: first rej');
             return;
           }
           if(typeof(flags.last) !=="undefined") {
               console.log('ackFullScreen: second rej');
             return;
           }
           //reload on first fullscreen event, ignore after
           thisObj._fsTO = setTimeout(function() {
                    location.reload(); 
                },
                2000
           );          
         };
    }
    this._initGame = function() {
        game = new Phaser.Game(
            ivxCfg.canvasWIDTH,
            ivxCfg.canvasHEIGHT,
            Phaser.AUTO, 
            'ivxcanvas', 
            null,
            false
            );

        this.game = game;
            
        if(window.ivxMsgObj) {
            this._initMsgObj();
        }
    }; 
    this._initMode = function() {
        
    }
    thisObj._init = function() {
      Ivx.consoleHide();
      //Ivx.consoleMin();
      this._initGame();  
      this._initScenes();  
      //this._initMode();  
      game.state.start('Main');
    };
    thisObj._init();
  
};
var ivxGame = new IvxGame();
