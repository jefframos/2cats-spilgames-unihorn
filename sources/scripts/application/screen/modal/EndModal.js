/*jshint undef:false */
var EndModal = Class.extend({
	init:function(screen){
		this.screen = screen;
		
		this.container = new PIXI.DisplayObjectContainer();
		this.boxContainer = new PIXI.DisplayObjectContainer();
		this.bg = new PIXI.Graphics();
		this.bg.beginFill(0x151c47);
		this.bg.drawRect(0,0,windowWidth, windowHeight);
		this.bg.alpha = 0.8;
		this.container.addChild(this.bg);
		this.container.addChild(this.boxContainer);

		var self = this;

		this.back = new SimpleSprite('UI_modal_back_1.png');
        this.boxContainer.addChild(this.back.getContent());

		var thirdPart = this.back.getContent().width / 3;
		this.textScreen = new PIXI.Text('Something like\nUpgrades\nor Stats', {align:'center',font:'50px Vagron', fill:'#000', wordWrap:true, wordWrapWidth:500});
        scaleConverter(this.textScreen.width, this.back.getContent().width, 0.5, this.textScreen);
        this.textScreen.position.x = this.back.getContent().width / 2 - this.textScreen.width / 2;
        this.textScreen.position.y = 20;
        this.back.getContent().addChild(this.textScreen);

		this.closeButton = new DefaultButton('UI_button_close_1.png', 'UI_button_close_1.png');
		this.closeButton.build();
		this.closeButton.setPosition(this.back.getContent().width - this.closeButton.getContent().width,0);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		this.closeButton.clickCallback = function(){
			self.hide(function(){
				self.screen.updateable = true;
				self.screen.reset();
			});
		};
		this.back.getContent().addChild(this.closeButton.getContent());


		this.backButton = new DefaultButton('UI_button_facebook_1.png', 'UI_button_facebook_1.png');
		this.backButton.build();
		this.backButton.setPosition(thirdPart * 1 - thirdPart /2 - this.backButton.getContent().width/2,this.back.getContent().height - this.backButton.getContent().height - 20);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		this.backButton.clickCallback = function(){
			// self.hide(function(){
			// 	// self.screen.hideBars();
			// 	self.screen.screenManager.prevScreen();
			// });
		};
		this.back.getContent().addChild(this.backButton.getContent());

		this.continueButton = new DefaultButton('UI_button_ranking_1.png', 'UI_button_ranking_1.png');
		this.continueButton.build();
		scaleConverter(this.continueButton.getContent().width, this.back.getContent().width, 0.3, this.continueButton);
		this.continueButton.setPosition(thirdPart * 2 - thirdPart /2 -  this.continueButton.getContent().width/2,this.back.getContent().height - this.continueButton.getContent().height - 20);
		this.continueButton.clickCallback = function(){
			// self.hide(function(){self.screen.updateable = true;});
		};
		this.back.getContent().addChild(this.continueButton.getContent());

		this.restartButton = new DefaultButton('UI_button_twitter_1.png', 'UI_button_twitter_1.png');
		this.restartButton.build();
		this.restartButton.setPosition(thirdPart * 3 - thirdPart /2 -  this.restartButton.getContent().width/2,this.back.getContent().height - this.restartButton.getContent().height - 20);//this.backBars.getContent().height / 2 - this.continueButton.height / 2 - 10);

		this.restartButton.clickCallback = function(){
			// self.hide(function(){
			// 	self.screen.updateable = true;
			// 	self.screen.reset();
			// });
		};
		this.back.getContent().addChild(this.restartButton.getContent());

		scaleConverter(this.boxContainer.width, windowWidth, 0.8, this.boxContainer);
	},
	show:function(){
		this.screen.addChild(this);
		this.screen.blockPause = true;
		this.boxContainer.visible = true;
		this.container.parent.setChildIndex(this.container,this.container.parent.children.length -1);
		this.screen.updateable = false;

		this.boxContainer.position.x = windowWidth / 2 - this.boxContainer.width / 2;
		this.boxContainer.position.y = windowHeight / 2 - this.boxContainer.height / 2;
		this.bg.alpha = 0.8;
		this.boxContainer.alpha = 1;

		TweenLite.from(this.bg, 0.5, {alpha:0});
		TweenLite.from(this.boxContainer, 0.5, {y:-this.boxContainer.height});
	},
	hide:function(callback){
		var self = this;
		this.screen.blockPause = false;
		this.screen.updateable = true;
		TweenLite.to(this.bg, 0.5, {delay:0.1, alpha:0, onComplete:function(){
			if(self.container.parent){
				self.container.parent.removeChild(self.container);
			}
			if(callback){
				callback();
			}
			self.kill = true;
		}});
		TweenLite.to(this.boxContainer.position, 0.5, {y:-this.boxContainer.height, ease:'easeInBack'});
		TweenLite.to(this.boxContainer, 0.5, {alpha:0});
		// TweenLite.to(this.bg, 0.5, {alpha:0});
	},
	getContent:function(){
		return this.container;
	}
});