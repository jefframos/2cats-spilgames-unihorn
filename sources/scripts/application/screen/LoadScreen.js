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



        

        var assetsToLoader = ['dist/img/atlas.json', 'dist/img/creditoMenor.png', 'dist/img/cenario1b.png','dist/img/cenario2b.png','dist/img/cenario3b.png','dist/img/neblina.png'];
        if(assetsToLoader.length > 0 && !this.isLoaded){
            this.loader = new PIXI.AssetLoader(assetsToLoader);
            // this.initLoad();
        }else{
            this.onAssetsLoaded();
        }

        this.HUDContainer = null;
    },
    update:function(){
        // console.log('update');
        if(this.logo && this.logo.getContent().width > 1 && this.logo.getContent().scale.x === 1){
            scaleConverter(this.logo.getContent().width, windowWidth, 1.3, this.logo);
            this.logo.getContent().position.x = windowWidth / 2 - this.logo.getContent().width / 2;
            this.logo.getContent().position.y = windowHeight - this.logo.getContent().height * 1.1;
            TweenLite.from(this.logo.getContent().position, 4, {y:this.logo.getContent().position.y + 50, ease:'easeOutElastic'});

            var self = this;
            var playTimeline = null;
            var repeatPlay = function(){
                playTimeline.append(TweenLite.to(self.logo.getContent(), 5,{y:windowHeight - self.logo.getContent().height * 1.1 + 20, ease:'easeInOutCubic'}));
                playTimeline.append(TweenLite.to(self.logo.getContent(), 5,{y:windowHeight - self.logo.getContent().height * 1.1, ease:'easeInOutCubic'}));
            };
            playTimeline = new TimelineLite({delay:4, onComplete:repeatPlay});
            repeatPlay();

        }
        if(this.fundo && this.fundo.getContent().width > 1 && this.fundo.getContent().scale.x === 1 && this.logo.getContent().width > 1){
            this.fundo.getContent().alpha = 1;
            scaleConverter(this.fundo.getContent().height, windowHeight, 1, this.fundo);
            this.fundo.getContent().position.x = windowWidth / 2 - this.fundo.getContent().width / 2;

            // TweenLite.from(this.fundo.getContent().position, 4, {y:- 50, ease:'easeOutElastic'});
            
            // this.fundo.getContent().position.y = -this.fundo.getContent().height * 0.02;
        }
        if(this.ready && this.fundo && this.fundo.getContent().width > 1){
            if(this.HUDContainer === null){
                // alert('HUDContainer');
                this.HUDContainer = new PIXI.DisplayObjectContainer();
                this.addChild(this.HUDContainer);
                this.setAudioButtons();
            }
        }
        if(this.backLoader && this.backLoader.getContent().width > 1 && this.backLoader.getContent().scale.x === 1){
            this.backLoader.getContent().position.x = windowWidth / 2 - this.backLoader.getContent().width / 2;
            this.backLoader.getContent().position.y = windowHeight - this.backLoader.getContent().height * 2;
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
        this.loaderBar.getContent().position.y = this.backLoader.getContent().position.y + this.backLoader.getContent().height * 0.2;
        this.loaderBar.updateBar(0, 100);
        this._super();

        var text = new PIXI.Text('PLAY', {font:'50px Vagron', fill:'#FFFFFF'});
        this.addChild(text);
        text.alpha = 0;
        //gambiarra pra forçar a fonte
    },
    setAudioButtons:function(){

        var self = this;
        if(testMobile()){
            APP.mute = true;
            Howler.mute();
            // alert('mute');
        }else{
            APP.mute = false;
        }
        // Howler.mute();

        this.audioOn = new DefaultButton('volume_on.png', 'volume_on_over.png');
        this.audioOn.build();
        // scaleConverter(this.audioOn.height, this.pauseButton.getContent().height, 1, this.audioOn);


        this.audioOn.setPosition(windowWidth - this.audioOn.getContent().width -this.audioOn.getContent().height*0.1,this.audioOn.getContent().height*0.1);
        // this.audioOn.setPosition( windowWidth - this.audioOn.getContent().width  - 20, 20);

        this.audioOff = new DefaultButton('volume_off_over.png', 'volume_off.png');
        this.audioOff.build();
        // scaleConverter(this.audioOff.height, this.pauseButton.getContent().height, 1, this.audioOff);
        this.audioOff.setPosition(windowWidth - this.audioOn.getContent().width - this.audioOn.getContent().height*0.1, this.audioOn.getContent().height*0.1);

       

        if(!APP.mute){
            this.HUDContainer.addChild(this.audioOn.getContent());
        }else{
            this.HUDContainer.addChild(this.audioOff.getContent());
        }
        // console.log('add');
        this.audioOn.clickCallback = function(){
            APP.audioController.playSound('pop');
            APP.mute = true;
            Howler.mute();
            if(self.audioOn.getContent().parent)
            {
                self.audioOn.getContent().parent.removeChild(self.audioOn.getContent());
            }
            if(self.audioOff.getContent())
            {
                self.HUDContainer.addChild(self.audioOff.getContent());
            }
        };
        this.audioOff.clickCallback = function(){
            APP.audioController.playSound('pop');
            APP.mute = false;
            Howler.unmute();
            if(self.audioOff.getContent().parent)
            {
                self.audioOff.getContent().parent.removeChild(self.audioOff.getContent());
            }
            if(self.audioOn.getContent())
            {
                self.HUDContainer.addChild(self.audioOn.getContent());
            }
        };
    },
    onProgress:function(){
        this._super();
        this.loaderBar.updateBar(Math.floor(this.loadPercent * 90), 100);
    },
    onAssetsLoaded:function()
    {
        // console.log(APP.audioController.loadedAudioComplete);
        if(!APP.audioController.loadedAudioComplete){
            APP.audioController.onCompleteCallback = this.onAssetsLoaded;
            APP.audioController.parent = this;
            return;
        }
        var self = APP.audioController.parent?APP.audioController.parent:this;
        self.ready = true;


        if(self.loaderBar){
            self.loaderBar.updateBar(100, 100);
        }
        TweenLite.to(self.loaderContainer, 0.5, {delay:0.5, alpha:0, onComplete:function(){
            self.initApplication();
        }});
    },
    initApplication:function(){

        APP.audioController.playAmbientSound('ambient1');
        // APP.audioController.stopSound('alcemarIntro');
        // APP.audioController.playSound('alcemarIntro');

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

        var playTimeline = null;

        function repeatPlay(){
            playTimeline.append(TweenLite.to(self.playContainer, 5,{y:windowHeight - (self.playButton.getContent().height / 1.6) - 20, ease:'easeInOutCubic'}));
            playTimeline.append(TweenLite.to(self.playContainer, 5,{y:windowHeight - (self.playButton.getContent().height / 1.6), ease:'easeInOutCubic'}));
        }
        playTimeline = new TimelineLite({delay:0.8, onComplete:repeatPlay});
        repeatPlay();

        this.playButton.clickCallback = function(){
            APP.audioController.playSound('pop');
            if(possibleFullscreen() && !isfull && testMobile()){
                fullscreen();
            }
            self.updateable = false;
            self.toTween(function(){
                self.screenManager.change('Game');

            });
        };



        this.moreContainer = new PIXI.DisplayObjectContainer();

        this.addChild(this.moreContainer);
        this.moreGamesButton = new DefaultButton('moregames.png', 'moregames_over.png');
        this.moreGamesButton.build();
        // this.moreGamesButton.addLabel(new PIXI.Text('PLAY', {font:'50px Vagron', fill:'#FFFFFF'}), 45,2);
        // scaleConverter(this.moreGamesButton.getContent().width, this.playButton.getContent().width, 0.9, this.moreGamesButton);

        this.moreGamesButton.setPosition( - this.moreGamesButton.getContent().width/2,
            - this.moreGamesButton.getContent().height / 2);

        this.moreContainer.addChild(this.moreGamesButton.getContent());

        this.moreContainer.position.x = windowWidth / 2 + this.moreGamesButton.getContent().width * 2;
      
        this.moreContainer.scale.x = this.moreContainer.scale.y = 0.5;
        this.moreContainer.alpha = 0;
        var moreScale = scaleConverter(this.moreContainer.height, this.logo.getContent().height, 0.09);
        this.moreContainer.position.y = this.playContainer.position.y - this.moreContainer.height / 2;//windowHeight - (this.moreGamesButton.getContent().height / 1.6);
        TweenLite.to(this.moreContainer, 0.3,{delay:0.4, alpha:1});
        TweenLite.to(this.moreContainer.scale, 0.8,{delay:0.4, x:moreScale, y:moreScale, ease:'easeOutElastic'});
        this.moreGamesButton.clickCallback = function(){
            APP.audioController.playSound('pop');
            if(APP.withAPI){
                APP.buttonProperties.action();
            }
        };

        var moreTimeline = null;

        function repeatMore(){
            moreTimeline.append(TweenLite.to(self.moreContainer.scale, 5,{x:1.2, y:1.2, ease:'easeInOutCubic'}));
            moreTimeline.append(TweenLite.to(self.moreContainer.scale, 5,{x:1, y:1, ease:'easeInOutCubic'}));
        }
        moreTimeline = new TimelineLite({delay:0.8, onComplete:repeatPlay});
        repeatMore();


        this.darks = new PIXI.Graphics();
        this.darks.beginFill(0);
        this.darks.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.darks);
        this.darks.alpha = 0;

        this.creditsImage = new SimpleSprite('dist/img/creditoMenor.png');
        this.addChild(this.creditsImage.getContent());
        this.creditsImage.getContent().alpha = 0;
        this.creditsImage.getContent().position.x = windowWidth / 2 - this.creditsImage.getContent().width / 2;
        this.creditsImage.getContent().position.y = windowHeight / 2 - this.creditsImage.getContent().height / 2;


        this.creditsContainer = new PIXI.DisplayObjectContainer();

        this.addChild(this.creditsContainer);
        this.creditsButton = new DefaultButton('creditos.png', 'creditos_over.png');
        this.creditsButton.build();
        // this.creditsButton.addLabel(new PIXI.Text('PLAY', {font:'50px Vagron', fill:'#FFFFFF'}), 45,2);
        // scaleConverter(this.creditsButton.getContent().width, this.playButton.getContent().width, 0.9, this.creditsButton);

        this.creditsButton.setPosition( - this.creditsButton.getContent().width/2,
            - this.creditsButton.getContent().height / 2);

        this.creditsContainer.addChild(this.creditsButton.getContent());

        this.creditsContainer.position.x = windowWidth / 2 - this.creditsButton.getContent().width * 2;
      
        this.creditsContainer.scale.x = this.creditsContainer.scale.y = 0.5;
        this.creditsContainer.alpha = 0;
        var creditsScale = scaleConverter(this.creditsContainer.height, this.logo.getContent().height, 0.09);
        this.creditsContainer.position.y = this.playContainer.position.y  - this.creditsContainer.height / 2;//windowHeight - (this.creditsButton.getContent().height / 1.6);
        TweenLite.to(this.creditsContainer, 0.3,{delay:0.2, alpha:1});
        TweenLite.to(this.creditsContainer.scale, 0.8,{delay:0.2, x:creditsScale, y:creditsScale, ease:'easeOutElastic'});
        this.creditsButton.clickCallback = function(){
            APP.audioController.playSound('pop');
            if(self.darks.alpha >= 0.5){
                TweenLite.to(self.creditsImage.getContent(), 0.5,{alpha:0});
                TweenLite.to(self.darks, 0.5,{alpha:0});
            }else{
                TweenLite.to(self.creditsImage.getContent(), 0.5,{alpha:1});
                TweenLite.to(self.darks, 0.5,{alpha:0.5});
            }
        };


        var creditsTimeline = null;

        function repeatCredits(){
            creditsTimeline.append(TweenLite.to(self.creditsContainer.scale, 5,{x:1.2, y:1.2, ease:'easeInOutCubic'}));
            creditsTimeline.append(TweenLite.to(self.creditsContainer.scale, 5,{x:1, y:1, ease:'easeInOutCubic'}));
        }
        creditsTimeline = new TimelineLite({delay:0.5, onComplete:repeatPlay});
        repeatCredits();

        // this.screenManager.change('Init');
    },
    toTween:function(callback){

        TweenLite.to(this.creditsContainer, 0.3,{alpha:0});
        TweenLite.to(this.creditsContainer.scale, 0.6,{x:0.5, y:0.5});

        TweenLite.to(this.moreContainer, 0.3,{alpha:0});
        TweenLite.to(this.moreContainer.scale, 0.6,{x:0.5, y:0.5});
        
        TweenLite.to(this.playContainer, 0.3,{delay:0.3, alpha:0});
        TweenLite.to(this.playContainer.scale, 0.6,{delay:0.3,x:0.5, y:0.5, onComplete:function(){
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