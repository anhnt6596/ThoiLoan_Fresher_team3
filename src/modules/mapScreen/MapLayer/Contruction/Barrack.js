var Barrack = Building.extend({
    img_x: -131,
    img_y: -160,
    ctor: function(info) {
        this._super(info);
        this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.barrack[this.info.level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this.info.posX, y: this.info.posY });
        MAP.addChild(buildingImg, zOrder);
        if (this.info.level >= 4) {
            var animsDir = this.info.level <= 8 ? 'BAR_1_' + this.info.level + '_effect_' : 'BAR_1_8_effect_';
            var buildingAnim = ui.makeAnimation(animsDir, 0, 5, 0.2);
            var animSprite = new cc.Sprite();
            buildingImg.addChild(animSprite, 11);
            animSprite.attr({
                x: buildingImg.width / 2,
                y: buildingImg.height / 2,
            });
            animSprite.runAction(buildingAnim.repeatForever());
        }
    }
});