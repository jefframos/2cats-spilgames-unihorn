/*jshint undef:false */
var Enemy = Entity.extend({
    init:function(model, screen){
        this._super( true );
        this.updateable = false;
       
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;
        this.type = 'enemy';
        this.model = model;
        this.velocity.y = this.model.vel * APP.accelGame;
        this.vel = this.model.vel;
        this.hp = this.model.hp;
        this.behaviour = this.model.behaviour?this.model.behaviour.clone():null;
        this.resistance = this.model.resistance;
    },
    build: function(){

        this.thumb = new PIXI.Sprite(new PIXI.Texture.fromImage(this.model.imgSource[0]));
        this.thumb.anchor.x = 0.5;
        this.thumb.anchor.y = 0.5;
        scaleConverter(this.thumb.height, 50, 1, this.thumb);
        // this.thumb.scale.x = this.thumb.scale.y = 0.5;
        this.thumb.position.x = windowWidth + this.thumb.width;
        this.sprite = new PIXI.Sprite();

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.updateable = true;
        this.collidable = true;

        var self = this;
        var motionIdle = new SpritesheetAnimation();
        motionIdle.build('idle', this.model.imgSource, 5, true, null);
        this.spritesheet = new Spritesheet();
        this.spritesheet.addAnimation(motionIdle);
        this.spritesheet.play('idle');
        this.getContent().addChild(this.spritesheet.container);
        this.spritesheet.setPosition(0,0);

    },
    update: function(){
        this._super();
        if(this.velocity.y < this.vel){
            this.velocity.y += 0.1;
        }else{
            this.velocity.y = this.vel;
        }
        if(this.behaviour){
            this.behaviour.update(this);
        }
        this.spritesheet.update();
        if(this.getContent().position.y > windowHeight + 100){
            this.onList = true;
            this.kill = true;
        }
    },
    hurt:function(){
        this.hp --;
        this.velocity.y -= this.resistance;
        if(this.hp <= 0){
            this.preKill();
        }
    },
    removeSprite:function(){
        this.updateable = false;
        this.collidable = false;
        this.removed = true;
        this.onList = true;
        if(this.getContent().parent){
            this.getContent().parent.removeChild(this.getContent());
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