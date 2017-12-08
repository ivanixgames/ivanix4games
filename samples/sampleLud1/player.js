
var IvxPlayer = function(ivxGame) {
    
        var game = ivxGame.game;
        var name = 'player';
        var cfgPlayer = ivxCfg.player;
        
        var sprite = IvxSprite(ivxGame,'player', {pos: [ivxCfg.canvas.halfWidth, ivxCfg.canvas.halfHeight]})
        ivxGame.groupMain.add(sprite);
        var fireBtn = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        var cursors = game.input.keyboard.createCursorKeys();


        sprite.update = function() {
            if (this.alive)
            {
                //  Reset the this, then check for movement keys
                //this.body.velocity.setTo(0, 0);
                this.body.velocity.x = 0;
        /*
                if (cursors.left.isDown)
                {
                    this.body.velocity.x = -cfgPlayer.speed;
                }
                else if (cursors.right.isDown)
                {
                    this.body.velocity.x = cfgPlayer.speed;
                }
        */

                if (cursors.left.isDown) {
                    this.body.velocity.x = -cfgPlayer.speed;
                    if (this.scale.x > 0) {
                        this.scale.x *= -1;
                    }
                }
                if (cursors.right.isDown) {
                    this.body.velocity.x = cfgPlayer.speed;
                    if (this.scale.x < 0) {
                        this.scale.x *= -1;
                    }
                }

                cursors.up.isDown && (this.body.velocity.y = -cfgPlayer.speed);
                
                if (fireBtn.isDown)
                {
                    console.warn('player: fire');
                }

        
                //  Run collision
                //game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
                //game.physics.arcade.overlap(enemyBullets, this, enemyHitsPlayer, null, this);
            }            
        };

        return sprite;
};
    

