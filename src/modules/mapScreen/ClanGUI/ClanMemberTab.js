var ClanMemberTab = Tab.extend({
    ctor: function(tabNumber) {
        this._super(tabNumber);
        var img = new cc.Sprite('res/Art/Bang hoi/next 1.png');
        this.addChild(img);
    }
});