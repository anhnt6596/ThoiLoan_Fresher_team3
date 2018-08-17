var myClanInfo = {
    id: 6969,
    name: "Hiệp Khách Hành",
    iconType: 21,
    status: 1,
    level: 100,
    member: 49,
    troophy: 100000,
    troophyRequire: 0,
};

var CreateClanTab = Tab.extend({
    _status: ["Mở", "Đóng", "Xác nhận"],
    clanStatus: 0,
    minTroophy: 0,
    iconType: 1,
    cost: 40000,
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
    },
    init: function() {
        this.initCreateClanView();
    },
    initCreateClanView: function() {
        var clanView = new cc.Sprite();
        this.clanView = clanView;
        clanView.attr({
            x: this.width / 2,
            y: this.height / 2,
            width: this.width,
            height: this.height,
        });
        this.addChild(clanView);
        // dòng 1
        var text1 = new cc.LabelTTF("Tên bang:", "Calibri", 22);
        text1.attr({ 
            x: 170,
            y: this.height - 40,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text1);

        var clanName = new cc.EditBox(cc.size(320, 51), "res/Art/Bang hoi/slost nen 1.png");
        this.clanName = clanName;
        clanName.attr({
            y: this.height - 40,
            x: this.width / 2,
            fontSize: 23
        });
        clanName.setFontColor(new cc.Color(0,0,0,255));
        clanView.addChild(clanName);

        var text2 = new cc.LabelTTF("dài từ 3 đến 15 kí tự", "Calibri", 18);
        text2.attr({ 
            x: this.width - 190,
            y: this.height - 40,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text2);
        // dòng 2
        var text3 = new cc.LabelTTF("Biểu tượng:", "Calibri", 22);
        text3.attr({ 
            x: 170,
            y: this.height - 90,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text3);

        var icon = new cc.Sprite("res/Art/Bang hoi/icon bieu tuong/" + this.iconType + ".png");
        this.icon = icon;
        icon.attr({ 
            x: this.width / 2 - 60,
            y: this.height - 90,
        });
        clanView.addChild(icon);

        var selectIconButton = ui.optionButton("Chọn", "res/Art/Bang hoi/button _xem lai.png");
        selectIconButton.attr({
            x: this.width / 2 + 50,
            y: this.height - 90,
        });
        clanView.addChild(selectIconButton);
        selectIconButton.addClickEventListener(this.selectClanIcon.bind(this));
        // dòng 3
        var text4 = new cc.LabelTTF("Mô tả:", "Calibri", 22);
        text4.attr({ 
            x: 170,
            y: this.height - 130,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text4);

        var clanDescriptionBG = new cc.Sprite("res/Art/Bang hoi/slost nen 2.png");
        clanDescriptionBG.attr({
            x: this.width / 2,
            y: this.height - 164,
            fontSize: 23
        });
        clanView.addChild(clanDescriptionBG);

        var clanDescription = new ccui.TextField("", "Calibri", 22);
        this.clanDescription = clanDescription;
        clanDescription.attr({
            x: this.width / 2,
            y: this.height - 164,
        });
        clanDescription.setTextColor(new cc.Color(0,0,0,255));
        clanDescription.ignoreContentAdaptWithSize(false);
        clanDescription.setContentSize(320 - 15, 95 - 15);
        clanDescription.setMaxLength(225);
        clanView.addChild(clanDescription);
        //dòng 4
        var text5 = new cc.LabelTTF("Trạng thái:", "Calibri", 22);
        text5.attr({ 
            x: 170,
            y: this.height - 240,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text5);

        var leftButton = new ccui.Button("res/Art/Bang hoi/next 2.png");
        leftButton.attr({ 
            x: this.width / 2 - 90,
            y: this.height - 240,
        });
        clanView.addChild(leftButton);
        leftButton.addClickEventListener(this.prevClanStatus.bind(this));

        var rightButton = new ccui.Button("res/Art/Bang hoi/next 1.png");
        rightButton.attr({ 
            x: this.width / 2 + 90,
            y: this.height - 240,
        });
        clanView.addChild(rightButton);
        rightButton.addClickEventListener(this.nextClanStatus.bind(this));

        var statusText = new cc.LabelBMFont(this._status[this.clanStatus], 'res/Art/Fonts/soji_16.fnt');
        this.statusText = statusText;
        statusText.attr({
            x: this.width / 2,
            y: this.height - 240,
        });
        clanView.addChild(statusText);
        //dòng 5
        var text6 = new cc.LabelTTF("Cup tối thiểu:", "Calibri", 22);
        text6.attr({ 
            x: 170,
            y: this.height - 285,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        clanView.addChild(text6);

        var leftButton1 = new ccui.Button("res/Art/Bang hoi/next 2.png");
        leftButton1.attr({ 
            x: this.width / 2 - 90,
            y: this.height - 285,
        });
        clanView.addChild(leftButton1);
        leftButton1.addClickEventListener(this.prevMinTroophy.bind(this));

        var rightButton1 = new ccui.Button("res/Art/Bang hoi/next 1.png");
        rightButton1.attr({ 
            x: this.width / 2 + 90,
            y: this.height - 285,
        });
        clanView.addChild(rightButton1);
        rightButton1.addClickEventListener(this.nextMinTroophy.bind(this));

        var minTroophyText = new cc.LabelBMFont(this.minTroophy.toString(), 'res/Art/Fonts/soji_16.fnt');
        this.minTroophyText = minTroophyText;
        minTroophyText.attr({
            x: this.width / 2,
            y: this.height - 285,
        });
        clanView.addChild(minTroophyText);
        //dòng 6
        var createButton = new ui.optionButton(formatNumber(this.cost), "res/Art/Bang hoi/POPUP_0000_Group-3.png");
        createButton.attr({
            x: this.width / 2,
            y: this.height - 340,
        });
        clanView.addChild(createButton);
        createButton.addClickEventListener(this.createAction.bind(this));
    },
    prevClanStatus: function() {
        this.clanStatus -= 1;
        if (this.clanStatus < 0) this.clanStatus = 2;
        this.statusText.setString(this._status[this.clanStatus]);
    },
    nextClanStatus: function() {
        this.clanStatus += 1;
        if (this.clanStatus > 2) this.clanStatus = 0;
        this.statusText.setString(this._status[this.clanStatus]);
    },
    prevMinTroophy: function() {
        this.minTroophy <= 0 ? this.minTroophy = 600 : this.minTroophy -= 200;
        this.minTroophyText.setString(this.minTroophy.toString());
    },
    nextMinTroophy: function() {
        this.minTroophy >= 600 ? this.minTroophy = 0 : this.minTroophy += 200;
        this.minTroophyText.setString(this.minTroophy.toString());
    },
    selectClanIcon: function() {
        this.clanView.setVisible(false);
        var selectView = new cc.Sprite();
        this.selectView = selectView;
        selectView.attr({
            x: this.width / 2,
            y: this.height / 2,
            width: this.width,
            height: this.height,
        });
        this.addChild(selectView);

        for(var i = 1; i <= 28; i ++) {
            var icon = new ccui.Button("res/Art/Bang hoi/bieu tuong tren map/" + i + ".png");
            icon.attr({
                x: 80 + ((i - 1) % 7) * 90,
                y: this.height - 70 - parseInt((i - 1) / 7) * 90,
            });
            selectView.addChild(icon);
            var self = this;
            (function (index) {
                var func = function() { self.selectIcon(index); }
                icon.addClickEventListener(func.bind(this));
            })(i);
        }
    },
    selectIcon: function(type) {
        if (this.iconType !== type) {
            this.iconType = type;
            this.icon && this.removeChild(this.icon);

            var icon = new cc.Sprite("res/Art/Bang hoi/icon bieu tuong/" + this.iconType + ".png");
            this.icon = icon;
            icon.attr({ 
                x: this.width / 2 - 60,
                y: this.height - 90,
            });
            this.clanView.addChild(icon);
        }
        this.clanView.setVisible(true);
        this.selectView.setVisible(false);
    },
    createAction: function() {
        var createClanInfo = {
            name: this.clanName.getString(),
            iconType: this.iconType,
            description: this.clanDescription.getString(),
            clanStatus: this.clanStatus,
            minTroophy: this.minTroophy,
        };
        cc.log("Create..." + createClanInfo.name + createClanInfo.iconType + createClanInfo.description + createClanInfo.clanStatus + createClanInfo.minTroophy);
    }
});