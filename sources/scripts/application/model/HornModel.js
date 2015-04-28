/*jshint undef:false */
var HornModel = Class.extend({
	init:function(graphicsObject, statsObjec){

		this.cover = graphicsObject.cover?graphicsObject.cover:'uni_horn1.png';
		this.imgSource = graphicsObject.source?graphicsObject.source:'uni_horn1.png';
		this.bulletSource = graphicsObject.bulletSource?graphicsObject.bulletSource:'bullet.png';
		this.label = graphicsObject.label?graphicsObject.label:'';
		
		this.id = statsObjec.id?statsObjec.id:0;
		this.enabled = statsObjec.enabled?statsObjec.enabled:false;
		this.coast = statsObjec.coast?statsObjec.coast:0;
		this.sizePercent = statsObjec.sizePercent?statsObjec.sizePercent:1;
		this.demage = statsObjec.demage?statsObjec.demage:1;
		this.fireSpeed = statsObjec.fireSpeed?statsObjec.fireSpeed:15;
		this.fireAcumMax = statsObjec.fireAcumMax?statsObjec.fireAcumMax:10;
		this.hasMultiple = statsObjec.hasMultiple?statsObjec.hasMultiple:1;
		this.hasBounce = statsObjec.hasBounce?statsObjec.hasBounce:false;
		this.piercing = statsObjec.piercing?statsObjec.piercing:false;
		this.sinoid = statsObjec.sinoid?statsObjec.sinoid:0.0;
	},
	serialize:function(){
		
	}
});