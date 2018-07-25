CATALOGY_WIDTH = 241;
CATALOGY_HEIGHT = 186;
ITEM_WIDTH = 226;
ITEM_HEIGHT = 325;

var Popup = cc.Layer.extend({

    _resInfo:null,
    _close:null,
    _data:null,

    ctor:function(width, height, text, data, bool) {
        this._super();
        this._data = data;

        var bakeLayer = cc.LayerColor.create(cc.color(100, 128, 128), width, height);
        bakeLayer.setAnchorPoint(0, 0);
        bakeLayer.setPosition(0, 0);
        bakeLayer.scaleX = width/bakeLayer.width;
        bakeLayer.scaleY = height/bakeLayer.height;
        this.addChild(bakeLayer, 0, 0);

        this._resInfo = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfo.setAnchorPoint(0, 0);
        this._resInfo.scaleX = width/this._resInfo.width;
        this._resInfo.scaleY = height/8/this._resInfo.height;
        this._resInfo.setPosition(0, bakeLayer.height * bakeLayer.scaleY - this._resInfo.height - 10);
        this.addChild(this._resInfo, 1, 1);

        var label = new cc.LabelBMFont(text.toUpperCase(), 'res/Art/Fonts/soji_24.fnt');
        label.scale = 1.5;
        label.setAnchorPoint(0, 0);
        label.setPosition((cc.winSize.width - label.width*label.scaleX)/2, this._resInfo.y + 5);
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

    onCloseCallback:function () {
        cc.director.popToRootScene();
    },

    onBackCallback:function () {
        cc.director.popScene();
    }
});

Popup.scene = function (width, height, text, data, bool) {
    var scene = new cc.Scene();
    var layer = new Popup(width, height, text, data, bool);
    scene.addChild(layer);
    return scene;
};