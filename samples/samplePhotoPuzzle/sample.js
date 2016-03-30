/*
    canvasWIDTH: window.innerWidth,
    canvasHEIGHT: window.innerHeight,
    canvasWIDTH: 600,
    canvasHEIGHT: 900,       
*/
var ivxCfg = {
   
    canvasWIDTH: window.innerWidth,
    canvasHEIGHT: window.innerHeight,  
    btnSIZE: 100, 
    btnPAD: 10, 
    tweenTIME: 300,
    assets: '../assets/',
    photo: 'samplePortrait2.jpg'
};


var saveCpu;


var IvxBtn = Ivx.extend(Phaser.Button,'PSprite', function(group, idx, onclick) {
    var x, y, thisObj, bgIdx, activeIdx, spriteIdx, scale, mag;
    x = 20+ (120 * idx);
    bgIdx = 0;
    activeIdx = 1;
    spriteIdx = idx + 2;
    
    thisObj = this;
    Phaser.Button.call(this, group.game, x, y, 'ui', function() {
        onclick();
    },
    bgIdx, bgIdx, bgIdx);
    group.add(this);
    
    this.onInputDown.add(function() {
       thisObj.eventInputDown(idx); 
    });
    this.onInputUp.add(function() {
        thisObj.eventInputUp(idx);
    });
    
    //game.add.existing(this);
    

    this.active = new Phaser.Sprite(game, 0, 0, 'ui', activeIdx);
    this.icon = new Phaser.Sprite(game, 0, 0, 'ui', spriteIdx);
    this.addChild(this.active);
    this.addChild(this.icon);
    this.active.visible = false;
    // this.scale.setMagnitude(0.75);

});
IvxBtn.prototype.eventClicked = function(idx) {
    //console.log('eventClicked: ' + idx);  
};
IvxBtn.prototype.eventInputDown = function(idx) {
    //console.log('eventInputDown: ' + idx); 
    this.active.visible = true;
};
IvxBtn.prototype.eventInputUp = function(idx) {
    //console.log('eventInputUp: ' + idx); 
    this.active.visible = false;
};

var IvxTile = Ivx.extend(Phaser.Sprite,'PSprite', function(group) {
    var thisObj, board, col, row, x, y, midpoint, mag, rect;
    
    board = group.board;
    
    this.idx = group.cellArr.length;

    col = this.idx % board.cols;
    row = (this.idx / board.cols)|0;

    x = col * (board.size);
    y = row * (board.size);
    //console.log('IvxTile: idx: ' + this.idx + ' col: ' + col + ' row: ' + row + ' x: ' + x + ' y:'+y);


    Phaser.Sprite.call(this, group.game, x, y, 'pscaled', this.idx);

    midpoint = (board.size)/2|0;

    this.x = board.offx + ((midpoint + col * board.size ) );
    this.y = board.offy + ((midpoint + row * board.size ) );
 

    this.anchor.setTo(0.5);
/*
    mag  = this.scale.getMagnitude();

    this.scale.setMagnitude( mag * board.scale);
*/
    this.inputEnabled = true;
    this.input.enableDrag();
    
    thisObj = this;
    this.events.onDragStart.add(function(sprite, pointer) {

        thisObj.onDragStart(sprite, pointer); 
    });
    this.events.onDragStop.add(function(sprite, pointer) {
        thisObj.onDragStop(sprite, pointer); 
    }); 
    
    group.add(this);
    group.cellArr.push(this);
    this.orig = {
        mag: mag,
        txt: this.texture,
        angle: this.angle,
        scalex: this.scale.x,
        scaley: this.scale.y,
        x: this.x,
        y: this.y,
        tint: this.tint
    };

});
IvxTile.prototype.isCorrect = function () {
    var o, correct;
    o = this.orig;

    if (this.scale.x < 0 && this.scale.y < 0) {
        this.scale.x *= -1;
        this.scale.y *= -1;
        this.angle += 180;
    }


    correct =  (!this.angle) && (this.x === o.x) && (this.y === o.y) &&  (this.texture === o.txt);
    correct = correct && (this.scale.x === o.scalex) && (this.scale.y === o.scaley) 

    return correct;
};

