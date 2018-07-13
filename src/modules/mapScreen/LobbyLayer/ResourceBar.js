var ResourceBar = cc.Sprite.extend({
    ctor: function(x, y, type) {
        this._super('res/Art/GUIs/Main_Gui/bg_bar_2.png');
        this.x = x;
        this.y = y;
        this.scale = 1.25;
        this.type = type;
        var resValueBar = 'res/Art/GUIs/Main_Gui/gold_bar.png';
        var resIcon = 'res/Art/GUIs/Main_Gui/gold_icon.png';
        switch (this.type) {
            case 'gold':
                resValueBar = 'res/Art/GUIs/Main_Gui/gold_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/gold_icon.png';
                break;
            case 'elixir':
                resValueBar = 'res/Art/GUIs/Main_Gui/elixir_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/elixir_icon.png';
                break;
            case 'dark_elixir':
                resValueBar = 'res/Art/GUIs/Main_Gui/darkElixir_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/darkElixir_icon.png';
                break;
            default:
                break;
        }
        var valueBar = new cc.Sprite(resValueBar);
        valueBar.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5,
            y: 6.5,
            // scale: 0.95,
        });
        this.addChild(valueBar);

        var maxText = new cc.LabelBMFont("Max: 4.000.000", 'res/Art/Fonts/soji_12.fnt');
        maxText.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 27,
            scale: 0.95
        });
        this.addChild(maxText);

        var valueText = new cc.LabelBMFont("4.000.000", 'res/Art/Fonts/soji_16.fnt');
        valueText.attr({
            anchorX: 0,
            anchorY: 0,
            x: 4,
            y: 4,
            scale: 0.9
        });
        this.addChild(valueText);

        var icon = new cc.Sprite(resIcon);
        icon.attr({
            anchorX: 0,
            anchorY: 0,
            x: 122,
            y: 0,
        });
        this.addChild(icon);
    }
});