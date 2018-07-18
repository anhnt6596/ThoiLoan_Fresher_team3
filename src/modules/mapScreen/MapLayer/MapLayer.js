var mapLogicArray = mapLogicArray || [];
var objectRefs = objectRefs || [];
var MAP = MAP || null;

//var contructionList1 = [
//    {
//        _id: '_01',
//        name: 'BDH_1',
//        level: 1,
//        posX: 10,
//        posY: 10,
//        width: 2,
//        height: 2,
//    },
//    {
//        _id: '_02',
//        name: 'TOW_1',
//        posX: 19,
//        posY: 19,
//        width: 4,
//        height: 4,
//        level: 5,
//    },
//    {
//        _id: '_03',
//        name: 'AMC_1',
//        posX: 0,
//        posY: 0,
//        width: 5,
//        height: 5,
//        level: 1,
//    },
//    {
//        _id: '_04',
//        name: 'BAR_1',
//        posX: 10,
//        posY: 5,
//        width: 3,
//        height: 3,
//        level: 2,
//    },
//    {
//        _id: '_05',
//        name: 'BAR_1',
//        posX: 5,
//        posY: 5,
//        width: 3,
//        height: 3,
//        level: 5,
//    },
//    {
//        _id: '_06',
//        name: 'STO_1',
//        posX: 5,
//        posY: 10,
//        width: 3,
//        height: 3,
//        level: 2,
//    },
//    {
//        _id: '_07',
//        name: 'STO_1',
//        posX: 5,
//        posY: 15,
//        width: 3,
//        height: 3,
//        level: 4,
//    },
//    {
//        _id: '_08',
//        name: 'STO_2',
//        posX: 5,
//        posY: 20,
//        width: 3,
//        height: 3,
//        level: 5,
//    },
//    {
//        _id: '_09',
//        name: 'STO_2',
//        posX: 5,
//        posY: 25,
//        width: 3,
//        height: 3,
//        level: 1,
//    },
//    {
//        _id: '_10',
//        name: 'RES_1',
//        posX: 5,
//        posY: 30,
//        width: 3,
//        height: 3,
//        level: 11,
//    },
//    {
//        _id: '_11',
//        name: 'RES_1',
//        posX: 10,
//        posY: 30,
//        width: 3,
//        height: 3,
//        level: 4,
//    },
//    {
//        _id: '_12',
//        name: 'RES_2',
//        posX: 15,
//        posY: 30,
//        width: 3,
//        height: 3,
//        level: 11,
//    },
//];



var contructionList = [
    {
        _id: '_01',
        name: 'BDH_1',
        level: 1,
        posX: 10,
        posY: 10,
        width: 2,
        height: 2,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_02',
        name: 'TOW_1',
        posX: 19,
        posY: 19,
        width: 4,
        height: 4,
        level: 5,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_03',
        name: 'AMC_1',
        posX: 0,
        posY: 0,
        width: 5,
        height: 5,
        level: 1,
        status: 'pending',
        startTime: 0
    },
    {
        _id: '_04',
        name: 'BAR_1',
        posX: 10,
        posY: 5,
        width: 3,
        height: 3,
        level: 2,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_05',
        name: 'BDH_1',
        posX: 5,
        posY: 5,
        width: 2,
        height: 2,
        level: 1,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_06',
        name: 'STO_1',
        posX: 5,
        posY: 10,
        width: 3,
        height: 3,
        level: 2,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_07',
        name: 'STO_1',
        posX: 5,
        posY: 15,
        width: 3,
        height: 3,
        level: 4,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_08',
        name: 'STO_2',
        posX: 5,
        posY: 20,
        width: 3,
        height: 3,
        level: 5,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_09',
        name: 'STO_2',
        posX: 5,
        posY: 25,
        width: 3,
        height: 3,
        level: 1,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_10',
        name: 'RES_1',
        posX: 5,
        posY: 30,
        width: 3,
        height: 3,
        level: 11,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_11',
        name: 'RES_1',
        posX: 10,
        posY: 30,
        width: 3,
        height: 3,
        level: 4,
        status: 'complete',
        startTime: 0
    },
    {
        _id: '_12',
        name: 'RES_2',
        posX: 15,
        posY: 30,
        width: 3,
        height: 3,
        level: 11,
        status: 'complete',
        startTime: 0
    },
];



var rootMapPos = {
    x: 2100,
    y: 560,
};

