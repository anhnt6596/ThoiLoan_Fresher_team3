var Building = Contruction.extend({
    img_x: -31,
    img_y: -52,
    ctor: function(info) {
        this._super(info);
        this.initGrass();
    },
    initGrass: function() {
        var resGrass = 'res/Art/Map/map_obj_bg/BG_0/' + this.info.width + '.png';
        var grass = new cc.Sprite(resGrass);
        this.grass = grass;
        grass.anchorX = 0;
        grass.anchorY = 0;
        grass.scale = 2;
        this.addChild(grass, 0);
    },
});