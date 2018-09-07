var ResourceBar = cc.Sprite.extend({
    ctor: function(x, y, type, userInfo) {
        this._super(res.gui.res_bg);
        cc.log('>>>>>>', userInfo.maxCapacityGold);
        this.x = x;
        this.y = y;
        this.scale = 1.25;
        this.type = type;
        var resValueBar = res.gui.gold_bar;
        var resIcon = res.gui.gold_icon;
        var maxTextValue = 'Max: 0';
        var textValue = '0';
        var ratio = 0;
        switch (this.type) {
            case 'gold':
                resValueBar = res.gui.gold_bar;
                resIcon = res.gui.gold_icon;
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityGold || 0);
                textValue = formatNumber(userInfo.gold || 0);
                ratio = userInfo.gold / userInfo.maxCapacityGold || 0;
                break;
            case 'elixir':
                resValueBar = res.gui.elixir_bar;
                resIcon = res.gui.elixir_icon;
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityElixir || 0);
                textValue = formatNumber(userInfo.elixir || 0);
                ratio = userInfo.elixir / userInfo.maxCapacityElixir || 0;
                break;
            case 'dark_elixir':
                resValueBar = res.gui.dark_elixir_bar;
                resIcon = res.gui.dark_elixir_icon;
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityDarkElixir || 0);
                textValue = formatNumber(userInfo.darkElixir || 0);
                ratio = userInfo.darkElixir / userInfo.maxCapacityDarkElixir || 0;
                break;
            default:
                break;
        }
        if (ratio > 1) ratio = 1;
        if (ratio < 0) ratio = 0;

        var valueBar = new ccui.LoadingBar(resValueBar);
        this.valueBar = valueBar;
        valueBar.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0.5,
            y: 6.5,
            // scale: 0.95,
        });
        valueBar.setDirection(ccui.LoadingBar.TYPE_RIGHT);
        valueBar.setPercent(ratio * 100);
        this.addChild(valueBar);


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
        this.addChild(valueText, 10);

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
                // textValue = formatNumber(userInfo.gold || 0);
                textValue = userInfo.gold || 0;
                ratio = userInfo.gold / userInfo.maxCapacityGold || 0;
                break;
            case 'elixir':
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityElixir || 0);
                // textValue = formatNumber(userInfo.elixir || 0);
                textValue = userInfo.elixir || 0;
                ratio = userInfo.elixir / userInfo.maxCapacityElixir || 0;
                break;
            case 'dark_elixir':
                maxTextValue = 'Max: ' + formatNumber(userInfo.maxCapacityDarkElixir || 0);
                // textValue = formatNumber(userInfo.darkElixir || 0);
                textValue = userInfo.darkElixir || 0;
                ratio = userInfo.darkElixir / userInfo.maxCapacityDarkElixir || 0;
                break;
            default:
                break;
        }
        if (ratio > 1) ratio = 1;
        if (ratio < 0) ratio = 0;
        this.setValueBarPercent(ratio);
        
        this.maxText.setString(maxTextValue);
        // this.valueText.setString(textValue);
        changeValueTextEffect(this.valueText, textValue);
    },
    setValueBarPercent: function(ratio) {
        var self = this;

        var newPercent = ratio * 100;
        var oldPercent = this.valueBar.getPercent();
        if (oldPercent == newPercent) return;
        var diff = Math.abs(newPercent - oldPercent);
        var changePerTick = newPercent > oldPercent ? 1 : -1;
        var curPercent = oldPercent;
        var count = 0;
        var tick = function() {
            setTimeout(function() {
                count += 1;
                curPercent += changePerTick;
                self.valueBar.setPercent(curPercent);
                if (count >= diff) {
                    self.valueBar.setPercent(newPercent);
                } else {
                    tick();
                }
            }, 5);
        };
        tick();
    }
});