var MapLayer = cc.Layer.extend({
    _targetedObject: null,
    _isMovingBuilding: false,
    _isBuilding: false,
    ctor: function() {
        this._super();
        MAP = this;
        this.anchorX = 0;
        this.anchorY = 0;

        this.init();
        this.addTouchListener();
    },
    init: function() {
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/RES_1_effects/RES_1_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/RES_2_effects/RES_2_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/BAR_1_effects/BAR_1_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/armycam_1/armycam_1_effect.plist');
        this.initBackGround();
        this.initMovingTool();
        this.initContructions(contructionList);
        // this.initImpediment(impedimentList);
        this.createLogicArray(contructionList, {});
        this.scale = 0.8;
        this.x = - (this.mapWidth + cc.winSize.width) / 2;
        this.y = - (this.mapHeight + cc.winSize.height) / 2;
    },
    initContructions: function(contructions) {
        var self = this;
        contructions.forEach(function(contruction, i) {
            var newBuilding = self.createBuilding(contruction);
            newBuilding && objectRefs.push(newBuilding);
        });
    },
    initImpediments: function(impediments) {

    },
    initMovingTool: function() {
        this.arrows = [];
        this.greenBGs = [];
        this.redBGs = [];

        this.arrows[0] = null;
        this.greenBGs[0] = null;
        this.redBGs[0] = null;
        for (var i = 1; i <= 5; i++) {
            var arrowMoveRes = res.map.arrow_move[i];
            var arrow = new cc.Sprite(arrowMoveRes)
            arrow.attr({
                opacity: 0,
            });
            this.addChild(arrow, Z.ARROW_MOVE);
            this.arrows[i] = arrow;

            var greenBGres = res.map.green_bg[i];
            var greenBG = new cc.Sprite(greenBGres)
            greenBG.attr({
                scale: 2,
                opacity: 0,
            });
            this.addChild(greenBG, Z.GREEN_BG);
            this.greenBGs[i] = greenBG;

            var redBGres = res.map.red_bg[i];
            var redBG = new cc.Sprite(redBGres)
            redBG.attr({
                scale: 2,
                opacity: 0,
            });
            this.addChild(redBG, Z.RED_BG);
            this.redBGs[i] = redBG;
        }
        var cancelBtn = new ccui.Button('res/Art/GUIs/Action_Building_Icon/cancel.png');
        cancelBtn.attr({
            opacity: 0,
        });
        this.addChild(cancelBtn, 1000);
        this.cancelBtn = cancelBtn;

        var acceptBtn = new ccui.Button('res/Art/GUIs/Action_Building_Icon/accept.png');
        acceptBtn.attr({
            opacity: 0,
        });
        this.addChild(acceptBtn, 1000);
        this.acceptBtn = acceptBtn;
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
        this.addChild(bg_bl, Z.BACKGROUND);
        
        var bg_br = new cc.Sprite(res.map.map_br);
        bg_br.attr({
            anchorX: 0,
            anchorY: 0,
            x: bg_bl.width * 2 - 4,
            y: 0,
            scale: 2,
        });
        this.addChild(bg_br, Z.BACKGROUND);

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
        this.addChild(bg_tr, Z.BACKGROUND);

        var mapBackground = new cc.TMXTiledMap(res.map.map_tmx);
        mapBackground.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: bg_bl.width * 2 - 10,
            y: bg_bl.height * 2 - 4,
            scale: 1,
        });
        this.addChild(mapBackground, Z.TILEMAP);
        this.mapWidth = bg_bl.width + bg_br.width + 500;
        this.mapHeight = bg_bl.height + bg_tl.height + 800;
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
        var tempX = this._targetedObject.tempX;
        var tempY = this._targetedObject.tempY;
        var size = this._targetedObject.info.width;
        var isOnObject = mapPos.x >= tempX && mapPos.x <= tempX + size && mapPos.y >= tempY && mapPos.y <= tempY + size;
        return isOnObject;
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
        if (this._startTouch
            && Math.abs(this._startTouch.x - tp.x) < TILE_WIDTH / 2
            && Math.abs(this._startTouch.y - tp.y) < TILE_HEIGHT / 2
            && !this._isBuilding
        ) { // nếu touch mà ko di chuyển
            this.targetObject(mapPos);
        }
        if (this._isMovingObject) {
            if (this._targetedObject && this._targetedObject.checkNewPosition(mapPos)) {
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
        var newContructionList = contructionList.map(function(contruction) {
            var newContruction = contruction;
            if (newContruction._id == info._id) {
                newContruction.posX = info.posX;
                newContruction.posY = info.posY;
            }
            return newContruction;
        });
        contructionList = newContructionList;
    },
    targetObject: function(mapPos) {
        var self = this;
        mapPos.x < 40 && mapPos.x >= 0 && mapPos.y < 40 && mapPos.y >= 0 && (function() {
            var target_id = mapLogicArray[mapPos.x][mapPos.y];
            cc.log(target_id);
            for(var i = 0; i < objectRefs.length; i+=1) {
                if (objectRefs[i].info && objectRefs[i].info._id && objectRefs[i].info._id == target_id) {
                    var newTarget = objectRefs[i];
                    if (newTarget === self._targetedObject) {
                        break; // nếu chọn object cũ thì thôi
                    } else {    // chọn object mới thì remove object cũ, target object mới và đặt zOrder cao.
                        self._targetedObject && self._targetedObject.removeTarget();
                        self._targetedObject = objectRefs[i];
                        self._targetedObject.onTarget();
                        //self.reorderChild(self._targetedObject, 1000);
                        break;
                    }
                } else {
                    self._targetedObject && self._targetedObject.removeTarget(); // nếu bấm ra ngoài thì bỏ chọn
                    self._targetedObject = null;
                }
            }
        })();
    },
    createBuilding: function(buildingInfo) {
        var newBuilding;
        switch (buildingInfo.name) {
            case 'TOW_1':
                newBuilding = new TownHall(buildingInfo);
                break;
            case 'BDH_1':
                newBuilding = new BuilderHut(buildingInfo);
                break;
            case 'AMC_1':
                newBuilding = new ArmyCamp(buildingInfo);
                break;
            case 'BAR_1':
                newBuilding = new Barrack(buildingInfo);
                break;
            case 'STO_1':
                newBuilding = new GoldStorage(buildingInfo);
                break;
            case 'STO_2':
                newBuilding = new ElixirStorage(buildingInfo);
                break;
            case 'RES_1':
                newBuilding = new GoldMine(buildingInfo);
                break;
            case 'RES_2':
                newBuilding = new ElixirCollector(buildingInfo);
                break;
            default:
                break;
        }
        return newBuilding;
    },

    buildNewContruction: function(buildingInfo) {
        this._isBuilding = true;
        LOBBY.hideLobby();
        //var newBuilding = new BuilderHut(buildingInfo);
        var newBuilding = this.createBuilding(buildingInfo);
        newBuilding.setStatus('setting');
        this._targetedObject && this._targetedObject.removeTarget();
        this._targetedObject = newBuilding;
        newBuilding.onTarget();
        // contructionList.push(buildingInfo);
        // objectRefs.push(newBuilding);
        // this.createLogicArray(contructionList, {});
        this.cancelBtn.addClickEventListener(function() {
            this._isBuilding = false;
            newBuilding.remove();
            this._targetedObject = null;
            this.cancelBtn.attr({
                x: -1000,
                y: -1000,
                opacity: 0,
            });
            this.acceptBtn.attr({
                x: -1000,
                y: -1000,
                opacity: 0,
            });
            LOBBY.showLobby();
        }.bind(this));

        this.acceptBtn.addClickEventListener(function() {
            if(newBuilding.checkNewPosition({ x: newBuilding.tempX, y: newBuilding.tempY })) {
                ////Kiem tra tai nguyen co du khong
                //var g = checkUserResources();
                //if(g > 0){
                //    //Show popup dung G de mua tai nguyen
                //}
                //
                ////Kiem tra tho xay ranh khong
                //if(!checkIsFreeBuilder){
                //    //Show popup dung G de release 1 tho xay dang xay o 1 cong trinh co status = 'pending' va co [buildTime - (timeHienTai - StartTime)] la nho nhat
                //        var coin = getGToReleaseBuilder();
                //        //Can coin de release 1 builder
                //    //Neu ok, Chuyen trang thai nha dc release sang 'complete'
                //}

                //Gui yeu cau xac nhan len server


                //Nhan phan hoi succeed tu server


                //Tru tien cua nguoi choi
                reduceUserResources(buildingInfo.cost);
                //Thong so Resource trem map can dc update lai


                //Cap nhat lai map va listBuilding o client
                this._isBuilding = false;
                newBuilding.removeTarget();
                this._targetedObject = null;
                contructionList.push(buildingInfo);
                objectRefs.push(newBuilding);
                this.createLogicArray(contructionList, {});
                this.cancelBtn.attr({
                    x: -1000,
                    y: -1000,
                    opacity: 0,
                });
                this.acceptBtn.attr({
                    x: -1000,
                    y: -1000,
                    opacity: 0,
                });
                LOBBY.showLobby();

                //Hien thi thoi gian dem nguoc va hinh anh thang tho xay (neu co)
            }
        }.bind(this));

        this.setVXbtn(this._targetedObject);
    },
    setVXbtn: function(targetedObject) {
        var coor = targetedObject.xyOnMap(targetedObject.info.posX, targetedObject.info.posY);
        this.cancelBtn.attr({
            x: coor.x + TILE_WIDTH,
            y: coor.y + 2 * TILE_HEIGHT,
            opacity: 255,
        });
        this.acceptBtn.attr({
            x: coor.x - TILE_WIDTH,
            y: coor.y + 2 * TILE_HEIGHT,
            opacity: 255,
        });
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
