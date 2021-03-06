var ClanItemList = ccui.Button.extend({
    ctor: function(clan, i) {
        this._super(res.clan.slost);
        this.clan = clan;
        this.i = i;
        this.init();
    },
    init: function() {
        var text1 = new cc.LabelBMFont(this.i + ".", res.font_soji[20]);
        text1.attr({
            x: 35,
            y: this.height / 2,
        });
        this.addChild(text1);

        var clanIcon = new cc.Sprite(res.clan.iconDir + this.clan.iconType +".png");
        clanIcon.attr({
            x: 80,
            y: this.height / 2,
        });
        this.addChild(clanIcon);
        
        var nameText = new cc.LabelBMFont(this.clan.name, res.font_soji[16]);
        nameText.attr({
            x: 110,
            y: this.height / 2 + 10,
            anchorX: 0,
        });
        this.addChild(nameText);

        var t = this.clan.status === 1 ? "Đóng" : "Mở";
        var statusText = new cc.LabelTTF(t, "Calibri", 16);
        statusText.attr({
            x: 114,
            y: this.height / 2 - 10,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(statusText);

        var levelTextLabel = new cc.LabelTTF("Cấp của Bang", "Calibri", 18);
        levelTextLabel.attr({
            x: this.width - 350,
            y: this.height / 2 + 12,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(levelTextLabel);

        var levelText = new cc.LabelTTF(this.clan.level, "Calibri", 18);
        levelText.attr({
            x: this.width - 350,
            y: this.height / 2 - 10,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(levelText);

        var memberText = new cc.LabelTTF("Số lượng: " + this.clan.member + "/50", "Calibri", 19);
        memberText.attr({
            x: this.width - 290,
            y: this.height / 2,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(memberText);

        var troophyBg = new cc.Sprite(res.clan.troophyBg);
        troophyBg.attr({
            x: this.width - 85,
            y: this.height / 2,
        });
        this.addChild(troophyBg);

        var troophyIcon = new cc.Sprite(res.clan.cup3);
        troophyIcon.attr({
            x: troophyBg.width - 25,
            y: troophyBg.height / 2,
        });
        troophyBg.addChild(troophyIcon);

        var troophyText = new cc.LabelBMFont(formatNumber(this.clan.troophy), res.font_soji[16]);
        troophyText.attr({
            x: troophyBg.width - 48,
            y: troophyBg.height / 2,
            anchorX: 1,
        });
        troophyBg.addChild(troophyText);
    }
});