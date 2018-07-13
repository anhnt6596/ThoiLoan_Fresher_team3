var TextButton = cc.Sprite.extend({
    ctor: function(size, x, y, resImg, text) {
        this._super();
        var btn = ui.iconButton(size, x, y, resImg);
        this.addChild(btn);
        // btn.addClickEventListener(this.onOpenShop.bind(this));

        var valueText = new cc.LabelBMFont("text", 'res/Art/Fonts/soji_16.fnt');
        valueText.attr({
            anchorX: 0,
            anchorY: 0,
            x: 4,
            y: 4,
            scale: 0.9
        });
        this.addChild(valueText, 100);
    }
});
