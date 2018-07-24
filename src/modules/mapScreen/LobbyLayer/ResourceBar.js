var ResourceBar = cc.Sprite.extend({
    ctor: function(x, y, type, userInfo) {
        this._super('res/Art/GUIs/Main_Gui/bg_bar_2.png');
        cc.log('>>>>>>', userInfo.maxCapacityGold);
        this.x = x;
        this.y = y;
        this.scale = 1.25;
        this.type = type;
        var resValueBar = 'res/Art/GUIs/Main_Gui/gold_bar.png';
        var resIcon = 'res/Art/GUIs/Main_Gui/gold_icon.png';
        var maxTextValue = 'Max: 0';
        var textValue = '0';
        var ratio = 0;
        switch (this.type) {
            case 'gold':
                resValueBar = 'res/Art/GUIs/Main_Gui/gold_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/gold_icon.png';
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityGold || 0);
                textValue = formatNumber(userInfo.gold || 0);
                ratio = userInfo.gold / userInfo.maxCapacityGold || 0;
                break;
            case 'elixir':
                resValueBar = 'res/Art/GUIs/Main_Gui/elixir_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/elixir_icon.png';
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityElixir || 0);
                textValue = formatNumber(userInfo.elixir || 0);
                ratio = userInfo.elixir / userInfo.maxCapacityElixir || 0;
                break;
            case 'dark_elixir':
                resValueBar = 'res/Art/GUIs/Main_Gui/darkElixir_bar.png';
                resIcon = 'res/Art/GUIs/Main_Gui/darkElixir_icon.png';
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityDarkElixir || 0);
                textValue = formatNumber(userInfo.darkElixir || 0);
                ratio = userInfo.darkElixir / userInfo.maxCapacityDarkElixir || 0;
                break;
            default:
                break;
        }
        if (ratio > 1) ratio = 1;
        if (ratio < 0) ratio = 0;
        var valueBar = new cc.Sprite(resValueBar);
        this.valueBar = valueBar;
        valueBar.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5,
            y: 6.5,
            // scale: 0.95,
        });
        this.addChild(valueBar);

        valueBar.setTextureRect(cc.rect(valueBar.width * (1 - ratio), 0, valueBar.width, valueBar.height));
        valueBar.x = 0.5 + (1 - ratio) * valueBar.width;

        var maxText = new cc.LabelBMFont(maxTextValue, 'res/Art/Fonts/soji_12.fnt');
        this.maxText = maxText;
        maxText.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 27,
            scale: 0.95
        });
        this.addChild(maxText);

        var valueText = new cc.LabelBMFont(textValue, 'res/Art/Fonts/soji_16.fnt');
        this.valueText = valueText;
        valueText.attr({
            anchorX: 1,
            anchorY: 0,
            x: 118,
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
    },
    update: function(userInfo) {
        var maxTextValue = 'Max: 0';
        var textValue = '0';
        var ratio = 0;
        switch (this.type) {
            case 'gold':
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityGold || 0);
                cc.log('>>>>>>>>>>>>>dbnfdjsbgvjsdngj>', userInfo.maxCapacityGold);
                textValue = formatNumber(userInfo.gold || 0);
                ratio = userInfo.gold / userInfo.maxCapacityGold || 0;
                break;
            case 'elixir':
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityElixir || 0);
                textValue = formatNumber(userInfo.elixir || 0);
                ratio = userInfo.elixir / userInfo.maxCapacityElixir || 0;
                break;
            case 'dark_elixir':
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityDarkElixir || 0);
                textValue = formatNumber(userInfo.darkElixir || 0);
                ratio = userInfo.darkElixir / userInfo.maxCapacityDarkElixir || 0;
                break;
            default:
                break;
        }
        if (ratio > 1) ratio = 1;
        if (ratio < 0) ratio = 0;
        this.valueBar.setTextureRect(cc.rect(this.valueBar.width * (1 - ratio), 0, this.valueBar.width, this.valueBar.height));
        this.valueBar.x = 0.5 + (1 - ratio) * this.valueBar.width;
        
        this.maxText.setString(maxTextValue);
        this.valueText.setString(textValue);
    },
});