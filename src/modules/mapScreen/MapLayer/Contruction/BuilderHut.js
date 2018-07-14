var MAP = MAP || null;

var BuilderHut = Building.extend({
    img_x: -31,
    img_y: -52,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.builder_hut);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            anchorX: 0,
            anchorY: 0,
            x: coor.x + this.img_x,
            y: coor.y + this.img_y,
        });
        var zOrder = 1000 - (this.info.posX + this.info.posY + (this.info.height - 3) / 2) * 10;
        MAP.addChild(buildingImg, zOrder);
    }
});
