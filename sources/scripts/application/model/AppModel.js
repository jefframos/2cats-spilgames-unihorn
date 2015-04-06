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
					behaviour: null,
					money:5,
					hp:4
				}
			),
				new EnemyModel(
				{
					cover:'cloud2a.png',
					source:['cloud2a.png'],
					particles:['bullet.png'],
					sizePercent: 0.2,
					label:'Nuvem'
				},
				{
					vel: 0.7,
					toNext: 190,
					behaviour: null,
					money:5,
					hp:6
				}
			),
				new EnemyModel(
				{
					cover:'cloud3a.png',
					source:['cloud3a.png'],
					particles:['bullet.png'],
					sizePercent: 0.2,
					label:'Nuvem'
				},
				{
					vel: 1.5,
					toNext: 50,
					behaviour: null,
					money:5,
					hp:3
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
		console.log(this.enemyModels);
		var enemy = new Enemy(this.enemyModels[id], screen);
		enemy.id = id;
		console.log(enemy.id);
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