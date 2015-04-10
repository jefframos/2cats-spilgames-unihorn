/*jshint undef:false */
var ClothModel = Class.extend({
	init:function(graphicsObject, statsObjec){

		this.cover = graphicsObject.cover?graphicsObject.cover:'uni_corpo.png';
		this.imgSource = graphicsObject.source?graphicsObject.source:'uni_corpo.png';
		this.label = graphicsObject.label?graphicsObject.label:'';
		
		this.id = statsObjec.id?statsObjec.id:0;
		this.enabled = statsObjec.enabled?statsObjec.enabled:false;
		this.coast = statsObjec.coast?statsObjec.coast:0;

		this.sizePercent = statsObjec.sizePercent?statsObjec.sizePercent:0;
		this.demage = statsObjec.demage?statsObjec.demage:0;
		this.fireSpeed = statsObjec.fireSpeed?statsObjec.fireSpeed:0;
		this.fireAcumMax = statsObjec.fireAcumMax?statsObjec.fireAcumMax:0;
		this.extraCoins = statsObjec.extraCoins?statsObjec.extraCoins:0;
		
	},
	serialize:function(){
		
	}
});