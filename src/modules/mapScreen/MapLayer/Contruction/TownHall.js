var TownHall = Building.extend({
    _capacityGold: 100,
    _capacityElixir: 100,
    _capacityDarkElixir: 0,
    _curGoldStorage: 0,
    _curElixirStorage: 0,
    _curDarkElixirStorage: 0,
    ctor: function(info, userInfo) {
        this._super(info);
        this._capacityGold = 
        this.calculateStorage(info, userInfo);
    },
    addBuildingImg: function() {
        var level = this._level || 1;
        var dir = res.building.townhall[this._level];
        var buildingImg = new cc.Sprite(dir);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);

        if (this._level >= 7) {
            var townHallAnim1 = ui.makeAnimation('towhall_flame/', 0, 11, 0.1);
            var flame1 = new cc.Sprite();
            buildingImg.addChild(flame1, 11);
            flame1.attr({
                x: buildingImg.width / 2 + 49,
                y: buildingImg.height / 2 - 46,
            });
            flame1.runAction(townHallAnim1.repeatForever());

            var townHallAnim2 = ui.makeAnimation('towhall_flame/', 0, 11, 0.1);
            var flame2 = new cc.Sprite();
            buildingImg.addChild(flame2, 11);
            flame2.attr({
                x: buildingImg.width / 2 + 85,
                y: buildingImg.height / 2 - 19,
            });
            flame2.runAction(townHallAnim2.repeatForever());
        }
    },
    calculateStorage: function(info, userInfo) {
        this._capacityGold = config.building.TOW_1[info.level].capacityGold;
        this._capacityElixir = config.building.TOW_1[info.level].capacityElixir;
        this._capacityDarkElixir = config.building.TOW_1[info.level].capacityDarkElixir;
        // cc.log('this._capacityGold: ', this._capacityGold);
        this._curGoldStorage = userInfo.gold * this._capacityGold / userInfo.maxCapacityGold;
        this._curElixirStorage = userInfo.elixir * this._capacityElixir / userInfo.maxCapacityElixir;
        this._curDarkElixirStorage = userInfo.darkElixir * this._capacityDarkElixir / userInfo.maxCapacityDarkElixir;
    }
});