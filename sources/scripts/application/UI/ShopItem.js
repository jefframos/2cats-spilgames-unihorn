/*jshint undef:false */
var ShopItem = Class.extend({
	init:function(screen, type, arrayModels, arrayPlaced){
		this.screen = screen;
		this.type = type;
		this.arrayModels = arrayModels;
		this.arrayPlaced = arrayPlaced;
		this.container = new PIXI.DisplayObjectContainer();
	},
	build:function(model){
		this.model = model;


        
		this.backShopItem = new SimpleSprite('balao_nope.png');

		this.backScroll = new PIXI.Graphics();
        this.backScroll.lineStyle(2, 0xFFFFFF);
        this.backScroll.beginFill(0x724d7c);
        this.backScroll.drawRoundedRect (0,0,windowWidth * 0.9, this.backShopItem.getContent().height * 1.4, this.backShopItem.getContent().height * 0.25);
        this.backScroll.alpha = 1;
        this.container.addChild(this.backScroll);

		this.container.addChild(this.backShopItem.getContent());
		this.backShopItem.getContent().position.x = this.backShopItem.getContent().width * 0.1;
		this.backShopItem.getContent().position.y = this.backShopItem.getContent().height * 0.2;

		this.hornImage = new SimpleSprite(this.model.cover);
		this.backShopItem.getContent().addChild(this.hornImage.getContent());
		scaleConverter(this.hornImage.getContent().height, this.backShopItem.getContent().height, 0.7, this.hornImage);

		this.hornImage.getContent().position.x = this.backShopItem.getContent().width / 2 - this.hornImage.getContent().width / 2;
		this.hornImage.getContent().position.y = this.backShopItem.getContent().height / 2 - this.hornImage.getContent().height / 2;

		this.labelName = new PIXI.Text(this.model.label, {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500});
		scaleConverter(this.labelName.height, this.backShopItem.getContent().height, 0.3, this.labelName);
		this.labelName.position.x = this.backScroll.width - this.labelName.width - this.backShopItem.getContent().width * 0.15;
		this.labelName.position.y = this.backShopItem.getContent().position.y;
		// this.labelName.position.y = 20;
		this.container.addChild(this.labelName);
		
		var self = this;

		// alert(this.backShopItem.getContent().height);

		

		this.equipButton = new DefaultButton('botao_equip.png', 'botao_equip.png');
		this.equipButton.build();
		// this.equipButton.addLabel(new PIXI.Text('EQUIP', {font:'30px Vagron', fill:'#FFFFFF'}), 33,5);
		// this.equipButton.setPosition(this.backScroll.width - this.equipButton.getContent().width - this.backShopItem.getContent().height * 0.1,this.backShopItem.getContent().height - this.equipButton.getContent().height + this.backShopItem.getContent().position.y);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		this.equipButton.setPosition(this.backScroll.width - this.equipButton.getContent().width - this.backShopItem.getContent().width * 0.15,this.backShopItem.getContent().height - this.equipButton.getContent().height + this.backShopItem.getContent().position.y);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		// this.equipButton.clickCallback = this.equipButton.mouseDownCallback = function(){
		// 	self.equipButton.down = true;
		// };

		this.equipButton.clickCallback = this.equipButton.mouseDownCallback = function(){
			// if(!self.equipButton.down){
			// 	return;
			// }
			APP.audioController.playSound('pop');
			self.equipButton.down = false;
			var targetArray = [];//self.screen.shopList;
			if(self.type === 'horn'){
				APP.currentHornModel = self.model;
				targetArray = self.screen.hornList;
			}else if(self.type === 'cloth'){
				APP.currentClothModel = self.model;
				targetArray = self.screen.clothList;
			}else if(self.type === 'env'){
				APP.currentEnvModel = self.model;
				targetArray = self.screen.envList;
			}
			// targetArray = this.arrayPlaced;
			for (var i = targetArray.length - 1; i >= 0; i--) {
				targetArray[i].updateStats();
			}
			self.updateStats();
		};


		this.equipped = new SimpleSprite('botao_equipped.png');
		//new PIXI.Text('EQUIPPED', {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500});
		scaleConverter(this.equipped.getContent().height, this.equipButton.getContent().height, 1, this.equipped.getContent());
		this.equipped.getContent().position.x = this.backScroll.width - this.equipped.getContent().width - this.backShopItem.getContent().width * 0.15;
		this.equipped.getContent().position.y = this.backShopItem.getContent().height - this.equipped.getContent().height  + this.backShopItem.getContent().position.y;
		// this.equipped.getContent().position.y = 20;

		this.buyButton = new DefaultButton('botao_buy.png', 'botao_buy.png');
		this.buyButton.build();
		this.buyButton.addLabel(new PIXI.Text(this.model.coast, {font:'30px Vagron', fill:'#FFFFFF', stroke:'#006f00', strokeThickness:4}), 50,4);
		this.buyButton.setPosition(this.backScroll.width - this.buyButton.getContent().width - this.backShopItem.getContent().width * 0.15,this.backShopItem.getContent().height - this.buyButton.getContent().height + this.backShopItem.getContent().position.y);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		// this.buyButton.clickCallback = this.buyButton.mouseDownCallback = function(){
		// 	self.buyButton.down = true;
		// };

		this.buyButton.clickCallback = this.buyButton.mouseDownCallback = function(){
			// if(!self.buyButton.down){
			// 	return;
			// }
			// alert(self.model.coast);
			if(self.model.coast > APP.appModel.totalPoints){
				return;
			}
			APP.audioController.playSound('star');
			APP.appModel.totalPoints -= self.model.coast;
			var targetArray = [];//self.screen.shopList;
			if(self.type === 'horn'){
				APP.currentHornModel = self.model;
				APP.currentHornModel.enabled = true;
				targetArray = self.screen.hornList;
			}else if(self.type === 'cloth'){
				APP.currentClothModel = self.model;
				APP.currentClothModel.enabled = true;
				targetArray = self.screen.clothList;
			}else if(self.type === 'env'){
				APP.currentEnvModel = self.model;
				APP.currentEnvModel.enabled = true;
				targetArray = self.screen.envList;
			}
			for (var i = targetArray.length - 1; i >= 0; i--) {
				targetArray[i].updateStats();
			}
			
			self.screen.updateCoins();
			self.updateStats();
		};

		this.updateStats();

		
	},
	updateStats:function(){
		
		
		if(this.equipped.getContent() && this.equipped.getContent().parent){
			this.equipped.getContent().parent.removeChild(this.equipped.getContent());
		}
		if(this.equipButton.getContent() && this.equipButton.getContent().parent){
			this.equipButton.getContent().parent.removeChild(this.equipButton.getContent());
		}
		if(this.buyButton.getContent() && this.buyButton.getContent().parent){
			this.buyButton.getContent().parent.removeChild(this.buyButton.getContent());
		}

		var isEquiped = false;
		if(this.type === 'horn'){
			if(APP.currentHornModel.id === this.model.id){
				this.container.addChild(this.equipped.getContent());
				isEquiped = true;
			}
		}else if(this.type === 'cloth'){
			if(APP.currentClothModel.id === this.model.id){
				this.container.addChild(this.equipped.getContent());
				isEquiped = true;
			}
		}else if(this.type === 'env'){
			if(APP.currentEnvModel.id === this.model.id){
				this.container.addChild(this.equipped.getContent());
				isEquiped = true;
			}
		}
		if(isEquiped){
			this.backShopItem.getContent().setTexture(new PIXI.Texture.fromImage('balao_yep.png'));
		}else{
			this.backShopItem.getContent().setTexture(new PIXI.Texture.fromImage('balao_nope.png'));
		}
		if(!isEquiped && this.model.enabled){
			this.container.addChild(this.equipButton.getContent());
		}else if(!this.model.enabled){
			this.container.addChild(this.buyButton.getContent());
		}
		// alert('updateStats here');
	},
	getContent:function(){
		return this.container;
	}
});