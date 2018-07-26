var QuickFinishPopup = TinyPopup.extend({
    ctor: function (width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
        this.showContent(listener);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
        resetReducedTempResources();
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
        ReducedTempResources.coin = this._listener.gResources;
        buildingQuickFinish = this._listener.building;
        NETWORK.sendQuickFinish(this._listener.building._id);

        //reduceUserResources(ReducedTempResources);
        //logReducedUserResources();
        //if(this._listener.building._status == 'pending'){
        //    this._listener.building.buildComplete(true);
        //}else if(this._listener.building._status == 'upgrade'){
        //    this._listener.building.upgradeComplete(true);
        //}
    }
});