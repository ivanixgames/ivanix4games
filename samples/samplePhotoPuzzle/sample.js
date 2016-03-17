var ivx = {
    canvasWIDTH: 600,
    canvasHEIGHT: 800,
    btnSIZE: 100, 
    btnPAD: 10, 
    tweenTIME: 300,
    assets: '../assets/',
    photo: 'samplePortrait2.jpg'
};


var saveCpu;


var IvxBtn = Ivx.extend(Phaser.Button,'PSprite', function(group, idx, onclick) {
    var x, y, thisObj, bgIdx, activeIdx;

    y = ivx.canvasHEIGHT - ivx.btnSIZE - ivx.btnPAD;
    x = 20+ (120 * idx);
    bgIdx = 4;
    
    thisObj = this;
    Phaser.Button.call(this, group.game, x, y, 'arrows', function() {
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
    
    this.active = new Phaser.Sprite(game, 0, 0, 'arrows', 5);
    this.icon = new Phaser.Sprite(game, 0, 0, 'arrows', idx);
    this.addChild(this.active);
    this.addChild(this.icon);
    this.active.visible = false;

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

var IvxTile = Ivx.extend(Phaser.Sprite,'PSprite', function(group, size, cols, offx, offy) {
    var thisObj, col, row, x, y, midpoint, rect;
    
    this.idx = group.cellArr.length;


    this.offx = offx;
    this.offy = offy;
    

    col = this.idx % cols;
    row = (this.idx / cols)|0;
    midpoint = size/2|0;

    x = col * size;
    y = row * size;

    rect = {x: x, y: y, width: size, height: size}
    this.ivxrect = rect;

     x +=  midpoint + offx;
     y +=  midpoint;
 
    Phaser.Sprite.call(this, group.game, x, y, 'puzzle');

    this.crop(rect);

    this.anchor.setTo(0.5);
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
        txt: this.texture,
        angle: this.angle,
        scalex: this.scale.x,
        scaley: this.scale.y,
        x: this.x,
        y: this.y,
        tint: this.tint
    };
    //group.select(this);    
    //this.tween =this.game.add.tween(this);

});
IvxTile.prototype.isCorrect = function () {
    var o, correct;
    o = this.orig;

    if (this.scale.x < 0 && this.scale.y < 0) {
        this.scale.x *= -1;
        this.scale.y *= -1;
        this.angle += 180;
    }


    correct =  (!this.angle) && (this.x === o.x) && (this.y === o.y) && (this.scale.x + this.scale.y ===2) &&  (this.texture === o.txt);

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
            this.tint = this.orig.tint && 0x00ff00;
       } else {
           this.tint = this.orig.tint && 0xff5555;
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
IvxTile.prototype.swapIdx = function (idx) {
    var tile;
    tile = this.parent.cellArr[idx];
    this.swap(tile);
    return tile;
};
IvxTile.prototype.calcIdx = function() {
    var col, row, idx, tile;
 
    col = ((this.x - this.offx  ) / Math.abs(this.width))|0;
    row = ((this.y ) / Math.abs(this.height))|0;
    
    idx = col + row * this.parent.cols;
    if (idx < this.parent.cellArr.length) {
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
    parent.tween.to({angle: angle}, ivx.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
};
IvxTile.prototype.turnLeft = function () {
    var thisObj, angle, parent;

    thisObj = this;
    angle = this.angle - 90;

    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this);
    parent.tween.to({angle: angle}, ivx.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
    
};
IvxTile.prototype.flipH = function () {
    var thisObj, parent, val;

    val = this.scale.x * -1; 

    thisObj = this;
    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this.scale);
    parent.tween.to({x: val}, ivx.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);

};
IvxTile.prototype.flipV = function () {
    var thisObj, parent, val;

    val = this.scale.y * -1; 

    thisObj = this;
    parent = this.parent
    parent.onActive(false);
    parent.tween =this.game.add.tween(this.scale);
    parent.tween.to({y: val}, ivx.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);

};

IvxTile.prototype.shuffle = function () {
    var idx;
    
    idx = Math.floor(Math.random() * this.parent.cellArr.length);
    this.swapIdx(idx);
    
    this.scale.x = Math.floor(Math.random()  * 2)||-1;
    this.scale.x = Math.floor(Math.random()  * 2)||-1;

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
     
IvxTileGroup.prototype.breed = function(cols) {
    var bg, w, h, rows, size, count, tth, offx, offy, puzzleHeight;

    bg = game.add.sprite(0,0, 'puzzle');
    //bg.visible = false;
    
    ivx.bg = bg;

    puzzleHeight = ivx.canvasHEIGHT - ivx.btnSIZE - 2 * ivx.btnPAD;

    size = (bg.width / cols)|0;

    //rows = (bg.height / size)|0;
    rows = (puzzleHeight / size)|0;
    count = cols * rows;

    this.cols = cols;
    this.rows = rows;
    this.size = size;

    offx = (ivx.canvasWIDTH - bg.width)/2|0;

    tth = (rows * size)
    offy = (ivx.canvasHEIGHT - tth)/2|0;

    bg.x += offx;
    this.add(bg);

    for(var i=0; i < count; i++) {
        new IvxTile(this, size, cols, offx, offy);
    }  
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

   group.adjustButtons = function () {
        var i, len, avl, pad;
        len = this.children.length;

        avl = ivx.canvasWIDTH - (ivx.btnSIZE * len);
        pad = avl / (len + 1)

        for(i=0; i < len; i++) {
            this.children[i].x =  pad +  (i * (ivx.btnSIZE + pad));
            // this.children[i].y =  pad;
        };

   };
   group.adjustButtons();

   tileGroup.onActive = function(tile) {

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
    
    game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.load.spritesheet('arrows', '../assets/arrows.png', ivx.btnSIZE, ivx.btnSIZE); 

    path = ivx.assets + ivx.photo;

    game.load.image('puzzle', path);
   
}
function create() {
    
    var size, tileGroup, btnGroup;
    
	saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);


    
    tileGroup = new IvxTileGroup(game);
    btnGroup = createHud(tileGroup);

    tileGroup.breed(4);
    tileGroup.shuffle();

    ivx.tileGroup = tileGroup;    
    ivx.btnGroup = btnGroup;

}


var game = new Phaser.Game(ivx.canvasWIDTH, ivx.canvasHEIGHT, Phaser.AUTO, 'canvas1', { preload: preload, create: create });
