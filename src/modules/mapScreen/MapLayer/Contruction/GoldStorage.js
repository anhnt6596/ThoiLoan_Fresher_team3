var GoldStorage = StorageBuilding.extend({
    img_x: -78,
    img_y: -105,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
        this.presentImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Node();
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

        var buildingImage = [];
        for (var i = 0; i < 4; i++) {
            buildingImage[i] = new cc.Sprite('res/Art/Buildings/gold storage/STO_1_'+ this.info.level +'/idle/image000' + i + '.png');
            buildingImage[i].attr({
                anchorX: 0,
                anchorY: 0,
                opacity: 0,
            });
            buildingImg.addChild(buildingImage[i], 10);
        }
        this.buildingImage = buildingImage;
    }
});