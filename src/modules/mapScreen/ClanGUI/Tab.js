var Tab = cc.Sprite.extend({
    ctor: function(tabNumber) {
        this._super();
        this.tabNumber = tabNumber;
        this.width = 700;
        this.height = 380;
        this.y = -10;
    },
    showTab: function() {
        this.setVisible(true);
    },
    hideTab: function() {
        this.setVisible(false);
    },
});