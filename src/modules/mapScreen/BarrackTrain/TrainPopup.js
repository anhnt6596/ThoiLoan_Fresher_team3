var barrackQueueList = barrackQueueList || [];

var TRAIN_POPUP;

var TrainPopup = TinyPopup.extend({
    _id:null,
    _level:1,
    _barrack:null,
    _queueLength:0,
    _amountItemInQueue:0,                   //So loai item dang co trong queue
    _totalTroopCapacity:0,                  //Tong so capacity hien tai cua barrack <= queuelength
    _startTime:0,
    _troopList:{},

    _edgeItem:94,
    _queue:null,
    _timeBar:null,
    _statusCountDown:false,
    _timeText:null,
    _isShowTimeBar:false,
    _itemInQueue:{},
    _itemDisplay:{},
    _positionsInQueue:[],


    ctor: function (width, height, title, type, data) {
        TRAIN_POPUP = this;
        this._width = width;
        this._height = height;
        this._id = data.barrack._id;
        this._level = data.barrack._level;
        this._super(width, height, title, type, data);


        //Show du lieu da co
        this._queueLength = config.building['BAR_1'][this._level].queueLength;
        this._amountItemInQueue = barrackQueueList[this._id].amountItemInQueue;
        this._totalTroopCapacity = barrackQueueList[this._id].totalTroopCapacity;
        this._startTime = barrackQueueList[this._id].startTime;
        this._troopList = {};
        //_.extend(this._troopList, barrackQueueList[this._id].troopList);
        for(var i in barrackQueueList[this._id].troopList){
            var def = barrackQueueList[this._id].troopList;
            this._troopList[i] = new TroopInBarrack(i, def[i]._amount, def[i]._isInQueue, def[i]._currentPosition);
        }

        for(var k in this._troopList){
            cc.log("============================== TROOP: " + k);
            cc.log("============================== name: " + this._troopList[k]._name);
            cc.log("============================== amount: " + this._troopList[k]._amount);
            cc.log("============================== isInQueue: " + this._troopList[k]._isInQueue);
            cc.log("============================== currentPosition: " + this._troopList[k]._currentPosition);
            cc.log("============================== _housingSpace: " + this._troopList[k]._housingSpace);
            cc.log("============================== _trainingTime: " + this._troopList[k]._trainingTime);
            cc.log("============================== _level: " + this._troopList[k]._level);
            cc.log("============================== _trainingDarkElixir: " + this._troopList[k]._trainingDarkElixir);
            cc.log("============================== _trainingElixir: " + this._troopList[k]._trainingElixir);
        }

        this.initQueue();
        this.init4PositionsInQueue();

        for (var i = 0; i < 4; i++) {
            var a = i + 1;
            var name = 'ARM_' + a;
            this._itemDisplay[name] = new TroopItem(name, this._level);
            //var item = new TroopItem(name, this._level);
            if(!this._itemDisplay[name]._disable){
                this._itemDisplay[name].addClickEventListener(this.touchEvent.bind(this._itemDisplay[name]));
                this._itemInQueue[name] = new SmallTroopItem(name);
                this.addChild(this._itemInQueue[name], 100);
                this._itemInQueue[name].setPosition(-1000, -1000);
                //this._troopList[name] = new TroopInBarrack(name, 1);
            }
            this._itemDisplay[name].setPosition(-1* this._width/2 + (this._itemDisplay[name].width+10)*i + this._itemDisplay[name].width/2 + 30, 0);
            this.addChild(this._itemDisplay[name], 10);
        }

        this.showTextTotalTroop();
        this.showQuickFinish();
        this._titleText.setString("Barrack id: " + this._id + "   (" + this._totalTroopCapacity+"/"+this._queueLength + ")");
    },


    touchEvent: function() {
        NETWORK.sendTrainTroop(TRAIN_POPUP._id, this._name);


        //Check capacity va tai nguyen trc khi ++
        var costItem = TRAIN_POPUP._troopList[this._name].getCost();
        var gResources = checkUserResources(costItem);
        //Check capacity
        //if(TRAIN_POPUP._totalTroopCapacity + TRAIN_POPUP._troopList[this._name]._housingSpace > TRAIN_POPUP._queueLength){
        //    cc.log("Vuot qua queue lenght");
        //    for(var i in TRAIN_POPUP._itemDisplay){
        //        TRAIN_POPUP._itemDisplay[i].setBright(false);
        //        TRAIN_POPUP._itemDisplay[i].setEnabled(false);
        //    }
        //    return;
        //}
        //Du tai nguyen
        //if(gResources == 0){
            TRAIN_POPUP._troopList[this._name]._amount++;
            TRAIN_POPUP._totalTroopCapacity += TRAIN_POPUP._troopList[this._name]._housingSpace;
        TRAIN_POPUP.disableItemDisplay();

        if(!TRAIN_POPUP._troopList[this._name]._isInQueue) {
                TRAIN_POPUP._troopList[this._name]._isInQueue = true;
                TRAIN_POPUP._amountItemInQueue++;
                TRAIN_POPUP._troopList[this._name]._currentPosition = TRAIN_POPUP._amountItemInQueue - 1;

                //item dau tien va icon dau tien trong item
                if(TRAIN_POPUP._troopList[this._name]._currentPosition == 0 && TRAIN_POPUP._troopList[this._name]._amount == 1){
                    TRAIN_POPUP._startTime = getCurrentServerTime();

                    if(!TRAIN_POPUP._isShowTimeBar){
                        TRAIN_POPUP.showTimeBar();
                        TRAIN_POPUP._isShowTimeBar = true;
                        TRAIN_POPUP._statusCountDown = true;
                    }else{
                        TRAIN_POPUP._statusCountDown = true;
                        TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
                        TRAIN_POPUP.countDown();
                    }
                    TRAIN_POPUP._timeBar.visible = true;
                }

                TRAIN_POPUP._itemInQueue[this._name].setPosition(TRAIN_POPUP._positionsInQueue[TRAIN_POPUP._troopList[this._name]._currentPosition]);
            }
            TRAIN_POPUP.updateAmount(this);
            TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");

        //} else{ //Thieu tai nguyen
        //    if(gv.user.coin < gResources){
        //        showPopupNotEnoughG('train_troop');
        //    }else{
        //        var data = {g:gResources};
        //        var popup = new ShowTrainPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to buy resources", false, data);
        //        cc.director.getRunningScene().addChild(popup, 2000000);
        //    }
        //}
    },

    updateAmount: function(item) {
        TRAIN_POPUP._itemInQueue[item._name].getChildByTag(101).setString('x'+TRAIN_POPUP._troopList[item._name]._amount);
    },

    updateQueue: function(whoDrop) {
        for(var k in this._troopList){
            if(this._troopList[k]._currentPosition > whoDrop){
                this._itemInQueue[k].setPosition(this._positionsInQueue[this._troopList[k]._currentPosition - 1]);
                this._troopList[k]._currentPosition--;

                if(this._troopList[k]._currentPosition == 0){
                    this._startTime = getCurrentServerTime();
                    this._timeBar.visible = true;
                    this._statusCountDown = true;
                    this.countDown();
                }
            }
        }
    },

    disableItemDisplay: function() {
        for(var i in TRAIN_POPUP._troopList){
            //if(!TRAIN_POPUP._troopList[i]){
            //    cc.log("===================== KHONG CO TROOP NAY TRONG TROOP LIST===================");
            //    TRAIN_POPUP._itemDisplay[i].setBright(false);
            //    TRAIN_POPUP._itemDisplay[i].setEnabled(false);
            //    continue;
            //}
            if(TRAIN_POPUP._itemDisplay[i].isEnabled() && (TRAIN_POPUP._totalTroopCapacity + TRAIN_POPUP._troopList[i]._housingSpace > TRAIN_POPUP._queueLength)){
                TRAIN_POPUP._itemDisplay[i].setBright(false);
                TRAIN_POPUP._itemDisplay[i].setEnabled(false);
                cc.log("===================== CO TROOP SE BI DISABLE===================");
            }
        }
    },


    enableItemDisplay: function() {
        for(var i in TRAIN_POPUP._troopList){
            //if(!TRAIN_POPUP._troopList[i]){
            //    cc.log("===================== KHONG CO TROOP NAY TRONG TROOP LIST===================");
            //    TRAIN_POPUP._itemDisplay[i].setBright(false);
            //    TRAIN_POPUP._itemDisplay[i].setEnabled(false);
            //    continue;
            //}
            if(!TRAIN_POPUP._itemDisplay[i].isEnabled() && (TRAIN_POPUP._totalTroopCapacity + TRAIN_POPUP._troopList[i]._housingSpace <= TRAIN_POPUP._queueLength)){
                TRAIN_POPUP._itemDisplay[i].setBright(true);
                TRAIN_POPUP._itemDisplay[i].setEnabled(true);
                cc.log("===================== CO TROOP DUOC ENABLE===================");
            }
        }
    },


    showTimeBar: function(){
        this.addTimeBarFirstItem();
        this.countDown();
    },

    addTimeBarFirstItem: function() {
        var cur = 0;
        var max = this.getFirstItemInQueue()._trainingTime;

        var timeBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_train_bar.png');
        timeBar.setPosition(this._positionsInQueue[0].x, this._positionsInQueue[0].y - this._edgeItem/1.5);

        var processBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/train_bar.png');
        this.processBar = processBar;
        processBar.setAnchorPoint(0, 0);
        timeBar.addChild(processBar);

        var ratio = cur / max;
        processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, 'res/Art/Fonts/soji_16.fnt');
        this._timeText = timeText;
        timeBar.addChild(timeText);
        timeText.attr({
            x: timeBar.width / 2,
            y: timeBar.height/2 - 20
        });

        //timeBar.visible = false;

        this._timeBar = timeBar;
        this.addChild(this._timeBar, 10000);
    },

    countDown: function(){
        var tick = function() {
            setTimeout(function() {
                cc.log("======================= AMOUNT ITEMS IN QUEUE =======================" + TRAIN_POPUP._amountItemInQueue);
                    var cur = (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000;
                    if(!TRAIN_POPUP.getFirstItemInQueue()){
                        return;
                    }
                    var max = TRAIN_POPUP.getFirstItemInQueue()._trainingTime;
                    //Chay xong 1 icon
                    if (max - cur < 0) {
                        var name = TRAIN_POPUP.getFirstItemInQueue()._name;

                        //if(TRAIN_POPUP._troopList[name]._amount > 0){
                            TRAIN_POPUP._troopList[name]._amount--;
                            TRAIN_POPUP._totalTroopCapacity -= TRAIN_POPUP._troopList[name]._housingSpace;
                            TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");
                            TRAIN_POPUP.enableItemDisplay();
                            //Het icon trong item
                            if(TRAIN_POPUP._troopList[name]._amount == 0){
                                TRAIN_POPUP._amountItemInQueue--;
                                TRAIN_POPUP._troopList[name]._isInQueue = false;
                                TRAIN_POPUP._itemInQueue[name].setPosition(-1000, -1000);
                                TRAIN_POPUP._troopList[name]._currentPosition = -1;
                                //Het item trong queue
                                if(TRAIN_POPUP._amountItemInQueue == 0){
                                    TRAIN_POPUP._timeBar.visible = false;
                                    cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
                                    TRAIN_POPUP._statusCountDown = false;
                                    return;
                                //Con item trong queue
                                }else{
                                    TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[name]._currentPosition);
                                    TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
                                }
                            //Con icon trong item
                            }else{
                                TRAIN_POPUP._itemInQueue[name].updateAmountSmall();
                                TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
                                TRAIN_POPUP._startTime = getCurrentServerTime();
                                TRAIN_POPUP.countDown();
                            }
                        //}
                    } else {
                        TRAIN_POPUP.updateTimeBar(cur, max);
                        if(TRAIN_POPUP._statusCountDown){
                            tick();
                        }
                    }
            }, 1000);
        };
        tick();
    },

    updateTimeBar: function(cur, max) {
        var ratio = cur / max;
        var t = timeToReadable(max - cur);
        this.processBar.setTextureRect(cc.rect(0, 0, this._timeBar.width * ratio, this._timeBar.height));
        this._timeText.setString(t);
    },

    getFirstItemInQueue: function() {
        var first = null;
        for(var k in this._troopList){
            if(this._troopList[k]._currentPosition == 0){
                first = this._troopList[k];
                break;
            }
        }
        return first;
    },

    //4 vi tri tren queue
    init4PositionsInQueue: function() {
        this._positionsInQueue[0] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 + this._edgeItem, this._queue.y);
        this._positionsInQueue[1] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 - this._edgeItem*1.5, this._queue.y);
        this._positionsInQueue[2] = cc.pSub(this._positionsInQueue[1], cc.p(this._edgeItem*1.2, 0));
        this._positionsInQueue[3] = cc.pSub(this._positionsInQueue[2], cc.p(this._edgeItem*1.2, 0));
    },

    initQueue: function() {
        this._queueLength = config.building['BAR_1'][this._level].queueLength;
        this._titleText.setString('Barrack id ' + this._id + '(' + this._queueLength + ')');
        this._titleText.setScale(1.5);

        this._queue = new cc.Sprite('res/Art/GUIs/train_troop_gui/queue.png');
        this._queue.setPosition(-this._width/5, this._height/3.5);
        this._queue.setScale(this._width*3/5 / this._queue.width, 1);
        this.addChild(this._queue, 10);
    },

    showTextTotalTroop: function() {
        var totalCapacity = getTotalTroopCapacity();
        var str = new cc.LabelBMFont('Total troops after training: xx/' + totalCapacity, 'res/Art/Fonts/soji_20.fnt');
        str.setPosition(-1*this._width/4, this._height*this._frame.scaleY/9);
        this.str = str;
        this.addChild(str, 2);
    },

    showQuickFinish: function() {
        var str = new cc.LabelBMFont('Total time', 'res/Art/Fonts/soji_20.fnt');
        str.setPosition(this._positionsInQueue[0].x + this._edgeItem*1.5, this._positionsInQueue[0].y + 50);
        this.addChild(str, 2);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }
        resetReducedTempResources();


        //Luu lai trang thai cua queue
    }
    //Can co ham update capacity khi 1 nha AMC_1 dc xay xong hoac upgrade xong
});