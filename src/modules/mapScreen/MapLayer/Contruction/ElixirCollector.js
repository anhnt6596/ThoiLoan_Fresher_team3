var ElixirCollector = CollectorBuilding.extend({
    img_x: -28,
    img_y: -50,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImage = new cc.Sprite('res/Art/Buildings/elixir collector/RES_2_' + this.info.level + '/idle/image0000.png');
        buildingImage.attr({
            anchorX: 0,
            anchorY: 0,
            x: this.img_x,
            y: this.img_y,
        });
        this.addChild(buildingImage, 10);
        var goldmineAnim = ui.makeAnimation('RES_2_' + this.info.level + '_effect_0', 0, 9, 0.2);
        var animSprite = new cc.Sprite();
        this.addChild(animSprite, 11);
        animSprite.anchorX = 0;
        animSprite.anchorY = 0;
        animSprite.x = this.img_x;
        animSprite.y = this.img_y;
        animSprite.runAction(goldmineAnim.repeatForever());
    }
});