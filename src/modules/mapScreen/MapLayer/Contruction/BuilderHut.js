var MAP = MAP || null;

var BuilderHut = Building.extend({
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.builder_hut);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        // buildingImg.attr({
        //     anchorX: 0,
        //     anchorY: 0,
        //     x: coor.x + this.img_x,
        //     y: coor.y + this.img_y,
        // });
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
    },
    upgrade: function() {
        cc.log('Nhà này không upgrade được');
    },
});
