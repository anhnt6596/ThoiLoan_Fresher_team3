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
        if ((this._status === 'upgrade' || this._status === 'pending') && this.startTime) {
            var cur = (getCurrentServerTime() - this.startTime)/1000;
            //cc.log("============================start time: " +this.startTime);
            var max = this.buildTime;
            if(!this.timeBar){
                this.addTimeBar(cur, max);
                this.countDown(cur, max);
            }
        }

        if(temp.statusRequest && this._name == "CLC_1"){
            var cur = (getCurrentServerTime() - gv.user.lastRequestTroopTimeStamp)/1000;
            var max = TIME_REQUEST_TROOP/1000;
            if(!this.timeBarRequest){
                this.addTimeBarRequest(cur, max);
                this.countDownRequest(cur, max);
            }
        }
    },
    onTargeting: function() {
        if (this instanceof CollectorBuilding && (this.full_bg && this.collect_bg) ) {
            MAP._targetedObject = null;
            this.collect();
        } else if (this._name === "CLC_1" && this._level === 0) {
            // this.upgrade();
            createUpgradePopUp();
            this.removeTarget();
            MAP._targetedObject = null;
        } else {
            this.onTarget();
        }
    },
    onTarget: function() {
        var coor = this.xyOnMap(this._posX, this._posY);
        cc.log('targeted pos' + this._posX + '/' + this._posY);
        var act = new cc.FadeIn(0.2);
        this.buildingImg.runAction(ui.BounceEff());
        this.buildingImg.runAction(ui.targettingEff().repeatForever());
        this.onTargetSound();
        LOBBY.showObjectMenu(MAP._targetedObject);
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
        this.showRange();
    },
    collect: function() {
        // để rỗng
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
        this.hideRange();
        LOBBY.hideObjectMenu();
    },
    showRange: function() {
        // hiển thị tầm, ghi đè ở DefenseBuilding và ClanCastle
    },
    hideRange: function() {
        // hiển thị tầm, ghi đè ở DefenseBuilding và ClanCastle
    },
    moving: function(mapPos) {
        // if (this._name === "CLC_1" && this._level === 0) return;
        var coor = this.xyOnMap(mapPos.x, mapPos.y);
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        this.setImgCoor(coor); // đặt lại vị trí
        // setzOrder
        var newZ = this.caluclateZOrder(mapPos);
        // cc.log("NewZ: " + newZ);
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
        this.timeBarRequest && this.timeBarRequest.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 100,
        });
    },
    updatePosition: function(mapPos) {
        var eff = ui.landingEffect();
        this.buildingImg.runAction(eff);
        this.onPlaceSound();
        //}
        this._posX = mapPos.x;
        this._posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        this.afterUpdatePosionAction(mapPos);
        try {
            temp.lastMoveBuilding = this;
            if(this._status !== 'setting' && (this._oldX !== this._posX || this._oldY !== this._posY)) {
                // cc.log('sendMove>>>>>>>>>>>>>>>before');
                // cc.log('sendMove>>>>>>>>>>>>>>>this.info._id' + this.info._id);
                // cc.log('sendMove>>>>>>>>>>>>>>>mapPos.x' + mapPos.x);
                //cc.log('sendMove>>>>>>>>>>>>>>>mapPos.y' + mapPos.y);
                NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
                // cc.log('sendMove>>>>>>>>>>>>>>>after');
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
        MAP.updateContructionList(this);
        // MAP.createLogicArray(contructionList, obstacleLists);
        this.afterUpdatePosionAction(mapPos);
    },
    afterUpdatePosionAction: function(mapPos) {
        MAP.updateContructionList(this);
        MAP.createLogicArray(contructionList, obstacleLists);
        if (this._name === "AMC_1" || this._name === "CLC_1") this.armyRun();
        // if(this._name === "WAL_1") {
        //     setTimeout(function() {
        //         wallRefs.forEach(function(wall) {
        //             if (wall._id === this._id) wall.updatePresentImg(mapPos);
        //             else wall.updatePresentImg({ x: wall._posX, y: wall._posY });
        //         });
        //     }, 0);
        // }
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
            case 'RES_3':
            case 'LAB_1':
            case 'CLC_1':
                this.squareShadow(3);
                break;
            case 'STO_1':
            case 'STO_2':
            case 'RES_2':
            case 'STO_3':
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
        var nameText = new cc.LabelBMFont(bd_name, res.font_soji[24]);
        this.nameText = nameText;
        var coor = this.xyOnMap(this._posX, this._posY);
        nameText.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 30,
            color: cc.color(255, 255, 0, 255),
            opacity: 0,
        });
        MAP.addChild(nameText, 1000);
        
        var levelText = new cc.LabelBMFont('cấp ' + this._level, res.font_soji[16]);
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
        updateGUI();
    },
    setStartTime: function () {
        this.startTime = getCurrentServerTime();
    },
    buildComplete: function(isQuickFinish) {
        if(!isQuickFinish){
            NETWORK.sendFinishTimeConstruction(this._id);
            temp.buildingFinishTime = this;
        }
        this.buildingImg && MAP.removeChild(this.buildingImg);
        this.buildingImg = null;
        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;
        this.addBuildingImg();
        this.levelText.setString('Level: ' + this._level);
        this.presentImg();
        this.showLevelUpEffect();
        this.playBuildCompleteSound();
        this.setStatus('complete');
        this.setStartTime();
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                contructionList[item].startTime = this.startTime;
                break;
            }
        }
        updateGUI();
        this.updateListBuildingRef();
        this.updateAfterBuildComplete();
        this.updateArmyCampCapacity();
    },

    upgrade: function() {
        if(!checkConditionUpgrade(this)){
            showPopupNotEnoughG('upgrade_require_townhall');
            return;
        }
        var costBuilding = getResourcesNextLevel(this._name, this._level);
        var gResources = checkUserResources(costBuilding);
        var data;
        var popup;
        if(gResources == 0){
            if(!checkIsFreeBuilder()){
                var gBuilder = getGToReleaseBuilder();
                if(gv.user.coin < gBuilder){
                    showPopupNotEnoughG('release_builder');
                }else{
                    _.extend(ReducedTempResources, costBuilding);
                    data = {type:'builder', building:this, g:gBuilder};
                    popup = new ShowUpgradePopup(cc.winSize.width/2, cc.winSize.height/1.5, "All builders are busy", false, data);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }else{
                _.extend(ReducedTempResources, costBuilding);
                cc.log("upgrade nha "+ this._name);
                
                NETWORK.sendRequestUpgradeConstruction(this);
            }
        } else{
            if(gv.user.coin < gResources){
                showPopupNotEnoughG('upgrade');
            }else{
                this.cost = costBuilding;
                data = {type:getLackingResources(costBuilding), building:this, g:gResources};
                popup = new ShowUpgradePopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to buy lacking resources", false, data);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }
        }
    },

    upgradeComplete: function(isQuickFinish) {
        if(!isQuickFinish){
            NETWORK.sendFinishTimeConstruction(this._id);
            temp.buildingFinishTime = this;
        }
        this._level = this._level + 1;

        // cho tuong thanh
        this.greenBG = null;
        this.redBG = null;

        this.buildingImg && MAP.removeChild(this.buildingImg);
        this.buildingImg = null;
        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;

        this.addBuildingImg();
        this.levelText.setString('cấp ' + this._level);
        this.presentImg();
        this.showLevelUpEffect();
        this.setStatus('complete');
        this.setStartTime();

        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                contructionList[item].startTime = this.startTime;
                contructionList[item].level = this._level;
                cc.log("============================= Level hien tai construction list: " + contructionList[item].level);
                break;
            }
        }
        updateGUI();

        if(this._name == 'CLC_1' && this._level == 1){
            var btnGuild = ccui.Button('res/Art/GUIs/Chat/button chinh.png', 'res/Art/GUIs/Chat/button chinh.png');
            btnGuild.setPosition(btnGuild.width/2, cc.winSize.height/2);
            btnGuild.addClickEventListener(LOBBY.onInteractiveGuild.bind(LOBBY));
            LOBBY.addChild(btnGuild);
        }


        this.updateArmyCampCapacity();
        this.updateAfterUpgradeComplete();
        
        // fix bug trường hợp nhà collector có nút thu hoạch
        this.collect_bg = null;
        this.full_bg = null;
        // cập nhật hình ảnh tường sau khi upgrade thành công
        if(this._name === "WAL_1") {
            this.updatePresentImg({ x: this._posX, y: this._posY });
        }
    },
    cancel: function(building){
        temp.buildingCancel = building;
        NETWORK.sendCancel(building._id);
        //if (this._status == 'upgrade') this.cancelUpgrade();
        //else if (this._status == 'pending') this.cancelBuild();
    },
    cancelUpgrade: function() {
        this.timeBar && MAP.removeChild(this.timeBar);
        this.upgradeBarrier && this.buildingImg.removeChild(this.upgradeBarrier);
        this.timeBar = null;
        this.setStatus('complete');
        this.setStartTime();
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].status = 'complete';
                contructionList[item].startTime = this.startTime;
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

        updateGUI();
        this.updateAfterCancelUpgrade();
    },
    cancelBuild: function() {
        var self = this;
        var newContructionList = contructionList.filter(function(element) {
            if (element._id === self._id) return false;
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

        updateGUI();
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
        var self = this;
        var newContructionList = contructionList.filter(function(element) {
                if (element._id == self._id) return false;
                return true;
            });
        contructionList = newContructionList;
        this.removeImg();
        MAP.createLogicArray(contructionList, obstacleLists);
    },
    removeImg:function(){

    },

    addTimeBar: function(cur, max) {
        if(temp.statusRequest && this._name == "CLC_1" || this._status == 'complete'){
            //de trong
            cc.log("=============== HIEN THI REQUEST ==========================");
        }else{
            cc.log("=============== KHONG HIEN THI REQUEST ==========================");
            var upgradeBarrier = new cc.Sprite('res/Art/Map/map_obj_bg/upgrading.png');
            this.upgradeBarrier = upgradeBarrier;
            upgradeBarrier.attr({
                x: this.buildingImg.width / 2,
                y: this.buildingImg.height / 2 - TILE_WIDTH / 2,
                scale: this._width * 3 / 4
            });
            this.buildingImg.addChild(upgradeBarrier, 1000);
        }

        var timeBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
        this.timeBar = timeBar;
        var coor = this.xyOnMap(this._posX, this._posY);
        timeBar.attr({
            x: coor.x,
            y: coor.y + (this._height / 2) * TILE_HEIGHT + 60
        });
        MAP.addChild(timeBar, 1100);

        var processBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
        this.processBar = processBar;
        processBar.attr({
            anchorX: 0,
            anchorY: 0
        });
        timeBar.addChild(processBar);

        var ratio = cur / max;

        processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, res.font_soji[16]);
        this.timeText = timeText;
        timeText.attr({
            x: timeBar.width / 2,
            y: 42
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
        var lvUpAnims = ui.makeAnimation('construct_levelup/', 0, 6, 0.075);
        var lvUpEffSprite = new cc.Sprite();
        MAP.addChild(lvUpEffSprite, 1100);
        lvUpEffSprite.attr({
            x: this.buildingImg.x -TILE_WIDTH / 8,
            y: this.buildingImg.y + TILE_HEIGHT * (this._height + 1) / 2,
            scale: this._width
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
    armyRun: function() {
        // để rỗng
    },
    addArmy: function() {
        // để rỗng
        cc.log("Đây không phải nhà để chứa lính");
    },
    updateWhenStartUpgrade: function() {
        // de trong
    },
    updateAfterBuildComplete: function() {
        // để trống
    },
    updateAfterUpgradeComplete: function() {
        // để trống
    },
    updateAfterCancelUpgrade: function() {
        // để trống
    },
    updateArmyCampCapacity: function() {
        // de trong
    },

    addTimeBarTrain: function(cur, max) {
        // de trong
    },

    addTimeBarRequest: function(cur, max) {
        //de trong
    },

    updateTimeBarRequest: function(cur, max) {
        //de trong
    },

    updateListBuildingRef: function() {
        if (this._name === "AMC_1") armyCampRefs.push(this);
        if (this instanceof StorageBuilding) storageBuildingRefs.push(this);
        if (this._name === "BAR_1") barrackRefs.push(this);
        if (this._name === "WAL_1") wallRefs.push(this);
    },
    countDown: function(cur, max){
        var tick = () => {
            setTimeout(() => {
                cur = (getCurrentServerTime() - this.startTime)/1000;
                if (cur >= max) {
                    temp.buildingFinishTime = this;
                    NETWORK.sendFinishTimeConstruction(this._id);
                    return;
                } else {
                    this.updateTimeBar(cur, max);
                    if(this._status == PENDING || this._status == UPGRADE){
                        tick();
                    }
                }
            }, 1000);
        }
        //Chay 1 lan
        tick();
    },


    countDownRequest: function(cur, max){
        var tick = () => {
            setTimeout(() => {
                cur = (getCurrentServerTime() - gv.user.lastRequestTroopTimeStamp)/1000;
            max = TIME_REQUEST_TROOP/1000;
            if (cur >= max || !this.timeBarRequest) {
                this.timeBarRequest && MAP.removeChild(this.timeBarRequest);
                this.timeBarRequest = null;
                return;
            } else {
                this.updateTimeBarRequest(cur, max);
                tick();
            }
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
                case 'RES_3':
                    cc.audioEngine.playEffect(sRes.darkelixirdrill_pickup);
                    break;
                case 'STO_3':
                    cc.audioEngine.playEffect(sRes.elixirpump_pickup);
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
                case 'WAL_1':
                    cc.audioEngine.playEffect(sRes.wall_pickup);
                    break;
                default:
                    cc.audioEngine.playEffect(sRes.wall_pickup);
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
                case 'RES_3':
                    cc.audioEngine.playEffect(sRes.darkelixirdrill_place);
                    break;
                case 'STO_3':
                    cc.audioEngine.playEffect(sRes.elixirpump_place);
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
                case 'WAL_1':
                    cc.audioEngine.playEffect(sRes.wall_place);
                    break;
                default:
                    cc.audioEngine.playEffect(sRes.wall_place);
                    break;
            }
        }
    },
    playBuildCompleteSound: function() {
        if (SOUND) cc.audioEngine.playEffect(sRes.building_finish);
    },
});
