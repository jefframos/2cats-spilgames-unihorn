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
        this.initApplication();
    },
    getGameModel:function(){
        return this.gameModel;
    },
    initApplication:function(){
        this.initScreen = new InitScreen('Init');
        this.gameScreen = new GameScreen('Game');
        this.loadScreen = new LoadScreen('Loader');
        this.screenManager.addScreen(this.loadScreen);
        this.screenManager.addScreen(this.gameScreen);
        this.screenManager.addScreen(this.initScreen);
        this.screenManager.change('Loader');
    },
    show:function(){
    },
    hide:function(){
    },
    destroy:function(){
    }
});


//cookies
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*1000));
//     var expires = "expires="+d.toUTCString();
//     document.cookie = cname + "=" + cvalue + "; " + expires;
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i=0; i<ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0)==' ') c = c.substring(1);
//         if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
//     }
//     return "";
// }
// function readCookie(name) {
//     return (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
// }

// function checkCookie() {
//     var user = getCookie("username");
//     if (user != "") {
//         alert("Welcome again " + user);
//     } else {
//         user = prompt("Please enter your name:", "");
//         if (user != "" && user != null) {
//             setCookie("username", user, 365);
//         }
//     }
// }