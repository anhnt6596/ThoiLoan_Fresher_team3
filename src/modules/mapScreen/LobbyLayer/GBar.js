var GBar = cc.Sprite.extend({
    ctor: function(x, y, value = 0) {
        this._super(res.gui.g_bg);
        this.x = x;
        this.y = y;
        this.scale = 1.25;

        var valueText = new cc.LabelBMFont(formatNumber(value), res.font_soji[16]);
        this.valueText = valueText;
        valueText.attr({
            anchorX: 1,
            anchorY: 0,
            x: 98,
            y: 4,
            scale: 0.9
        });
        this.addChild(valueText);

        var icon = new cc.Sprite(res.gui.g_icon);
        icon.attr({
            anchorX: 0,
            anchorY: 0,
            x: 100,
            y: 0,
        });
        this.addChild(icon);
    },
    update: function(userInfo) {
        // this.valueText.setString(formatNumber(userInfo.coin));
        changeValueTextEffect(this.valueText, userInfo.coin);
    }
});