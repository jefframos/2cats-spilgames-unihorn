/*jshint undef:false */
var HornModel = Class.extend({
	init:function(graphicsObject, statsObjec){

		this.cover = graphicsObject.cover?graphicsObject.cover:'uni_horn1.png';
		this.imgSource = graphicsObject.source?graphicsObject.source:'uni_horn1.png';
		this.bulletSource = graphicsObject.bulletSource?graphicsObject.bulletSource:'bullet.png.png';
		this.label = graphicsObject.label?graphicsObject.label:'';
		
		this.demage = statsObjec.demage?statsObjec.demage:1;
		this.fireSpeed = statsObjec.fireSpeed?statsObjec.fireSpeed:10;
		this.fireAcumMax = statsObjec.fireAcumMax?statsObjec.fireAcumMax:10;
		this.hasMultiple = statsObjec.hasMultiple?statsObjec.hasMultiple:1;
		this.hasBounce = statsObjec.hasBounce?statsObjec.hasBounce:true;
		this.piercing = statsObjec.piercing?statsObjec.piercing:true;
		this.sinoid = statsObjec.sinoid?statsObjec.sinoid:0.1;
		this.sinoid = statsObjec.sinoid?statsObjec.sinoid:0.0;
	},
	serialize:function(){
		
	}
});