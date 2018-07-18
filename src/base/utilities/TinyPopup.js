CATALOGY_WIDTH = 241;
CATALOGY_HEIGHT = 186;
ITEM_WIDTH = 226;
ITEM_HEIGHT = 325;

var TinyPopup = cc.Layer.extend({

    _btnCan:null,
    _btnFunction:null,
    _close:null,
    _data:null,

    //bool: dang popup thong thuong hay popup co 2 button
    ctor:function(width, height, x, y, text, data, bool) {
        this._super();
        //this.init(width, height, x, y, text, data, bool);
        this._data = data;

        var bg = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        bg.setAnchorPoint(0, 0);
        bg.setPosition(x, y);
        bg.scaleX = width/bg.width;
        bg.scaleY = height/bg.height;
        this.addChild(bg, 0, 0);

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
        closeMenu.setPosition(bg.x + width - closeMenu.width, this._resInfo.y + closeMenu.height - 10);
        this.addChild(closeMenu, 2, 2);

        if(bool){
            var backItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/back.png', 'res/Art/GUIs/shop_gui/back.png', this.onBackCallback, this);
            var backMenu = new cc.Menu(backItem);
            backMenu.width = backItem.width;
            backMenu.height = backItem.height;
            backMenu.setAnchorPoint(0, 0);
            backMenu.setPosition(bg.x + backMenu.width/1.5, this._resInfo.y + closeMenu.height - 10);
            this.addChild(backMenu, 202, 2);
        }
    },
    
    onCloseCallback:function () {
        //this.getParent().removeChild(this);
        cc.director.popToRootScene();
        //cc.director.popScene();
    },

    onBackCallback:function () {
        cc.director.popScene();
    },

    //onEnter:function(){
    //    cc.log("-----------onEnter TinyPopup-----------");
    //    this._super();
    //},
    //
    //onExit:function(){
    //    cc.log("-----------onExit TinyPopup-----------");
    //    this._super();
    //}
});

TinyPopup.scene = function (width, height, x, y, text, data, bool) {
    var scene = new cc.Scene();
    var layer = new TinyPopup(width, height, x, y, text, data, bool);
    scene.addChild(layer);
    return scene;
};