var game;
var cursors;
var player;

var leftKey;
var rightKey;
var upkey;
var spaceKey;

var bullets;
var fireRate = 200;
var nextFire = 0;

var bmpText;
var deadGoons = 0;

var goons = [];
var goonsCount = 0;

var explosions;

function preload() {
    game.load.image("merlin", "Assets/Ships/Frigs/merlin.png");
    game.load.image("condor", "Assets/Ships/Frigs/condor.png");
    game.load.image("kestrel", "Assets/Ships/Frigs/kestrel.png");
    game.load.image("background", "Assets/Backgrounds/space01.jpg");
    game.load.image("bullet", "Assets/Misc/bullet.png");
    game.load.bitmapFont("Carrier Command", "Assets/Fonts/carrier_command.png", 
        "Assets/Fonts/bitmapFonts/carrier_command.xml");
    game.load.spritesheet("explosion", "Assets/Misc/explosion.png", 100, 100, 42);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var background = game.add.sprite(0, 0, "background");
    background.scale.setTo(1, 1);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.UP, Phaser.Keyboard.SPACEBAR ]);
    
    player = game.add.sprite(400, 300, "merlin");
    player.scale.setTo(0.5, 0.5);
    
    player.anchor.x = 0.33;
    player.anchor.y = 0.5;

    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.5;
    player.body.bounce.x = 0.5;
    player.body.drag.x = 50;
    player.body.drag.y = 50;
    player.body.maxVelocity = 200;
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, "bullet");
    bullets.setAll("checkWorldBounds", true);
    bullets.setAll("outOfBoundsKill", true);
    
    // goons = game.add.group();
    // goons.enableBody = true;
    // goons.physicsBodyType = Phaser.Physics.ARCADE;
    // goons.createMultiple(20, "condor");
    // goons.setAll("checkWorldBounds", true);
    // goons.setAll("outOfBoundsKill", true);
    // goons.scale.setTo(0.5, 0.5);
    // // goons.anchor.x = 0.33;
    // // goons.anchor.y = 0.5;
    // // goons.body.drag.x = 50;
    // // goons.body.drag.y = 50;
    // // goons.drag.maxVelocity = 200;
    // game.physics.arcade.enable(goons);

}

function createGoon(){
    var goon = game.add.sprite(game.rnd.between(100, 700), game.rnd.between(100, 500), "condor");
    
}

function processCallback (obj1, obj2) {

    //  This function can perform your own additional checks on the 2 objects that collided.
    //  For example you could test for velocity, health, etc.
    //  This function needs to return either true or false. If it returns true then collision carries on (separating the two objects).
    //  If it returns false the collision is assumed to have failed and aborts, no further checks or separation happen.

    if (obj1.body.speed > obj2.body.speed)
    {
        return true;
    }
    else
    {
        return true;
    }

}

function collisionCallback (obj1, obj2) {
    var explosion = game.add.sprite(obj2.x, obj2.y, "explosion");
    explosion.animations.add("explode");
    explosion.animations.play("explode", 50, false);
    
    obj1.kill();
    obj2.kill();
    deadGoons++;
}

function update() {
    game.physics.arcade.collide(player, goons);
    game.physics.arcade.collide(goons, goons);
    game.physics.arcade.collide(bullets, goons, collisionCallback, processCallback, this);
    
    //player updates
    if (Math.random() > (0.97 - (game.time.totalElapsedSeconds() / 100))){
        // Spawn a goon.
        var goon = new Goon(game);
        game.add.existing(goon);
        goons.push(goon);
        goonsCount++;
    }

    if (leftKey.isDown)
    {
        player.body.angularVelocity = -200;
    }
    else if (rightKey.isDown)
    {
        player.body.angularVelocity = +200;
    }
    else
    {
        player.body.angularVelocity = 0;
    }
    
    if (upKey.isDown){
        game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
    }
    else
    {
        player.body.acceleration.set(0);
    }
    
    if (spaceKey.isDown){
        // shoot
        fire();
    }
}

function render(){
    game.debug.text("Dead goons: " + deadGoons, 32, 32);
    //game.debug.text("Time: " + game.time.totalElapsedSeconds(), 32, 64);
}

function fire() {
    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        var bullet = bullets.getFirstDead();
        bullet.reset(player.x, player.y);

        game.physics.arcade.velocityFromAngle(player.angle, 400, bullet.body.velocity);
    }
}

function init(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, "gameUi",
        { preload: preload, create: create, update: update, render: render });    
}