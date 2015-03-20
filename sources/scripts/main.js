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
	return window.innerHeight > window.innerWidth;
}

function possibleFullscreen(){
	var elem = gameView;
	return  elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
}

function updateResolution(orientation, scale){
	if(orientation === 'portait'){
		if(screen.height > screen.width){
			windowWidth = screen.width * scale;
			windowWidthVar = screen.width;
			
			if(possibleFullscreen()){
				windowHeight =  screen.height * scale;
				windowHeightVar =  screen.height;
				
			}else{
				windowHeight =  window.outerHeight * scale;
				windowHeightVar =  window.outerHeight;
			}
			

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
	realWindowWidth = windowWidth;
	realWindowHeight = windowHeight;
}
function update() {
	requestAnimFrame(update );
	if(!init && (isPortait() || !testMobile())){
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

		renderer.view.style.width = windowWidth+'px';
		renderer.view.style.height = windowHeight+'px';

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


var isfull = false;
function fullscreen(){

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