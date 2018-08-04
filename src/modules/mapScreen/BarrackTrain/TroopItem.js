var TROOP_ITEM = TROOP_ITEM || null;

var TroopItem = ccui.Button.extend({
    _name:null,

    ctor: function (troopName) {
        TROOP_ITEM = this;
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName);
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
    }
});