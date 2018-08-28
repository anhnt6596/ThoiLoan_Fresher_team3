var MemberMenu = ccui.Button.extend({
    ctor: function(listOption, member){
        this.listOption = listOption;
        this.member = member;
        var size = listOption.length;
        if (size < 2) size = 2;
        else if (size > 5) size = 5;
        this._super(res.clan.bubble[size - 2], res.clan.bubble[size - 2]);
        this.attr({
            anchorY: 0.5 - (3 - size) * 0.05,
        });
        this.addClickEventListener(this.clickInside.bind(this));
        this.addEventListener();
        this.initNameText();
        this.initButton();
    },
    initNameText: function() {
        var name = this.member.name.length <= 15 ? this.member.name : this.member.name.slice(0, 13) + "...";
        var nameText = new cc.LabelTTF(name, "Calibri", 22);
        nameText.attr({
            x: 28,
            anchorX: 0,
            y: this.height - 20,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(nameText);
    },
    initButton: function() {
        var self = this;
        this.listOption.forEach(function(element, i) {
            switch (element) {
                case "visit":
                    var visitBtn = self.addVisitBtn();
                    visitBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 20 - 60,
                    });
                    break;
                case "kick":
                    var kickBtn = self.addKickBtn();
                    kickBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 50 - 60,
                    });
                    break;
                case "promotion1":
                    var promotionBtn = self.addPromotion1Btn();
                    promotionBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 50 - 60,
                    });
                    break;
                case "promotion2":
                    var promotionBtn = self.addPromotion2Btn();
                    promotionBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 50 - 60,
                    });
                    break;
                case "add_friend":
                    var friendBtn = self.addFriendBtn();
                    friendBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 50 - 60,
                    });
                    break;
                case "demotion":
                    var demotionBtn = self.addDemoteBtn();
                    demotionBtn.attr({
                        x: self.width / 2 + 10,
                        y: self.height - i * 50 - 60,
                    });
                    break;
                default:
                    break;
            }
        });
    },
    addKickBtn: function() {
        var kickBtn = ui.optionButton("Đuổi", res.clan.bubbleButton);
        this.addChild(kickBtn);
        kickBtn.addClickEventListener(this.kickAction.bind(this));
        return kickBtn;
    },
    addVisitBtn: function() {
        var visitBtn = ui.optionButton("Thăm nhà", res.clan.bubbleButton);
        this.addChild(visitBtn);
        return visitBtn;
    },
    addPromotion1Btn: function() {
        var promotionBtn = ui.optionButton("Thăng lên\n Bang Phó", res.clan.bubbleButton);
        this.addChild(promotionBtn);
        promotionBtn.addClickEventListener(this.promoteAction1.bind(this));
        return promotionBtn;
    },
    addPromotion2Btn: function() {
        var promotionBtn = ui.optionButton("Thăng lên\n Bang Chủ", res.clan.bubbleButton);
        this.addChild(promotionBtn);
        promotionBtn.addClickEventListener(this.promoteAction2.bind(this));
        return promotionBtn;
    },
    addFriendBtn: function() {
        var friendBtn = ui.optionButton("Thêm bạn", res.clan.bubbleButton);
        this.addChild(friendBtn);
        return friendBtn;
    },
    addDemoteBtn: function() {
        var demotionBtn = ui.optionButton("Giáng cấp", res.clan.bubbleButton);
        this.addChild(demotionBtn);
        demotionBtn.addClickEventListener(this.demoteAction.bind(this));
        return demotionBtn;
    },
    kickAction: function() {
        cc.log("kick user ten là " + this.member.name + " id la " + this.member.id);
        NETWORK.sendRemoveMember(this.member.id);
        this.getParent().removeChild(this);
    },
    promoteAction1: function() {
        NETWORK.sendSetGuildMemberPosition(this.member.id, 1);
        this.getParent().removeChild(this);
    },
    promoteAction2: function() {
        NETWORK.sendSetGuildMemberPosition(this.member.id, 2);
        this.getParent().removeChild(this);
    },
    demoteAction: function() {
        NETWORK.sendSetGuildMemberPosition(this.member.id, 0);
        this.getParent().removeChild(this);
    },
    addEventListener: function() {
        this.listener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);        
    },
    onTouchBegan: function(touch) {
        return true;
    },
    onTouchMoved: function(touch) {
        this.getParent().removeChild(this);
    },
    onTouchEnded: function(touch) {
        this.getParent().removeChild(this);
    },
    clickInside: function() {

    }
});