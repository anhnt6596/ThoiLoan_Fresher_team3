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
            anchorX: 0,
            anchorY: 0,
            x: coor.x + this.img_x,
            y: coor.y + this.img_y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
        var elixirCollectorAnim = ui.makeAnimation('RES_2_' + this.info.level + '_effect_0', 0, 9, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.anchorX = 0;
        animSprite.anchorY = 0;
        animSprite.x = 0;
        animSprite.y = 0;
        animSprite.runAction(elixirCollectorAnim.repeatForever());
    }
});