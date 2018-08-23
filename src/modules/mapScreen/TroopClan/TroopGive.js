var TroopGive = ccui.Button.extend({
    _name:null,
    _disable:false,

    ctor: function (troopName) {
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName);
    },

    initItem:function(troopName){
        var img = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon/'+troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 100);


        //var requireLevelBarrack = config.troopBase[troopName].barracksLevelRequired;
        //if(barrackLevel < requireLevelBarrack){
        //    this.setDisable();
        //}else{
        //    var cost = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_cost.png');
        //    cost.setPosition(this.width/2, cost.height/2+10);
        //    this.addChild(cost, 101);
        //
        //    var currentLevelTroop = troopInfo[troopName].level;
        //
        //    var cost_label = new cc.LabelBMFont(config.troop[troopName][currentLevelTroop].trainingElixir, 'res/Art/Fonts/soji_12.fnt');
        //    cost_label.setPosition(this.width/2, cost.y);
        //    this.addChild(cost_label, 101);
        //
        //    var costUnit = new cc.Sprite('res/Art/GUIs/train_troop_gui/icon_elixir.png');
        //    costUnit.setPosition(this.width - costUnit.width, cost.y);
        //    this.addChild(costUnit, 101);
        //}
        //
        var levelLabel = new cc.LabelBMFont(troopInfo[this._name].level, 'res/Art/Fonts/soji_24.fnt');
        levelLabel.setPosition(levelLabel.width/2 + 5, levelLabel.height/2 + 5);
        levelLabel.setColor(new cc.color(0, 255, 0, 255));
        this.addChild(levelLabel, 109);

        var currentAmount = new cc.LabelBMFont(troopInfo[this._name].population, 'res/Art/Fonts/fista_24_non.fnt');
        currentAmount.setPosition(this.x + this.width/2, -currentAmount.height/2 - 5);
        currentAmount.setColor(new cc.color(255, 0, 255, 255));
        this.currentAmount = currentAmount;
        this.addChild(currentAmount, 109);
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