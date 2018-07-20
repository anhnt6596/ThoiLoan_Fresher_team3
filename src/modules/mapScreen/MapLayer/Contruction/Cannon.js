var Cannon = DefenseBuilding.extend({
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var level = this.info.level || 1;
        var dir = res.building.canon_base[level];
        var buildingImg = new cc.Sprite(dir);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            anchorX: 0.55,
            x: coor.x,
            y: coor.y,
        });

        var cannonImg = new cc.Sprite(res.building.canon[level][randomInt(0, 4)]);
        cannonImg.attr({
            x: buildingImg.width / 2 + 7,
            y: buildingImg.height / 2,
        });

        buildingImg.addChild(cannonImg);

        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
    }
});
