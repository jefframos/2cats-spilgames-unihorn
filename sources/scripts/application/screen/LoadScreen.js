/*jshint undef:false */
var LoadScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
        this.isLoaded = false;
        // alert(this.isLoaded);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();

        this.fundo = new SimpleSprite('dist/img/fundo.jpg');
        this.container.addChild(this.fundo.getContent());
        this.fundo.getContent().alpha = 0;

        this.logo = new SimpleSprite('dist/img/title.png');
        this.container.addChild(this.logo.getContent());

        // scaleConverter(this.logo.getContent().width, windowWidth, 0.5, this.logo);
        

        this.loaderContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.loaderContainer);

        this.backLoader = new SimpleSprite('dist/img/loader.png');
        this.loaderContainer.addChild(this.backLoader.getContent());

        var assetsToLoader = ['dist/img/atlas.json', 'dist/img/fundo1.png'];
        if(assetsToLoader.length > 0 && !this.isLoaded){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            // this.initLoad();
        }else{
            this.onAssetsLoaded();
        }
    },
    update:function(){
        // console.log('update');
        if(this.logo && this.logo.getContent().width > 1 && this.logo.getContent().scale.x === 1){
            scaleConverter(this.logo.getContent().width, windowWidth, 1.3, this.logo);
            this.logo.getContent().position.x = windowWidth / 2 - this.logo.getContent().width / 2;
            this.logo.getContent().position.y = windowHeight - this.logo.getContent().height;
        }
        if(this.fundo && this.fundo.getContent().width > 1 && this.fundo.getContent().scale.x === 1 && this.logo.getContent().width > 1){
            this.fundo.getContent().alpha = 1;
            scaleConverter(this.fundo.getContent().height, windowHeight, 1, this.fundo);
            this.fundo.getContent().position.x = windowWidth / 2 - this.fundo.getContent().width / 2;
            // this.fundo.getContent().position.y = -this.fundo.getContent().height * 0.02;
        }
        if(this.backLoader && this.backLoader.getContent().width > 1 && this.backLoader.getContent().scale.x === 1){
            this.backLoader.getContent().position.x = windowWidth / 2 - this.backLoader.getContent().width / 2;
            this.backLoader.getContent().position.y = windowHeight - this.backLoader.getContent().height *1.8;
            if(!this.initInit){
                this.initLoad();
            }
        }
    },
    initLoad:function(){
        this.initInit = true;
        var barHeight = 20;
        

        
        

        this.loaderBar = new LifeBarHUD(this.backLoader.getContent().width * 0.9, this.backLoader.getContent().height * 0.45, 0, 0xff0d87, 0x5cc1ff);
        this.loaderContainer.addChild(this.loaderBar.getContent());
        this.loaderBar.getContent().position.x = windowWidth / 2 - this.loaderBar.getContent().width / 2;
        this.loaderBar.getContent().position.y = this.backLoader.getContent().position.y + this.backLoader.getContent().height * 0.18;
        this.loaderBar.updateBar(0, 100);
        this._super();

        var text = new PIXI.Text('PLAY', {font:'50px Vagron', fill:'#FFFFFF'});
        this.addChild(text);
        text.alpha = 0;
        //gambiarra pra forçar a fonte
    },
    onProgress:function(){
        this._super();
        this.loaderBar.updateBar(Math.floor(this.loadPercent * 100), 100);
    },
    onAssetsLoaded:function()
    {
        this.ready = true;
        var self = this;
        TweenLite.to(this.loaderContainer, 0.5, {delay:0.5, alpha:0, onComplete:function(){
            self.initApplication();
        }});
    },
    initApplication:function(){
        this.isLoaded = true;
        var self = this;
        APP.currentHornModel = APP.appModel.hornModels[0];
        APP.currentClothModel = APP.appModel.clothModels[0];
        APP.currentEnvModel = APP.appModel.envModels[0];
        // this.screenManager.change('Game');
        this.playContainer = new PIXI.DisplayObjectContainer();

        this.addChild(this.playContainer);
        this.playButton = new DefaultButton('playB.png', 'playB_over.png');
        this.playButton.build();
        // this.playButton.addLabel(new PIXI.Text('PLAY', {font:'50px Vagron', fill:'#FFFFFF'}), 45,2);
        // scaleConverter(this.playButton.getContent().width, windowWidth, 0.4, this.playButton);

        this.playButton.setPosition( - this.playButton.getContent().width/2,
            - this.playButton.getContent().height / 2);

        this.playContainer.addChild(this.playButton.getContent());

        this.playContainer.position.x = windowWidth / 2;
      
        this.playContainer.scale.x = this.playContainer.scale.y = 0.5;
        this.playContainer.alpha = 0;
        var playScale = scaleConverter(this.playContainer.height, this.logo.getContent().height, 0.1);
        this.playContainer.position.y = windowHeight - (this.playButton.getContent().height / 1.6);
        TweenLite.to(this.playContainer, 0.3,{delay:0.3, alpha:1});
        TweenLite.to(this.playContainer.scale, 0.8,{delay:0.3, x:playScale, y:playScale, ease:'easeOutElastic'});
        this.playButton.clickCallback = function(){
            if(possibleFullscreen() && !isfull && testMobile()){
                fullscreen();
            }
            self.updateable = false;
            self.toTween(function(){
                self.screenManager.change('Game');

            });
        };

        // this.screenManager.change('Init');
    },
    toTween:function(callback){
        
        TweenLite.to(this.playContainer, 0.3,{alpha:0});
        TweenLite.to(this.playContainer.scale, 0.6,{x:0.5, y:0.5, onComplete:function(){
            callback();
        }});
    },
    transitionIn:function()
    {
        if(!this.isLoaded){
            this.build();
            return;
        }
        this.build();
    },
    transitionOut:function(nextScreen, container)
    {
        var self = this;
        if(this.frontShape){
            this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
            TweenLite.to(this.frontShape, 0.3, {alpha:1, onComplete:function(){
                self.destroy();
                container.removeChild(self.getContent());
                nextScreen.transitionIn();
            }});
        }else{
            self.destroy();
            container.removeChild(self.getContent());
            nextScreen.transitionIn();
        }
    },
});