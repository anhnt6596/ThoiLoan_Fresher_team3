var ElixirStorage = StorageBuilding.extend({
    img_x: -40,
    img_y: -72,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
        this.presentImg();
    },
    addBuildingImg: function() {
        var buildingImage = [];
        for (var i = 0; i < 4; i++) {
            buildingImage[i] = new cc.Sprite('res/Art/Buildings/elixir storage/STO_2_'+ this.info.level +'/idle/image000' + i + '.png');
            buildingImage[i].attr({
                anchorX: 0,
                anchorY: 0,
                x: this.img_x,
                y: this.img_y,
                opacity: 0,
            });
            this.addChild(buildingImage[i], 10);
        }
        this.buildingImage = buildingImage;
    }
});