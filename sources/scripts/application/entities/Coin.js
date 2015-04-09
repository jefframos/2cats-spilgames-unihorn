/*jshint undef:false */
var Coin = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;
        this.type = 'coin';
        this.velocity.y = 3;
    },
    build: function(){

        this.sprite = new PIXI.Sprite(new PIXI.Texture.fromImage('moeda.png'));

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.updateable = true;
        this.collidable = true;

    },
    update: function(){
        this._super();
        // if(this.velocity.y < this.vel){
        //     this.velocity.y += 0.1;
        // }else{
        //     this.velocity.y = this.vel;
        // }
        if(this.getContent().position.y > windowHeight + 100){
            this.onList = true;
            this.kill = true;
        }
    },
    preKill:function(){
        if(!this.collidable){
            return;
        }
        this.onList = true;
        if(this.thumb.parent){
            this.thumb.parent.removeChild(this.thumb);
        }
        // for (var i = this.model.particles.length - 1; i >= 0; i--) {
        //     var particle = new Particles({x: Math.random() * 4 - 2, y:-(Math.random() * 2 + 1)}, 120, this.model.particles[i], Math.random() * 0.1);
        //     particle.build();
        //     particle.gravity = 0.1 * Math.random();
        //     particle.alphadecres = 0.08;
        //     particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
        //         this.getPosition().y);
        //     this.layer.addChild(particle);
        // }
        var self = this;
        TweenLite.to(this.getContent(), 0.3, {alpha:0, onCOmplete:function(){
            self.kill = true;
        }});
        TweenLite.to(this.getContent().scale, 0.3, {x:0,y:0});
        this.collidable = false;
        
        // console.log(APP.getGameModel().killedBirds);
    }
});