var ivx = {
    CWIDTH: 500,
    CHEIGHT: 610,
    div: 3
};


var saveCpu;
var IvxImageRsc2 = function( ) {
    var thisObj;
    thisObj =  this;
    this.read = function (url) {

        $.get( url, function (data) {
            thisObj.data  = data;
 
        }).error(function (err) {
            console.error('IvxImgRsc: failed');
        });
    };    
};
var IvxImageRscWks = function () {
    var thisObj;
    thisObj = this;
    this.read = function (url) {
        $(function(){
            var $ul = $('ul');
            $.ajax({
                dataType: 'jsonp',
                url: 'https://picasaweb.google.com/data/feed/api/user/ivanixdev/albumid/6261590518609850289',
                data: {
                    alt: 'json-in-script',
                },
                success: function(data){
                    thisObj.photos = [];
                    $.each(data.feed.entry, function(){
                        thisObj.photos.push({
                            src: this.content.src
                        });
                    });

                },
                error: function(){
                    alert('failed ;(');
                }
            });
        });
    };
    
};
var IvxSvcPhotos = function () {
    var thisObj, objGroups, objPhotos;
    thisObj = this;
    this._url = 'https://picasaweb.google.com/data/feed/api/user/';

    this._read = function (url, cb) {
        $(function(){
            $.ajax({
                dataType: 'jsonp',
                url: url,
                data: {
                    alt: 'json-in-script',
                },
                success: function(data){
                    console.log('IvxImgRsc: success');
                    cb(true, data);
                },
                error: function(jqxhr, txt, http) {
                    console.error('IvxImgRsc: read failed!: ' + txt + '/' + http);
                     cb(false, {txt: txt, http: http});
                }
            });
        });
        //todo:
        // get albums titles
        // get photo urls in album
        // store url list localstorage
        // reload game with new url image into phasor
    };
    thisObj.groups = {};
    objGroups = thisObj.groups;
 
    objGroups._fetch = function(ok, data, cb) {
        var entry;
        if (!ok) {
            console.error('IvxSvcPhotos.groups._fetch: error: ' + data)
            cb(ok, data);
            return;
        }
        thisObj.data  = data;
        objGroups.entries = [];
        $.each(data.feed.entry, function() {
            var split;
            split = this.title.$t.split('/');
            // ivanixdev: ugly hack!
            // google picasa and photos does not support nested albums
            // so we use '/' to denote psuedo nested folder path.
            if (split.length < 2) {
                return true;
            }
            entry = {};
            
            entry.path = this.title.$t;
            entry.split = split;

            entry.desc = this.media$group.media$description.$t;
            entry.count = this.gphoto$numphotos.$t;
            $.each(this.link, function() {          
                if (this.type === "application/atom+xml" && this.rel === "http://schemas.google.com/g/2005#feed") {
                   
                    entry.link = this.href;
                }
            })
            objGroups.entries.push(entry);
        });
        objGroups.sorted = objGroups.entries.sortOn('path');
        objGroups.cd();
        console.log('svcPhotos.fetch: found: ' + objGroups.entries.length);
        cb(ok);
    };
    objGroups.fetch = function(user, cb) {
        var url;
        if (!cb) {
            cb = function() {};
        }
        
        url = thisObj._url + user;
        
        thisObj._read(url, function(ok, data) {
             objGroups._fetch(ok, data, cb);
        });
    };
    objGroups.selected = null;
    objGroups._cdArr = [];
    objGroups._cdFound = {};
    
    objGroups.path = function() {
      return objGroups._cdArr.join('/');  
    };
    objGroups.folders = function() {
      return objGroups._cdFound.folders;  
    };    
    objGroups.photos = function() {
        return objGroups._cdFound.photos;
    };
    objGroups.cd = function(dir) {
        var i, sorted, length,   pattern, depth, sublist, val, count, unique;
                
        objGroups.selected = null;
        switch (dir) {
            case undefined:
            case '':
                objGroups._cdArr = [];
                break;
            case '..':
                objGroups._cdArr.pop();
                break;
            default:
                if (dir) {
                    objGroups._cdArr.push(dir);                  
                }

        }

        pattern = objGroups._cdArr.join('/');
        sorted = objGroups.sorted;
        length = sorted.length;
        sublist =[];
        depth = objGroups._cdArr.length;
        count = 0;     
        for(i = 0; i < length; i++ ) {
            var o = sorted[i];
            //console.log('dir:  looping i: ' + i);
            if (!o.path.indexOf(pattern) && pattern.length < o.path.length) {
                val = o.split[depth];
                if (!(sublist.length && sublist[sublist.length - 1] === val)) {
                    //console.log('dir: found idx: ' + i);
                    sublist.push(o.split[depth]);
                }                
            }
            if (o.path === pattern) {
                count  = o.count;
                unique = o;
            }
        }

        objGroups._cdFound =  {folders: sublist, photos: count, entry: unique };
    };

    thisObj.photos = {};
    objPhotos = thisObj.photos;
    objPhotos.entries = [];
    objPhotos._fetch = function(ok, data, cb) {

        if (!ok) {
            console.error('IvxSvcPhotos.photos._fetch: error: ' + data);
            cb(ok, data);
            return;
        }
        console.log('IvxSvcPhotos.photos.fetch: ok');
        objPhotos.data = data;
        objPhotos.entries = data.feed.entry;
        cb(ok, objPhotos.entries);
    };    
    objPhotos.fetch = function(cb) {
        var url;
        if (!objGroups._cdFound.entry) {
            console.error('IvxSvcPhotos.photos.fetch: error!');
            return false;
        }
        url = objGroups._cdFound.entry.link;
        thisObj._read(url, function(ok, data) {
            objPhotos._fetch(ok, data, cb);
        });
        return true;      
    };
};


