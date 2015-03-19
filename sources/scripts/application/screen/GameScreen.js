/*jshint undef:false */
var GameScreen = AbstractScreen.extend({
    init: function (label) {
        this._super(label);
        this.isLoaded = false;
        APP.labelDebug.visible = false;
        this.pinDefaultVelocity = 3;
        // alert(this.isLoaded);
    },
    destroy: function () {
        this._super();
    },
    build: function () {
        this._super();
        // var assetsToLoader = [];
        var assetsToLoader = ['dist/img/atlas.json'];
        this.loader = new PIXI.AssetLoader(assetsToLoader);
        if(assetsToLoader.length > 0 && !this.isLoaded){
            this.initLoad();
        }else{
            this.onAssetsLoaded();
        }
        this.pinVel = {x:0, y:0};
    },
    onProgress:function(){
        console.log('progress');
        this._super();
    },
    onAssetsLoaded:function()
    {
        console.log('loaded');
        this.initApplication();
    },
    initApplication:function(){
        var bg = new SimpleSprite('bg.jpg');
        this.container.addChild(bg.getContent());
        scaleConverter(bg.getContent().width, windowWidth, 1.2, bg);
        bg.getContent().position.x = windowWidth / 2 - bg.getContent().width / 2;
        bg.getContent().position.y = windowHeight / 2 - bg.getContent().height / 2;

        var logo = new SimpleSprite('logo.png');
        this.container.addChild(logo.getContent());
        scaleConverter(logo.getContent().height, windowHeight, 0.05, logo);
        logo.getContent().position.x = windowWidth - logo.getContent().width - 20;
        logo.getContent().position.y = 20;

        this.seloGame = new SimpleSprite('seloGame.png');
        this.container.addChild(this.seloGame.getContent());
        

        this.seloGame.getContent().position.x = 20;
        this.seloGame.getContent().position.y = 20;

        // this.seloGame.getContent().position.x = windowWidth / 2 - this.seloGame.getContent().width / 2;
        // this.seloGame.getContent().position.y = windowHeight / 2 - this.seloGame.getContent().height / 2;

        var self = this;

        this.mazeContainer = new PIXI.DisplayObjectContainer();
        this.addChild(this.mazeContainer);
        // this.reset();
        
        // var self = this;
        this.pin = new DefaultButton('pinOut.png', 'pinOver.png');
        this.pin.build();
        this.mazeContainer.addChild(this.pin.getContent());
        this.pin.getContent().pivot.y = this.pin.getContent().height * 0.95;
        this.pin.getContent().pivot.x = this.pin.getContent().width / 2;
        scaleConverter(this.pin.getContent().height, windowHeight, 0.1, this.pin);

        
        this.lockIcons = new PIXI.DisplayObjectContainer();
        this.addChild(this.lockIcons);

        this.itemLockList = [];
        for (var i = 0; i < 4; i++) {
            var tempIco = new SimpleSprite('backItem.png');
            this.lockIcons.addChild(tempIco.getContent());
            tempIco.getContent().position.x = (windowWidth / 4)*i;// tempIco.getContent().width + 20) * i;
            // console.log(tempIco.getContent().position.x);
            this.itemLockList.push(tempIco.getContent());
        }
        
        this.pin.getContent().interactive = true;
        this.pinPos = {x: this.pin.getContent().position.x,y:this.pin.getContent().position.y};

        //create bounds
        this.vecObstacles = [];
        this.waypoints = [];
        this.itens = [];

        this.levels = [];
        this.currentLevel = 0;
        // var rects = [[0,0,this.mazeContainer.width,10]];

        var rectsLevel1 = [[18.5,11.5,283.1,18.8],
            [18.5,275,283.1,19.8],
            [18.5,239.75,51.05,16.7],
            [136,239,127.55,17.2],
            [136,203,127.55,13.2],
            [58,203.25,46.55,12.7],
            [19,169.5,46.55,7.1],
            [177,169,46.55,7.1],
            [217.5,130,46.55,7.1],
            [98,129.25,46.55,9.35],
            [247.35,90.5,53.05,12.2],
            [136.5,49.5,48.05,16.2],
            [58.5,50.25,46.55,15.7],
            [19,11.5,19,247.25],
            [57.5,50.8,15.5,127.15],
            [136.5,49.8,9,168.05],
            [212,9.8,11,168.05],
            [98,129,11.5,166.8],
            [98,50.3,11.5,50.15],
            [247.4,50.3,16.1,47.15],
            [247.5,167.8,16,88.95],
            [176.25,50.15,8,89.55],
            [283.45,49.8,20,247.65]
            ];

        this.levels.push({background:'labirinto1.png',
            rects:rectsLevel1,
            initPoint:[18.45,255.75,20,18.75],
            endPoint:[283.45,30.75,20,18.75],
            itemSrc:'saia.png',
            item:[60.45,255.75,20,18.75]//[112.4,142.75,20,18.75]
        });


        var rectsLevel2 = [[18.5,11.5,283.1,18.8],
            [18.5,275,283.1,19.8],
            [18.5,239.75,51.05,16.7],
            [175.5,237.5,86.55,17.2],
            [211.05,203,52.5,13.2],
            [58,203.25,46.55,12.7],
            [58.5,167.5,83.55,7.1],
            [177,169,124.05,7.1],
            [216.5,129,46.55,7.1],
            [23.5,127.75,84.55,9.35],
            [99.85,89,122.55,12.2],
            [136.5,49.5,87.05,16.2],
            [58.5,50.25,46.55,15.7],
            [19,11.5,19,247.25],
            [57.5,50.8,15.5,53.6],
            [136.5,129.2,9,126.05],
            [213,9.8,11,48],
            [98,239.45,11.5,54.85],
            [98,50.3,11.5,84.9],
            [247.4,50.3,16.1,85.25],
            [247,203,16,52.7],
            [283.45,49.8,20,247.65],
            [98.45,237.5,46,17.2],
            [175.5,129.2,9,126.05],
            [56.95,204.1,16,52.05],
            [213,90.35,11,46.65]
            ];

        this.levels.push({background:'labirinto2.png',
            rects:rectsLevel2,
            initPoint:[18.45,255.75,20,18.75],
            endPoint:[283.45,30.75,20,18.75],
            itemSrc:'casaco.png',
            item:[74.5,66.25,20,18.75]
        });

        var rectsLevel3 = [[18.5,11.5,283.1,18.8],
            [18.5,275,283.1,19.8],
            [18.5,239.75,51.05,16.7],
            [249.05,203,52.5,13.2],
            [58.5,167.5,83.55,7.1],
            [216.5,129,46.55,7.1],
            [59.5,127.75,84.55,9.35],
            [138.35,88,45.65,12.2],
            [98.95,49.5,164.15,16.2],
            [19,11.5,19,247.25],
            [58.5,12.3,15.5,53.6],
            [136.5,167.35,9,48.6],
            [136,239.45,11.5,54.85],
            [98,50.3,11.5,49.15],
            [247.4,50.3,16.1,51.15],
            [247,129.6,16,86.6],
            [283.45,49.8,20,247.65],
            [98.45,237.5,164.6,17.2],
            [175.5,90.15,9,165.6],
            [56.95,168.9,16,87.75],
            [214.5,89.85,11,125.6],
            [136.5,87.85,9,48.6],
            [22.8,88,85.65,12.2],
            [97.45,204.15,13,52]
            ];

        this.levels.push({background:'labirinto3.png',
            rects:rectsLevel3,
            initPoint:[18.45,255.75,20,18.75],
            endPoint:[283.45,30.75,20,18.75],
            itemSrc:'bolsa.png',
            item:[148.55,255.3,20,18.75]
        });

        var rectsLevel4 = [[18.5,11.5,283.1,18.8],
            [18.5,275,283.1,19.8],
            [18.5,239.75,90.55,16.7],
            [212,237.5,50.05,17.2],
            [137.05,203,45.5,13.2],
            [58,203.25,46.55,12.7],
            [58.5,167.5,124.55,7.1],
            [248,129,46.55,7.1],
            [137.35,89,122.55,12.2],
            [99.45,49.5,124.1,16.2],
            [19,11.5,19,247.25],
            [57.5,50.8,15.5,124.45],
            [136.5,204.65,9,50.55],
            [213,9.8,11,48],
            [98,202.7,11.5,54.05],
            [98,50.3,11.5,124.35],
            [247.4,50.3,16.1,85.25],
            [283.45,49.8,20,247.65],
            [175.5,129.2,9,45],
            [136.5,90.6,9,49.5],
            [178.5,129,46.55,7.1],
            [247,170,16,84.7],
            [175.5,204.25,9,89.4],
            [212,131.75,11.5,123.2]
            ];

        this.levels.push({background:'labirinto4.png',
            rects:rectsLevel4,
            initPoint:[18.45,255.75,20,18.75],
            endPoint:[283.45,30.75,20,18.75],
            itemSrc:'sapato.png',
            item:[189.55,31.25,20,18.75]
        });

        this.renderLevel();

        this.hitTouch = new PIXI.Graphics();
        this.hitTouch.interactive = true;
        this.hitTouch.beginFill(0);
        this.hitTouch.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.hitTouch);
        this.hitTouch.alpha = 0;
        this.hitTouch.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight);

        function updateVel(touchData){
            self.pinOver = true;
            // self.pinPos = {x:touchData.global.x - self.pin.getContent().width / 2, y: touchData.global.y - self.pin.getContent().height};
            // self.pinPos = {x:touchData.global.x - self.mazeContainer.position.x, y: touchData.global.y  - self.mazeContainer.position.y};
            self.pinPos = {x:(touchData.global.x - self.mazeContainer.position.x) / self.mazeContainer.scale.x,// - self.mazeContainer.position.x - self.pin.getContent().width,
                y: (touchData.global.y - self.mazeContainer.position.y - self.pin.getContent().height * 0.5) / self.mazeContainer.scale.y };//  - self.mazeContainer.position.y  - self.pin.getContent().height};

            var angle = Math.atan2(self.pinPos.y - self.pin.getContent().position.y, self.pinPos.x - self.pin.getContent().position.x);
            angle = angle * 180 / Math.PI;
            angle += 90;
            angle = angle / 180 * Math.PI;
            self.pinVel.x = self.pinDefaultVelocity * Math.sin(angle);
            self.pinVel.y = self.pinDefaultVelocity * -Math.cos(angle);
        }
        this.hitTouch.touchmove = function(touchData){
            updateVel(touchData);
        };

        this.hitTouch.touchstart = function(touchData){
            updateVel(touchData);
        };
        this.hitTouch.touchend = function(touchData){
            // alert('end');
            self.pinVel.x = 0;
            self.pinVel.y = 0;
            self.pin.setOut();
            self.pinOver = false;
        };

        this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
        TweenLite.to(this.frontShape, 0.8, {alpha:0});

        this.updateable = true;
    },
    update:function(){
        if(!this.updateable){
            return;
        }
        // console.log(this.pinOver);
        if(this.pin && this.pinOver){
            var testCollideX = false;
            var testCollideY = false;
            this.pin.setOver();

            var i = 0;

            if(this.itens){
                for (i = this.itens.length - 1; i >= 0; i--) {
                    if(this.itens[i].hitArea.contains(this.pin.getContent().position.x ,this.pin.getContent().position.y))
                    {
                        this.getItem(i);
                    }
                }
            }


            if(this.waypoints){
                for (i = this.waypoints.length - 1; i >= 0; i--) {
                    if(this.waypoints[i].hitArea.contains(this.pin.getContent().position.x ,this.pin.getContent().position.y))
                    {
                        this.verifyChangeLevel(i);
                    }
                }
            }

            for (i = this.vecObstacles.length - 1; i >= 0; i--) {
                var obs = this.vecObstacles[i];

                if(obs &&
                    obs.hitArea.contains(this.pin.getContent().position.x + this.pinVel.x * this.pinDefaultVelocity,
                    this.pin.getContent().position.y) ||
                    obs.hitArea.contains(this.pin.getContent().position.x + this.pinVel.x * this.pinDefaultVelocity,
                    this.pin.getContent().position.y)){
                    this.pinVel.x = 0;
                }
                if(obs &&
                    obs.hitArea.contains(this.pin.getContent().position.x,
                    this.pin.getContent().position.y + this.pinVel.y * this.pinDefaultVelocity) ||
                    obs.hitArea.contains(this.pin.getContent().position.x,
                    this.pin.getContent().position.y + this.pinVel.y * this.pinDefaultVelocity)){
                    this.pinVel.y = 0;
                }
            }
            

            // else{
            if(pointDistance(this.pinPos.x, this.pinPos.y, this.pin.getContent().position.x, this.pin.getContent().position.y) > 10){
                this.pin.getContent().position.x += this.pinVel.x;
                this.pin.getContent().position.y += this.pinVel.y;
            }
                // else{
                    
                // }
            
            // this.pin.getContent().position.x = this.pinPos.x;
            // this.pin.getContent().position.y = this.pinPos.y;
        }
    },
    getItem:function(id){
        console.log(this.itemLockList[this.currentLevel], this.itensGraphics[id].getContent());
        this.itensGraphics[id].alpha = 0.5;
        this.itemLockList[this.currentLevel].addChild(this.itensGraphics[id].getContent());
        this.itensGraphics[id].getContent().position.x = this.itemLockList[this.currentLevel].position.x - this.itensGraphics[id].getContent().width / 2 + this.itemLockList[this.currentLevel].width/2;
        this.itensGraphics[id].getContent().position.y = this.itemLockList[this.currentLevel].position.y - this.itensGraphics[id].getContent().height / 2 + this.itemLockList[this.currentLevel].height/2;
        this.itens.splice(id,1);
    },
    verifyChangeLevel:function(idWay){
        if(idWay === 1){
            this.currentLevel++;
            if(this.currentLevel >= this.levels.length){
                this.currentLevel = 0;
                // this.screenManager.change('Init');
                // return;
            }
        }else{
            this.currentLevel--;
            if(this.currentLevel < 0){
                this.currentLevel = this.levels.length - 1;
            }
        }
        this.renderLevel(idWay === 1?0:1);
    },
    renderLevel:function(whereInit){

        if(!whereInit){
            whereInit = 0;
        }
        var i = 0;
        this.waypoints = [];
        this.vecObstacles = [];
        this.itens = [];
        this.itensGraphics = [];

        if(this.itens.length > 0){
            for (i = this.itens.length - 1; i >= 0; i--) {
                if(this.itens[i].getContent() && this.itens[i].getContent().parent){
                    this.itens[i].getContent().parent.removeChild(this.itens[i].getContent());
                }
            }
        }

        if(this.vecObstacles.length > 0){
            for (i = this.vecObstacles.length - 1; i >= 0; i--) {
                if(this.vecObstacles[i].getContent() && this.vecObstacles[i].getContent().parent){
                    this.vecObstacles[i].getContent().parent.removeChild(this.vecObstacles[i].getContent());
                }
            }
        }
        var levelObj = this.levels[this.currentLevel];
        if(this.maze && this.maze.getContent()){
            this.maze.getContent().parent.removeChild(this.maze.getContent());
        }

        if(this.itensGraphics.length > 0){
            for (i = this.itensGraphics.length - 1; i >= 0; i--) {
                if(this.itensGraphics[i].getContent() && this.itensGraphics[i].getContent().parent){
                    this.itensGraphics[i].getContent().parent.removeChild(this.itensGraphics[i].getContent());
                }
            }
        }

        this.maze = new SimpleSprite(levelObj.background);
        this.mazeContainer.addChild(this.maze.getContent());

        this.lockIcons.position.x = windowWidth / 2 - this.lockIcons.width / 2;
        this.lockIcons.position.y = windowHeight - this.lockIcons.height - 20;

        // var scaleMaze = scaleConverter(this.maze.getContent().height, windowHeight, 0.55, this.mazeContainer);
        var scaleMaze = scaleConverter(this.maze.getContent().width, windowWidth, 1, this.mazeContainer);

        this.mazeContainer.position.x = windowWidth / 2 - (scaleMaze * this.maze.getContent().width) / 2;
        this.mazeContainer.position.y = this.lockIcons.position.y - 20 - (scaleMaze * this.maze.getContent().height);//windowHeight / 2 - (scaleMaze * this.maze.getContent().height) / 2;

        var logScale = (this.mazeContainer.position.y - 20) / windowHeight;
        console.log(logScale, windowHeight,this.mazeContainer.position.y);
        scaleConverter(this.seloGame.getContent().height, windowHeight, logScale , this.seloGame);


        for (i = levelObj.rects.length - 1; i >= 0; i--) {
            var obs = new PIXI.Graphics();
            obs.lineStyle(1, 0);
            obs.drawRect(0,0,levelObj.rects[i][2], levelObj.rects[i][3]);
            // this.mazeContainer.addChild(obs);
            obs.position.x = levelObj.rects[i][0];
            obs.position.y = levelObj.rects[i][1];
            obs.hitArea = new PIXI.Rectangle(obs.position.x,obs.position.y,obs.width, obs.height);
            this.vecObstacles.push(obs);
        }

        var tempInitP = new PIXI.Graphics();
        if(levelObj.item){
            console.log(levelObj.item);
            tempInitP.lineStyle(1, 0x0000FF);
            tempInitP.drawRect(0,0,levelObj.item[2], levelObj.item[3]);
            this.mazeContainer.addChild(tempInitP);
            tempInitP.position.x = levelObj.item[0];
            tempInitP.position.y = levelObj.item[1];
            tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x,tempInitP.position.y,tempInitP.width, tempInitP.height);
            this.itens.push(tempInitP);

            var graphicItem = new SimpleSprite(levelObj.itemSrc);
            graphicItem.getContent().position.x = tempInitP.position.x - graphicItem.getContent().width / 2 + tempInitP.width/2;
            graphicItem.getContent().position.y = tempInitP.position.y - graphicItem.getContent().height / 2 + tempInitP.height/2;
            this.itensGraphics.push(graphicItem);
            this.mazeContainer.addChild(graphicItem.getContent());
        }

        if(levelObj.initPoint){
            tempInitP = new PIXI.Graphics();
            tempInitP.lineStyle(1, 0xFF0000);
            tempInitP.drawRect(0,0,levelObj.initPoint[2], levelObj.initPoint[3]);
            this.mazeContainer.addChild(tempInitP);
            tempInitP.position.x = levelObj.initPoint[0];
            tempInitP.position.y = levelObj.initPoint[1];
            tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x,tempInitP.position.y,tempInitP.width, tempInitP.height);
            this.waypoints.push(tempInitP);
            if(whereInit === 0){
                this.pin.getContent().position.x = tempInitP.position.x + tempInitP.width + 1;
                this.pin.getContent().position.y = tempInitP.position.y + tempInitP.height / 2;
            }
        }

        if(levelObj.endPoint){
            tempInitP = new PIXI.Graphics();
            tempInitP.lineStyle(1, 0x00FF00);
            tempInitP.drawRect(0,0,levelObj.endPoint[2], levelObj.endPoint[3]);
            this.mazeContainer.addChild(tempInitP);
            tempInitP.position.x = levelObj.endPoint[0];
            tempInitP.position.y = levelObj.endPoint[1];
            tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x,tempInitP.position.y,tempInitP.width, tempInitP.height);
            this.waypoints.push(tempInitP);
            if(whereInit === 1){
                this.pin.getContent().position.x = tempInitP.position.x -1;
                this.pin.getContent().position.y = tempInitP.position.y + tempInitP.height / 2;
            }
        }
        

        this.pin.getContent().parent.setChildIndex(this.pin.getContent(), this.pin.getContent().parent.children.length - 1);

        var self = this;
        this.updateable = false;
        this.frontShape.alpha = 1;
        this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1);
        TweenLite.to(this.frontShape, 0.8, {alpha:0, onComplete:function(){
            self.updateable = true;
        }});

    },
    transitionIn:function()
    {
        // if(!this.isLoaded){
        //     this.build();
        //     return;
        // }
        // alert('transitionIn', this.screenLabel);
        // if(AbstractScreen.debug)console.log('transitionIn', this.screenLabel);
        this.frontShape = new PIXI.Graphics();
        this.frontShape.beginFill(0xfc95dd);
        this.frontShape.drawRect(0,0,windowWidth, windowHeight);
        this.addChild(this.frontShape);
        this.build();

    },
    transitionOut:function(nextScreen, container)
    {
        // this._super();
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