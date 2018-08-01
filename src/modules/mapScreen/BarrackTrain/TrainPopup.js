var TRAIN_POPUP = TRAIN_POPUP || null;

var TrainPopup = TinyPopup.extend({
    _queue:null,
    _queueLength:0,
    _amountItemInQueue:0,
    _data:null,

    ctor: function (width, height, title, type, listener) {
        TRAIN_POPUP = this;
        this._width = width;
        this._height = height;
        this._data = listener;
        this._super(width, height, title, type, listener);

        this.initQueue();

        for (var i = 0; i < 7; i++) {
            var a = i + 1;
            var item = new TroopItem('ARM_'+a);
            item.addClickEventListener(this.touchEvent.bind(item));
            item.setPosition(-1* this._width/2 + (item.width+10)*i + item.width/2 + 30, 0);
            this.addChild(item, 10);
        }


        this.showTextTotalTroop();
    },

    initQueue: function() {
        this._queueLength = config.building['BAR_1'][this._data.barrack._level].queueLength;
        this._titleText.setString('Barrack id ' + this._data.barrack._id + '(' + this._queueLength + ')');
        this._titleText.setScale(1.5);

        this._queue = new cc.Sprite('res/Art/GUIs/train_troop_gui/queue.png');
        this._queue.setPosition(-this._width/4, this._height/4);
        this._queue.setScale(this._width*3/5 / this._queue.width, 1);
        this.addChild(this._queue, 10);
    },

    showTextTotalTroop: function() {
        var totalCapacity = getTotalCapacity();
        var str = new cc.LabelBMFont('Total troops after training: xx/' + totalCapacity, 'res/Art/Fonts/soji_20.fnt');
        str.setPosition(-1*this._width/4, this._height*this._frame.scaleY/8);
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
        item._amount++;
        if(item._isInQueue){
            //Hien thi tang so luong tren hang doi
        }else{
            //push vao cuoi hang doi
            cc.log("============================== QUEUE LENGTH: "+TRAIN_POPUP._queueLength);
            cc.log("===================================== PUSH VAO HANG DOI ========================================= ");

            item.initItemInQueue(item._name);
            item._itemInQueue.setPosition(0, 0);
            TRAIN_POPUP._queue.addChild(item._itemInQueue, 10);

        }
        cc.log("===================================== CLICKED ========================================= " + this._name + ': ' + this._amount);
    }


    //Can co ham update capacity khi 1 nha AMC_1 dc xay xong hoac upgrade xong
});