var IvxBtn = Ivx.fcn.extend(Phaser.Button,'PSprite', function(game, idx, onclick) {
    var x, y, thisObj;

    y = 505;
    x = 20+ (120 * idx);
    console.log('IvxBtn: idx: ' + idx + ' x: ' + x + ' y: ' + y);
    //Phaser.Sprite.call(this, game, x, y, 'arrows', idx);
    
    thisObj = this;
    Phaser.Button.call(this, game, x, y, 'arrows', function() {
        //thisObj.eventClicked(idx);
        onclick();
    },
    idx, idx, idx);
    
    this.onInputDown.add(function() {
       thisObj.eventInputDown(idx); 
    });
    this.onInputUp.add(function() {
        thisObj.eventInputUp(idx);
    });
    game.add.existing(this);
    
    this.border = new Phaser.Sprite(game, 0, 0, 'arrows', 4);
    this.active = new Phaser.Sprite(game, 0, 0, 'arrows', 5);
    this.addChild(this.border);
    this.addChild(this.active);
    this.active.visible = false;

});
IvxBtn.prototype.eventClicked = function(idx) {
    console.log('eventClicked: ' + idx);  
};
IvxBtn.prototype.eventInputDown = function(idx) {
    console.log('eventInputDown: ' + idx); 
    this.active.visible = true;
};
IvxBtn.prototype.eventInputUp = function(idx) {
    console.log('eventInputUp: ' + idx); 
    this.active.visible = false;
};
var IvxTile = Ivx.fcn.extend(Phaser.Sprite,'PSprite', function(group) {
    var cellArr, thisObj, col, row, x, y;
    
    group.cellArr = group.cellArr || [];
    this.cellArr = group.cellArr;
    this.idx = this.cellArr.length;
    

    col = this.idx % ivx.div;
    row = (this.idx / ivx.div)|0;
    x = col * ivx.w + (ivx.w/2|0);
    y = row * ivx.h + (ivx.w/2|0);
 
    Phaser.Sprite.call(this, group.game, x, y, 'puzzle', this.idx);

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
    this.cellArr.push(this);
    this.orig = {
        txt: this.texture,
        angle: this.angle,
        scalex: this.scale.x,
        scaley: this.scale.y,
        x: this.x,
        y: this.y,
        tint: this.tint
    };
    group.active(this);    
});
IvxTile.prototype.matches = function (animate) {
    var o, matches;
    o = this.orig;
    matches =  (!this.angle) && (this.x === o.x) && (this.y === o.y) && (this.scale.x + this.scale.y ===2) &&  (this.texture === o.txt);

    if (this !== this.parent._active) {
        if (matches) {
            this.tint = this.orig.tint && 0xffffff;
        } else {
            this.tint = this.orig.tint && 0xff5555;
        }
    } else {
        this.tint = this.orig.tint && 0x00ff00;
    }
    matches && animate && this.parent.animateMatched();
    
    return matches;
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
    tile = this.cellArr[idx];
    this.swap(tile);
    return tile;
};
IvxTile.prototype.calcIdx = function() {
    var col, row, idx, tile;
 
    col = ((this.x  ) / ivx.w)|0;
    row = ((this.y ) / ivx.h)|0;
    
    idx = col + row * ivx.div;
    if (idx < this.cellArr.length) {
        return idx;
    }
    return this.idx;
};
IvxTile.prototype.onDragStart = function (sprite, pointer) {

    this.parent.active(this);
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
        this.parent.active(tile);
    }
    
    tile.matches(true) && this.parent.completed();
    
};


