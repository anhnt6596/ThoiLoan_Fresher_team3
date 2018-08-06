var TroopInBarrack = cc.Class.extend({
    _amount:0,
    _isInQueue:false,
    _name:null,
    _currentPosition:-1,
    _housingSpace:1,
    _trainingTime:0,
    _barrackLevelRequired:1,        //Luc lay du lieu ve thi khong can cai nay
    _level:1,
    _trainingDarkElixir:0,
    _trainingElixir:0,

    ctor: function (troopName, level) {
        this.initItem(troopName, level);
    },

    initItem: function(troopName, level) {
        this._name = troopName;
        this._level = level;
        this._housingSpace = config.troopBase[troopName].housingSpace;
        this._trainingTime = config.troopBase[troopName].trainingTime;
        this._barrackLevelRequired = config.troopBase[troopName].barracksLevelRequired;
        this._trainingDarkElixir = config.troop[troopName][level].trainingDarkElixir;
        this._trainingElixir = config.troop[troopName][level].trainingElixir;
    },

    getCost: function(){
        var trainingElixir = this._trainingElixir;
        var trainingDarkElixir = this._trainingDarkElixir;
        return {gold:0, elixir:trainingElixir, darkElixir:trainingDarkElixir, coin:0};
    }

});