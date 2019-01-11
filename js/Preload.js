//checks if SpaceHipster exists, if it does use that otherwise make the object.
var SpaceHipster = SpaceHipster || {};

//loading in game assets.
SpaceHipster.Preload = function(){};
//this is the slower load that gets all the rest of the assets
SpaceHipster.Preload.prototype = {
	preload: function(){
		//show logo in loading screen.
		this.splash = this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'logo');
		//keep this picture near the middle of the screen.
		this.splash.anchor.setTo(0.5);
		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		//load game assets
		this.load.image('space', 'assets/images/space.png');
		this.load.image('rock', 'assets/images/rock.png');
		this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
		this.load.spritesheet('power', 'assets/images/power.png',12,12);
		//player dying image.
		this.load.image('playerParticle', 'assets/images/player-particle.png');
		this.load.audio('collect', 'assets/audio/collect.ogg');
		this.load.audio('explosion', 'assets/audio/explosion.ogg');
	},
	create: function(){//load main menu
		this.state.start('MainMenu');
	}

};

