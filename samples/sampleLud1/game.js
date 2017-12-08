console.log('Loading: game.js');

Phaser.Game.prototype.createSprite = function(name) {

    var frame =  ivxCfg.sprites[name][0];
    console.log('createSprite: name: ' + name + '  frame: '  + frame);
    var sprite = this.add.sprite(0, 0, 'sprites', frame);
    sprite.anchor.setTo(0.5);
    return sprite;
};
Phaser.Sprite.prototype.at = function(x, y) {
    this.position.setTo(x,y);
    return this;
};
var IvxGame = function() {
    var game, thisObj;
    thisObj = this;

    this.eventCompleted = function() {
        var hud;
        hud = document.querySelector('#ivx-hud-win');
        hud.style.display = "block";
        btnPlay = hud.querySelector('a');
        btnPlay.addEventListener('click',function(event) {
            var val;
            hud.style.display = "none";
            val = event.target.getAttribute('ivx-val');
            console.log('val: ' + val);
            if (val === 'yes') {
                console.log('IvxGame.eventCompleted: reloading');
                location.reload();
            }

        });
        
    };

    this.isFullScreen = function() {
        return game.scale.isFullScreen;
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
        console.log('IvxGame.fullScreen');
        this.fullScreenLocal(state);
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
    this._initGame = function() {
        game = new Phaser.Game(
            ivxCfg.canvas.width,
            ivxCfg.canvas.height,
            Phaser.AUTO, 
            'ivx-canvas', 
            null,
            false
            );

        this.game = game;
    }; 

    thisObj._init = function() {
        this._initGame();  
        this._initScenes();
        game.state.start('Invite');
    };
    thisObj._init();
  
};

window.addEventListener('DOMContentLoaded', function() {
    var ivxGame = new IvxGame();
    window.ivxGame  = ivxGame;
});
