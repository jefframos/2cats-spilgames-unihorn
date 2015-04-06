/*jshint undef:false */
var Spawner = Class.extend({
    init:function(screen){
        this.maxAccum = 20;
        this.accum = this.maxAccum;
        this.screen = screen;
        this.enemyList = [];
    },
    build: function(){
        
    },
    update: function(){
        if(this.accum < 0){
            var enemy = APP.appModel.getNewEnemy(null, this.screen);
            enemy.build();
            this.accum = enemy.model.toNext;
            // scaleConverter(enemy.getContent().height,windowHeight, 0.08, enemy);
            //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
            var part10 = windowWidth * 0.1;
            enemy.setPosition(part10 + (windowWidth - part10*2) * Math.random(),0);
            this.enemyList.push(enemy);
            this.screen.addEnemyThumb(enemy);
            this.screen.layer.addChild(enemy);

        }else{
            this.accum --;
        }
    }
});