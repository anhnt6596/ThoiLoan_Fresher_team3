var ShopScreen = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.winSize;
        var yBtn = size.height/3;

        var btnShop = gv.TextField("kho", "kho", 10,yBtn);
        this.addChild(btnShop);
    },
});