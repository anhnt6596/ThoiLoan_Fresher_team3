// var clanMember = [
//     {
//         id: 1,
//         name: "Điêu Linh Vương",
//         donateTroop: 100,
//         requestTroop: 1,
//         troophy: 169,
//     },
//     {
//         id: 1,
//         name: "Duy Tả Sứ",
//         donateTroop: 2,
//         requestTroop: 99,
//         troophy: 8678,
//     },
//     {
//         id: 1,
//         name: "Đoàn Hữu Sứ",
//         donateTroop: 1,
//         requestTroop: 98,
//         troophy: 73,
//     },
//     {
//         id: 1,
//         name: "Thần Điêu Đại Hiệp",
//         donateTroop: 0,
//         requestTroop: 999,
//         troophy: 38,
//     },
// ];
var youreBoss = false;
var youreViceboss = false;
var myClanMember = myClanMember || [];
var requestMyClanMember = false; // cờ để bắt xem lấy thông tin clan mình hay clan khác

var ClanMemberTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
        if (myClanInfo === null && gv.user.is_in_guild) {
            NETWORK.getGuildListMemberInfo(gv.user.id_guild);
            requestMyClanMember = true;
        }
    },
    init: function() {
        this.initListMember();
        // this.pushClanMember();
    },
    initListMember: function() {
        var scrollView = new ccui.ScrollView();
        this.scrollView = scrollView;
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        scrollView.setContentSize(cc.size(700, 315));
        scrollView.attr({
            anchorY: 1,
            x: 0,
            y: this.height - 70,
        });

        scrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));
        this.addChild(scrollView);
    },
    pushClanMember: function() {
        var self = this;
        this.scrollView.removeAllChildren();
        myClanMember.forEach(function(member, i) {
            var clanItem = new MemberItemList(member, i + 1);
            var calc = listClanInfo.length < 5 ? 5 : listClanInfo.length;
            clanItem.attr({
                x: self.scrollView.width / 2,
                y: (calc - i - 1) * 62,
                anchorY: 0,
            });
            self.scrollView.addChild(clanItem);
            self.scrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));

            clanItem.addClickEventListener((item) => self.clickMember(item, member));
            if (member.position === 2 && member.id === gv.user.id) youreBoss = true;
            else if (member.position === 1 && member.id === gv.user.id) youreViceboss = true;
        });
    },
    clickMember: function(clanItem, member) {
        cc.log("Click..." + member.name);
        var listOption;
        if (youreBoss) {
            if (member.position == 0) listOption = ["visit", "promotion1", "promotion2", "kick", "add_friend"];
            else if (member.position == 1) listOption = ["visit", "promotion2", "demotion", "kick", "add_friend"];
        } else if (youreViceboss) {
            if (member.position == 0) listOption = ["visit", "kick", "add_friend"];
            else listOption = ["visit", "add_friend"];
        } else {
            listOption = ["visit", "add_friend"];
        }
        if (member.id === gv.user.id) return;
        var memberMenu = new MemberMenu(listOption, member);
        this.addChild(memberMenu);
        memberMenu.attr({
            x: 500,
            //y: clanItem.getWorldPosition().y * 315 / this.height - 42,
            y: clanItem.getWorldPosition().y * 295 / this.height - 20,
        });
    },
    showTab: function() {
        gv.user.is_in_guild && NETWORK.getGuildListMemberInfo(gv.user.id_guild);
        requestMyClanMember = true;
        this.setVisible(true);
    }
});
