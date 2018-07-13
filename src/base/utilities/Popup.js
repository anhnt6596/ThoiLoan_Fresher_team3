CATALOGY_WIDTH = 241;
CATALOGY_HEIGHT = 186;
ITEM_WIDTH = 226;
ITEM_HEIGHT = 325;

var Popup = cc.Layer.extend({

    _resInfo:null,
    _close:null,

    ctor:function(width, height, x, y, text, data, bool) {
        cc.log("-----------ctor Popup-----------");
        this._super();
        //this.init(width, height, x, y, text, data, bool);
        var bakeLayer = cc.LayerColor.create(cc.color(100, 128, 128), width, height);
        bakeLayer.setAnchorPoint(0, 0);
        bakeLayer.setPosition(x, y);
        bakeLayer.scaleX = width/bakeLayer.width;
        bakeLayer.scaleY = height/bakeLayer.height;
        this.addChild(bakeLayer, 0, 0);

        this._resInfo = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfo.setAnchorPoint(0, 0);
        this._resInfo.scaleX = width/this._resInfo.width;
        this._resInfo.scaleY = height/8/this._resInfo.height;
        this._resInfo.setPosition(x, y + bakeLayer.height * bakeLayer.scaleY - this._resInfo.height - 10);
        this.addChild(this._resInfo, 1, 1);

        var label = new cc.LabelTTF(text, "Arial", this._resInfo.height * this._resInfo.scaleY / 1.5);
        label.setAnchorPoint(0, 0);
        label.setPosition((cc.winSize.width - label.width)/2, this._resInfo.y);
        this.addChild(label, 200, 200);


        var closeItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/close.png', 'res/Art/GUIs/shop_gui/close.png', this.onCloseCallback, this);
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.width = closeItem.width;
        closeMenu.height = closeItem.height;
        closeMenu.setAnchorPoint(0, 0);
        closeMenu.setPosition(bakeLayer.x + width - closeMenu.width, this._resInfo.y + closeMenu.height - 10);
        this.addChild(closeMenu, 2, 2);

        if(bool){
            var backItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/back.png', 'res/Art/GUIs/shop_gui/back.png', this.onBackCallback, this);
            var backMenu = new cc.Menu(backItem);
            backMenu.width = backItem.width;
            backMenu.height = backItem.height;
            backMenu.setAnchorPoint(0, 0);
            backMenu.setPosition(bakeLayer.x + backMenu.width/1.5, this._resInfo.y + closeMenu.height - 10);
            this.addChild(backMenu, 202, 2);
        }
    },

    //init:function(width, height, x, y, text, data, bool){
    //
    //    var bakeLayer = cc.LayerColor.create(cc.color(100, 128, 128), width, height);
    //    bakeLayer.setAnchorPoint(0, 0);
    //    bakeLayer.setPosition(x, y);
    //    bakeLayer.scaleX = width/bakeLayer.width;
    //    bakeLayer.scaleY = height/bakeLayer.height;
    //    this.addChild(bakeLayer, 0, 0);
    //
    //    this._resInfo = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
    //    this._resInfo.setAnchorPoint(0, 0);
    //    this._resInfo.scaleX = width/this._resInfo.width;
    //    this._resInfo.scaleY = height/8/this._resInfo.height;
    //    this._resInfo.setPosition(x, y + bakeLayer.height * bakeLayer.scaleY - this._resInfo.height - 10);
    //    this.addChild(this._resInfo, 1, 1);
    //
    //    var label = new cc.LabelTTF(text, "Arial", this._resInfo.height * this._resInfo.scaleY / 1.5);
    //    label.setAnchorPoint(0, 0);
    //    label.setPosition((cc.winSize.width - label.width)/2, this._resInfo.y);
    //    this.addChild(label, 200, 200);
    //
    //
    //    var closeItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/close.png', 'res/Art/GUIs/shop_gui/close.png', this.onCloseCallback, this);
    //    var closeMenu = new cc.Menu(closeItem);
    //    closeMenu.width = closeItem.width;
    //    closeMenu.height = closeItem.height;
    //    closeMenu.setAnchorPoint(0, 0);
    //    closeMenu.setPosition(bakeLayer.x + width - closeMenu.width, this._resInfo.y + closeMenu.height - 10);
    //    this.addChild(closeMenu, 2, 2);
    //
    //    if(bool){
    //        var backItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/back.png', 'res/Art/GUIs/shop_gui/back.png', this.onBackCallback, this);
    //        var backMenu = new cc.Menu(backItem);
    //        backMenu.width = backItem.width;
    //        backMenu.height = backItem.height;
    //        backMenu.setAnchorPoint(0, 0);
    //        backMenu.setPosition(bakeLayer.x + backMenu.width/1.5, this._resInfo.y + closeMenu.height - 10);
    //        this.addChild(backMenu, 202, 2);
    //    }
    //
    //    return true;
    //},

    onCloseCallback:function () {
        //this.getParent().removeChild(this);
        cc.director.popToRootScene();
        //cc.director.popScene();
    },

    onBackCallback:function () {
        cc.director.popScene();
    },

    onEnter:function(){
        cc.log("-----------onEnter Popup-----------");
        this._super();
    },

    onExit:function(){
        cc.log("-----------onExit Popup-----------");
        this._super();
    }
});

Popup.scene = function (width, height, x, y, text, data, bool) {
    var scene = new cc.Scene();
    var layer = new Popup(width, height, x, y, text, data, bool);
    scene.addChild(layer);
    return scene;
};