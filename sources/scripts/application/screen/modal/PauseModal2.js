/*jshint undef:false */
var PauseModal2 = Class.extend({
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

		this.backB = new SimpleSprite('UI_modal_back_1.png');
		this.back = new PIXI.DisplayObjectContainer();
		this.backB.getContent().alpha = 0;
		this.back.addChild(this.backB.getContent());
        this.boxContainer.addChild(this.back);

        // scaleConverter(this.back.width, windowWidth, 0.8, this.back);
        // this.back.position.x = windowWidth / 2 - this.back.width / 2;
        // this.back.position.y = windowHeight / 2 - this.back.height / 2;
		var thirdPart = this.back.width / 3;

		this.backButton = new DefaultButton('menu.png', 'menu_over.png');
		this.backButton.build();
		this.backButton.setPosition(30+thirdPart * 1 - thirdPart /2 - this.backButton.getContent().width/2,this.back.height / 2 - this.backButton.getContent().height / 2);//this.backBars.getContent().height / 2 - this.continueButton.height / 2 - 10);
		this.backButton.clickCallback = function(){
			self.hide(function(){
				// self.screen.hideBars();
				self.screen.endModal.show();//screenManager.prevScreen();
			});
		};
		this.back.addChild(this.backButton.getContent());

		this.continueButton = new DefaultButton('replay.png', 'replay_over.png');
		this.continueButton.build();
		// scaleConverter(this.continueButton.getContent().width, this.back.width, 0.3, this.continueButton);
		// this.continueButton.setPosition(thirdPart * 2 - thirdPart /2 -  this.continueButton.getContent().width/2,this.back.height / 2 - this.continueButton.getContent().height / 2);
		this.continueButton.setPosition(-30+thirdPart * 3 - thirdPart /2 -  this.continueButton.getContent().width/2,this.back.height / 2 - this.continueButton.getContent().height / 2);//this.backBars.getContent().height / 2 - this.continueButton.height / 2 - 10);
		this.continueButton.clickCallback = function(){
			self.hide(function(){
				self.screen.updateable = true;
				self.screen.reset();
			});
		};
		this.back.addChild(this.continueButton.getContent());

		// this.restartButton = new DefaultButton('replay.png', 'replay_over.png');
		// this.restartButton.build();
		// this.restartButton.setPosition(thirdPart * 3 - thirdPart /2 -  this.restartButton.getContent().width/2,this.back.height / 2 - this.restartButton.getContent().height / 2);//this.backBars.getContent().height / 2 - this.continueButton.height / 2 - 10);

		// this.restartButton.clickCallback = function(){
		// 	self.hide(function(){
		// 		self.screen.updateable = true;
		// 		self.screen.reset();
		// 	});
		// };
		// this.back.addChild(this.restartButton.getContent());

		scaleConverter(this.boxContainer.width, windowWidth, 0.9, this.boxContainer);



	},
	show:function(){
		this.screen.addChild(this);
		this.screen.blockPause = true;
		this.boxContainer.visible = true;
		this.container.parent.setChildIndex(this.container,this.container.parent.children.length -1);
		this.screen.updateable = false;

		this.boxContainer.position.x = windowWidth / 2 - this.boxContainer.width / 2;
		this.boxContainer.position.y = windowHeight / 2 - this.boxContainer.height / 2;
		// this.bg.alpha = 0.8;
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
		// TweenLite.to(this.boxContainer.position, 0.5, {y:-this.boxContainer.height, ease:'easeInBack'});
		TweenLite.to(this.boxContainer, 0.5, {alpha:0});
		// TweenLite.to(this.bg, 0.5, {alpha:0});
	},
	getContent:function(){
		return this.container;
	}
});