gap_x = 20;

var ShopCatalogyScreen = Popup.extend({

    _resInfoBottom:null,
    _info:null,
    _item:null,
    _itemList:[],
    _direction:null,
    _obj:null,
    _moving:false,
    _user:null,

    ctor:function (width, height, x, y, text, data, bool) {
        cc.log("-----------Ctor ShopCatalogyScreen-----------");
        this._super(width, height, x, y, text, data, bool);
        this.init(text);
    },

    init:function (text) {
        var self = this;
        cc.loader.loadJson("res/Config json/ShopInfo.json", function(error, data){
            self._obj = data;
        });
        this._user = gv.user;


        this._resInfoBottom = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfoBottom.setAnchorPoint(0, 0);
        this._resInfoBottom.x = 0;
        this._resInfoBottom.y = 0;
        this._resInfoBottom.scaleX = cc.winSize.width/this._resInfoBottom.width;
        this._resInfoBottom.scaleY = this._resInfo.height * this._resInfo.scaleY / this._resInfoBottom.height;
        this.addChild(this._resInfoBottom, 1, 1);

        //info bottom
        this.createInfoUserResource(this._user.gold, this._user.elixir, this._user.darkElixir, this._user.coin);

        this.initItems(text);

        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){
                return true;
            },
            onTouchMoved: function(touch, event){
                if(self._itemList.length > 0){
                    var dx = touch.getDelta().x;
                    for(var i = 0; i < self._itemList.length; i++){
                        self._itemList[i].stopAllActions();
                        self._itemList[i].x += dx;
                    }

                    if(self._itemList[0].x > gap_x){
                        self._direction = true;
                    }
                    if(self._itemList[self._itemList.length - 1].x < cc.winSize.width - gap_x - ITEM_WIDTH){
                        self._direction = false;
                    }
                    self._moving = true;
                }
            },
            onTouchEnded: function(touch, event){
                if(self._itemList.length > 0){
                    if(self._direction){
                        if(self._itemList[0].x > gap_x){
                            for(var i = 0; i < self._itemList.length; i++){
                                self._itemList[i].runAction(cc.moveTo(0.2, cc.p((i+1)*gap_x + i*ITEM_WIDTH, self._itemList[i].y)));
                            }
                        }
                    }else{
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
                self._moving = false;
            }
        });

        cc.eventManager.addListener(this.listener, this);
        return true;
    },

    initItems:function(text){
        var catalogy = this._obj[text];
        for (var item in catalogy) {
            this.createItem(text, item);
        }

        for(var i = 0; i < this._itemList.length; i++){
            this._itemList[i].x = (i+1)*gap_x + i*ITEM_WIDTH;
            this._itemList[i].y = this._resInfoBottom.height + (cc.winSize.height - this._resInfo.height - this._resInfoBottom.height - this._itemList[i].height)/2;

            this.addChild(this._itemList[i], 3);
        }
    },

    createItem: function (catalogyName, itemName) {
        this._item = new cc.Sprite('res/Art/GUIs/shop_gui/slot.png');
        this._item.setAnchorPoint(0, 0);

        var bg = new cc.Sprite('res/Art/GUIs/shop_gui/item_background.png');
        bg.setAnchorPoint(0, 0);
        this._item.addChild(bg, 1, 1);

        var ha = new cc.Sprite('res/Art/GUIs/icons/shop_gui/icon/' + itemName + '.png');
        ha.setAnchorPoint(0, 0);
        this._item.addChild(ha, 2, 2);

        this._info = new cc.Sprite('res/Art/GUIs/shop_gui/info.png');
        this._info.setAnchorPoint(0, 0);
        this._info.x = this._item.x + this._item.width - this._info.width - 10;
        this._info.y = this._item.y + this._item.height - this._info.height - 10;
        this._item.addChild(this._info, 3, 3);

        var name = new cc.LabelBMFont(itemName, 'res/Art/Fonts/soji_20.fnt');
        name.setAnchorPoint(0, 0);
        name.x = this._item.x + (ITEM_WIDTH-name.width)/2;
        name.y = this._item.y + ITEM_HEIGHT - name.height - 17;
        this._item.addChild(name, 4, 4);

        var clock = new cc.Sprite('res/Art/GUIs/shop_gui/time.png');
        clock.setAnchorPoint(0, 0);
        clock.setPosition(this._item.x + 20, this._item.y + 70);
        this._item.addChild(clock, 4, 4);

        var catalogy = this._obj[catalogyName];

        var day = Math.floor(catalogy[itemName].buildTime/86400);
        var hour = Math.floor((catalogy[itemName].buildTime - 86400*day)/3600);
        var minute = Math.floor((catalogy[itemName].buildTime - 86400*day - 3600*hour)/60);
        var second = catalogy[itemName].buildTime - 86400*day - 3600*hour - minute*60;
        var time = (day ? (day + 'd'):'') + (hour ? (hour + 'h'):'') + (minute ? (minute + 'm'):'')  + (second ? (second + 's'):'');
        time = time ? time : '0s';

        var timeLabel = new cc.LabelBMFont(time, 'res/Art/Fonts/soji_20.fnt');
        timeLabel.setAnchorPoint(0, 0);
        timeLabel.setPosition(clock.x + clock.width + 5, clock.y + 5);
        this._item.addChild(timeLabel, 4, 4);

        var gold = catalogy[itemName].gold;
        var elixir = catalogy[itemName].elixir;
        var darkElixir = catalogy[itemName].darkElixir;
        var coin = catalogy[itemName].coin ? catalogy[itemName].coin : 0;

        var unit = null;
        if(gold && gold !== undefined){
            unit = new cc.Sprite('res/Art/GUIs/shop_gui/gold.png');
        }else if(elixir){
            unit = new cc.Sprite('res/Art/GUIs/shop_gui/elixir.png');
        }else if(darkElixir){
            unit = new cc.Sprite('res/Art/GUIs/Main_Gui/darkElixir_icon.png');
        }
        else if(coin && coin !== undefined){
            unit = new cc.Sprite('res/Art/GUIs/shop_gui/g.png');
        }else{
            unit = new cc.LabelBMFont("Free", 'res/Art/Fonts/soji_20.fnt');
        }
        unit.setAnchorPoint(0, 0);
        unit.setPosition(this._item.x + this._item.width - unit.width - 20, this._item.y + 20);
        this._item.addChild(unit, 4, 4);

        var cost;
        //cost = (gold ? gold.toFixed(3) : '') + (elixir ? elixir.toFixed(3) : '') + (darkElixir ? darkElixir.toFixed(3) : '') + (coin ? coin.toFixed(3) : '');
        cost = (gold ? gold : '') + (elixir ? elixir : '') + (darkElixir ? darkElixir : '') + (coin ? coin : '');
        var costLabel = new cc.LabelBMFont(cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_20.fnt');
        costLabel.setAnchorPoint(0, 0);
        costLabel.setPosition(unit.x - costLabel.width - 7, unit.y);
        this._item.addChild(costLabel, 4, 4);

        var num = 0;
        for(var i = 0; i < contructionList.length; i++){
            if(itemName == contructionList[i].name){
                num++;
            }
        }
        var numLabel = new cc.LabelBMFont(num + "/" + catalogy[itemName].amount, 'res/Art/Fonts/soji_20.fnt');
        numLabel.setAnchorPoint(0, 0);
        numLabel.setPosition(this._item.x + this._item.width * this._item.scaleX - numLabel.width - 15, clock.y + 5);
        this._item.addChild(numLabel, 4, 4);

        var currentLevelTownHall = 1;
        for(var i = 0; i < contructionList.length; i++){
            if(contructionList[i].name.substring(0, 5) == "TOW_1"){
                currentLevelTownHall = contructionList[i].level;
            }
        }

        var condition = (num == catalogy[itemName].amount) || (currentLevelTownHall < catalogy[itemName].townHallLevelRequired);
        //Required TownHall Level and Amount
        if(condition){
            this._item.setColor(cc.color(128, 128, 128, 255));
            this._item.removeChild(bg);
            var requiredLabel = new cc.LabelBMFont("Require TownHall level " + catalogy[itemName].townHallLevelRequired, 'res/Art/Fonts/soji_12.fnt');
            requiredLabel.setAnchorPoint(0, 0);
            requiredLabel.setPosition(this._item.x + (this._item.width - requiredLabel.width)/2, clock.y + clock.height + 10);
            requiredLabel.setColor(cc.color(255, 0, 0, 255));
            this._item.addChild(requiredLabel, 4, 4);
        }

        var self = this;
        if(!condition){
            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function(touch, event){return true;},
                onTouchMoved: function(touch, event){},
                onTouchEnded: function(touch, event){
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if(!self._moving){
                            cc.log("Click Item " + itemName);
                        }
                    }
                }
            });
            cc.eventManager.addListener(listener, this._item);
        }


        this._itemList.push(this._item);
        this._item.retain();
    },

    createInfoUserResource:function(gold, elixir, darkElixir, coin){
        //Gold
        var itemBarGold = new cc.Sprite('res/Art/GUIs/shop_gui/res_bar.png');
        itemBarGold.setAnchorPoint(0, 0);
        itemBarGold.setPosition(this._resInfoBottom.x + itemBarGold.width - 10, this._resInfoBottom.y + itemBarGold.height/2 - 5);
        itemBarGold.setScale(1.5);
        this.addChild(itemBarGold, this._resInfoBottom.getLocalZOrder(), 1);

        var itemGold = new cc.Sprite('res/Art/GUIs/shop_gui/icon_gold_bar.png');
        itemGold.setAnchorPoint(0, 0);
        itemGold.setPosition(itemBarGold.x + itemBarGold.width * itemBarGold.scaleX - itemGold.width + 5, itemBarGold.y + 3);
        itemGold.setScale(1.2);
        this.addChild(itemGold, 3, 3);

        var amountGold = new cc.LabelBMFont(gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_24.fnt');
        amountGold.setAnchorPoint(0, 0);
        amountGold.setPosition(itemGold.x - amountGold.width - 5, itemBarGold.y+5);
        this.addChild(amountGold, 3, 3);


        //Elixir
        var itemBarElixir = new cc.Sprite('res/Art/GUIs/shop_gui/res_bar.png');
        itemBarElixir.setAnchorPoint(0, 0);
        itemBarElixir.setPosition(itemGold.x + itemGold.width * itemGold.scaleX + 10, itemBarGold.y);
        itemBarElixir.setScale(1.5);
        this.addChild(itemBarElixir, this._resInfoBottom.getLocalZOrder(), 1);

        var itemElixir = new cc.Sprite('res/Art/GUIs/shop_gui/icon_elixir_bar.png');
        itemElixir.setAnchorPoint(0, 0);
        itemElixir.setPosition(itemBarElixir.x + itemBarElixir.width * itemBarElixir.scaleX - itemElixir.width + 5, itemBarElixir.y + 3);
        itemElixir.setScale(1.2);
        this.addChild(itemElixir, 3, 3);

        var amountElixir = new cc.LabelBMFont(elixir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_24.fnt');
        amountElixir.setAnchorPoint(0, 0);
        amountElixir.setPosition(itemElixir.x - amountElixir.width - 5, itemBarElixir.y+5);
        this.addChild(amountElixir, 3, 3);


        //Dark Elixir
        var itemBarDarkElixir = new cc.Sprite('res/Art/GUIs/shop_gui/res_bar.png');
        itemBarDarkElixir.setAnchorPoint(0, 0);
        itemBarDarkElixir.setPosition(itemElixir.x + itemElixir.width * itemElixir.scaleX + 10, itemBarElixir.y);
        itemBarDarkElixir.setScale(1.5);
        this.addChild(itemBarDarkElixir, this._resInfoBottom.getLocalZOrder(), 1);

        var itemDarkElixir = new cc.Sprite('res/Art/GUIs/shop_gui/icon_dElixir_bar.png');
        itemDarkElixir.setAnchorPoint(0, 0);
        itemDarkElixir.setPosition(itemBarDarkElixir.x + itemBarDarkElixir.width * itemBarDarkElixir.scaleX - itemDarkElixir.width + 5, itemBarDarkElixir.y + 3);
        itemDarkElixir.setScale(1.2);
        this.addChild(itemDarkElixir, 3, 3);

        var amountDarkElixir = new cc.LabelBMFont(darkElixir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_24.fnt');
        amountDarkElixir.setAnchorPoint(0, 0);
        amountDarkElixir.setPosition(itemDarkElixir.x - amountDarkElixir.width - 5, itemBarDarkElixir.y+5);
        this.addChild(amountDarkElixir, 3, 3);


        //Coin
        var itemBarCoin = new cc.Sprite('res/Art/GUIs/shop_gui/res_bar.png');
        itemBarCoin.setAnchorPoint(0, 0);
        itemBarCoin.setPosition(itemDarkElixir.x + itemDarkElixir.width * itemDarkElixir.scaleX + 10, itemBarDarkElixir.y);
        itemBarCoin.setScale(1.5);
        this.addChild(itemBarCoin, this._resInfoBottom.getLocalZOrder(), 1);

        var itemCoin = new cc.Sprite('res/Art/GUIs/shop_gui/icon_g_bar.png');
        itemCoin.setAnchorPoint(0, 0);
        itemCoin.setPosition(itemBarCoin.x + itemBarCoin.width * itemBarCoin.scaleX - itemCoin.width + 5, itemBarCoin.y + 3);
        itemCoin.setScale(1.3);
        this.addChild(itemCoin, 3, 3);

        var amountCoin = new cc.LabelBMFont(coin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_24.fnt');
        amountCoin.setAnchorPoint(0, 0);
        amountCoin.setPosition(itemCoin.x - amountCoin.width - 5, itemBarCoin.y+5);
        this.addChild(amountCoin, 3, 3);
    },

    onExit:function(){
        this._super();
        cc.log("-----------Exit ShopCatalogyScreen-----------");
    },

    //ghi de ham trong popup
    onCloseCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        cc.director.popToRootScene();
    },

    //ghi de ham trong popup
    onBackCallback:function () {
        this._itemList.length = 0;
        cc.eventManager.removeListener(this.listener);
        cc.director.popScene();
    }

});

ShopCatalogyScreen.scene = function (catalogyName) {
    var scene = new cc.Scene();
    var layer = new ShopCatalogyScreen(catalogyName);
    scene.addChild(layer);
    return scene;
};
