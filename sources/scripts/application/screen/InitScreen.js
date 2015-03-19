/*jshint undef:false */
var InitScreen = AbstractScreen.extend({
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
        this.loader = new PIXI.AssetLoader(assetsToLoader);
        // 'dist/img/UI/introScreen.jpg',
        // 'dist/img/UI/HUD.json'];

        // soundManager.play('aves_raras');
        if(assetsToLoader.length > 0){
            console.log(this.initLoad);
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }
        this.updateable = true;
    },
    update:function(){
        if(!this.updateable){
            return;
        }
    },
    onProgress:function(){
        this._super();
        // this.bulletBar.updateBar(Math.floor(this.loadPercent * 100), 100);
    },
    onAssetsLoaded:function()
    {
        this.initApplication();
        // APP.labelDebug.visible = false;
    },
    initApplication:function(){
        var self = this;

        var bg = new SimpleSprite('bg.jpg');
        this.container.addChild(bg.getContent());
        scaleConverter(bg.getContent().width, windowWidth, 1.2, bg);
        bg.getContent().position.x = windowWidth / 2 - bg.getContent().width / 2;
        bg.getContent().position.y = windowHeight / 2 - bg.getContent().height / 2;

        var logo = new SimpleSprite('logo.png');
        this.container.addChild(logo.getContent());
        scaleConverter(logo.getContent().height, windowHeight, 0.05, logo);
        logo.getContent().position.x = windowWidth - logo.getContent().width - 20;
        logo.getContent().position.y = 20;

        var selo = new SimpleSprite('selo.png');
        this.container.addChild(selo.getContent());
        scaleConverter(selo.getContent().height, windowHeight, 0.6, selo);
        selo.getContent().position.x = windowWidth /2 - selo.getContent().width / 2;
        selo.getContent().position.y = 20;

        this.fullscreenButton = new DefaultButton('btnJogar.png', 'btnJogar.png');
        this.fullscreenButton.build();
        // console.log(this.fullscreenButton.build);
        // this.fullscreenButton.build(windowWidth, windowHeight);
        // alert(windowWidth);
        // scaleConverter(this.fullscreenButton.height, windowHeight, 0.25, this.fullscreenButton);
        // this.fullscreenButton.setPosition(windowWidth / 2 ,windowHeight - this.fullscreenButton.getContent().height);
        this.fullscreenButton.setPosition(windowWidth / 2  - this.fullscreenButton.getContent().width / 2 , windowHeight - this.fullscreenButton.getContent().height);
        this.addChild(this.fullscreenButton);
        // this.fullscreenButton.getContent().alpha = 0;
        // {fill:'white', align:'center', font:'12px Arial', wordWrap:true, wordWrapWidth:60}

        // this.fullscreenButton.addLabel(new PIXI.Text('Jogar', { align:'center', fill:'#033E43', font:'50px Luckiest Guy', wordWrap:true, wordWrapWidth:300}),25,18);
        this.fullscreenButton.clickCallback = function(){
            self.screenManager.change('Game');
            self.updateable = false;
        };

        TweenLite.from(selo.getContent(), 0.8, {y:-selo.getContent().height});
        TweenLite.from(logo.getContent(), 0.5, {delay:0.7, y:-logo.getContent().height});
        TweenLite.from(this.fullscreenButton.getContent(), 0.5, {delay:0.6, y:windowHeight});

        this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
        TweenLite.to(this.frontShape, 0.8, {alpha:0});
    },
    transitionIn:function()
    {
        // if(!this.isLoaded){
        //     this.build();
        //     return;
        // }
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