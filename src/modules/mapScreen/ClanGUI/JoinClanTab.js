var searchSuggestClan = false;

var JoinClanTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
    },
    init: function() {
        this.initListClan();
    },
    initListClan: function() {
        var scrollView = new ccui.ScrollView();
        this.scrollView = scrollView;
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setContentSize(cc.size(700, 370));
        scrollView.attr({
            anchorY: 1,
            x: 0,
            y: this.height - 15,
        });

        scrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));
        this.addChild(scrollView);
        
        // this.pushClanItem();
    },
    pushClanItem: function() {
        var self = this;
        this.scrollView.removeAllChildren();
        suggestClanList.forEach(function(clan, i) {
            var clanItem = new ClanItemList(clan, i + 1);
            var calc = suggestClanList.length < 6 ? 6 : suggestClanList.length;
            clanItem.attr({
                x: self.scrollView.width / 2,
                y: (calc - i - 1) * 62,
                anchorY: 0,
            });
            self.scrollView.addChild(clanItem);
            self.scrollView.setInnerContainerSize(cc.size(700, suggestClanList.length * 62));

            clanItem.addClickEventListener(() => self.openClanInfo(clan));
        });
    },
    openClanInfo: function(clan) {
        this.hideListClan();
        this.closeClanInfo();

        cc.log("Id clan: " + clan.id);
        var clanInfo = new ClanInfo(clan);
        this.clanInfo = clanInfo;
        clanInfo.attr({
            x: this.width / 2,
            y: this.height - 10,
            anchorY: 1,
        });
        this.addChild(clanInfo);

        var closeBtn = ui.optionButton("Đóng", res.clan.greenBtn);
        closeBtn.attr({
            x: clanInfo.width - 250,
            y: clanInfo.height / 2 - 25,
        });
        clanInfo.addChild(closeBtn);
        closeBtn.addClickEventListener(this.closeClanInfo.bind(this));

        var memberBtn = ui.optionButton("Thành viên", res.clan.greenBtn);
        memberBtn.attr({
            x: clanInfo.width - 250,
            y: clanInfo.height / 2 + 25,
        });
        clanInfo.addChild(memberBtn);
        memberBtn.addClickEventListener(() => this.openClanMemberList(clan.id));
    },
    openClanMemberList: function(clanId) {
        this.closeClanInfo();
        this.hideListClan();
        var memberScrollView = new ccui.ScrollView();
        this.memberScrollView = memberScrollView;
        memberScrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        memberScrollView.setTouchEnabled(true);
        memberScrollView.setBounceEnabled(true);
        memberScrollView.setContentSize(cc.size(700, 315));
        memberScrollView.attr({
            anchorY: 1,
            x: 0,
            y: this.height - 70,
        });

        memberScrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));
        this.addChild(memberScrollView);
        
        NETWORK.getGuildListMemberInfo(clanId);
        // this.pushMemberItem();
    },
    pushMemberItem: function() {
        var self = this;
        if (this.memberScrollView) {
            this.memberScrollView.removeAllChildren();
            clanMember.forEach(function(member, i) {
                var clanItem = new MemberItemList(member, i + 1);
                var calc = listClanInfo.length < 5 ? 5 : listClanInfo.length;
                clanItem.attr({
                    x: self.scrollView.width / 2,
                    y: (calc - i - 1) * 62,
                    anchorY: 0,
                });
                self.memberScrollView.addChild(clanItem);
                self.memberScrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));

                clanItem.addClickEventListener(() => self.clickMember(member));
            });
        }
    },
    showListClan: function() {
        this.scrollView && this.scrollView.setVisible(true);
    },
    hideListClan: function() {
        this.scrollView && this.scrollView.setVisible(false);
    },
    closeClanInfo: function() {
        this.clanInfo && this.removeChild(this.clanInfo);
        this.clanInfo = null;
        this.showListClan();
    },
    closeMemberScrollView: function() {
        this.memberScrollView && this.removeChild(this.memberScrollView);
        this.memberScrollView = null;
    },
    showTab: function() {
        searchSuggestClan = true;
        NETWORK.searchGuildInfo({ type: 1, text: "" });
        this.closeMemberScrollView();
        this.showListClan();
        this.setVisible(true);
    },
});