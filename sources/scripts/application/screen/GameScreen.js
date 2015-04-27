/*jshint undef:false */
var GameScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
        this.isLoaded = false;
        this.pinDefaultVelocity = 3;
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        var assetsToLoader = [];
        // var assetsToLoader = ['dist/img/atlas.json'];
        // this.loader = new PIXI.AssetLoader(assetsToLoader);
        if(assetsToLoader !== undefined && assetsToLoader.length > 0 && !this.isLoaded){
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }
        this.pinVel = {x:0, y:0};
        console.log('buid');
    },
    onProgress:function(){
        this._super();
    },
    onAssetsLoaded:function()
    {
        this.initApplication();
    },
    initApplication:function(){
        var self = this;
        this.bg = new SimpleSprite(APP.currentEnvModel.imgSource);
        this.addChild(this.bg.getContent());
        scaleConverter(this.bg.getContent().width, windowWidth, 1.2, this.bg);
        this.bg.getContent().position.x = windowWidth / 2 - this.bg.getContent().width / 2;
        this.bg.getContent().position.y = windowHeight / 2 - this.bg.getContent().height / 2;


        this.darkShape = new PIXI.DisplayObjectContainer();
        this.addChild(this.darkShape);
        var dark = new PIXI.Graphics();
        dark.beginFill(0);
        dark.drawRect(0,0,windowWidth, windowHeight);
        this.darkShape.addChild(dark);
        this.darkShape.alpha = 0;
        // this.darkShape.blendModes = PIXI.blendModes.OVERLAY;



        APP.accelGame = 1;



        this.renderLevel();

        this.hitTouch = new PIXI.Graphics();
        this.hitTouch.interactive = true;
        this.hitTouch.beginFill(0);
        this.hitTouch.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.hitTouch);
        this.hitTouch.alpha = 0;
        this.hitTouch.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight);
        this.mouseAngle = 0;
        function updateVel(touchData){
            if(!self.updateable){
                return;
            }
            if(testMobile()){
                fullscreen();
            }
            var angle = Math.atan2(touchData.global.y - self.hornPos.y, (touchData.global.x) - self.hornPos.x);
            
            var tempCompare = angle* 180 / Math.PI;
            var change = false;
            if(tempCompare > -45){
                change = true;
            }
            if(tempCompare < -125){
                change = true;
            }
            if(change){
                if(touchData.global.x < windowWidth / 2){
                    tempCompare = -125;
                }else{
                    tempCompare = -45;
                }
            }
            // console.log(tempCompare);
            if((tempCompare) <= -45 && (tempCompare) >= -125)
            {
                angle = degreesToRadians(tempCompare);
                self.mouseAngle = angle;

                angle = angle * 180 / Math.PI;
                angle += 90;
                angle = angle / 180 * Math.PI;

                self.unihorn.head.rotation = angle;
            }
            //self.shoot(angle);
        }
        
        if(!testMobile()){
            this.hitTouch.mousemove = function(touchData){
                updateVel(touchData);
            };
            this.hitTouch.mousedown = function(mouseData){
                self.touchDown = true;
                self.fireAcum = 0;
                console.log('mousedown');
                updateVel(mouseData);
            };

            this.hitTouch.mouseup = function(mouseData){
                self.touchDown = false;
                updateVel(mouseData);
            };
        }
        this.hitTouch.touchmove = function(touchData){
            updateVel(touchData);
        };
        this.hitTouch.touchstart = function(touchData){
            self.touchDown = true;
            self.fireAcum = 0;
            console.log('mousedown');
            updateVel(touchData);
        };
        this.hitTouch.touchend = function(touchData){
            self.touchDown = false;
            updateVel(touchData);
        };

        this.updateable = true;
        this.fireAcumMax = APP.currentHornModel.fireAcumMax - APP.currentClothModel.fireAcumMax;
        this.fireAcum = this.fireAcumMax;

        this.backButton = new DefaultButton('UI_button_default_1.png', 'UI_button_default_1.png');
        this.backButton.build();
        this.backButton.addLabel(new PIXI.Text('BACK', {font:'50px Vagron', fill:'#FFFFFF'}), 40);
        scaleConverter(this.backButton.getContent().width, windowWidth, 0.4, this.backButton);
        this.backButton.setPosition(20,
            windowHeight - this.backButton.getContent().height * 2.5);
        // this.addChild(this.backButton);
      
        this.backButton.clickCallback = function(){
            self.updateable = false;
            self.toTween(function(){
                self.screenManager.change('Init');
            });
        };

        this.endGameButton = new DefaultButton('UI_button_default_1.png', 'UI_button_default_1.png');
        this.endGameButton.build();
        this.endGameButton.addLabel(new PIXI.Text('END', {font:'50px Vagron', fill:'#FFFFFF'}), 45);
        scaleConverter(this.endGameButton.getContent().width, windowWidth, 0.4, this.endGameButton);
        this.endGameButton.setPosition(windowWidth - 20 - this.endGameButton.getContent().width,
            windowHeight - this.endGameButton.getContent().height * 2.5);
        // this.addChild(this.endGameButton);
      
        this.endGameButton.clickCallback = function(){
            self.updateable = false;
            self.endModal.show();
        };

        // this.setAudioButtons();
        
        


        if(APP.withAPI){
            GameAPI.GameBreak.request(function(){
                self.pauseModal.show();
            }, function(){
                self.pauseModal.hide();
            });
        }

        this.layerManager = new LayerManager();
        this.layerManager.build('Main');

        this.addChild(this.layerManager);

        //adiciona uma camada
        this.layer = new Layer();
        this.layer.build('EntityLayer');
        this.layerManager.addLayer(this.layer);

        this.spawner = new Spawner(this);

        this.unihorn = new Unihorn();
        this.unihorn.build();
        this.addChild(this.unihorn);
        this.unihorn.felling = 1;
        // console.log(this.unihorn.sprite.height);
        var scl = scaleConverter(this.unihorn.neck.height, windowHeight, 0.3, this.unihorn);
        this.unihorn.getContent().position.y = windowHeight - this.unihorn.neck.height * scl;//this.unihorn.getContent().height;
        this.unihorn.getContent().position.x = windowWidth / 2 - (this.unihorn.head.position.x + this.unihorn.horn.position.x) * scl ;//this.unihorn.getContent().height;
        // console.log(this.unihorn.head.position.x * scl);
        // this.unihorn.getContent().position.y = windowHeight - this.unihorn.neck.height * scl;//this.unihorn.getContent().height;

        // this.topD = new SimpleSprite('top_degrade.png');
        // this.addChild(this.topD.getContent());
        // this.topD.getContent().width = windowWidth * 1.5;
        // this.topD.getContent().position.x = -windowWidth * 0.25;
        // this.topD.getContent().blendModes = PIXI.blendModes.MULTIPLY;

        // this.hornPos = {x:this.unihorn.head.position.x * scl, y:windowHeight - (this.unihorn.head.position.y * this.unihorn.head.anchor.y) * scl};// - this.unihorn.head.position.y * scl};
        // this.hornPos = {x:(this.unihorn.getContent().position.x * this.unihorn.getContent().anchor.x) + (this.unihorn.head.position.x * this.unihorn.head.anchor.x)+ (this.unihorn.horn.position.x * this.unihorn.horn.anchor.x),
        this.hornPos = {x:(this.unihorn.getContent().position.x)+ ((this.unihorn.head.position.x + this.unihorn.horn.position.x) * scl),//  + (this.unihorn.horn.position.x),
        y:(this.unihorn.getContent().position.y)+ (this.unihorn.head.position.y * scl)};// - this.unihorn.head.position.y * scl};
        // y:windowHeight - (this.unihorn.head.position.y * this.unihorn.head.anchor.y) * scl};// - this.unihorn.head.position.y * scl};
        
        TweenLite.from(this.unihorn.getContent().position, 0.3, {delay: 0.3, x: windowWidth / 2 - 2 * ((this.unihorn.head.position.x + this.unihorn.horn.position.x) * scl),y:this.unihorn.getContent().position.y + (this.unihorn.neck.height * scl), ease:'easeOutCubic'});
        // test = new PIXI.Graphics();
        // test.beginFill(0);
        // test.drawRect(this.hornPos.x - 5,this.hornPos.y - 5,10, 10);
        // this.addChild(test);

        

        this.HUDback = new SimpleSprite('barra.png');
        
        


        this.pauseButton = new DefaultButton('UI_button_pause_1.png', 'UI_button_pause_1_over.png', 'UI_button_pause_1_over.png');
        this.pauseButton.build();
        // scaleConverter(this.pauseButton.getContent().width, windowWidth, 0.1, this.pauseButton);

        scaleConverter(this.pauseButton.getContent().height, this.HUDback.getContent().height, 0.8, this.pauseButton);
        // this.pauseButton.setPosition(20,windowHeight - this.pauseButton.getContent().height - 20);
      
        this.pauseButton.clickCallback = function(){
            if(!self.updateable){
                return;
            }
            self.pauseModal.show();
        };


        this.HUDContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.HUDContainer);


        // this.HUDback = new PIXI.Graphics();
        // this.HUDback.beginFill(0x000000);
        // this.HUDback.drawRect(0,0,windowWidth, this.pauseButton.getContent().height * 1.2);
        // this.HUDback.alpha = 0.5;

        // scaleConverter(this.HUDback.getContent().height, this.pauseButton.getContent().height, 1.3, this.HUDback);
        scaleConverter(this.HUDback.getContent().width, windowWidth, 1, this.HUDback);

        this.pauseButton.getContent().position.x = this.HUDback.getContent().height * 0.1;
        this.pauseButton.getContent().position.y = this.HUDback.getContent().height * 0.1;


        this.coinsLabel = new PIXI.Text(APP.appModel.totalPoints, {align:'center',font:'32px Vagron', fill:'#FFF', wordWrap:true, wordWrapWidth:500, stroke:'#352745', strokeThickness:5});
        scaleConverter(this.coinsLabel.height, this.pauseButton.getContent().height, 1, this.coinsLabel);
        this.coinsLabel.position.x = windowWidth - this.coinsLabel.width - this.HUDback.getContent().height * 0.1;
        this.coinsLabel.position.y = this.HUDback.getContent().height * 0.1;

        this.star = new SimpleSprite('star_coin.png');

        this.star.getContent().position.x = this.coinsLabel.position.x -this.star.getContent().width * 1.1;
        this.star.getContent().position.y = this.coinsLabel.position.y + this.coinsLabel.height / 2 -this.star.getContent().height / 2;

        this.HUDContainer.addChild(this.HUDback.getContent());
        this.HUDContainer.addChild(this.pauseButton.getContent());
        this.HUDContainer.addChild(this.coinsLabel);
        this.HUDContainer.addChild(this.star.getContent());

        TweenLite.from(this.HUDContainer.position, 0.3, {delay:1, y:-50});

        // this.HUDContainer.position.y = windowHeight - this.HUDContainer.height;

        this.thumbContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.thumbContainer);
        this.back = new PIXI.Graphics();
        this.back.beginFill(0);
        this.back.drawRect(0,0,windowWidth, 40);
        // this.thumbContainer.addChild(this.back);
        this.thumbContainer.position.y = this.HUDContainer.height;
        this.badClouds = [];
        this.maxClouds = 10;

        this.arcoiris = new SimpleSprite('arcoiris_redondo.png');
        this.thumbContainer.addChild(this.arcoiris.getContent());
        scaleConverter(this.arcoiris.getContent().width, windowWidth, 1.4, this.arcoiris);
        this.arcoiris.getContent().position.x = -windowWidth * 0.2;

        TweenLite.from(this.arcoiris.getContent().position, 0.3, {delay:0.7, y:-20});
        TweenLite.from(this.arcoiris.getContent(), 0.3, {delay:0.7, alpha:0});
        // this.arcoiris.getContent().position.y = this.HUDContainer.height;


        this.fromTween();

        this.end = false;
        this.startCoinMonitore = false;
        this.blockPause = false;

        this.specAccMax = 350;
        this.specAcc = 0;


        //MODAIS
        this.pauseModal = new PauseModal(this);
        this.endModal = new EndModal(this);

        // this.updateable = false;
        // this.endModal.show();
        // this.thumbContainer.scale.x = 0.5;
        // this.thumbContainer.scale.y = 0.5;
    },
    addEnemyThumb:function(enemy){
        this.thumbContainer.addChild(enemy.thumb);
    },
    updateBadClouds:function(){
        for (var i = 0; i < this.badClouds.length; i++) {
            // this.badClouds[i].position.x = i * windowWidth / this.maxClouds;
            TweenLite.to(this.badClouds[i].position, 0.3, {x : windowWidth - this.badClouds[i].width / 4 -  i * windowWidth / this.maxClouds});
        }
    },
    addSpecial:function(){
        this.specAcc = this.specAccMax;
        if(this.specialLabel && this.specialLabel.parent){
            this.specialLabel.parent.removeChild(this.specialLabel);
        }
        var type = APP.appModel.addRandonBehaviour();
        this.specialLabel  = new PIXI.Text(type, {font:'40px Vagron', fill:'#ffe63e', stroke:'#665c18', strokeThickness:3});
        this.specialLabel.position.x = windowWidth / 2 - this.specialLabel.width / 2;
        this.specialLabel.position.y = windowHeight / 2 - this.specialLabel.height / 2;
        this.addChild(this.specialLabel);
    },
    updateCloudList:function(){
        var hasbad = false;
        for (var i = 0; i < this.spawner.enemyList.length; i++) {
            if(this.spawner.enemyList[i].kill){
                this.thumbContainer.removeChild(this.spawner.enemyList[i].thumb);
                this.spawner.enemyList.splice(i,1);
            }else if(!this.spawner.enemyList[i].onList && !this.spawner.enemyList[i].kill){
                var tempEnemy = this.spawner.enemyList[i];
                var thumbEnemy = this.spawner.enemyList[i].thumb;

                var maxL = windowWidth - windowWidth * (this.badClouds.length / this.maxClouds);
                var acc = windowWidth / this.maxClouds * this.badClouds.length;
                // console.log(maxL, acc);
                var targetX = thumbEnemy.width / 4 + acc + (maxL) - ((maxL) * (tempEnemy.getContent().position.y / windowHeight));
                TweenLite.to(thumbEnemy.position, 0.3, {x : windowWidth - targetX});
                //fazer aqui a curvatura
                var center = Math.atan2(this.thumbContainer.position.y - windowHeight / 2, thumbEnemy.position.x - windowWidth / 2);
                TweenLite.to(thumbEnemy.position, 0.3, {y : Math.sin(center) * windowHeight / 2 + windowHeight / 2 + thumbEnemy.height / 2});
                if(this.badClouds.length >= this.maxClouds){
                    this.endGame();//this.endModal.show();
                }
                if(tempEnemy.getContent().position.y > windowHeight){
                    tempEnemy.removeSprite();
                    this.badClouds.push(thumbEnemy);
                    this.unihorn.deaded();
                    hasbad = true;
                    TweenLite.to(this.darkShape, 0.5, {alpha:0.8 * this.badClouds.length / this.maxClouds});
                }
            }
        }
        if(hasbad){
            this.updateBadClouds();
        }
    },
    endGame:function(){
        this.end = true;
        this.spawner.killAll();
        this.specialLabel.alpha = 0;
        APP.appModel.removeBehaviour();
        var self = this;
        self.arrayCoins = [];
        this.unihorn.sad();
        TweenLite.to(this.darkShape, 0.5, {alpha:0});
        function onComplete(target){
            if(target && target.parent){
                target.parent.removeChild(target);
            }
            var tempCoin = new Coin(self);
            tempCoin.build();
            scaleConverter(tempCoin.getContent().height, target.height, 0.8, tempCoin);
            tempCoin.getContent().position.x = target.position.x;
            tempCoin.getContent().position.y = target.position.y;
            self.layer.addChild(tempCoin);
            self.arrayCoins.push(tempCoin);
            self.startCoinMonitore = true;
        }
        var times = [];
        for (var j = this.badClouds.length - 1; j >= 0; j--) {
            times.push(j);
        }
        times = shuffle(times);
        for (var i = this.badClouds.length - 1; i >= 0; i--) {
            TweenLite.to(this.badClouds[i], 0.3, {delay:1 + times[i] / 5, alpha:0});
            TweenLite.to(this.badClouds[i].scale, 0.3, {delay:0.5 + times[i] / 5, x:this.badClouds[i].scale.x+0.2, y:this.badClouds[i].scale.y+0.2,
                ease:'easeOutElastic', onCompleteParams:[this.badClouds[i]],
                onComplete:onComplete});
        }
    },
    update:function(){
        if(!this.updateable){
            return;
        }
        this._super();
        if(!this.end){
            this.unihorn.update();
            this.spawner.update();
            this.updateCloudList();
            if(this.specialLabel && this.specialLabel.parent){
                this.specialLabel.alpha = this.specAcc / this.specAccMax;
            }
            if(this.specAcc > 0){
                this.specAcc --;
            }else{
                APP.appModel.removeBehaviour();
            }
        }else{
            if(this.startCoinMonitore){
                for (var i = this.arrayCoins.length - 1; i >= 0; i--) {
                    if(this.arrayCoins[i].kill){
                        this.arrayCoins.splice(i,1);
                    }
                }
                if(this.arrayCoins.length <= 0){
                    this.endModal.show();
                }
            }

        }
        if(this.fireAcum > 0){
            this.fireAcum--;
        }else{
            if(this.touchDown){
                this.shoot(this.mouseAngle);
                this.fireAcum = this.fireAcumMax;
            }
        }
        this.coinsLabel.setText(APP.appModel.totalPoints);
        this.coinsLabel.position.x = windowWidth - this.coinsLabel.width - this.HUDback.getContent().height * 0.1;
        this.star.getContent().position.x = this.coinsLabel.position.x -this.star.getContent().width * 1.1;
    },
    shoot:function(angle) {
        if(this.blockPause){
            return;
        }
        var timeLive = 100;

        var vel = APP.currentHornModel.fireSpeed + APP.currentClothModel.fireSpeed;

        // var bullet = new Bullet({x:Math.cos(angle) * vel,
        //     y:Math.sin(angle) * vel},
        //     timeLive, 5, null, true);
        // bullet.build();
        // bullet.hasBounce = APP.currentHornModel.hasBounce;
        // bullet.demage = APP.currentHornModel.demage;
        // scaleConverter(bullet.getContent().height,windowHeight, 0.06, bullet);
        // bullet.startScaleTween();
        // //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
        // bullet.setPosition(this.hornPos.x, this.hornPos.y);
        // this.layer.addChild(bullet);
        var angleOpen = 0.3;
        var totalFires = APP.currentHornModel.hasMultiple;
        this.unihorn.shoot();
        console.log(totalFires);
        for (var i = 0; i < totalFires; i++) {
            var tempAngle = angle + angleOpen * (i - totalFires / 2);
            if(totalFires === 1){
                tempAngle = angle;
            }
            var bullet = new Bullet({x:Math.cos(tempAngle) * vel,
            y:Math.sin(tempAngle) * vel},
            timeLive, 5, null, true);
            bullet.build();
            bullet.hasBounce = APP.currentHornModel.hasBounce;
            bullet.piercing = APP.currentHornModel.piercing;
            bullet.sinoid = APP.currentHornModel.sinoid;
            bullet.demage = APP.currentHornModel.demage + APP.currentClothModel.demage;
            // console.log((bullet.demage));
            scaleConverter(bullet.getContent().height,windowHeight, 0.06 + APP.currentClothModel.sizePercent, bullet);
            bullet.startScaleTween();
            //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
            bullet.setPosition(this.hornPos.x, this.hornPos.y);
            this.layer.addChild(bullet);
        }
    },
    reset:function(){
        this.destroy();
        this.build();
    },
    renderLevel:function(whereInit){

    },
    setAudioButtons:function(){

        var self = this;
        APP.mute = true;
        Howler.mute();

        this.audioOn = new DefaultButton('volumeButton_on.png', 'volumeButton_on_over.png');
        this.audioOn.build();
        scaleConverter(this.audioOn.width, windowWidth, 0.15, this.audioOn);
        this.audioOn.setPosition(windowWidth - this.audioOn.getContent().width - 20, 20);
        // this.audioOn.setPosition( windowWidth - this.audioOn.getContent().width  - 20, 20);

        this.audioOff = new DefaultButton('volumeButton_off.png', 'volumeButton_off_over.png');
        this.audioOff.build();
        scaleConverter(this.audioOff.width, windowWidth, 0.15, this.audioOff);
        this.audioOff.setPosition(windowWidth - this.audioOn.getContent().width - 20, 20);

       

        if(!APP.mute){
            this.addChild(this.audioOn);
        }else{
            this.addChild(this.audioOff);
        }

        this.audioOn.clickCallback = function(){
            APP.mute = true;
            Howler.mute();
            if(self.audioOn.getContent().parent)
            {
                self.audioOn.getContent().parent.removeChild(self.audioOn.getContent());
            }
            if(self.audioOff.getContent())
            {
                self.addChild(self.audioOff);
            }
        };
        this.audioOff.clickCallback = function(){
            APP.mute = false;
            Howler.unmute();
            if(self.audioOff.getContent().parent)
            {
                self.audioOff.getContent().parent.removeChild(self.audioOff.getContent());
            }
            if(self.audioOn.getContent())
            {
                self.addChild(self.audioOn);
            }
        };
    },
    toTween:function(callback){
        TweenLite.to(this.bg.getContent(), 0.5, {alpha:0});

        // TweenLite.to(this.pauseButton.getContent(), 0.5, {delay:0.3,y:-this.pauseButton.getContent().height, ease:'easeOutBack'});
        TweenLite.to(this.endGameButton.getContent(), 0.5, {delay:0.2,y:windowHeight, ease:'easeOutBack'});
        TweenLite.to(this.backButton.getContent(), 0.5, {delay:0.1,y:windowHeight, ease:'easeOutBack', onComplete:function(){
            if(callback){
                callback();
            }
        }});
       
        if(this.audioOn){
            TweenLite.to(this.audioOn.getContent(), 0.5, {delay:0.4,y:-this.audioOn.getContent().height, ease:'easeOutBack'});
        }
        if(this.audioOff){
            TweenLite.to(this.audioOff.getContent(), 0.5, {delay:0.4,y:-this.audioOn.getContent().height, ease:'easeOutBack'});
        }
    },
    fromTween:function(callback){
        TweenLite.from(this.bg.getContent(), 0.5, {alpha:0});

        // TweenLite.from(this.pauseButton.getContent(), 0.5, {delay:0.1,y:-this.pauseButton.getContent().height, ease:'easeOutBack'});

        TweenLite.from(this.endGameButton.getContent(), 0.5, {delay:0.5,y:windowHeight, ease:'easeOutBack'});
        TweenLite.from(this.backButton.getContent(), 0.5, {delay:0.4,y:windowHeight, ease:'easeOutBack', onComplete:function(){
            if(callback){
                callback();
            }
        }});
       
        if(this.audioOn){
            TweenLite.from(this.audioOn.getContent(), 0.5, {delay:0.3,y:-this.audioOn.getContent().height, ease:'easeOutBack'});
        }
        if(this.audioOff){
            TweenLite.from(this.audioOff.getContent(), 0.5, {delay:0.3,y:-this.audioOn.getContent().height, ease:'easeOutBack'});
        }
    },
    transitionIn:function()
    {
        // this.frontShape = new PIXI.Graphics();
        // this.frontShape.beginFill(0xfc95dd);
        // this.frontShape.drawRect(0,0,windowWidth, windowHeight);
        // this.addChild(this.frontShape);
        this.build();
        // if(this.frontShape){
        //     this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
        //     TweenLite.to(this.frontShape, 0.8, {alpha:0});
        // }
    },
    transitionOut:function(nextScreen, container)
    {
        // this._super();
        // console.log('out');
        var self = this;
        if(this.frontShape){
            this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
            TweenLite.to(this.frontShape, 0.3, {alpha:1, onComplete:function(){
                self.destroy();
                container.removeChild(self.getContent());
                nextScreen.transitionIn();
            }});
        }else{
            self.destroy();
            container.removeChild(self.getContent());
            nextScreen.transitionIn();
        }

        
    },
});