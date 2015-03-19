/*jshint undef:false */
// var meter = new FPSMeter();
function testMobile() {
	return Modernizr.touch;// || window.innerWidth < 600;//true;// Modernizr.touch || window.innerWidth < 600;
}

var res = {x:850 / 2, y:1200 / 2};
// var res = {x:750 / 2, y:1200 / 2};
var resizeProportional = true;

var windowWidth = res.x;
var windowHeight = res.y;

var realWindowWidth = res.x;
var realWindowHeight = res.y;

var gameScale = 1.3;

var windowWidthVar = window.innerHeight;
var windowHeightVar = window.innerWidth;

var gameView = document.getElementById('game');
console.log(gameView);
var ratio = 1;

var init = false;

var renderer;
var APP;

var retina = 1;//window.devicePixelRatio >= 2 ? 2 : 1;

function isPortait(){
	return screen.height > screen.width;
}

function updateResolution(orientation, scale){
	if(orientation === 'portait'){
		if(screen.height > screen.width){
			windowWidth = screen.width * scale;
			windowHeight =  window.innerHeight * scale;
			
			windowWidthVar = screen.width;
			windowHeightVar =  window.innerHeight;

		}else{
			windowWidth = screen.height * scale;
			windowHeight = screen.width * scale;

			windowWidthVar = screen.height;
			windowHeightVar = screen.width;
		}
	}else{
		if(screen.height < screen.width){
			windowWidth = screen.width * scale;
			windowHeight = screen.height * scale;

			windowWidthVar = screen.width;
			windowHeightVar = screen.height;
		}else{
			windowWidth = screen.height * scale;
			windowHeight = screen.width * scale;

			windowWidthVar = screen.height;
			windowHeightVar = screen.width;
		}
	}
	// windowWidth = screen.height * scale;
	// windowHeight = screen.width * scale;
	realWindowWidth = windowWidth;
	realWindowHeight = windowHeight;

	// alert(realWindowWidth+' - '+screen.width+' - '+scale);
}
function update() {
	requestAnimFrame(update );
	if(!init && isPortait()){
		// resizeProportional = true;

		windowWidth = res.x;
		windowHeight = res.y;

		realWindowWidth = res.x;
		realWindowHeight = res.y;

		// gameScale = 1.3;

		
		if(testMobile()){
			updateResolution('portait', gameScale);
			renderer = PIXI.autoDetectRecommendedRenderer(realWindowWidth, realWindowHeight, {antialias:true, resolution:retina, view:gameView});
		}else{
			renderer = PIXI.autoDetectRenderer(realWindowWidth, realWindowHeight, {antialias:true, resolution:retina, view:gameView});
		}
		// renderer = PIXI.autoDetectRecommendedRenderer(realWindowWidth, realWindowHeight, {antialias:true, resolution:window.devicePixelRatio, view:gameView});
		
		console.log(renderer);
		renderer.view.style.width = windowWidth+'px';
		renderer.view.style.height = windowHeight+'px';

		// alert(realWindowWidth+' - '+ realWindowHeight+' - '+ retina +' - '+windowWidth);
		APP = new Application();
		APP.build();
		APP.show();

		init = true;
		// alert('init');
	}
	
	// meter.tickStart();
	var tempRation =  (window.innerHeight/windowHeight);
	var ratioRez = resizeProportional ? tempRation < (window.innerWidth/realWindowWidth)?tempRation:(window.innerWidth/realWindowWidth) : 1;
	windowWidthVar = realWindowWidth * ratioRez * ratio;
	windowHeightVar = realWindowHeight * ratioRez * ratio;

	//proportional
	if(windowWidthVar > realWindowWidth)
	{
		windowWidthVar = realWindowWidth;
	}
	if(windowHeightVar > realWindowHeight)
	{
		windowHeightVar = realWindowHeight;
	}
	if(renderer){
		renderer.view.style.width = windowWidthVar+'px';
		renderer.view.style.height = windowHeightVar+'px';

		
		APP.update();
		renderer.render(APP.stage);
	}
	// meter.tick();
}



var initialize = function(){
	PIXI.BaseTexture.SCALE_MODE = PIXI.scaleModes.NEAREST;
	requestAnimFrame(update);
};

function possibleFullscreen(){
	var elem = gameView;
	return  elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
}
var isfull = false;
function fullscreen(){
	// if(isfull && possibleFullscreen()){
	// 	return;
	// }
	var elem = gameView;
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen();
	}

	// windowWidth = window.innerWidth * gameScale;
	// windowHeight = window.innerHeight * gameScale;
	// realWindowWidth = windowWidth;
	// realWindowHeight = windowHeight;


	// windowWidth = screen.height * gameScale;
	// windowHeight = screen.width * gameScale;
	// realWindowWidth = windowWidth;
	// realWindowHeight = windowHeight;

	updateResolution('portait', gameScale);

	renderer.width = realWindowWidth;
	renderer.height = realWindowHeight;
	isfull = true;
}



(function() {
	var App = {
		init: function () {
			initialize();
		}
	};
	App.init();
})();
// if(!possibleFullscreen())
// {
// }