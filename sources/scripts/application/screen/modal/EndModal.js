/*jshint undef:false */
var EndModal = Class.extend({
    init:function(screen){
        this.screen = screen;
        
        this.container = new PIXI.DisplayObjectContainer();
        this.scrollContainer = new PIXI.DisplayObjectContainer();
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x151c47);
        this.bg.drawRect(0,0,windowWidth, windowHeight);
        this.bg.alpha = 0.8;
        this.container.addChild(this.bg);
        this.container.addChild(this.scrollContainer);

        
        this.applyScroll(this.scrollContainer);
        var self = this;

        // this.back = new SimpleSprite('UI_modal_back_1.png');
        this.backScroll = new PIXI.Graphics();
        this.backScroll.beginFill(0x151c47);
        this.backScroll.drawRect(0,0,windowWidth, windowHeight * 2);
        this.backScroll.alpha = 0.8;
        this.scrollContainer.addChild(this.backScroll);

        this.closeButton = new DefaultButton('UI_button_play_1.png', 'UI_button_play_1.png');
        this.closeButton.build();
        this.closeButton.setPosition(20,20);//this.backBars.getContent().height - 20 - this.rankingButton.height / 2 - 10);
        this.closeButton.clickCallback = function(){
            self.hide(function(){
                self.screen.updateable = true;
                self.screen.reset();
            });
        };
        this.container.addChild(this.closeButton.getContent());
        scaleConverter(this.closeButton.getContent().height, windowHeight, 0.08, this.closeButton);


        var thirdPart = this.backScroll.width / 3;
        this.textScreen = new PIXI.Text(APP.appModel.totalPoints, {align:'center',font:'50px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500});
        scaleConverter(this.textScreen.height, this.closeButton.getContent().height, 1, this.textScreen);
        this.textScreen.position.x = windowWidth - this.textScreen.width - 20;
        this.textScreen.position.y = 20;
        this.container.addChild(this.textScreen);

        this.addShopList();

        this.fbButton = new DefaultButton('UI_button_facebook_1.png', 'UI_button_facebook_1.png');
        this.fbButton.build();
        this.fbButton.setPosition(thirdPart * 1 - thirdPart /2 - this.fbButton.getContent().width/2,this.backScroll.height - this.fbButton.getContent().height - 20);//this.backBars.getContent().height - 20 - this.rankingButton.height / 2 - 10);
        this.fbButton.clickCallback = function(){
            // self.hide(function(){
            //  // self.screen.hideBars();
            //  self.screen.screenManager.prevScreen();
            // });
        };
        this.scrollContainer.addChild(this.fbButton.getContent());

        this.rankingButton = new DefaultButton('UI_button_ranking_1.png', 'UI_button_ranking_1.png');
        this.rankingButton.build();
        scaleConverter(this.rankingButton.getContent().width, this.backScroll.width, 0.3, this.rankingButton);
        this.rankingButton.setPosition(thirdPart * 2 - thirdPart /2 -  this.rankingButton.getContent().width/2,this.backScroll.height - this.rankingButton.getContent().height - 20);
        this.rankingButton.clickCallback = function(){
            // self.hide(function(){self.screen.updateable = true;});
        };
        // this.scrollContainer.addChild(this.rankingButton.getContent());

        this.twitterButton = new DefaultButton('UI_button_twitter_1.png', 'UI_button_twitter_1.png');
        this.twitterButton.build();
        this.twitterButton.setPosition(thirdPart * 3 - thirdPart /2 -  this.twitterButton.getContent().width/2,this.backScroll.height - this.twitterButton.getContent().height - 20);//this.backBars.getContent().height / 2 - this.rankingButton.height / 2 - 10);

        this.twitterButton.clickCallback = function(){
            // self.hide(function(){
            //  self.screen.updateable = true;
            //  self.screen.reset();
            // });
        };
        this.scrollContainer.addChild(this.twitterButton.getContent());

        // scaleConverter(this.scrollContainer.width, windowWidth, 0.8, this.scrollContainer);
    },
    updateCoins:function(){
        this.textScreen.setText(APP.appModel.totalPoints);
        this.textScreen.position.x = windowWidth - this.textScreen.width - 20;
        this.textScreen.position.y = 20;
    },
    addShopList:function(){

        // this.scrollContainer;
        var _s = 0;
        var marginTopBottom = windowHeight * 0.1;
        var totItens = APP.appModel.hornModels.length + APP.appModel.clothModels.length;
        var marginItens = 10;//20;
        var tempShopItem = null;
        this.hornList = [];
        var i = 0;
        for (i = 0; i < APP.appModel.hornModels.length; i++) {
            tempShopItem = new ShopItem(this, 'horn', APP.appModel.hornModels, this.hornList);
            tempShopItem.build(APP.appModel.hornModels[i]);
            this.hornList.push(tempShopItem);
            this.scrollContainer.addChild(tempShopItem.getContent());
            scaleConverter(tempShopItem.backShopItem.getContent().width, windowWidth, 0.2, tempShopItem);
            _s = (tempShopItem.getContent().height + marginItens);
            tempShopItem.getContent().position.x = windowWidth / 2 - tempShopItem.getContent().width / 2;
            tempShopItem.getContent().position.y = i * _s + marginTopBottom;
        }
        var lastHorn = tempShopItem.getContent().position.y + tempShopItem.getContent().height;
        this.clothList = [];
        for (i = 0; i < APP.appModel.clothModels.length; i++) {
            tempShopItem = new ShopItem(this, 'cloth', APP.appModel.clothModels, this.clothList);
            tempShopItem.build(APP.appModel.clothModels[i]);
            this.clothList.push(tempShopItem);
            this.scrollContainer.addChild(tempShopItem.getContent());
            scaleConverter(tempShopItem.backShopItem.getContent().width, windowWidth, 0.2, tempShopItem);
            _s = (tempShopItem.getContent().height + marginItens);
            tempShopItem.getContent().position.x = windowWidth / 2 - tempShopItem.getContent().width / 2;
            tempShopItem.getContent().position.y = i * _s + marginTopBottom + lastHorn;
        }

        this.backScroll.height = totItens * _s + marginTopBottom * 4 + 100;
    },
    show:function(){
        this.updateCoins();
        this.screen.addChild(this);
        this.screen.blockPause = true;
        this.scrollContainer.visible = true;
        this.container.parent.setChildIndex(this.container,this.container.parent.children.length -1);
        this.screen.updateable = false;

        this.scrollContainer.position.x = windowWidth / 2 - this.scrollContainer.width / 2;
        this.bg.alpha = 0.8;
        this.scrollContainer.alpha = 1;

        TweenLite.from(this.bg, 0.5, {alpha:0});
        TweenLite.from(this.scrollContainer, 0.5, {alpha:0});
        // TweenLite.from(this.scrollContainer, 0.5, {y:-this.scrollContainer.height});
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
        TweenLite.to(this.scrollContainer.position, 0.5, {y:-this.scrollContainer.height, ease:'easeInBack'});
        TweenLite.to(this.scrollContainer, 0.5, {alpha:0});
        // TweenLite.to(this.bg, 0.5, {alpha:0});
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