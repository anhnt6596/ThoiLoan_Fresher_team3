
var LobbyLayer = cc.Layer.extend({
    ctor:function() {
        this._super();


        var size = cc.winSize;
        var yBtn = size.height/3;

        var btnShop = new cc.Sprite('res/Art/GUIs/Main_Gui/shop.png');
        this.addChild(btnShop);
        //btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        //btnLogin.addClickEventListener(this.loginTrucTiep.bind(this));


        //var listener = cc.EventListener.create({
        //    event: cc.EventListener.MOUSE,
        //    onMouseDown: function (event) {
        //        var target = event.getCurrentTarget();
        //        var locationInNode = target.convertToNodeSpace(event.getLocation());
        //        var s = target.getContentSize();
        //        var rect = cc.rect(0, 0, s.width, s.height);
        //
        //        if (cc.rectContainsPoint(rect, locationInNode)) {
        //            //cc.log('Mouse Down: Inside the ' + catalogyName);
        //            //cc.director.runScene(ShopCatalogy.scene(catalogyName));
        //            cc.log("-----------Load Scene-----------");
        //            //cc.director.pushScene(ShopCatalogy.scene(catalogyName));
        //        }
        //    },
        //    onMouseUp: function (event) {
        //    }
        //});
        //cc.eventManager.addListener(listener, btnShop);
        var btnShop = gv.commonButton(200, 64, cc.winSize.width, yBtn,"SHOP");
        this.addChild(btnShop);
        btnShop.addClickEventListener(this.onOpenShop.bind(this));
    },
    onOpenShop: function(){
        fr.view(ShopScreen);

    }
});
