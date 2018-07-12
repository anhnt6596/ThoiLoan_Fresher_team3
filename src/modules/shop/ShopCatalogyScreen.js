ITEM_WIDTH = 226;
ITEM_HEIGHT = 325;
gap_x = 20;

var ShopCatalogyScreen = cc.Layer.extend({

    _resInfo:null,
    _resInfoBottom:null,
    _close:null,
    _info:null,
    _item:null,
    _itemList:[],
    _direction:null,


    ctor:function (catalogyName) {
        cc.log("-----------Ctor ShopCatalogyScreen-----------");
        this._super();
        this.init(catalogyName);
    },

    init:function (catalogyName) {
        var bakeLayer = cc.LayerColor.create(cc.color(100, 128, 128), cc.winSize.width, cc.winSize.height);
        this.addChild(bakeLayer, 0, 0);

        this._resInfo = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfo.x = cc.winSize.width/2;
        this._resInfo.y = cc.winSize.height - this._resInfo.height/2;
        this._resInfo.scaleX = cc.winSize.width/this._resInfo.width;
        this.addChild(this._resInfo, 1, 1);


        this._resInfoBottom = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfoBottom.x = cc.winSize.width/2;
        this._resInfoBottom.y = this._resInfoBottom.height/2;
        this._resInfoBottom.scaleX = cc.winSize.width/this._resInfoBottom.width;
        this.addChild(this._resInfoBottom, 1, 1);


        var label = new cc.LabelTTF(catalogyName.toUpperCase(), "Arial", 36);
        label.x = cc.winSize.width/2;
        label.y = this._resInfo.y;
        this.addChild(label, 200, 200);


        var closeItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/close.png', 'res/Art/GUIs/shop_gui/close.png', this.onCloseCallback, this);
        var closeMenu = new cc.Menu(closeItem);
        closeMenu.width = closeItem.width;
        closeMenu.height = closeItem.height;
        closeMenu.x = cc.winSize.width - closeMenu.width/2 - 10;
        closeMenu.y = cc.winSize.height - closeMenu.height/1.3;
        this.addChild(closeMenu, 2, 2);


        var backItem = new cc.MenuItemImage('res/Art/GUIs/shop_gui/back.png', 'res/Art/GUIs/shop_gui/back.png', this.onBackCallback, this);
        var backMenu = new cc.Menu(backItem);
        backMenu.width = backItem.width;
        backMenu.height = backItem.height;
        backMenu.x = backMenu.width/2 + 10;
        backMenu.y = cc.winSize.height - this._resInfo.height/2;
        this.addChild(backMenu, 2, 2);

        this.initItems();

        var self = this;
        this.listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseMove: function (event) {
                if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
                    event.getCurrentTarget().moveMenu(event.getDelta());
                //cc.log("----------------Event Delta: " + event.getDelta().x + ", " + event.getDelta().y + "----------------");
            },
            onMouseUp: function (event) {
                if(self._direction){
                    cc.log("-----------To Right-----------");
                    if(self._itemList[0].x > gap_x){
                        for(var i = 0; i < self._itemList.length; i++){
                            self._itemList[i].runAction(cc.moveTo(0.2, cc.p((i+1)*gap_x + i*ITEM_WIDTH, self._itemList[i].y)));
                        }
                    }
                }else{
                    cc.log("-----------To Left-----------");
                    var last = self._itemList.length - 1;
                    var end = cc.winSize.width - gap_x - ITEM_WIDTH;
                    if(self._itemList[last].x < end){
                        var m = 0;
                        for(var j = last; j >= 0; j--){
                            m++;
                            self._itemList[j].runAction(cc.moveTo(0.2, cc.p(cc.winSize.width - m*(gap_x + ITEM_WIDTH), self._itemList[j].y)));
                        }
                    }
                }
            }
        });
        cc.eventManager.addListener(this.listener, this);


        //if ('mouse' in cc.sys.capabilities) {
        //    var self = this;
        //    cc.eventManager.addListener({
        //        event: cc.EventListener.MOUSE,
        //        onMouseMove: function (event) {
        //            if(event.getButton() == cc.EventMouse.BUTTON_LEFT)
        //                event.getCurrentTarget().moveMenu(event.getDelta());
        //            //cc.log("----------------Event Delta: " + event.getDelta().x + ", " + event.getDelta().y + "----------------");
        //        },
        //        onMouseUp: function (event) {
        //            if(self._direction){
        //                cc.log("-----------To Right-----------");
        //                if(self._itemList[0].x > gap_x){
        //                    for(var i = 0; i < self._itemList.length; i++){
        //                        self._itemList[i].x = (i+1)*gap_x + i*ITEM_WIDTH;
        //                    }
        //                }
        //            }else{
        //                cc.log("-----------To Left-----------");
        //                var last = self._itemList.length - 1;
        //                var end = cc.winSize.width - gap_x - ITEM_WIDTH;
        //                //var itemPerScreen = cc.winSize.width / (ITEM_WIDTH + gap_x);
        //                if(self._itemList[last].x < end){
        //                    var m = 0;
        //                    for(var j = last; j >= 0; j--){
        //                        m++;
        //                        self._itemList[j].x = cc.winSize.width - m*(gap_x + ITEM_WIDTH);
        //                    }
        //                }
        //            }
        //        }
        //    }, this);
        //}

        return true;
    },


    moveMenu:function(delta) {
        if(delta.x > 0){
            this._direction = true;
        }else{
            this._direction = false;
        }

        for(var i = 0; i < this._itemList.length; i++){
            this._itemList[i].stopAllActions();
            this._itemList[i].x += delta.x;
        }
    },

    initItems:function(){
        this.createItem("BAR_1");
        this.createItem("AMC_1");
        this.createItem("DEF_1");
        this.createItem("DEF_2");
        this.createItem("DEF_3");
        this.createItem("DEF_4");
        this.createItem("DEF_5");
        this.createItem("DEF_7");

        for(var i = 0; i < this._itemList.length; i++){
            this._itemList[i].x = (i+1)*gap_x + i*ITEM_WIDTH;
            this._itemList[i].y = this._resInfoBottom.height + 10;

            this.addChild(this._itemList[i], 3);
        }
    },

    createItem: function (itemName) {
        this._item = new cc.Sprite('res/Art/GUIs/shop_gui/slot.png');
        this._item.anchorX = 0;
        this._item.anchorY = 0;

        var bg = new cc.Sprite('res/Art/GUIs/shop_gui/item_background.png');
        bg.anchorX = 0;
        bg.anchorY = 0;
        this._item.addChild(bg, 1, 1);

        var ha = new cc.Sprite('res/Art/GUIs/icons/shop_gui/icon/' + itemName + '.png');
        ha.anchorX = 0;
        ha.anchorY = 0;
        this._item.addChild(ha, 2, 2);

        this._info = new cc.Sprite('res/Art/GUIs/shop_gui/info.png');
        this._info.anchorX = 0;
        this._info.anchorY = 0;
        this._info.x = this._item.x + this._item.width - this._info.width - 10;
        this._info.y = this._item.y + this._item.height - this._info.height - 10;
        this._item.addChild(this._info, 3, 3);

        var name = new cc.LabelTTF(itemName.toUpperCase(), "Arial", 20);
        name.anchorX = 0;
        name.anchorY = 0;
        name.x = this._item.x + (ITEM_WIDTH-name.width)/2;
        name.y = this._item.y + ITEM_HEIGHT-10;
        this._item.addChild(name, 4, 4);

        var listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(event.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    //cc.director.runScene(ShopCatalogyScreen.scene(itemName));
                    cc.log("Show item to Map");
                }
            },
            onMouseUp: function (event) {
            }
        });
        cc.eventManager.addListener(listener, this._item);


        this._itemList.push(this._item);
        this._item.retain();
    },

    onExit:function(){
        this._super();
        cc.log("-----------Exit ShopCatalogyScreen-----------");
    },

    onCloseCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        cc.director.runScene(createMapScene());
    },

    onBackCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        fr.view(ShopScreen);
    }

});

ShopCatalogyScreen.scene = function (catalogyName) {
    var scene = new cc.Scene();
    var layer = new ShopCatalogyScreen(catalogyName);
    scene.addChild(layer);
    return scene;
};
