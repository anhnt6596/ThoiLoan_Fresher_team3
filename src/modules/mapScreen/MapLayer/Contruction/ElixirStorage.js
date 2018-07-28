var ElixirStorage = StorageBuilding.extend({
    img_x: -40,
    img_y: -72,
    ctor: function(info, userInfo) {
        this._super(info, userInfo);
        // this.addBuildingImg();
        // this.presentImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Node();
        buildingImg.setCascadeColorEnabled(true); 
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);

        var buildingImage = [];
        for (var i = 0; i < 4; i++) {
            buildingImage[i] = new cc.Sprite(res.building.elixir_storage[this._level][i]);
            buildingImage[i].attr({
                opacity: 0,
            });
            buildingImg.addChild(buildingImage[i], 10);
        }
        this.buildingImage = buildingImage;
    }
});