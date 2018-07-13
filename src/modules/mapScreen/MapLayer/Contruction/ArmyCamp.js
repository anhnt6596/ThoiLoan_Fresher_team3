var ArmyCamp = Building.extend({
    img_x: 0,
    img_y: 0,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImage = new cc.Sprite('res/Art/Buildings/army camp/AMC_1_'+ this.info.level +'/idle/image0000.png');
        buildingImage.anchorX = 0;
        buildingImage.anchorY = 0;
        buildingImage.x = this.img_x;
        buildingImage.y = this.img_y;
        this.addChild(buildingImage, 10);
    }
});