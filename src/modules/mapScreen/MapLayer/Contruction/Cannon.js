var Cannon = DefenseBuilding.extend({
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
    },
    addBuildingImg: function() {
        var level = this._level || 1;
        var dir = res.building.canon_base[level];
        var buildingImg = new cc.Sprite(dir);
        buildingImg.setCascadeColorEnabled(true); 
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });

        var cannonImg = new cc.Sprite(res.building.canon[level][randomInt(0, 4)]);
        cannonImg.attr({
            x: buildingImg.width / 2 + 7,
            y: buildingImg.height / 2,
        });

        buildingImg.addChild(cannonImg, 1);

        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        this.initRange();
        MAP.addChild(buildingImg, zOrder);
    },
    initRange: function() {
        var rootP = new cc.p(this.buildingImg.width / 2, this.buildingImg.height / 2);
        var radius = TILE_WIDTH * 3;
        var color1 = new cc.Color(232, 234, 80, 80);
        var color2 = new cc.Color(232, 234, 80, 30);

        var range = new cc.DrawNode();
        this.rangeLine = range;
        range.drawCircle(rootP, radius, 50, 200, false, 2, color1);
        range.drawDot(rootP, radius, color2);

        this.buildingImg.addChild(range);
        range.attr({ scaleX: TILE_WIDTH / TILE_HEIGHT });
        range.setVisible(false);
    }
});
