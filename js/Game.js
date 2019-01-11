//this is loaded in at the main menu screen. grabs all the assets previously created.
//the pixels aren't lining up correctly. some times the ship passes by a asteroid or a collectable w/o getting it.
var SpaceHipster = SpaceHipster || {};

//title screen
SpaceHipster.Game = function(){};
SpaceHipster.Game.prototype = {
	create: function(){
		//set world dimensions smallest and max size.
		this.game.world.setBounds(0,0, 1920, 1920);

		this.background = this.game.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'space');

		//create the player char
		this.player = this.game.add.sprite(this.game.world.centerX,this.game.world.centerY, 'playership');

		//this mkaes the image bigger.
		this.player.scale.setTo(2);
		//there are 4 frames [0,1,2,3] and 5 is the frequency of the change.
		this.player.animations.add('fly',[0,1,2,3], 5, true);
		this.player.animations.play('fly');

		//player initial score = 0;
		this.playerScore = 0; 

		//enable player physics

		this.game.physics.arcade.enable(this.player);
		this.playerSpeed = 120;
		this.player.body.collideWorldBounds = true;
		//sounds
		this.explosionSound = this.game.add.audio('explosion');
		this.collectSound = this.game.add.audio('collect');
		//follow the player to keep them on screen
		this.game.camera.follow(this.player);
		//add the collectable beneath the asteroids
		this.generateCollectables();
		this.generateAsteroids();
		this.showLabels();
	},
	update: function(){
		if(this.game.input.activePointer.justPressed()){
		//move in the direction of the input.
		this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);

		//collision detection between player and asteroid group
		this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);

		//overlapping between player and collectables
		this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
		}
	},

generateAsteroids: function(){
	this.asteroids = this.game.add.group();

	//enable physics in them.

	this.asteroids.enableBody = true;
	this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;

	//num gen
	var numAsteroids = this.game.rnd.integerInRange(150, 200)
	 var asteriod;

	for(let i = 0; i < numAsteroids; i++){
		asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
		//have the asteroid sizes be semi-random.
		asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40 ) /10);

		//physics properties

		asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
		asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
		asteroid.body.immovable = true;
		asteroid.body.collideWorldBounds = true;
	}
},


hitAsteroid: function(player, asteroid){
	//play explosion sound
	this.explosionSound.play();

	//player explodes and game is over.
	var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
	emitter.makeParticles('playerParticle');
	emitter.minParticleSpeed.setTo(-200, -200);
	emitter.maxParticleSpeed.setTo(200, 200);
	emitter.gravity = 0;
	emitter.start(true, 1000, null, 100);
	this.player.kill();
	//call the gameOver method in 800 milliseconds
	this.game.time.events.add(800, this.gameOver, this);
},

generateCollectables: function(){
	this.collectables = this.game.add.group();

	//enable physics on them.
	this.collectables.enableBody = true;
	this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

	//phaser random num gen

	var numCollectables = this.game.rnd.integerInRange(100,150);
	var collectable;

	for (let i = 0; i < numCollectables; i++){
			//add sprite
			collectable = this.collectables.create(this.game.world.randomX,this.game.world.randomY, 'power');
			collectable.animations.add('fly', [0,1,2,3], 5, true);
			collectable.animations.play('fly');
	}
},

collect: function(player, collectable){
	//play collect sound
	this.collectSound.play();

	//update score
	this.playerScore++;

	//add this later: 
	this.scoreLabel.text = this.playerScore;

	//remove sprite
	collectable.kill();
	},

	showLabels: function(){
		//score text
		var text = '0';
		var style = {font: "20px Arial", fill: "#fff", align: "center"};
		this.scoreLabel = this.game.add.text(this.game.width - 50, this.game.height - 50, text, style);
		this.scoreLabel.fixedToCamera = true;
	},
	gameOver: function(){
		//pass it the score as a param
		this.game.state.start('MainMenu', true, false, this.playerScore); 
		//first is true so we can refresh the game second is false to not erase the cache
	},
}
