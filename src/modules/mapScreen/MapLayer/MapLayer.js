var mapLogicArray = mapLogicArray || [];
var objectRefs = objectRefs || [];
var MAP = MAP || null;

var DeltaTime = 0;                  //Client - Server
var BONUS_TIME = 2;
var updateTimeFlag = false;         //cu 10s thi co nay = true

var lastIndexContructionList = 0;

var ReducedTempResources = {gold: 0, elixir: 0, darkElixir: 0, coin: 0};
var LastReduceResources = {gold: 0, elixir: 0, darkElixir: 0, coin: 0};

var contructionList = [
//     {
//         _id: '_01',
//         name: 'BDH_1',
//         level: 1,
//         posX: 10,
//         posY: 10,
//         width: 2,
//         height: 2,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_02',
//         name: 'TOW_1',
//         posX: 19,
//         posY: 19,
//         width: 4,
//         height: 4,
//         level: 5,
//         status: 'upgrade',
//         startTime: 0
//     },
//     {
//         _id: '_03',
//         name: 'AMC_1',
//         posX: 0,
//         posY: 0,
//         width: 5,
//         height: 5,
//         level: 1,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_04',
//         name: 'BAR_1',
//         posX: 10,
//         posY: 5,
//         width: 3,
//         height: 3,
//         level: 2,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//        _id: '_05',
//        name: 'BDH_1',
//        posX: 5,
//        posY: 5,
//        width: 2,
//        height: 2,
//        level: 1,
//        status: 'complete',
//        startTime: 0
//     },
//     {
//         _id: '_06',
//         name: 'STO_1',
//         posX: 5,
//         posY: 10,
//         width: 3,
//         height: 3,
//         level: 2,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_07',
//         name: 'STO_1',
//         posX: 5,
//         posY: 15,
//         width: 3,
//         height: 3,
//         level: 4,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_08',
//         name: 'STO_2',
//         posX: 5,
//         posY: 20,
//         width: 3,
//         height: 3,
//         level: 5,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_09',
//         name: 'STO_2',
//         posX: 5,
//         posY: 25,
//         width: 3,
//         height: 3,
//         level: 1,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_10',
//         name: 'RES_1',
//         posX: 5,
//         posY: 30,
//         width: 3,
//         height: 3,
//         level: 11,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_11',
//         name: 'RES_1',
//         posX: 10,
//         posY: 30,
//         width: 3,
//         height: 3,
//         level: 4,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_12',
//         name: 'RES_2',
//         posX: 15,
//         posY: 30,
//         width: 3,
//         height: 3,
//         level: 11,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_13',
//         name: 'DEF_1',
//         posX: 35,
//         posY: 35,
//         width: 3,
//         height: 3,
//         level: 1,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_14',
//         name: 'DEF_1',
//         posX: 35,
//         posY: 32,
//         width: 3,
//         height: 3,
//         level: 3,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_15',
//         name: 'DEF_1',
//         posX: 32,
//         posY: 35,
//         width: 3,
//         height: 3,
//         level: 5,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_16',
//         name: 'DEF_1',
//         posX: 32,
//         posY: 32,
//         width: 3,
//         height: 3,
//         level: 7,
//         status: 'complete',
//         startTime: 0
//     },
//     {
//         _id: '_17',
//         name: 'DEF_1',
//         posX: 32,
//         posY: 29,
//         width: 3,
//         height: 3,
//         level: 9,
//         status: 'complete',
//         startTime: 0
//     },
];

