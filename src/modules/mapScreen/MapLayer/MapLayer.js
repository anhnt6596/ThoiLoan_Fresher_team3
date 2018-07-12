var mapLogicArray = mapLogicArray || [];
var objectRefs = objectRefs || [];

var contructionList = [
    {
        _id: '_01',
        name: 'BDH',
        level: 1,
        posX: 10,
        posY: 10,
        width: 2,
        height: 2,
    },
    {
        _id: '_02',
        name: 'TOW',
        posX: 19,
        posY: 19,
        width: 4,
        height: 4,
    }
];

var rootMapPos = {
    x: 2100,
    y: 560,
};

var MapLayer = cc.Layer.extend({
    _targetedObject: null,
    _isMovingBuilding: false,
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
        this.scale = 0.8;
    },
    initContructions: function(contructions) {
        var self = this;
        contructions.forEach(function(contruction) {
            var name = contruction.name;
            switch (name) {
                case 'TOW':
                    var townHall = new TownHall(contruction);
                    self.addChild(townHall);
                    objectRefs.push(townHall);
                    break;
                case 'BDH':
                    var builderHut = new BuilderHut(contruction);
                    self.addChild(builderHut);
                    objectRefs.push(builderHut);
                    break;
                default:
                    break;
            }
        });
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
        this.mapWidth = bg_bl.width + bg_br.width + 500;
        this.mapHeight = bg_bl.height + bg_tl.height + 500;
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
        var tp = touch.getLocation();
        var coorInMap = this.calculateCoor(tp);
        var mapPos = this.calculatePos(coorInMap);
        cc.log('x/y: ', mapPos.x + '/' + mapPos.y);

        this._isMovingObject = false;
        if (this.isTouchTargetedObject(mapPos)) { // nếu bấm vào nhà đc chọn thì hành động di chuyển là moving
            this._isMovingObject = true;
        }
        this._startTouch = tp; // lưu vị trí lúc bắt đầu bấm
        return true;
    },
    isTouchTargetedObject: function(mapPos) {
        if (this._targetedObject == null) return false;
        var isOnMap = mapPos.x >= 0 && mapPos.y >= 0 && mapPos.x <40 && mapPos.y < 40;
        var tempX = this._targetedObject.tempX;
        var tempY = this._targetedObject.tempY;
        var size = this._targetedObject.info.width;
        var isOnObject = mapPos.x >= tempX && mapPos.x <= tempX + size && mapPos.y >= tempY && mapPos.y <= tempY + size;
        return (isOnMap && isOnObject);
    },
    onTouchMoved: function(touch, event) {
        var tp = touch.getLocation();
        var coorInMap = this.calculateCoor(tp);
        var mapPos = this.calculatePos(coorInMap);
        if (this._isMovingObject) {
            this._targetedObject.moving(mapPos);
        } else {
            this.moveMap(touch);
        }
        return false;
    },
    onTouchEnded: function(touch, event) {
        var tp = touch.getLocation();
        var coorInMap = this.calculateCoor(tp);
        var mapPos = this.calculatePos(coorInMap);
        if (this._startTouch && this._startTouch.x == tp.x && this._startTouch.y == tp.y) { // nếu touch mà ko di chuyển
            this.targetObject(mapPos);
        }
        if (this._isMovingObject) {
            if (this._targetedObject.checkNewPosition(mapPos)) {
                this._targetedObject.updatePosition(mapPos);
                this.updateContructionList(this._targetedObject.info);
                this.createLogicArray(contructionList, {});
            } else {
                // this._targetedObject.returnLastPosition();
            }
            // this._isMovingObject = false;
        }
        this._startTouch = null;
    },
    updateContructionList: function(info) {
        var newContructionList = contructionList.map(function(info) {
            if (contruction._id == info._id) {
                contruction.posX = info.posX;
                contruction.posY = info.posY;
            }
        });
    },
    targetObject: function(mapPos) {
        var self = this;
        mapPos.x < 40 && mapPos.x >= 0 && mapPos.y < 40 && mapPos.y >= 0 && (function() {
            var target_id = mapLogicArray[mapPos.x][mapPos.y];
            cc.log('>>>>>', target_id);
            cc.log(objectRefs);
            for(var i = 0; i < objectRefs.length; i+=1) {
                if (objectRefs[i].info && objectRefs[i].info._id && objectRefs[i].info._id == target_id) {
                    var newTarget = objectRefs[i];
                    if (newTarget === self._targetedObject) {
                        break; // nếu chọn object cũ thì thôi
                    } else {    // chọn object mới thì remove object cũ, target object mới và đặt zOrder cao.
                        self._targetedObject && self._targetedObject.removeTarget();
                        self._targetedObject = objectRefs[i];
                        self._targetedObject.onTarget();
                        self.reorderChild(self._targetedObject, 1000);
                        break;
                    }
                } else {
                    self._targetedObject && self._targetedObject.removeTarget(); // nếu bấm ra ngoài thì bỏ chọn
                    self._targetedObject = null;
                }
            }
        })();
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
    },
    calculatePos: function(coorInMap) {
        var coor = { x: 0, y: 0 };
        var x = coorInMap.x - rootMapPos.x;
        var y = coorInMap.y - rootMapPos.y;
        coor.x = parseInt(((y / (TILE_HEIGHT/2) - x / (TILE_WIDTH/2)) / 2).toFixed(0));
        coor.y = parseInt(((x / (TILE_WIDTH/2) + y / (TILE_HEIGHT/2)) / 2).toFixed(0));
        return coor;
    },
    calculateCoor: function(tp) {
        var result = { x: 0, y: 0 };
        result.x = (tp.x - this.x) / this.scale;
        result.y = (tp.y - this.y) / this.scale;
        return result;
    }
});
