var ClanGUI = ui.PopUp.extend({
    _listTab: null,
    ctor: function() {
        this._super("", [], 'res/Art/Bang hoi/nen 1.png');
        this.init();
    },
    init: function() {
        this.initContent();
        this.initHeader();
    },
    initHeader: function() {
        var header = new Header(this, 1); // truyền số nào thì tab bắt đầu là theo số đấy
        header.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: -250,
            y: 185,
        });
        this.addChild(header, 1000);
    },
    initContent: function() {
        var tab1 = new MyClanTab(1);
        this.addChild(tab1, 999);
        var tab2 = new ClanMemberTab(2);
        this.addChild(tab2, 999);
        var tab3 = new SearchClanTab(3);
        this.addChild(tab3, 999);
        this._listTab = [tab1, tab2, tab3];
    },
    selectTabAction: function(tabNumber) {
        this._listTab && this._listTab.forEach(function(tab) {
            if (tab.tabNumber === tabNumber) tab.showTab();
            else tab.hideTab();
        });
    },
    openAction: function(scale) {
        var size = cc.winSize;
        this.setVisible(true);
        this.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
        });
        if (scale === undefined) scale = size.width / this.frame.width * 0.85;
        this.runAction(ui.BounceEff(scale));
    },
    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4 * this.scale, 1.4 * this.scale);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.setVisible(false);
        }, this)));
        // setTimeout(() => {
        //     this.openAction();
        // }, 2000);
    },
});
