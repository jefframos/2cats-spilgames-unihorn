/*jshint undef:false */
var AppModel = Class.extend({
	init:function(){
		this.currentPlayerModel = {};

		// source,
		// energy coast, 1 / 3
		// bullet coast,
		// vel, 1 / 3
		// bullet vel,
		// bullet force 1 / 3
		// APP.cookieManager = new CookieManager();
		// console.log(cookieManager.getCookie('totalPoints'));
		// APP.cookieManager.setCookie('totalPoints', 0, 500);
		// console.log(APP);

		var points = 0;//parseInt(APP.cookieManager.getCookie('totalPoints'));
		var high = 0;//parseInt(APP.cookieManager.getCookie('highScore'));
		var coins = parseInt(APP.cookieManager.getCookie('coins'));

		this.highScore = high?high:0;

		this.totalPoints = coins?coins:0;
		this.currentPoints = this.totalPoints;

		
		this.playerModels = [];

		function getBalanceCoast(id){
			var ret = Math.floor((id * id * id) / 4) * 5 * Math.floor((id * id) / 5) * 5 + (5 * 5 * id) * id*id + 300;
			console.log(ret);
			return ret;
		}
		this.envModels = [];
		this.envModels.push(new EnvironmentModel(
			{
				cover:'thumb_castle.png',
				source:'dist/img/cenario1b.png',
				label:'Normal'
			},
			{
				id:this.envModels.length * 750,
				enabled: true,
				coast: getBalanceCoast(this.envModels.length)
			}
		));

		this.envModels.push(new EnvironmentModel(
			{
				cover:'thumb_ocean.png',
				source:'dist/img/cenario2b.png',
				label:'Normal 2'
			},
			{
				id:this.envModels.length * 750,
				enabled: false,
				coast: 10000//Math.floor((getBalanceCoast(this.envModels.length) * getBalanceCoast(this.envModels.length))/ 3)
			}
		));

		this.envModels.push(new EnvironmentModel(
			{
				cover:'thumb_desert.png',
				source:'dist/img/cenario3b.png',
				label:'Normal 3'
			},
			{
				id:this.envModels.length * 750,
				enabled: false,
				coast: 20000//Math.floor((getBalanceCoast(this.envModels.length) * getBalanceCoast(this.envModels.length) )/ 3)
			}
		));

		this.clothModels = [];
		this.clothModels.push(new ClothModel(
			{
				cover:'pelado_thumb.png',
				source:'uni_corpo.png',
				label:'Normal'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0,
				// demage: 0,
				// fireAcumMax:0,
				// extraCoins:0,
				// fireSpeed:0,
				enabled: true,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));
		this.clothModels.push(new ClothModel(
			{
				cover:'torcedor_thumb.png',
				source:'uni_corpo_torcedor.png',
				label:'Fan'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0,
				// demage: 0,
				// fireAcumMax:0,
				// extraCoins:2,
				// fireSpeed:0,
				enabled: false,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));
		this.clothModels.push(new ClothModel(
			{
				cover:'witch_thumb.png',
				source:'uni_corpo_bruxa.png',
				label:'Witch'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0,
				// demage: 0,
				// fireAcumMax:0,
				// extraCoins:2,
				// fireSpeed:0,
				enabled: false,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));
		this.clothModels.push(new ClothModel(
			{
				cover:'cowboy_thumb.png',
				source:'uni_corpo_cowboy.png',
				label:'Cowboy'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0.03,
				// demage: 0,
				// fireAcumMax:0,
				// extraCoins:0,
				// fireSpeed:0,
				enabled: false,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));
		
		this.clothModels.push(new ClothModel(
			{
				cover:'katy_thumb.png',
				source:'uni_corpo_katyperry.png',
				label:'Sweet'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0.03,
				// demage: 1,
				// fireAcumMax:10,
				// extraCoins:2,
				// fireSpeed:3,
				enabled: false,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));

		this.clothModels.push(new ClothModel(
			{
				cover:'Iron_thumb.png',
				source:'uni_corpo_ironman.png',
				label:'Iron'
			},
			{
				id:this.clothModels.length * 10,
				// sizePercent: 0,
				// demage: 0,
				// fireAcumMax:10,
				// extraCoins:0,
				// fireSpeed:0,
				enabled: false,
				coast: getBalanceCoast(this.clothModels.length)
			}
		));

		

		this.hornModels = [];
		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn1.png',
				source:'uni_horn1.png',
				bulletSource:'bullet.png',
				label:'Horn'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:false,
				// piercing:false,
				// sinoid:0,
				enabled: true,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));

		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn2.png',
				source:'uni_horn2.png',
				bulletSource:'bullet.png',
				label:'Hot Dog Horn'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:false,
				// fireSpeed:10.5,
				// // piercing:false,
				sinoid:0.7,
				enabled: false,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));
		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn5.png',
				source:'uni_horn5.png',
				bulletSource:'bullet.png',
				label:'Witch Horn'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:false,
				// piercing:true,
				// sinoid:0,
				enabled: false,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));
		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn6.png',
				source:'uni_horn6.png',
				bulletSource:'bullet.png',
				label:'Bang Bang'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:false,
				// piercing:true,
				// sinoid:0,
				enabled: false,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));
		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn3.png',
				source:'uni_horn3.png',
				bulletSource:'bullet.png',
				label:'Cup Horn'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:true,
				// // piercing:false,
				// sinoid:0,
				enabled: false,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));
		this.hornModels.push(new HornModel(
			{
				cover:'uni_horn4.png',
				source:'uni_horn4.png',
				bulletSource:'bullet.png',
				label:'Iron Horn'
			},
			{
				size: 1,
				demage: 1,
				fireAcumMax:25,
				// hasMultiple:1,
				// hasBounce:false,
				// piercing:true,
				// sinoid:0,
				enabled: false,
				coast: getBalanceCoast(this.hornModels.length),
				id:this.hornModels.length + 1000
			}
		));
		// this.hornModels.push(new HornModel(
		// 	{
		// 		cover:'uni_horn1.png',
		// 		source:'uni_horn1.png',
		// 		bulletSource:'bullet.png',
		// 		label:'x3'
		// 	},
		// 	{
		// 		size: 1,
		// 		demage: 0.9,
		// 		fireAcumMax:25,
		// 		// hasMultiple:3,
		// 		// hasBounce:false,
		// 		// // piercing:false,
		// 		// sinoid:0,
		// 		enabled: false,
		// 		coast: getBalanceCoast(this.hornModels.length),
		// 		id:this.hornModels.length + 1000
		// 	}
		// ));
		// this.hornModels.push(new HornModel(
		// 	{
		// 		cover:'uni_horn1.png',
		// 		source:'uni_horn1.png',
		// 		bulletSource:'bullet.png',
		// 		label:'ALL STATS'
		// 	},
		// 	{
		// 		size: 1,
		// 		demage: 0.9,
		// 		fireAcumMax:25,
		// 		// hasMultiple:3,
		// 		// hasBounce:true,
		// 		// piercing:true,
		// 		// sinoid:0.5,
		// 		enabled: false,
		// 		coast: getBalanceCoast(this.hornModels.length),
		// 		id:this.hornModels.length + 1000
		// 	}
		// ));

		this.enemyModels = [
			new EnemyModel(
				{
					cover:'cloud1a.png',
					source:['cloud1a.png'],
					thumb:'barra_bolita_white.png',
					particles:['bullet.png'],
					sizePercent: 0.2,
					label:'Nuvem'
				},
				{
					vel: 2,
					toNext: 75,
					behaviour:new BirdBehaviourSinoid({sinAcc:0.05}),
					money:2,
					hp:1,
					resistance: 1.2
				}
			),
				new EnemyModel(
				{
					cover:'nuvem_blue.png',
					source:['nuvem_blue_bolha.png' , 'nuvem_blue.png'],
					thumb:'barra_bolita_blue.png',
					particles:['bullet.png'],
					sizePercent: 0.18,
					label:'Nuvem'
				},
				{
					vel: 1.5,
					toNext: 55,
					behaviour: new BirdBehaviourSinoid({sinAcc:0.05}),
					money:3,
					hp:2,
					resistance: 1.5,
					bounce: true
				}
			),
				new EnemyModel(
				{
					cover:'cloud3a.png',
					source:['cloud3a.png'],
					thumb:'barra_bolita_gray.png',
					particles:['bullet.png'],
					sizePercent: 0.15,
					label:'Nuvem'
				},
				{
					vel: 1.8,
					toNext: 85,
					behaviour: new BirdBehaviourSinoid({sinAcc:0.05}),
					money:5,
					hp:1,
					resistance: 1.5,
					subdivide:2
				}
			),
				new EnemyModel(
				{
					cover:'cloud2a.png',
					source:['cloud2a.png','preta_2.png','preta_3.png'],
					thumb:'barra_bolita_black.png',
					particles:['bullet.png'],
					sizePercent: 0.25,
					label:'Nuvem'
				},
				{
					vel: 1,
					toNext: 155,
					behaviour: new BirdBehaviourSinoid({sinAcc:0.03}),
					money:10,
					hp:3,
					resistance: 0.6,
					moreStats: true
				}
			),
			];


		this.smallEnemyModel = new EnemyModel(
			{
				cover:'cloud3a.png',
				source:['cloud3a.png'],
				thumb:'barra_bolita_gray.png',
				particles:['bullet.png'],
				sizePercent: 0.12,
				label:'Nuvem'
			},
			{
				vel: 1,
				toNext: 5000000,
				behaviour: null,
				money:1,
				hp:1,
				resistance: 4.5
			}
		);

		this.luckyCloud = new EnemyModel(
			{
				cover:'nuvem_dourada.png',
				source:['nuvem_dourada.png'],
				thumb:'barra_bolita_gold.png',
				particles:['bullet.png'],
				sizePercent: 0.18,
				label:'Nuvem'
			},
			{
				vel: 1.8,
				toNext: 80,
				behaviour: new BirdBehaviourSinoid({sinAcc:0.05}),
				money:1,
				hp:1,
				resistance: 4.5,
				special: true
			}
		);

		this.setModel(0);

		this.totalPlayers = 0;
		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints){
				this.playerModels[i].able = true;
				this.totalPlayers ++;
			}
		}
		this.enemyProbs = [0,1,2,0,1,2,0,1,2,3,3];//,1,0,0,0,2,0,0,0,1,2,3,0,0,2,0,3,4,4,4,4,4,0,5,5,5,5,5,0,6,6,6,6,0,7,7,7,7,4,5,6,7];

		this.currentHorde = 0;

		this.totalEnemy = 4;



		var enabledsHorns = APP.cookieManager.getCookie('enabledsHorns');
		
		// console.log(enableds.split(','));
		var j = 0;
		if(!enabledsHorns){
			// console.log('whata');
			enabledsHorns = '1';
			for (j = 0; j < this.hornModels.length - 1; j++) {
				enabledsHorns+=',0';
			}
			APP.cookieManager.setCookie('enabledsHorns', enabledsHorns, 500);
		}else{
			enabledsHorns = enabledsHorns.split(',');
			for (j = 0; j < this.hornModels.length - 1; j++) {
				// console.log(enabledsHorns[j]);
				if(enabledsHorns[j] === '1'){
					this.hornModels[j].enabled = true;
				}
			}
		}




		var enabledsClothes = APP.cookieManager.getCookie('enabledsClothes');
		
		// console.log(enableds.split(','));
		if(!enabledsClothes){
			// console.log('whata');
			enabledsClothes = '1';
			for (j = 0; j < this.clothModels.length - 1; j++) {
				enabledsClothes+=',0';
			}
			APP.cookieManager.setCookie('enabledsClothes', enabledsClothes, 500);
		}else{
			enabledsClothes = enabledsClothes.split(',');
			for (j = 0; j < this.clothModels.length - 1; j++) {
				// console.log(enabledsClothes[j]);
				if(enabledsClothes[j] === '1'){
					this.clothModels[j].enabled = true;
				}
			}
		}





		var enabledsLands = APP.cookieManager.getCookie('enabledsLands');
		
		// console.log(enableds.split(','));
		if(!enabledsLands){
			// console.log('whata');
			enabledsLands = '1';
			for (j = 0; j < this.envModels.length - 1; j++) {
				enabledsLands+=',0';
			}
			APP.cookieManager.setCookie('enabledsLands', enabledsLands, 500);
		}else{
			enabledsLands = enabledsLands.split(',');
			for (j = 0; j < this.envModels.length - 1; j++) {
				// console.log(enabledsLands[j]);
				if(enabledsLands[j] === '1'){
					this.envModels[j].enabled = true;
				}
			}
		}




	},
	save:function(){
		this.currentHorde = 0;
		// APP.cookieManager.getCookie('coins')
        APP.cookieManager.setCookie('coins', APP.appModel.totalPoints, 500);
		
		var i = 0;

		// this.updateTowels();
		// this.updateBurguers();

		var enabledsHorns = '1';
		for (i = 1; i < this.hornModels.length; i++) {
			// console.log(this.hornModels[i].enabled);
			if(this.hornModels[i].enabled){
				enabledsHorns+=',1';
			}else{
				enabledsHorns+=',0';
			}
		}
		// console.log(enabledsHorns);
		APP.cookieManager.setCookie('enabledsHorns', enabledsHorns, 500);


		var enabledsClothes = '1';
		for (i = 1; i < this.clothModels.length; i++) {
			// console.log(this.clothModels[i].enabled);
			if(this.clothModels[i].enabled){
				enabledsClothes+=',1';
			}else{
				enabledsClothes+=',0';
			}
		}
		// console.log(enabledsClothes);
		APP.cookieManager.setCookie('enabledsClothes', enabledsClothes, 500);



		var enabledsLands = '1';
		for (i = 1; i < this.envModels.length; i++) {
			// console.log(this.envModels[i].enabled);
			if(this.envModels[i].enabled){
				enabledsLands+=',1';
			}else{
				enabledsLands+=',0';
			}
		}
		// console.log(enabledsLands);
		APP.cookieManager.setCookie('enabledsLands', enabledsLands, 500);


		// console.log(APP.cookieManager.getCookie('enableds'));
	},
	clearShop:function(){
		var enabledsHorns = '1';
		for (i = 1; i < this.hornModels.length; i++) {
			// console.log(this.hornModels[i].enabled);
			this.hornModels[i].enabled = false;
			if(this.hornModels[i].enabled){
				enabledsHorns+=',1';
			}else{
				enabledsHorns+=',0';
			}
		}
		// console.log(enabledsHorns);
		APP.cookieManager.setCookie('enabledsHorns', enabledsHorns, 500);


		var enabledsClothes = '1';
		for (i = 1; i < this.clothModels.length; i++) {
			// console.log(this.clothModels[i].enabled);
			this.clothModels[i].enabled = false;
			if(this.clothModels[i].enabled){
				enabledsClothes+=',1';
			}else{
				enabledsClothes+=',0';
			}
		}
		// console.log(enabledsClothes);
		APP.cookieManager.setCookie('enabledsClothes', enabledsClothes, 500);



		var enabledsLands = '1';
		for (i = 1; i < this.envModels.length; i++) {
			// console.log(this.envModels[i].enabled);
			this.envModels[i].enabled = false;
			if(this.envModels[i].enabled){
				enabledsLands+=',1';
			}else{
				enabledsLands+=',0';
			}
		}
		// console.log(enabledsLands);
		APP.cookieManager.setCookie('enabledsLands', enabledsLands, 500);
	},
	addRandonBehaviour:function(){
		this.removeBehaviour();
		var rnd = Math.random();
		var src = '';
		if(rnd < 1/4){
			APP.currentHornModel.hasMultiple=2;
			src = 'double.png';
		}
		else if(rnd < 2/4){
			APP.currentHornModel.hasBounce=true;
			src = 'bounce.png';
		}
		else if(rnd < 3/4){
			APP.currentHornModel.piercing=true;
			src = 'piercing.png';
		}
		else{
			APP.currentHornModel.sinoid=0.5;
			src = 'crazy.png';
		}
		return {src:src, color:0x00FFFF};
	},
	removeBehaviour:function(){
		APP.fireTint = 0xFFFFFF;
		APP.currentHornModel.fireAcumMax=25;
		APP.currentHornModel.hasMultiple=1;
		APP.currentHornModel.hasBounce=false;
		APP.currentHornModel.piercing=false;
		APP.currentHornModel.sinoid=0;
	},
	setModel:function(id){
		this.currentID = id;
		this.currentPlayerModel = this.playerModels[id];
	},
	zerarTudo:function(){
		this.currentHorde = 0;
		this.totalPoints = 0;
		this.totalEnemy = 1;
		this.totalPlayers = 1;
		APP.cookieManager.setCookie('totalPoints', 0, 500);
		APP.cookieManager.setCookie('totalEnemy', 1, 500);

		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints){
				this.playerModels[i].able = true;
			}else{
				this.playerModels[i].able = false;
			}
		}
	},
	maxPoints:function(){
		this.currentHorde = 0;
		this.totalPoints = 999999;
		this.totalEnemy = 8;
		APP.cookieManager.setCookie('totalPoints', this.totalPoints, 500);
		APP.cookieManager.setCookie('totalEnemy', this.totalEnemy, 500);


		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints){
				this.playerModels[i].able = true;
			}else{
				this.playerModels[i].able = false;
			}
		}
	},
	getNewObstacle:function(screen){
		var id = Math.floor(this.obstacleModels.length * Math.random());
		var obs = new Obstacle(this.obstacleModels[id], screen);
		return obs;
	},
	getNewEnemy:function(player, screen){
		this.currentHorde ++;
		
		var max = this.enemyProbs.length;

		if(this.currentHorde < max){
			max = this.currentHorde;
		}

		var id = 99999;
		while(id > (this.totalEnemy - 1)){
			id = this.enemyProbs[Math.floor(max * Math.random())];
		}
		// this.enemyModels[id].target = player;
		// console.log(this.enemyModels);
		var enemy = new Enemy((this.currentHorde % 18 === 0)? this.luckyCloud:this.enemyModels[id], screen);
		enemy.id = id;
		// console.log(enemy.id);
		this.lastID = id;
		return enemy;
	},
	ableNewBird:function(birdModel){

		if(!birdModel || this.totalEnemy >= this.enemyModels.length){
			return;
		}
		this.totalEnemy = 0;
		for (var i = 0; i < this.enemyModels.length; i++) {
			this.totalEnemy ++;
			if(this.enemyModels[i].label === birdModel.label){
				console.log(this.enemyModels[i].label, birdModel.label);
				break;
			}
		}
		console.log(this.totalEnemy);
		APP.cookieManager.setCookie('totalEnemy', this.totalEnemy, 500);
	},
	add100Points:function(){
		this.totalPoints += 100;
		APP.cookieManager.setCookie('totalPoints', 100, 500);
		this.totalPlayers = 0;
		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints && !this.playerModels[i].able){
				this.playerModels[i].able = true;
			}
			if(this.playerModels[i].able){
				this.totalPlayers ++;
			}
		}
	},
	addPoints:function(){
		this.currentHorde = 0;
		this.totalPoints += this.currentPoints;
		if(this.highScore < this.currentPoints)
		{
			this.highScore = this.currentPoints;
			APP.cookieManager.setCookie('highScore', this.highScore, 500);
			APP.dataManager.saveScore();
		}
		APP.cookieManager.setCookie('totalPoints', this.totalPoints, 500);
		if(this.maxPoints < this.currentPoints){
			this.maxPoints = this.currentPoints;
		}
		var tempReturn = [];
		this.totalPlayers = 0;
		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints && !this.playerModels[i].able){
				this.playerModels[i].able = true;
				tempReturn.push(this.playerModels[i]);
			}
			if(this.playerModels[i].able){
				this.totalPlayers ++;
			}
		}
		return tempReturn;
	},
	build:function(){

	},
	destroy:function(){

	},
	serialize:function(){
		
	}
});