var Barrack = Building.extend({
    _imgTroop:{},
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.barrack[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
        if (this._level >= 4) {
            var animsDir = this._level <= 8 ? 'BAR_1_' + this._level + '_effect/' : 'BAR_1_8_effect/';
            var buildingAnim = ui.makeAnimation(animsDir, 0, 5, 0.2);
            var animSprite = new cc.Sprite();
            buildingImg.addChild(animSprite, 11);
            animSprite.attr({
                x: buildingImg.width / 2,
                y: buildingImg.height / 2
            });
            animSprite.runAction(buildingAnim.repeatForever());
        }
    },

    updateAfterBuildComplete: function() {
        //Khi 1 barrack duoc xay xong thi cap nhat lai BarrackQueueList
        var barrackQueue = new BarrackQueue(this._id, 1, 0);
        barrackQueue._isFirst = true;
        barrackQueue.isUpgrade = false;
        barrackQueueList.push(barrackQueue);
    },

    updateAfterUpgradeComplete: function() {
        var barrackQueue = getBarrackQueueById(this._id);
        //Cap nhat startTime cho barrack
        barrackQueue._startTime = getCurrentServerTime() - barrackQueue._startTime;
        barrackQueue.isUpgrade = false;

        //Neu chua co linh train thi khong cowntdown
        if(BARRACK[this._id]){
            BARRACK[this._id].countDown();
            if(!this.timeBar){
                this.addTimeBarTrain(0, 20);
            }
        }
    },

    updateAfterCancelUpgrade: function() {
        //Cap nhat startTime cho barrack
        var barrackQueue = getBarrackQueueById(this._id);

        barrackQueue._startTime = getCurrentServerTime() - barrackQueue._startTime;
        barrackQueue.isUpgrade = false;
        //Neu chua co linh train thi khong cowntdown
        if(BARRACK[this._id]){
            BARRACK[this._id].countDown();
            if(!this.timeBar){
                this.addTimeBarTrain(0, 20);
            }
        }
    },

    updateWhenStartUpgrade: function() {
        var barrackQueue = getBarrackQueueById(this._id);
        //Cap nhat startTime cho barrack
        barrackQueue._startTime = getCurrentServerTime() - barrackQueue._startTime;
        //Dung countdown cua barrack nay
        barrackQueue.isUpgrade = true;
        if(this.timeBar){
            MAP.removeChild(this.timeBar);
            this.timeBar = null;
        }
    },

    addTimeBarTrain: function(cur, max) {
        var timeBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
        this.timeBar = timeBar;
        var coor = this.xyOnMap(this._posX, this._posY);
        timeBar.setPosition(coor.x, coor.y + (this._height / 2) * TILE_HEIGHT + 60);
        MAP.addChild(timeBar, 1100);

        var processBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
        this.processBar = processBar;
        processBar.setAnchorPoint(0, 0);
        timeBar.addChild(processBar);

        var ratio = cur / max;
        processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, res.font_soji[16]);
        this.timeText = timeText;
        timeText.setPosition(timeBar.width / 2, 42);
        timeBar.addChild(timeText);

        //this.initTroopImages();

        //Hinh anh linh
        //if(BARRACK[this._id] && BARRACK[this._id].getFirstItemInQueue()) {
        //    var troopName = BARRACK[this._id].getFirstItemInQueue()._name;
        //    this.visibleImageTroop(troopName);
        //}

        timeBar.visible = false;
    },

    updateTimeBar: function(cur, max) {
        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacity = getTotalCurrentTroopCapacity();
        if(BARRACK[this._id]){
            var firstItem = BARRACK[this._id].getFirstItemInQueue();
        }

        var condition1 = BARRACK[this._id] && !BARRACK[this._id]._statusCountDown && (this._status != UPGRADE);
        var condition2 = BARRACK[this._id] && BARRACK[this._id]._statusCountDown && BARRACK[this._id].wait && (this._status != UPGRADE);
        var condition3 = (currentCapacity + (firstItem ? firstItem._housingSpace : 0)  > totalCapacity) && (Math.ceil(cur) >= max);
        if(condition1 || condition2 || condition3) {

            if (this.timeBar) {
                MAP.removeChild(this.timeBar);
                this.timeBar = null;
                return;
            }
        }

        if (this.timeBar) {
            this.timeBar.visible = true;
            var ratio = cur / max;
            var t = timeToReadable(max - cur);
            this.processBar.setTextureRect(cc.rect(0, 0, this.timeBar.width * ratio, this.timeBar.height));
            this.timeText.setString(t);

            //Hinh anh linh
            //if(BARRACK[this._id] && BARRACK[this._id].getFirstItemInQueue()){
            //    var troopName = BARRACK[this._id].getFirstItemInQueue()._name;
            //    cc.log("============ DAY LA BARRACK id: " + this._id);
            //    cc.log('============ VISIBLE TROOP: ' + troopName);
            //    cc.log('============ Barrack id: ' + this._id);
            //    this.visibleImageTroop(troopName);
            //}
        }
    },
    
    initTroopImages: function() {
        for (var i = 0; i < 4; i++) {
            var a = i + 1;
            var name = 'ARM_' + a;

            this._imgTroop[name] = this.createImageTroop(name);
            this.timeBar.addChild(this._imgTroop[name]);
            this._imgTroop[name].setAnchorPoint(0, 0);
            this._imgTroop[name].setPosition(-40, -5);
            this._imgTroop[name].setScale(0.4);
            this._imgTroop[name].visible = false;
        }
    },
    
    visibleImageTroop: function (troopName) {
        for (var i = 0; i < 4; i++) {
            var a = i + 1;
            var name = 'ARM_' + a;

            if(name == troopName && this._imgTroop[name]){
                this._imgTroop[name].visible = true;
            } else if(this._imgTroop[name]) {
                this._imgTroop[name].visible = false;
            }

        }
    },

    createImageTroop: function(troopName) {
        this._btn = new ccui.Button('res/Art/GUIs/train_troop_gui/slot.png');

        this._img = new cc.Sprite(train_troop_constant.img_train_troop_dir + troopName + '.png');
        this._img.setPosition(this._btn.width/2, this._btn.height/2);
        this._btn.addChild(this._img, 1);

        return this._btn;
    }
});