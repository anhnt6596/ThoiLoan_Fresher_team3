var ClanCastle = Building.extend({
    ctor: function(info, userInfo) {
        this._super(info);
    },
    addBuildingImg: function() {
        var dir = res.building.clanCastle[this._level];
        var buildingImg = new cc.Sprite(dir);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
    },
});