var StorageBuilding = Building.extend({
    _maxStorage: 100,
    _curStorage: 0,
    ctor: function(info, userInfo) {
        this._super(info);
        this._maxStorage = config.building.STO_1[info.level].capacity;
        this._curStorage = this._maxStorage / userInfo.maxCapacityGold;
    },
    presentImg: function() {
        var self = this;
        var present = (4 * this._curStorage / this._maxStorage - 0.5).toFixed(0);
        if (present >= 4) present = 3;
        this.buildingImage.forEach(function(item, i) {
            if (i == present) self.buildingImage[i].opacity = 255;
            else self.buildingImage[i].opacity = 0;
        });
    },
    upgradePresentImg: function() {
        if (this.info.level < 11) this.upgradeComplete();
    },
    upgradeComplete: function() {
        this.info.level = this.info.level + 1;
        MAP.removeChild(this.buildingImg);
        this.addBuildingImg();

        this.levelText.setString('cấp ' + this.info.level);
        this.presentImg();
        this.showLevelUpEffect();
    }
});