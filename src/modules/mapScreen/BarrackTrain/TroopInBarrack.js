var TroopInBarrack = cc.Class.extend({
    _amount:0,
    _name:null,
    _housingSpace:1,
    _trainingTime:0,
    _level:1,
    _trainingDarkElixir:0,
    _trainingElixir:0,

    ctor: function (troopName, amount) {
        this.initItem(troopName, amount);
    },

    initItem: function(troopName, amount) {
        this._name = troopName;
        this._amount = amount;
        this._level = troopInfo[this._name].level;
        this._housingSpace = config.troopBase[troopName].housingSpace;
        this._trainingTime = config.troopBase[troopName].trainingTime;
        this._trainingDarkElixir = config.troop[troopName][this._level].trainingDarkElixir;
        this._trainingElixir = config.troop[troopName][this._level].trainingElixir;
    },

    getCost: function(){
        var trainingElixir = this._trainingElixir;
        var trainingDarkElixir = this._trainingDarkElixir;
        return {gold:0, elixir:trainingElixir, darkElixir:trainingDarkElixir, coin:0};
    }

});