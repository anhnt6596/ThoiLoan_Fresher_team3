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
    _stop:null,


    ctor: function (width, height, title, type, data) {
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
        temp.endLieTick = false;

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
        if(this._barrackQueue._troopList.length > 0){
            //Neu current troop capacity > max AMC capacity thi khong cho chay
            this.showQueueData();
        }

        this.showTextTotalTroop();
        this._titleText.setString("Barrack " + getBarrackOrderById(this._id) + "   (" + this._barrackQueue.getTotalTroopCapacity()+"/"+this._queueLength + ")");
        this._barrackQueue._isFirst = false;
    },

    showQueueData: function() {
        if(this._barrackQueue._troopList.length > 0){
            this._isShowTimeBar = true;
            this._statusCountDown = true;
        }


        for(var i in this._barrackQueue._troopList){
            var name = this._barrackQueue._troopList[i]._name;
            cc.log("======================= Linh thu: " + (i+1));
            this.setItemToPositionInQueue(name, i);
            this.updateAmountSmall(name);
        }
        if(this._isShowTimeBar){
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

    updateLabels: function() {
        var totalCapacity = getTotalCapacityAMCs();
        var totalAfterTrain = getTotalCurrentTroopCapacity();
        for(var i in barrackQueueList){
            totalAfterTrain += barrackQueueList[i].getTotalTroopCapacity();
        }
        this.str.setString('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity);
        this.upadateQuickFinishTimeAndCost();

        this._titleText.setString("Barrack " + getBarrackOrderById(this._id) + "   (" + this._barrackQueue.getTotalTroopCapacity() + "/" + this._queueLength + ")");
    },

    updateQueue: function(whoDrop) {
        var troopType = this._barrackQueue._troopList[whoDrop]._name;
        this._itemInQueue[troopType].setPosition(-1000, -1000);

        if(whoDrop == 0) {
            this._barrackQueue._startTime = getCurrentServerTime();
            if(this._timeBar != null) this._timeBar.visible = true;
            this._statusCountDown = true;
            this.countDown();
        }

        for(var k = 0; k < this._barrackQueue._troopList.length; k++){
            if(k > whoDrop){
                var name = this._barrackQueue._troopList[k]._name;
                this.setItemToPositionInQueue(name, k-1);
            }
        }

        this._barrackQueue.updateQueue(whoDrop);
    },

    updateAmountSmall: function(troopType) {
        this._itemInQueue[troopType].updateAmountSmall();
    },

    resetQueue: function() {
        for(var i = 0; i < this._barrackQueue._troopList.length; i++){
            var name = this._barrackQueue._troopList[i]._name;
            troopInfo[name].population += this._barrackQueue._troopList[i]._amount;
            this._itemInQueue[name].setPosition(-1000, -1000);
        }
        LOBBY.update(gv.user);
        this._barrackQueue._startTime = 0;
        this._barrackQueue.doReset();
    },

    disableItemDisplay: function() {
        for(var i in this._barrackQueue._troopList){
            //if(!this._troopList[i]){
            //    cc.log("===================== KHONG CO TROOP NAY TRONG TROOP LIST===================");
            //    this._itemDisplay[i].setBright(false);
            //    this._itemDisplay[i].setEnabled(false);
            //    continue;
            //}
            var name = this._barrackQueue._troopList[i]._name;
            if(this._itemDisplay[name].isEnabled() && (this._barrackQueue.getTotalTroopCapacity() + this._barrackQueue._troopList[i]._housingSpace > this._queueLength)){
                this._itemDisplay[name].setBright(false);
                this._itemDisplay[name].setEnabled(false);
                cc.log("===================== CO TROOP SE BI DISABLE===================");
            }
        }
    },

    enableItemDisplay: function() {
        //for(var i = 0; i < this._barrackQueue._troopList; i++){
        for(var i in this._barrackQueue._troopList){
            //if(!this._troopList[i]){
            //    cc.log("===================== KHONG CO TROOP NAY TRONG TROOP LIST===================");
            //    this._itemDisplay[i].setBright(false);
            //    this._itemDisplay[i].setEnabled(false);
            //    continue;
            //}
            var name = this._barrackQueue._troopList[i]._name;
            if(!this._itemDisplay[name].isEnabled() && (this._barrackQueue.getTotalTroopCapacity() + this._barrackQueue._troopList[i]._housingSpace <= this._queueLength)){
                this._itemDisplay[name].setBright(true);
                this._itemDisplay[name].setEnabled(true);
                cc.log("===================== CO TROOP DUOC ENABLE===================");
            }
        }
    },

    setItemToPositionInQueue: function(troopType, pos) {
        this._itemInQueue[troopType].setPosition(this._positionsInQueue[pos]);
    },

    showTimeBar: function(){
        if(!this._statusCountDown || this._barrackQueue._isFirst){
            cc.log("======================== RRRRRRRRRRRRRRRREAL =================");
            this.countDown();
        }else {
            cc.log("======================== FFFFFFFFFFFFFFFFFFAKE =================");
            this.lieTick();
        }
        this.addTimeBarFirstItem();
    },

    lieTick: function() {
        var self1 = this;
        var tick = function() {
            var self = self1;
            setTimeout(function() {
                if(temp.endLieTick) return;
                cc.log("======================= LIE COUNTDOWN BARRACK id:  =======================" + self._id);
                var totalCapacity = getTotalCapacityAMCs();
                var currentCapacity = getTotalCurrentTroopCapacity();
                var firstItem = self.getFirstItemInQueue();
                if(!firstItem) return;

                var condition = currentCapacity + firstItem._housingSpace > totalCapacity;

                var cur = (getCurrentServerTime() - self._barrackQueue._startTime)/1000;
                var max = firstItem._trainingTime;
                if (max - cur <= 0 && BARRACK[self._id]._statusCountDown) {
                    if(condition) {
                        cc.log("============================== LIE STOP Countdown do > capacity");
                        self._timeText.setString("STOP");
                        self.updateQuickFinishTimeBar(0, self.getTotalTimeQuickFinish());
                        getBarrackObjectById(self._id).updateTimeBar(cur, max);
                        return;
                    }
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

    setStatusCountDown: function(status) {
        this._isShowTimeBar = status;
        this._statusCountDown = status;
    },

    removeAllTrainBars: function() {
        cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
        if(this._timeBar) this._timeBar.visible = false;
        this.removeTrainBarMap(this._id);
    },

    removeTrainBarMap: function(idBarrack) {
        if(getBarrackObjectById(idBarrack).timeBar){
            MAP.removeChild(getBarrackObjectById(idBarrack).timeBar);
            getBarrackObjectById(idBarrack).timeBar = null;
        }
    },

    addTimeBarFirstItem: function() {
        var cur = (getCurrentServerTime() - this._barrackQueue._startTime)/1000;
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

        var t;
        if(cur > max) {
            t = "STOP";
        }else{
            t = timeToReadable(max - cur);
        }

        var timeText = new cc.LabelBMFont(t, res.font_soji[16]);
        this._timeText = timeText;
        timeBar.addChild(timeText);
        timeText.setPosition(timeBar.width / 2, timeBar.height/2 - 20);

        //Quick finish
        var totalTimeLabel = new cc.LabelBMFont('Total time', res.font_soji[20]);
        totalTimeLabel.setPosition(timeBar.x + timeBar.width/2, timeBar.y);
        timeBar.addChild(totalTimeLabel, 2);

        var totalTimeNumber = new cc.LabelBMFont(timeToReadable(this.getTotalTimeQuickFinish()), res.font_soji[20]);
        totalTimeNumber.setPosition(timeBar.x + timeBar.width/2, timeBar.y - 30);
        this._quickFinishTimeText = totalTimeNumber;
        timeBar.addChild(totalTimeNumber, 2);

        var quickFinishLabel = new cc.LabelBMFont("Quick finish", res.font_soji[20]);
        timeBar.addChild(quickFinishLabel);
        quickFinishLabel.setPosition(totalTimeLabel.x, totalTimeLabel.y - 60);

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

        if(cur > max) {
            cur = 0;
        }
        var costQuickFinish = new cc.LabelBMFont(timeToG(this.getTotalTimeQuickFinish() - cur), res.font_soji[20]);
        timeBar.addChild(costQuickFinish, 3);
        costQuickFinish.setPosition(btnQuickFinish.x - 20, btnQuickFinish.y);
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
                var firstItem = self.getFirstItemInQueue();

                if(!firstItem || self._barrackQueue.isUpgrade){
                    cc.log("======================================= STOP Countdown: barrack id:   " + self._id);
                    return;
                }

                var cur = (getCurrentServerTime() - self._barrackQueue._startTime)/1000;
                var max = firstItem._trainingTime;

                if (max - cur <= 0) {
                    if(currentCapacity + firstItem._housingSpace > totalCapacity) {
                        cc.log("============================== STOP Countdown do > capacity");
                        BARRACK[self._id]._barrackQueue._stop = true;
                        cc.log("============================== BARRACK id: " + self._id + " STOP = TRUE");
                        NETWORK.sendStropTrain(self._id);
                        return;
                    }
                    BARRACK[self._id]._barrackQueue._stop = false;
                    var name = firstItem._name;
                    NETWORK.sendFinishTimeTrainTroop(self._id, name, self._barrackQueue.getTroopInBarrackByName(name)._amount - 1);
                } else if(BARRACK[self._id]._statusCountDown){
                    self.updateTimeBar(cur, max);
                    self.updateQuickFinishTimeBar(cur, self.getTotalTimeQuickFinish());
                    getBarrackObjectById(self._id).updateTimeBar(cur, max);
                    tick();
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
            this._btnQuickFinish.setBright(false);
            this._btnQuickFinish.setEnabled(false);
        }else{
            this._btnQuickFinish.setBright(true);
            this._btnQuickFinish.setEnabled(true);
        }
    },

    //update thoi gian hien thi va cost khi thay doi so luong troop
    upadateQuickFinishTimeAndCost: function(){
        this._quickFinishTimeText.setString(timeToReadable(this.getTotalTimeQuickFinish()));
        var cur = (getCurrentServerTime() - this._barrackQueue._startTime)/1000;
        var max = this.getTotalTimeQuickFinish();
        if(cur > max) {
            cur = 0;
        }
        this._costQuickFinish.setString(timeToG(max - cur));
    },

    getFirstItemInQueue: function() {
        return this._barrackQueue._troopList[0];
    },

    getTotalTimeQuickFinish: function() {
        var totalTime = 0;
        for(var i in this._barrackQueue._troopList){
            var trainingTime = config.troopBase[this._barrackQueue._troopList[i]._name].trainingTime;
            totalTime += this._barrackQueue._troopList[i]._amount * trainingTime;
        }
        return totalTime;
    },

    getTotalCapacityInQueue: function() {
        var totalCapacity = 0;
        for(var i in this._barrackQueue._troopList){
            var space = config.troopBase[this._barrackQueue._troopList[i]._name].housingSpace;
            totalCapacity += this._barrackQueue._troopList[i]._amount * space;
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
        this._titleText.setString('Barrack ' + getBarrackOrderById(this._id) + '(' + this._queueLength + ')');
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

        var str = new cc.LabelBMFont('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity, res.font_soji[20]);
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

        createTrainPopup(this.getNextBarrack(this._id), true);
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

        createTrainPopup(this.getPrevBarrack(this._id), true);
    },

    getNextBarrack: function(id) {
        var length = barrackRefs.length;
        for(var k = 0; k < length; k++){
            if(barrackRefs[k] && barrackRefs[k]._id > id && barrackRefs[k]._status == COMPLETE){
                return barrackRefs[k];
            }
        }

        for(var k = 0; k < length; k++){
            if(barrackRefs[k] && barrackRefs[k]._status == COMPLETE){
                return barrackRefs[k];
            }
        }
    },

    getPrevBarrack: function(id) {
        var length = barrackRefs.length;
        for(var k = length-1; k >= 0; k--){
            if(barrackRefs[k] && barrackRefs[k]._id < id && barrackRefs[k]._status == COMPLETE){
                return barrackRefs[k];
            }
        }

        for(var k = length-1; k >= 0; k--){
            if(barrackRefs[k] && barrackRefs[k]._status == COMPLETE){
                return barrackRefs[k];
            }
        }
    },

    close: function() {
        temp.endLieTick = true;

        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        var children = this.getChildren();
        for(var i in children){
            children[i].retain();
        }
    }
});