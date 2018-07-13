gap_x = 20;

var ShopCatalogyScreen = Popup.extend({

    _resInfoBottom:null,
    _info:null,
    _item:null,
    _itemList:[],
    _direction:null,

    ctor:function (width, height, x, y, text, data, bool) {
        cc.log("-----------Ctor ShopCatalogyScreen-----------");
        this._super(width, height, x, y, text, data, bool);
        this.init();
    },

    init:function () {
        this._resInfoBottom = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfoBottom.x = cc.winSize.width/2;
        this._resInfoBottom.y = this._resInfoBottom.height/2;
        this._resInfoBottom.scaleX = cc.winSize.width/this._resInfoBottom.width;
        this.addChild(this._resInfoBottom, 1, 1);

        this.initItems();

        var self = this;
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){return true;},
            onTouchMoved: function(touch, event){
                var dx = touch.getDelta().x;
                if(dx > 0){
                    self._direction = true;
                }else{
                    self._direction = false;
                }

                for(var i = 0; i < self._itemList.length; i++){
                    self._itemList[i].stopAllActions();
                    self._itemList[i].x += dx;
                }
            },
            onTouchEnded: function(touch, event){
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

        return true;
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
            this._itemList[i].y = this._resInfoBottom.height + (cc.winSize.height - this._resInfo.height - this._resInfoBottom.height - this._itemList[i].height)/2;

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
        name.y = this._item.y + ITEM_HEIGHT - name.height - 17;
        this._item.addChild(name, 4, 4);

        var self = this;
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

    //ghi de ham trong popup
    onCloseCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        //cc.director.runScene(createMapScene());
        cc.director.popScene();
        cc.director.popScene();
    },

    //ghi de ham trong popup
    onBackCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        //fr.view(ShopScreen);
        cc.director.popScene();
    }

});

ShopCatalogyScreen.scene = function (catalogyName) {
    var scene = new cc.Scene();
    var layer = new ShopCatalogyScreen(catalogyName);
    scene.addChild(layer);
    return scene;
};
