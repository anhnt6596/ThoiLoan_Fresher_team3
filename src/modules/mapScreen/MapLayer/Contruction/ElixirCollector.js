var ElixirCollector = CollectorBuilding.extend({
    img_x: -22,
    img_y: -44,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.elixir_collector[this.info.level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
        var elixirCollectorAnim = ui.makeAnimation('RES_2_' + this.info.level + '_effect_', 0, 9, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.attr({
            x: buildingImg.width / 2,
            y: buildingImg.height / 2,
        });
        animSprite.runAction(elixirCollectorAnim.repeatForever());
    }
});