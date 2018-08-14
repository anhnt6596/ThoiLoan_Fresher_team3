var barrackQueueList = barrackQueueList || [];

var TRAIN_POPUP;
var BARRACK = BARRACK || {};

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
    _processBar:null,
    _statusCountDown:false,
    _timeText:null,
    _quickFinishTimeText:null,
    _costQuickFinish:null,
    _btnQuickFinish:null,
    _isShowTimeBar:false,
    _itemInQueue:{},
    _itemDisplay:{},
    _positionsInQueue:[],
    _nextBtn:null,
    _prevBtn:null,


    ctor: function (width, height, title, type, data) {
        cc.log("=================================== NEW TRAIN_POPUP ==========================");
        TRAIN_POPUP = this;
        this._width = width;
        this._height = height;
        this._id = data.barrack._id;
        //if(!BARRACK[this._id]){
            BARRACK[this._id] = this;
        //}
        this._level = data.barrack._level;
        this._super(width, height, title, type, data);


        //Show du lieu da co
        this._queueLength = config.building['BAR_1'][this._level].queueLength;
        this._amountItemInQueue = barrackQueueList[this._id]._amountItemInQueue;
        this._totalTroopCapacity = barrackQueueList[this._id]._totalTroopCapacity;
        this._startTime = barrackQueueList[this._id]._startTime;
        this._troopList = barrackQueueList[this._id]._troopList;


        for(var k in this._troopList){
            cc.log("============================== TROOP: " + k);
            cc.log("============================== name: " + this._troopList[k]._name);
            cc.log("============================== amount: " + this._troopList[k]._amount);
            cc.log("============================== currentPosition: " + this._troopList[k]._currentPosition);
            cc.log("============================== _housingSpace: " + this._troopList[k]._housingSpace);
            cc.log("============================== _trainingTime: " + this._troopList[k]._trainingTime);
            cc.log("============================== _level: " + this._troopList[k]._level);
            cc.log("============================== _trainingDarkElixir: " + this._troopList[k]._trainingDarkElixir);
            cc.log("============================== _trainingElixir: " + this._troopList[k]._trainingElixir);
        }

        this.initQueue();
        this.init4PositionsInQueue();
        //this.initNavigation(width, height);

        for (var i = 0; i < 4; i++) {
            var a = i + 1;
            var name = 'ARM_' + a;
            this._itemDisplay[name] = new TroopItem(name, this._level);
            if(!this._itemDisplay[name]._disable){
                this._itemDisplay[name].addClickEventListener(this.touchEvent.bind(this._itemDisplay[name]));
                this._itemInQueue[name] = new SmallTroopItem(name, this._id);
                this.addChild(this._itemInQueue[name], 100, 1);
                this._itemInQueue[name].setPosition(-1000, -1000);
            }
            this._itemDisplay[name].setPosition(-1* this._width/2 + (this._itemDisplay[name].width+10)*i + this._itemDisplay[name].width/2 + 30, 0);
            this.addChild(this._itemDisplay[name], 10, 2);
        }

        //Hien thi du lieu tren queue
        if(this._troopList != null){
            cc.log("==========================showQueueData=========================");
            //Neu current troop capacity > max AMC capacity thi khong cho chay
            this.showQueueData();
        }


        this.showTextTotalTroop();
        //this.showQuickFinish();
        this._titleText.setString("Barrack id: " + this._id + "   (" + this._totalTroopCapacity+"/"+this._queueLength + ")");
        barrackQueueList[this._id]._isFirst = false;
    },

    showQueueData: function() {
        var k = 0;
        for(var i in this._troopList){
            k++;
            cc.log("======================= Linh thu: " + k);
            if(this._troopList[i]._amount > 0){
                this._isShowTimeBar = true;
                this._statusCountDown = true;

                this._itemInQueue[i].setPosition(this._positionsInQueue[this._troopList[i]._currentPosition]);
                this._itemInQueue[i].updateAmountSmall();
            }
        }
        if(this._isShowTimeBar){
        //if(this._isShowTimeBar){
            cc.log("==========================showTimeBar=========================");
            cc.log("========================== Current time - start time = " + (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000);
            this.showTimeBar();
        }
    },


    touchEvent: function() {
        //Check capacity
        var totalCapacityAMC = getTotalCapacityAMCs();


        //Check tai nguyen
        var costItem = TRAIN_POPUP._troopList[this._name].getCost();
        var gResources = checkUserResources(costItem);
        if(gResources == 0){
            _.extend(ReducedTempResources, costItem);
            temp.trainedBarrackId = TRAIN_POPUP._id;
            temp.trainedTroopType = this._name;
            NETWORK.sendTrainTroop(TRAIN_POPUP._id, this._name);
        } else if(gResources > 0){
            if(gv.user.coin < gResources){
                showPopupNotEnoughG('train_troop');
            }else{
                var temp1 = {id: TRAIN_POPUP._id, name: this._name};
                var data = {type:getLackingResources(costItem), g:gResources, cost:costItem, temp:temp1};
                var popup = new ShowTrainPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to buy resources", false, data);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }
        }
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
        if(!this._statusCountDown || barrackQueueList[this._id]._isFirst){
            this.countDown();
        }else if(!temp.pauseOverCapacityFlag){       //Can them check dieu kien khi finish time success
            this.lieTick();
        }
    },

    lieTick: function() {
        var self1 = this;
        var tick = function() {
            var self = self1;
            setTimeout(function() {
                //cc.log("======================= LIE COUNTDOWN BARRACK id:  =======================" + self._id);
                var cur = (getCurrentServerTime() - barrackQueueList[self._id]._startTime)/1000;
                if(!self.getFirstItemInQueue()){
                    return;
                }
                var max = self.getFirstItemInQueue()._trainingTime;

                if (max - cur <= 0 && BARRACK[self._id]._statusCountDown) {
                    tick();

                } else {
                    if(BARRACK[self._id]._statusCountDown){
                        //TRAIN_POPUP.updateTimeBar(cur, max);
                        self.updateTimeBar(cur, max);
                        //TRAIN_POPUP.updateQuickFinishTimeBar(cur, TRAIN_POPUP.getTotalTimeQuickFinish());
                        self.updateQuickFinishTimeBar(cur, self.getTotalTimeQuickFinish());
                    }
                    tick();
                }
            }, 1000);
        };
        tick();
    },

    addTimeBarFirstItem: function() {
        var cur = (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000;
        var max;
        if(!this.getFirstItemInQueue()){
            max = 1;
        }else{
            max = this.getFirstItemInQueue()._trainingTime;
        }

        var timeBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_train_bar.png');
        timeBar.setPosition(this._positionsInQueue[0].x, this._positionsInQueue[0].y - this._edgeItem/1.5);

        var processBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/train_bar.png');
        this._processBar = processBar;
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

        //Quick finish
        var totalTimeLabel = new cc.LabelBMFont('Total time', 'res/Art/Fonts/soji_20.fnt');
        totalTimeLabel.setPosition(timeBar.x + timeBar.width/2, timeBar.y);
        timeBar.addChild(totalTimeLabel, 2);

        //var totalTimeNumber = new cc.LabelBMFont(t, 'res/Art/Fonts/soji_20.fnt');
        var totalTimeNumber = new cc.LabelBMFont(timeToReadable(TRAIN_POPUP.getTotalTimeQuickFinish()), 'res/Art/Fonts/soji_20.fnt');
        totalTimeNumber.setPosition(timeBar.x + timeBar.width/2, timeBar.y - 30);
        this._quickFinishTimeText = totalTimeNumber;
        timeBar.addChild(totalTimeNumber, 2);

        var quickFinishLabel = new cc.LabelBMFont("Quick finish", 'res/Art/Fonts/soji_20.fnt');
        timeBar.addChild(quickFinishLabel);
        quickFinishLabel.attr({
            x: totalTimeLabel.x,
            y: totalTimeLabel.y - 60
        });

        var btnQuickFinish = new ccui.Button('res/Art/GUIs/train_troop_gui/button.png', 'res/Art/GUIs/train_troop_gui/button.png');
        btnQuickFinish.setPosition(totalTimeLabel.x, timeBar.y - 120);
        btnQuickFinish.setScale(1.2);
        timeBar.addChild(btnQuickFinish, 2);
        this._btnQuickFinish = btnQuickFinish;
        this._btnQuickFinish.addClickEventListener(this.onQuickFinish.bind(this));

        var currentTroopCapacity = getTotalCurrentTroopCapacity();
        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacityInQueue = this.getTotalCapacityInQueue();
        if(currentCapacityInQueue + currentTroopCapacity > totalCapacity || temp.pauseOverCapacityFlag){
            //cc.log("==================================== CASE 1");
            this._btnQuickFinish.setBright(false);
            this._btnQuickFinish.setEnabled(false);
        }


        var costQuickFinish = new cc.LabelBMFont(timeToG(TRAIN_POPUP.getTotalTimeQuickFinish() - cur), 'res/Art/Fonts/soji_20.fnt');
        timeBar.addChild(costQuickFinish, 3);
        costQuickFinish.attr({
            x: btnQuickFinish.x - 20,
            y: btnQuickFinish.y
        });
        this._costQuickFinish = costQuickFinish;

        var unitCoin = new cc.Sprite('res/Art/GUIs/train_troop_gui/g_icon.png');
        unitCoin.setPosition(costQuickFinish.x + costQuickFinish.width/2 + 25, costQuickFinish.y);
        timeBar.addChild(unitCoin, 3);



        //timeBar.visible = false;

        this._timeBar = timeBar;
        this.addChild(this._timeBar, 10000, 1711);
    },

    onQuickFinish: function() {
        temp.trainedBarrackId = this._id;
        ReducedTempResources = {gold:0, elixir:0, darkElixir:0, coin:timeToG(this.getTotalTimeQuickFinish())};
        NETWORK.sendQuickFinishTrainTroop(this._id);
    },

    countDown: function(){
        var self1 = this;
        var tick = function() {
            var self = self1;
            setTimeout(function() {
                //cc.log("======================= COUNTDOWN BARRACK id:  =======================" + TRAIN_POPUP._id);
                cc.log("======================= COUNTDOWN BARRACK id:  =======================" + self._id);
                var cur;
                var totalCapacity = getTotalCapacityAMCs();
                var currentCapacity = getTotalCurrentTroopCapacity();

                cur = (getCurrentServerTime() - barrackQueueList[self._id]._startTime)/1000;
                if(!self.getFirstItemInQueue() || !barrackQueueList[self._id].flagCountDown){
                    cc.log("======================================= STOP Countdown: barrack id:   " + self._id);
                    return;
                }
                var max = self.getFirstItemInQueue()._trainingTime;
                //Chay xong 1 icon
                //if (max - cur <= 0) {
                if (max - cur <= 0 && !temp.pauseOverCapacityFlag) {
                    var name = self.getFirstItemInQueue()._name;
                    temp.trainedBarrackId = self._id;
                    temp.trainedTroopType = name;
                    NETWORK.sendFinishTimeTrainTroop(self._id, name, self._troopList[name]._amount - 1);
                } else {
                    //cc.log("============================== HERE 1 ");
                    if(BARRACK[self._id]._statusCountDown){
                        if(currentCapacity >= totalCapacity){
                            temp.pauseOverCapacityFlag = true;
                            //barrackQueueList[self._id]._startTime += 1000;
                            //Chap nhan xong xenh, luc pause thi cho hien thi = trainingTime
                            barrackQueueList[self._id]._startTime = getCurrentServerTime();
                            cc.log("============================== HERE 2 ");

                        }else{
                            temp.pauseOverCapacityFlag = false;
                            cc.log("============================== HERE 3 ");

                            //self.updateTimeBar(cur, max);
                            //self.updateQuickFinishTimeBar(cur, self.getTotalTimeQuickFinish());
                        }
                        self.updateTimeBar(cur, max);
                        self.updateQuickFinishTimeBar(cur, self.getTotalTimeQuickFinish());
                        tick();
                    }
                }
            }, 1000);
        };
        tick();
    },

    //update cho thoi gian giam
    updateTimeBar: function(cur, max) {
        var ratio = cur / max;
        var t = timeToReadable(max - cur);
        if(this._processBar){
            this._processBar.setTextureRect(cc.rect(0, 0, this._timeBar.width * ratio, this._timeBar.height));
        }
        this._timeText.setString(t);
    },

    //update cho thoi gian giam
    updateQuickFinishTimeBar: function(cur, max) {
        var t = timeToReadable(max - cur);
        this._quickFinishTimeText.setString(t);

        var currentTroopCapacity = getTotalCurrentTroopCapacity();
        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacityInQueue = this.getTotalCapacityInQueue();

        if(currentCapacityInQueue + currentTroopCapacity > totalCapacity || temp.pauseOverCapacityFlag){
            //cc.log("==================================== CASE 1");
            this._btnQuickFinish.setBright(false);
            this._btnQuickFinish.setEnabled(false);
        }else{
            //cc.log("==================================== CASE 2");
            this._btnQuickFinish.setBright(true);
            this._btnQuickFinish.setEnabled(true);
        }
    },

    //update thoi gian hien thi va gia khi thay doi so luong troop
    upadateQuickFinishTimeAndCost: function(){
        this._quickFinishTimeText.setString(timeToReadable(TRAIN_POPUP.getTotalTimeQuickFinish()));
        var cur = (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000;
        this._costQuickFinish.setString(timeToG(this.getTotalTimeQuickFinish() - cur));
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

    getTotalTimeQuickFinish: function() {
        var totalTime = 0;
        for(var i in this._troopList){
            var trainingTime = config.troopBase[i].trainingTime;
            totalTime += this._troopList[i]._amount * trainingTime;
        }
        return totalTime;
    },

    getTotalCapacityInQueue: function() {
        var totalCapacity = 0;
        for(var i in this._troopList){
            var space = config.troopBase[i].housingSpace;
            totalCapacity += this._troopList[i]._amount * space;
        }
        return totalCapacity;
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
        this.addChild(this._queue, 10, 4);
    },

    showTextTotalTroop: function() {
        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacity = getTotalCurrentTroopCapacity();
        var str = new cc.LabelBMFont('Total troops after training: ' + currentCapacity +'/' + totalCapacity, 'res/Art/Fonts/soji_20.fnt');
        str.setPosition(-1*this._width/4, this._height*this._frame.scaleY/9);
        this.str = str;
        this.addChild(str, 2, 5);
    },

    initNavigation: function(width, height) {
        this._nextBtn = new ccui.Button('res/Art/GUIs/train_troop_gui/forward.png', 'res/Art/GUIs/train_troop_gui/forward.png');
        this._nextBtn.setPosition(width/2 + 20, 0);
        this._nextBtn.addClickEventListener(this.onNext.bind(this));
        this.addChild(this._nextBtn, 111);

        this._prevBtn = new ccui.Button('res/Art/GUIs/train_troop_gui/previous.png', 'res/Art/GUIs/train_troop_gui/previous.png');
        this._prevBtn.setPosition(-width/2 - 20, 0);
        this._prevBtn.addClickEventListener(this.onPrev.bind(this));
        this.addChild(this._prevBtn, 111);
    },

    onNext: function() {

        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }
        this.getParent().removeChild(this);


        //var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        //var self = this;
        //this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
        //    self.getParent().removeChild(self);
        //}, this)));
        //
        //var children = this.getChildren();
        //cc.log("=========================== RETAIN CHILDREN ============================");
        //for(var i in children){
        //    //if(children[i].tag != 1711){
        //    //    cc.log("============= children tag: " + children[i].tag);
        //    children[i].retain();
        //    //}
        //}

        cc.log("========================= NEXT BARRACK: " + this.getNextBarrack(this._id)._id);

        var data = {train: true, barrack: this.getNextBarrack(this._id)};
        var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
    },

    onPrev: function() {
        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }
        this.getParent().removeChild(this);

        var data = {train: true, barrack: this.getPrevBarrack(this._id)};
        var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
    },

    getNextBarrack: function(currentIdBarrack) {
        for(var k in barrackRefs){
            if(barrackRefs[k]._id == currentIdBarrack){
                if(!barrackRefs[k + 1]){
                    cc.log("============================= BARRACK[0] la: " + barrackRefs[0]._id);
                    return barrackRefs[0];
                }else{
                    return barrackRefs[k + 1];
                }
            }
        }
    },

    getPrevBarrack: function(currentIdBarrack) {
        for(var k in barrackRefs){
            if(barrackRefs[k]._id == currentIdBarrack){
                if(barrackRefs[k - 1]){
                    return barrackRefs[k - 1];
                }else{
                    return barrackRefs[barrackRefs.length - 1];
                }
            }
        }
    },



    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        var children = this.getChildren();
        cc.log("=========================== RETAIN CHILDREN ============================");
        for(var i in children){
            //if(children[i].tag != 1711){
            //    cc.log("============= children tag: " + children[i].tag);
                children[i].retain();
            //}
        }

        //this._statusCountDown = false;
        //this._isShowTimeBar = false;


        //Luu lai trang thai cua queue
    }
    //Can co ham update capacity khi 1 nha AMC_1 dc xay xong hoac upgrade xong
});