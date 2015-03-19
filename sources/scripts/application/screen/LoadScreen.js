/*jshint undef:false */
var LoadScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
        this.isLoaded = false;
        APP.labelDebug.visible = false;
        // alert(this.isLoaded);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();

        var assetsToLoader = ['dist/img/atlas.json'];
        // 'dist/img/UI/introScreen.jpg',
        // 'dist/img/UI/HUD.json'];

        // soundManager.play('aves_raras');
        if(assetsToLoader.length > 0 && !this.isLoaded){
            // this.labelLoader = new PIXI.Text('', { align:'center',font:'60px Luckiest Guy', fill:'#FFFFFF', strokeThickness:5, stroke:'#000000', wordWrap:true, wordWrapWidth:600});
            // scaleConverter(this.labelLoader.height, windowHeight, 0.2, this.labelLoader);
            // this.addChild(this.labelLoader);
            // alert('load');

            this.loader = new PIXI.AssetLoader(assetsToLoader);

            this.loaderContainer = new PIXI.DisplayObjectContainer();

            this.addChild(this.loaderContainer);

            if(this.frontShape){
                this.frontShape.parent.removeChild(this.frontShape);
            }
            frontShape = new PIXI.Graphics();
            frontShape.beginFill(0xfc95dd);
            frontShape.drawRect(0,0,windowWidth, windowHeight);
            this.loaderContainer.addChild(frontShape);

            var barHeight = 20;
            this.bulletBar = new LifeBarHUD(windowWidth * 0.6, barHeight, 0, 0xff3ea5, 0xfb60be);
            this.loaderContainer.addChild(this.bulletBar.getContent());
            this.bulletBar.getContent().position.x = windowWidth / 2 - this.bulletBar.getContent().width / 2;
            this.bulletBar.getContent().position.y = windowHeight - this.bulletBar.getContent().height - windowHeight * 0.1;
            this.bulletBar.updateBar(0, 100);

            this.initLoad();


        }else{
            this.onAssetsLoaded();
        }
        this.updateable = true;
    },
    update:function(){
        if(!this.isLoaded && this.ready){// && APP.audioController.loadedAudioComplete){
            this.initApplication();
            APP.labelDebug.visible = false;
        }

        if(!this.updateable){
            return;
        }
        if(this.labelLoader){
            this.blinkAccum --;
            if(this.blinkAccum <= 0){
                this.labelLoader.alpha = this.labelLoader.alpha ? 0 : 1;
                this.blinkAccum = 20 + this.labelLoader.alpha * 10;
            }
        }
        
    },
    onProgress:function(){
        this._super();
        this.bulletBar.updateBar(Math.floor(this.loadPercent * 100), 100);
    },
    onAssetsLoaded:function()
    {
        this.ready = true;
    },
    initApplication:function(){
        // alert('initApp');
        this.isLoaded = true;
        this.blinkAccum = 40;
        this.labelLoader = new PIXI.Text('', { align:'center',font:'20px roboto', fill:'#000', wordWrap:true, wordWrapWidth:600});
        this.loaderContainer.addChild(this.labelLoader);
        this.labelLoader.setText('Toque para continuar');
        scaleConverter(this.labelLoader.width, windowWidth, 0.3, this.labelLoader);
        this.labelLoader.position.x = windowWidth / 2 - this.labelLoader.width / 2;
        this.labelLoader.position.y = this.bulletBar.getContent().position.y + this.bulletBar.getContent().height / 2 - this.labelLoader.height / 2;
        TweenLite.to(this.bulletBar.getContent(), 0.5, {alpha:0});
        var self = this;

        this.fullscreenButton = new DefaultButton('bg.jpg', 'bg.jpg');
        // console.log(this.fullscreenButton.build);
        this.fullscreenButton.build(windowWidth, windowHeight);
        // scaleConverter(this.fullscreenButton.height, windowHeight, 0.25, this.fullscreenButton);
        this.fullscreenButton.setPosition( windowWidth - this.fullscreenButton.getContent().width  - 20, windowHeight - this.fullscreenButton.getContent().height - 20);
        this.addChild(this.fullscreenButton);
        this.fullscreenButton.getContent().alpha = 0;
        // {fill:'white', align:'center', font:'12px Arial', wordWrap:true, wordWrapWidth:60}

        // this.fullscreenButton.addLabel(new PIXI.Text('Jogar', { align:'center', fill:'#033E43', font:'50px Luckiest Guy', wordWrap:true, wordWrapWidth:300}),25,18);
        this.fullscreenButton.clickCallback = function(){
            if(testMobile()){
                fullscreen();
            }
            self.updateable = false;
            var endTimeline = new TimelineLite({onComplete:function(){
                    self.screenManager.change('Init');
                }});
            endTimeline.append(TweenLite.to(self.labelLoader, 0.2,{alpha:0}));
            endTimeline.append(TweenLite.to(self.bulletBar.getContent(), 0.2,{alpha:0}));
            
        };
    },
    transitionIn:function()
    {
        if(!this.isLoaded){
            this.build();
            return;
        }
        // alert('transitionIn', this.screenLabel);
        // if(AbstractScreen.debug)console.log('transitionIn', this.screenLabel);
        this.frontShape = new PIXI.Graphics();
        this.frontShape.beginFill(0xfc95dd);
        this.frontShape.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.frontShape);
        this.build();

    },
    transitionOut:function(nextScreen, container)
    {
        console.log('transitionOut');
        // this._super();
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