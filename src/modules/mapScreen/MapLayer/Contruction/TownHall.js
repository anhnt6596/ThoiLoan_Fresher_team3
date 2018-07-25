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
        var level = this.info.level || 1;
        var dir = res.building.townhall[this.info.level];
        var buildingImg = new cc.Sprite(dir);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
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