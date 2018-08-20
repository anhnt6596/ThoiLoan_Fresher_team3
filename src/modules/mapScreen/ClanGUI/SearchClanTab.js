var listClanInfo = listClanInfo || [
    {
        id: 1,
        name: "Thiên Long Bát Bộ",
        iconType: 1,
        status: 1,
        level: 2,
        member: 49,
        troophy: 1123,
        troophyRequire: 0,
    },
    {
        id: 2,
        name: "Anh Hùng Xạ Điêu",
        iconType: 2,
        status: 1,
        level: 1,
        member: 30,
        troophy: 500,
        troophyRequire: 0,
    },
    {
        id: 3,
        name: "Thần Điêu Đại Hiệp",
        iconType: 3,
        status: 1,
        level: 10,
        member: 12,
        troophy: 11986,
        troophyRequire: 0,
    },
    {
        id: 4,
        name: "Ỷ Thiên Đồ Long Ký",
        iconType: 4,
        status: 1,
        level: 1,
        member: 49,
        troophy: 2000,
        troophyRequire: 0,
    },
    {
        id: 5,
        name: "Tiếu Ngạo Giang Hồ",
        iconType: 5,
        status: 0,
        level: 1,
        member: 0,
        troophy: 0,
        troophyRequire: 0,
    },
    {
        id: 6,
        name: "Lộc Đỉnh Ký",
        iconType: 6,
        status: 0,
        level: 1,
        member: 0,
        troophy: 0,
        troophyRequire: 0,
    },
];

var SearchClanTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
    },
    init: function() {
        this.initSearchField();
        this.initListClan();
    },
    initSearchField: function() {
        var text1 = new cc.LabelTTF("Tìm kiếm bang hội:", "Calibri", 22);
        text1.attr({ 
            y: this.height - 40,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(text1);

        var textField = new cc.EditBox(cc.size(240, 40), "res/Art/Bang hoi/slost nen 1.png");
        this.textField = textField;
        textField.attr({
            y: this.height - 40,
            x: 172,
            anchorX: 0,
            fontSize: 23
        });
        textField.setFontColor(new cc.Color(0,0,0,255));
        this.addChild(textField);
        
        var checkBoxSearchByName = new ccui.CheckBox("res/Art/Bang hoi/Untitled-1.png", "res/Art/Bang hoi/Untitled-1.pngsdva.png", "res/Art/Bang hoi/Untitled-1.pngsdva.png");
        this.checkBoxSearchByName = checkBoxSearchByName;
        checkBoxSearchByName.attr({
            x: this.width - 260,
            y: this.height - 25,
        });
        this.addChild(checkBoxSearchByName);
        checkBoxSearchByName.addEventListener(this.checkSearchByName, this);
        checkBoxSearchByName.setSelected(true);

        var checkBoxSearchByCode = new ccui.CheckBox("res/Art/Bang hoi/Untitled-1.png", "res/Art/Bang hoi/Untitled-1.pngsdva.png", "res/Art/Bang hoi/Untitled-1.pngsdva.png");
        this.checkBoxSearchByCode = checkBoxSearchByCode;
        checkBoxSearchByCode.attr({
            x: this.width - 260,
            y: this.height - 55,
        });
        this.addChild(checkBoxSearchByCode);
        checkBoxSearchByCode.addEventListener(this.checkSearchByCode, this);
        
        var text2 = new cc.LabelTTF("Tên bang", "Calibri", 21);
        text2.attr({ 
            x: this.width - 244,
            y: this.height - 25,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(text2);

        
        var text3 = new cc.LabelTTF("Mã bang", "Calibri", 21);
        text3.attr({ 
            x: this.width - 244,
            y: this.height - 55,
            anchorX: 0,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(text3);

        var searchBtn = ui.optionButton("Tìm kiếm", 'res/Art/Bang hoi/POPUP_0000_Group-3.png');
        searchBtn.attr({
            x: this.width - 85,
            y: this.height - 40,
        });
        this.addChild(searchBtn);
        searchBtn.addClickEventListener(this.searchAction.bind(this));
    },
    initListClan: function() {
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
    pushClanItem: function(scrollView, listClanInfo) {
        var self = this;
        scrollView.removeAllChildren();
        listClanInfo.forEach(function(clan, i) {
            var clanItem = new ClanItemList(clan, i + 1);
            var calc = listClanInfo.length < 5 ? 5 : listClanInfo.length;
            clanItem.attr({
                x: scrollView.width / 2,
                y: (calc - i - 1) * 62,
                anchorY: 0,
            });
            scrollView.addChild(clanItem);
            scrollView.setInnerContainerSize(cc.size(700, listClanInfo.length * 62));

            clanItem.addClickEventListener(() => self.openClanInfo(clan));
        });
    },
    checkSearchByName: function() {
        if (this.checkBoxSearchByName.isSelected())  this.checkBoxSearchByCode.setSelected(false);
        else { this.checkBoxSearchByName.setSelected(true); }
    },
    checkSearchByCode: function() {
        if (this.checkBoxSearchByCode.isSelected())  this.checkBoxSearchByName.setSelected(false);
        else { this.checkBoxSearchByCode.setSelected(true); }
    },
    searchAction: function() {
        var searchText = this.textField.getString();
        var searchType = 0;
        if (this.checkBoxSearchByName.isSelected()) searchType = 0;
        else if (this.checkBoxSearchByCode.isSelected()) searchType = 1;

        cc.log("Searching... " + searchText + "Search type: " + searchType);

        this.closeClanInfo();
        this.closeMemberScrollView();

        this.pushClanItem(this.scrollView, listClanInfo);
        listClanInfo.pop();
    },
    openClanInfo: function(clan) {
        this.closeClanInfo();
        this.hideListClan();

        cc.log("Id clan: " + clan.id);
        var clanInfo = new ClanInfo(clan);
        this.clanInfo = clanInfo;
        clanInfo.attr({
            x: this.width / 2,
            y: this.height - 65,
            anchorY: 1,
        });
        this.addChild(clanInfo);

        var closeBtn = ui.optionButton("Đóng", "res/Art/Bang hoi/button _xem lai.png");
        closeBtn.attr({
            x: clanInfo.width - 250,
            y: clanInfo.height / 2 - 25,
        });
        clanInfo.addChild(closeBtn);
        closeBtn.addClickEventListener(this.closeClanInfo.bind(this));

        var memberBtn = ui.optionButton("Thành viên", "res/Art/Bang hoi/button _xem lai.png");
        memberBtn.attr({
            x: clanInfo.width - 250,
            y: clanInfo.height / 2 + 25,
        });
        clanInfo.addChild(memberBtn);
        memberBtn.addClickEventListener(() => this.openClanMemberList(clan.id));
    },
    closeClanInfo: function() {
        this.clanInfo && this.removeChild(this.clanInfo);
        this.clanInfo = null;
        this.showListClan();
    },
    showListClan: function() { // thực chất là đóng 
        this.scrollView && this.scrollView.setVisible(true);
    },
    hideListClan: function() {
        this.scrollView && this.scrollView.setVisible(false);
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
        
        this.pushMemberItem();
    },
    pushMemberItem: function() {
        var self = this;
        this.memberScrollView && this.memberScrollView.removeAllChildren();
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
    },
    closeMemberScrollView: function() {
        this.memberScrollView && this.removeChild(this.memberScrollView);
        this.memberScrollView = null;
    },
    showTab: function () {
        this.closeClanInfo();
        this.closeMemberScrollView();
        this.setVisible(true);
    },
    clickMember: function(member) {
        cc.log("Click..." + member.name);
    }
});