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

function preload() {
    game.load.image("merlin", "Assets/Ships/Frigs/merlin.png");
    game.load.image("condor", "Assets/Ships/Frigs/condor.png");
    game.load.image("kestrel", "Assets/Ships/Frigs/kestrel.png");
    game.load.image("background", "Assets/Backgrounds/space01.jpg");
    game.load.image("bullet", "Assets/Misc/bullet.png");
    game.load.bitmapFont("Carrier Command", "Assets/Fonts/carrier_command.png", 
        "Assets/Fonts/bitmapFonts/carrier_command.xml");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    var background = game.add.sprite(0, 0, "background");
    background.scale.setTo(1, 1);
    //cursors = game.input.keyboard.createCursorKeys();
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
    
    // bmpText = game.add.bitmapText(100, 100, "Carrier Command", "Dead Goons: 0", 22);
}

function update() {
    //game.physics.arcade.collide(player, platforms);
    
    // player updates

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
    game = new Phaser.Game(800, 600, Phaser.AUTO, "",
        { preload: preload, create: create, update: update, render: render });    
}