IvxTile.prototype.isActive = function () {
    return this === this.parent.active;
};
IvxTile.prototype.adjustTint = function () {
    if (this.isCorrect()) {
       this.tint = this.orig.tint && 0xffffff;
    } else {
       if (this.isActive()) {
            this.tint = this.orig.tint && 0x55ff55;
       } else {
           this.tint = this.orig.tint && 0xff8888;
       }
    }
};

IvxTile.prototype.onCorrect = function (animate) {
    var correct;

    correct = this.isCorrect();
    if (correct) {
       this.inputEnabled = false;
       if (this.isActive()) {
        this.parent.active = null;
        this.parent.onActive(false);
       }
    }
    this.adjustTint();
    correct && animate && this.parent.animateCorrect();
    
    return correct;
};

IvxTile.prototype.swap = function (tile) {
    
    var swap;
    swap =  { txt: tile.texture,  angle: tile.angle, scalex: tile.scale.x, scaley: tile.scale.y };
    
    tile.texture = this.texture;
    tile.angle = this.angle;
    tile.scale.x = this.scale.x;
    tile.scale.y = this.scale.y;
    
    this.texture = swap.txt;
    this.angle = swap.angle;
    this.scale.x = swap.scalex;
    this.scale.y = swap.scaley;
    
};
IvxTile.prototype.tileIdx = function (idx) {
    return this.parent.cellArr[idx];
};
IvxTile.prototype.swapIdx = function (idx) {
    var tile;
    tile = this.parent.cellArr[idx];
    this.swap(tile);
    return tile;
};
IvxTile.prototype.calcIdx = function() {
    var col, row, idx, tile, board, size;

    size = Math.abs(this.width);
    board = this.parent.board;
    
    col = ((this.x - board.offx ) / size)|0;
    row = ((this.y - board.offy ) / size)|0;
    if ( (col+1) > board.cols || (row+1) > board.rows || col < 0 || row < 0) {
        return this.idx;
    }
    
    idx = col + row * board.cols;

    if (idx < this.parent.cellArr.length) {
        tile = this.tileIdx(idx);
        if (tile.isCorrect()) {
            return this.idx;
        }
        return idx;
    }
    return this.idx;
};
IvxTile.prototype.onDragStart = function (sprite, pointer) {

    this.origActive =  this.parent.active;
    this.parent.onActive(false);
    
    this.parent.active = this;

    this.last = { x: this.x, y: this.y, type: this.position.type};
    this.bringToTop();
};
IvxTile.prototype.onDragStop = function (sprite, pointer) {

    var idx, tile;

    idx = this.calcIdx();
   
    tile = this.swapIdx(idx);
    this.x = this.last.x;
    this.y = this.last.y;
    if (this !== tile) {
        this.parent.active = tile;
        this.onCorrect();
    } else {
        if (this.origActive === this) {
            this.parent.active = null;
        }
    }
    this.parent.onActive(this.parent.active);
    
    tile.onCorrect(true) && this.parent.completed();
    
};
IvxTile.prototype._turn = function () {

    this.parent.tween = null;
    this.parent.onActive(true);
    this.onCorrect(true) && this.parent.completed();
    
};
IvxTile.prototype.turnRight = function () {
    var thisObj, angle, parent;

    thisObj = this;
    angle = this.angle + 90;

    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this);
    parent.tween.to({angle: angle}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
};
IvxTile.prototype.turnLeft = function () {
    var thisObj, angle, parent;

    thisObj = this;
    angle = this.angle - 90;

    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this);
    parent.tween.to({angle: angle}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
    
};
IvxTile.prototype.flipH = function () {
    var thisObj, parent, val;

    val = this.scale.x * -1; 

    thisObj = this;
    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this.scale);
    parent.tween.to({x: val}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);

};
IvxTile.prototype.flipV = function () {
    var thisObj, parent, val;

    val = this.scale.y * -1; 

    thisObj = this;
    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this.scale);
    parent.tween.to({y: val}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);

};

