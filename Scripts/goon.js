Goon = function (game, maxX, maxY) {
    Phaser.Sprite.call(this, game, game.rnd.between(60, maxX-60), game.rnd.between(60, maxY-60), "condor");
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
    this.body.maxVelocity = 200;
    
};

Goon.prototype = Object.create(Phaser.Sprite.prototype);
Goon.prototype.constructor = Goon;

/**
 * Automatically called by World.update
 */
Goon.prototype.update = function() {
    // do random movement here.
    //game.physics.arcade.collide(bullets, this, collisionCallback, processCallback, this);
};