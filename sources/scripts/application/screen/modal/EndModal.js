/*jshint undef:false */
var EndModal = Class.extend({
    init:function(screen){
        this.screen = screen;
        
        this.container = new PIXI.DisplayObjectContainer();
        this.topHUD = new PIXI.DisplayObjectContainer();
        this.scrollContainer = new PIXI.DisplayObjectContainer();
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x000000);
        this.bg.drawRect(0,0,windowWidth, windowHeight);
        // this.bg.alpha = 0.95;
        this.container.addChild(this.bg);
        this.container.addChild(this.scrollContainer);

        
        this.applyScroll(this.scrollContainer);
        var self = this;

        // this.back = new SimpleSprite('UI_modal_back_1.png');
        this.backScroll = new PIXI.Graphics();
        this.backScroll.beginFill(0x151c47);
        this.backScroll.drawRect(0,0,windowWidth, windowHeight * 2);
        this.backScroll.alpha = 0;
        this.scrollContainer.addChild(this.backScroll);

        this.closeButton = new DefaultButton('play.png', 'play_over.png');
        this.closeButton.build();
        this.closeButton.setPosition(20,20);//this.backBars.getContent().height - 20 - this.rankingButton.height / 2 - 10);
        this.closeButton.clickCallback = function(){
            APP.audioController.playSound('pop');
            self.hide(function(){
                self.screen.updateable = true;
                self.screen.reset();
            });
        };

        this.barraTop = new SimpleSprite('barra_bottom.png');
        this.topHUD.addChild(this.barraTop.getContent());
        // this.barraTop.getContent().scale.y = -1;
        // this.barraTop.getContent().position.y = this.barraTop.getContent().height * -1;//this.barraTop.getContent().height;

        this.topHUD.addChild(this.closeButton.getContent());
        // scaleConverter(this.closeButton.getContent().height, windowHeight, 0.06, this.closeButton);

        // scaleConverter(this.barraTop.getContent().width, windowHeight, 0.1, this.barraTop);
        scaleConverter(this.closeButton.getContent().height, this.barraTop.getContent().height, 0.8, this.closeButton);

        this.closeButton.getContent().position.x = this.topHUD.width / 2 - this.closeButton.getContent().width / 2;// - this.barraTop.getContent().height * 0.1;
        this.closeButton.getContent().position.y = this.barraTop.getContent().height * 0.1;


        var thirdPart = this.backScroll.width / 3;
        this.textScreen = new PIXI.Text(APP.appModel.totalPoints, {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500, stroke:'#352745', strokeThickness:5});
        scaleConverter(this.textScreen.height, this.closeButton.getContent().height, 0.5, this.textScreen);
        // this.textScreen.position.x = this.topHUD.width - this.textScreen.width - this.barraTop.getContent().height * 0.1;
        this.textScreen.position.x = this.topHUD.width - this.textScreen.width - this.barraTop.getContent().height * 0.1;
        this.textScreen.position.y = this.closeButton.getContent().position.y + this.closeButton.getContent().height / 2 -this.textScreen.height/2 ;

        this.topHUD.addChild(this.textScreen);
        
        this.star = new SimpleSprite('star_coin.png');
        this.topHUD.addChild(this.star.getContent());

        this.star.getContent().position.x = this.textScreen.position.x -this.star.getContent().width * 1.1;
        this.star.getContent().position.y = this.textScreen.position.y + this.textScreen.height / 2 -this.star.getContent().height / 2;

        this.addShopList();

        // this.fbButton = new DefaultButton('UI_button_facebook_1.png', 'UI_button_facebook_1.png');
        // this.fbButton.build();
        // this.fbButton.setPosition(thirdPart * 1 - thirdPart /2 - this.fbButton.getContent().width/2,this.backScroll.height - this.fbButton.getContent().height - 20);//this.backBars.getContent().height - 20 - this.rankingButton.height / 2 - 10);
        // this.fbButton.clickCallback = function(){
            // APP.audioController.playSound('pop');
        //     // self.hide(function(){
        //     //  // self.screen.hideBars();
        //     //  self.screen.screenManager.prevScreen();
        //     // });
        // };
        // this.scrollContainer.addChild(this.fbButton.getContent());

        // this.rankingButton = new DefaultButton('UI_button_ranking_1.png', 'UI_button_ranking_1.png');
        // this.rankingButton.build();
        // scaleConverter(this.rankingButton.getContent().width, this.backScroll.width, 0.3, this.rankingButton);
        // this.rankingButton.setPosition(thirdPart * 2 - thirdPart /2 -  this.rankingButton.getContent().width/2,this.backScroll.height - this.rankingButton.getContent().height - 20);
        // this.rankingButton.clickCallback = function(){
            // APP.audioController.playSound('pop');
        //     // self.hide(function(){self.screen.updateable = true;});
        // };
        // // this.scrollContainer.addChild(this.rankingButton.getContent());

        // this.twitterButton = new DefaultButton('UI_button_twitter_1.png', 'UI_button_twitter_1.png');
        // this.twitterButton.build();
        // this.twitterButton.setPosition(thirdPart * 3 - thirdPart /2 -  this.twitterButton.getContent().width/2,this.backScroll.height - this.twitterButton.getContent().height - 20);//this.backBars.getContent().height / 2 - this.rankingButton.height / 2 - 10);

        // this.twitterButton.clickCallback = function(){
            // APP.audioController.playSound('pop');
        //     // self.hide(function(){
        //     //  self.screen.updateable = true;
        //     //  self.screen.reset();
        //     // });
        // };
        // this.scrollContainer.addChild(this.twitterButton.getContent());

        this.baseHUD = new PIXI.DisplayObjectContainer();
        this.barraBottom = new SimpleSprite('barra_bottom.png');
        this.baseHUD.addChild(this.barraBottom.getContent());

        this.getContent().addChild(this.baseHUD);
        this.getContent().addChild(this.topHUD);

        this.toHorn = new DefaultButton('aba_horns_on.png', 'aba_horns_on.png');
        this.toHorn.build();
        // this.toHorn.setPosition(thirdPart * 3 - thirdPart /2 -  this.toHorn.getContent().width/2,this.backScroll.height - this.toHorn.getContent().height - 20);//this.backBars.getContent().height / 2 - this.rankingButton.height / 2 - 10);

        this.toHorn.clickCallback = function(){
            APP.audioController.playSound('pop');
            // self.scrollContainer.position.y = 0;
            TweenLite.to(self.scrollContainer.position, 0.5, {y:0});
        };


        this.toWear = new DefaultButton('aba_clothes_on.png', 'aba_clothes_on.png');
        this.toWear.build();
        // this.toWear.setPosition(thirdPart * 3 - thirdPart /2 -  this.toWear.getContent().width/2,this.backScroll.height - this.toWear.getContent().height - 20);//this.backBars.getContent().height / 2 - this.rankingButton.height / 2 - 10);

        this.toWear.clickCallback = function(){
            APP.audioController.playSound('pop');
            // self.scrollContainer.position.y = -self.clothesLabel.position.y + self.marginTopBottom;
            TweenLite.to(self.scrollContainer.position, 0.5, {y:-self.clothTitle.getContent().position.y + self.marginTopBottom});
        };


        this.toLand = new DefaultButton('aba_lands_on.png', 'aba_lands_on.png');
        this.toLand.build();
        // this.toLand.setPosition(thirdPart * 3 - thirdPart /2 -  this.toLand.getContent().width/2,this.backScroll.height - this.toLand.getContent().height - 20);//this.backBars.getContent().height / 2 - this.rankingButton.height / 2 - 10);

        this.toLand.clickCallback = function(){
            APP.audioController.playSound('pop');
            // self.scrollContainer.position.y = -self.envLabel.position.y + self.marginTopBottom;
            TweenLite.to(self.scrollContainer.position, 0.5, {y:-self.envTitle.getContent().position.y + self.marginTopBottom});

        };

        this.baseHUD.addChild(this.toHorn.getContent());
        this.baseHUD.addChild(this.toWear.getContent());
        this.baseHUD.addChild(this.toLand.getContent());

        var distBtn = (this.baseHUD.width - (this.toHorn.getContent().width) * 3) / 2;// + this.toHorn.getContent().width * 0.01;
        var recuo = this.baseHUD.height - this.toHorn.getContent().height * 0.9;
        this.toHorn.getContent().position.y = recuo;
        this.toWear.getContent().position.y = recuo;
        this.toLand.getContent().position.y = recuo;

        this.toHorn.getContent().position.x = distBtn + (this.toHorn.getContent().width) * 0;
        this.toWear.getContent().position.x = distBtn + (this.toHorn.getContent().width) * 1;
        this.toLand.getContent().position.x = distBtn + (this.toHorn.getContent().width) * 2;

        scaleConverter(this.baseHUD.width, windowWidth, 1, this.baseHUD);
        scaleConverter(this.topHUD.width, windowWidth, 1, this.topHUD);
        this.baseHUD.position.y = windowHeight - this.baseHUD.height;
        this.barraBottom.getContent().position.y = this.toHorn.getContent().height - this.barraBottom.getContent().height * 0.85;
        // this.topHUD.position.y = -2;
    },
    updateCoins:function(){

        APP.appModel.save();

        this.textScreen.setText(APP.appModel.totalPoints);
        this.textScreen.position.x = this.barraTop.getContent().height * 0.2 + this.star.getContent().width;//his.topHUD.width / 2 - this.textScreen.width / 2;// - this.barraTop.getContent().height * 0.1;
        this.textScreen.position.y = this.closeButton.getContent().position.y + this.closeButton.getContent().height / 2 -this.textScreen.height/2 ;

        this.star.getContent().position.x = this.textScreen.position.x -this.star.getContent().width * 1.1;
        this.star.getContent().position.y = this.textScreen.position.y + this.textScreen.height / 2 -this.star.getContent().height / 2;
    },
    addShopList:function(){

        // this.scrollContainer;
        var _s = 0;
        this.marginTopBottom = windowHeight * 0.15;
        var totItens = APP.appModel.hornModels.length + APP.appModel.clothModels.length + APP.appModel.envModels.length;
        var marginItens = 10;//20;
        var tempShopItem = null;
        this.hornList = [];
        var i = 0;

        this.hornTitle = new SimpleSprite('titulo_magichorns.png');
        scaleConverter(this.hornTitle.getContent().width, windowWidth, 1, this.hornTitle);
        
        // this.hornLabel = new PIXI.Text('HORNS', {align:'center',font:'50px Vagron', fill:'#c34c99', wordWrap:true, wordWrapWidth:500, stroke:'#FFFFFF', strokeThickness:3});
        // scaleConverter(this.hornLabel.height, this.closeButton.getContent().height, 1.2, this.hornLabel);
        this.hornTitle.getContent().position.x = windowWidth / 2 - this.hornTitle.getContent().width / 2 ;
        this.hornTitle.getContent().position.y = this.marginTopBottom;// * 2;
        
        // this.backHorn = new PIXI.Graphics();
        // this.backHorn.beginFill(0x000000);
        // this.backHorn.drawRect(0,0,windowWidth, this.hornLabel.height * 1.4);
        // this.backHorn.alpha = 0.5;
        // this.backHorn.position.y = this.hornLabel.position.y - this.hornLabel.height * 0.2;
        // this.scrollContainer.addChild(this.backHorn);

        this.scrollContainer.addChild(this.hornTitle.getContent());

        for (i = 0; i < APP.appModel.hornModels.length; i++) {
            tempShopItem = new ShopItem(this, 'horn', APP.appModel.hornModels, this.hornList);
            tempShopItem.build(APP.appModel.hornModels[i]);
            this.hornList.push(tempShopItem);
            this.scrollContainer.addChild(tempShopItem.getContent());
            scaleConverter(tempShopItem.backShopItem.getContent().width, windowWidth, 0.3, tempShopItem);
            _s = (tempShopItem.getContent().height + marginItens);
            tempShopItem.getContent().position.x = windowWidth / 2 - tempShopItem.getContent().width / 2;
            tempShopItem.getContent().position.y = i * _s + (this.marginTopBottom * 1.5) + this.hornTitle.getContent().height;
        }

        var lastHorn = tempShopItem.getContent().position.y + tempShopItem.getContent().height;

        // this.clothesLabel = new PIXI.Text('CLOTHES', {align:'center',font:'50px Vagron', fill:'#8a64a5', wordWrap:true, wordWrapWidth:500, stroke:'#FFFFFF', strokeThickness:3});
        // scaleConverter(this.clothesLabel.height, this.closeButton.getContent().height, 1.2, this.clothesLabel);
        // this.clothesLabel.position.x = windowWidth / 2 - this.clothesLabel.width / 2 ;
        // this.clothesLabel.position.y = this.marginTopBottom / 2 + lastHorn;

        // this.backCloth = new PIXI.Graphics();
        // this.backCloth.beginFill(0x000000);
        // this.backCloth.drawRect(0,0,windowWidth, this.clothesLabel.height * 1.4);
        // this.backCloth.alpha = 0.5;
        // this.backCloth.position.y = this.clothesLabel.position.y - this.clothesLabel.height * 0.2;
        // this.scrollContainer.addChild(this.backCloth);

        // this.scrollContainer.addChild(this.clothesLabel);

        this.clothTitle = new SimpleSprite('titulo_coolclothes.png');
        scaleConverter(this.clothTitle.getContent().width, windowWidth, 1, this.clothTitle);
        
        // this.hornLabel = new PIXI.Text('HORNS', {align:'center',font:'50px Vagron', fill:'#c34c99', wordWrap:true, wordWrapWidth:500, stroke:'#FFFFFF', strokeThickness:3});
        // scaleConverter(this.hornLabel.height, this.closeButton.getContent().height, 1.2, this.hornLabel);
        this.clothTitle.getContent().position.x = windowWidth / 2 - this.clothTitle.getContent().width / 2 ;
        this.clothTitle.getContent().position.y = this.marginTopBottom / 2 + lastHorn;// * 2;

        this.scrollContainer.addChild(this.clothTitle.getContent());

        this.clothList = [];
        for (i = 0; i < APP.appModel.clothModels.length; i++) {
            tempShopItem = new ShopItem(this, 'cloth', APP.appModel.clothModels, this.clothList);
            tempShopItem.build(APP.appModel.clothModels[i]);
            this.clothList.push(tempShopItem);
            this.scrollContainer.addChild(tempShopItem.getContent());
            scaleConverter(tempShopItem.backShopItem.getContent().width, windowWidth, 0.3, tempShopItem);
            _s = (tempShopItem.getContent().height + marginItens);
            tempShopItem.getContent().position.x = windowWidth / 2 - tempShopItem.getContent().width / 2;
            tempShopItem.getContent().position.y = i * _s + this.marginTopBottom + lastHorn + this.clothTitle.getContent().height;
        }

        var lastCloath = tempShopItem.getContent().position.y + tempShopItem.getContent().height;

        // this.envLabel = new PIXI.Text('LANDS', {align:'center',font:'50px Vagron', fill:'#5ea28e', wordWrap:true, wordWrapWidth:500, stroke:'#FFFFFF', strokeThickness:3});
        // scaleConverter(this.envLabel.height, this.closeButton.getContent().height, 1.2, this.envLabel);
        // this.envLabel.position.x = windowWidth / 2 - this.envLabel.width / 2 ;
        // this.envLabel.position.y = this.marginTopBottom / 2 + lastCloath;

        // this.backEnv = new PIXI.Graphics();
        // this.backEnv.beginFill(0x000000);
        // this.backEnv.drawRect(0,0,windowWidth, this.envLabel.height * 1.4);
        // this.backEnv.alpha = 0.5;
        // this.backEnv.position.y = this.envLabel.position.y - this.envLabel.height * 0.2;
        // this.scrollContainer.addChild(this.backEnv);

        // this.scrollContainer.addChild(this.envLabel);

        this.envTitle = new SimpleSprite('titulo_greatlands.png');
        scaleConverter(this.envTitle.getContent().width, windowWidth, 1, this.envTitle);
        
        // this.hornLabel = new PIXI.Text('HORNS', {align:'center',font:'50px Vagron', fill:'#c34c99', wordWrap:true, wordWrapWidth:500, stroke:'#FFFFFF', strokeThickness:3});
        // scaleConverter(this.hornLabel.height, this.closeButton.getContent().height, 1.2, this.hornLabel);
        this.envTitle.getContent().position.x = windowWidth / 2 - this.envTitle.getContent().width / 2 ;
        this.envTitle.getContent().position.y = this.marginTopBottom / 2 + lastCloath;// * 2;

        this.scrollContainer.addChild(this.envTitle.getContent());

        this.envList = [];
        for (i = 0; i < APP.appModel.envModels.length; i++) {
            tempShopItem = new ShopItem(this, 'env', APP.appModel.envModels, this.envList);
            tempShopItem.build(APP.appModel.envModels[i]);
            this.envList.push(tempShopItem);
            this.scrollContainer.addChild(tempShopItem.getContent());
            scaleConverter(tempShopItem.backShopItem.getContent().width, windowWidth, 0.3, tempShopItem);
            _s = (tempShopItem.getContent().height + marginItens);
            tempShopItem.getContent().position.x = windowWidth / 2 - tempShopItem.getContent().width / 2;
            tempShopItem.getContent().position.y = i * _s + this.marginTopBottom + lastCloath + this.envTitle.getContent().height;
        }

        this.backScroll.height = this.scrollContainer.height + 200;//totItens * _s + this.marginTopBottom * 4 + 100;
    },
    show:function(){
        this.updateCoins();
        this.screen.addChild(this);
        this.screen.blockPause = true;
        this.scrollContainer.visible = true;
        this.container.parent.setChildIndex(this.container,this.container.parent.children.length -1);
        this.screen.updateable = false;

        this.scrollContainer.position.x = windowWidth / 2 - this.scrollContainer.width / 2;
        this.bg.alpha = 0.7;
        this.scrollContainer.alpha = 1;

        TweenLite.from(this.getContent(), 0.3, {alpha:0});
        // TweenLite.from(this.scrollContainer, 0.1, {alpha:0});
        // TweenLite.from(this.scrollContainer, 0.5, {y:-this.scrollContainer.height});
    },
    hide:function(callback){
        callback();
        return;
        // var self = this;
        // this.screen.blockPause = false;
        // this.screen.updateable = true;
        // TweenLite.to(this.bg, 0.5, {delay:0.1, alpha:0, onComplete:function(){
        //     if(self.container.parent){
        //         self.container.parent.removeChild(self.container);
        //     }
        //     if(callback){
        //         callback();
        //     }
        //     self.kill = true;
        // }});
        // // TweenLite.to(this.scrollContainer.position, 0.5, {y:-this.scrollContainer.height, ease:'easeInBack'});
        // TweenLite.to(this.getContent(), 0.5, {alpha:0});
        // // TweenLite.to(this.bg, 0.5, {alpha:0});
    },
    getContent:function(){
        return this.container;
    },
    applyScroll:function(container){
        container.interactive = true;
        // container.mouseout = container.touchend = function(mouseData){
        //     container.mouseDown = false;
        // };
         
        container.mousedown  = container.touchstart = function(mouseData){
            container.mouseDown = true;
            container.initGlobalY = mouseData.global.y - container.position.y;
        };

        container.mousemove = container.touchmove  = function(mouseData){
            if(container.mouseDown){
                container.lastVelY = (mouseData.global.y - container.initGlobalY) - container.position.y;

                var posDest = verifyPos(mouseData.global.y - container.initGlobalY);
                container.position.y = posDest;

                TweenLite.killTweensOf(container.position);
            }
        };
         
        container.mouseup  = container.touchend = function(mouseData){
            container.mouseDown = false;
            var posDest = verifyPos(container.position.y + container.lastVelY * 5);
            TweenLite.to(container.position, Math.abs(container.lastVelY) / 120, {y:posDest});
        };
        function verifyPos(posReturn){
            if(posReturn > 0){
                posReturn = 0;
            }
            if(container.height > windowHeight){
                if(Math.abs(posReturn) + windowHeight > container.height){
                    posReturn = -container.height + windowHeight;
                }
            }else{
                if(posReturn + container.height > windowHeight){
                    posReturn = windowHeight - container.height;
                }
            }
            return posReturn;
        }
    },
});