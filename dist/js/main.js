/*! jefframos 19-03-2015 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var h, s, max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    if (max === min) h = s = 0; else {
        var d = max - min;
        switch (s = l > .5 ? d / (2 - max - min) : d / (max + min), max) {
          case r:
            h = (g - b) / d + (b > g ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
    }
    return {
        h: h,
        s: s,
        l: l
    };
}

function hslToRgb(h, s, l) {
    function hue2rgb(p, q, t) {
        return 0 > t && (t += 1), t > 1 && (t -= 1), 1 / 6 > t ? p + 6 * (q - p) * t : .5 > t ? q : 2 / 3 > t ? p + (q - p) * (2 / 3 - t) * 6 : p;
    }
    var r, g, b;
    if (0 === s) r = g = b = l; else {
        var q = .5 > l ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3), g = hue2rgb(p, q, h), b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(255 * r),
        g: Math.round(255 * g),
        b: Math.round(255 * b)
    };
}

function toHex(n) {
    return n = parseInt(n, 10), isNaN(n) ? "00" : (n = Math.max(0, Math.min(n, 255)), 
    "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16));
}

function rgbToHex(R, G, B) {
    return parseInt("0x" + toHex(R) + toHex(G) + toHex(B));
}

function hexToRgb(hex) {
    var r = hex >> 16, g = hex >> 8 & 255, b = 255 & hex;
    return {
        r: r,
        g: g,
        b: b
    };
}

function addSaturation(color, value) {
    var rgb = hexToRgb(color), hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return hsl.s *= value, hsl.s > 1 && (hsl.s = 1), hsl.s < 0 && (hsl.s = 0), rgb = hslToRgb(hsl.h, hsl.s, hsl.l), 
    rgbToHex(rgb.r, rgb.g, rgb.b);
}

function addBright(color, value) {
    var rgb = hexToRgb(color), hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return hsl.l *= value, hsl.l > 1 && (hsl.l = 1), hsl.l < 0 && (hsl.l = 0), rgb = hslToRgb(hsl.h, hsl.s, hsl.l), 
    rgbToHex(rgb.r, rgb.g, rgb.b);
}

function pointDistance(x, y, x0, y0) {
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
}

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

function scaleConverter(current, max, _scale, object) {
    var scale = max * _scale / current;
    return object ? (object.scale ? object.scale.x = object.scale.y = scale : object.getContent() && object.getContent().scale && (object.getContent().scale.x = object.getContent().scale.y = scale), 
    scale) : scale;
}

function shuffle(array) {
    for (var temp, index, counter = array.length; counter > 0; ) index = Math.floor(Math.random() * counter), 
    counter--, temp = array[counter], array[counter] = array[index], array[index] = temp;
    return array;
}

function testMobile() {
    return Modernizr.touch;
}

function isPortait() {
    return screen.height > screen.width;
}

function updateResolution(orientation, scale) {
    "portait" === orientation ? screen.height > screen.width ? (windowWidth = screen.width * scale, 
    windowHeight = window.innerHeight * scale, windowWidthVar = screen.width, windowHeightVar = window.innerHeight) : (windowWidth = screen.height * scale, 
    windowHeight = screen.width * scale, windowWidthVar = screen.height, windowHeightVar = screen.width) : screen.height < screen.width ? (windowWidth = screen.width * scale, 
    windowHeight = screen.height * scale, windowWidthVar = screen.width, windowHeightVar = screen.height) : (windowWidth = screen.height * scale, 
    windowHeight = screen.width * scale, windowWidthVar = screen.height, windowHeightVar = screen.width), 
    realWindowWidth = windowWidth, realWindowHeight = windowHeight;
}

function update() {
    requestAnimFrame(update), !init && isPortait() && (windowWidth = res.x, windowHeight = res.y, 
    realWindowWidth = res.x, realWindowHeight = res.y, testMobile() ? (updateResolution("portait", gameScale), 
    renderer = PIXI.autoDetectRecommendedRenderer(realWindowWidth, realWindowHeight, {
        antialias: !0,
        resolution: retina,
        view: gameView
    })) : renderer = PIXI.autoDetectRenderer(realWindowWidth, realWindowHeight, {
        antialias: !0,
        resolution: retina,
        view: gameView
    }), console.log(renderer), renderer.view.style.width = windowWidth + "px", renderer.view.style.height = windowHeight + "px", 
    APP = new Application(), APP.build(), APP.show(), init = !0);
    var tempRation = window.innerHeight / windowHeight, ratioRez = resizeProportional ? tempRation < window.innerWidth / realWindowWidth ? tempRation : window.innerWidth / realWindowWidth : 1;
    windowWidthVar = realWindowWidth * ratioRez * ratio, windowHeightVar = realWindowHeight * ratioRez * ratio, 
    windowWidthVar > realWindowWidth && (windowWidthVar = realWindowWidth), windowHeightVar > realWindowHeight && (windowHeightVar = realWindowHeight), 
    renderer && (renderer.view.style.width = windowWidthVar + "px", renderer.view.style.height = windowHeightVar + "px", 
    APP.update(), renderer.render(APP.stage));
}

function possibleFullscreen() {
    var elem = gameView;
    return elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
}

function fullscreen() {
    var elem = gameView;
    elem.requestFullscreen ? elem.requestFullscreen() : elem.msRequestFullscreen ? elem.msRequestFullscreen() : elem.mozRequestFullScreen ? elem.mozRequestFullScreen() : elem.webkitRequestFullscreen && elem.webkitRequestFullscreen(), 
    updateResolution("portait", gameScale), renderer.width = realWindowWidth, renderer.height = realWindowHeight, 
    isfull = !0;
}

var DungeonGenerator = Class.extend({
    init: function() {
        this.random = 0, this.numActivesNodes = 0, this.maxDist = 5, this.minNodes = 5, 
        this.seeds = 1, this.rooms = [], this.maxNodes = 10, this.mostDistant = new NodeModel(), 
        this.nodeLock = new NodeModel(), this.firstNode = new NodeModel(), this.keyNode = new NodeModel(), 
        this.precision = 1, this.seed = 0, this.rooms = [];
    },
    generate: function(seed, precision, minMax, bounds, maxLenght, start) {
        this.seed = seed, random = 0, 0 > maxLenght && (maxLenght = 99999), this.minNodes = minMax[0], 
        this.maxNodes = minMax[1], this.precision = precision, this.numActivesNodes = 0, 
        this.maxDist = -999999999, this.seeds = 1;
        var i = 0, j = 0;
        if (this.rooms.length <= 0) for (i = 0; i < bounds[0]; i++) {
            var temp = [];
            for (j = 0; j < bounds[1]; j++) {
                var tempModel = new NodeModel();
                tempModel.position = [ i, j ], temp.push(tempModel);
            }
            this.rooms.push(temp);
        }
        this.generateNodes(start ? start[0] : Math.floor(bounds[0] / 2), start ? start[1] : Math.floor(bounds[1] / 2), null, maxLenght), 
        this.mostDistant.mode = 4;
        var keyDistance = -9999999999;
        for (k = 0; k < this.rooms.length; k++) {
            var item = this.rooms[k];
            for (i = 0; i < item.length; i++) {
                var dist = this.pointDistance(this.mostDistant.position[0], this.mostDistant.position[1], item[i].position[0], item[i].position[1]);
                dist >= keyDistance && item[i].active && item[i].parentId > 0 && (keyDistance = dist, 
                this.keyNode = item[i]), item[i].parentId > 0 && item[i].position[0] === this.mostDistant.parentPosition[0] && item[i].position[1] === this.mostDistant.parentPosition[1] && (this.nodeLock = item[i]);
            }
        }
        this.nodeLock && (this.nodeLock.mode = 5), this.keyNode && (this.keyNode.mode = 6);
    },
    log: function() {
        for (var i = 0; i < this.rooms.length; i++) {
            for (var tempStr = "", item = this.rooms[i], j = 0; j < item.length; j++) 0 === item[j].mode && (tempStr += "| - |"), 
            1 === item[j].mode && (tempStr += "| ♥ |"), 2 === item[j].mode && (tempStr += "| o |"), 
            3 === item[j].mode && (tempStr += "| c |"), 4 === item[j].mode && (tempStr += "| b |"), 
            5 === item[j].mode && (tempStr += "| l |"), 6 === item[j].mode && (tempStr += "| K |");
            console.log(tempStr + "   " + i);
        }
        console.log(this.firstNode);
    },
    generateNodes: function(i, j, parent, maxLeght, forceAdd) {
        if (!((this.numActivesNodes >= this.maxNodes || 0 >= maxLeght) && !forceAdd || this.numActivesNodes > 50)) {
            for (var node = null, jj = 0; jj < this.rooms.length; jj++) for (var item = this.rooms[jj], ii = 0; ii < item.length; ii++) item[ii].position[0] === i && item[ii].position[1] === j && (node = item[ii]);
            if (node) {
                if (node.active && !forceAdd) return void this.minNodes++;
                if (this.minNodes--, node.mode = 2, this.numActivesNodes++, node.active = !0, node.id < 0 && (node.id = this.numActivesNodes, 
                node.seed = this.getNextFloat(), node.applySeed()), parent && 1 !== node.id) {
                    node.parentPosition = parent.position, node.parentId = parent.id, node.parent = parent;
                    var dist = this.pointDistance(parent.position[0], parent.position[1], this.firstNode.position[0], this.firstNode.position[1]);
                    for (node.dist = dist, this.maxDist <= dist && node.parentId > 2 && (this.maxDist = dist, 
                    this.mostDistant = node), node.dist = dist, ri = this.rooms.length - 1; ri >= 0; ri--) {
                        var tempNodeArray = this.rooms[ri];
                        for (nj = tempNodeArray.length - 1; nj >= 0; nj--) tempNodeArray[nj].id === node.parentId && (tempNodeArray[nj].position[1] > node.position[1] ? tempNodeArray[nj].childrenSides[0] = node : tempNodeArray[nj].position[1] < node.position[1] ? tempNodeArray[nj].childrenSides[1] = node : tempNodeArray[nj].position[0] > node.position[0] ? tempNodeArray[nj].childrenSides[2] = node : tempNodeArray[nj].position[0] < node.position[0] && (tempNodeArray[nj].childrenSides[3] = node));
                    }
                    node.parent.position[1] < node.position[1] ? node.childrenSides[0] = node.parent : node.parent.position[1] > node.position[1] ? node.childrenSides[1] = node.parent : node.parent.position[0] < node.position[0] ? node.childrenSides[2] = node.parent : node.parent.position[0] > node.position[0] && (node.childrenSides[3] = node.parent);
                } else node.id = 1, node.mode = 1, this.firstNode = node;
                var has = !1;
                if (this.getNextFloat() < this.seeds || this.minNodes > 0) {
                    this.seeds *= this.precision;
                    for (var tmpArr = [ 0, 0 ], arrayGens = [], rndTest = 1 === node.id, rndValue = rndTest ? .9 : .4, k = 0; 4 > k; k++) if (this.getNextFloat() < rndValue) {
                        has = !0, 0 === k ? tmpArr = [ -1, 0 ] : 1 === k ? tmpArr = [ 1, 0 ] : 2 === k ? tmpArr = [ 0, 1 ] : 3 === k && (tmpArr = [ 0, -1 ]);
                        var objGen = {};
                        objGen.i = i + tmpArr[0], objGen.j = j + tmpArr[1], objGen.parentPosition = [ i, j ], 
                        objGen.parent = node, arrayGens.push(objGen);
                    }
                    for (var n = arrayGens.length - 1; n >= 0; n--) {
                        var obj = arrayGens[n];
                        rndTest || maxLeght--, this.generateNodes(obj.i, obj.j, obj.parent, maxLeght, rndTest);
                    }
                    if (this.minNodes > 0 || this.seeds >= 1) {
                        var tempRnd = this.getNextFloat();
                        tmpArr = .25 > tempRnd ? [ -1, 0 ] : .5 > tempRnd ? [ 1, 0 ] : .75 > tempRnd ? [ 0, 1 ] : [ 0, -1 ], 
                        this.generateNodes(i + tmpArr[0], j + tmpArr[1], node, --maxLeght);
                    }
                }
                has || (node.mode = 3);
            }
        }
    },
    pointDistance: function(x, y, x0, y0) {
        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.seed++);
        return x - Math.floor(x);
    }
}), Float = Class.extend({
    init: function(seed) {
        this.seed = seed, this.tempAccSeed = this.seed;
    },
    applySeed: function() {
        this.tempAccSeed = this.seed;
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.tempAccSeed++);
        return x - Math.floor(x);
    }
}), NodeModel = Class.extend({
    init: function() {
        this.position = [], this.dist = 0, this.parentPosition = [], this.childrenSides = [ null, null, null, null ], 
        this.parentId = -1, this.parent = null, this.active = !1, this.mode = 0, this.id = -1, 
        this.seed = -1, this.tempAccSeed = this.seed, this.bg = null, this.mapData = null, 
        this.topTile = {
            x: 0,
            y: 0
        }, this.bottomTile = {
            x: 0,
            y: 0
        }, this.leftTile = {
            x: 0,
            y: 0
        }, this.rightTile = {
            x: 0,
            y: 0
        }, this.placedTiles = [];
    },
    applySeed: function() {
        this.tempAccSeed = this.seed;
    },
    getNextFloat: function() {
        var x = 1e4 * Math.sin(this.tempAccSeed++);
        return x - Math.floor(x);
    }
}), SmartObject = Class.extend({
    init: function() {
        MicroEvent.mixin(this);
    },
    show: function() {},
    hide: function() {},
    build: function() {},
    destroy: function() {}
}), SmartSocket = Class.extend({
    init: function() {
        MicroEvent.mixin(this);
    },
    build: function() {},
    writeObj: function(obj) {
        this.trigger(SmartSocket.WRITE_OBJ, obj);
    },
    readSocketList: function(obj) {
        this.trigger(SmartSocket.READ_SOCKET_SNAPSHOT, obj);
    },
    readObj: function(obj) {
        this.trigger(SmartSocket.READ_OBJ, obj);
    },
    readLast: function(obj) {
        this.trigger(SmartSocket.READ_LAST, obj);
    },
    setReadCallback: function(callback) {
        this.readCallback = callback;
    },
    socketError: function() {
        this.trigger(SmartSocket.SOCKET_ERROR, obj);
    },
    setObj: function(obj) {
        this.trigger(SmartSocket.SET_OBJ, obj);
    },
    updateObj: function(obj) {
        this.trigger(SmartSocket.UPDATE_OBJ, obj);
    },
    destroy: function() {}
});

SmartSocket.UPDATE_OBJ = "updateObj", SmartSocket.READ_OBJ = "readObj", SmartSocket.READ_SOCKET_SNAPSHOT = "readSocketSnapshot", 
SmartSocket.READ_LAST = "readLast", SmartSocket.WRITE_OBJ = "writeObj", SmartSocket.SET_OBJ = "setObj", 
SmartSocket.SOCKET_ERROR = "socketError";

var Application = AbstractApplication.extend({
    init: function() {
        this._super(windowWidth, windowHeight), this.stage.setBackgroundColor(16553437), 
        this.stage.removeChild(this.loadText), this.labelDebug = new PIXI.Text("Debug", {
            font: "15px Arial"
        }), this.stage.addChild(this.labelDebug), this.labelDebug.position.y = windowHeight - 20, 
        this.labelDebug.position.x = 20, this.mute = !1, this.audioController = new AudioController();
    },
    update: function() {
        this._super(), this.screenManager && !this.screenManager.currentScreen;
    },
    recursiveCounter: function(obj) {
        var j = 0;
        if (obj.children) for (j = obj.children.length - 1; j >= 0; j--) this.childsCounter++, 
        this.recursiveCounter(obj.children[j]); else {
            if (!obj.childs) return;
            for (j = obj.childs.length - 1; j >= 0; j--) this.childsCounter++, this.recursiveCounter(obj.childs[j]);
        }
    },
    build: function() {
        this._super();
        var assetsToLoader = [];
        if (assetsToLoader.length > 0) {
            this.assetsLoader = new PIXI.AssetLoader(assetsToLoader);
            var self = this;
            this.assetsLoader.onComplete = function() {
                self.onAssetsLoaded();
            }, this.assetsLoader.onProgress = function() {
                console.log("onProgress");
            }, this.assetsLoader.load();
        } else this.onAssetsLoaded();
    },
    updatePoints: function(value) {
        this.gameScreen.updatePoints(value);
    },
    getGameModel: function() {
        return this.gameModel;
    },
    initApplication: function() {
        this.initScreen = new InitScreen("Init"), this.gameScreen = new GameScreen("Game"), 
        this.loadScreen = new LoadScreen("Loader"), this.screenManager.addScreen(this.loadScreen), 
        this.screenManager.addScreen(this.gameScreen), this.screenManager.addScreen(this.initScreen), 
        this.screenManager.change("Game");
    },
    onAssetsLoaded: function() {
        this.initApplication();
    },
    show: function() {},
    hide: function() {},
    destroy: function() {}
}), BarView = Class.extend({
    init: function(width, height, maxValue, currentValue) {
        this.maxValue = maxValue, this.text = "default", this.currentValue = currentValue, 
        this.container = new PIXI.DisplayObjectContainer(), this.width = width, this.height = height, 
        this.backShape = new PIXI.Graphics(), this.backShape.beginFill(16711680), this.backShape.drawRect(0, 0, width, height), 
        this.container.addChild(this.backShape), this.frontShape = new PIXI.Graphics(), 
        this.frontShape.beginFill(65280), this.frontShape.drawRect(0, 0, width, height), 
        this.container.addChild(this.frontShape), this.frontShape.scale.x = this.currentValue / this.maxValue;
    },
    addBackShape: function(color, size) {
        this.back = new PIXI.Graphics(), this.back.beginFill(color), this.back.drawRect(-size / 2, -size / 2, this.width + size, this.height + size), 
        this.container.addChildAt(this.back, 0);
    },
    setFrontColor: function(color) {
        this.frontShape && this.container.removeChild(this.frontShape), this.frontShape = new PIXI.Graphics(), 
        this.frontShape.beginFill(color), this.frontShape.drawRect(0, 0, this.width, this.height), 
        this.container.addChild(this.frontShape);
    },
    setBackColor: function(color) {
        this.backShape && this.container.removeChild(this.backShape), this.backShape = new PIXI.Graphics(), 
        this.backShape.beginFill(color), this.backShape.drawRect(0, 0, this.width, this.height), 
        this.container.addChildAt(this.backShape, 0);
    },
    setText: function(text) {
        this.text !== text && (this.lifebar ? this.lifebar.setText(text) : (this.lifebar = new PIXI.Text(text, {
            fill: "white",
            align: "center",
            font: "10px Arial"
        }), this.container.addChild(this.lifebar)));
    },
    updateBar: function(currentValue, maxValue) {
        (this.currentValue !== currentValue || this.maxValue !== maxValue && currentValue >= 0) && (this.currentValue = currentValue, 
        this.maxValue = maxValue, this.frontShape.scale.x = this.currentValue / this.maxValue, 
        this.frontShape.scale.x < 0 && (this.frontShape.scale.x = 0));
    },
    getContent: function() {
        return this.container;
    },
    setPosition: function(x, y) {
        this.container.position.x = x, this.container.position.y = y;
    }
}), ChoiceButton = DefaultButton.extend({
    init: function(imgUp, imgOver, imgDown, imgBorder) {
        this._super(imgUp, imgOver, imgDown), this.color = 16777215, this.background = new PIXI.Sprite(PIXI.Texture.fromImage(imgDown)), 
        this.border = new PIXI.Sprite(PIXI.Texture.fromImage(imgBorder)), this.isBlocked = !1;
    },
    build: function(width, height) {
        var self = this;
        this.width = width ? width : this.shapeButton.width, this.height = height ? height : this.shapeButton.height, 
        this.background.width = this.width, this.background.height = this.height, this.shapeButton.buttonMode = !0, 
        this.shapeButton.position.x = 0, this.shapeButton.position.y = 0, width && (this.shapeButton.width = this.width), 
        height && (this.shapeButton.height = this.height), this.shapeButton.interactive = !0, 
        this.shapeButton.mousedown = this.shapeButton.touchstart = function() {
            self.isBlocked || (self.selectedFunction(), null !== self.mouseUpCallback && self.mouseUpCallback(), 
            null !== self.clickCallback && self.clickCallback());
        };
    },
    block: function(value) {
        this.isBlocked = !0;
        var desblock = new PIXI.Text(value, {
            align: "center",
            fill: "#FFFFFF",
            font: "30px Roboto"
        });
        this.thumbGray.tint = 0, this.shapeButton.tint = 5592405;
        var coin = new SimpleSprite("coins.png");
        coin.getContent().position.x = this.background.width / 2 - coin.getContent().width / 2, 
        coin.getContent().position.y = this.background.height / 2 - coin.getContent().height / 2 - 10, 
        scaleConverter(desblock.height, this.container.height, .3, desblock), desblock.position.x = this.background.width / 2 - desblock.width / 2, 
        desblock.position.y = this.background.height / 2 - desblock.height / 2 + 15, this.container.addChild(desblock), 
        this.container.addChild(coin.getContent());
    },
    selectedFunction: function() {
        null !== this.mouseDownCallback && this.mouseDownCallback(), this.shapeButton.tint = this.color, 
        this.thumb.visible = !0, this.thumbGray.visible = !1, this.shapeButton.setTexture(this.textureButtonOver), 
        this.container.addChildAt(this.background, 0), this.isdown = !0, this.alpha = 1;
    },
    addThumb: function(thumb, thumbGray) {
        this.thumb && this.thumb.parent && this.thumb.parent.removeChild(this.thumb), this.thumbGray && this.thumbGray.parent && this.thumbGray.parent.removeChild(this.thumbGray), 
        this.containerThumbs = new PIXI.DisplayObjectContainer(), this.thumb = new PIXI.Sprite(PIXI.Texture.fromImage(thumb));
        var scale = scaleConverter(this.thumb.height, this.height, .8);
        this.thumb.scale.x = this.thumb.scale.y = scale, this.containerThumbs.addChild(this.thumb), 
        this.thumb.position.x = this.width / 2 - this.thumb.width / 2, this.thumb.position.y = this.height - this.thumb.height - 4, 
        this.thumb.visible = !1, this.thumbGray = new PIXI.Sprite(PIXI.Texture.fromImage(thumbGray)), 
        this.thumbGray.scale.x = this.thumbGray.scale.y = scale, this.containerThumbs.addChild(this.thumbGray), 
        this.thumbGray.position.x = this.width / 2 - this.thumbGray.width / 2, this.thumbGray.position.y = this.height - this.thumbGray.height - 4, 
        this.thumbGray.visible = !0, this.maskButton = new PIXI.Graphics(), this.maskButton.beginFill(9991763), 
        this.maskButton.drawCircle(this.width / 2, this.width / 2, this.width / 2 + 6), 
        this.containerThumbs.addChild(this.maskButton), this.containerThumbs.mask = this.maskButton, 
        this.container.addChild(this.containerThumbs), this.container.addChild(this.border), 
        this.border.width = this.width, this.border.height = this.height;
    },
    resetTextures: function() {
        this.thumb.visible = !1, this.thumbGray.visible = !0, this.shapeButton.setTexture(this.textureButton), 
        this.shapeButton.tint = 16777215, this.background && this.background.parent && this.background.parent.removeChild(this.background);
    }
}), GasBarView = Class.extend({
    init: function(backSource, frontSource, _x, _y) {
        this.text = "default", this._x = _x, this.container = new PIXI.DisplayObjectContainer(), 
        this.backContainer = new PIXI.DisplayObjectContainer(), this.container.addChild(this.backContainer), 
        this.backShape = new SimpleSprite(backSource), this.backShape.getContent().position.y = _y, 
        this.backContainer.addChild(this.backShape.getContent()), this.mask = new PIXI.Graphics(), 
        this.mask.beginFill(65280), this.mask.drawRect(_x, _y, this.backShape.getContent().width, this.backShape.getContent().height), 
        this.backContainer.addChild(this.mask), this.backContainer.mask = this.mask, this.cover = new SimpleSprite(frontSource), 
        this.container.addChild(this.cover.getContent());
    },
    updateBar: function(currentValue, maxValue) {
        (this.currentValue !== currentValue || this.maxValue !== maxValue && currentValue >= 0) && (this.currentValue = currentValue, 
        this.maxValue = maxValue, this.backShape.getContent().position.x = -this.backShape.getContent().width + this.currentValue / this.maxValue * this.backShape.getContent().width);
    },
    getContent: function() {
        return this.container;
    },
    setPosition: function(x, y) {
        this.container.position.x = x, this.container.position.y = y;
    }
}), LifeBarHUD = Class.extend({
    init: function(width, height, incX, frontColor, baseColor) {
        this.text = "default", this.container = new PIXI.DisplayObjectContainer(), this.width = width, 
        this.height = height, this.backShape = new PIXI.Graphics();
        var w = width, xAcc = 0;
        this.rect = [ [ 0, 0 ], [ w, 0 ], [ w + xAcc, 0 ], [ xAcc, 0 ] ], this.frontRect = [ [ 0, 0 ], [ w, 0 ], [ w + xAcc, 0 ], [ xAcc, 0 ] ];
        var i = 0, acc = height, xAcc2 = incX;
        for (this.baseRect = [ this.rect[3], this.rect[2], [ this.rect[2][0] - xAcc2, this.rect[2][1] + acc ], [ this.rect[3][0] - xAcc2, this.rect[3][1] + acc ] ], 
        this.baseFrontRect = [ this.rect[3], this.rect[2], [ this.rect[2][0] - xAcc2, this.rect[2][1] + acc ], [ this.rect[3][0] - xAcc2, this.rect[3][1] + acc ] ], 
        this.backBaseShape = new PIXI.Graphics(), this.backBaseShape.beginFill(baseColor ? baseColor : 9837082), 
        this.backBaseShape.moveTo(this.baseRect[0][0], this.baseRect[0][1]), i = 1; i < this.baseRect.length; i++) this.backBaseShape.lineTo(this.baseRect[i][0], this.baseRect[i][1]);
        for (this.backBaseShape.endFill(), this.container.addChild(this.backBaseShape), 
        this.backFrontShape = new PIXI.Graphics(), this.backFrontShape.beginFill(frontColor ? frontColor : 3192624), 
        this.backFrontShape.moveTo(this.baseFrontRect[0][0], this.baseFrontRect[0][1]), 
        i = 1; i < this.baseFrontRect.length; i++) this.backFrontShape.lineTo(this.baseFrontRect[i][0], this.baseFrontRect[i][1]);
        for (this.backFrontShape.endFill(), this.container.addChild(this.backFrontShape), 
        this.backMask = new PIXI.Graphics(), this.backMask.beginFill(255), this.backMask.moveTo(this.baseRect[0][0], this.baseRect[0][1]), 
        i = 1; i < this.baseRect.length; i++) this.backMask.lineTo(this.baseRect[i][0], this.baseRect[i][1]);
        this.backMask.endFill(), this.container.addChild(this.backMask), this.backFrontShape.mask = this.backMask;
    },
    setText: function(text) {
        this.text !== text && (this.lifebar ? this.lifebar.setText(text) : this.lifebar = new PIXI.Text(text, {
            fill: "white",
            align: "center",
            font: "10px Arial"
        }));
    },
    updateBar: function(currentValue, maxValue) {
        return this.currentValue < 0 ? void (this.backFrontShape.position.x = this.backFrontShape.position.width) : (this.currentValue = currentValue, 
        this.maxValue = maxValue, void (this.backFrontShape.position.x = this.backFrontShape.width * (this.currentValue / this.maxValue) - this.backFrontShape.width));
    },
    getContent: function() {
        return this.container;
    },
    setPosition: function(x, y) {
        this.container.position.x = x, this.container.position.y = y;
    }
}), AudioController = Class.extend({
    init: function() {
        this.ambientSound1 = new Howl({
            urls: [ "dist/audio/trilha.mp3", "dist/audio/trilha.ogg" ],
            volume: .1,
            loop: !0
        }), this.alcemar = new Howl({
            urls: [ "dist/audio/aves_raras.mp3", "dist/audio/aves_raras.ogg" ],
            volume: .8,
            sprite: {
                audio1: [ 0, 7e3 ]
            }
        });
    },
    playAmbientSound: function() {
        this.ambientPlaying || (this.ambientPlaying = !0, this.ambientSound1.play());
    }
}), Bird = Entity.extend({
    init: function(birdModel, screen) {
        this._super(!0), this.updateable = !1, this.deading = !1, this.range = 80, this.width = 1, 
        this.height = 1, this.type = "bird", this.target = "enemy", this.fireType = "physical", 
        this.birdModel = birdModel, this.vel = birdModel.vel, this.velocity.x = -this.vel, 
        this.velocity.y = 0, this.screen = screen, this.demage = this.birdModel.demage, 
        this.hp = this.birdModel.hp, this.defaultVelocity = this.birdModel.vel, this.imgSource = this.birdModel.imgSource, 
        this.behaviour = this.birdModel.behaviour.clone(), this.acceleration = .1, this.id = 0;
    },
    hurt: function(demage) {
        if (this.hp -= demage, this.velocity.x = -Math.abs(.4 * this.vel), this.hp <= 0) {
            APP.updatePoints(this.birdModel.money);
            var mascadasLabel = new Particles({
                x: -.5,
                y: -(.2 * Math.random() + .3)
            }, 120, new PIXI.Text("+" + this.birdModel.money, {
                font: "40px Luckiest Guy",
                fill: "#79DB20",
                stroke: "#033E43",
                strokeThickness: 3
            }), 0);
            mascadasLabel.build(), mascadasLabel.setPosition(this.getPosition().x, this.getPosition().y - 50 * Math.random()), 
            mascadasLabel.alphadecress = .01, this.screen.addChild(mascadasLabel), this.preKill();
        }
        this.getContent().tint = 16711680;
    },
    build: function() {
        this.sprite = new PIXI.Sprite(), this.sprite.anchor.x = .5, this.sprite.anchor.y = .5, 
        this.updateable = !0, this.collidable = !0;
        var motionIdle = new SpritesheetAnimation();
        motionIdle.build("idle", this.imgSource, 5, !0, null), this.spritesheet = new Spritesheet(), 
        this.spritesheet.addAnimation(motionIdle), this.spritesheet.play("idle"), this.getContent().addChild(this.spritesheet.container), 
        this.range = this.spritesheet.texture.width;
    },
    update: function() {
        this._super(), this.behaviour.update(this), this.spritesheet.update(), Math.abs(this.velocity.x) < Math.abs(this.vel) ? this.velocity.x -= this.acceleration : this.velocity.x = -Math.abs(this.vel), 
        this.collideArea || 16711680 === this.getContent().tint && (this.getContent().tint = 16777215);
    },
    preKill: function() {
        for (var i = this.birdModel.particles.length - 1; i >= 0; i--) {
            var particle = new Particles({
                x: 4 * Math.random() - 2,
                y: -(2 * Math.random() + 1)
            }, 120, this.birdModel.particles[i], .1 * Math.random());
            particle.build(), particle.gravity = .1 * Math.random(), particle.alphadecres = .08, 
            particle.setPosition(this.getPosition().x - (Math.random() + .1 * this.getContent().width) / 2, this.getPosition().y), 
            this.layer.addChild(particle);
        }
        this.collidable = !1, this.kill = !0, APP.getGameModel().killedBirds.push(this.id);
    }
}), BirdBehaviourDefault = Class.extend({
    init: function(props) {
        this.props = props, this.position = {
            x: windowWidth,
            y: .1 * windowHeight + .8 * windowHeight * Math.random()
        };
    },
    clone: function() {
        return new BirdBehaviourDefault(this.props);
    },
    update: function() {},
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), BirdBehaviourDiag = Class.extend({
    init: function(props) {
        this.props = props, this.up = Math.random() < .5 ? !0 : !1, this.position = {
            x: .7 * windowWidth + .3 * windowWidth * Math.random(),
            y: this.up ? 0 : windowHeight
        }, this.acc = 0;
    },
    clone: function() {
        return this.props.accX = .02 * Math.random() + .008, new BirdBehaviourDiag(this.props);
    },
    update: function(entity) {
        this.acc += this.props.accX, entity.acceleration = 1, this.up ? (entity.velocity.y = Math.abs(entity.vel) - this.acc, 
        entity.velocity.y < 0 && (entity.velocity.y = 0)) : (entity.velocity.y = entity.vel + this.acc, 
        entity.velocity.y > 0 && (entity.velocity.y = 0));
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), BirdBehaviourGuided = Class.extend({
    init: function(props) {
        this.props = props, this.sin = 0, this.position = {
            x: windowWidth,
            y: .1 * windowHeight + .8 * windowHeight * Math.random()
        };
    },
    clone: function() {
        return new BirdBehaviourSinoid(this.props);
    },
    update: function(entity) {
        entity.velocity.y = Math.sin(this.sin) * entity.vel, this.sin += this.props.sinAcc;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), BirdBehaviourSinoid = Class.extend({
    init: function(props) {
        this.props = props, this.sin = Math.random(), this.position = {
            x: windowWidth + 40,
            y: .3 * windowHeight + .6 * windowHeight * Math.random()
        };
    },
    clone: function() {
        return new BirdBehaviourSinoid(this.props);
    },
    update: function(entity) {
        entity.velocity.y = this.props.velY ? Math.sin(this.sin) * this.props.velY : Math.sin(this.sin) * entity.vel, 
        this.sin += this.props.sinAcc;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), BirdBehaviourSinoid2 = Class.extend({
    init: function(props) {
        this.props = props, this.sin = Math.random(), this.position = {
            x: windowWidth + 40,
            y: windowHeight - .15 * windowHeight - .2 * windowHeight * Math.random()
        };
    },
    clone: function() {
        return new BirdBehaviourSinoid2(this.props);
    },
    update: function(entity) {
        entity.velocity.y = this.props.velY ? Math.sin(this.sin) * this.props.velY : Math.sin(this.sin) * entity.vel, 
        this.sin += this.props.sinAcc;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), Bullet = Entity.extend({
    init: function(vel, timeLive, power, bulletSource, particle, rotation) {
        this._super(!0), this.updateable = !1, this.deading = !1, this.range = 80, this.width = 1, 
        this.height = 1, this.type = "bullet", this.target = "enemy", this.fireType = "physical", 
        this.node = null, this.velocity.x = vel.x, this.velocity.y = vel.y, this.timeLive = timeLive, 
        this.power = power, this.defaultVelocity = 1, this.imgSource = bulletSource, this.particleSource = particle, 
        this.isRotation = rotation, this.isRotation && (this.accumRot = .1 * Math.random() - .05), 
        this.sin = 0;
    },
    build: function() {
        this.sprite = new PIXI.Sprite.fromFrame(this.imgSource), this.sprite.anchor.x = .5, 
        this.sprite.anchor.y = .5, this.updateable = !0, this.collidable = !0, this.getContent().alpha = .5, 
        TweenLite.to(this.getContent(), .3, {
            alpha: 1
        }), this.birdsCollided = [];
    },
    update: function() {
        if (this._super(), this.layer.collideChilds(this), (!this.targetEntity || this.targetEntity && this.targetEntity.kill) && this.timeLive--, 
        (this.timeLive <= 0 || this.getPosition() > windowWidth + 20) && (this.kill = !0), 
        this.range = this.sprite.height / 2, this.isRotation && (this.sprite.rotation += this.accumRot), 
        this.targetEntity && !this.targetEntity.kill) if (this.homingStart <= 0) {
            this.range = this.sprite.height;
            var angle = Math.atan2(this.targetEntity.getPosition().y - this.getPosition().y, this.targetEntity.getPosition().x - this.getPosition().x);
            this.getContent().rotation = angle, angle = 180 * angle / Math.PI, angle += 90, 
            angle = angle / 180 * Math.PI, this.velocity.x = Math.sin(angle) * this.defaultVelocity, 
            this.velocity.y = -Math.cos(angle) * this.defaultVelocity;
        } else this.homingStart--;
        this.sinoid && (this.velocity.y = 5 * Math.sin(this.sin) * this.velocity.x, this.sin += .2, 
        this.getContent().rotation = 0), this.collideArea;
    },
    setHoming: function(entity, timetostart, angle) {
        this.homingStart = timetostart, this.targetEntity = entity, this.getContent().rotation = angle;
    },
    collide: function(arrayCollide) {
        if (this.collidable) for (var i = arrayCollide.length - 1; i >= 0; i--) if ("bird" === arrayCollide[i].type) {
            for (var j = this.birdsCollided.length - 1; j >= 0; j--) if (arrayCollide[i] === this.birdsCollided[j]) return;
            console.log("collide"), this.preKill(), arrayCollide[i].hurt(this.power), this.birdsCollided.push(arrayCollide[i]);
        }
    },
    preKill: function() {
        if (!this.invencible) {
            for (var i = 1; i >= 0; i--) {
                var particle = new Particles({
                    x: 4 * Math.random(),
                    y: -(2 * Math.random() + 1)
                }, 120, this.particleSource, .05 * Math.random());
                particle.build(), particle.gravity = .1 * Math.random() + .2, particle.alphadecres = .1, 
                particle.scaledecress = .02, particle.setPosition(this.getPosition().x - (Math.random() + .1 * this.getContent().width) / 2, this.getPosition().y), 
                this.layer.addChild(particle);
            }
            this.collidable = !1, this.kill = !0;
        }
    },
    pointDistance: function(x, y, x0, y0) {
        return Math.sqrt((x -= x0) * x + (y -= y0) * y);
    },
    touch: function(collection) {
        collection.object && "environment" === collection.object.type && collection.object.fireCollide(), 
        this.preKill();
    }
}), AkumaBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new AkumaBehaviour(this.props);
    },
    build: function(screen) {
        for (var i = screen.layer.childs.length - 1; i >= 0; i--) "bird" === screen.layer.childs[i].type && screen.layer.childs[i].hurt(9999);
        var white = new PIXI.Graphics();
        white.beginFill(16777215), white.drawRect(0, 0, windowWidth, windowHeight), screen.addChild(white), 
        TweenLite.to(white, .5, {
            alpha: 0,
            onCompleteParams: [ white ],
            onComplete: function(target) {
                target && target.parent && (target.parent.removeChild(target), target = null);
            }
        });
    },
    destroy: function() {},
    serialize: function() {}
}), GiantShootBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new GiantShootBehaviour(this.props);
    },
    build: function(screen) {
        var vel = this.props.vel ? this.props.vel : 2.5, timeLive = windowWidth / vel, bulletForce = (this.props.totalFires ? this.props.totalFires : 5, 
        this.props.angleOpen ? this.props.angleOpen : .08, this.props.bulletForce ? this.props.bulletForce : 5 * screen.playerModel.bulletForce), invencible = this.props.invencible ? this.props.invencible : !1, angle = 0, size = this.props.size ? this.props.size : .8, bullet = new Bullet({
            x: Math.cos(angle) * vel,
            y: Math.sin(angle) * vel
        }, timeLive, bulletForce, screen.playerModel.specSource, screen.playerModel.bulletParticleSource, screen.playerModel.bulletRotation);
        bullet.invencible = invencible, bullet.build(), bullet.setPosition(screen.red.getPosition().x * size, screen.red.getPosition().y - .8 * screen.red.getContent().height), 
        screen.layer.addChild(bullet), scaleConverter(bullet.getContent().height, windowHeight, .4, bullet);
    },
    destroy: function() {},
    serialize: function() {}
}), HomingBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new HomingBehaviour(this.props);
    },
    build: function(screen) {
        for (var birds = [], i = screen.layer.childs.length - 1; i >= 0; i--) if ("bird" === screen.layer.childs[i].type) {
            var target = new SimpleSprite("target.png");
            screen.layer.childs[i].getContent().addChild(target.getContent()), target.getContent().position.x = -target.getContent().width / 2, 
            target.getContent().position.y = -target.getContent().height / 2, birds.push(screen.layer.childs[i]);
        }
        var vel = this.props.vel ? this.props.vel : 7, timeLive = windowWidth / vel, totalFires = this.props.totalFires ? this.props.totalFires : 5, angleOpen = this.props.angleOpen ? this.props.angleOpen : 3, bulletForce = this.props.bulletForce ? this.props.bulletForce : screen.playerModel.bulletForce, invencible = this.props.invencible ? this.props.invencible : !1;
        for (i = 0; i < birds.length; i++) {
            var angle = screen.red.rotation + angleOpen * (i - totalFires / 2), bullet = new Bullet({
                x: Math.cos(angle) * vel,
                y: Math.sin(angle) * vel
            }, timeLive, bulletForce, screen.playerModel.bulletSource, screen.playerModel.bulletParticleSource, screen.playerModel.bulletRotation);
            bullet.invencible = invencible, bullet.defaultVelocity = vel, bullet.setHoming(birds[i], 10, angle), 
            bullet.build(), bullet.setPosition(.9 * screen.red.getPosition().x, screen.red.getPosition().y - .8 * screen.red.getContent().height), 
            screen.layer.addChild(bullet), scaleConverter(bullet.getContent().height, screen.red.getContent().height, .2, bullet);
        }
    },
    destroy: function() {},
    serialize: function() {}
}), MultipleBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new MultipleBehaviour(this.props);
    },
    build: function(screen) {
        for (var vel = this.props.vel ? this.props.vel : 2.5, timeLive = windowWidth / vel, totalFires = this.props.totalFires ? this.props.totalFires : 5, size = this.props.size ? this.props.size : .3, angleOpen = this.props.angleOpen ? this.props.angleOpen : .08, bulletForce = this.props.bulletForce ? this.props.bulletForce : screen.playerModel.bulletForce, invencible = this.props.invencible ? this.props.invencible : !1, sinoid = this.props.sinoid ? this.props.sinoid : !1, i = 0; totalFires >= i; i++) {
            var angle = screen.red.rotation + angleOpen * (i - totalFires / 2), bullet = new Bullet({
                x: Math.cos(angle) * vel,
                y: Math.sin(angle) * vel
            }, timeLive, bulletForce, screen.playerModel.bulletSource, screen.playerModel.bulletParticleSource, screen.playerModel.bulletRotation);
            bullet.invencible = invencible, bullet.build(), bullet.sinoid = sinoid, bullet.getContent().rotation = angle, 
            bullet.setPosition(.9 * screen.red.getPosition().x, screen.red.getPosition().y - .8 * screen.red.getContent().height), 
            screen.layer.addChild(bullet), scaleConverter(bullet.getContent().height, screen.red.getContent().height, size, bullet);
        }
    },
    destroy: function() {},
    serialize: function() {}
}), RainBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new RainBehaviour(this.props);
    },
    build: function(screen) {
        var vel = this.props.vel ? this.props.vel : 10, timeLive = windowWidth / vel, timeInterval = this.props.timeInterval ? this.props.timeInterval : 150;
        this.totalFires = this.props.totalFires ? this.props.totalFires : 25;
        var bulletForce = (void 0 !== this.props.angleOpen ? this.props.angleOpen : .9, 
        this.props.bulletForce ? this.props.bulletForce : screen.playerModel.bulletForce), invencible = this.props.invencible ? this.props.invencible : !1, size = this.props.size ? this.props.size : .3, self = this;
        this.interval = setInterval(function() {
            var angle = 45, bullet = new Bullet({
                x: Math.cos(angle) * vel,
                y: Math.sin(angle) * vel
            }, timeLive, bulletForce, screen.playerModel.bulletSource, screen.playerModel.bulletParticleSource, screen.playerModel.bulletRotation);
            bullet.invencible = invencible, bullet.build(), bullet.getContent().rotation = angle, 
            bullet.setPosition(.6 * windowWidth * Math.random() + .15 * windowWidth, -bullet.getContent().height), 
            screen.layer.addChild(bullet), scaleConverter(bullet.getContent().height, screen.red.getContent().height, size, bullet), 
            --self.totalFires <= 0 && clearInterval(self.interval);
        }, timeInterval);
    },
    destroy: function() {},
    serialize: function() {}
}), RandomBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        var id = Math.floor(9 * Math.random());
        return 0 === id ? new GiantShootBehaviour({
            vel: 2.5,
            invencible: !0,
            bulletForce: 60,
            size: .8
        }) : 1 === id ? new SequenceBehaviour({
            angleOpen: 0,
            totalFires: 35
        }) : 2 === id ? new MultipleBehaviour({
            vel: 3,
            totalFires: 8,
            bulletForce: 10,
            size: .15,
            angleOpen: .25
        }) : 3 === id ? new SequenceBehaviour() : 4 === id ? new MultipleBehaviour({
            vel: 3.5,
            invencible: !0,
            totalFires: 5,
            bulletForce: 5,
            size: .5
        }) : 5 === id ? new HomingBehaviour({
            invencible: !0,
            bulletForce: 99,
            vel: 4
        }) : 6 === id ? new AkumaBehaviour() : 7 === id ? new AkumaBehaviour() : 8 === id ? new RainBehaviour() : new SequenceBehaviour({
            angleOpen: 0,
            totalFires: 25,
            sinoid: !0,
            vel: 2
        });
    },
    destroy: function() {},
    serialize: function() {}
}), SequenceBehaviour = Class.extend({
    init: function(props) {
        this.props = props ? props : {};
    },
    clone: function() {
        return new SequenceBehaviour(this.props);
    },
    build: function(screen) {
        var vel = this.props.vel ? this.props.vel : 10, timeLive = windowWidth / vel, timeInterval = this.props.timeInterval ? this.props.timeInterval : 150;
        this.totalFires = this.props.totalFires ? this.props.totalFires : 20;
        var angleOpen = void 0 !== this.props.angleOpen ? this.props.angleOpen : .9, bulletForce = this.props.bulletForce ? this.props.bulletForce : screen.playerModel.bulletForce, invencible = this.props.invencible ? this.props.invencible : !1, size = this.props.size ? this.props.size : .3, self = this, sinoid = this.props.sinoid ? this.props.sinoid : !1;
        this.interval = setInterval(function() {
            var angle = screen.red.rotation;
            angle += 0 === angleOpen ? 0 : angleOpen * Math.random() - angleOpen / 2;
            var bullet = new Bullet({
                x: Math.cos(angle) * vel,
                y: Math.sin(angle) * vel
            }, timeLive, bulletForce, screen.playerModel.bulletSource, screen.playerModel.bulletParticleSource, screen.playerModel.bulletRotation);
            bullet.invencible = invencible, bullet.build(), bullet.getContent().rotation = angle, 
            bullet.sinoid = sinoid, bullet.setPosition(.9 * screen.red.getPosition().x, screen.red.getPosition().y - .8 * screen.red.getContent().height), 
            screen.layer.addChild(bullet), scaleConverter(bullet.getContent().height, screen.red.getContent().height, size, bullet), 
            --self.totalFires <= 0 && clearInterval(self.interval);
        }, timeInterval);
    },
    destroy: function() {},
    serialize: function() {}
}), AppModel = Class.extend({
    init: function() {
        this.currentPlayerModel = {}, console.log(APP);
        var points = parseInt(APP.cookieManager.getCookie("totalPoints")), tempBirds = parseInt(APP.cookieManager.getCookie("totalBirds")), high = parseInt(APP.cookieManager.getCookie("highScore"));
        this.highScore = high ? high : 0, this.totalPoints = points ? points : 0, this.totalBirds = tempBirds ? tempBirds : 1, 
        this.currentPoints = 0, this.obstacleModels = [ new BirdModel({
            source: "obstaculo1.png",
            particles: [ "smoke.png", "smoke.png" ],
            sizePercent: .1
        }, {
            target: null,
            demage: .2,
            vel: -3,
            behaviour: new BirdBehaviourSinoid({
                sinAcc: .2
            })
        }) ], this.playerModels = [ new PlayerModel({
            label: "alcemar",
            inGame: "alcemarGame.png",
            bullet: "alcemarFire.png",
            bulletRotation: !0,
            bulletParticle: "partalcemar.png",
            color: 11719780,
            thumb: "thumb_alcemar",
            coverSource: "dist/img/UI/covers/alcemarGrande.png",
            labelSource: "Label_Alcemar.png",
            specSource: "power_alcemar.png",
            icoSpecSource: "especial_alcemar.png"
        }, {
            maxEnergy: 8600,
            energyCoast: 1.5,
            vel: .5,
            bulletForce: 2.2,
            bulletVel: 6,
            bulletCoast: .08,
            toSpec: 600,
            bulletBehaviour: new GiantShootBehaviour({
                vel: 2.5,
                invencible: !0,
                bulletForce: 60,
                size: .8
            })
        }), new PlayerModel({
            label: "piangers",
            inGame: "piangersNGame.png",
            bullet: "piangersFire.png",
            bulletRotation: !0,
            bulletParticle: "partpiangers1.png",
            color: 7654879,
            thumb: "thumb_piangers",
            coverSource: "dist/img/UI/covers/piangersGrande.png",
            labelSource: "Label_Piangers.png",
            icoSpecSource: "especial_piangers.png"
        }, {
            maxEnergy: 7800,
            energyCoast: 1.7,
            vel: 2.5,
            bulletForce: 1.3,
            bulletCoast: .095,
            bulletVel: 7,
            toAble: 10,
            toSpec: 450,
            bulletBehaviour: new SequenceBehaviour({
                angleOpen: 0,
                totalFires: 40
            })
        }), new PlayerModel({
            label: "potter",
            inGame: "poterGame.png",
            bullet: "potterFire.png",
            bulletRotation: !0,
            bulletParticle: "partpotter.png",
            color: 16428876,
            thumb: "thumb_poter",
            coverSource: "dist/img/UI/covers/poterGrande.png",
            labelSource: "Label_Potter.png",
            icoSpecSource: "especial_potter.png"
        }, {
            energyCoast: 2,
            vel: 1.5,
            bulletForce: 1.5,
            bulletCoast: .125,
            bulletVel: 7,
            toAble: 350,
            toSpec: 700,
            bulletBehaviour: new MultipleBehaviour({
                vel: 3,
                totalFires: 8,
                bulletForce: 10,
                size: .15,
                angleOpen: .25
            })
        }), new PlayerModel({
            label: "arthur",
            inGame: "arthurGame.png",
            bullet: "arthurFire.png",
            bulletParticle: "partarthur.png",
            color: 11764665,
            thumb: "thumb_arthur",
            coverSource: "dist/img/UI/covers/arthurGrande.png",
            labelSource: "Label_Arthur.png",
            icoSpecSource: "especial_arthur.png"
        }, {
            energyCoast: 2.3,
            vel: 1.3,
            bulletForce: 2.1,
            bulletCoast: .15,
            bulletVel: 5,
            toAble: 800,
            toSpec: 900,
            bulletBehaviour: new SequenceBehaviour()
        }), new PlayerModel({
            label: "pora",
            inGame: "poraGame.png",
            bullet: "poraFire.png",
            bulletRotation: !0,
            bulletParticle: "partexplosao.png",
            color: 16633351,
            thumb: "thumb_pora",
            coverSource: "dist/img/UI/covers/poraGrande.png",
            labelSource: "Label_Pora.png",
            icoSpecSource: "especial_pora.png"
        }, {
            maxEnergy: 6300,
            energyCoast: 2.6,
            vel: 1.5,
            bulletForce: 1.3,
            bulletCoast: .12,
            bulletVel: 5,
            toAble: 1200,
            toSpec: 1e3,
            bulletBehaviour: new MultipleBehaviour({
                vel: 3.5,
                invencible: !0,
                totalFires: 5,
                bulletForce: 5,
                size: .5
            })
        }), new PlayerModel({
            label: "jeiso",
            inGame: "jesoGame.png",
            bullet: "jeisoFire.png",
            bulletParticle: "partjeiso.png",
            color: 8963136,
            thumb: "thumb_jeiso",
            coverSource: "dist/img/UI/covers/jeisoGrande.png",
            labelSource: "Label_Jeiso.png",
            icoSpecSource: "especial_jeiso.png"
        }, {
            maxEnergy: 8200,
            energyCoast: 1.6,
            vel: 3,
            bulletForce: 1,
            bulletCoast: .05,
            bulletVel: 8,
            toAble: 2500,
            toSpec: 300,
            bulletBehaviour: new HomingBehaviour({
                invencible: !0,
                bulletForce: 99,
                vel: 4
            })
        }), new PlayerModel({
            label: "pi",
            inGame: "piGame.png",
            bullet: "piFire.png",
            bulletRotation: !0,
            bulletParticle: "partpi.png",
            color: 9399727,
            thumb: "thumb_pi",
            coverSource: "dist/img/UI/covers/piGrande.png",
            labelSource: "Label_MrPi.png",
            icoSpecSource: "especial_mr_pi.png"
        }, {
            maxEnergy: 6500,
            energyCoast: 3,
            vel: .8,
            bulletForce: 1.2,
            bulletCoast: .11,
            bulletVel: 4,
            toAble: 4e3,
            toSpec: 3e3,
            bulletBehaviour: new AkumaBehaviour()
        }), new PlayerModel({
            label: "fetter",
            inGame: "feterGame.png",
            bullet: "feterFire.png",
            bulletParticle: "partexplosao.png",
            color: 15614755,
            thumb: "thumb_feter",
            coverSource: "dist/img/UI/covers/feterGrande.png",
            labelSource: "Label_Fetter.png",
            icoSpecSource: "especial_fetter.png"
        }, {
            energyCoast: 2.2,
            vel: 1.5,
            bulletForce: 3,
            bulletVel: 6,
            bulletCoast: .15,
            toAble: 5e3,
            toSpec: 1200,
            bulletBehaviour: new RainBehaviour()
        }), new PlayerModel({
            label: "neto",
            inGame: "netoGame.png",
            bullet: "netoFire.png",
            bulletParticle: "partneto.png",
            color: 11772272,
            thumb: "thumb_neto",
            coverSource: "dist/img/UI/covers/netoGrande.png",
            labelSource: "Label_Neto.png",
            icoSpecSource: "especial_neto.png"
        }, {
            maxEnergy: 5800,
            energyCoast: 2.5,
            vel: 2,
            bulletForce: 3,
            bulletCoast: .15,
            bulletVel: 5,
            toAble: 8e3,
            toSpec: 1600,
            bulletBehaviour: new SequenceBehaviour({
                angleOpen: 0,
                totalFires: 25,
                sinoid: !0,
                vel: 2
            })
        }), new PlayerModel({
            label: "rodaika",
            inGame: "rodaikaGame.png",
            bullet: "rodaikaFire.png",
            bulletParticle: "partrodaika2.png",
            color: 15893674,
            thumb: "thumb_rodaika",
            coverSource: "dist/img/UI/covers/rodaikaGrande.png",
            labelSource: "Label_Rodaika.png",
            specSource: "power_rodaika.png",
            icoSpecSource: "especial_rodaika.png"
        }, {
            maxEnergy: 6e3,
            energyCoast: 3,
            vel: 2,
            bulletForce: 1,
            bulletCoast: .13,
            bulletVel: 5,
            toAble: 15e3,
            toSpec: 1300,
            bulletBehaviour: new RandomBehaviour()
        }) ], this.birdModels = [ new BirdModel({
            source: [ "caralinhoAnima0001.png", "caralinhoAnima0002.png", "caralinhoAnima0003.png", "caralinhoAnima0002.png" ],
            particles: [ "cabeca2.png", "penas2.png" ],
            egg: "ovo_belga.png",
            cover: "caralinho.png",
            sizePercent: .1,
            label: "CARALINHO DA TERRA"
        }, {
            target: null,
            hp: 1,
            demage: .2,
            vel: -3.5,
            behaviour: new BirdBehaviourDefault(),
            toNext: 22,
            money: 1
        }), new BirdModel({
            source: [ "belgaAnima0001.png", "belgaAnima0002.png", "belgaAnima0003.png", "belgaAnima0002.png" ],
            particles: [ "cabeca5.png", "penas5.png" ],
            egg: "ovo_belga.png",
            cover: "belga.png",
            sizePercent: .15,
            label: "CARALHO BELGA"
        }, {
            target: null,
            hp: 3,
            demage: .2,
            vel: -1.5,
            behaviour: new BirdBehaviourSinoid({
                sinAcc: .05
            }),
            toNext: 110,
            money: 3
        }), new BirdModel({
            source: [ "lambecuAnima0001.png", "lambecuAnima0002.png", "lambecuAnima0003.png", "lambecuAnima0004.png" ],
            particles: [ "cabeca4.png", "penas4.png" ],
            egg: "ovo_lambecu.png",
            cover: "lambecu.png",
            sizePercent: .15,
            label: "LAMBECU FRANCÊS"
        }, {
            target: null,
            hp: 6,
            demage: .2,
            vel: -1.5,
            behaviour: new BirdBehaviourSinoid({
                sinAcc: .05,
                velY: -3
            }),
            toNext: 150,
            money: 4
        }), new BirdModel({
            source: [ "roxoAnima0001.png", "roxoAnima0002.png", "roxoAnima0003.png", "roxoAnima0004.png" ],
            particles: [ "cabeca6.png", "penas6.png" ],
            egg: "ovo_papacu.png",
            cover: "roxo.png",
            sizePercent: .2,
            label: "PAPACU DE CABEÇA ROXA"
        }, {
            target: null,
            hp: 12,
            demage: .2,
            vel: -2,
            behaviour: new BirdBehaviourDiag({
                accX: 0
            }),
            toNext: 150,
            money: 6
        }), new BirdModel({
            source: [ "papodebagoAnima0001.png", "papodebagoAnima0002.png", "papodebagoAnima0003.png", "papodebagoAnima0004.png" ],
            particles: [ "cabeca7.png", "penas7.png" ],
            egg: "ovo_galo.png",
            cover: "papodebago.png",
            sizePercent: .15,
            label: "GALINHO PAPO DE BAGO"
        }, {
            target: null,
            hp: 4,
            demage: .2,
            vel: -3,
            behaviour: new BirdBehaviourDiag({
                accX: -.01
            }),
            toNext: 80,
            money: 8
        }), new BirdModel({
            source: [ "nocututinhaAnima0001.png", "nocututinhaAnima0002.png", "nocututinhaAnima0003.png", "nocututinhaAnima0004.png" ],
            particles: [ "cabeca3.png", "penas3.png" ],
            egg: "ovo_nocu.png",
            cover: "nocu.png",
            sizePercent: .25,
            label: "NOCUTUTINHA"
        }, {
            target: null,
            hp: 12,
            demage: .2,
            vel: -2,
            behaviour: new BirdBehaviourSinoid2({
                sinAcc: .08,
                velY: -8
            }),
            toNext: 250,
            money: 15
        }), new BirdModel({
            source: [ "calopsudaAnima0001.png", "calopsudaAnima0002.png", "calopsudaAnima0003.png", "calopsudaAnima0004.png" ],
            particles: [ "cabeca8.png", "penas8.png" ],
            egg: "ovo_calopsuda.png",
            cover: "calopsuda.png",
            sizePercent: .28,
            label: "CALOPSUDA"
        }, {
            target: null,
            hp: 40,
            demage: .2,
            vel: -.8,
            behaviour: new BirdBehaviourSinoid2({
                sinAcc: .05,
                velY: -6
            }),
            toNext: 180,
            money: 25
        }), new BirdModel({
            source: [ "nigerianoAnima0001.png", "nigerianoAnima0002.png", "nigerianoAnima0003.png", "nigerianoAnima0004.png" ],
            particles: [ "cabeca1.png", "penas1.png" ],
            egg: "ovo_nigeriano.png",
            cover: "nigeriano.png",
            sizePercent: .3,
            label: "PIÇUDÃO AZUL NIGERIANO"
        }, {
            target: null,
            hp: 50,
            demage: .2,
            vel: -.5,
            behaviour: new BirdBehaviourSinoid2({
                sinAcc: .08,
                velY: -2
            }),
            toNext: 450,
            money: 50
        }) ], this.setModel(0), this.totalPlayers = 0;
        for (var i = this.playerModels.length - 1; i >= 0; i--) this.playerModels[i].toAble <= this.totalPoints && (this.playerModels[i].able = !0, 
        this.totalPlayers++);
        this.birdProbs = [ 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 2, 3, 0, 0, 2, 0, 3, 4, 4, 4, 4, 4, 0, 5, 5, 5, 5, 5, 0, 6, 6, 6, 6, 0, 7, 7, 7, 7, 4, 5, 6, 7 ], 
        this.currentHorde = 0, this.killedBirds = [];
    },
    setModel: function(id) {
        this.currentID = id, this.currentPlayerModel = this.playerModels[id];
    },
    zerarTudo: function() {
        this.currentHorde = 0, this.totalPoints = 0, this.totalBirds = 1, this.totalPlayers = 1, 
        APP.cookieManager.setCookie("totalPoints", 0, 500), APP.cookieManager.setCookie("totalBirds", 1, 500);
        for (var i = this.playerModels.length - 1; i >= 0; i--) this.playerModels[i].able = this.playerModels[i].toAble <= this.totalPoints ? !0 : !1;
    },
    maxPoints: function() {
        this.currentHorde = 0, this.totalPoints = 999999, this.totalBirds = 8, APP.cookieManager.setCookie("totalPoints", this.totalPoints, 500), 
        APP.cookieManager.setCookie("totalBirds", this.totalBirds, 500);
        for (var i = this.playerModels.length - 1; i >= 0; i--) this.playerModels[i].able = this.playerModels[i].toAble <= this.totalPoints ? !0 : !1;
    },
    getNewObstacle: function(screen) {
        var id = Math.floor(this.obstacleModels.length * Math.random()), obs = new Obstacle(this.obstacleModels[id], screen);
        return obs;
    },
    getNewBird: function(player, screen) {
        this.currentHorde++;
        var max = this.birdProbs.length;
        this.currentHorde < max && (max = this.currentHorde);
        for (var id = 99999; id > this.totalBirds - 1; ) id = this.birdProbs[Math.floor(max * Math.random())];
        this.birdModels[id].target = player;
        var bird = new Bird(this.birdModels[id], screen);
        return bird.id = id, console.log(bird.id), this.lastID = id, bird;
    },
    ableNewBird: function(birdModel) {
        if (birdModel && !(this.totalBirds >= this.birdModels.length)) {
            this.totalBirds = 0;
            for (var i = 0; i < this.birdModels.length; i++) if (this.totalBirds++, this.birdModels[i].label === birdModel.label) {
                console.log(this.birdModels[i].label, birdModel.label);
                break;
            }
            console.log(this.totalBirds), APP.cookieManager.setCookie("totalBirds", this.totalBirds, 500);
        }
    },
    add100Points: function() {
        this.totalPoints += 100, APP.cookieManager.setCookie("totalPoints", 100, 500), this.totalPlayers = 0;
        for (var i = this.playerModels.length - 1; i >= 0; i--) this.playerModels[i].toAble <= this.totalPoints && !this.playerModels[i].able && (this.playerModels[i].able = !0), 
        this.playerModels[i].able && this.totalPlayers++;
    },
    addPoints: function() {
        this.currentHorde = 0, this.totalPoints += this.currentPoints, this.highScore < this.currentPoints && (this.highScore = this.currentPoints, 
        APP.cookieManager.setCookie("highScore", this.highScore, 500), APP.dataManager.saveScore()), 
        APP.cookieManager.setCookie("totalPoints", this.totalPoints, 500), this.maxPoints < this.currentPoints && (this.maxPoints = this.currentPoints);
        var tempReturn = [];
        this.totalPlayers = 0;
        for (var i = this.playerModels.length - 1; i >= 0; i--) this.playerModels[i].toAble <= this.totalPoints && !this.playerModels[i].able && (this.playerModels[i].able = !0, 
        tempReturn.push(this.playerModels[i])), this.playerModels[i].able && this.totalPlayers++;
        return tempReturn;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), BirdModel = Class.extend({
    init: function(graphicsObject, statsObjec) {
        this.cover = graphicsObject.cover ? graphicsObject.cover : "belga.png", this.imgSource = graphicsObject.source ? graphicsObject.source : [ "belga.png" ], 
        this.particles = graphicsObject.particles ? graphicsObject.particles : [ "smoke.png" ], 
        this.egg = graphicsObject.egg ? graphicsObject.egg : [ "smoke.png" ], this.sizePercent = graphicsObject.sizePercent ? graphicsObject.sizePercent : .2, 
        this.label = graphicsObject.label ? graphicsObject.label : "", this.demage = statsObjec.demage, 
        this.vel = statsObjec.vel, this.hp = statsObjec.hp, this.target = statsObjec.target, 
        this.timeLive = 999, this.toNext = statsObjec.toNext ? statsObjec.toNext : 150, 
        this.behaviour = statsObjec.behaviour, this.money = statsObjec.money;
    },
    serialize: function() {}
}), DataManager = Class.extend({
    init: function() {
        this.highscore = APP.cookieManager.getCookie("highScore"), console.log("highscore", this.highscore.points);
    },
    saveScore: function() {
        var i = 0, tempBirds = [ [ "caralinhoDaTerra", 0 ], [ "caralhoBelga", 0 ], [ "lambecuFrances", 0 ], [ "papacuDeCabecaRoxa", 0 ], [ "galinhoPapoDeBago", 0 ], [ "nocututinha", 0 ], [ "calopsuda", 0 ], [ "picudaoAzulNigeriano", 0 ] ];
        for (i = APP.getGameModel().killedBirds.length - 1; i >= 0; i--) tempBirds[APP.getGameModel().killedBirds[i]][1]++;
        var sendObject = '{\n"character":"' + APP.getGameModel().playerModels[APP.getGameModel().currentID].label + '",\n"points":"' + APP.getGameModel().currentPoints + '",\n"birds":{\n';
        for (i = 0; i < tempBirds.length; i++) sendObject += i >= tempBirds.length - 1 ? '"' + tempBirds[i][0] + '":"' + tempBirds[i][1] + '"\n' : '"' + tempBirds[i][0] + '":"' + tempBirds[i][1] + '",\n';
        sendObject += "}\n}", console.log(sendObject);
        ({
            character: APP.getGameModel().playerModels[APP.getGameModel().currentID].label,
            points: APP.getGameModel().currentPoints
        });
        this.highscore = JSON.parse(sendObject), APP.cookieManager.setCookie("highScore", this.highscore, 500);
    }
}), PlayerModel = Class.extend({
    init: function(graphicsObject, statsObject) {
        this.range = 40, this.maxEnergy = 7e3, this.currentEnergy = 8e3, this.maxBulletEnergy = 100, 
        this.currentBulletEnergy = 100, this.recoverBulletEnergy = .5, this.chargeBullet = 2, 
        this.currentBulletForce = 100, this.recoverEnergy = .5, this.label = graphicsObject.label ? graphicsObject.label : "NOME", 
        this.labelSource = graphicsObject.labelSource ? graphicsObject.labelSource : "", 
        this.thumb = graphicsObject.thumb ? graphicsObject.thumb : "thumb_jeiso", this.thumbColor = this.thumb + "_color.png", 
        this.thumbGray = this.thumb + "_gray.png", this.color = graphicsObject.color ? graphicsObject.color : 8755, 
        this.imgSourceGame = graphicsObject.inGame ? graphicsObject.inGame : "piangersNGame.png", 
        this.imgSource = graphicsObject.outGame ? graphicsObject.outGame : this.imgSourceGame, 
        this.coverSource = graphicsObject.coverSource ? graphicsObject.coverSource : "dist/img/UI/jeisoGrande.png", 
        this.bulletSource = graphicsObject.bullet ? graphicsObject.bullet : "feterFire.png", 
        this.bulletParticleSource = graphicsObject.bulletParticle ? graphicsObject.bulletParticle : this.bulletSource, 
        this.smoke = graphicsObject.smoke ? graphicsObject.smoke : "smoke.png", this.specSource = graphicsObject.specSource ? graphicsObject.specSource : null, 
        this.icoSpecSource = graphicsObject.icoSpecSource ? graphicsObject.icoSpecSource : "especial_fetter.png", 
        this.bulletRotation = graphicsObject.bulletRotation ? graphicsObject.bulletRotation : !1, 
        this.energyCoast = statsObject.energyCoast ? statsObject.energyCoast : 1, this.energyCoast = 4 - this.energyCoast, 
        this.maxEnergy = statsObject.maxEnergy ? statsObject.maxEnergy : 7e3, this.bulletCoast = statsObject.bulletCoast ? statsObject.bulletCoast : .2, 
        this.velocity = statsObject.vel ? statsObject.vel : 2, this.bulletVel = statsObject.bulletVel ? statsObject.bulletVel : 8, 
        this.bulletForce = statsObject.bulletForce ? statsObject.bulletForce : 1, this.toAble = statsObject.toAble ? statsObject.toAble : 0, 
        this.toSpec = statsObject.toSpec ? statsObject.toSpec : 1e3, this.bulletBehaviour = statsObject.bulletBehaviour ? statsObject.bulletBehaviour : new MultipleBehaviour(), 
        this.able = !1;
    },
    reset: function() {
        this.currentEnergy = this.maxEnergy, this.currentBulletEnergy = this.maxBulletEnergy;
    },
    build: function() {},
    destroy: function() {},
    serialize: function() {}
}), GameScreen = AbstractScreen.extend({
    init: function(label) {
        this._super(label), this.isLoaded = !1, APP.labelDebug.visible = !1, this.pinDefaultVelocity = 3;
    },
    destroy: function() {
        this._super();
    },
    build: function() {
        this._super();
        var assetsToLoader = [ "dist/img/atlas.json" ];
        this.loader = new PIXI.AssetLoader(assetsToLoader), assetsToLoader.length > 0 && !this.isLoaded ? this.initLoad() : this.onAssetsLoaded(), 
        this.pinVel = {
            x: 0,
            y: 0
        };
    },
    onProgress: function() {
        console.log("progress"), this._super();
    },
    onAssetsLoaded: function() {
        console.log("loaded"), this.initApplication();
    },
    initApplication: function() {
        function updateVel(touchData) {
            self.pinOver = !0, self.pinPos = {
                x: (touchData.global.x - self.mazeContainer.position.x) / self.mazeContainer.scale.x,
                y: (touchData.global.y - self.mazeContainer.position.y - .5 * self.pin.getContent().height) / self.mazeContainer.scale.y
            };
            var angle = Math.atan2(self.pinPos.y - self.pin.getContent().position.y, self.pinPos.x - self.pin.getContent().position.x);
            angle = 180 * angle / Math.PI, angle += 90, angle = angle / 180 * Math.PI, self.pinVel.x = self.pinDefaultVelocity * Math.sin(angle), 
            self.pinVel.y = self.pinDefaultVelocity * -Math.cos(angle);
        }
        var bg = new SimpleSprite("bg.jpg");
        this.container.addChild(bg.getContent()), scaleConverter(bg.getContent().width, windowWidth, 1.2, bg), 
        bg.getContent().position.x = windowWidth / 2 - bg.getContent().width / 2, bg.getContent().position.y = windowHeight / 2 - bg.getContent().height / 2;
        var logo = new SimpleSprite("logo.png");
        this.container.addChild(logo.getContent()), scaleConverter(logo.getContent().height, windowHeight, .05, logo), 
        logo.getContent().position.x = windowWidth - logo.getContent().width - 20, logo.getContent().position.y = 20, 
        this.seloGame = new SimpleSprite("seloGame.png"), this.container.addChild(this.seloGame.getContent()), 
        this.seloGame.getContent().position.x = 20, this.seloGame.getContent().position.y = 20;
        var self = this;
        this.mazeContainer = new PIXI.DisplayObjectContainer(), this.addChild(this.mazeContainer), 
        this.pin = new DefaultButton("pinOut.png", "pinOver.png"), this.pin.build(), this.mazeContainer.addChild(this.pin.getContent()), 
        this.pin.getContent().pivot.y = .95 * this.pin.getContent().height, this.pin.getContent().pivot.x = this.pin.getContent().width / 2, 
        scaleConverter(this.pin.getContent().height, windowHeight, .1, this.pin), this.lockIcons = new PIXI.DisplayObjectContainer(), 
        this.addChild(this.lockIcons), this.itemLockList = [];
        for (var i = 0; 4 > i; i++) {
            var tempIco = new SimpleSprite("backItem.png");
            this.lockIcons.addChild(tempIco.getContent()), tempIco.getContent().position.x = windowWidth / 4 * i, 
            this.itemLockList.push(tempIco.getContent());
        }
        this.pin.getContent().interactive = !0, this.pinPos = {
            x: this.pin.getContent().position.x,
            y: this.pin.getContent().position.y
        }, this.vecObstacles = [], this.waypoints = [], this.itens = [], this.levels = [], 
        this.currentLevel = 0;
        var rectsLevel1 = [ [ 18.5, 11.5, 283.1, 18.8 ], [ 18.5, 275, 283.1, 19.8 ], [ 18.5, 239.75, 51.05, 16.7 ], [ 136, 239, 127.55, 17.2 ], [ 136, 203, 127.55, 13.2 ], [ 58, 203.25, 46.55, 12.7 ], [ 19, 169.5, 46.55, 7.1 ], [ 177, 169, 46.55, 7.1 ], [ 217.5, 130, 46.55, 7.1 ], [ 98, 129.25, 46.55, 9.35 ], [ 247.35, 90.5, 53.05, 12.2 ], [ 136.5, 49.5, 48.05, 16.2 ], [ 58.5, 50.25, 46.55, 15.7 ], [ 19, 11.5, 19, 247.25 ], [ 57.5, 50.8, 15.5, 127.15 ], [ 136.5, 49.8, 9, 168.05 ], [ 212, 9.8, 11, 168.05 ], [ 98, 129, 11.5, 166.8 ], [ 98, 50.3, 11.5, 50.15 ], [ 247.4, 50.3, 16.1, 47.15 ], [ 247.5, 167.8, 16, 88.95 ], [ 176.25, 50.15, 8, 89.55 ], [ 283.45, 49.8, 20, 247.65 ] ];
        this.levels.push({
            background: "labirinto1.png",
            rects: rectsLevel1,
            initPoint: [ 18.45, 255.75, 20, 18.75 ],
            endPoint: [ 283.45, 30.75, 20, 18.75 ],
            itemSrc: "saia.png",
            item: [ 60.45, 255.75, 20, 18.75 ]
        });
        var rectsLevel2 = [ [ 18.5, 11.5, 283.1, 18.8 ], [ 18.5, 275, 283.1, 19.8 ], [ 18.5, 239.75, 51.05, 16.7 ], [ 175.5, 237.5, 86.55, 17.2 ], [ 211.05, 203, 52.5, 13.2 ], [ 58, 203.25, 46.55, 12.7 ], [ 58.5, 167.5, 83.55, 7.1 ], [ 177, 169, 124.05, 7.1 ], [ 216.5, 129, 46.55, 7.1 ], [ 23.5, 127.75, 84.55, 9.35 ], [ 99.85, 89, 122.55, 12.2 ], [ 136.5, 49.5, 87.05, 16.2 ], [ 58.5, 50.25, 46.55, 15.7 ], [ 19, 11.5, 19, 247.25 ], [ 57.5, 50.8, 15.5, 53.6 ], [ 136.5, 129.2, 9, 126.05 ], [ 213, 9.8, 11, 48 ], [ 98, 239.45, 11.5, 54.85 ], [ 98, 50.3, 11.5, 84.9 ], [ 247.4, 50.3, 16.1, 85.25 ], [ 247, 203, 16, 52.7 ], [ 283.45, 49.8, 20, 247.65 ], [ 98.45, 237.5, 46, 17.2 ], [ 175.5, 129.2, 9, 126.05 ], [ 56.95, 204.1, 16, 52.05 ], [ 213, 90.35, 11, 46.65 ] ];
        this.levels.push({
            background: "labirinto2.png",
            rects: rectsLevel2,
            initPoint: [ 18.45, 255.75, 20, 18.75 ],
            endPoint: [ 283.45, 30.75, 20, 18.75 ],
            itemSrc: "casaco.png",
            item: [ 74.5, 66.25, 20, 18.75 ]
        });
        var rectsLevel3 = [ [ 18.5, 11.5, 283.1, 18.8 ], [ 18.5, 275, 283.1, 19.8 ], [ 18.5, 239.75, 51.05, 16.7 ], [ 249.05, 203, 52.5, 13.2 ], [ 58.5, 167.5, 83.55, 7.1 ], [ 216.5, 129, 46.55, 7.1 ], [ 59.5, 127.75, 84.55, 9.35 ], [ 138.35, 88, 45.65, 12.2 ], [ 98.95, 49.5, 164.15, 16.2 ], [ 19, 11.5, 19, 247.25 ], [ 58.5, 12.3, 15.5, 53.6 ], [ 136.5, 167.35, 9, 48.6 ], [ 136, 239.45, 11.5, 54.85 ], [ 98, 50.3, 11.5, 49.15 ], [ 247.4, 50.3, 16.1, 51.15 ], [ 247, 129.6, 16, 86.6 ], [ 283.45, 49.8, 20, 247.65 ], [ 98.45, 237.5, 164.6, 17.2 ], [ 175.5, 90.15, 9, 165.6 ], [ 56.95, 168.9, 16, 87.75 ], [ 214.5, 89.85, 11, 125.6 ], [ 136.5, 87.85, 9, 48.6 ], [ 22.8, 88, 85.65, 12.2 ], [ 97.45, 204.15, 13, 52 ] ];
        this.levels.push({
            background: "labirinto3.png",
            rects: rectsLevel3,
            initPoint: [ 18.45, 255.75, 20, 18.75 ],
            endPoint: [ 283.45, 30.75, 20, 18.75 ],
            itemSrc: "bolsa.png",
            item: [ 148.55, 255.3, 20, 18.75 ]
        });
        var rectsLevel4 = [ [ 18.5, 11.5, 283.1, 18.8 ], [ 18.5, 275, 283.1, 19.8 ], [ 18.5, 239.75, 90.55, 16.7 ], [ 212, 237.5, 50.05, 17.2 ], [ 137.05, 203, 45.5, 13.2 ], [ 58, 203.25, 46.55, 12.7 ], [ 58.5, 167.5, 124.55, 7.1 ], [ 248, 129, 46.55, 7.1 ], [ 137.35, 89, 122.55, 12.2 ], [ 99.45, 49.5, 124.1, 16.2 ], [ 19, 11.5, 19, 247.25 ], [ 57.5, 50.8, 15.5, 124.45 ], [ 136.5, 204.65, 9, 50.55 ], [ 213, 9.8, 11, 48 ], [ 98, 202.7, 11.5, 54.05 ], [ 98, 50.3, 11.5, 124.35 ], [ 247.4, 50.3, 16.1, 85.25 ], [ 283.45, 49.8, 20, 247.65 ], [ 175.5, 129.2, 9, 45 ], [ 136.5, 90.6, 9, 49.5 ], [ 178.5, 129, 46.55, 7.1 ], [ 247, 170, 16, 84.7 ], [ 175.5, 204.25, 9, 89.4 ], [ 212, 131.75, 11.5, 123.2 ] ];
        this.levels.push({
            background: "labirinto4.png",
            rects: rectsLevel4,
            initPoint: [ 18.45, 255.75, 20, 18.75 ],
            endPoint: [ 283.45, 30.75, 20, 18.75 ],
            itemSrc: "sapato.png",
            item: [ 189.55, 31.25, 20, 18.75 ]
        }), this.renderLevel(), this.hitTouch = new PIXI.Graphics(), this.hitTouch.interactive = !0, 
        this.hitTouch.beginFill(0), this.hitTouch.drawRect(0, 0, windowWidth, windowHeight), 
        this.addChild(this.hitTouch), this.hitTouch.alpha = 0, this.hitTouch.hitArea = new PIXI.Rectangle(0, 0, windowWidth, windowHeight), 
        this.hitTouch.touchmove = function(touchData) {
            updateVel(touchData);
        }, this.hitTouch.touchstart = function(touchData) {
            updateVel(touchData);
        }, this.hitTouch.touchend = function() {
            self.pinVel.x = 0, self.pinVel.y = 0, self.pin.setOut(), self.pinOver = !1;
        }, this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .8, {
            alpha: 0
        }), this.updateable = !0;
    },
    update: function() {
        if (this.updateable && this.pin && this.pinOver) {
            this.pin.setOver();
            var i = 0;
            if (this.itens) for (i = this.itens.length - 1; i >= 0; i--) this.itens[i].hitArea.contains(this.pin.getContent().position.x, this.pin.getContent().position.y) && this.getItem(i);
            if (this.waypoints) for (i = this.waypoints.length - 1; i >= 0; i--) this.waypoints[i].hitArea.contains(this.pin.getContent().position.x, this.pin.getContent().position.y) && this.verifyChangeLevel(i);
            for (i = this.vecObstacles.length - 1; i >= 0; i--) {
                var obs = this.vecObstacles[i];
                (obs && obs.hitArea.contains(this.pin.getContent().position.x + this.pinVel.x * this.pinDefaultVelocity, this.pin.getContent().position.y) || obs.hitArea.contains(this.pin.getContent().position.x + this.pinVel.x * this.pinDefaultVelocity, this.pin.getContent().position.y)) && (this.pinVel.x = 0), 
                (obs && obs.hitArea.contains(this.pin.getContent().position.x, this.pin.getContent().position.y + this.pinVel.y * this.pinDefaultVelocity) || obs.hitArea.contains(this.pin.getContent().position.x, this.pin.getContent().position.y + this.pinVel.y * this.pinDefaultVelocity)) && (this.pinVel.y = 0);
            }
            pointDistance(this.pinPos.x, this.pinPos.y, this.pin.getContent().position.x, this.pin.getContent().position.y) > 10 && (this.pin.getContent().position.x += this.pinVel.x, 
            this.pin.getContent().position.y += this.pinVel.y);
        }
    },
    getItem: function(id) {
        console.log(this.itemLockList[this.currentLevel], this.itensGraphics[id].getContent()), 
        this.itensGraphics[id].alpha = .5, this.itemLockList[this.currentLevel].addChild(this.itensGraphics[id].getContent()), 
        this.itensGraphics[id].getContent().position.x = this.itemLockList[this.currentLevel].position.x - this.itensGraphics[id].getContent().width / 2 + this.itemLockList[this.currentLevel].width / 2, 
        this.itensGraphics[id].getContent().position.y = this.itemLockList[this.currentLevel].position.y - this.itensGraphics[id].getContent().height / 2 + this.itemLockList[this.currentLevel].height / 2, 
        this.itens.splice(id, 1);
    },
    verifyChangeLevel: function(idWay) {
        1 === idWay ? (this.currentLevel++, this.currentLevel >= this.levels.length && (this.currentLevel = 0)) : (this.currentLevel--, 
        this.currentLevel < 0 && (this.currentLevel = this.levels.length - 1)), this.renderLevel(1 === idWay ? 0 : 1);
    },
    renderLevel: function(whereInit) {
        whereInit || (whereInit = 0);
        var i = 0;
        if (this.waypoints = [], this.vecObstacles = [], this.itens = [], this.itensGraphics = [], 
        this.itens.length > 0) for (i = this.itens.length - 1; i >= 0; i--) this.itens[i].getContent() && this.itens[i].getContent().parent && this.itens[i].getContent().parent.removeChild(this.itens[i].getContent());
        if (this.vecObstacles.length > 0) for (i = this.vecObstacles.length - 1; i >= 0; i--) this.vecObstacles[i].getContent() && this.vecObstacles[i].getContent().parent && this.vecObstacles[i].getContent().parent.removeChild(this.vecObstacles[i].getContent());
        var levelObj = this.levels[this.currentLevel];
        if (this.maze && this.maze.getContent() && this.maze.getContent().parent.removeChild(this.maze.getContent()), 
        this.itensGraphics.length > 0) for (i = this.itensGraphics.length - 1; i >= 0; i--) this.itensGraphics[i].getContent() && this.itensGraphics[i].getContent().parent && this.itensGraphics[i].getContent().parent.removeChild(this.itensGraphics[i].getContent());
        this.maze = new SimpleSprite(levelObj.background), this.mazeContainer.addChild(this.maze.getContent()), 
        this.lockIcons.position.x = windowWidth / 2 - this.lockIcons.width / 2, this.lockIcons.position.y = windowHeight - this.lockIcons.height - 20;
        var scaleMaze = scaleConverter(this.maze.getContent().width, windowWidth, 1, this.mazeContainer);
        this.mazeContainer.position.x = windowWidth / 2 - scaleMaze * this.maze.getContent().width / 2, 
        this.mazeContainer.position.y = this.lockIcons.position.y - 20 - scaleMaze * this.maze.getContent().height;
        var logScale = (this.mazeContainer.position.y - 20) / windowHeight;
        for (console.log(logScale, windowHeight, this.mazeContainer.position.y), scaleConverter(this.seloGame.getContent().height, windowHeight, logScale, this.seloGame), 
        i = levelObj.rects.length - 1; i >= 0; i--) {
            var obs = new PIXI.Graphics();
            obs.lineStyle(1, 0), obs.drawRect(0, 0, levelObj.rects[i][2], levelObj.rects[i][3]), 
            obs.position.x = levelObj.rects[i][0], obs.position.y = levelObj.rects[i][1], obs.hitArea = new PIXI.Rectangle(obs.position.x, obs.position.y, obs.width, obs.height), 
            this.vecObstacles.push(obs);
        }
        var tempInitP = new PIXI.Graphics();
        if (levelObj.item) {
            console.log(levelObj.item), tempInitP.lineStyle(1, 255), tempInitP.drawRect(0, 0, levelObj.item[2], levelObj.item[3]), 
            this.mazeContainer.addChild(tempInitP), tempInitP.position.x = levelObj.item[0], 
            tempInitP.position.y = levelObj.item[1], tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x, tempInitP.position.y, tempInitP.width, tempInitP.height), 
            this.itens.push(tempInitP);
            var graphicItem = new SimpleSprite(levelObj.itemSrc);
            graphicItem.getContent().position.x = tempInitP.position.x - graphicItem.getContent().width / 2 + tempInitP.width / 2, 
            graphicItem.getContent().position.y = tempInitP.position.y - graphicItem.getContent().height / 2 + tempInitP.height / 2, 
            this.itensGraphics.push(graphicItem), this.mazeContainer.addChild(graphicItem.getContent());
        }
        levelObj.initPoint && (tempInitP = new PIXI.Graphics(), tempInitP.lineStyle(1, 16711680), 
        tempInitP.drawRect(0, 0, levelObj.initPoint[2], levelObj.initPoint[3]), this.mazeContainer.addChild(tempInitP), 
        tempInitP.position.x = levelObj.initPoint[0], tempInitP.position.y = levelObj.initPoint[1], 
        tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x, tempInitP.position.y, tempInitP.width, tempInitP.height), 
        this.waypoints.push(tempInitP), 0 === whereInit && (this.pin.getContent().position.x = tempInitP.position.x + tempInitP.width + 1, 
        this.pin.getContent().position.y = tempInitP.position.y + tempInitP.height / 2)), 
        levelObj.endPoint && (tempInitP = new PIXI.Graphics(), tempInitP.lineStyle(1, 65280), 
        tempInitP.drawRect(0, 0, levelObj.endPoint[2], levelObj.endPoint[3]), this.mazeContainer.addChild(tempInitP), 
        tempInitP.position.x = levelObj.endPoint[0], tempInitP.position.y = levelObj.endPoint[1], 
        tempInitP.hitArea = new PIXI.Rectangle(tempInitP.position.x, tempInitP.position.y, tempInitP.width, tempInitP.height), 
        this.waypoints.push(tempInitP), 1 === whereInit && (this.pin.getContent().position.x = tempInitP.position.x - 1, 
        this.pin.getContent().position.y = tempInitP.position.y + tempInitP.height / 2)), 
        this.pin.getContent().parent.setChildIndex(this.pin.getContent(), this.pin.getContent().parent.children.length - 1);
        var self = this;
        this.updateable = !1, this.frontShape.alpha = 1, this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .8, {
            alpha: 0,
            onComplete: function() {
                self.updateable = !0;
            }
        });
    },
    transitionIn: function() {
        this.frontShape = new PIXI.Graphics(), this.frontShape.beginFill(16553437), this.frontShape.drawRect(0, 0, windowWidth, windowHeight), 
        this.addChild(this.frontShape), this.build();
    },
    transitionOut: function(nextScreen, container) {
        var self = this;
        this.frontShape ? (this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .3, {
            alpha: 1,
            onComplete: function() {
                self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn();
            }
        })) : (self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn());
    }
}), InitScreen = AbstractScreen.extend({
    init: function(label) {
        this._super(label), this.isLoaded = !1, APP.labelDebug.visible = !1;
    },
    destroy: function() {
        this._super();
    },
    build: function() {
        this._super();
        var assetsToLoader = [ "dist/img/atlas.json" ];
        this.loader = new PIXI.AssetLoader(assetsToLoader), assetsToLoader.length > 0 ? (console.log(this.initLoad), 
        this.initLoad()) : this.onAssetsLoaded(), this.updateable = !0;
    },
    update: function() {
        !this.updateable;
    },
    onProgress: function() {
        this._super();
    },
    onAssetsLoaded: function() {
        this.initApplication();
    },
    initApplication: function() {
        var self = this, bg = new SimpleSprite("bg.jpg");
        this.container.addChild(bg.getContent()), scaleConverter(bg.getContent().width, windowWidth, 1.2, bg), 
        bg.getContent().position.x = windowWidth / 2 - bg.getContent().width / 2, bg.getContent().position.y = windowHeight / 2 - bg.getContent().height / 2;
        var logo = new SimpleSprite("logo.png");
        this.container.addChild(logo.getContent()), scaleConverter(logo.getContent().height, windowHeight, .05, logo), 
        logo.getContent().position.x = windowWidth - logo.getContent().width - 20, logo.getContent().position.y = 20;
        var selo = new SimpleSprite("selo.png");
        this.container.addChild(selo.getContent()), scaleConverter(selo.getContent().height, windowHeight, .6, selo), 
        selo.getContent().position.x = windowWidth / 2 - selo.getContent().width / 2, selo.getContent().position.y = 20, 
        this.fullscreenButton = new DefaultButton("btnJogar.png", "btnJogar.png"), this.fullscreenButton.build(), 
        this.fullscreenButton.setPosition(windowWidth / 2 - this.fullscreenButton.getContent().width / 2, windowHeight - this.fullscreenButton.getContent().height), 
        this.addChild(this.fullscreenButton), this.fullscreenButton.clickCallback = function() {
            self.screenManager.change("Game"), self.updateable = !1;
        }, TweenLite.from(selo.getContent(), .8, {
            y: -selo.getContent().height
        }), TweenLite.from(logo.getContent(), .5, {
            delay: .7,
            y: -logo.getContent().height
        }), TweenLite.from(this.fullscreenButton.getContent(), .5, {
            delay: .6,
            y: windowHeight
        }), this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .8, {
            alpha: 0
        });
    },
    transitionIn: function() {
        this.frontShape = new PIXI.Graphics(), this.frontShape.beginFill(16553437), this.frontShape.drawRect(0, 0, windowWidth, windowHeight), 
        this.addChild(this.frontShape), this.build();
    },
    transitionOut: function(nextScreen, container) {
        var self = this;
        this.frontShape ? (this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .3, {
            alpha: 1,
            onComplete: function() {
                self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn();
            }
        })) : (self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn());
    }
}), LoadScreen = AbstractScreen.extend({
    init: function(label) {
        this._super(label), this.isLoaded = !1, APP.labelDebug.visible = !1;
    },
    destroy: function() {
        this._super();
    },
    build: function() {
        this._super();
        var assetsToLoader = [ "dist/img/atlas.json" ];
        if (assetsToLoader.length > 0 && !this.isLoaded) {
            this.loader = new PIXI.AssetLoader(assetsToLoader), this.loaderContainer = new PIXI.DisplayObjectContainer(), 
            this.addChild(this.loaderContainer), this.frontShape && this.frontShape.parent.removeChild(this.frontShape), 
            frontShape = new PIXI.Graphics(), frontShape.beginFill(16553437), frontShape.drawRect(0, 0, windowWidth, windowHeight), 
            this.loaderContainer.addChild(frontShape);
            var barHeight = 20;
            this.bulletBar = new LifeBarHUD(.6 * windowWidth, barHeight, 0, 16727717, 16474302), 
            this.loaderContainer.addChild(this.bulletBar.getContent()), this.bulletBar.getContent().position.x = windowWidth / 2 - this.bulletBar.getContent().width / 2, 
            this.bulletBar.getContent().position.y = windowHeight - this.bulletBar.getContent().height - .1 * windowHeight, 
            this.bulletBar.updateBar(0, 100), this.initLoad();
        } else this.onAssetsLoaded();
        this.updateable = !0;
    },
    update: function() {
        !this.isLoaded && this.ready && (this.initApplication(), APP.labelDebug.visible = !1), 
        this.updateable && this.labelLoader && (this.blinkAccum--, this.blinkAccum <= 0 && (this.labelLoader.alpha = this.labelLoader.alpha ? 0 : 1, 
        this.blinkAccum = 20 + 10 * this.labelLoader.alpha));
    },
    onProgress: function() {
        this._super(), this.bulletBar.updateBar(Math.floor(100 * this.loadPercent), 100);
    },
    onAssetsLoaded: function() {
        this.ready = !0;
    },
    initApplication: function() {
        this.isLoaded = !0, this.blinkAccum = 40, this.labelLoader = new PIXI.Text("", {
            align: "center",
            font: "20px roboto",
            fill: "#000",
            wordWrap: !0,
            wordWrapWidth: 600
        }), this.loaderContainer.addChild(this.labelLoader), this.labelLoader.setText("Toque para continuar"), 
        scaleConverter(this.labelLoader.width, windowWidth, .3, this.labelLoader), this.labelLoader.position.x = windowWidth / 2 - this.labelLoader.width / 2, 
        this.labelLoader.position.y = this.bulletBar.getContent().position.y + this.bulletBar.getContent().height / 2 - this.labelLoader.height / 2, 
        TweenLite.to(this.bulletBar.getContent(), .5, {
            alpha: 0
        });
        var self = this;
        this.fullscreenButton = new DefaultButton("bg.jpg", "bg.jpg"), this.fullscreenButton.build(windowWidth, windowHeight), 
        this.fullscreenButton.setPosition(windowWidth - this.fullscreenButton.getContent().width - 20, windowHeight - this.fullscreenButton.getContent().height - 20), 
        this.addChild(this.fullscreenButton), this.fullscreenButton.getContent().alpha = 0, 
        this.fullscreenButton.clickCallback = function() {
            testMobile() && fullscreen(), self.updateable = !1;
            var endTimeline = new TimelineLite({
                onComplete: function() {
                    self.screenManager.change("Init");
                }
            });
            endTimeline.append(TweenLite.to(self.labelLoader, .2, {
                alpha: 0
            })), endTimeline.append(TweenLite.to(self.bulletBar.getContent(), .2, {
                alpha: 0
            }));
        };
    },
    transitionIn: function() {
        return this.isLoaded ? (this.frontShape = new PIXI.Graphics(), this.frontShape.beginFill(16553437), 
        this.frontShape.drawRect(0, 0, windowWidth, windowHeight), this.addChild(this.frontShape), 
        void this.build()) : void this.build();
    },
    transitionOut: function(nextScreen, container) {
        console.log("transitionOut");
        var self = this;
        this.frontShape ? (this.frontShape.parent.setChildIndex(this.frontShape, this.frontShape.parent.children.length - 1), 
        TweenLite.to(this.frontShape, .3, {
            alpha: 1,
            onComplete: function() {
                self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn();
            }
        })) : (self.destroy(), container.removeChild(self.getContent()), nextScreen.transitionIn());
    }
}), CreditsModal = Class.extend({
    init: function(screen) {
        this.screen = screen, this.container = new PIXI.DisplayObjectContainer();
        var self = this;
        this.container.buttonMode = !0, this.container.interactive = !0, this.container.mousedown = this.container.touchstart = function() {
            self.hide();
        };
        var credits = new SimpleSprite("dist/img/UI/creditos.jpg");
        this.container.addChild(credits.getContent()), scaleConverter(credits.getContent().height, windowHeight, 1, credits), 
        credits.getContent().position.x = windowWidth / 2 - credits.getContent().width / 2, 
        credits.getContent().position.y = windowHeight / 2 - credits.getContent().height / 2;
    },
    show: function() {
        this.screen.addChild(this), this.container.parent.setChildIndex(this.container, this.container.parent.children.length - 1);
        var self = this;
        this.screen.updateable = !1, this.container.alpha = 0, TweenLite.to(this.container, .5, {
            alpha: 1,
            onComplete: function() {
                self.container.buttonMode = !0, self.container.interactive = !0;
            }
        }), this.container.buttonMode = !1, this.container.interactive = !1;
    },
    hide: function(callback) {
        var self = this;
        this.container.buttonMode = !1, this.container.interactive = !1, TweenLite.to(this.container, .5, {
            alpha: 0,
            onComplete: function() {
                callback && (callback(), self.container.parent && self.container.parent.removeChild(self.container));
            }
        });
    },
    getContent: function() {
        return this.container;
    }
}), EndModal = Class.extend({
    init: function(screen) {
        this.screen = screen, this.container = new PIXI.DisplayObjectContainer(), this.boxContainer = new PIXI.DisplayObjectContainer(), 
        this.bg = new PIXI.Graphics(), this.bg.beginFill(74275), this.bg.drawRect(0, 0, windowWidth, windowHeight), 
        this.bg.alpha = 0, this.container.addChild(this.bg);
        var self = this;
        this.backShape = new PIXI.Graphics(), this.backShape.beginFill(74275), this.backShape.drawEllipse(windowWidth / 3, 1.2 * windowHeight, windowWidth / 3, 1.2 * windowHeight), 
        this.backShape.alpha = .5, this.container.addChild(this.backShape), this.feito = new SimpleSprite("feitoo.png"), 
        this.container.addChild(this.boxContainer), this.container.addChild(this.feito.getContent()), 
        scaleConverter(this.feito.getContent().width, windowWidth, .35, this.feito), this.feito.setPosition(windowWidth / 2 - this.feito.getContent().width / 2, -10), 
        this.backShape.position.x = windowWidth / 2 - this.backShape.width / 2, this.backShape.position.y = windowHeight / 2 - this.backShape.height / 2, 
        this.backButton = new DefaultButton("menuButton.png", "menuButtonOver.png"), this.backButton.build(), 
        this.backButton.setPosition(0, 0), this.boxContainer.addChild(this.backButton.getContent()), 
        this.backButton.clickCallback = function() {
            self.hide(function() {
                self.screen.screenManager.prevScreen();
            });
        }, this.trofeuButton = new DefaultButton("trofeuButton.png", "trofeuButtonOver.png"), 
        this.trofeuButton.build(), this.trofeuButton.setPosition(this.backButton.getContent().position.x + this.backButton.getContent().width + 10, 0), 
        this.boxContainer.addChild(this.trofeuButton.getContent()), this.trofeuButton.clickCallback = function() {}, 
        this.exitButton = new DefaultButton("replayButton.png", "replayButtonOver.png"), 
        this.exitButton.build(), this.exitButton.setPosition(this.trofeuButton.getContent().position.x + this.exitButton.getContent().width + 10, 0), 
        this.boxContainer.addChild(this.exitButton.getContent()), this.exitButton.clickCallback = function() {
            self.hide(function() {
                self.screen.updateable = !0, self.screen.reset();
            });
        }, this.boxContainer.addChild(this.exitButton.getContent()), this.boxContainer.alpha = 0, 
        this.boxContainer.visible = !1, scaleConverter(this.boxContainer.height, windowHeight, .18, this.boxContainer), 
        this.boxContainer.position.x = windowWidth / 2 - this.boxContainer.width / 2, this.boxContainer.position.y = windowHeight, 
        this.contents = new PIXI.DisplayObjectContainer(), this.icons = new PIXI.DisplayObjectContainer(), 
        this.coinIco = new SimpleSprite("moeda.png"), this.icons.addChild(this.coinIco.getContent()), 
        this.labelsArray = [ "MASCADA", "LOUVA-DEUS", "BOM JESUS", "CARPINEJAR", "ILUMINATI", "CAMIGOL" ], 
        shuffle(this.labelsArray), this.mascadaLabel = new PIXI.Text("TOTAL DE\n" + this.labelsArray[0] + "\n" + this.labelsArray[1], {
            align: "right",
            fill: "#FFFFFF",
            font: "30px Luckiest Guy",
            wordWrap: !0,
            wordWrapWidth: 300
        }), this.coinIco.setPosition(this.mascadaLabel.width - this.coinIco.getContent().width + 5, 0), 
        this.mascadaLabel.position.y = this.coinIco.getContent().position.y + this.coinIco.getContent().height + 30, 
        this.icons.addChild(this.mascadaLabel), this.contents.addChild(this.icons), this.labels = new PIXI.DisplayObjectContainer(), 
        this.currentCoin = new PIXI.Text(0, {
            align: "center",
            fill: "#FFFFFF",
            font: "40px Luckiest Guy",
            stroke: "#000",
            strokeThickness: 5,
            wordWrap: !0,
            wordWrapWidth: 300
        }), this.labels.addChild(this.currentCoin), this.totalCoin = new PIXI.Text(0, {
            align: "center",
            fill: "#FFCe00",
            font: "50px Luckiest Guy",
            stroke: "#000",
            strokeThickness: 5,
            wordWrap: !0,
            wordWrapWidth: 300
        }), this.labels.addChild(this.totalCoin), this.currentCoin.position.y = this.coinIco.getContent().position.y + this.coinIco.getContent().height / 2 - this.currentCoin.height / 2, 
        this.totalCoin.position.y = this.mascadaLabel.position.y + this.mascadaLabel.height / 2 - this.totalCoin.height / 2, 
        this.contents.addChild(this.labels), scaleConverter(this.contents.height, windowHeight, .4, this.contents), 
        this.labels.position.x = this.icons.x + this.icons.width + 20, this.contents.position.x = windowWidth / 2 - this.mascadaLabel.width * this.contents.scale.x, 
        this.contents.position.y = windowHeight / 2 - this.contents.height / 2, this.container.addChild(this.contents), 
        this.novoRecruta = new SimpleSprite("novoRecrutaSelo.png"), this.container.addChild(this.novoRecruta.getContent()), 
        scaleConverter(this.novoRecruta.getContent().height, windowHeight, .3, this.novoRecruta), 
        this.novoRecruta.getContent().position.x = this.boxContainer.position.x - this.novoRecruta.getContent().width / 1.5, 
        this.novoRecruta.getContent().position.y = windowHeight - this.boxContainer.height - 20 - this.novoRecruta.getContent().height / 1.3, 
        this.novoRecruta.getContent().alpha = 0, this.contents.alpha = 0, this.contents.visible = !1;
    },
    show: function(newPlayers) {
        if (this.screen.blockPause = !0, newPlayers || (newPlayers = [ APP.getGameModel().playerModels[Math.floor(Math.random() * APP.getGameModel().playerModels.length)] ]), 
        this.currentCoin.setText(APP.getGameModel().currentPoints), this.totalCoin.setText(APP.getGameModel().totalPoints), 
        newPlayers && newPlayers.length > 0) {
            var self = this;
            this.newCharContainer = new PIXI.DisplayObjectContainer(), this.degrade = new SimpleSprite("dist/img/UI/fundo_degrade.png"), 
            this.container.addChild(this.degrade.getContent()), this.degrade.getContent().width = windowWidth / 1.5;
            var sH = scaleConverter(this.degrade.getContent().height, windowHeight, 1);
            this.degrade.getContent().scale.y = sH, this.degrade.getContent().height = windowHeight, 
            this.degrade.setPosition(windowWidth / 2 - this.degrade.getContent().width / 2, windowHeight / 2 - this.degrade.getContent().height / 2);
            var pista = new SimpleSprite("pista.png"), holofote = new SimpleSprite("holofote.png"), novo = new SimpleSprite("novorecruta.png"), playerImage = null;
            playerImage = new SimpleSprite(windowHeight > 450 ? newPlayers[0].imgSource : newPlayers[0].imgSourceGame), 
            this.newCharContainer.addChild(pista.getContent()), pista.setPosition(0, holofote.getContent().height - 35), 
            this.newCharContainer.addChild(holofote.getContent()), this.newCharContainer.addChild(playerImage.getContent()), 
            this.newCharContainer.addChild(novo.getContent()), holofote.setPosition(pista.getContent().width / 2 - holofote.getContent().width / 2, 0);
            var charLabel = new SimpleSprite(newPlayers[0].labelSource);
            this.newCharContainer.addChild(charLabel.getContent()), this.container.addChild(this.newCharContainer), 
            scaleConverter(charLabel.getContent().height, pista.getContent().height, .5, charLabel), 
            charLabel.getContent().position.x = pista.getContent().width / 2 - charLabel.getContent().width / 2, 
            charLabel.getContent().position.y = pista.getContent().position.y + pista.getContent().height - charLabel.getContent().height - 20, 
            novo.setPosition(pista.getContent().width / 2 - novo.getContent().width / 2, charLabel.getContent().position.y - novo.getContent().height - 20), 
            scaleConverter(playerImage.getContent().height, this.newCharContainer.height, .3, playerImage), 
            playerImage.setPosition(pista.getContent().width / 2 - playerImage.getContent().width / 2, pista.getContent().position.y - playerImage.getContent().height - 10), 
            scaleConverter(this.newCharContainer.height, windowHeight, 1, this.newCharContainer), 
            this.newCharContainer.position.x = windowWidth / 2 - this.newCharContainer.width / 2, 
            this.feito.getContent().parent.setChildIndex(this.feito.getContent(), this.feito.getContent().parent.children.length - 1), 
            setTimeout(function() {
                self.container.buttonMode = !0, self.container.interactive = !0, self.container.mousedown = self.container.touchstart = function() {
                    self.showPoints(!0);
                };
            }, 2e3);
        } else this.showPoints();
        this.screen.addChild(this), this.screen.updateable = !1, TweenLite.to(this.bg, .5, {
            alpha: .8
        }), this.container.parent.setChildIndex(this.container, this.container.parent.children.length - 1);
    },
    showPoints: function(hasNew) {
        this.newCharContainer && (TweenLite.to(this.newCharContainer, .5, {
            alpha: 0
        }), this.container.interactive = !1, this.container.buttonMode = !1, this.degrade && this.degrade.getContent().parent.removeChild(this.degrade.getContent())), 
        hasNew && (TweenLite.from(this.novoRecruta.getContent().scale, .8, {
            delay: .8,
            y: .2,
            x: .2,
            ease: "easeOutElastic"
        }), TweenLite.to(this.novoRecruta.getContent(), .2, {
            delay: .8,
            alpha: 1
        })), APP.getGameModel().sendStats(), this.boxContainer.visible = !0, this.contents.visible = !0, 
        TweenLite.to(this.boxContainer.position, 1, {
            y: windowHeight - this.boxContainer.height - 20,
            ease: "easeOutBack"
        }), TweenLite.to(this.boxContainer, .5, {
            alpha: 1
        }), TweenLite.to(this.contents, .5, {
            alpha: 1
        });
    },
    hide: function(callback) {
        this.screen.blockPause = !1;
        var self = this;
        TweenLite.to(this.bg, .5, {
            alpha: 0,
            onComplete: function() {
                callback && (callback(), self.container.parent && self.container.parent.removeChild(self.container));
            }
        }), TweenLite.to(this.boxContainer.position, 1, {
            y: -this.boxContainer.height,
            ease: "easeInBack"
        }), TweenLite.to(this.boxContainer, .5, {
            alpha: 0
        }), TweenLite.to(this.container, .5, {
            alpha: 0
        });
    },
    getContent: function() {
        return this.container;
    }
}), NewBirdModal = Class.extend({
    init: function(screen) {
        this.screen = screen, this.container = new PIXI.DisplayObjectContainer(), this.boxContainer = new PIXI.DisplayObjectContainer(), 
        this.bg = new PIXI.Graphics(), this.bg.beginFill(74275), this.bg.drawRect(0, 0, windowWidth, windowHeight), 
        this.bg.alpha = 0, this.container.addChild(this.bg), this.container.addChild(this.boxContainer);
        this.feito = new SimpleSprite("feitoo.png"), this.container.addChild(this.feito.getContent()), 
        scaleConverter(this.feito.getContent().width, windowWidth, .35, this.feito), this.feito.setPosition(windowWidth / 2 - this.feito.getContent().width / 2, -10), 
        this.boxContainer.alpha = 0, this.boxContainer.visible = !1, scaleConverter(this.boxContainer.height, windowHeight, .18, this.boxContainer), 
        this.boxContainer.position.x = windowWidth / 2 - this.boxContainer.width / 2, this.boxContainer.position.y = windowHeight;
    },
    show: function(bird) {
        if (bird || (bird = [ APP.getGameModel().birdModels[Math.floor(Math.random() * APP.getGameModel().birdModels.length)] ]), 
        bird && bird.length > 0) {
            var self = this;
            this.newCharContainer = new PIXI.DisplayObjectContainer();
            var pista = new SimpleSprite("pista.png"), holofote = new SimpleSprite("holofote.png"), novo = new SimpleSprite("nova_ave.png"), ovoquebrado = new SimpleSprite("ovoquebrado.png"), penas1 = new SimpleSprite("penasfundo1.png"), penas2 = new SimpleSprite("penasfundo2.png");
            this.playerImage = null, this.playerImage = new SimpleSprite(bird[0].cover);
            var degrade = new SimpleSprite("dist/img/UI/fundo_degrade.png");
            this.container.addChild(degrade.getContent()), degrade.getContent().width = windowWidth / 1.5;
            var sH = scaleConverter(degrade.getContent().height, windowHeight, 1);
            degrade.getContent().scale.y = sH, degrade.getContent().height = windowHeight, degrade.setPosition(windowWidth / 2 - degrade.getContent().width / 2, windowHeight / 2 - degrade.getContent().height / 2), 
            this.newCharContainer.addChild(pista.getContent()), pista.setPosition(0, holofote.getContent().height - 35), 
            this.newCharContainer.addChild(holofote.getContent()), this.newCharContainer.addChild(ovoquebrado.getContent()), 
            this.newCharContainer.addChild(penas1.getContent()), this.newCharContainer.addChild(penas2.getContent()), 
            this.container.addChild(this.playerImage.getContent()), this.newCharContainer.addChild(novo.getContent()), 
            holofote.setPosition(pista.getContent().width / 2 - holofote.getContent().width / 2, 0);
            var charLabel = new PIXI.Text(bird[0].label, {
                align: "center",
                fill: "#FFFFFF",
                stroke: "#033E43",
                strokeThickness: 5,
                font: "30px Luckiest Guy",
                wordWrap: !0,
                wordWrapWidth: 500
            });
            this.newCharContainer.addChild(charLabel), this.container.addChild(this.newCharContainer), 
            charLabel.position.x = pista.getContent().width / 2 - charLabel.width / 2, charLabel.position.y = pista.getContent().position.y + pista.getContent().height - charLabel.height - 20, 
            novo.setPosition(pista.getContent().width / 2 - novo.getContent().width / 2, charLabel.position.y - novo.getContent().height - 20), 
            scaleConverter(ovoquebrado.getContent().height, this.newCharContainer.height, .15, ovoquebrado), 
            scaleConverter(penas1.getContent().height, this.newCharContainer.height, .2, penas1), 
            scaleConverter(penas2.getContent().height, this.newCharContainer.height, .2, penas2), 
            penas1.setPosition(pista.getContent().width / 2 - 2 * penas1.getContent().width, holofote.getContent().height - penas1.getContent().height), 
            penas2.setPosition(pista.getContent().width / 2 + penas1.getContent().width, holofote.getContent().height - penas2.getContent().height), 
            ovoquebrado.setPosition(pista.getContent().width / 2 - ovoquebrado.getContent().width / 2, holofote.getContent().height - ovoquebrado.getContent().height), 
            scaleConverter(this.newCharContainer.height, windowHeight, 1, this.newCharContainer), 
            this.playerImage.setPosition(windowWidth / 2 - this.playerImage.getContent().width / 2, windowHeight / 2 - this.playerImage.getContent().height / 2 - 20), 
            this.newCharContainer.position.x = windowWidth / 2 - this.newCharContainer.width / 2, 
            this.feito.getContent().parent.setChildIndex(this.feito.getContent(), this.feito.getContent().parent.children.length - 1), 
            setTimeout(function() {
                self.container.buttonMode = !0, self.container.interactive = !0, self.container.mousedown = self.container.touchstart = function() {
                    self.hide(function() {
                        self.screen.updateable = !0;
                    });
                };
            }, 2e3);
        }
        this.screen.addChild(this), this.screen.updateable = !1, TweenLite.to(this.bg, .5, {
            alpha: .8
        }), this.container.parent.setChildIndex(this.container, this.container.parent.children.length - 1), 
        this.playerImage.getContent().parent.setChildIndex(this.playerImage.getContent(), this.playerImage.getContent().parent.children.length - 1);
    },
    hide: function(callback) {
        var self = this;
        TweenLite.to(this.bg, .5, {
            alpha: 0,
            onComplete: function() {
                callback && (callback(), self.container.parent && self.container.parent.removeChild(self.container));
            }
        }), TweenLite.to(this.boxContainer.position, 1, {
            y: -this.boxContainer.height,
            ease: "easeInBack"
        }), TweenLite.to(this.boxContainer, .5, {
            alpha: 0
        }), TweenLite.to(this.container, .5, {
            alpha: 0
        });
    },
    getContent: function() {
        return this.container;
    }
}), PauseModal = Class.extend({
    init: function(screen) {
        this.screen = screen, this.container = new PIXI.DisplayObjectContainer(), this.boxContainer = new PIXI.DisplayObjectContainer(), 
        this.bg = new PIXI.Graphics(), this.bg.beginFill(74275), this.bg.drawRect(0, 0, windowWidth, windowHeight), 
        this.bg.alpha = 0, this.container.addChild(this.bg), this.container.addChild(this.boxContainer);
        var self = this;
        this.backButton = new DefaultButton("voltarButton.png", "voltarButtonOver.png"), 
        this.backButton.build(), this.backButton.setPosition(0, 0), this.backButton.clickCallback = function() {
            self.hide(function() {
                self.screen.screenManager.prevScreen();
            });
        }, this.boxContainer.addChild(this.backButton.getContent()), this.continueButton = new DefaultButton("continueButtonBig.png", "continueButtonBigOver.png"), 
        this.continueButton.build(), this.continueButton.setPosition(this.backButton.getContent().width + 20, -this.continueButton.getContent().height / 2 + this.backButton.getContent().height / 2), 
        this.continueButton.clickCallback = function() {
            self.hide(function() {
                self.screen.updateable = !0;
            });
        }, this.boxContainer.addChild(this.continueButton.getContent()), this.restartButton = new DefaultButton("replayButton.png", "replayButtonOver.png"), 
        this.restartButton.build(), this.restartButton.setPosition(this.continueButton.getContent().width + this.continueButton.getContent().position.x + 20, 0), 
        this.restartButton.clickCallback = function() {
            self.hide(function() {
                self.screen.updateable = !0, self.screen.reset();
            });
        }, this.boxContainer.addChild(this.restartButton.getContent()), this.audioOn = new DefaultButton("volumeButton_on.png", "volumeButton_on_over.png"), 
        this.audioOn.build(), scaleConverter(this.audioOn.height, windowHeight, .15, this.audioOn), 
        this.audioOn.setPosition(20, 20), this.audioOff = new DefaultButton("volumeButton_off.png", "volumeButton_off_over.png"), 
        this.audioOff.build(), scaleConverter(this.audioOff.height, windowHeight, .15, this.audioOff), 
        this.audioOff.setPosition(20, 20), console.log(APP.mute), this.container.addChild(APP.mute ? this.audioOff.getContent() : this.audioOn.getContent()), 
        this.audioOn.clickCallback = function() {
            APP.mute = !0, Howler.mute(), self.audioOn.getContent().parent && self.audioOn.getContent().parent.removeChild(self.audioOn.getContent()), 
            self.audioOff.getContent() && self.container.addChild(self.audioOff.getContent());
        }, this.audioOff.clickCallback = function() {
            APP.mute = !1, Howler.unmute(), self.audioOff.getContent().parent && self.audioOff.getContent().parent.removeChild(self.audioOff.getContent()), 
            self.audioOn.getContent() && self.container.addChild(self.audioOn.getContent());
        }, this.boxContainer.alpha = 0, this.boxContainer.visible = !1, scaleConverter(this.boxContainer.width, windowWidth, .5, this.boxContainer), 
        this.boxContainer.position.x = windowWidth / 2 - this.boxContainer.width / 2;
    },
    show: function() {
        this.screen.addChild(this), this.screen.blockPause = !0, this.boxContainer.visible = !0, 
        this.container.parent.setChildIndex(this.container, this.container.parent.children.length - 1), 
        this.container.alpha = 0, this.screen.updateable = !1, TweenLite.to(this.bg, .5, {
            alpha: .8
        }), TweenLite.to(this.boxContainer.position, 1, {
            y: windowHeight / 2 - this.boxContainer.height / 2 - this.continueButton.getContent().position.y,
            ease: "easeOutBack"
        }), TweenLite.to(this.boxContainer, .5, {
            alpha: 1
        }), TweenLite.to(this.container, .5, {
            alpha: 1
        });
    },
    hide: function(callback) {
        var self = this;
        this.screen.blockPause = !1, TweenLite.to(this.bg, .5, {
            alpha: 0,
            onComplete: function() {
                callback && (callback(), self.container.parent && self.container.parent.removeChild(self.container));
            }
        }), TweenLite.to(this.boxContainer.position, 1, {
            y: -this.boxContainer.height,
            ease: "easeInBack"
        }), TweenLite.to(this.boxContainer, .5, {
            alpha: 0
        }), TweenLite.to(this.container, .5, {
            alpha: 0
        });
    },
    getContent: function() {
        return this.container;
    }
}), RankinkgModal = Class.extend({
    init: function(screen) {
        this.screen = screen, this.container = new PIXI.DisplayObjectContainer();
        var self = this;
        this.container.buttonMode = !0, this.container.interactive = !0, this.container.mousedown = this.container.touchstart = function() {
            self.hide();
        };
        var credits = new SimpleSprite("dist/img/UI/creditos.jpg");
        this.container.addChild(credits.getContent()), scaleConverter(credits.getContent().height, windowHeight, 1, credits), 
        credits.getContent().position.x = windowWidth / 2 - credits.getContent().width / 2, 
        credits.getContent().position.y = windowHeight / 2 - credits.getContent().height / 2;
    },
    show: function() {
        this.screen.addChild(this), this.container.parent.setChildIndex(this.container, this.container.parent.children.length - 1);
        var self = this;
        this.screen.updateable = !1, this.container.alpha = 0, TweenLite.to(this.container, .5, {
            alpha: 1,
            onComplete: function() {
                self.container.buttonMode = !0, self.container.interactive = !0;
            }
        }), this.container.buttonMode = !1, this.container.interactive = !1;
    },
    hide: function(callback) {
        var self = this;
        this.container.buttonMode = !1, this.container.interactive = !1, TweenLite.to(this.container, .5, {
            alpha: 0,
            onComplete: function() {
                callback && (callback(), self.container.parent && self.container.parent.removeChild(self.container));
            }
        });
    },
    getContent: function() {
        return this.container;
    }
}), InputManager = Class.extend({
    init: function(parent) {
        var game = parent, self = this;
        this.vecPositions = [], document.body.addEventListener("mouseup", function() {
            game.player && (game.mouseDown = !1);
        }), document.body.addEventListener("mousedown", function() {
            game.player && APP.getMousePos().x < windowWidth && APP.getMousePos().y < windowHeight - 70 && (game.mouseDown = !0);
        }), document.body.addEventListener("keyup", function(e) {
            if (game.player) {
                if (87 === e.keyCode || 38 === e.keyCode && game.player.velocity.y < 0) self.removePosition("up"); else if (83 === e.keyCode || 40 === e.keyCode && game.player.velocity.y > 0) self.removePosition("down"); else if (65 === e.keyCode || 37 === e.keyCode && game.player.velocity.x < 0) self.removePosition("left"); else if (68 === e.keyCode || 39 === e.keyCode && game.player.velocity.x > 0) self.removePosition("right"); else if (32 === e.keyCode) game.player.hurt(5); else if (49 === e.keyCode || 50 === e.keyCode || 51 === e.keyCode || 52 === e.keyCode || 81 === e.keyCode || 69 === e.keyCode) {
                    var id = 1;
                    50 === e.keyCode ? id = 2 : 51 === e.keyCode ? id = 3 : 52 === e.keyCode && (id = 4), 
                    game.useShortcut(id - 1);
                }
                game.player.updatePlayerVel(self.vecPositions);
            }
        }), document.body.addEventListener("keydown", function(e) {
            game.player && (87 === e.keyCode || 38 === e.keyCode ? (self.removePosition("down"), 
            self.addPosition("up")) : 83 === e.keyCode || 40 === e.keyCode ? (self.removePosition("up"), 
            self.addPosition("down")) : 65 === e.keyCode || 37 === e.keyCode ? (self.removePosition("right"), 
            self.addPosition("left")) : (68 === e.keyCode || 39 === e.keyCode) && (self.removePosition("left"), 
            self.addPosition("right")), game.player.updatePlayerVel(self.vecPositions));
        });
    },
    removePosition: function(position) {
        for (var i = this.vecPositions.length - 1; i >= 0; i--) this.vecPositions[i] === position && this.vecPositions.splice(i, 1);
    },
    addPosition: function(position) {
        for (var exists = !1, i = this.vecPositions.length - 1; i >= 0; i--) this.vecPositions[i] === position && (exists = !0);
        exists || this.vecPositions.push(position);
    }
}), CookieManager = Class.extend({
    init: function() {},
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + 24 * exdays * 60 * 60 * 1e3);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    getCookie: function(name) {
        return (name = new RegExp("(?:^|;\\s*)" + ("" + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)").exec(document.cookie)) && name[1];
    }
}), Environment = Class.extend({
    init: function(maxWidth, maxHeight) {
        this.velocity = {
            x: 0,
            y: 0
        }, this.texture = "", this.sprite = "", this.container = new PIXI.DisplayObjectContainer(), 
        this.updateable = !0, this.arraySprt = [], this.maxWidth = maxWidth, this.maxHeight = maxHeight, 
        this.texWidth = 0, this.spacing = 0, this.totTiles = 0, this.currentSprId = 0;
    },
    build: function(imgs, spacing) {
        this.arraySprt = imgs, spacing && (this.spacing = spacing);
        for (var i = Math.floor(this.arraySprt.length * Math.random()); i < this.arraySprt.length && !(this.container.width > this.maxWidth); i++) this.currentSprId = i, 
        this.addEnv();
    },
    addEnv: function() {
        this.sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(this.arraySprt[this.currentSprId])), 
        this.sprite.cacheAsBitmap = !0;
        var last = this.container.children[this.container.children.length - 1];
        last && (this.sprite.position.x = last.position.x + last.width - 2), this.sprite.position.y = this.maxHeight - this.sprite.height, 
        this.container.addChild(this.sprite);
    },
    update: function() {
        if (this.container.children) {
            for (var i = this.container.children.length - 1; i >= 0; i--) this.container.children[i].position.x + this.container.children[i].width < 0 && this.container.removeChild(this.container.children[i]), 
            this.container.children[i].position.x += this.velocity.x;
            var last = this.container.children[this.container.children.length - 1];
            last.position.x + last.width - 20 < this.maxWidth && (this.currentSprId++, this.currentSprId >= this.arraySprt.length && (this.currentSprId = 0), 
            this.addEnv());
        }
    },
    getContent: function() {
        return this.container;
    }
}), Paralax = Class.extend({
    init: function(maxWidth) {
        this.velocity = {
            x: 0,
            y: 0
        }, this.texture = "", this.sprite = "", this.container = new PIXI.DisplayObjectContainer(), 
        this.updateable = !0, this.arraySprt = [], this.maxWidth = maxWidth, this.texWidth = 0, 
        this.spacing = 0, this.totTiles = 0;
    },
    build: function(img, spacing) {
        spacing && (this.spacing = spacing), this.texture = PIXI.Texture.fromFrame(img), 
        this.texWidth = this.texture.width, this.totTiles = Math.ceil(this.maxWidth / this.texWidth) + 1;
        for (var i = 0; i < this.totTiles; i++) this.sprite = new PIXI.Sprite(this.texture), 
        this.sprite.position.x = (this.texWidth + this.spacing) * i, this.container.addChild(this.sprite);
        console.log("this");
    },
    update: function() {
        Math.abs(this.container.position.x + this.velocity.x) >= this.texWidth + this.totTiles * this.spacing ? this.container.position.x = 0 : this.container.position.x += this.velocity.x, 
        this.container.position.y += this.velocity.y;
    },
    getContent: function() {
        return this.container;
    }
}), Particles = Entity.extend({
    init: function(vel, timeLive, source, rotation) {
        this._super(!0), this.updateable = !1, this.colidable = !1, this.deading = !1, this.range = 40, 
        this.width = 1, this.height = 1, this.type = "fire", this.target = "enemy", this.fireType = "physical", 
        this.node = null, this.velocity.x = vel.x, this.velocity.y = vel.y, this.timeLive = timeLive, 
        this.power = 1, this.defaultVelocity = 1, this.imgSource = source, this.alphadecress = .03, 
        this.scaledecress = .03, this.gravity = 0, rotation && (this.rotation = rotation);
    },
    build: function() {
        this.updateable = !0, this.sprite = this.imgSource instanceof PIXI.Text ? this.imgSource : new PIXI.Sprite.fromFrame(this.imgSource), 
        this.sprite.anchor.x = .5, this.sprite.anchor.y = .5, this.sprite.alpha = 1, this.sprite.scale.x = .2, 
        this.sprite.scale.y = .2, this.getContent().rotation = this.rotation;
    },
    update: function() {
        this._super(), 0 !== this.gravity && (this.velocity.y += this.gravity), this.timeLive--, 
        this.timeLive <= 0 && this.preKill(), this.range = this.width, this.rotation && (this.getContent().rotation += this.rotation), 
        this.sprite.alpha > 0 && (this.sprite.alpha -= this.alphadecress, this.sprite.alpha <= 0 && this.preKill()), 
        this.sprite.scale.x >= 1 || (this.sprite.scale.x += this.scaledecress, this.sprite.scale.y += this.scaledecress);
    },
    preKill: function() {
        this.sprite.alpha = 0, this.updateable = !0, this.kill = !0;
    }
}), res = {
    x: 425,
    y: 600
}, resizeProportional = !0, windowWidth = res.x, windowHeight = res.y, realWindowWidth = res.x, realWindowHeight = res.y, gameScale = 1.3, windowWidthVar = window.innerHeight, windowHeightVar = window.innerWidth, gameView = document.getElementById("game");

console.log(gameView);

var ratio = 1, init = !1, renderer, APP, retina = 1, initialize = function() {
    PIXI.BaseTexture.SCALE_MODE = PIXI.scaleModes.NEAREST, requestAnimFrame(update);
}, isfull = !1;

!function() {
    var App = {
        init: function() {
            initialize();
        }
    };
    App.init();
}();