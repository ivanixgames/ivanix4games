
var IvxDeer = function(ivxGame, idx) {

    var game = ivxGame.game;
    var cfgDeer = ivxCfg.deer;

    var odds = ivxCfg.poop.odds;
    var poopFactory = ivxGame.poopFactory;

    var updateOther = function() {
        if(!poopFactory.enable) {
            return;
        }
        var flip = game.rnd.integerInRange(1, odds.max);
        if(!(flip % odds.div)) {
            poopFactory.launch(this);
        }
    };
    var updateFollow = function() {
        var xp, diffy, diffx;

        var next = this.next;
        if(!next) {
            return;
        }

        diffy = next.y - this.y;
        next.y -= (diffy)/2;

        next.speedX = this.speedX;
        if (this.scale.x > 0 && next.scale.x < 0) {
            next.scale.x *= -1;
        } 
        if (this.scale.x < 0 && next.scale.x > 0) {
            next.scale.x *= -1;
        } 
        if (next.scale.x > 0) {
            xp = this.x - cfgDeer.spacing;
            diffx = next.x - xp;
            next.x -= (diffx)/3;
              
        } else {
            xp = this.x + cfgDeer.spacing;
            diffx = next.x - xp;
            next.x -= (diffx)/3;
        }

        updateOther.call(this);
        
    };
      
    var updateFirst = function () {
        //todo:  update pos;
    
        if (this.y > 170) {
            this.pullUp = true;
        }
        if (this.pullUp) {
 
          //this.body.acceleration.y -= game.rnd.integerInRange(10,10);
          this.body.acceleration.y = -450;
        }
        if (this.y <  150) {
            this.pullUp = false;
            this.body.acceleration.y=40;
        }
        if (this.y < 10) {
            this.y = 10;
            this.body.acceleration.y=70;
        }
        if (this.y > 550) {
            this.y = 550;
            this.body.acceleration.y=-500;
        }
  
        if (this.x > ivxCfg.deer.rightWall) {
            this.scale.x *= -1;
            this.x = ivxCfg.deer.rightWall;
        }
        if (this.x < ivxCfg.deer.leftWall) {
            this.scale.x *= -1;
            this.x = ivxCfg.deer.leftWall;
        }
        if (this.scale.x > 0) {
            this.x += this.speedX;
        } else {
            this.x -= this.speedX;
        }
        
        
        updateFollow.call(this);
    };

    var sprite;  
    if(!idx) {
        sprite = IvxSprite(ivxGame, 'deer',{ignoreWorld: true} );
        sprite.update = updateFirst;         
    } else {
        sprite = IvxSprite(ivxGame, 'deer', {xxphysicsNone: true, ignoreWorld: true});
        sprite.update = updateFollow;
    }
    sprite.body.allowGravity = false;
    sprite.speedX =  game.rnd.integerInRange(1,25);
    return sprite;

};
 
var IvxSled = function(ivxGame) {

    var game = ivxGame.game;
    var arr =[];

    var first, last;
    var count = game.rnd.integerInRange(1, 12);
    
    for(var i = 0; i < count; i += 1) {
        var deer = IvxDeer(ivxGame, i);
        if(i == 0)  {
            first = deer;
        } else {
            last.next = deer;
            deer.y = last.y;
            deer.x = last.x - 50;
        }
        last = deer;
        ivxGame.groupMain.add(deer);
    };
    first.at(0,300);
    var sled = IvxSprite(ivxGame, 'sled', {xxphysicsNone: true, ignoreWorld: true});
    sled.body.allowGravity = false;
    var elf = IvxSprite(ivxGame, 'elf', {physicsNone: true, pos: [20,-20]});
    sled.addChild(elf);
    last.next = sled;

    return first;
};
var IvxSleds= function(ivxGame) {
    var arr = [];
    var game = ivxGame.game;
    var count = game.rnd.integerInRange(1, 5);

    for(var i = 0; i < count; i += 1) {
        var sled  = IvxSled(ivxGame);
        sled.x = game.rnd.integerInRange(-100, 900);
        sled.y = game.rnd.integerInRange(-100, 400);        
        arr.push(sled);
    }

    return arr;
};