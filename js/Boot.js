//dark place  where the screen size and other general game configurations such as physics engine
// this is the fast load time that gets the initial stuff. loads assets for preload state.

var SpaceHipster = SpaceHipster || {};
SpaceHipster.Boot = function(){};

//setting game configuration and loading in the assets for the loading screen.
SpaceHipster.Boot.prototype = {
	preload: function(){//by using this. we are saying only this function can use this.
		//assets we will use in loading screen.
		this.load.image('logo', 'assets/images/logo.png');
		this.load.image('preloadbar', 'assets/images/preloader-bar.png');
	}, 
	create: function(){
		//loading screen will have a white background
		this.game.state.backgroundColor = '#fff';

		//scaling options for browser.

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 240;
		this.scale.minHeight = 170;
		this.scale.maxWidth = 2880;
		this.scale.maxHeight = 1920;

		//have the game be able to scale horizontally

		this.scale.pageAlignHorizontally = true;

		//screen size will be set automatically
		//this.scale.setScreenSize(true);

		//physics system for movement

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//initalize this. to get the menu to load.
		this.state.start('Preload');
	}
}



