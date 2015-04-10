/*jshint undef:false */
var Unihorn = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;

        this.neck = new PIXI.Sprite(new PIXI.Texture.fromImage(APP.currentClothModel.imgSource));
        this.head = new PIXI.Sprite(new PIXI.Texture.fromImage('uni_head.png'));
        this.horn = new PIXI.Sprite(new PIXI.Texture.fromImage(APP.currentHornModel.imgSource));

        this.felling = 1;
        this.fellingMaster = 10;
        this.lastKillAccum = 0;
        this.lastKillAccumMax = 150;
        this.lastKillCounter = 0;

        this.nonKillOnusMax = 200;
        this.nonKillOnus = this.nonKillOnusMax;

        this.vecExpressions = [];
        this.sadArray = ['uni_head.png'];
        this.happyArray = ['uni_head.png'];
        this.normalArray = ['uni_head.png'];

        this.vecExpressions = this.normalArray;

        this.acumChangeExpressions = 5;
        // this.enemyModel
    },
    getContent: function(){
        return this.sprite;
    },
    shoot: function(){
        // console.log('shoot');
        this.horn.scale.y = 0.5;
        TweenLite.to(this.horn.scale, 0.2, {y:1, ease:'easeOutBack'});
        this.acumChangeExpressions --;
        if(this.acumChangeExpressions<=0){
            var texture = new PIXI.Texture.fromImage(this.vecExpressions[Math.floor(this.vecExpressions.length * Math.random())]);
            this.head.setTexture(texture);
            this.acumChangeExpressions = 2 + Math.floor(5 * Math.random());
        }
    },
    killed: function(){
        this.lastKillCounter ++;
        this.lastKillAccum = this.lastKillAccumMax;
        this.nonKillOnus = this.nonKillOnusMax;
        if(this.felling < 10 && this.lastKillCounter % 3 === 0){
            this.felling ++;
        }
    },
    deaded: function(){
        this.fellingMaster --;
        // this.felling --;
        // this.lastKillCounter = 0;
    },
    build: function(){
        this.sprite = new PIXI.Sprite();

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.addChild(this.neck);
        this.neck.addChild(this.head);
        this.head.anchor.x = 0.51;
        this.head.anchor.y = 0.7;
        this.head.position.x = 215;
        this.head.position.y = 120;

        this.head.addChild(this.horn);
        this.horn.anchor.x = 0.5;
        this.horn.anchor.y = 1;
        this.horn.position.y = -75;
        // this.horn.position.x = -25;
    },
    update: function(){
        // this._super();
        // console.log(this.fellingMaster + this.felling);
        if(this.fellingMaster + this.felling < 8){
            this.vecExpressions = this.sadArray;
        }else if(this.fellingMaster + this.felling > 12){
            this.vecExpressions = this.happyArray;
        }else{
            this.vecExpressions = this.normalArray;
        }
        if(this.nonKillOnus > 0){
            this.nonKillOnus --;
        }else if(this.felling > -10){
            this.felling --;
            this.nonKillOnus = this.nonKillOnusMax;
        }
        if(this.lastKillAccum > 0){
            this.lastKillAccum --;
        }else{
            this.lastKillCounter = 0;
        }
        // if(this.getContent().position.y > windowHeight){
        //     this.kill = true;
        // }
    }
});