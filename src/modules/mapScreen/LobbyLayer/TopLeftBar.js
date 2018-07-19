var TopLeftBar = cc.Node.extend({
    ctor: function(x, y, userInfo) {
        this._super();
        this.x = x;
        this.y = y;
        var avartar = new cc.Sprite('res/Art/GUIs/Main_Gui/bg_exp.png');
        this.addChild(avartar, 5);
        // EXP
        var expBgBar = new cc.Sprite('res/Art/GUIs/Main_Gui/exp_bg_bar.png');
        expBgBar.attr({
            x: 64,
            y: 18,
        });
        this.addChild(expBgBar, 0);
        var expIcon = new cc.Sprite('res/Art/GUIs/Main_Gui/ic_exp.png');
        expIcon.attr({
            x: 126,
            y: 22,
        });
        this.addChild(expIcon, 5);
        var expBar = new cc.Sprite('res/Art/GUIs/Main_Gui/exp_bar.png');
        expBar.attr({
            x: 64,
            y: 18,
        });
        this.addChild(expBar, 2);
        // TROPHY
        var trophyBgBar = new cc.Sprite('res/Art/GUIs/Main_Gui/trophy_bg_bar.png');
        trophyBgBar.attr({
            x: 64,
            y: -18,
        });
        this.addChild(trophyBgBar, 0);
        var rankIcon = new cc.Sprite('res/Art/GUIs/Main_Gui/ranking.png');
        rankIcon.attr({
            x: 126,
            y: -18,
        });
        this.addChild(rankIcon, 5);
        var nameText = userInfo.name || 'Fresher 9 - Team 3';
        var name = new cc.LabelBMFont(nameText, 'res/Art/Fonts/soji_24.fnt');
        name.attr({
            anchorX: 0,
            x: -36,
            y: 52,
        });
        this.addChild(name);
    },
});