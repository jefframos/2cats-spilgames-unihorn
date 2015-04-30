/*jshint undef:false */
var Coin = Entity.extend({
    init:function(screen){
        this._super( true );
        this.updateable = false;
        this.screen = screen;
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;
        this.type = 'coin';
        this.velocity.y = 3;

        this.particlesCounter = this.particlesCounterMax = 10;
    },
    build: function(){

        this.sprite = new PIXI.Sprite(new PIXI.Texture.fromImage('moeda.png'));

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.updateable = true;
        this.collidable = true;

    },
    updateableParticles:function(){
        this.particlesCounter --;
        if(this.particlesCounter <= 0)
        {
            this.particlesCounter = this.particlesCounterMax;
            //efeito 3
            var particle = new Particles({x: 0, y:0}, 180, 'moeda.png', 0);
            particle.maxScale = this.getContent().scale.x;
            particle.maxInitScale = particle.maxScale;
            // particle.growType = -1;
            particle.build();
            particle.gravity = 0.0;
            particle.alphadecress = 0.04;
            particle.scaledecress = -0.01;
            particle.setPosition(this.getPosition().x,
                this.getPosition().y);
            this.layer.addChild(particle);
            particle.getContent().parent.setChildIndex(particle.getContent(), 0);
        }
    },
    update: function(){
        this._super();

        this.updateableParticles();
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
        APP.audioController.playSound('star');
        this.onList = true;

        var tempLAbel = new PIXI.Text('+'+(5 + APP.currentClothModel.extraCoins), {font:'30px Vagron', fill:'#ffe63e', stroke:'#665c18', strokeThickness:3});
        // scaleConverter(tempLAbel.width, windowWidth, 0.06, tempLAbel);
        var mascadasLabel = new Particles({x:0, y:-(Math.random() * 0.2 + 0.3)}, 120,
            tempLAbel,
            0);
        mascadasLabel.build();
        mascadasLabel.setPosition(this.getPosition().x,
            this.getPosition().y - Math.random() * 50);
        mascadasLabel.alphadecress = 0.01;
        // mascadasLabel.maxScale = tempLAbel.scale.x * 4;
        this.screen.addChild(mascadasLabel);
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
        
        APP.appModel.totalPoints += 5 + APP.currentClothModel.extraCoins;
        // console.log(APP.getGameModel().killedBirds);
    }
});