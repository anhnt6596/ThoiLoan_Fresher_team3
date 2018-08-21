var myClanInfo = myClanInfo || null;

var MyClanTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        myClanInfo === null && gv.user.is_in_guild && NETWORK.sendGetGuildInfo(gv.user.id_guild);
        // this.init();
    },
    init: function() {
        this.initClanInfo();
    },
    initClanInfo: function() {
        this.clanInfo && this.removeChild(this.clanInfo);
        var clanInfo = new ClanInfo(myClanInfo);
        this.clanInfo = clanInfo;
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

        var editBtn = ui.optionButton("Sửa", "res/Art/Bang hoi/button _xem lai.png");
        editBtn.attr({
            x: clanInfo.width - 230,
            y: clanInfo.height / 2 - 25,
        });
        clanInfo.addChild(editBtn);
        editBtn.addClickEventListener(this.edit.bind(this));
    },
    edit: function() {
        var editView = new EditClanView(myClanInfo, true);
        this.editView = editView;
        editView.attr({
            x: this.width / 2,
            y: this.height / 2,
            width: this.width,
            height: this.height,
        });
        this.addChild(editView);
        this.clanInfo.setVisible(false);
    },
    showTab: function() {
        // myClanInfo !== null && this.initClanInfo();
        this.setVisible(true);
    },
    cancelEdit: function() {
        this.removeChild(this.editView);
        this.clanInfo.setVisible(true);
    }
});