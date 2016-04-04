
var IvxBtn = Ivx.extend(Phaser.Button,'PSprite', function(group, idx, onclick) {
    var game, x, y, thisObj, bgIdx, activeIdx, spriteIdx, scale, mag;
    x = 20+ (120 * idx);
    game = group.game;

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
    
    this.active = new Phaser.Sprite(game, 0, 0, 'ui', activeIdx);
    this.icon = new Phaser.Sprite(game, 0, 0, 'ui', spriteIdx);
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

    this.inputEnabled = true;
   // this.input.enableDrag();
    
    thisObj = this;
    this.events.onDragStart.add(function(sprite, pointer) {

        thisObj.eventDragStart(sprite, pointer); 
    });
    this.events.onDragStop.add(function(sprite, pointer) {
        thisObj.eventDragStop(sprite, pointer); 
    }); 
    
    group.add(this);
    group.cellArr.push(this);

    //this.visible  = false;

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

    if(this.parent._preview) {
        return false;
    }

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

IvxTile.prototype.checkCorrect = function (animate) {
    var correct;

    correct = this.isCorrect();
    if (correct) {
       this.inputEnabled = false;
       if (this.isActive()) {
        this.parent.active = null;
        this.parent.eventActive(false);
       }
    }
    this.adjustTint();
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
IvxTile.prototype.eventDragStart = function (sprite, pointer) {

    if(this.parent._preview) {
        return false;
    }

    this.origActive =  this.parent.active;
    this.parent.eventActive(false);
    
    this.parent.active = this;

    this.last = { x: this.x, y: this.y, type: this.position.type};
    this.bringToTop();
};
IvxTile.prototype.eventDragStop = function (sprite, pointer) {

    var idx, tile;
    if(this.parent._preview) {
        return false;
    }

    idx = this.calcIdx();
   
    tile = this.swapIdx(idx);
    this.x = this.last.x;
    this.y = this.last.y;
    if (this !== tile) {
        this.parent.active = tile;
        this.checkCorrect();
    } else {
        if (this.origActive === this) {
            this.parent.active = null;
        }
    }
    this.parent.eventActive(this.parent.active);
    
    tile.checkCorrect(true) && this.parent.checkComplete();
    
};
IvxTile.prototype._turn = function () {

    this.parent.tween = null;
    this.parent.eventActive(true);
    this.checkCorrect(true) && this.parent.checkComplete();
    
};
IvxTile.prototype.turnRight = function () {
    var thisObj, angle, parent;

    thisObj = this;
    angle = this.angle + 90;

    parent = this.parent
    parent.eventActive(false);
    parent.tween =this.game.add.tween(this);
    parent.tween.to({angle: angle}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
};
IvxTile.prototype.turnLeft = function () {
    var thisObj, angle, parent;

    thisObj = this;
    angle = this.angle - 90;

    parent = this.parent
    parent.eventActive(false);
    parent.tween =this.game.add.tween(this);
    parent.tween.to({angle: angle}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);
    
};
IvxTile.prototype.flipH = function () {
    var thisObj, parent, val;

    val = this.scale.x * -1; 

    thisObj = this;
    parent = this.parent
    parent.eventActive(false);
    parent.tween =this.game.add.tween(this.scale);
    parent.tween.to({x: val}, ivxCfg.tweenTIME , Phaser.Easing.Linear.None, true);
    parent.tween.onComplete.addOnce(function() {thisObj._turn();}, this);

};
IvxTile.prototype.flipV = function () {
    var thisObj, parent, val;

    val = this.scale.y * -1; 

    thisObj = this;
    parent = this.parent
    parent.eventActive(false);
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
    this.input.enableDrag();
    this.checkCorrect();
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
    this._shuffleDELAY = 3000;
    this.cellArr = [];
    this._preview = true;
});
IvxTileGroup.prototype.eventCompleted = function() { 
    console.log('IvxTileGroup.eventCompleted: **todo: override **');
};
IvxTileGroup.prototype.eventActive = function(active) { 
    console.log('IvxTileGroup.eventActive: **todo: override **');
};
IvxTileGroup.prototype.select = function(tile, eventDragStart) {
      var current;
      current = this.active;

      if (this.active) {
          this.active = null;
      }  
      if (current !== tile) {
          this.active = tile;         
      }
};
IvxTileGroup.prototype.prep = function(bg) {
    var game, thisObj, sample, bmd, url, cols, rows, 
        size, sizex, sizey,
        count, scale, offx, offy,  mag, h, scale2;

    thisObj = this;
    game = this.game;

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
        scale2 = ((100 *(rows * size) / game.height)|0) / 100;
    } else {
        rows = cols;
        size = (game.height / rows)|0;
        cols =  (((sample.height * scale)/size))|0;
        scale2 = 1;
    }
    

    console.log('prep: sample.width: ' + sample.width + ' height: ' + sample.height);
    
    mag = sample.scale.getMagnitude();
    sample.mag = mag;
    sample.scale.setMagnitude(scale2 * mag * scale);

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

    
    game.cache.addSpriteSheet('pscaled', null, bmd.canvas, size, size, count, 0, 0);

    this.breed();
    this.shuffle();
};
IvxTileGroup.prototype.breed = function(cols) {
    var i;
    this._preview = true;
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
        this.cellArr[i].visible = true;
    }  
    this._preview = false;
};
IvxTileGroup.prototype.shuffle = function() {
    var thisObj = this;

    this._shuffleTO = window.setTimeout(function() {
            thisObj._shuffle();
        },
        thisObj._shuffleDELAY
    );
};
IvxTileGroup.prototype.checkComplete = function() {
    var len, tile;
    len = this.cellArr.length;
    for (var i = 0; i < len; i++) {
        if (!this.cellArr[i].isCorrect()) {
            return false;
        }
    }  
    this.eventActive(null);
    console.log('IvxTileGroup.checkComplete: true');
    this.eventCompleted();
    return true;
};
