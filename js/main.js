//this file holds on the game code.
//main menu loads up correctly, however in the actual game, spacing of the asteroids / collectables and screen is not currently working
//create a unique namespace for game so we avoid conflicts with other libraries. if the object exists use it, otherwise make it.
var SpaceHipster = SpaceHipster || {};
/*
var canvas_width =  (window.innerWidth * window.devicePixelRatio) / 4;
var canvas_height = (window.innerHeight * window.devicePixelRatio) / 4;

*/
//set the canvas to be the width and height of the browser.
SpaceHipster.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
SpaceHipster.game.state.add('Boot', SpaceHipster.Boot);
//uncomment these as we create them in the tutorial.
SpaceHipster.game.state.add('Preload', SpaceHipster.Preload);
SpaceHipster.game.state.add('MainMenu', SpaceHipster.MainMenu);
SpaceHipster.game.state.add('Game', SpaceHipster.Game);
SpaceHipster.game.state.start('Boot');