/*jshint undef:false */
var EnemyModel = Class.extend({
	init:function(graphicsObject, statsObjec){

		this.thumb = graphicsObject.thumb?graphicsObject.thumb:'belga.png';
		this.cover = graphicsObject.cover?graphicsObject.cover:'belga.png';
		this.imgSource = graphicsObject.source?graphicsObject.source:['belga.png'];
		this.particles = graphicsObject.particles?graphicsObject.particles:['smoke.png'];
		this.egg = graphicsObject.egg?graphicsObject.egg:['smoke.png'];
		this.sizePercent = graphicsObject.sizePercent?graphicsObject.sizePercent:0.2;
		this.label = graphicsObject.label?graphicsObject.label:'';
		this.sizePercent = graphicsObject.sizePercent?graphicsObject.sizePercent:0.1;
		
		this.moreStats = statsObjec.moreStats?statsObjec.moreStats:false;
		this.bounce = statsObjec.bounce?statsObjec.bounce:false;
		this.demage = statsObjec.demage;
		this.vel = statsObjec.vel;
		this.hp = statsObjec.hp;
		this.target = statsObjec.target;
		this.timeLive = 999;
		this.toNext = statsObjec.toNext?statsObjec.toNext:150;
		this.behaviour = statsObjec.behaviour;
		this.money = statsObjec.money;
		this.resistance = statsObjec.resistance?statsObjec.resistance:0;
		this.subdivide = statsObjec.subdivide?statsObjec.subdivide:0;
		this.special = statsObjec.special?statsObjec.special:false;

		// console.log(this.bounce);
	},
	serialize:function(){
		
	}
});