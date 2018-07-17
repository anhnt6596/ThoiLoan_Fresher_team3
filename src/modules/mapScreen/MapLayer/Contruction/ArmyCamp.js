var ArmyCamp = Building.extend({
    img_x: 0,
    img_y: 0,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.army_camp[this.info.level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            anchorX: 0,
            anchorY: 0,
            x: coor.x + this.img_x,
            y: coor.y + this.img_y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
    }
});