IvxTile.prototype.shuffle = function () {
    var idx;
    
    idx = Math.floor(Math.random() * this.parent.cellArr.length);
    this.swapIdx(idx);
    
    this.scale.x *= Math.floor(Math.random()  * 2)||-1;
    this.scale.y *= Math.floor(Math.random()  * 2)||-1;

    this.angle  = (Math.floor(Math.random() * 4) * 90);
    this.onCorrect();
};
var IvxTileGroup = Ivx.extend(Phaser.Group,'PGroup', function(game) {
    Phaser.Group.call(this, game);
    var activeTile = null;
    var thisObj = this;


    Object.defineProperty(this, "active", {
        set: function(tile) {
            var prior;

            prior = activeTile;
            activeTile = tile;

            prior && prior.adjustTint();

            activeTile &&  activeTile.adjustTint();
            
        },
        get: function() {
            return activeTile;
        }
    });
    this._shuffleDELAY = 1000;
    this.cellArr = [];
});
IvxTileGroup.prototype.onActive = function(active) { 
    console.log('IvxTileGroup.onActive: **todo: override **');
};
    
IvxTileGroup.prototype.select = function(tile, onDragStart) {
      var current;
      current = this.active;

      if (this.active) {
          this.active = null;
      }  
      if (current !== tile) {
          this.active = tile;         
      }
};
/*



*/
IvxTileGroup.prototype.eventPuzzleScaled = function() {
    console.log('IvxTileGroup._eventPuzzledScaled:');

    this.breed();
    // this.shuffle();
};
IvxTileGroup.prototype.prep = function(bg) {
    var thisObj, sample, bmd, url, cols, rows, 
        size, sizex, sizey,
        count, scale, offx, offy,  mag, h;

    thisObj = this;

    cols = 4;
        

    sample = game.add.sprite(0,0, 'puzzle');
    sample.visible = false;

    sample.aspectRatio = sample.width / sample.height;
    
    /*
    if (sample.aspectRatio > game.scale.aspectRatio) {
        scale = game.width / sample.width;
        size = (game.width / cols)|0;
        rows =  (0.5 + ((sample.height * scale)/size))|0;
    } else {
        scale = game.height / sample.height;
        //todo:
        rows = cols;
        size = (game.height / rows)|0;
        //cols =  (0.5 + ((sample.width * scale)/size))|0;
        cols =  (0 + ((sample.width * scale)/size))|0;
    }
    */

    if (sample.aspectRatio > game.scale.aspectRatio) {
        scale = game.width / sample.width;
    } else {
        scale = game.height / sample.height;
    }
    if (game.scale.aspectRatio < 1 ) {
        size = (game.width / cols)|0;
        rows =  (((sample.height * scale)/size))|0;
    } else {
        rows = cols;
        size = (game.height / rows)|0;
        cols =  (((sample.height * scale)/size))|0;
    }
    

    console.log('prep: sample.width: ' + sample.width + ' height: ' + sample.height);
    
    mag = sample.scale.getMagnitude();
    sample.mag = mag;
    sample.scale.setMagnitude(mag * scale);

    count = cols * rows; 

    console.log('prep: bmd: size:'+size + ' cols:' +cols+' rows: '+rows);
    bmd = game.add.bitmapData(size * cols, size * rows);

    this.offx =  (bg.bmd.width  - bmd.width)/2|0;
    this.offy = (bg.bmd.height  - bmd.height)/2|0;

    var rect   = {x: this.offx, y: this.offy, width: bmd.width, height: bmd.height};
    bmd.copyRect(bg.bmd, rect, 0, 0);

    offx = (bmd.width  - sample.width)/2|0;
    offy = (bmd.height  - sample.height)/2|0;
    sample.x = offx;
    sample.y = offy;
    bmd.draw(sample, offx, offy);
   //url = bmd.canvas.toDataURL();

    this.board = {
        url: url,
        sample: sample,
        bg: bg,
        bmd: bmd,
        cols: cols,
        rows: rows,
        count: count,
        size: size,
        scale: scale,
        offx: this.offx,
        offy: this.offy,
    };    
   
    ivxCfg.board = this.board;

/*
    game.load.onLoadStart.addOnce(function() {
        console.log('onLoadStart:');
    }, thisObj
    );

    game.load.onLoadComplete.addOnce(function() {
        console.log('onLoadComplete:');
         thisObj.eventPuzzleScaled();
    }, thisObj
    );

    game.load.onFileStart.addOnce(function() {
        console.log('onFileStart:');
    }, thisObj
    );
    game.load.onFileError.addOnce(function() {
        console.log('onFileError:');
    }, thisObj
    );
*/    
    /*
    game.load.onFileComplete.addOnce(function() {
        console.log('onFileComplete');
        thisObj.eventPuzzleScaled();
    }, thisObj);


    game.load.spritesheet('pscaled', url, size, size);
    game.load.start();
    */
    
    game.cache.addSpriteSheet('pscaled', null, bmd.canvas, size, size, count, 0, 0);
    thisObj.eventPuzzleScaled();
   
    
}
IvxTileGroup.prototype.breed = function(cols) {
    var i;
    console.log('IvxTileGroup.breed:');
    for(i=0; i < this.board.count; i++) {
        new IvxTile(this);
    }  

    return;
};
IvxTileGroup.prototype._shuffle = function() {
    var len = this.cellArr.length;
    for(var i=0; i < len; i++) {
        this.cellArr[i].shuffle();
    }  
};
IvxTileGroup.prototype.shuffle = function() {
    var thisObj = this;

    this._shuffleTO = window.setTimeout(function() {
            thisObj._shuffle();
        },
        thisObj._shuffleDELAY
    );
};
IvxTileGroup.prototype.completed = function() {
    var len, tile;
    len = this.cellArr.length;
    for (var i = 0; i < len; i++) {
        if (!this.cellArr[i].isCorrect()) {
            return false;
        }
    }  
    this.onActive(null);
    console.log('puzzle complete!');
    return true;
};
IvxTileGroup.prototype.animateCorrect = function() {
    console.log('animateCorrect!');  
};
    

