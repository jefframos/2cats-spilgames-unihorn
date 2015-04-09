/*jshint undef:false */
var ShopItem = Class.extend({
	init:function(screen){
		this.screen = screen;
		this.container = new PIXI.DisplayObjectContainer();
	},
	build:function(model){
		this.model = model;


        
		this.backShopItem = new SimpleSprite('back_shop_button.png');

		this.backScroll = new PIXI.Graphics();
        this.backScroll.beginFill(0x000000);
        this.backScroll.drawRect(0,0,windowWidth, this.backShopItem.getContent().height * 1.2);
        this.backScroll.alpha = 0.2;
        this.container.addChild(this.backScroll);

		this.container.addChild(this.backShopItem.getContent());
		this.backShopItem.getContent().position.x = this.backShopItem.getContent().height * 0.1;
		this.backShopItem.getContent().position.y = this.backShopItem.getContent().height * 0.1;

		this.hornImage = new SimpleSprite(this.model.cover);
		this.backShopItem.getContent().addChild(this.hornImage.getContent());
		scaleConverter(this.hornImage.getContent().height, this.backShopItem.getContent().height, 0.7, this.hornImage);

		this.hornImage.getContent().position.x = this.backShopItem.getContent().width / 2 - this.hornImage.getContent().width / 2;
		this.hornImage.getContent().position.y = this.backShopItem.getContent().height / 2 - this.hornImage.getContent().height / 2;

		this.labelName = new PIXI.Text(this.model.label, {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500});
		scaleConverter(this.labelName.height, this.backShopItem.getContent().height, 0.3, this.labelName);
		this.labelName.position.x = this.backShopItem.getContent().x + this.backShopItem.getContent().width;
		this.labelName.position.y = this.backShopItem.getContent().position.y;
		// this.labelName.position.y = 20;
		this.container.addChild(this.labelName);
		console.log(this.model.id);
		var self = this;

		// alert(this.backShopItem.getContent().height);

		this.equipped = new PIXI.Text('EQUIPPED', {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500});
		scaleConverter(this.equipped.height, this.backShopItem.getContent().height, 0.3, this.equipped);
		this.equipped.position.x = this.backShopItem.getContent().x + this.backShopItem.getContent().width;
		this.equipped.position.y = this.backShopItem.getContent().height - this.equipped.height  + this.backShopItem.getContent().position.y;
		// this.equipped.position.y = 20;

		this.equipButton = new DefaultButton('UI_button_default_2.png', 'UI_button_default_2.png');
		this.equipButton.build();
		this.equipButton.addLabel(new PIXI.Text('EQUIP', {font:'30px Vagron', fill:'#FFFFFF'}), 33,5);
		this.equipButton.setPosition(this.backShopItem.getContent().x + this.backShopItem.getContent().width,this.backShopItem.getContent().height - this.equipButton.getContent().height + this.backShopItem.getContent().position.y);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		this.equipButton.clickCallback = this.equipButton.mouseDownCallback = this.equipButton.mouseUpCallback = function(){
			console.log('equip');

			APP.currentHornModel = self.model;
			for (var i = self.screen.shopList.length - 1; i >= 0; i--) {
				self.screen.shopList[i].updateStats();
			}
			self.updateStats();
		};

		this.buyButton = new DefaultButton('UI_button_default_1.png', 'UI_button_default_1.png');
		this.buyButton.build();
		this.buyButton.addLabel(new PIXI.Text(this.model.coast+' BUY', {font:'30px Vagron', fill:'#FFFFFF'}), 33,10);
		this.buyButton.setPosition(this.backShopItem.getContent().x + this.backShopItem.getContent().width,this.backShopItem.getContent().height - this.buyButton.getContent().height + this.backShopItem.getContent().position.y);//this.backBars.getContent().height - 20 - this.continueButton.height / 2 - 10);
		this.buyButton.clickCallback = this.buyButton.mouseDownCallback = this.buyButton.mouseUpCallback = function(){
			console.log('buy');
			APP.currentHornModel = self.model;
			APP.currentHornModel.enabled = true;
			for (var i = self.screen.shopList.length - 1; i >= 0; i--) {
				self.screen.shopList[i].updateStats();
			}
			self.updateStats();
		};

		this.updateStats();

		
	},
	updateStats:function(){
		
		// alert('updateStats starts');
		if(this.equipped && this.equipped.parent){
			this.equipped.parent.removeChild(this.equipped);
		}
		if(this.equipButton.getContent() && this.equipButton.getContent().parent){
			this.equipButton.getContent().parent.removeChild(this.equipButton.getContent());
		}
		if(this.buyButton.getContent() && this.buyButton.getContent().parent){
			this.buyButton.getContent().parent.removeChild(this.buyButton.getContent());
		}

		if(APP.currentHornModel.id === this.model.id){
			this.container.addChild(this.equipped);
		}
		else if(this.model.enabled){
			this.container.addChild(this.equipButton.getContent());
		}else{
			this.container.addChild(this.buyButton.getContent());
		}
		// alert('updateStats here');
	},
	getContent:function(){
		return this.container;
	}
});