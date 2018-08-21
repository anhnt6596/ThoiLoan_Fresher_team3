var MemberItemList = ccui.Button.extend({
    ctor: function(member, i) {
        this._super("res/Art/Bang hoi/slost.png");
        this.member = member;
        this.i = i;
        this.init();
        if(member.id === gv.user.id) this.setColor(new cc.color(220, 230, 247, 255));
    },
    init: function() {
        var text1 = new cc.LabelBMFont(this.i + ".", 'res/Art/Fonts/soji_20.fnt');
        text1.attr({
            x: 35,
            y: this.height / 2,
        });
        this.addChild(text1);

        // var clanIcon = new cc.Sprite("res/Art/Bang hoi/icon bieu tuong/"+ this.member.iconType +".png");
        // clanIcon.attr({
        //     x: 80,
        //     y: this.height / 2,
        // });
        // this.addChild(clanIcon);
        
        var nameText = new cc.LabelBMFont(this.member.name, 'res/Art/Fonts/soji_20.fnt');
        nameText.attr({
            x: 90,
            y: this.height / 2,
            anchorX: 0,
        });
        this.addChild(nameText);

        var donateTroopLabel = new cc.LabelTTF("Lính đã cho", "Calibri", 18);
        donateTroopLabel.attr({
            x: this.width - 330,
            y: this.height / 2 + 12,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(donateTroopLabel);

        var donateTroopText = new cc.LabelTTF(this.member.donateTroop.toString(), "Calibri", 18);
        donateTroopText.attr({
            x: this.width - 330,
            y: this.height / 2 - 10,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(donateTroopText);

        var requestTroopLabel = new cc.LabelTTF("Lính đã nhận", "Calibri", 18);
        requestTroopLabel.attr({
            x: this.width - 230,
            y: this.height / 2 + 12,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(requestTroopLabel);

        var requestTroopText = new cc.LabelTTF(this.member.donateTroop.toString(), "Calibri", 18);
        requestTroopText.attr({
            x: this.width - 230,
            y: this.height / 2 - 10,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(requestTroopText);

        var troophyBg = new cc.Sprite("res/Art/Bang hoi/1.png");
        troophyBg.attr({
            x: this.width - 85,
            y: this.height / 2,
        });
        this.addChild(troophyBg);

        var troophyIcon = new cc.Sprite("res/Art/Bang hoi/cup.png");
        troophyIcon.attr({
            x: troophyBg.width - 25,
            y: troophyBg.height / 2,
        });
        troophyBg.addChild(troophyIcon);

        var troophyText = new cc.LabelBMFont(formatNumber(this.member.troophy), 'res/Art/Fonts/soji_16.fnt');
        troophyText.attr({
            x: troophyBg.width - 48,
            y: troophyBg.height / 2,
            anchorX: 1,
        });
        troophyBg.addChild(troophyText);
    }
});