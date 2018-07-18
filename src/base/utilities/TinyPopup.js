var TinyPopup = cc.Layer.extend({

    _btnCan:null,
    _btnFunction:null,
    _close:null,
    _data:null,

    //bool: dang popup thong thuong (true) hay popup co 2 button (false)
    ctor:function(width, height, x, y, text, data, type) {
        this._super();
        //this.init(width, height, x, y, text, data, type);
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
        label.setPosition((cc.winSize.width - label.width*label.scaleX)/2, bg.y + height - label.height*label.scaleY - 20);
        this.addChild(label, 200, 200);


        if(type){
            var closeItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/close.png', 'res/Art/GUIs/shop_gui/close.png', this.onCloseCallback, this);
            var closeMenu = new cc.Menu(closeItem);
            closeMenu.width = closeItem.width;
            closeMenu.height = closeItem.height;
            closeMenu.setAnchorPoint(0, 0);
            closeMenu.setPosition(bg.x + width - closeMenu.width, bg.y + height - closeMenu.height);
            this.addChild(closeMenu, 2, 2);
        }else{

        }
    },
    
    onCloseCallback:function () {
        var dad = this.getParent();
        var bro = dad.getChildByTag(17);
        var broChildren = bro.getChildren();
        for(var i in broChildren){
            broChildren[i].disabled = false;
            broChildren[i].enabled = true;
        }

        dad.removeChild(this);

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

TinyPopup.scene = function (width, height, x, y, text, data, type) {
    var scene = new cc.Scene();
    var layer = new TinyPopup(width, height, x, y, text, data, type);
    scene.addChild(layer);
    return scene;
};