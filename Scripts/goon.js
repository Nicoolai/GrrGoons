Goon = function (game) {
    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, "condor");
    this.scale.setTo(0.5);
    this.anchor.x = 0.33;
    this.anchor.y = 0.5;

    game.physics.arcade.enable(this);
    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.body.collideWorldBounds = true;
    this.body.bounce.y = 0.5;
    this.body.bounce.x = 0.5;
    this.body.drag.x = 50;
    this.body.drag.y = 50;
    this.body.maxVelocity = 300;
    
    this.lifespan = 3500;
    this.events.onKilled.add(function() { 
        goonsCount--;
    }, this);
    this.angle = game.rnd.angle();
};

Goon.prototype = Object.create(Phaser.Sprite.prototype);
Goon.prototype.constructor = Goon;

/**
 * Automatically called by World.update
 */
Goon.prototype.update = function() {
    // do random movement here.
    game.physics.arcade.velocityFromRotation(this.rotation, 300, this.body.velocity);
    if (Math.random() > 0.9){
        if (Math.random() > 0.7){
            this.angle = this.angle + Math.floor(Math.random() * 30) + 5;    
        }
        else{
            this.angle = this.angle - Math.floor(Math.random() * 30) + 5;
        }
    }
};