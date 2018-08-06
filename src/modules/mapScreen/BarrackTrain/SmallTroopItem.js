var SMALL_TROOP_ITEM = SMALL_TROOP_ITEM || null;

var SmallTroopItem = ccui.Button.extend({
    _name:null,

    ctor: function (troopName) {
        SMALL_TROOP_ITEM = this;
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initSmallItem(troopName);
    },

    initSmallItem: function(troopName){
        var img = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon/'+troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 1);

        var amountLabel = new cc.LabelBMFont('x'+this._amount, 'res/Art/Fonts/soji_20.fnt');
        amountLabel.setPosition(this.width/2 + 10, this.height - amountLabel.height/2 - 10);
        this.addChild(amountLabel, 101, 101);

        var reduce = new cc.Sprite('res/Art/GUIs/train_troop_gui/cancel.png');
        reduce.setScale(1.5);
        reduce.setPosition(this.width - 10, this.height - 10);
        this.addChild(reduce, 8);

        this.addClickEventListener(this.touchEventSmall.bind(this));
    },

    touchEventSmall: function() {
        //if(TRAIN_POPUP._troopList[this._name]._amount > 0){
            TRAIN_POPUP._troopList[this._name]._amount--;
            if(TRAIN_POPUP._troopList[this._name]._amount == 0){
                TRAIN_POPUP._troopList[this._name]._isInQueue = false;
                TRAIN_POPUP._amountItemInQueue--;
                if(TRAIN_POPUP._amountItemInQueue == 0){
                    TRAIN_POPUP._timeBar.visible = false;
                    cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
                    TRAIN_POPUP._statusCountDown = false;
                }else{
                    TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[this._name]._currentPosition);
                }
                this.setPosition(-1000, -1000);
                TRAIN_POPUP._troopList[this._name]._currentPosition = -1;
            }
            this.updateAmountSmall();

            //Refund
        //}
    },

    updateAmountSmall: function() {
        this.getChildByTag(101).setString('x'+TRAIN_POPUP._troopList[this._name]._amount);
    }
});