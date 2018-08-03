var QuickFinishPopup = TinyPopup.extend({
    ctor: function (width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
        resetReducedTempResources();
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
        ReducedTempResources.coin = this._listener.gResources;
        buildingQuickFinish = this._listener.building;
        NETWORK.sendQuickFinish(this._listener.building._id);
    }
});