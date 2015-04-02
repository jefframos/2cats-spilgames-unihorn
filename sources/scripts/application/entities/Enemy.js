/*jshint undef:false */
var Enemy = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;
        this.type = 'enemy';
        // this.enemyModel
    },
    build: function(){
        var cl = ['cloud1a.png','cloud2a.png','cloud3a.png'];
        this.sprite = new PIXI.Sprite(new PIXI.Texture.fromImage(cl[Math.floor(cl.length * Math.random())]));

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.updateable = true;
        this.collidable = true;
    },
    update: function(){
        this._super();
        if(this.getContent().position.y > windowHeight){
            this.kill = true;
        }
    },
    hurt:function(){
        this.preKill();
    },
    preKill:function(){
        if(!this.collidable){
            return;
        }
        for (var i = 5 - 1; i >= 0; i--) {
            

            // var particle = new Particles({x: Math.random() * 4 - 2, y:-(Math.random() * 4)}, 120, 'star.png', Math.random() * 0.1);
            // particle.build();
            // if(this.type === 'raio'){
            //     particle.getContent().tint = 0xFF0000;
            // }
            // particle.gravity = 0.1 + Math.random() * 0.2;
            // particle.alphadecres = 0.08;
            // particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
            //     this.getPosition().y);
            // this.layer.addChild(particle);

        }
        var self = this;
        TweenLite.to(this.getContent(), 0.3, {alpha:0, onCOmplete:function(){
            self.kill = true;
        }});
        TweenLite.to(this.getContent().scale, 0.3, {x:0,y:0});
        this.collidable = false;
        
        // console.log(APP.getGameModel().killedBirds);
    }
});