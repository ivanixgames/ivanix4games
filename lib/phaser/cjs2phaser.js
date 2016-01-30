/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Ivanix Mobile LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS ofi  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

/*
 * Purpose:  Dynamic load and convert sprites 
 *           into Phaser BitmapData and Sprites
 *           from Adobe Flash CC exported CreateJS files.
 *
 * Requires:
 *           - Phaser 2.0.7
 *           - CreateJS
 *
 *
 */

(function(window, Phaser) {

    var initFcn = function (game, cjsLib) {
        'use strict';
         Cjs2Phaser.game = game;
         Cjs2Phaser.cjsLib = cjsLib;
         Cjs2Phaser.CJSFPS = cjsLib.properties.fps;
    };
    var extendFcn = function (child, parent, alias) {
        'use strict';
    
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;
        child.prototype._super = parent.prototype;

        if (alias) {
            var superalias = '_$$'+ alias ;
            if (parent.prototype[superalias]) {
                throw new Error('alias super class already exists! (' + superalias +')');
            } else {
                child.prototype[superalias] = parent;
            }
            superalias = '_$'+ alias ;
            if (parent.prototype[superalias]) {
                throw new Error('alias super proto already exists! (' + superalias +')');
            } else {
                child.prototype[superalias] = parent.prototype;
            }
        }
        child.prototype._$super = function(alias, method) {
            var args = Array.prototype.slice.call(arguments,2);
            return this['_$'+alias][method].apply(this,args);
        };

    };    
    var BitmapData = function (game, cjsLibObj, boundary) {
        'use strict';
        var thisObj, game, cjsSprite, bounds, cjsStage, key, cfg;

        thisObj = this;

        cjsSprite = new cjsLibObj();

        bounds = cjsSprite.nominalBounds;
        cfg = {width: bounds.width, height: bounds.height, x: -bounds.x, y: -bounds.y};
        if (boundary) {

            if (boundary.srclib) {
                bounds = Cjs2Phaser.cjsLib.properties;
                cfg = {width: bounds.width, height: bounds.height, x: 0, y: 0};
            }
            if (boundary.width) {
                cfg.width = boundary.width;
            }
            if (boundary.height) {
                cfg.height = boundary.height;
            }
            if (boundary.x) {
                cfg.x = boundary.x;
            }
            if (boundary.y) {
                cfg.y = boundary.y;
            }
        }

        key = game.rnd.uuid();
        Phaser.BitmapData.call(thisObj, game, key, cfg.width, cfg.height);

        if(cfg.x) {
            cjsSprite.x = cfg.x;
        }
        if(cfg.y) {
            cjsSprite.y = cfg.y;
        }

        cjsStage = new createjs.Stage(thisObj.canvas);
        cjsStage.addChild(cjsSprite);
        //cjsStage.update();

        thisObj.cjsSprite = cjsSprite;
        thisObj.cjsStage = cjsStage;

        // thisObj.scale2bounds(vw, vh);
        thisObj.cjsUpdate();
    };
    extendFcn(BitmapData, Phaser.BitmapData);
    BitmapData.prototype.cjsUpdate = function () {
        'use strict';
        // console.log('Cjs2Phaser.BitmapData.cjsUpdate:');
        this.cjsStage.update();
        this.dirty = true;
    };
    BitmapData.prototype.scale2bounds = function (w, h) {
        'use strict';
        console.log('Cjs2Phaser.BitmapData.scale2bounds: w: ' + w + ' h: ' + h);
        var bounds, nw, nh, scaleX, scaleY, ctrX, ctrY;
        bounds = this.cjsSprite.nominalBounds;

        nw = bounds.width;
        nh = bounds.height;


        if (typeof w === 'undefined' || w === '') {
            w = this.width;
        }
        if (typeof h === 'undefined' || h === '') {
            h = this.height;
        }

        scaleX = w / nw;
        scaleY = h / nh;

        ctrX = Math.floor((this.width - w) / 2);
        ctrY = Math.floor((this.height - h) / 2);

        this.cjsSprite.scaleX = scaleX;
        this.cjsSprite.scaleY = scaleY;
        this.cjsSprite.x  = ctrX - bounds.x * scaleX;
        this.cjsSprite.y =  ctrY - bounds.y * scaleY;

    };
    var Sprite = function (cjsLibObj,  x, y, boundary) {
        'use strict';
        var thisObj;
        thisObj = this;
        thisObj.game = Cjs2Phaser.game;
        thisObj.cjsTS = 0;
        thisObj.cjsBMD = new BitmapData(thisObj.game, cjsLibObj, boundary);
        thisObj.cjsSprite = thisObj.cjsBMD.cjsSprite;
        thisObj.CJSFPS = Cjs2Phaser.CJSFPS;
        if (typeof x === 'undefined' || x === '') {
            x = 0;
        }
        if (typeof y === 'undefined' || y === '') {
            y = 0;
        }
        Phaser.Sprite.call(thisObj, game, x, y, thisObj.cjsBMD);

        if (thisObj.cjsSprite.timeline) {
            thisObj.update = thisObj.cjsUpdate;
        }
    };
    extendFcn(Sprite, Phaser.Sprite);
    Sprite.prototype.cjsBound2Body = function () {
        'use strict';
        var bounds;
        if (this.body) {
            bounds = this.cjsSprite.nominalBounds;
            this.body.width = bounds.width;
            this.body.height = bounds.height;
        }
    };
    Sprite.prototype.cjsUpdate = function () {
        'use strict';
        var currentTS;
        // console.log('Cjs2Phaser.Sprite.cjsUpdate:');
        currentTS = Date.now();
        if (this.CJSFPS && this.cjsTS < currentTS) {
            this.cjsTS = Date.now() + (1000/this.CJSFPS);
            this.cjsBMD.cjsUpdate();
        }
    };
    Sprite.prototype.update = function () {
 
    };
    var Cjs2Phaser = {
        init: initFcn,
        extend: extendFcn,
        BitmapData: BitmapData,
        Sprite: Sprite
    };
    window.Cjs2Phaser = Cjs2Phaser;
} (window, Phaser));
