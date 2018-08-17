var Header = cc.Sprite.extend({
    _listTab: null,
    ctor: function(sender, startTab) {
        this._super();
        this.clanGUI = sender;
        this.init();
        this.selectTabAction(startTab);
    },
    init: function(startTab) {
        var flag1 = new HeaderFlag("My clan", 1, this.selectTabAction.bind(this));
        this.addChild(flag1, 1000);

        var flag2 = new HeaderFlag("Clan Member", 2, this.selectTabAction.bind(this));
        this.addChild(flag2, 1000);

        var flag3 = new HeaderFlag("Search Clan", 3, this.selectTabAction.bind(this));
        this.addChild(flag3, 1000);

        this._listTab = [flag1, flag2, flag3];
        
        this._listTab.forEach(function(flag, i) {
            flag.attr({
                anchorX: 0.5,
                anchorX: 0.5,
                x: 195* i,
                y: 0,
            });
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