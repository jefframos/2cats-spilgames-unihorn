/*jshint undef:false */
var Unihorn = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;

        this.neck = new PIXI.Sprite(new PIXI.Texture.fromImage('uni_corpo.png'));
        this.head = new PIXI.Sprite(new PIXI.Texture.fromImage('uni_head.png'));
        this.horn = new PIXI.Sprite(new PIXI.Texture.fromImage('uni_horn1.png'));
        // this.enemyModel
    },
    getContent: function(){
        return this.sprite;
    },
    build: function(){
        this.sprite = new PIXI.Sprite();

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.sprite.addChild(this.neck);
        this.neck.addChild(this.head);
        this.head.anchor.x = 0.5;
        this.head.anchor.y = 0.8;
        this.head.position.x = 215;
        this.head.position.y = 120;

        this.head.addChild(this.horn);
        this.horn.anchor.x = 0.5;
        this.horn.anchor.y = 1;
        this.horn.position.y = -75;
        // this.horn.position.x = -25;
    },
    update: function(){
        this._super();
        if(this.getContent().position.y > windowHeight){
            this.kill = true;
        }
    }
});