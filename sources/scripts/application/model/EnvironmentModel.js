/*jshint undef:false */
var EnvironmentModel = Class.extend({
	init:function(graphicsObject, statsObjec){

		this.cover = graphicsObject.cover?graphicsObject.cover:'uni_horn1.png';
		this.imgSource = graphicsObject.source?graphicsObject.source:'fundo1.png';
		this.label = graphicsObject.label?graphicsObject.label:'';

		this.id = statsObjec.id?statsObjec.id:0;
		this.coast = statsObjec.coast?statsObjec.coast:0;
		this.enabled = statsObjec.enabled?statsObjec.enabled:false;
	},
	serialize:function(){
		
	}
});