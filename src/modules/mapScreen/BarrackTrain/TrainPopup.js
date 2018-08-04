var TRAIN_POPUP = TRAIN_POPUP || null;

var TrainPopup = TinyPopup.extend({
    _queue:null,
    _queueLength:0,
    _amountItemInQueue:0,                   //So loai item dang co trong queue
    _data:null,
    _itemInQueue:{},
    _positionsInQueueAgainstPopup:[],
    _positionsInQueueAgainstItem:[],
    _troopList:{},
    _startTime:0,
    _edgeItem:94,
    _timeBar:null,
    _statusCountDown:false,
    _timeText:null,

    ctor: function (width, height, title, type, data) {
        TRAIN_POPUP = this;
        this._width = width;
        this._height = height;
        this._data = data;
        this._super(width, height, title, type, data);

        this.initQueue();
        this.init4PositionsInQueue();

        for (var i = 0; i < 4; i++) {
            var a = i + 1;
            var name = 'ARM_' + a;
            var item = new TroopItem(name);
            item.addClickEventListener(this.touchEvent.bind(item));
            item.setPosition(-1* this._width/2 + (item.width+10)*i + item.width/2 + 30, 0);
            this.addChild(item, 10);
            
            this._itemInQueue[name] = new SmallTroopItem(name);
            this.addChild(this._itemInQueue[name], 100);
            this._itemInQueue[name].setPosition(-1000, -1000);


            this._troopList[name] = new Troop(name, 1);
        }

        this.showTimeBar();
        this.showTextTotalTroop();
    },


    touchEvent: function() {
        //Check capacity trc khi ++
        TRAIN_POPUP._troopList[this._name]._amount++;
        if(!TRAIN_POPUP._troopList[this._name]._isInQueue) {
            TRAIN_POPUP._troopList[this._name]._isInQueue = true;
            TRAIN_POPUP._amountItemInQueue++;
            TRAIN_POPUP._troopList[this._name]._currentPosition = TRAIN_POPUP._amountItemInQueue - 1;

            if(TRAIN_POPUP._troopList[this._name]._currentPosition == 0 && TRAIN_POPUP._troopList[this._name]._amount == 1){
                TRAIN_POPUP._startTime = getCurrentServerTime();
                cc.log("===================================== ADD START TIME ========================================= " + TRAIN_POPUP._startTime);
                TRAIN_POPUP._timeBar.visible = true;
                TRAIN_POPUP._statusCountDown = true;
            }

            TRAIN_POPUP._itemInQueue[this._name].setPosition(TRAIN_POPUP._positionsInQueueAgainstPopup[TRAIN_POPUP._troopList[this._name]._currentPosition]);
        }
        TRAIN_POPUP.updateAmount(this);
        //cc.log("===================================== CLICKED ========================================= " + this._name + ': ' + TRAIN_POPUP._troopList[this._name]._amount);
    },

    updateAmount: function(item) {
        TRAIN_POPUP._itemInQueue[item._name].getChildByTag(101).setString('x'+TRAIN_POPUP._troopList[item._name]._amount);
    },

    updateQueue: function(whoDrop) {
        for(var k in this._troopList){
            if(this._troopList[k]._currentPosition > whoDrop){
                this._itemInQueue[k].setPosition(this._positionsInQueueAgainstPopup[this._troopList[k]._currentPosition - 1]);
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

    showTimeBar: function(){
        this.addTimeBarFirstItem();
        this.countDown();
    },

    addTimeBarFirstItem: function() {
        var cur = 1;
        var max = 1;

        var timeBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_train_bar.png');
        timeBar.setPosition(this._positionsInQueueAgainstPopup[0].x, this._positionsInQueueAgainstPopup[0].y - this._edgeItem/1.5);

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

        timeBar.visible = false;

        this._timeBar = timeBar;
        this.addChild(this._timeBar, 10000);
    },

    countDown: function(){
        var tick = function() {
            setTimeout(function() {
                var cur = (getCurrentServerTime() - TRAIN_POPUP._startTime)/1000;
                var max;
                if(!TRAIN_POPUP.getFirstItemInQueue()){
                    max = cur;
                }else{
                    max = TRAIN_POPUP.getFirstItemInQueue()._trainingTime;
                }
                cc.log("===================================CUR TIME=============================" + cur);
                cc.log("===================================MAX TIME=============================" + max);
                cc.log("===================================START TIME=============================" + TRAIN_POPUP._startTime);
                if (cur > max) {
                    //Cho linh chay ra khoi barrack
                    cc.log("===================================RETURN HERE=============================");
                    if(!TRAIN_POPUP.getFirstItemInQueue()){
                        return;
                    }
                    var name = TRAIN_POPUP.getFirstItemInQueue()._name;
                    TRAIN_POPUP._itemInQueue[name].setPosition(-1000, -1000);
                    TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[name]._currentPosition);
                    TRAIN_POPUP._troopList[name]._currentPosition = -1;
                    return;
                } else {
                    TRAIN_POPUP.updateTimeBar(cur, max);
                    //if(this._statusCountDown){
                        tick();
                    //}
                }
                //cur +=1;
            }, 1000);
        };
        //Chay 1 lan
        tick();
    },


    updateTimeBar: function(cur, max) {
        var ratio = cur / max;
        var t = timeToReadable(max - cur);
        this.processBar.setTextureRect(cc.rect(0, 0, this._timeBar.width * ratio, this._timeBar.height));
        this._timeText.setString(t);
    },



    getFirstItemInQueue: function() {
        cc.log("===================================GET TRAINING TIME FIRST ITEM QUEUE=============================");

        var first = null;
        for(var k in this._troopList){
            if(this._troopList[k]._currentPosition == 0){
                first = this._troopList[k];
                cc.log("===================================HEREEEEEEEEEEEEEEEE=============================");

                break;
            }
        }
        return first;
    },


    //4 vi tri tren queue
    init4PositionsInQueue: function() {
        this._positionsInQueueAgainstPopup[0] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 + this._edgeItem*1.2, this._queue.y);
        this._positionsInQueueAgainstPopup[1] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 - this._edgeItem*1.5, this._queue.y);
        this._positionsInQueueAgainstPopup[2] = cc.pSub(this._positionsInQueueAgainstPopup[1], cc.p(this._edgeItem*1.2, 0));
        this._positionsInQueueAgainstPopup[3] = cc.pSub(this._positionsInQueueAgainstPopup[2], cc.p(this._edgeItem*1.2, 0));
    },

    initQueue: function() {
        this._queueLength = config.building['BAR_1'][this._data.barrack._level].queueLength;
        this._titleText.setString('Barrack id ' + this._data.barrack._id + '(' + this._queueLength + ')');
        this._titleText.setScale(1.5);

        this._queue = new cc.Sprite('res/Art/GUIs/train_troop_gui/queue.png');
        this._queue.setPosition(-this._width/5, this._height/3.5);
        this._queue.setScale(this._width*3/5 / this._queue.width, 1);
        this.addChild(this._queue, 10);
    },

    showTextTotalTroop: function() {
        var totalCapacity = getTotalCapacity();
        var str = new cc.LabelBMFont('Total troops after training: xx/' + totalCapacity, 'res/Art/Fonts/soji_20.fnt');
        str.setPosition(-1*this._width/4, this._height*this._frame.scaleY/9);
        this.addChild(str, 2);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
        resetReducedTempResources();
    }
    //Can co ham update capacity khi 1 nha AMC_1 dc xay xong hoac upgrade xong
});