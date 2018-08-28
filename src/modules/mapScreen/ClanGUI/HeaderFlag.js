var HeaderFlag = cc.Sprite.extend({
    ctor: function(label, tabNumber, action) {
        this._super();
        this.tabNumber = tabNumber;
        this.attr({
            anchorX: 0.5,
            anchorY: 0.5,
        });
        var sellectingBg = new cc.Sprite(res.clan.tabSelect);
        // var sellectingBg = new ccui.Button("res/Art/Bang hoi/o duoi.png", "res/Art/Bang hoi/o duoi.png");
        // sellectingBg.addClickEventListener(this.onUnselect.bind(this));

        var unsellectBg = new ccui.Button(res.clan.tabUnselect, res.clan.tabUnselect);
        unsellectBg.addClickEventListener(() => action(this.tabNumber));

        this.sellectingBg = sellectingBg;
        this.unsellectBg = unsellectBg;

        sellectingBg.attr({
            anchorX: 0.5,
            anchorY: 0,
        });
        sellectingBg.setVisible(false);
        unsellectBg.attr({
            anchorX: 0.5,
            anchorY: 0,
        });

        this.addChild(sellectingBg, 0);
        this.addChild(unsellectBg, 1);

        var sellectingFlag = new cc.Sprite(res.clan.flagSelect);
        this.sellectingFlag = sellectingFlag;
        sellectingFlag.attr({
            x: sellectingBg.width / 2,
            y: sellectingBg.height / 2 - 7,
        });
        sellectingBg.addChild(sellectingFlag);

        var unsellectFlag = new cc.Sprite(res.clan.flagUnselect);
        this.unsellectFlag = unsellectFlag;
        unsellectFlag.attr({
            x: unsellectBg.width / 2,
            y: unsellectBg.height / 2,
        });
        unsellectBg.addChild(unsellectFlag);

        var labelText = new cc.LabelBMFont(label, res.font_soji[16]);
        labelText.attr({
            y: sellectingBg.height / 2,
        });
        this.addChild(labelText, 10);
    },
    onSelect: function() {
        this.sellectingBg.setVisible(true);
        this.unsellectBg.setVisible(false);
    },
    onUnselect: function() {
        this.sellectingBg.setVisible(false);
        this.unsellectBg.setVisible(true);
    },
});