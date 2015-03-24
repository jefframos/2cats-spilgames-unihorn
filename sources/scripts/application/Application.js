/*jshint undef:false */
var Application = AbstractApplication.extend({
	init:function(){

        this._super(windowWidth, windowHeight);
        this.stage.setBackgroundColor(0x2c2359);
        this.stage.removeChild(this.loadText);

        this.labelDebug = new PIXI.Text('Debug', {font:'15px Arial'});
        this.stage.addChild(this.labelDebug);
        this.labelDebug.position.y = windowHeight - 20;
        this.labelDebug.position.x = 20;

        this.mute = false;

        this.audioController = new AudioController();
        
	},
    update:function(){
        this._super();
        if(!this.screenManager)  {
            return;
        }
        if(!this.screenManager.currentScreen){
            return;
        }
        // this.childsCounter = 1;
        // this.recursiveCounter(this.screenManager.currentScreen);
        // this.objCounter.setText(this.childsCounter);
    },
    recursiveCounter:function(obj){
        var j = 0;
        if(obj.children){
            for (j = obj.children.length - 1; j >= 0; j--) {
                this.childsCounter ++;
                this.recursiveCounter(obj.children[j]);
            }
        }
        else if(obj.childs){
            for (j = obj.childs.length - 1; j >= 0; j--) {
                this.childsCounter ++;
                this.recursiveCounter(obj.childs[j]);
            }
        }else{
            return;
        }
    },
    build:function(){
        this._super();
        this.cookieManager = new CookieManager();
        this.gameModel = new AppModel();
        this.initApplication();
    },
    initApplication:function(){
        this.initScreen = new InitScreen('Init');
        this.choiceScreen = new ChoiceScreen('Choice');
        this.gameScreen = new GameScreen('Game');
        this.loadScreen = new LoadScreen('Loader');
        this.screenManager.addScreen(this.loadScreen);
        this.screenManager.addScreen(this.initScreen);
        this.screenManager.addScreen(this.choiceScreen);
        this.screenManager.addScreen(this.gameScreen);
        this.screenManager.change('Loader');
    },
    show:function(){
    },
    hide:function(){
    },
    destroy:function(){
    }
});