var Contruction = cc.Class.extend({
    _status: 'complete',
    ctor: function(info) {
        // this._super();
        this.info = info;
        this._status = info.status;
        this._id = info._id;
        this._name = info.name;
        this._level = info.level;
        this._posX = info.posX;
        this._posY = info.posY;
        this._width = info.width;
        this._height = info.height;
        if(this._status == 'pending'){
            this.buildTime = info.buildTime;
        }else if(this._status == 'upgrade'){
            this.buildTime = config.building[this._name][this._level+1].buildTime;
        }
        this.startTime = info.startTime;

        this.init();
        lastIndexContructionList++;
    },
    init: function() {
        this.tempX = this._posX;
        this.tempY = this._posY;
        this._oldX = this._posX;
        this._oldY = this._posY;

        this.addShadow();
        this.addNameText();
        this.addBuildingImg();
        this.setBuildingStatus();
        this.presentImg(); // chỉ có ở nhà chứa
    },
    setBuildingStatus: function() {
        if (this._status === 'upgrade' || this._status === 'pending' && this.startTime) {
            var cur = (getCurrentServerTime() - this.startTime)/1000;
            cc.log("============================start time: " +this.startTime);
            var max = this.buildTime;
            if(!this.timeBar){
                this.addTimeBar(cur, max);
                this.countDown(cur, max);
            }

        }
    },
    onTarget: function() {
        var coor = this.xyOnMap(this._posX, this._posY);
        cc.log('targeted pos' + this._posX + '/' + this._posY);
        var act = new cc.FadeIn(0.2);
        MAP.arrows[this._width].attr({
            x: coor.x,
            y: coor.y,
        });
        MAP.arrows[this._width].runAction(act);
        //if (this.grass) this.grass.opacity = 0;
        this.nameText.opacity = 255;
        if (this.checkNewPosition({ x: this._posX, y: this._posY })) {
            MAP.greenBGs[this._width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this._width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
        } else {
            MAP.greenBGs[this._width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this._width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
        };
        this.buildingImg.runAction(ui.BounceEff());
        this.buildingImg.runAction(ui.targettingEff().repeatForever());
        this.onTargetSound();
        LOBBY.showObjectMenu(MAP._targetedObject);
    },
    removeTarget: function() {
        var act = new cc.FadeOut(0.2);
        MAP.arrows[this._width].runAction(act);
        //if (this.grass) this.grass.opacity = 255;
        this.nameText.opacity = 0;
        MAP.greenBGs[this._width].attr({
            opacity: 0,
        });
        MAP.redBGs[this._width].attr({
            opacity: 0,
        });

        var coor = this.xyOnMap(this._posX, this._posY);
        this.setImgCoor(coor);
        this.tempX = this._posX;
        this.tempY = this._posY;
        this.buildingImg.stopAllActions();
        this.buildingImg.runAction(ui.backToDefaultColor());
        LOBBY.hideObjectMenu();
    },
    moving: function(mapPos) {
        var coor = this.xyOnMap(mapPos.x, mapPos.y);
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        this.setImgCoor(coor); // đặt lại vị trí
        // setzOrder
        var newZ = this.caluclateZOrder(mapPos);
        cc.log("NewZ: " + newZ);
        MAP.reorderChild(this.buildingImg, newZ);
        // đặt tọa độ, hiển thị nền xanh đỏ
        if (this.checkNewPosition(mapPos)) {
            MAP.greenBGs[this._width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this._width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
        } else {
            MAP.greenBGs[this._width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this._width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
        }
        
        MAP.arrows[this._width].attr({
            x: coor.x,
            y: coor.y,
        });
        if (this._status === 'setting') {
            MAP.cancelBtn.attr({
                x: coor.x - TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
            MAP.acceptBtn.attr({
                x: coor.x + TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
        }
    },
    setImgCoor: function(coor) {
        this.buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        this.grass && this.grass.attr({
            x: coor.x,
            y: coor.y,
        });
        this.shadow && this.shadow.attr({
            x: coor.x,
            y: coor.y,
        });
        this.nameText.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 30,
        });
        this.timeBar && this.timeBar.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 60,
        });
    },
    updatePosition: function(mapPos) {
        //if (this.tempX !== this._posX && this.tempX !== this._posY) {
        var eff = ui.landingEffect();
        this.buildingImg.runAction(eff);
        this.onPlaceSound();
        //}
        this._posX = mapPos.x;
        this._posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        try {
            temp.lastMoveBuilding = this;
            if(this._status !== 'setting' && (this._oldX !== this._posX || this._oldY !== this._posY)) {
                cc.log('sendMove>>>>>>>>>>>>>>>before');
                cc.log('sendMove>>>>>>>>>>>>>>>this.info._id' + this.info._id);
                cc.log('sendMove>>>>>>>>>>>>>>>mapPos.x' + mapPos.x);
                //cc.log('sendMove>>>>>>>>>>>>>>>mapPos.y' + mapPos.y);
                NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
                cc.log('sendMove>>>>>>>>>>>>>>>after');
            }
        } catch (error) {
            cc.log('network error!');
        }
    },
    acceptSendMoveFromServer: function() {
        this._oldX = this._posX;
        this._oldY = this._posY;
    },
    sendMoveIsDenined: function() {
        this.moving({ x: this._oldX, y: this._oldY });
        this._posX = this._oldX;
        this._posY = this._oldY;
        MAP.updateContructionList(this.info);
        MAP.createLogicArray(contructionList, obstacleLists);
    },
    checkNewPosition: function(mapPos) {
        if (mapPos.x < 0 || mapPos.y < 0 || mapPos.x > MAPVALUE.MAPSIZE - this._width || mapPos.y > MAPVALUE.MAPSIZE - this._height) return false;
        for (var i = 0; i < this._width; i++) {
            for (var j = 0; j < this._height; j++) {
                if (mapLogicArray[mapPos.x + i][mapPos.y + j] !== MAPVALUE.UNUSED && mapLogicArray[mapPos.x + i][mapPos.y + j] !== this.info._id) {
                    return false;
                }
            }
        }
        return true;
    },
    setStatus: function(status) {
        this._status = status;
        LOBBY.showObjectMenu(MAP._targetedObject);
    },
    caluclateZOrder: function(mapPos) {
        var newZ = 1000 - (mapPos.x + mapPos.y + (this._height - 3) / 2) * 10 + 1;
        return newZ;
    },
    addShadow: function() {
        switch (this._name) {
            case 'BDH_1':
                this.squareShadow(2);
                break;
            case 'TOW_1':
                this.squareShadow(4);
                break;
            case 'BAR_1':
            case 'RES_1':
                this.squareShadow(3);
                break
            case 'STO_1':
            case 'STO_2':
            case 'RES_2':
                this.roundShadow();
                break;
            default:
                break;
        }
    },
    squareShadow: function(size) {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_'+ size +'_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        this.shadow = shadow;
        var coor = this.xyOnMap(this._posX, this._posY);
        shadow.attr({
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(shadow, Z.BUILDING_SHADOW);
    },
    roundShadow: function() {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_5_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        this.shadow = shadow;
        var coor = this.xyOnMap(this._posX, this._posY);
        shadow.attr({
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(shadow, Z.BUILDING_SHADOW);
    },
    addNameText: function() {
        var bd_name = name.building[this._name] ? name.building[this._name].en : 'unknown';
        var nameText = new cc.LabelBMFont(bd_name, 'res/Art/Fonts/soji_24.fnt');
        this.nameText = nameText;
        var coor = this.xyOnMap(this._posX, this._posY);
        nameText.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 30,
            color: cc.color(255, 255, 0, 255),
            opacity: 0,
        });
        MAP.addChild(nameText, 1000);
        
        var levelText = new cc.LabelBMFont('cấp ' + this._level, 'res/Art/Fonts/soji_16.fnt');
        this.levelText = levelText;
        levelText.attr({
            x: nameText.width / 2,
            y: -5,
            opacity: this._name !== "BDH_1" ? 255 : 0,
        });
        nameText.addChild(levelText, 1000);
    },
    xyOnMap: function(posX, posY) {
        var newX = rootMapPos.x + (posY - posX) * TILE_WIDTH / 2;
        var newY = rootMapPos.y + (posX + posY) * TILE_HEIGHT / 2 + TILE_HEIGHT * (this._height - 1) * 0.5;
        return { x: newX, y: newY };
    },

    build: function(cur, max) {
        this.setStatus('pending');
        this.addTimeBar(cur, max);
        this.countDown(cur, max);
    },
    buildComplete: function(isQuickFinish) {
        if(!isQuickFinish){
            NETWORK.sendFinishTimeConstruction(this._id);
        }
        this.buildingImg && MAP.removeChild(this.buildingImg);
        this.buildingImg = null;
        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;
        this.addBuildingImg();
        this.levelText.setString('Level: ' + this._level);
        this.presentImg();
        this.showLevelUpEffect();
        this.setStatus('complete');
        cc.log("================================> _id: " + this._id);
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                break;
            }
        }
        updateBuilderNumber();
        setUserResourcesCapacity();
        LOBBY.update(gv.user);
    },
    upgrade: function() {
        if(!checkConditionUpgrade(this)){
            var listener = {contentBuyG:"Upgrade TownHall to upgrade this building!"};
            var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough level of TownHall", true, listener);
            cc.director.getRunningScene().addChild(popup, 2000000);
            return;
        }
        var costBuilding = getResourcesNextLevel(this._name, this._level);
        var gResources = checkUserResources(costBuilding);
        if(gResources == 0){
            if(!checkIsFreeBuilder()){
                var gBuilder = getGToReleaseBuilder();
                if(gv.user.coin < gBuilder){
                    var listener = {contentBuyG:"Add more G to release a builder!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "All builders are busy", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }else{
                    _.extend(ReducedTempResources, costBuilding);
                    var listener = {type:'builderUpgrade', building:this, gBuilder:gBuilder};
                    var popup = new ShowUpgradePopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to release a builder", false, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }else{
                _.extend(ReducedTempResources, costBuilding);
                NETWORK.sendRequestUpgradeConstruction(this);
            }
        } else if(gResources > 0){
            if(gv.user.coin < gResources){
                var listener = {contentBuyG:"Add more G to buy missing resources!"};
                var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough resources to build this building", true, listener);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }else{
                this.cost = costBuilding;
                var listener = {type:'resourcesUpgrade', building:this, gResources:gResources};
                var popup = new ShowUpgradePopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to buy resources", false, listener);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }
        } else {
            var listener = {contentBuyG:"Add more G to buy this item!"};
            var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough G to build this building", true, listener);
            cc.director.getRunningScene().addChild(popup, 2000000);
        }
    },

    upgradeComplete: function(isQuickFinish) {
        if(!isQuickFinish){
            NETWORK.sendFinishTimeConstruction(this._id);
        }
        this._level = this._level + 1;
        this.buildingImg && MAP.removeChild(this.buildingImg);
        this.buildingImg = null;
        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;
        this.addBuildingImg();
        this.levelText.setString('cấp ' + this._level);
        this.presentImg();
        this.showLevelUpEffect();
        this.setStatus('complete');

        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                contructionList[item].level = this._level;
                cc.log("============================= Level hien tai construction list: " + contructionList[item].level);
                break;
            }
        }

        updateBuilderNumber();
        setUserResourcesCapacity();
        cc.log("============================= Level hien tai building: " + this._level);

        LOBBY.update(gv.user);
    },
    cancel: function(building){
        buildingCancel = building;
        NETWORK.sendCancel(building._id);
        //if (this._status == 'upgrade') this.cancelUpgrade();
        //else if (this._status == 'pending') this.cancelBuild();
    },
    cancelUpgrade: function() {
        this.timeBar && MAP.removeChild(this.timeBar);
        this.upgradeBarrier && this.buildingImg.removeChild(this.upgradeBarrier);
        this.timeBar = null;
        this.setStatus('complete');
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                break;
            }
        }

        //Refund
        var data = config.building[this._name][this._level+1];
        var gold = data.gold || 0;
        var elixir = data.elixir || 0;
        var darkElixir = data.darkElixir || 0;
        var coin = data.coin || 0;
        var refundResources = {gold:gold/2, elixir:elixir/2, darkElixir:darkElixir/2, coin:coin/2};
        increaseUserResources(refundResources);

        updateBuilderNumber();
        setUserResourcesCapacity();
        LOBBY.update(gv.user);
    },
    cancelBuild: function() {
        var newContructionList = contructionList.filter(element => {
            if (element._id === this._id) return false;
            return true;
        });

        contructionList = newContructionList;
        MAP.createLogicArray(contructionList, obstacleLists);

        MAP._targetedObject = null;
        this.remove();

        //Refund
        var data = config.building[this._name][1];
        var gold = data.gold || 0;
        var elixir = data.elixir || 0;
        var darkElixir = data.darkElixir || 0;
        var coin = data.coin || 0;
        var refundResources = {gold:gold/2, elixir:elixir/2, darkElixir:darkElixir/2, coin:coin/2};
        increaseUserResources(refundResources);

        updateBuilderNumber();
        setUserResourcesCapacity();
        LOBBY.update(gv.user);
    },
    remove:function() {
        this.removeTarget();
        MAP.removeChild(this.buildingImg);
        MAP.removeChild(this.grass);
        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;
        this.shadow && MAP.removeChild(this.shadow);
        this.setStatus('delete');
    },
    removeComplete:function(){
        var newContructionList = contructionList.filter(element => {
                if (element._id == this._id) return false;
                return true;
            });
        contructionList = newContructionList;
        this.removeImg();
        MAP.createLogicArray(contructionList, obstacleLists);
    },
    removeImg:function(){

    },

    addBuildingImg: function() {
        //
    },
    addTimeBar: function(cur, max) {
        var upgradeBarrier = new cc.Sprite('res/Art/Map/map_obj_bg/upgrading.png');
        this.upgradeBarrier = upgradeBarrier;
        upgradeBarrier.attr({
            x: this.buildingImg.width / 2,
            y: this.buildingImg.height / 2 - TILE_WIDTH / 2,
            scale: this._width * 3 / 4,
        });
        this.buildingImg.addChild(upgradeBarrier, 1000);

        var timeBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
        this.timeBar = timeBar;
        var coor = this.xyOnMap(this._posX, this._posY);
        timeBar.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 60,
        });
        MAP.addChild(timeBar, 1100);

        var processBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
        this.processBar = processBar;
        processBar.attr({
            anchorX: 0,
            anchorY: 0,
        });
        timeBar.addChild(processBar);

        var ratio = cur / max;

        processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

        //var t = timeToString(max - cur);
        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, 'res/Art/Fonts/soji_16.fnt');
        this.timeText = timeText;
        timeText.attr({
            x: timeBar.width / 2,
            y: 42,
        });
        timeBar.addChild(timeText);
    },
    updateTimeBar: function(cur, max) {
        if (this.timeBar) {
            var ratio = cur / max;
            //var t = timeToString(max - cur);
            var t = timeToReadable(max - cur);
            this.processBar.setTextureRect(cc.rect(0, 0, this.timeBar.width * ratio, this.timeBar.height));
            this.timeText.setString(t);
        }
    },
    showLevelUpEffect: function() {
        var lvUpAnims = ui.makeAnimation('construct_levelup_', 0, 6, 0.15);
        var lvUpEffSprite = new cc.Sprite();
        MAP.addChild(lvUpEffSprite, 1100);
        lvUpEffSprite.attr({
            x: this.buildingImg.x -TILE_WIDTH / 8,
            y: this.buildingImg.y + TILE_HEIGHT * (this._height + 1) / 2,
            scale: this._width,
        });
        var act2 = cc.callFunc(function() {
            MAP.removeChild(lvUpEffSprite);
        });
        lvUpEffSprite.runAction(new cc.Sequence(lvUpAnims, act2));
    },
    presentImg: function() {
        // để rỗng
    },
    addBuildingImg: function() {
        // để rỗng
    },
    countDown: function(cur, max){
        var tick = () => {
            setTimeout(() => {
                //if(updateTimeFlag){
                //    cc.log("--------------------------------------------------------updateTimeFlag == true");
                //    cur = (getCurrentServerTime() - this.startTime)/1000;
                //    updateTimeFlag = false;
                //}
                cur = (getCurrentServerTime() - this.startTime)/1000;
                if (cur >= max) {
                    if(this._status == 'pending'){
                        this.buildComplete(false);
                    }else if(this._status == 'upgrade'){
                        this.upgradeComplete(false);
                    }
                    return;
                } else {
                    this.updateTimeBar(cur, max);
                    if(this._status == 'pending' || this._status == 'upgrade'){
                        tick();
                    }
                }
                //cur +=1;
            }, 1000);
        }
        //Chay 1 lan
        tick();
    },
    onTargetSound: function() {
        if (SOUND) {
            switch (this._name) {
                case 'TOW_1':
                    cc.audioEngine.playEffect(sRes.townhall_pickup);
                    break;
                case 'RES_1':
                    cc.audioEngine.playEffect(sRes.goldmine_pickup);
                    break;
                case 'STO_1':
                    cc.audioEngine.playEffect(sRes.goldstorage_pickup);
                    break;
                case 'RES_2':
                    cc.audioEngine.playEffect(sRes.elixirpump_pickup);
                    break;
                case 'STO_2':
                    cc.audioEngine.playEffect(sRes.elixirstorage_pickup);
                    break;
                case 'BDH_1':
                    cc.audioEngine.playEffect(sRes.builderhut_pickup);
                    break;
                case 'AMC_1':
                    cc.audioEngine.playEffect(sRes.camp_pickup);
                    break;
                case 'DEF_1':
                    cc.audioEngine.playEffect(sRes.cannon_pickup);
                    break;
                default:
                    break;
            }
        }
    },
    onPlaceSound: function() {
        if (SOUND) {
            switch (this._name) {
                case 'TOW_1':
                    cc.audioEngine.playEffect(sRes.townhall_place);
                    break;
                case 'RES_1':
                    cc.audioEngine.playEffect(sRes.goldmine_place);
                    break;
                case 'STO_1':
                    cc.audioEngine.playEffect(sRes.goldstorage_place);
                    break;
                case 'RES_2':
                    cc.audioEngine.playEffect(sRes.elixirpump_place);
                    break;
                case 'STO_2':
                    cc.audioEngine.playEffect(sRes.elixirstorage_place);
                    break;
                case 'BDH_1':
                    cc.audioEngine.playEffect(sRes.builderhut_place);
                    break;
                case 'AMC_1':
                    cc.audioEngine.playEffect(sRes.camp_place);
                    break;
                case 'DEF_1':
                    cc.audioEngine.playEffect(sRes.cannon_place);
                    break;
                default:
                    break;
            }
        }
    },
});
