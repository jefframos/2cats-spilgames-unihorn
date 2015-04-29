/*jshint undef:false */
var Unihorn = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;

        this.neck = new PIXI.Sprite(new PIXI.Texture.fromImage(APP.currentClothModel.imgSource));
        this.horn = new PIXI.Sprite(new PIXI.Texture.fromImage(APP.currentHornModel.imgSource));

        this.felling = 1;
        this.fellingMaster = 10;
        this.lastKillAccum = 0;
        this.lastKillAccumMax = 150;
        this.lastKillCounter = 0;

        this.nonKillOnusMax = 200;
        this.nonKillOnus = this.nonKillOnusMax;

        this.vecExpressions = [];
        this.justSad = ['uni_head_sad.png'];
        this.sadArray = ['uni_head_normal.png', 'uni_head_sad.png', 'uni_head_disapointed.png'];
        this.happyArray = ['uni_head_normal.png', 'uni_head_happy.png', 'uni_head_love.png', 'uni_head_proud.png'];
        this.normalArray = ['uni_head_normal.png','uni_head_brave.png'];

        this.head = new PIXI.Sprite(new PIXI.Texture.fromImage(this.normalArray[0]));

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
            this.acumChangeExpressions = 2 + Math.floor(3 * Math.random());
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
        this.fellingMaster -= 1.8;
        // this.felling --;
        // this.lastKillCounter = 0;
    },
    sad: function(){
        this.vecExpressions = this.justSad;
        var texture = new PIXI.Texture.fromImage(this.vecExpressions[Math.floor(this.vecExpressions.length * Math.random())]);
        this.head.setTexture(texture);
    },
    build: function(){
        this.sprite = new PIXI.Sprite();

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.addChild(this.neck);
        this.neck.addChild(this.head);
        // this.neck.position.x = -70;

        this.head.anchor.x = 0.51;
        this.head.anchor.y = 0.7;
        this.head.position.x = 215 + 68 + 85;
        this.head.position.y = 120 + 83;

        this.head.addChild(this.horn);
        this.horn.anchor.x = 0.5;
        this.horn.anchor.y = 1;
        this.horn.position.y = -70;
        this.horn.position.x = -20;
        // this.horn.position.x = -25;
    },
    update: function(){
        // this._super();
        // console.log(this.fellingMaster + this.felling);
        if(this.fellingMaster + this.felling < 9){
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