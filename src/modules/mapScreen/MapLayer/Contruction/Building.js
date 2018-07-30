var Building = Contruction.extend({
    ctor: function(info) {
        this._super(info);
        this.initGrass();
    },
    initGrass: function() {
        var resGrass = res.map.grass[this._width];
        var grass = new cc.Sprite(resGrass);
        this.grass = grass;
        var coor = this.xyOnMap(this._posX, this._posY);
        grass.attr({
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(grass, Z.BUILDING_GRASS);
    },
});
