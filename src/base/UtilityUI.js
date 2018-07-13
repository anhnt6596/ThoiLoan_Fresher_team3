var lad = lad||{};

/*
* co mac dinh nut Close o goc phai
* x,y: toa do cua popup
* text: ten hien thi cua popup
* data: du lieu truyen vao
* bool: co nut Back hay la khong
* */
lad.popup = function(width, height, x, y, text, data, bool){
    var pp = new cc.Sprite("res/Art/GUIs/train_troop_gui/background.png");
    if(text === undefined)
        text = "";
    if(x === undefined)
        x = 0;
    if(y === undefined)
        y = 0;


    pp.attr({
        scaleX: width/pp.width,
        scaleY: height/pp.height,
        x: x,
        y: y
    });

    var label = new cc.LabelTTF(text, "Arial", 26);
    label.x = pp.width/2;
    label.y = pp.height - label.height/1.5;
    pp.addChild(label, 200, 200);

    cc.log(pp.width);
    cc.log(pp.height);

    var onCloseCallBack = function(){
        cc.director.runScene(createMapScene());
    };

    var closeItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/close.png', 'res/Art/GUIs/shop_gui/close.png', onCloseCallBack, pp);
    var closeMenu = new cc.Menu(closeItem);
    closeMenu.width = closeItem.width;
    closeMenu.height = closeItem.height;
    closeMenu.x = pp.width - closeMenu.width/1.5;
    closeMenu.y = pp.height - label.height/1.5;
    pp.addChild(closeMenu, 202, 2);

    var onBackCallBack = function(){
        cc.director.popScene();
    };

    if(bool){
        var backItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/back.png', 'res/Art/GUIs/shop_gui/back.png', onBackCallBack, pp);
        var backMenu = new cc.Menu(backItem);
        backMenu.width = backItem.width;
        backMenu.height = backItem.height;
        backMenu.x = pp.getContentSize().width;
        backMenu.y = pp.height - label.height/1.5;
        pp.addChild(backMenu, 202, 2);
    }



    return pp;
};
