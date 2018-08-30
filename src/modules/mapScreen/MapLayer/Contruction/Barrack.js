var Barrack = Building.extend({
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
    updateBarrackQueueList: function() {
        //Khi 1 barrack duoc xay xong thi cap nhat lai BarrackQueueList
        barrackQueueList[this._id] = {};
        barrackQueueList[this._id].flagCountDown = true;
        barrackQueueList[this._id]._amountItemInQueue = 0;
        barrackQueueList[this._id]._totalTroopCapacity = 0;
        barrackQueueList[this._id]._startTime = 0;
        barrackQueueList[this._id]._troopList = {};
        barrackQueueList[this._id]._troopList['ARM_1'] = new TroopInBarrack('ARM_1', 0, -1);
    },
    updateBarrackQueueListAfterUpgradeComplete: function() {
        //Khi 1 barrack duoc xay xong thi cap nhat lai BarrackQueueList
        var troopType = config.building['BAR_1'][this._level].unlockedUnit;
        barrackQueueList[this._id]._troopList[troopType] = new TroopInBarrack(troopType, 0, -1);

        //Cap nhat startTime cho barrack
        barrackQueueList[this._id]._startTime = getCurrentServerTime() - barrackQueueList[this._id]._startTime;
        barrackQueueList[this._id].flagCountDown = true;
        //Neu chua co linh train thi khong cowntdown
        if(BARRACK[this._id]){
            BARRACK[this._id].countDown();
            //Hien thi timebar ben ngoai
            if(!this.timeBar){
                this.addTimeBarTrain(0, 20);
            }
        }
    },

    addTimeBarTrain: function(cur, max) {

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

        //var t = timeToString(max - cur);
        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, 'res/Art/Fonts/soji_16.fnt');
        this.timeText = timeText;
        timeText.attr({
            x: timeBar.width / 2,
            y: 42
        });
        timeBar.addChild(timeText);

        timeBar.visible = false;
    },

    updateTimeBar: function(cur, max) {
        if(BARRACK[this._id] && !BARRACK[this._id]._statusCountDown && (objectRefs[this._id]._status != 'upgrade')){
            if(this.timeBar){
                MAP.removeChild(this.timeBar);
                this.timeBar = null;
                cc.log("======================= DAY 1 ======================");
                return;
            }
        }

        var condition = BARRACK[this._id] && BARRACK[this._id]._statusCountDown && BARRACK[this._id].wait && (objectRefs[this._id]._status != 'upgrade');
        if(condition){
            MAP.removeChild(this.timeBar);
            this.timeBar = null;
            cc.log("======================= DAY 2 ======================");

            return;
        }

        if (this.timeBar) {
            this.timeBar.visible = true;
            var ratio = cur / max;
            //var t = timeToString(max - cur);
            var t = timeToReadable(max - cur);
            this.processBar.setTextureRect(cc.rect(0, 0, this.timeBar.width * ratio, this.timeBar.height));
            this.timeText.setString(t);
        }
    },
});