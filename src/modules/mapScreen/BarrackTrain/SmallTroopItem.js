var SMALL_TROOP_ITEM = SMALL_TROOP_ITEM || null;

var SmallTroopItem = ccui.Button.extend({
    _name:null,
    _barrackId:null,

    ctor: function (troopName, barrackId) {
        SMALL_TROOP_ITEM = this;
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this._barrackId = barrackId;
        this.initSmallItem(troopName);
    },

    initSmallItem: function(troopName){
        var img = new cc.Sprite(train_troop_constant.img_train_troop_dir + troopName + '.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 1);

        var amountLabel = new cc.LabelBMFont('x'+this._amount, res.font_soji[20]);
        amountLabel.setPosition(this.width/2 + 10, this.height - amountLabel.height/2 - 10);
        this.addChild(amountLabel, 101, 101);

        var reduce = new cc.Sprite('res/Art/GUIs/train_troop_gui/cancel.png');
        reduce.setScale(1.5);
        reduce.setPosition(this.width - 10, this.height - 10);
        this.addChild(reduce, 8);

        this.addClickEventListener(this.touchEventSmall.bind(this));
    },

    touchEventSmall: function() {
        temp.trainedBarrackId = TRAIN_POPUP._id;
        temp.trainedTroopType = this._name;
        NETWORK.sendCancelTrainTroop(TRAIN_POPUP._id, this._name);
    },

    updateAmountSmall: function() {
        var barrack = getBarrackQueueById(this._barrackId);
        var troop = barrack.getTroopInBarrackByName(this._name);
        if(troop){
            this.getChildByTag(101).setString('x'+troop._amount);
        }
    }
});