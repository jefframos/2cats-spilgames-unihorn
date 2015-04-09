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
		console.log(APP);

		var points = 0;//parseInt(APP.cookieManager.getCookie('totalPoints'));
		var high = 0;//parseInt(APP.cookieManager.getCookie('highScore'));

		this.highScore = high?high:0;
		this.totalPoints = points?points:0;
		this.currentPoints = 0;

		
		this.playerModels = [];

		this.clothModels = [
			new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'Speed'
				},
				{
					id:1000,
					sizePercent: 0,
					demage: 0,
					fireAcumMax:0,
					extraCoins:0,
					fireSpeed:3,
					enabled: true,
					coast: 5000
				}
			),
				new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'+Coins'
				},
				{
					id:1001,
					sizePercent: 0,
					demage: 0,
					fireAcumMax:0,
					extraCoins:2,
					fireSpeed:0,
					enabled: true,
					coast: 5000
				}
			),
				new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'Size'
				},
				{
					id:1002,
					sizePercent: 0.03,
					demage: 0,
					fireAcumMax:0,
					extraCoins:0,
					fireSpeed:0,
					enabled: true,
					coast: 5000
				}
			),
				new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'Demage'
				},
				{
					id:1003,
					sizePercent: 0,
					demage: 3,
					fireAcumMax:0,
					extraCoins:0,
					fireSpeed:0,
					enabled: true,
					coast: 5000
				}
			),
				new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'Freq.'
				},
				{
					id:1004,
					sizePercent: 0,
					demage: 0,
					fireAcumMax:10,
					extraCoins:0,
					fireSpeed:0,
					enabled: true,
					coast: 5000
				}
			),
				new ClothModel(
				{
					cover:'uni_corpo.png',
					source:'uni_corpo.png',
					label:'All Stats'
				},
				{
					id:1005,
					sizePercent: 0.03,
					demage: 3,
					fireAcumMax:10,
					extraCoins:5,
					fireSpeed:3,
					enabled: true,
					coast: 5000
				}
			)
			];
		this.hornModels = [
			new HornModel(
				{
					cover:'uni_horn1.png',
					source:'uni_horn1.png',
					bulletSource:'bullet.png',
					label:'Sinoid'
				},
				{
					size: 1,
					demage: 1,
					fireAcumMax:20,
					hasMultiple:1,
					hasBounce:false,
					// piercing:false,
					sinoid:0.5,
					enabled: true,
					coast: 5000,
					id:0
				}
			),
				new HornModel(
				{
					cover:'uni_horn1.png',
					source:'uni_horn1.png',
					bulletSource:'bullet.png',
					label:'Piercing'
				},
				{
					size: 1,
					demage: 1,
					fireAcumMax:20,
					hasMultiple:1,
					hasBounce:false,
					piercing:true,
					sinoid:0,
					enabled: false,
					coast: 5000,
					id:1
				}
			),
				new HornModel(
				{
					cover:'uni_horn1.png',
					source:'uni_horn1.png',
					bulletSource:'bullet.png',
					label:'Bounce'
				},
				{
					size: 1,
					demage: 1,
					fireAcumMax:20,
					hasMultiple:1,
					hasBounce:true,
					// piercing:false,
					sinoid:0,
					enabled: false,
					coast: 5000,
					id:2
				}
			),
				new HornModel(
				{
					cover:'uni_horn1.png',
					source:'uni_horn1.png',
					bulletSource:'bullet.png',
					label:'x3'
				},
				{
					size: 1,
					demage: 1,
					fireAcumMax:20,
					hasMultiple:3,
					hasBounce:false,
					// piercing:false,
					sinoid:0,
					enabled: false,
					coast: 5000,
					id:3
				}
			),
				new HornModel(
				{
					cover:'uni_horn1.png',
					source:'uni_horn1.png',
					bulletSource:'bullet.png',
					label:'ALL STATS'
				},
				{
					size: 1,
					demage: 1,
					fireAcumMax:20,
					hasMultiple:3,
					hasBounce:true,
					piercing:true,
					sinoid:0.5,
					enabled: false,
					coast: 5000,
					id:4
				}
			),
			];


		this.enemyModels = [
			new EnemyModel(
				{
					cover:'cloud1a.png',
					source:['cloud1a.png'],
					particles:['bullet.png'],
					sizePercent: 0.2,
					label:'Nuvem'
				},
				{
					vel: 1,
					toNext: 80,
					behaviour:new BirdBehaviourSinoid({sinAcc:0.05}),
					money:5,
					hp:4,
					resistance: 1
				}
			),
				new EnemyModel(
				{
					cover:'cloud2a.png',
					source:['cloud2a.png'],
					particles:['bullet.png'],
					sizePercent: 0.25,
					label:'Nuvem'
				},
				{
					vel: 0.7,
					toNext: 190,
					behaviour: null,
					money:5,
					hp:6,
					resistance: 0.6
				}
			),
				new EnemyModel(
				{
					cover:'cloud3a.png',
					source:['cloud3a.png'],
					particles:['bullet.png'],
					sizePercent: 0.18,
					label:'Nuvem'
				},
				{
					vel: 1.8,
					toNext: 50,
					behaviour: null,
					money:5,
					hp:3,
					resistance: 4.5
				}
			)
			];

		this.setModel(0);

		this.totalPlayers = 0;
		for (var i = this.playerModels.length - 1; i >= 0; i--) {
			if(this.playerModels[i].toAble <= this.totalPoints){
				this.playerModels[i].able = true;
				this.totalPlayers ++;
			}
		}
		this.enemyProbs = [0,1,2];//,1,0,0,0,2,0,0,0,1,2,3,0,0,2,0,3,4,4,4,4,4,0,5,5,5,5,5,0,6,6,6,6,0,7,7,7,7,4,5,6,7];

		this.currentHorde = 0;

		this.totalEnemy = 3;
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
		var enemy = new Enemy(this.enemyModels[id], screen);
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