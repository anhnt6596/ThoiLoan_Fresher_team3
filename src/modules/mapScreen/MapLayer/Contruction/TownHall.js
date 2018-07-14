var TownHall = Building.extend({
    img_x: -50,
    img_y: -40,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var level = this.info.level || 1;
        var dir = 'res/Art/Buildings/townhall/TOW_1_'+ level +'/idle/image0000.png';
        var buildingImg = new cc.Sprite(dir);
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