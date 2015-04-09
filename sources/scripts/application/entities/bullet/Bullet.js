/*jshint undef:false */
var Bullet = Entity.extend({
    init:function(vel, timeLive, demage, particle, rotation){
        this._super( true );
        this.updateable = false;
        this.deading = false;
        this.range = 80;
        this.width = 1;
        this.height = 1;
        this.type = 'bullet';
        this.target = 'enemy';
        this.fireType = 'physical';
        this.node = null;
        this.velocity.x = vel.x;
        this.velocity.y = vel.y;
        this.startVel = vel;
        this.timeLive = timeLive;
        this.demage = demage;
        this.vel = vel.x;
        this.defaultVelocity = 1;
        this.hasBounce = false;
        this.piercing = false;
        this.sinoid = 0;
        this.sin = 0;
        // this.defaultVelocity.y = vel.y;
        //console.log(bulletSource);
        this.imgSource = 'bullet.png';
        this.particleSource = particle?particle:this.imgSource;
        this.isRotation = rotation;
        if(this.isRotation){
            this.accumRot = Math.random() * 0.1 - 0.05;
        }
        this.sin = 0;
        this.hasCollideEntity = [];
    },
    startScaleTween: function(){
        TweenLite.from(this.getContent().scale, 0.8, {x:0, y:0, ease:'easeOutBack'});
        this.getContent().alpha = 0;
        var self = this;
        TweenLite.to(this.getContent(), 0.1, {delay:0.2, alpha:1, onComplete:function(){
            self.collidable = true;
        }});
    },
    build: function(){

        this.sprite = new PIXI.Sprite.fromFrame(this.imgSource);

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        this.updateable = true;
        this.collidable = true;

        // this.getContent().alpha = 0.5;
        // TweenLite.to(this.getContent(), 0.3, {alpha:1});
        
        this.birdsCollided = [];

        // this.particlesCounterMax = (Math.abs(this.velocity.x) + Math.abs(this.velocity.y)) / 3;
        this.particlesCounterMax = (Math.abs(this.velocity.x) + Math.abs(this.velocity.y)) / 10;
        this.particlesCounter = 20;//this.particlesCounterMax *2;

        this.collideArea = new PIXI.Rectangle(-50, -50, windowWidth + 100, windowHeight + 100);
    },
    update: function(){
        this._super();
        this.layer.collideChilds(this);
        this.updateableParticles();

        
        if(!this.targetEntity || (this.targetEntity && this.targetEntity.kill)){
            this.timeLive --;
        }
        if(this.getPosition().y < -20){
            this.kill = true;
        }
        this.range = this.sprite.height / 2;
        if(this.isRotation){
            this.sprite.rotation += this.accumRot;
        }
        // if(this.targetEntity && !this.targetEntity.kill){
        //     if(this.homingStart <= 0){
        //         this.range = this.sprite.height;
        //         var angle = Math.atan2(this.targetEntity.getPosition().y - this.getPosition().y, this.targetEntity.getPosition().x - this.getPosition().x);
        //         // var angle = Math.atan2(this.getPosition().y - this.targetEntity.getPosition().y,this.getPosition().x - this.targetEntity.getPosition().x);
        //         this.getContent().rotation = angle;
        //         angle = angle * 180 / Math.PI;
        //         angle += 90;
        //         angle = angle / 180 * Math.PI;
        //         // console.log(angle);
        //         this.velocity.x = Math.sin(angle) * this.defaultVelocity;
        //         this.velocity.y = -Math.cos(angle) * this.defaultVelocity;
        //     }
        //     else{
        //         this.homingStart --;

        //     }
        // }

        // if(this.sinoid){
        //     this.velocity.y = Math.sin(this.sin) * (this.velocity.x * 5);
        //     this.sin += 0.2;
        //     this.getContent().rotation = 0;
        // }
        if(this.sinoid !== 0){
            // this.velocity.x = Math.sin(this.sin) * (Math.abs(this.startVel.x) + Math.abs(this.startVel.y)) + this.startVel.x;//this.vel;
            this.velocity.x = Math.sin(this.sin) *5 + this.startVel.x;//this.vel;
            this.sin += this.sinoid;
            console.log(this.velocity);
        }
        if(this.hasBounce && (this.getPosition().x + this.velocity.x < 0 || this.getPosition().x + this.velocity.x > windowWidth)){
            this.velocity.x *= -1;
            this.startVel.x *= -1;
        }


        if(!this.collideArea.contains(this.getPosition().x, this.getPosition().y)){
            this.kill = true;
        }
        // this.collideArea = new PIXI.Graphics();
        // this.collideArea.lineStyle(1,0x665544);
        // this.collideArea.drawCircle(this.centerPosition.x,this.centerPosition.y,this.range);
        // this.getContent().addChild(this.collideArea);
        // if(this.fall){
        //     this.velocity.y -= 0.1;
        // }
    },
    updateableParticles:function(){
        this.particlesCounter --;
        if(this.particlesCounter <= 0)
        {
            this.particlesCounter = this.particlesCounterMax;

            //efeito 1
            // var particle = new Particles({x: 0, y:0}, 120, this.particleSource, Math.random() * 0.05);
            // particle.maxScale = this.getContent().scale.x;
            // particle.growType = -1;
            // particle.build();
            // particle.gravity = 0.1;
            // particle.alphadecress = 0.08;
            // particle.scaledecress = -0.08;
            // particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
            //     this.getPosition().y);
            // this.layer.addChild(particle);

            //efeito 2
            // var particle = new Particles({x: Math.random() * 4 - 2, y:Math.random()}, 120, this.particleSource, Math.random() * 0.05);
            // particle.maxScale = this.getContent().scale.x;
            // particle.maxInitScale = 0.4;
            // // particle.growType = -1;
            // particle.build();
            // particle.gravity = 0.1 * Math.random() + 0.2;
            // particle.alphadecress = 0.05;
            // particle.scaledecress = 0.03;
            // particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
            //     this.getPosition().y);
            // this.layer.addChild(particle);


            //efeito 3
            var particle = new Particles({x: 0, y:0}, 120, this.particleSource, Math.random() * 0.05);
            particle.maxScale = this.getContent().scale.x;
            particle.maxInitScale = particle.maxScale;
            // particle.growType = -1;
            particle.build();
            particle.gravity = 0.0;
            particle.alphadecress = 0.08;
            particle.scaledecress = -0.04;
            particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
                this.getPosition().y);
            this.layer.addChild(particle);
        }
    },
    setHoming:function(entity, timetostart, angle){
        this.homingStart = timetostart;
        this.targetEntity = entity;
        this.getContent().rotation = angle;
    },
    collide:function(arrayCollide){
        // console.log('fireCollide', arrayCollide[0]);
        if(this.collidable){
            var pass = true;
            for (var i = arrayCollide.length - 1; i >= 0; i--) {
                if(arrayCollide[i].type === 'enemy'){
                    if(this.hasCollideEntity.length > 0){
                        for (var j = this.hasCollideEntity.length - 1; j >= 0; j--) {
                            if(this.hasCollideEntity[j] === arrayCollide[i]){
                                pass = false;
                            }
                        }
                    }
                    if(pass){
                        if(!this.piercing){
                            this.preKill();
                        }
                        this.hasCollideEntity.push(arrayCollide[i]);
                        arrayCollide[i].hurt(this.demage);
                    }
                }
            }
        }
    },
    preKill:function(){
        if(this.invencible){
            return;
        }
        for (var i = 1; i >= 0; i--) {
            var particle = new Particles({x: Math.random() * 4 - 2, y:-(Math.random() * 2 + 1)}, 120, this.particleSource, Math.random() * 0.05);
            particle.build();
            particle.maxScale = 0.5;
            particle.gravity = 0.1 * Math.random() + 0.2;
            particle.alphadecres = 0.1;
            particle.scaledecress = 0.02;
            particle.setPosition(this.getPosition().x - (Math.random() + this.getContent().width * 0.1) / 2,
                this.getPosition().y);
            this.layer.addChild(particle);
        }
        this.collidable = false;
        this.kill = true;
    },
    touch: function(collection){
        if(collection.object && collection.object.type === 'environment'){
            collection.object.fireCollide();
        }
        this.preKill();
    },
});