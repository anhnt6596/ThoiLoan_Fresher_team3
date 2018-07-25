var GoldStorage = StorageBuilding.extend({
    ctor: function(info, userInfo) {
        this._super(info, userInfo);
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Node();
        buildingImg.setCascadeColorEnabled(true); 
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);

        var buildingImage = [];
        for (var i = 0; i < 4; i++) {
            buildingImage[i] = new cc.Sprite(res.building.gold_storage[this.info.level][i]);
            buildingImage[i].attr({
                opacity: 0,
            });
            buildingImg.addChild(buildingImage[i], 10);
        }
        this.buildingImage = buildingImage;
    }
});