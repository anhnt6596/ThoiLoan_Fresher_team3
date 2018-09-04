var TroopGive = ccui.Button.extend({
    _name:null,
    _disable:false,

    ctor: function (troopName) {
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName);
    },

    initItem:function(troopName){
        var img = new cc.Sprite(train_troop_constant.img_train_troop_dir + troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 100);

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