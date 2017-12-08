
var IvxSprite = function(ivxGame, name, opts) {
    
        var game = ivxGame.game;
        var x, y;
        var pos;
        if(opts && opts.pos) {
            pos = opts.pos;
        }
        if (!pos) {
            x = game.rnd.integerInRange(0, ivxCfg.canvas.width);
            y = game.rnd.integerInRange(0,ivxCfg.canvas.height);
        } else {
            x = pos[0];
            y = pos[1];
        }

        var sprite = game.createSprite(name).at(ivxCfg.canvas.halfWidth, ivxCfg.canvas.halfHeight);
        sprite.at(x, y);
        var scale = ivxCfg.scale[name];
        if(scale) {
            sprite.scale.setTo(scale);
        }



        if (!opts || !opts.physicsNone ) {
            game.physics.enable(sprite, Phaser.Physics.ARCADE);
            sprite.body.bounce.y = 0.25;
            if (!opts || !opts.ignoreWorld ) {
                sprite.body.collideWorldBounds = true;
            }
            var bd = ivxCfg.bodySize[name];
            if(bd && bd.length === 4 ) {
                sprite.body.setSize(bd[0], bd[1],bd[2], bd[3]);
            }
        }

        //ivxGame.groupMain.add(sprite);
        //sprite.body.setSize(w,h,offx, offy)
        return sprite;

};
var IvxSpriteArr = function(ivxGame, name, max) {
    var game = ivxGame.game;
    var count = game.rnd.integerInRange(1,max);
    var arr = [];
 
    
    console.log('IvxSpriteArr: name: ' + name + '  count: ' + count );
    for(var i = 0; i < count; i += 1) {
        var sprite = IvxSprite(ivxGame, name);
        ivxGame.groupMain.add(sprite);
        arr.push(sprite);

    }
    return arr;   
};
var IvxHouse = function(ivxGame) {
    var arr = IvxSpriteArr(ivxGame,'house', 5);
    return arr;
};
var IvxTree = function(ivxGame) {
    var arr = IvxSpriteArr(ivxGame,'tree', 5);
    return arr;
};
var IvxSnowman = function(ivxGame) {
    var arr = IvxSpriteArr(ivxGame,'snowman', 5);
    var game = ivxGame.game;
    return arr;
};
