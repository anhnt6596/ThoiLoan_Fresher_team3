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


var MyClanTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
    },
    init: function() {
        this.initClanInfo()
    },
    initClanInfo: function() {
        var clanInfo = new ClanInfo(myClanInfo);
        clanInfo.attr({
            x: this.width / 2,
            y: this.height - 20,
            anchorY: 1,
        });
        this.addChild(clanInfo);

        var memberBtn = ui.optionButton("Thành viên", "res/Art/Bang hoi/button _xem lai.png");
        memberBtn.attr({
            x: clanInfo.width - 230,
            y: clanInfo.height / 2 + 25,
        });
        clanInfo.addChild(memberBtn);
        memberBtn.addClickEventListener(() => CLAN_GUI_HEADER.selectTabAction(2));
    },
});