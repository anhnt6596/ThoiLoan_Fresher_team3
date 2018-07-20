var TownHall = Building.extend({
    img_x: -50,
    img_y: -40,
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
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
    }
});