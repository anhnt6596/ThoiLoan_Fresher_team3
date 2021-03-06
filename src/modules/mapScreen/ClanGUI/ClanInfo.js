var ClanInfo = cc.Sprite.extend({
    ctor: function(clanInfo) {
        this._super(res.clan.myClanBg);
        this.clanInfo = clanInfo;
        this.init(clanInfo);
    },
    init: function(clanInfo) {
        var icon = new cc.Sprite(res.clan.mapIconDir + clanInfo.iconType + ".png");
        icon.attr({
            x: 56,
            y: this.height / 2,
        });
        this.addChild(icon);

        var idText = new cc.LabelTTF("ID: " + clanInfo.id, "Calibri", 20);
        idText.attr({
            x: 56,
            y: this.height / 2 - 42,
            color: new cc.color(76, 4, 17, 255)
        });
        this.addChild(idText);

        this.initInfoTable(clanInfo);
        this.initButton();
    },
    initInfoTable: function(clanInfo) {
        var infoTable = new cc.Sprite();
        infoTable.attr({
            x: 110,
            anchorY: 1,
            y: this.height - 18,
        });
        this.addChild(infoTable);
        
        var nameText = cc.LabelBMFont(clanInfo.name, res.font_soji[20]);
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

        var troophyIcon = new cc.Sprite(res.clan.cup1);
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

        var t = clanInfo.status === 1 ? "Đóng" : "Mở";
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
    },
    initButton: function() {
        var joinButton = new ui.optionButton("Gia nhập", res.clan.greenBtn);
        joinButton.attr({
            x: this.width - 70,
            y: this.height / 2 + 25,
        });
        this.addChild(joinButton);
        joinButton.addClickEventListener(this.joinAction.bind(this));
        if (gv.user.is_in_guild) joinButton.setEnabled(false);

        var outButton = new ui.optionButton("Rời bang", res.clan.redBtn);
        outButton.attr({
            x: this.width - 70,
            y: this.height / 2 - 25,
        });
        this.addChild(outButton);
        outButton.addClickEventListener(this.outAction.bind(this));
        if (!gv.user.is_in_guild || gv.user.id_guild !== this.clanInfo.id) outButton.setEnabled(false);
    },
    joinAction: function() {
        cc.log("join" + this.clanInfo.id);
        if (gv.user.is_in_guild && gv.user.id_guild === this.clanInfo.id) cc.log("Bạn đã ở guild này rồi");
        else {
            temp.reqJoinClanId = this.clanInfo.id;
            temp.reqJoinClanName = this.clanInfo.name;
            youAreRequest = true;
            NETWORK.sendAddRequestMember(this.clanInfo.id);
        }
    },
    outAction: function() {
        cc.log("quit");
        if (gv.user.is_in_guild  && gv.user.id_guild === this.clanInfo.id) {
            NETWORK.sendRemoveMember(gv.user.id);
        }
    },
});

var youAreRequest = false;