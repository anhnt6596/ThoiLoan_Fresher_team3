var TRAIN_POPUP = TRAIN_POPUP || null;

var TrainPopup = TinyPopup.extend({
    _queue:null,
    _queueLength:0,
    _amountItemInQueue:0,                   //So loai item dang co trong queue
    _data:null,
    _itemInQueueClone:{},
    _positionsInQueueAgainstPopup:[],
    _positionsInQueueAgainstItem:[],
    _edgeSmallItem:55,

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
            item._gapPosition = cc.p(item.x - this.x, item.y - this.y);
            this.addChild(item, 10);

        }


        this.showTextTotalTroop();
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
    },

    touchEvent: function(item) {
        //Check capacity trc khi ++
        item._amount++;
        if(!item._isInQueue) {
            item._isInQueue = true;
        }

        //item.getChildByTag(17).setPosition(0, 0);
        item.getChildByTag(17).setPosition(cc.pAdd(cc.pSub(cc.p(item.x, item.y), cc.p(this.x, this.y)), TRAIN_POPUP._positionsInQueueAgainstPopup[0]));

        TRAIN_POPUP.updateAmount(item);
        cc.log("===================================== CLICKED ========================================= " + this._name + ': ' + this._amount);
    },

    updateAmount: function(item) {
        item._itemInQueue.getChildByTag(101).setString('x'+item._amount);
    },


    //4 vi tri tren queue
    init4PositionsInQueue: function() {
        this._positionsInQueueAgainstPopup[0] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 + this._edgeSmallItem*1.2, this._queue.y);
        this._positionsInQueueAgainstPopup[1] = cc.p(this._queue.x + this._queue.width * this._queue.scaleX /2 - this._edgeSmallItem*2, this._queue.y);
        this._positionsInQueueAgainstPopup[2] = cc.pSub(this._positionsInQueueAgainstPopup[1], cc.p(this._edgeSmallItem*2, 0));
        this._positionsInQueueAgainstPopup[3] = cc.pSub(this._positionsInQueueAgainstPopup[2], cc.p(this._edgeSmallItem*2, 0));
        
        
        


        //var test0 = new ccui.Button('res/Art/GUIs/train_troop_gui/slot.png');
        //test0.setPosition(this._positionsInQueueAgainstPopup[0]);
        //this.addChild(test0, 2000);
        //
        //var test1 = new ccui.Button('res/Art/GUIs/train_troop_gui/slot.png');
        //test1.setPosition(this._positionsInQueueAgainstPopup[1]);
        //this.addChild(test1, 2000);
        //
        //var test2 = new ccui.Button('res/Art/GUIs/train_troop_gui/slot.png');
        //test2.setPosition(this._positionsInQueueAgainstPopup[2]);
        //this.addChild(test2, 2000);
        //
        //var test3 = new ccui.Button('res/Art/GUIs/train_troop_gui/slot.png');
        //test3.setPosition(this._positionsInQueueAgainstPopup[3]);
        //this.addChild(test3, 2000);



    }


    //Can co ham update capacity khi 1 nha AMC_1 dc xay xong hoac upgrade xong
});