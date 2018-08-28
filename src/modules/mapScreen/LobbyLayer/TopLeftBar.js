var TopLeftBar = cc.Node.extend({
    ctor: function(x, y, userInfo) {
        this._super();
        this.x = x;
        this.y = y;
        var avartar = new cc.Sprite(res.gui.bg_exp);
        this.addChild(avartar, 5);
        // EXP
        var expBgBar = new cc.Sprite(res.gui.exp_bg_bar);
        expBgBar.attr({
            x: 64,
            y: 18,
        });
        this.addChild(expBgBar, 0);
        var expIcon = new cc.Sprite(res.gui.ic_exp);
        expIcon.attr({
            x: 126,
            y: 22,
        });
        this.addChild(expIcon, 5);
        var expBar = new cc.Sprite(res.gui.exp_bar);
        expBar.attr({
            x: 64,
            y: 18,
        });
        this.addChild(expBar, 2);
        // TROPHY
        var trophyBgBar = new cc.Sprite(res.gui.trophy_bg_bar);
        trophyBgBar.attr({
            x: 64,
            y: -18,
        });
        this.addChild(trophyBgBar, 0);
        var rankIcon = new cc.Sprite(res.gui.ranking);
        rankIcon.attr({
            x: 126,
            y: -18,
        });
        this.addChild(rankIcon, 5);
        var nameText = userInfo.name || 'Fresher 9 - Team 3';
        var name = new cc.LabelBMFont(nameText, res.font_soji[24]);
        name.attr({
            anchorX: 0,
            x: -36,
            y: 52,
        });
        this.addChild(name);
    },
});