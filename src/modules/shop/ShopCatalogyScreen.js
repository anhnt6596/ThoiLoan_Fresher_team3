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
    _mapLogic:[],

    ctor:function (width, height, x, y, text, data, bool) {
        cc.log("-----------Ctor ShopCatalogyScreen-----------");
        this._super(width, height, x, y, text, data, bool);
        this.init(text);

    },

    init:function (text) {
        this._itemList = [];
        this._mapLogic = [];

        //tao ban do 42x42
        this._mapLogic = new Array(42);
        for (var i = 0; i < 42; i++) {
            this._mapLogic[i] = new Array(42);
        }

        //Set giua ban do = 0
        for(var v = 1; v < 41; v++){
            for(var t = 1; t < 41; t++){
                this._mapLogic[v][t] = 0;
            }
        }

        //Set bien cua ban do
        for(var m = 0; m < 42; m++){
            this._mapLogic[0][m] = -1;
        }
        for(var n = 0; n < 42; n++){
            this._mapLogic[41][n] = -1;
        }
        for(var p = 0; p < 42; p++){
            this._mapLogic[p][0] = -1;
        }
        for(var q = 0; q < 42; q++){
            this._mapLogic[q][41] = -1;
        }

        for(var k in contructionList){
            var item = contructionList[k];
            this._mapLogic[item.posX][item.posY] = 1;
            for(var a = 0; a < item.width; a++){
                for(var b = 0; b < item.height; b++){
                    this._mapLogic[item.posX + a][item.posY + b] = 1;
                }
            }
        }

        //for(var x = 0; x < this._mapLogic.length; x++){
        //    for(var y = 0; y < this._mapLogic[0].length; y++){
        //        cc.log("Map[" + x + "][" + y + "] = "+this._mapLogic[x][y]);
        //    }
        //}

        var self = this;
        cc.loader.loadJson("res/Config json/ShopInfo.json", function(error, data){
            self._obj = data;
        });
        this._user = gv.user;

        //create bottom bar
        this._resInfoBottom = new cc.Sprite('res/Art/GUIs/shop_gui/res_info.png');
        this._resInfoBottom.setAnchorPoint(0, 0);
        this._resInfoBottom.setPosition(0, 0);
        this._resInfoBottom.scaleX = cc.winSize.width/this._resInfoBottom.width;
        this._resInfoBottom.scaleY = this._resInfo.height * this._resInfo.scaleY / this._resInfoBottom.height;
        this.addChild(this._resInfoBottom, 1, 1);
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
        var size = 0;
        for (var item in catalogy) {
            this.createItem(text, item);
            size++;
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

        this._info = new ccui.Button('res/Art/GUIs/shop_gui/info.png');
        this._info.setAnchorPoint(0, 0);
        this._info.x = this._item.x + this._item.width - this._info.width - 10;
        this._info.y = this._item.y + this._item.height - this._info.height - 10;
        this._item.addChild(this._info, 3, 3);

        var listenerInfo = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event){return true;},
            onTouchMoved: function(touch, event){},
            onTouchEnded: function(touch, event){
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("Info");
                }
            }
        });
        cc.eventManager.addListener(listenerInfo, this._info);


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

        var unitLabel = null;
        var unit = '';
        if(gold && gold !== undefined){
            unitLabel = new cc.Sprite('res/Art/GUIs/shop_gui/gold.png');
            unit = 'gold';
        }else if(elixir){
            unitLabel = new cc.Sprite('res/Art/GUIs/shop_gui/elixir.png');
            unit = 'elixir';
        }else if(darkElixir){
            unitLabel = new cc.Sprite('res/Art/GUIs/Main_Gui/darkElixir_icon.png');
            unit = 'darkElixir';
        }
        else if(coin && coin !== undefined){
            unitLabel = new cc.Sprite('res/Art/GUIs/shop_gui/g.png');
            unit = 'coin';
        }else{
            unitLabel = new cc.LabelBMFont("Free", 'res/Art/Fonts/soji_20.fnt');
        }
        unitLabel.setAnchorPoint(0, 0);
        unitLabel.setPosition(this._item.x + this._item.width - unitLabel.width - 20, this._item.y + 20);
        this._item.addChild(unitLabel, 4, 4);

        var cost;
        cost = (gold ? gold : '') + (elixir ? elixir : '') + (darkElixir ? darkElixir : '') + (coin ? coin : '');


        var costLabel = new cc.LabelBMFont(cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'res/Art/Fonts/soji_20.fnt');
        costLabel.setAnchorPoint(0, 0);
        costLabel.setPosition(unitLabel.x - costLabel.width - 7, unitLabel.y);
        if(parseInt(cost) > this._user[unit]){
            costLabel.setColor(cc.color(255, 0, 0, 255));
        }
        this._item.addChild(costLabel, 4, 4);


        var num = 0;
        for(var i = 0; i < contructionList.length; i++){
            if(itemName == contructionList[i].name){
                num++;
            }
        }

        var currentLevelTownHall = 1;
        for(var i = 0; i < contructionList.length; i++){
            if(contructionList[i].name.substring(0, 5) == "TOW_1"){
                currentLevelTownHall = contructionList[i].level;
            }
        }

        var maxBuilding;
        cc.loader.loadJson("res/Config json/TownHall.json", function(error, data){
            if(itemName == 'BDH_1'){
                maxBuilding = 5;
            }else{
                maxBuilding = data['TOW_1'][currentLevelTownHall][itemName];
            }
        });

        var numLabel = new cc.LabelBMFont(num + "/" + maxBuilding, 'res/Art/Fonts/soji_20.fnt');
        numLabel.setAnchorPoint(0, 0);
        numLabel.setPosition(this._item.x + this._item.width * this._item.scaleX - numLabel.width - 15, clock.y + 5);
        this._item.addChild(numLabel, 4, 4);


        var condition = (num == maxBuilding || (currentLevelTownHall < catalogy[itemName].townHallLevelRequired));
        //Required TownHall Level and Amount
        if(condition){
            this._item.setColor(cc.color(128, 128, 128, 255));
            this._item.removeChild(bg);
            if(currentLevelTownHall < catalogy[itemName].townHallLevelRequired){
                var requiredLabel = new cc.LabelBMFont("Require TownHall level " + catalogy[itemName].townHallLevelRequired, 'res/Art/Fonts/soji_12.fnt');
                requiredLabel.setAnchorPoint(0, 0);
                requiredLabel.setPosition(this._item.x + (this._item.width - requiredLabel.width)/2, clock.y + clock.height + 10);
                requiredLabel.setColor(cc.color(255, 0, 0, 255));
                this._item.addChild(requiredLabel, 4, 4);
            }
        }


        //Tinh toa do suggest
        var width = catalogy[itemName].width;
        var height = catalogy[itemName].height;
        var maxScore = this.checkAvailablePosition(1, 1, width, height);
        var posXMax = 1;
        var posYMax = 1;

        for(var a = 1; a < this._mapLogic.length; a++){
            for(var b = 1; b < this._mapLogic[0].length; b++){
                var score = this.checkAvailablePosition(a, b, width, height);
                if(score > maxScore){
                    maxScore = score;
                    posXMax = a;
                    posYMax = b;
                }
            }
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
                            var length = contructionList.length + 1;
                            var id = (length < 10) ? ("_0" + length) : ("_" + length);
                            var _level = 1;
                            cc.log("Click Item " + itemName);
                            var buildingInfo = {
                                _id: id,
                                name: itemName,
                                level: _level,
                                posX: posXMax,
                                posY: posYMax,
                                width: catalogy[itemName].width,
                                height: catalogy[itemName].height
                            };
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

    checkAvailablePosition:function(posX, posY, width, height){
        if(posX + width > 39 || posY + height > 39){
            return false;
        }
        for(var k = 0; k < width; k++){
            for(var h = 0; h < height; h++){
                if(this._mapLogic[posX + k][posY + h] == 0){
                    continue;
                }else{
                    return false;
                }
            }
        }
        return this.scoringPosition(posX, posY, width, height);
    },

    //Ham tinh diem dua vao boundary cua building
    scoringPosition:function(posX, posY, width, height){
        var score = 0;

        for(var m = posY - 1; m < posY + width + 1; m++){
            if(this._mapLogic[posX - 1][m] == 1){
                score++;
            }
        }
        for(var n = posY - 1; n < posY + width + 1; n++){
            if(this._mapLogic[posX + width][n] == 1){
                score++;
            }
        }
        for(var i = posX; i < posX + width; i++){
            if(this._mapLogic[i][posY - 1] == 1){
                score++;
            }
        }
        for(var j = posX; j < posX + width; j++){
            if(this._mapLogic[j][posY + width] == 1){
                score++;
            }
        }

        return score;
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

ShopCatalogyScreen.scene = function (catalogyName) {
    var scene = new cc.Scene();
    var layer = new ShopCatalogyScreen(catalogyName);
    scene.addChild(layer);
    return scene;
};
