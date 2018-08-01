var TroopItem = ccui.Button.extend({
    _amount:0,
    _isInQueue:false,
    _name:null,
    _itemInQueue:null,

    ctor: function (troopName) {
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName);

        this.initItemInQueue(troopName);
    },

    initItem:function(troopName){
        var img = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon/'+troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 100);

        var this_cost = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_cost.png');
        this_cost.setPosition(this.width/2, this_cost.height/2+10);
        this.addChild(this_cost, 101);

        var currentLevelTroop = 1;

        var cost_label = new cc.LabelBMFont(config.troop[troopName][currentLevelTroop].trainingElixir, 'res/Art/Fonts/soji_12.fnt');
        cost_label.setPosition(this.width/2, this_cost.y);
        this.addChild(cost_label, 101);

        var costUnit = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon_elixir.png');
        costUnit.setPosition(this.width - costUnit.width, this_cost.y);
        this.addChild(costUnit, 101);
    },

    initItemInQueue: function(troopName){
        this._itemInQueue = new ccui.Button('res/Art/GUIs/train_troop_gui/small_icon/slot.png');

        var img = new cc.Sprite('res/Art/GUIs/train_troop_gui/small_icon/'+troopName+'.png');
        img.setPosition(this._itemInQueue.width/2, this._itemInQueue.height/2);
        this._itemInQueue.addChild(img, 1);

        var amountLabel = new cc.LabelBMFont('x'+this._amount, 'res/Art/Fonts/soji_12.fnt');
        amountLabel.setPosition(amountLabel.width/2 + 10, this._itemInQueue.height - amountLabel.height/2 - 10);
        this._itemInQueue.addChild(amountLabel, 101);

        this._itemInQueue.addClickEventListener(this.touchEvent.bind(this));
    },

    touchEvent: function() {
        if(this._amount > 0){
            this._amount--;
        }
        cc.log("===================================== CLICKED REDUCE ========================================= " + this._name + ': ' + this._amount);
    }
});