var mapLogicArray = mapLogicArray || [];
var contructorRefs = contructorRefs || {};

var contructionList = {
    a110: {
        _id: '_01',
        name: 'BDH',
        posX: 0,
        posY: 0,
        width: 2,
        height: 2,
    },
    a111: {
        _id: '_02',
        name: 'BDH',
        posX: 20,
        posY: 20,
        width: 2,
        height: 2,
    },
    a112: {
        _id: '_03',
        name: 'GOL_2',
        posX: 10,
        posY: 20,
        width: 3,
        height: 3,
    },
    a113: {
        _id: '_04',
        name: 'GOL_2',
        posX: 13,
        posY: 20,
        width: 3,
        height: 3,
    },
    a114: {
        _id: '_05',
        name: 'GOL_2',
        posX: 16,
        posY: 20,
        width: 3,
        height: 3,
    },
    a115: {
        _id: '_06',
        name: 'GOL_2',
        posX: 30,
        posY: 20,
        width: 3,
        height: 3,
    },
    a116: {
        _id: '_07',
        name: 'GOL_2',
        posX: 22,
        posY: 30,
        width: 3,
        height: 3,
    },
    a117: {
        _id: '_08',
        name: 'GOL_2',
        posX: 26,
        posY: 20,
        width: 3,
        height: 3,
    },
    a118: {
        _id: '_09',
        name: 'GOL_2',
        posX: 29,
        posY: 0,
        width: 3,
        height: 3,
    },
    a119: {
        _id: '_10',
        name: 'GOL_2',
        posX: 31,
        posY: 31,
        width: 3,
        height: 3,
    },
};

var rootMapPos = {
    x: 2100,
    y: 2780,
};

var MapLayer = cc.Layer.extend({
    _targetedBuilding: null,
    _isMovingBuilding: false,
    mapWidth: 0,
    mapHeight: 0,
    ctor: function() {
        this._super();
        this.anchorX = 0;
        this.anchorY = 0;

        this.init();
        this.addTouchListener();
    },
    init: function() {
        this.initBackGround();
        this.initContructions(contructionList);
        // this.initImpediment(impedimentList);
        this.createLogicArray(contructionList, {});
        this.scale = 0.5;
    },
    initContructions: function(contructions) {
        var builderHut1 = new BuilderHut(contructionList.a111);
        this.addChild(builderHut1);
    },
    initImpediments: function(impediments) {

    },
    createLogicArray: function(contructions, impediments) {
        mapLogicArray = [];
        var i = 0;
        var j = 0;
        for (i = 0; i < 40; i++) {
            var row = [];
            for(j = 0; j < 40; j++) {
                row.push(0);
            }
            mapLogicArray.push(row);
        }
        for (contruction in contructions) {
            var _inRow = contructions[contruction].posX;
            var _inColumn = contructions[contruction].posY;
            var _size = contructions[contruction].width;
            for (var i = 0; i < _size; i++) {
                for (var j = 0; j < _size; j++) {
                    mapLogicArray[_inRow + i][_inColumn + j] = contructions[contruction]._id;
                }
            }
        }
    },
    initBackGround: function() {
        var bg_bl = new cc.Sprite(res.map.map_bl);
        bg_bl.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: 2,
        });
        this.addChild(bg_bl, 1);
        
        var bg_br = new cc.Sprite(res.map.map_br);
        bg_br.attr({
            anchorX: 0,
            anchorY: 0,
            x: bg_bl.width * 2 - 4,
            y: 0,
            scale: 2,
        });
        this.addChild(bg_br, 1);

        var bg_tl = new cc.Sprite(res.map.map_tl);
        bg_tl.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: bg_bl.height * 2 - 4,
            scale: 2,
        });
        this.addChild(bg_tl, 1);

        var bg_tr = new cc.Sprite(res.map.map_tr);
        bg_tr.attr({
            anchorX: 0,
            anchorY: 0,
            x: bg_bl.width * 2 - 4,
            y: bg_bl.height * 2 - 6,
            scale: 2,
        });
        this.addChild(bg_tr, 1);

        var mapBackground = new cc.TMXTiledMap(res.map.map_tmx);
        mapBackground.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: bg_bl.width * 2 - 10,
            y: bg_bl.height * 2 - 4,
            scale: 1,
        });
        this.addChild(mapBackground, 0);
        this.mapWidth = bg_bl.width + bg_br.width - 170;
        this.mapHeight = bg_bl.height + bg_tl.height + 300;
    },
    addTouchListener: function() {
        var self = this;
        if (self == null) return;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);
    },
    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {
        this.moveMap(touch);
    },
    onTouchEnded: function(touch, event) {

    },
    moveMap: function(touch) {
        if (this.prevTouchId !== touch.getID()) this.prevTouchId = touch.getID();
        else {
            var delta = touch.getDelta();
            var curPos = cc.p(this.x, this.y);
            curPos = cc.pAdd(curPos, delta);
            if (curPos.x > 0) curPos.x = 0;
            if (curPos.y > 0) curPos.y = 0;
            if (curPos.x < - this.mapWidth * this.scale) curPos.x = -this.mapWidth * this.scale;
            if (curPos.y < - this.mapHeight * this.scale) curPos.y = -this.mapHeight * this.scale;
            // curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p((cc.winSize.width - 3054), (cc.winSize.height - 2100)));
            this.x = curPos.x;
            this.y = curPos.y;
            curPos = null;
        }
    }
});
