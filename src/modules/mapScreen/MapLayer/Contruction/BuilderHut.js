var BuilderHut = Building.extend({
    img_x: -31,
    img_y: -52,
    ctor: function(info) {
        this._super(info);
        this.addBuilderHutImg();
    },
    addBuilderHutImg: function() {
        var builderHutImage = new cc.Sprite(res.building.builder_hut);
        builderHutImage.anchorX = 0;
        builderHutImage.anchorY = 0;
        builderHutImage.x = this.img_x;
        builderHutImage.y = this.img_y;
        this.addChild(builderHutImage, 10);
    }
});