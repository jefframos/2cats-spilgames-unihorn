/*jshint undef:false */
var Enemy = Entity.extend({
    init:function(model, screen){
        this._super( true );
        this.updateable = false;
        this.screen = screen;
        this.range = windowWidth * 0.05;
        this.width = 1;
        this.height = 1;
        this.type = 'enemy';
        this.model = model;
        this.velocity.y = this.model.vel * (APP.accelGame / 2);
        this.vel = this.model.vel;
        this.hp = this.model.hp + Math.floor(APP.accelGame - 1);
        console.log(this.model.hp,APP.accelGame);
        this.behaviour = this.model.behaviour?this.model.behaviour.clone():null;
        this.resistance = this.model.resistance;
        this.subdivide = this.model.subdivide;
    },
    build: function(){

        this.thumb = new PIXI.Sprite(new PIXI.Texture.fromImage(this.model.imgSource[0]));
        this.thumb.anchor.x = 0.5;
        this.thumb.anchor.y = 0.5;
        scaleConverter(this.thumb.height, 50, 1, this.thumb);
        // this.thumb.scale.x = this.thumb.scale.y = 0.5;
        this.thumb.position.x = - this.thumb.width;
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

        // console.log(this.model.sizePercent);
        scaleConverter(this.spritesheet.container.width, windowWidth, this.model.sizePercent, this.getContent());

        this.collideArea = new PIXI.Rectangle(-50, -50, windowWidth + 100, windowHeight + 100);

    },
    update: function(){
        this.range = this.spritesheet.container.width / 2;
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
        if(!this.collideArea.contains(this.getPosition().x, this.getPosition().y)){
            this.kill = true;
        }
    },
    hurt:function(demage){
        this.hp -= demage;
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

        this.screen.unihorn.killed();


        for (var i = this.subdivide - 1; i >= 0; i--) {
            // console.log(APP.appModel.smallEnemyModel);
            var enemy = new Enemy(APP.appModel.smallEnemyModel, this.screen);
            enemy.build();
            // scaleConverter(enemy.getContent().height,windowHeight, 0.08, enemy);
            //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
            enemy.setPosition(this.getPosition().x, this.getPosition().y);
            var destX = this.getPosition().x - 50 + 100 * i;
            if(destX < 50){
                destX = this.getPosition().x + 100 * i;
            }else if(destX > windowWidth - 50){
                destX = this.getPosition().x - 100 + 100 * i;
            }
            TweenLite.to(enemy.getContent(), 0.5, {x:destX, y:this.getPosition().y - 50});
            this.screen.spawner.enemyList.push(enemy);
            this.screen.addEnemyThumb(enemy);
            this.screen.layer.addChild(enemy);
        }


        var tempLAbel = new PIXI.Text('+'+(this.model.money + APP.currentClothModel.extraCoins), {font:'30px Vagron', fill:'#ffe63e', stroke:'#665c18', strokeThickness:3});
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
        
        APP.appModel.totalPoints += this.model.money + APP.currentClothModel.extraCoins;
        // console.log(APP.getGameModel().killedBirds);
    }
});