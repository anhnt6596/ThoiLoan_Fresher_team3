var ShowTrainPopup = TinyPopup.extend({
    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent(data)
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

       //Xu ly o day
        if(this._data.type != 'builder'){
            _.extend(ReducedTempResources, this._data.cost);
            ReducedTempResources.coin += this._data.g;
            temp.trainedBarrackId = this._data.temp.id;
            temp.trainedTroopType = this._data.temp.name;
            NETWORK.sendTrainTroop(temp.trainedBarrackId, temp.trainedTroopType);
        }
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        resetReducedTempResources();
    }
});