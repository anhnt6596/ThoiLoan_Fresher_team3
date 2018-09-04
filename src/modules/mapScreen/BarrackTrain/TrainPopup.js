var barrackQueueList = barrackQueueList || [];

var TRAIN_POPUP;
var BARRACK = BARRACK || {};

var TrainPopup = TinyPopup.extend({
    _id:null,
    _level:1,
    _barrack:null,
    _queueLength:0,
    _startTime:0,
    _barrackQueue:null,
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
        //cc.log("=================================== NEW TRAIN_POPUP ==========================");
        TRAIN_POPUP = this;
        this._width = width;
        this._height = height;
        this._id = data.barrack._id;
        BARRACK[this._id] = this;
        BARRACK[this._id].wait = false;
        this._level = data.barrack._level;
        this._super(width, height, title, type, data);


        //Show du lieu da co
        this._queueLength = config.building['BAR_1'][this._level].queueLength;

        this._barrackQueue = getBarrackQueueById(this._id);
        this._startTime = this._barrackQueue._startTime;
        this._troopList = this._barrackQueue._troopList;


        this.initQueue();
        this.init4PositionsInQueue();
        this.initNavigation(width, height);

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
        if(this._troopList.length > 0){
            cc.log("============= Barrack " + this._id + ": show Queue Data");
            //Neu current troop capacity > max AMC capacity thi khong cho chay
            this.showQueueData();
        }


        this.showTextTotalTroop();
        //this.showQuickFinish();
        this._titleText.setString("Barrack id: " + this._id + "   (" + this._barrackQueue.getTotalTroopCapacity()+"/"+this._queueLength + ")");
        this._barrackQueue._isFirst = false;
    },

    showQueueData: function() {
        var k = 0;
        for(var i in this._troopList){
            var name = this._troopList[i]._name;
            k++;
            cc.log("======================= Linh thu: " + k);

            this._isShowTimeBar = true;
            this._statusCountDown = true;

            this._itemInQueue[name].setPosition(this._positionsInQueue[i]);
            this._itemInQueue[name].updateAmountSmall();

        }
        if(this._isShowTimeBar){
        //    cc.log("========================== Current time - start time = " + (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000);
            this.showTimeBar();
        }
    },


    touchEvent: function() {
        //Check capacity
        var totalCapacityAMC = getTotalCapacityAMCs();


        //Check tai nguyen
        var troop = new TroopInBarrack(this._name, 1);
        var costItem = troop.getCost();
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
        var troop = TRAIN_POPUP._barrackQueue.getTroopInBarrackByName(item._name);
        TRAIN_POPUP._itemInQueue[item._name].getChildByTag(101).setString('x' + troop._amount);
    },

    updateQueue: function(whoDrop) {
        this._barrackQueue.updateQueue();
        if(whoDrop == 0) {
            this._startTime = getCurrentServerTime();
            this._timeBar.visible = true;
            this._statusCountDown = true;
            this.countDown();
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
            var name = TRAIN_POPUP._troopList[i]._name;
            if(TRAIN_POPUP._itemDisplay[name].isEnabled() && (TRAIN_POPUP._barrackQueue.getTotalTroopCapacity() + TRAIN_POPUP._troopList[i]._housingSpace > TRAIN_POPUP._queueLength)){
                TRAIN_POPUP._itemDisplay[name].setBright(false);
                TRAIN_POPUP._itemDisplay[name].setEnabled(false);
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
            var name = TRAIN_POPUP._troopList[i]._name;
            if(!TRAIN_POPUP._itemDisplay[name].isEnabled() && (TRAIN_POPUP._barrack.getTotalTroopCapacity() + TRAIN_POPUP._troopList[i]._housingSpace <= TRAIN_POPUP._queueLength)){
                TRAIN_POPUP._itemDisplay[name].setBright(true);
                TRAIN_POPUP._itemDisplay[name].setEnabled(true);
                cc.log("===================== CO TROOP DUOC ENABLE===================");
            }
        }
    },

    showTimeBar: function(){
        //this.addTimeBarFirstItem();
        if(!this._statusCountDown || this._barrackQueue._isFirst){
            cc.log("======================== REAL =================");
            this.countDown();
        }else if(!temp.pauseOverCapacityFlag){       //Can them check dieu kien khi finish time success
            cc.log("======================== FAKE =================");
            this.lieTick();
        }
        this.addTimeBarFirstItem();
    },

    lieTick: function() {
        var self1 = this;
        var tick = function() {
            var self = self1;
            setTimeout(function() {
                //cc.log("======================= LIE COUNTDOWN BARRACK id:  =======================" + self._id);
                var cur = (getCurrentServerTime() - self._barrackQueue._startTime)/1000;
                if(!self.getFirstItemInQueue()) return;
                var max = self.getFirstItemInQueue()._trainingTime;
                if (max - cur <= 0 && BARRACK[self._id]._statusCountDown) {
                    tick();
                } else {
                    if(BARRACK[self._id]._statusCountDown){
                        self.updateTimeBar(cur, max);
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

        this._timeBar = timeBar;
        this.addChild(this._timeBar, 10000, 1711);


        //Hien thi timebar ben ngoai
        if(!getBarrackObjectById(this._id).timeBar){
            cc.log("============== NAME BUILDING: " + getBarrackObjectById(this._id)._name);
            getBarrackObjectById(this._id).addTimeBarTrain(0, max);
        }
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
                cc.log("======================= COUNTDOWN BARRACK id:  =======================" + self._id);
                var totalCapacity = getTotalCapacityAMCs();
                var currentCapacity = getTotalCurrentTroopCapacity();
                var cur = (getCurrentServerTime() - self._barrackQueue._startTime)/1000;
                if(!self.getFirstItemInQueue() || !self._barrackQueue.flagCountDown){
                    cc.log("======================================= STOP Countdown: barrack id:   " + self._id);
                    return;
                }

                var first = self.getFirstItemInQueue();
                var max = first._trainingTime;
                var condition = currentCapacity + first._housingSpace > totalCapacity;

                cc.log("======================== CUR ==================== " + cur);
                cc.log("======================== MAX ==================== " + max);

                if (max - cur <= 0 && !condition) {
                    var name = self.getFirstItemInQueue()._name;
                    temp.trainedBarrackId = self._id;
                    temp.trainedTroopType = name;
                    NETWORK.sendFinishTimeTrainTroop(self._id, name, self._barrackQueue.getTroopInBarrackByName(name)._amount - 1);
                } else {
                    if(BARRACK[self._id]._statusCountDown){
                        if(condition){
                            BARRACK[self._id].wait = true;
                            cc.log("=================== SET WAIT = TRUE ====================");
                            //barrackQueueList[self._id]._startTime += 1000;
                            //Chap nhan xong xenh, luc pause thi cho hien thi = trainingTime
                            getBarrackQueueById(self._id)._startTime = getCurrentServerTime();
                        }
                        self.updateTimeBar(cur, max);
                        self.updateQuickFinishTimeBar(cur, self.getTotalTimeQuickFinish());
                        getBarrackObjectById(self._id).updateTimeBar(cur, max);
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
        cc.log("==================== DUYYYYYYYYYYYY startTime: " + this._startTime);
        this._quickFinishTimeText.setString(timeToReadable(this.getTotalTimeQuickFinish()));
        var cur = (getCurrentServerTime() - this._startTime)/1000;
        this._costQuickFinish.setString(timeToG(this.getTotalTimeQuickFinish() - cur));
    },

    getFirstItemInQueue: function() {
        //return this._troopList[0];
        return this._barrackQueue._troopList[0];
    },

    getTotalTimeQuickFinish: function() {
        var totalTime = 0;
        for(var i in this._troopList){
            var trainingTime = config.troopBase[this._troopList[i]._name].trainingTime;
            totalTime += this._troopList[i]._amount * trainingTime;
        }
        return totalTime;
    },

    getTotalCapacityInQueue: function() {
        var totalCapacity = 0;
        for(var i in this._troopList){
            var space = config.troopBase[this._troopList[i]._name].housingSpace;
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
        var totalAfterTrain = getTotalCurrentTroopCapacity();
        for(var i in barrackQueueList){
            totalAfterTrain += barrackQueueList[i].getTotalTroopCapacity();
        }

        var str = new cc.LabelBMFont('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity, 'res/Art/Fonts/soji_20.fnt');
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
        var act1 = new cc.ScaleTo(0, 1, 1);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }

        var data = {train: true, barrack: this.getNextBarrack(this._id)};
        var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
    },

    onPrev: function() {
        var act1 = new cc.ScaleTo(0, 1, 1);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }

        var data = {train: true, barrack: this.getPrevBarrack(this._id)};
        var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
    },

    getNextBarrack: function(currentIdBarrack) {
        for(var k = 0; k < barrackRefs.length; k++){
            if(barrackRefs[k]._id == currentIdBarrack){
                if(barrackRefs[k]._status == 'pending' || barrackRefs[k]._status == 'upgrade') {
                    return barrackRefs[k];
                }else{
                    if(barrackRefs[k + 1]){
                        return barrackRefs[k + 1];
                    }else{
                        return barrackRefs[0];
                    }
                }
            }
        }
    },

    getPrevBarrack: function(currentIdBarrack) {
        for(var k in barrackRefs){
            if(barrackRefs[k]._id == currentIdBarrack){
                if(barrackRefs[k]._status == 'pending' || barrackRefs[k]._status == 'upgrade') {
                    return barrackRefs[k];
                }else{
                    if(barrackRefs[k - 1]){
                        return barrackRefs[k - 1];
                    }else{
                        return barrackRefs[barrackRefs.length - 1];
                    }
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
    }
});