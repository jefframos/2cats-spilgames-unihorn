/*jshint undef:false */
var Spawner = Class.extend({
    init:function(screen){
        this.maxAccum = 20;
        this.accum = 120;
        this.screen = screen;
        this.enemyList = [];
        this.accCompare = 2;
        APP.accelGame = 1;
    },
    killAll: function(){
        // console.log('killAll');
        for (var i = this.enemyList.length - 1; i >= 0; i--) {
            this.enemyList[i].forceKill = true;
            this.enemyList[i].preKill();
        }
    },
    build: function(){
        
    },
    update: function(){
        if(this.accum < 0){
            var enemy = APP.appModel.getNewEnemy(null, this.screen);
            enemy.build();
            this.accum = enemy.model.toNext / (APP.accelGame);
            if(APP.accelGame < 6){
                APP.accelGame += APP.appModel.currentHorde / 500;
            }
            if(APP.accelGame > this.accCompare){
                this.accCompare ++;
                this.screen.improveClouds();
            }
            if(this.accum < 50){
                this.accum = 50;
            }
            // scaleConverter(enemy.getContent().height,windowHeight, 0.08, enemy);
            //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
            var part10 = windowWidth * 0.1;
            enemy.setPosition(part10 + (windowWidth - part10*2) * Math.random(),this.screen.HUDContainer.height);//windowHeight * 0.08);
            this.enemyList.push(enemy);
            this.screen.addEnemyThumb(enemy);
            this.screen.layer.addChild(enemy);

        }else{
            this.accum --;
        }
    }
});