function createHud(tileGroup) {
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
	       if(ivxGame.isFullScreen()) {
	
	           ivxGame.fullScreen(false);
	       } else {
	
	           ivxGame.fullScreen(true);
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
function preload() {
    var path;

    //game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    //game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.load.spritesheet('ui', '../assets/ui.png', ivxCfg.btnSIZE, ivxCfg.btnSIZE); 

    path = ivxCfg.assets + ivxCfg.photo;

    game.load.image('puzzle', path);
   
};
 
function create2() {
    
    var bg, tileGroup, btnGroup;

    bg = ivxGame.bgCreate();
    bg.bmd.addToWorld();
    //ivanixcu: debug
    bg.sprite = game.world.children[0];
    bg.sprite.visible =false;
    
    tileGroup = new IvxTileGroup(game);
    btnGroup = createHud(tileGroup);

    tileGroup.prep(bg);

    ivxCfg.tileGroup = tileGroup;    
    ivxCfg.btnGroup = btnGroup;

    game.stage.backgroundColor = "#000055";
};
function createMsgObj() {
    ivxCfg.device = ivxMsgObj.deviceInfo(game);
    ivxMsgObj.sendCmd('Orient','port', function(ack) {    
        ivxMsgObj.sendCmd('Device', '?', function(ack) {
            console.log('deviceack1: ' +ack); 
            if(!ack) {
                ivxMsgObj.sendCmd('Device', ivxCfg.device, function(ack) {
                    console.log('deviceack2: ' +ack);
                    location.reload();
                    //game.scale.setGameSize(innerWidth, innerHeight);
                    //create2();
                    
                });            
            } else {
                create2();
            }
        });
    });
};
function create() {
    saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);
    if(window.ivxMsgObj) {
        createMsgObj();
    } else {
        create2();
    }
}
var game;

var IvxGame = function() {
    var thisObj;
    thisObj = this;


	this.bmdFill = function(bmd) {
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
        this.bmdFill(bg.bmd);
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
            // Phaser.AUTO, 
            //'ivxcanvas', 
        game = new Phaser.Game(
            ivxCfg.canvasWIDTH,
            ivxCfg.canvasHEIGHT,
            Phaser.AUTO, 
            'ivxcanvas', 
            { preload: preload, create: create }, 
            false
            );
            
        if(window.ivxMsgObj) {
            this._initMsgObj();
        }
    }; 
    thisObj._init = function() {
     //Ivx.consoleHide();
     Ivx.consoleMin();
      this._initGame();  
    };
    thisObj._init();
  
};
var ivxGame = new IvxGame();
