var QuickFinishPopup = TinyPopup.extend({
    ctor: function (width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent(data)
    },

    //ghi de cua cha
    showContent: function(data) {
        var contentText = new cc.LabelBMFont('Do you want to quick finish this progress?', 'res/Art/Fonts/soji_20.fnt');
        contentText.setPosition(0, 30);
        contentText.color = cc.color(0, 255, 0, 255);
        this.addChild(contentText, 2);

        //set Text button
        this._btnText.setString(formatNumber(data.g));
        this.unitG.setPosition(this._btnText.x + this._btnText.width/2 + 15, this._btnText.y);
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        ReducedTempResources.coin = this._data.g;
        temp.buildingQuickFinish = this._data.building;
        NETWORK.sendQuickFinish(this._data.building._id);
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