IvxTile.prototype.turnRight = function () {
    this.angle += 90; 
    this.matches(true) && this.parent.completed();
    
};
IvxTile.prototype.turnLeft = function () {
    this.angle -= 90; 
    this.matches(true) && this.parent.completed();
    
};
IvxTile.prototype.flipH = function () {
    this.scale.x *= -1; 
    this.matches(true) && this.parent.completed();
    
};
IvxTile.prototype.flipV = function () {
    this.scale.y *= -1; 
    this.matches(true) && this.parent.completed();  
}

IvxTile.prototype.shuffle = function () {
    var idx;
    
    idx = Math.floor(Math.random() * this.cellArr.length);
    this.swapIdx(idx);
    
    this.scale.x = Math.floor(Math.random()  * 2)||-1;
    this.scale.x = Math.floor(Math.random()  * 2)||-1;

    this.angle  = (Math.floor(Math.random() * 4) * 90);
    this.matches();
};
function createTileGroup (obj) {
    obj._active = null;
    obj._shuffleDELAY = 1000;    
    obj.active = function(tile) {
        var current;
        
        if (!tile) {
            return this._active;
        }
        if (this._active) {
            
             
            current = this._active;
            this._active = null;
            current.matches();
            
        }  
        if (current !== tile) {
            tile.tint = tile.orig.tint && 0x00ff00;
            this._active = tile;         
        }

    };
       
    obj.breed = function(size) {
      for(var i=0; i < size; i++) {
          new IvxTile(obj);
      }  
    };
    obj._shuffle = function() {
      var len = this.children.length;
      for(var i=0; i < len; i++) {
          this.children[i].shuffle();
      }  
    };
    obj.shuffle = function() {
        this._shuffleTO = window.setTimeout(function() {
                obj._shuffle();
            },
            obj._shuffleDELAY
        );
    };
    obj.completed = function() {
      var len, tile;
      len = this.cellArr.length;
      for(var i = 0; i < len; i++) {
          if (!this.cellArr[i].matches()) {
              return false;
          }
      }  
      tile = this._active;
      if (tile) {
          this._active = null;
          tile.matches();
      }
      console.log('puzzle complete!');
      return true;
    };
    obj.animateMatched = function() {
      console.log('animateMatched!');  
    };
    
    return obj;
}
function xxxcreateHud() {
    ivx.hud = document.querySelector('#hud');
    ivx.hud.onclick = function(e) {
        var tile;
        if (!e.target || !e.target.id || !ivx.tileGrp._active) {
            return;
        }
        tile = ivx.tileGrp._active;
        switch (e.target.id) {
            case 'btnLeft':
                tile.turnLeft();
                break;
            case 'btnRight':
                tile.turnRight();
                break;
            case 'btnFlipV':
                tile.flipV();
                break;
            case 'btnFlipH':
                tile.flipH();
                break;
        }
        e.preventDefault();
    };
    
};
function createHud() {
   var btn;
   btn = new IvxBtn(game, 0, function() {
       ivx.tileGrp._active && ivx.tileGrp._active.turnLeft();
   });
   btn = new IvxBtn(game, 1,  function() {
       ivx.tileGrp._active && ivx.tileGrp._active.flipV();
   });
   btn = new IvxBtn(game, 2,  function() {
       ivx.tileGrp._active && ivx.tileGrp._active.flipH();
   });
   btn = new IvxBtn(game, 3,  function() {
      ivx.tileGrp._active && ivx.tileGrp._active.turnRight();
   });
};
function preload() {

    var w, h;
    ivx.w = ivx.CWIDTH / ivx.div;
    ivx.h = ivx.CWIDTH / ivx.div;
    
    game.load.spritesheet('puzzle', '../assets/Sample1b.jpg', ivx.w, ivx.h);
    game.load.spritesheet('arrows', '../assets/arrows.png', 100, 100);    
}
function create() {
    
    var size, tileGrp, tile, i;
    
	saveCpu = game.plugins.add(Phaser.Plugin.SaveCPU);

    createHud();
    
    size = ivx.div * ivx.div;
    
    tileGrp = createTileGroup(game.add.group());
    tileGrp.breed(size);
    tileGrp.shuffle();
    
    ivx.tileGrp = tileGrp;    


}


var game = new Phaser.Game(ivx.CWIDTH, ivx.CHEIGHT, Phaser.AUTO, 'canvas1', { preload: preload, create: create });
