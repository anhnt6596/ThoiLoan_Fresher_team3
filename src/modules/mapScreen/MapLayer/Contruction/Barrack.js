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
            var animsDir = this._level <= 8 ? 'BAR_1_' + this._level + '_effect_' : 'BAR_1_8_effect_';
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

        BARRACK[this._id].countDown();
    }
});