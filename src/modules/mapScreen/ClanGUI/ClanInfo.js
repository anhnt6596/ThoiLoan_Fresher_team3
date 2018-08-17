var ClanInfo = cc.Sprite.extend({
    ctor: function(clanInfo) {
        this._super("res/Art/Bang hoi/NEN NHO _BANG HOI CUA TOI.png");
        this.init(myClanInfo);
    },
    init: function(clanInfo) {
        var icon = new cc.Sprite("res/Art/Bang hoi/bieu tuong tren map/" + clanInfo.iconType + ".png");
        icon.attr({
            x: 56,
            y: this.height / 2,
        });
        this.addChild(icon);

        this.initInfoTable(clanInfo);
    },
    initInfoTable: function(clanInfo) {
        var infoTable = new cc.Sprite();
        infoTable.attr({
            x: 110,
            anchorY: 1,
            y: this.height - 18,
        });
        this.addChild(infoTable);
        
        var nameText = cc.LabelBMFont(clanInfo.name, 'res/Art/Fonts/soji_20.fnt');
        nameText.attr({
            anchorX: 0,
            y: infoTable.height,
        });
        infoTable.addChild(nameText);
        
        // label
        var text1 = new cc.LabelTTF("Điểm danh vọng:", "Calibri", 16);
        text1.attr({
            anchorX: 0,
            x: 5,
            y: infoTable.height - 20,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(text1);

        var text2 = new cc.LabelTTF("Thành viên:", "Calibri", 16);
        text2.attr({
            anchorX: 0,
            x: 5,
            y: infoTable.height - 40,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(text2);

        var text3 = new cc.LabelTTF("Loại:", "Calibri", 16);
        text3.attr({
            anchorX: 0,
            x: 5,
            y: infoTable.height - 60,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(text3);

        var text4 = new cc.LabelTTF("Yêu cầu danh vọng:", "Calibri", 16);
        text4.attr({
            anchorX: 0,
            x: 5,
            y: infoTable.height - 80,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(text4);

        // value
        var troophyText = new cc.LabelTTF(formatNumber(clanInfo.troophy), "Calibri", 16);
        troophyText.attr({
            x: 180,
            y: infoTable.height - 20,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(troophyText, 1);

        var troophyIcon = new cc.Sprite("res/Art/Bang hoi/CUP 1.png");
        troophyIcon.attr({
            x: 220,
            y: infoTable.height - 20,
        });
        infoTable.addChild(troophyIcon);

        var memberText = new cc.LabelTTF(clanInfo.member + "/50", "Calibri", 16);
        memberText.attr({
            x: 180,
            y: infoTable.height - 40,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(memberText);

        var t = clanInfo.status === 1 ? "Mở" : "Đóng";
        var statusText = new cc.LabelTTF(t, "Calibri", 16);
        statusText.attr({
            x: 180,
            y: infoTable.height - 60,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(statusText);

        var troophyRequireText = new cc.LabelTTF(clanInfo.troophyRequire.toString(), "Calibri", 16);
        troophyRequireText.attr({
            x: 180,
            y: infoTable.height - 80,
            color: new cc.color(76, 4, 17, 255)
        });
        infoTable.addChild(troophyRequireText);
    }
});