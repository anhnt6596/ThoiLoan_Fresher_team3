gap_x = 20;
var ShopCatalogyScreen = Popup.extend({

    _resInfoBottom:null,
    _info:null,
    _item:null,
    _itemList:[],
    _direction:null,
    _obj:null,
    _moving:false,
    _mapLogic:[],

    ctor:function (width, height, text, data, bool) {
        this._super(width, height, text, data, bool);
        this.init(text);
    },

    init:function (text) {
        this._itemList = [];
        this._mapLogic = [];
        this._mapLogic = createMapLogic();

        //for(var x = 0; x < this._mapLogic.length; x++){
        //    for(var y = 0; y < this._mapLogic[0].length; y++){
        //        cc.log("Map[" + x + "][" + y + "] = "+this._mapLogic[x][y]);
        //    }
        //}

        var self = this;
        cc.loader.loadJson(shop_constant.shop_json, function(error, data){
            self._obj = data;
        });

        this.createBottomBar();
        this.initItems(text);

        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event){
                if (!touches || touches.length == 0)
                    return;
                return true;
            },
            onTouchesMoved: function(touches, event){
                var touch = touches[0];
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
                    if(Math.abs(dx) > 20)
                        self._moving = true;
                }
            },
            onTouchesEnded: function(touches, event){
                if(self._itemList.length > 0){
                    if(self._direction){
                        if(self._itemList[0].x > gap_x){
                            for(var i = 0; i < self._itemList.length; i++){
                                self._leftAction = cc.moveTo(0.2, cc.p((i+1)*gap_x + i*ITEM_WIDTH, self._itemList[i].y));
                                self._leftAction.setTag(1);
                                self._itemList[i].runAction(self._leftAction);
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

    createBottomBar:function(){
        this._resInfoBottom = new cc.Sprite(shop_constant.base_dir + 'res_info.png');
        this._resInfoBottom.setAnchorPoint(0, 0);
        this._resInfoBottom.setPosition(0, 0);
        this._resInfoBottom.scaleX = cc.winSize.width/this._resInfoBottom.width;
        this._resInfoBottom.scaleY = this._resInfo.height * this._resInfo.scaleY / this._resInfoBottom.height;
        this.addChild(this._resInfoBottom, 1, 1);
        this.createInfoUserResource(gv.user.gold, gv.user.elixir, gv.user.darkElixir, gv.user.coin);
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
        this._item = new cc.Sprite(shop_constant.base_dir + 'slot.png');
        this._item.setAnchorPoint(0, 0);

        var bg = new cc.Sprite(shop_constant.base_dir + 'item_background.png');
        bg.setAnchorPoint(0, 0);
        this._item.addChild(bg, 1, 1);

        var ha = new cc.Sprite('res/Art/GUIs/icons/shop_gui/icon/' + itemName + '.png');
        ha.setAnchorPoint(0, 0);
        this._item.addChild(ha, 2, 2);

        this._info = new ccui.Button(shop_constant.base_dir + 'info.png');
        this._info.setAnchorPoint(0, 0);
        this._info.x = this._item.x + this._item.width - this._info.width - 10;
        this._info.y = this._item.y + this._item.height - this._info.height - 10;
        this._item.addChild(this._info, 3, 3);

        this._info.addClickEventListener((function() {
            this.onInfo = this.onInfo.bind(this);
            this.onInfo(itemName);
        }).bind(this));


        var nameLabel = name.building[itemName].en;
        nameLabel = new cc.LabelBMFont(nameLabel, res.font_soji[20]);
        nameLabel.setAnchorPoint(0, 0);
        nameLabel.x = this._item.x + (ITEM_WIDTH-nameLabel.width)/2;
        nameLabel.y = this._item.y + ITEM_HEIGHT - nameLabel.height - 17;
        this._item.addChild(nameLabel, 4, 4);

        var clock = new cc.Sprite(shop_constant.base_dir + 'time.png');
        clock.setAnchorPoint(0, 0);
        clock.setPosition(this._item.x + 20, this._item.y + 70);
        this._item.addChild(clock, 4, 4);

        var catalogy = this._obj[catalogyName];
        var time;
        if(!catalogy[itemName].buildTime){          //truong hop khong co buildtime trong config
            time = '0s';
        }else{
            time = timeToReadable(catalogy[itemName].buildTime);
        }
        var timeLabel = new cc.LabelBMFont(time, res.font_soji[20]);
        timeLabel.setAnchorPoint(0, 0);
        timeLabel.setPosition(clock.x + clock.width + 5, clock.y + 5);
        this._item.addChild(timeLabel, 4, 4);

        var gold = catalogy[itemName].gold || 0;
        var elixir = catalogy[itemName].elixir || 0;
        var darkElixir = catalogy[itemName].darkElixir || 0;
        var coin = catalogy[itemName].coin || 0;

        var amountBDH = 0;
        for(var k in contructionList){
            if(contructionList[k].name == 'BDH_1'){
                amountBDH++;
            }
        }

        if(itemName == 'BDH_1'){
            if(amountBDH < 5){
                coin = config.building['BDH_1'][amountBDH + 1].coin;
            }else{
                coin = "Max Amount";
            }
        }

        var unitLabel = null;
        var unit = '';
        if(gold && gold !== undefined){
            unitLabel = new cc.Sprite(shop_constant.gold_icon);
            unit = 'gold';
        }else if(elixir){
            unitLabel = new cc.Sprite(shop_constant.elixir_icon);
            unit = 'elixir';
        }else if(darkElixir){
            unitLabel = new cc.Sprite(shop_constant.darkElixir_icon);
            unit = 'darkElixir';
        }
        else if(coin && coin !== undefined){
            if(itemName == 'BDH_1' && amountBDH == 5){
                unitLabel = new cc.LabelBMFont("", res.font_soji[20]);
            }else{
                unitLabel = new cc.Sprite(shop_constant.coin_icon);
                unit = 'coin';
            }
        }else{
            unitLabel = new cc.LabelBMFont("Free", res.font_soji[20]);
        }
        unitLabel.setAnchorPoint(0, 0);
        unitLabel.setPosition(this._item.x + this._item.width - unitLabel.width - 20, this._item.y + 20);
        this._item.addChild(unitLabel, 4, 4);

        var cost = (gold ? gold : '') + (elixir ? elixir : '') + (darkElixir ? darkElixir : '') + (coin ? coin : '');
        var costLabel = new cc.LabelBMFont(formatNumber(cost), res.font_soji[20]);
        costLabel.setAnchorPoint(0, 0);
        costLabel.setPosition(unitLabel.x - costLabel.width - 7, unitLabel.y);
        if(parseInt(cost) > gv.user[unit]){
            costLabel.setColor(cc.color(255, 0, 0, 255));
        }
        this._item.addChild(costLabel, 4, 4);


        var num = 0;
        for(var i = 0; i < contructionList.length; i++){
            if(itemName == contructionList[i].name){
                num++;
            }
        }

        var currentLevelTownHall = getCurrentLevelTownHall();
        var maxBuilding;
        if(itemName == 'BDH_1'){
            maxBuilding = 5;
        }else{
            maxBuilding = config.building['TOW_1'][currentLevelTownHall][itemName];
        }

        var numLabel = new cc.LabelBMFont(num + "/" + maxBuilding, res.font_soji[20]);
        numLabel.setAnchorPoint(0, 0);
        numLabel.setPosition(this._item.x + this._item.width * this._item.scaleX - numLabel.width - 15, clock.y + 5);
        this._item.addChild(numLabel, 4, 4);


        var missImage = false;
        for(var d in listBuildingMissImage){
            if(listBuildingMissImage[d] == itemName){
                missImage = true;
                break;
            }
        }

        var requireLevelTownHall = catalogy[itemName].townHallLevelRequired;
        var condition = (num == maxBuilding || (currentLevelTownHall < requireLevelTownHall)) || missImage;

        //Required TownHall Level and Amount
        if(condition){
            this._item.setColor(cc.color(128, 128, 128, 255));
            this._item.removeChild(bg);
            if(currentLevelTownHall < requireLevelTownHall){
                var requiredLabel = new cc.LabelBMFont("Require TownHall level " + requireLevelTownHall, res.font_soji[12]);
                requiredLabel.setAnchorPoint(0, 0);
                requiredLabel.setPosition(this._item.x + (this._item.width - requiredLabel.width)/2, clock.y + clock.height + 10);
                requiredLabel.setColor(cc.color(255, 0, 0, 255));
                this._item.addChild(requiredLabel, 4, 4);
            }
        }

        //Tinh toa do suggest
        var width = catalogy[itemName].width;
        var height = catalogy[itemName].height;
        var suggestedLocation = suggestLocation(width, height, this._mapLogic);

        var costBuilding = {gold:gold, elixir:elixir, darkElixir:darkElixir, coin:coin};

        var self = this;
        if(!condition && !missImage){
            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function(touch, event){
                    return true;
                },
                onTouchMoved: function(touch, event){},
                onTouchEnded: function(touch, event){
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(touch.getLocation());
                    var s = target.getContentSize();
                    var rect = cc.rect(0, 0, s.width, s.height);

                    if (cc.rectContainsPoint(rect, locationInNode)) {
                        if(!self._moving){
                            var id = gv.user.largestId;
                            var _level = 1;
                            cc.log("Click Item " + itemName);
                            var buildingInfo = {
                                _id: id,
                                name: itemName,
                                level: _level,
                                posX: suggestedLocation.posX,
                                posY: suggestedLocation.posY,
                                width: catalogy[itemName].width,
                                height: catalogy[itemName].height,
                                buildTime: catalogy[itemName].buildTime,
                                status: PENDING,
                                cost: costBuilding
                            };
                            gv.user.largestId += 1;
                            MAP.buildNewContruction(buildingInfo);
                            cc.director.popToRootScene();
                        }
                    }
                }
            });
            cc.eventManager.addListener(listener, this._item);
        }

        this._itemList.push(this._item);
        this._item.retain();
    },

    onInfo:function(itemName){
        var data = {_level: 1, itemName:itemName};
        var popup = new ItemInfo(cc.winSize.width*3/4, cc.winSize.height*5.7/6, name.building[itemName].en, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
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

        var amountGold = new cc.LabelBMFont(formatNumber(gold), res.font_soji[24]);
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

        var amountElixir = new cc.LabelBMFont(formatNumber(elixir), res.font_soji[24]);
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

        var amountDarkElixir = new cc.LabelBMFont(formatNumber(darkElixir), res.font_soji[24]);
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

        var amountCoin = new cc.LabelBMFont(formatNumber(coin), res.font_soji[24]);
        amountCoin.setAnchorPoint(0, 0);
        amountCoin.setPosition(itemCoin.x - amountCoin.width - 5, itemBarCoin.y+5);
        this.addChild(amountCoin, 3, 3);
    },

    //ghi de ham trong popup
    onCloseCallback:function () {
        this._itemList = [];
        cc.eventManager.removeListener(this.listener);
        cc.director.popToRootScene();
    },

    //ghi de ham trong popup
    onBackCallback:function () {
        this._itemList = [];
        cc.eventManager.removeListener(this.listener);
        cc.director.popScene();
    }
});
