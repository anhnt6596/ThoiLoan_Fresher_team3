var Barrack = Building.extend({
    img_x: -131,
    img_y: -160,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImage = new cc.Sprite('res/Art/Buildings/barrack/BAR_1_'+ this.info.level +'/idle/image0000.png');
        buildingImage.anchorX = 0;
        buildingImage.anchorY = 0;
        buildingImage.x = this.img_x;
        buildingImage.y = this.img_y;
        this.addChild(buildingImage, 10);
    }
});