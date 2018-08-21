var Header = cc.Sprite.extend({
    _listTab: null,
    ctor: function(sender, startTab = 1) {
        this._super();
        this.clanGUI = sender;
        this.init();
        this.selectTabAction(startTab);
    },
    init: function() {
        var flag1 = new HeaderFlag("My clan", 1, this.selectTabAction.bind(this));
        flag1.onUnselect();
        flag1.setVisible(false);
        this.addChild(flag1, 1000);

        var flag2 = new HeaderFlag("Clan Member", 2, this.selectTabAction.bind(this));
        flag2.onUnselect();
        flag2.setVisible(false);
        this.addChild(flag2, 1000);

        var flag3 = new HeaderFlag("Search Clan", 3, this.selectTabAction.bind(this));
        flag3.onUnselect();
        flag3.setVisible(false);
        this.addChild(flag3, 1000);

        var flag4 = new HeaderFlag("Create Clan", 4, this.selectTabAction.bind(this));
        flag4.onUnselect();
        flag4.setVisible(false);
        this.addChild(flag4, 1000);

        var flag5 = new HeaderFlag("Join Clan", 5, this.selectTabAction.bind(this));
        flag5.onUnselect();
        flag5.setVisible(false);
        this.addChild(flag5, 1000);
        if (gv.user.is_in_guild) this._listTab = [flag1, flag2, flag3];
        else this._listTab = [flag5, flag4, flag3];
        
        this._listTab.forEach(function(flag, i) {
            flag.attr({
                anchorX: 0.5,
                anchorX: 0.5,
                x: 195 * i,
                y: 0,
            });
            flag.setVisible(true);
        });
    },
    selectTabAction: function(tabNumber = 1) {
        this._listTab.forEach(function(flag) {
            if (flag.tabNumber === tabNumber) flag.onSelect();
            else flag.onUnselect();
        });
        this.clanGUI.selectTabAction(tabNumber);
    }
});