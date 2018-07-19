var GBar = cc.Sprite.extend({
    ctor: function(x, y, value = 0) {
        this._super('res/Art/GUIs/Main_Gui/bg_bar_3.png');
        this.x = x;
        this.y = y;
        this.scale = 1.25;
        var resIcon = 'res/Art/GUIs/Main_Gui/g_icon.png';
        var ratio = 0.5;

        var valueText = new cc.LabelBMFont(value, 'res/Art/Fonts/soji_16.fnt');
        this.valueText = valueText;
        valueText.attr({
            anchorX: 1,
            anchorY: 0,
            x: 98,
            y: 4,
            scale: 0.9
        });
        this.addChild(valueText);

        var icon = new cc.Sprite(resIcon);
        icon.attr({
            anchorX: 0,
            anchorY: 0,
            x: 100,
            y: 0,
        });
        this.addChild(icon);
    },
    update: function(userInfo) {
        this.valueText.setString(formatNumber(userInfo.coin));
    }
});