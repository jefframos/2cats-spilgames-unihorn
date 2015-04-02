/*jshint undef:false */
var Spawner = Class.extend({
    init:function(screen){
        this.maxAccum = 150;
        this.accum = this.maxAccum;
        this.screen = screen;
    },
    build: function(){
        
    },
    update: function(){
        if(this.accum < 0){
            this.accum = this.maxAccum + 50 * Math.random();
            var enemy = new Enemy(this.screen);
            enemy.build();
            scaleConverter(enemy.getContent().height,windowHeight, 0.08, enemy);
            //UTILIZAR O ANGULO PARA CALCULAR A POSIÇÃO CORRETA DO TIRO
            var part10 = windowWidth * 0.1;
            enemy.setPosition(part10 + (windowWidth - part10*2) * Math.random(),0);
            enemy.velocity.y = 1;
            this.screen.layer.addChild(enemy);
        }else{
            this.accum --;
        }
    }
});