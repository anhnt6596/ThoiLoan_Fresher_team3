var TroopItem = ccui.Button.extend({
    _name:null,
    _disable:false,

    ctor: function (troopName, barrackLevel) {
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName, barrackLevel);
    },

    initItem:function(troopName, barrackLevel){
        var img = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon/'+troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 100);

        var requireLevelBarrack = config.troopBase[troopName].barracksLevelRequired;
        if(barrackLevel < requireLevelBarrack){
            this.setDisable();
            var requiredLabel = new cc.LabelBMFont("     Require\nBarrack level\n           " + requireLevelBarrack, 'res/Art/Fonts/soji_12.fnt');
            requiredLabel.setColor(cc.color(255, 0, 0, 255));
            requiredLabel.setPosition(this.width/2, this.height/2);
            this.addChild(requiredLabel, 10000);
        }else{
            var cost = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_cost.png');
            cost.setPosition(this.width/2, cost.height/2+10);
            this.addChild(cost, 101);

            var currentLevelTroop = 1;

            var cost_label = new cc.LabelBMFont(config.troop[troopName][currentLevelTroop].trainingElixir, 'res/Art/Fonts/soji_12.fnt');
            cost_label.setPosition(this.width/2, cost.y);
            this.addChild(cost_label, 101);

            var costUnit = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon_elixir.png');
            costUnit.setPosition(this.width - costUnit.width, cost.y);
            this.addChild(costUnit, 101);
        }
    },

    setDisable: function() {
        this._disable = true;
        this.setColor(cc.color(128, 128, 128, 255));
    },

    setEnable: function() {
        this._disable = false;
        this.setColor(cc.color(255, 255, 255, 255));
    }
});