var obstacleLists1 = [
    {
        _id: '5000',
        name: 'OBS_1',
        posX: 38,
        posY: 38,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5001',
        name: 'OBS_1',
        posX: 38,
        posY: 0,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5002',
        name: 'OBS_2',
        posX: 38,
        posY: 2,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5003',
        name: 'OBS_3',
        posX: 38,
        posY: 4,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5004',
        name: 'OBS_4',
        posX: 36,
        posY: 0,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5005',
        name: 'OBS_5',
        posX: 36,
        posY: 2,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5006',
        name: 'OBS_6',
        posX: 34,
        posY: 0,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5007',
        name: 'OBS_7',
        posX: 30,
        posY: 10,
        width: 3,
        height: 3,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5008',
        name: 'OBS_8',
        posX: 27,
        posY: 10,
        width: 3,
        height: 3,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5009',
        name: 'OBS_9',
        posX: 34,
        posY: 6,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5010',
        name: 'OBS_10',
        posX: 32,
        posY: 0,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5011',
        name: 'OBS_11',
        posX: 32,
        posY: 4,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5012',
        name: 'OBS_12',
        posX: 32,
        posY: 6,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5013',
        name: 'OBS_13',
        posX: 36,
        posY: 8,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5014',
        name: 'OBS_14',
        posX: 33,
        posY: 8,
        width: 3,
        height: 3,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5015',
        name: 'OBS_15',
        posX: 30,
        posY: 0,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
    },
    {
        _id: '5016',
        name: 'OBS_16',
        posX: 30,
        posY: 2,
        width: 2,
        height: 2,
        status: 'present',
        startTime: 0,
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
    mapWidth: 4200,
    mapHeight: 3200,
    ctor: function(userInfo) {
        this._super();
        MAP = this;
        this.userInfo = userInfo;

        this.anchorX = 0;
        this.anchorY = 0;

        this.init();
        this.addTouchListener();
        this.addMultiTouch();
        this.addKeyboardListener();
        this.updateTimeStamp();
    },
    init: function() {
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/RES_1_effects/RES_1_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/RES_2_effects/RES_2_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/BAR_1_effects/BAR_1_effects.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/armycam_1/armycam_1_effect.plist');
        cc.spriteFrameCache.addSpriteFrames('res/Art/Effects/effects_1.plist');
        this.initBackGround();
        this.initMovingTool();
        this.initContructions(contructionList);
        this.initObstacles(obstacleLists);
        this.createLogicArray(contructionList, obstacleLists);
        
        this.scale = 0.5;
        for (var i = 0; i < objectRefs.length; i++) {
            if(objectRefs[i].info.name === 'TOW_1') {
                var town = objectRefs[i];
                this.setMapPositionToObject(town);
                break;
            }
        }
    },
    setMapPositionToObject: function(town) {
        var size = cc.winSize;
        var mapPosition;
        var xy = town.xyOnMap(town.info.posX, town.info.posY);
        mapPosition = this.reverseMapCoor(xy);
        cc.log('town.info.pos + ' + town.info.posX + '/' + town.info.posY);
        cc.log('mapPosition + ' + mapPosition.x + '/' + mapPosition.y);
        
        var p = {x: 0, y: 0};
        p.x = (-mapPosition.x) + size.width/2;
        p.y = (-mapPosition.y) + size.height/2;
        cc.log('p + ' + p.x + '/' + p.y);
        p = this.limitMoveMap(p);
        this.attr({
            x: p.x,
            y: p.y,
        });
    },
    initContructions: function(contructions) {
        var self = this;
        contructions.forEach(function(contruction, i) {
            var newBuilding = self.createBuilding(contruction);
            newBuilding && objectRefs.push(newBuilding);
        });
    },
    initObstacles: function(obstacles) {
        var self = this;
        obstacles.forEach(function(obstacle) {
            var newObstacle = new Obstacle(obstacle);
            objectRefs.push(newObstacle);
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
    createLogicArray: function(contructions, obstacles) {
        mapLogicArray = [];
        var i = 0;
        var j = 0;
        for (i = 0; i < MAPVALUE.MAPSIZE; i++) {
            var row = [];
            for(j = 0; j < MAPVALUE.MAPSIZE; j++) {
                row.push(MAPVALUE.UNUSED);
            }
            mapLogicArray.push(row);
        }
        for (contruction in contructions) {
            var _inRow = contructions[contruction].posX;
            var _inColumn = contructions[contruction].posY;
            var _size = contructions[contruction].width;
            for (var i = 0; i < _size; i++) {
                for (var j = 0; j < _size; j++) {
                    if (_inRow + i < MAPVALUE.MAPSIZE && _inColumn + j < MAPVALUE.MAPSIZE)
                    mapLogicArray[_inRow + i][_inColumn + j] = contructions[contruction]._id;
                }
            }
        }
        for (obstacle in obstacles) {
            var _inRow = obstacles[obstacle].posX;
            var _inColumn = obstacles[obstacle].posY;
            var _size = obstacles[obstacle].width;
            for (var i = 0; i < _size; i++) {
                for (var j = 0; j < _size; j++) {
                    if (_inRow + i < MAPVALUE.MAPSIZE && _inColumn + j < MAPVALUE.MAPSIZE)
                    mapLogicArray[_inRow + i][_inColumn + j] = obstacles[obstacle]._id;
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
        cc.log('coorInMap: ', coorInMap.x + '/' + coorInMap.y);
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
            LOBBY.hideLobby();
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
            // && Math.abs(this._startTouch.x - tp.x) < TILE_WIDTH / 2
            // && Math.abs(this._startTouch.y - tp.y) < TILE_HEIGHT / 2
            && Math.abs(this._startTouch.x - tp.x) === 0
            && Math.abs(this._startTouch.y - tp.y) === 0
            && !this._isBuilding
        ) { // nếu touch mà ko di chuyển
            this.targetObject(mapPos);
        }
        if (this._isMovingObject) {
            if (this._targetedObject && this._targetedObject.checkNewPosition(mapPos)) {
                this._targetedObject.updatePosition(mapPos);
                this.updateContructionList(this._targetedObject.info);
                this.createLogicArray(contructionList, obstacleLists);
                LOBBY.showLobby();
            } else {
                // this._targetedObject.returnLastPosition();
            }
            // this._isMovingObject = false;
        }
        this._startTouch = null;
        this._zoomPoint = null;
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
        LOBBY.showLobby();
        var self = this;
        mapPos.x < MAPVALUE.MAPSIZE && mapPos.x >= 0 && mapPos.y < MAPVALUE.MAPSIZE && mapPos.y >= 0 && (function() {
            var target_id = mapLogicArray[mapPos.x][mapPos.y];
            cc.log('target_id: ' + target_id);
            for(var i = 0; i < objectRefs.length; i+=1) {
                // cc.log('bool ' + objectRefs[i].info._id == target_id);
                if (objectRefs[i].info && objectRefs[i].info._id >= 0 && objectRefs[i].info._id == target_id) {
                    var newTarget = objectRefs[i];
                    if (newTarget === self._targetedObject) {
                        break; // nếu chọn object cũ thì thôi
                    } else {    // chọn object mới thì remove object cũ, target object mới và đặt zOrder cao.
                        self._targetedObject && self._targetedObject.removeTarget();
                        self._targetedObject = objectRefs[i];
                        self._targetedObject.onTarget();
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
                newBuilding = new TownHall(buildingInfo, this.userInfo);
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
                newBuilding = new GoldStorage(buildingInfo, this.userInfo);
                break;
            case 'STO_2':
                newBuilding = new ElixirStorage(buildingInfo, this.userInfo);
                break;
            case 'RES_1':
                newBuilding = new GoldMine(buildingInfo);
                break;
            case 'RES_2':
                newBuilding = new ElixirCollector(buildingInfo);
                break;
            case 'DEF_1':
                newBuilding = new Cannon(buildingInfo);
                break;
            default:
                break;
        }
        return newBuilding;
    },

    buildNewContruction: function(buildingInfo) {

        cc.log("So nha dang pending: " + checkPendingBuilding());
        cc.log("So tho xay hien co: " + checkBuilder());
        var freeBuilder = checkBuilder() - checkPendingBuilding();
        cc.log("So tho xay dang ranh: " + freeBuilder);
        cc.log("=======================Map=======================");
        for(var item in contructionList){
            cc.log("Nha: " + contructionList[item].name + ", id: " + contructionList[item]._id + ", status: " + contructionList[item].status + ", startTime: " + contructionList[item].startTime);
        }
        cc.log("=======================Het Map=======================");
    
        this._isBuilding = true;
        LOBBY.hideLobby();
        //var newBuilding = new BuilderHut(buildingInfo);
        var newBuilding = this.createBuilding(buildingInfo);
        newBuilding.setStatus('setting');
        this._targetedObject && this._targetedObject.removeTarget();
        this._targetedObject = newBuilding;
        this.setMapPositionToObject(newBuilding);
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
            this.cancelBtn.addClickEventListener(doNothing);
            this.acceptBtn.addClickEventListener(doNothing);
        }.bind(this));

        this.acceptBtn.addClickEventListener(function() {
            var listener = {};
            if(newBuilding.checkNewPosition({ x: newBuilding.tempX, y: newBuilding.tempY })) {
                var gResources = checkUserResources(buildingInfo.cost);
                if(gResources == 0){
                    if(buildingInfo.name != 'BDH_1' && !checkIsFreeBuilder()){
                        var gBuilder = getGToReleaseBuilder();
                        if(gv.user.coin < gBuilder){
                            var listener = {contentBuyG:"Please add more G to release a builder!"};
                            var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "All builders are busy", true, listener);
                            cc.director.getRunningScene().addChild(popup, 2000000);
                        }else{
                            _.extend(ReducedTempResources, buildingInfo.cost);
                            var listener = {type:'builder', building:buildingInfo, newBuilding:newBuilding, gBuilder:gBuilder};
                            var popup = new ShowBuildPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to release a builder", false, listener);
                            cc.director.getRunningScene().addChild(popup, 2000000);
                        }
                    }else{
                        _.extend(ReducedTempResources, buildingInfo.cost);
                        NETWORK.sendRequestAddConstruction(newBuilding, buildingInfo);
                    }
                } else if(gResources > 0){
                    if(gv.user.coin < gResources){
                        var listener = {contentBuyG:"Please add more G to buy missing resources!"};
                        var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough resources to build this building", true, listener);
                        cc.director.getRunningScene().addChild(popup, 2000000);
                    }else{
                        var listener = {type:'resources', building:buildingInfo, newBuilding:newBuilding, gResources:gResources};
                        var popup = new ShowBuildPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to buy resources", false, listener);
                        cc.director.getRunningScene().addChild(popup, 2000000);
                    }
                } else {
                    var listener = {contentBuyG:"Please add more G to buy this item!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough G to build this building", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }
        }.bind(this));

        this.setVXbtn(this._targetedObject);
    },

    updateMapWhenValidatedBuild:function(newBuilding, buildingInfo){
        this._isBuilding = false;
        // newBuilding.setStatus('pending');
        newBuilding._status = 'pending';
        newBuilding.removeTarget();
        this._targetedObject = null;
        this.cancelBtn.attr({
            x: -1000,
            y: -1000,
            opacity: 0
        });
        this.acceptBtn.attr({
            x: -1000,
            y: -1000,
            opacity: 0
        });

        if(buildingInfo.buildTime > 0){
            buildingInfo.status = 'pending';
            buildingInfo.startTime = getCurrentServerTime();
            newBuilding.startTime = getCurrentServerTime();
        }else{
            buildingInfo.status = 'complete';
            newBuilding.setStatus('complete');
            buildingInfo.startTime = 0;
            newBuilding.startTime = 0;
        }
        contructionList.push(buildingInfo);
        
        if(buildingInfo.buildTime){
            var cur = Math.ceil((getCurrentServerTime() - buildingInfo.startTime)/1000);
            var max = buildingInfo.buildTime;
            newBuilding.build(cur, max);
        }
        
        objectRefs.push(newBuilding);
        MAP.createLogicArray(contructionList, obstacleLists);

        updateBuilderNumber();
        LOBBY.showLobby();
        this.cancelBtn.addClickEventListener(doNothing);
        this.acceptBtn.addClickEventListener(doNothing);
    },
    removeObstacle: function(obstacle) {
        obstacle.remove();
    },
    setVXbtn: function(targetedObject) {
        var coor = targetedObject.xyOnMap(targetedObject.info.posX, targetedObject.info.posY);
        this.cancelBtn.attr({
            x: coor.x - TILE_WIDTH,
            y: coor.y + 2 * TILE_HEIGHT,
            opacity: 255
        });
        this.acceptBtn.attr({
            x: coor.x + TILE_WIDTH,
            y: coor.y + 2 * TILE_HEIGHT,
            opacity: 255
        });
    },
    moveMap: function(touch) {
        if (this.prevTouchId !== touch.getID()) this.prevTouchId = touch.getID();
        else {
            var delta = touch.getDelta();
            var curPos = cc.p(this.x, this.y);
            curPos = cc.pAdd(curPos, delta);
            curPos = this.limitMoveMap(curPos);
            this.x = curPos.x;
            this.y = curPos.y;
        }
    },
    addMultiTouch: function() {
        var self = this;
        if (self == null) return;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                return true;
            },
            onTouchesMoved: this.onTouchesMoved.bind(this),
            onTouchesEnded: function(touches, event) {
                this._zoomPoint = null;
            },
        }, this);
    },
    onTouchesMoved: function(touches, event) {
        var calculateDistance = function(a, b) {
            return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
        }
        if (touches.length >= 2) {
            var size = cc.winSize;
            
            var p1 = touches[0];
            var p2 = touches[1];
            var rootP1 = cc.pSub(p1.getLocation(), p1.getDelta());
            var rootP2 = cc.pSub(p2.getLocation(), p2.getDelta());
            var rootP1OnMap = this.calculateCoor(rootP1);
            var rootP2OnMap = this.calculateCoor(rootP2);
            var rootZoomPoint = { x: (rootP1OnMap.x + rootP2OnMap.x)/2, y: (rootP1OnMap.y + rootP2OnMap.y)/2 }; // cái này là trung tâm điểm zoom ở trên màn hình
            this._zoomPoint = this._zoomPoint || rootZoomPoint;
            // this._zoomPoint = tp;
            var oriDistance = calculateDistance(rootP1, rootP2);
            var newDistance = calculateDistance(p1.getLocation(), p2.getLocation());
            var scaleRate = newDistance/oriDistance;

            this.zoomMap(scaleRate);
        };
    },
    zoomMap: function(scaleRate) {
        var self = this;
        if (scaleRate < 1 && self.scale > ZOOM_SCALE.MIN || scaleRate > 1 && self.scale < ZOOM_SCALE.MAX) {
            var curPos = {
                x: self.x,
                y: self.y
            };
            var newPos = {
                x: curPos.x - self._zoomPoint.x * (scaleRate - 1) * self.scale,
                y: curPos.y - self._zoomPoint.y * (scaleRate - 1) * self.scale,
            }
            self.scale *= scaleRate;
            newPos = self.limitMoveMap(newPos);
            self.attr({
                x: newPos.x,
                y: newPos.y
            });
        }
    },
    limitMoveMap: function(pos) { // di chuyển để map ko bị ra ngoài giới hạn
        var size = cc.winSize;
        var curPos = pos;
        if (curPos.x > 0) curPos.x = 0;
        if (curPos.y > 0) curPos.y = 0;
        if (curPos.x < - this.mapWidth * this.scale + size.width) curPos.x = -this.mapWidth * this.scale + size.width;
        if (curPos.y < - this.mapHeight * this.scale + size.height) curPos.y = -this.mapHeight * this.scale + size.height;
        return curPos;
    },
    calculatePos: function(coorInMap) { // tính từ tọa độ trên map thành index trên mảng MapLogicArray
        var coor = { x: 0, y: 0 };
        var x = coorInMap.x - rootMapPos.x;
        var y = coorInMap.y - rootMapPos.y;
        coor.x = parseInt(((y / (TILE_HEIGHT/2) - x / (TILE_WIDTH/2)) / 2).toFixed(0));
        coor.y = parseInt(((x / (TILE_WIDTH/2) + y / (TILE_HEIGHT/2)) / 2).toFixed(0));
        return coor;
    },
    calculateCoor: function(tp) { // tính tọa độ từ điểm trên màn hình thành tọa độ trên map
        var result = { x: 0, y: 0 };
        result.x = (tp.x - this.x) / this.scale;
        result.y = (tp.y - this.y) / this.scale;
        return result;
    },
    reverseMapCoor: function(coor) {
        var result = { x: 0, y: 0 };
        result.x = coor.x * this.scale;
        result.y = coor.y * this.scale;
        return result;
    },
    addKeyboardListener: function() {
        var self = this;
        var size = cc.winSize;
        cc.log('Keyboard Listener');
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (key, event) {
                var x = (size.width / 2 - self.x) / self.scale;
                var y = (size.height / 2 - self.y) / self.scale;
                var tp = { // cái này là tâm điểm của zoom
                    x:x,
                    y:y
                };
                var scaleNumber = 1.1;
                if(key == 73 && self.scale < 2) { // zoomIn
                    var curPos = {
                        x: self.x,
                        y: self.y
                    };
                    var newPos = {
                        x: curPos.x - tp.x * (scaleNumber - 1) * self.scale,
                        y: curPos.y - tp.y * (scaleNumber - 1) * self.scale,
                    }
                    self.scale *= scaleNumber;
                    self.attr({
                        x: newPos.x,
                        y: newPos.y
                    });
                } else if(key == 79 && self.scale > 0.4) { // zoomOut
                    var scaleNumber = 1 / scaleNumber;
                    var curPos = {
                        x: self.x,
                        y: self.y
                    };
                    var newPos = {
                        x: curPos.x - tp.x * (scaleNumber - 1) * self.scale,
                        y: curPos.y - tp.y * (scaleNumber - 1) * self.scale,
                    }
                    self.scale *= scaleNumber;
                    newPos = self.limitMoveMap(newPos);
                    self.attr({
                        x: newPos.x,
                        y: newPos.y
                    });
                } else if(key == 65) {
                    self._zoomPoint = tp;
                    self.zoomMap(1.1);
                } else if(key == 83) {
                    self._zoomPoint = tp;
                    self.zoomMap(0.9);
                }
            },
            onKeyReleased: function(key, event) {
            }
        }, this);
    },
    updateTimeStamp: function() {
        NETWORK.sendGetServerTime();
        var self = this;
        setTimeout(function() {
            self.updateTimeStamp();
        }, 10000);
    }
});