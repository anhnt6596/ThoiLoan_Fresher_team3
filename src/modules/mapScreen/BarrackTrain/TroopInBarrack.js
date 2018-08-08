var TroopInBarrack = cc.Class.extend({
    _amount:0,
    _isInQueue:false,
    _currentPosition:-1,

    _name:null,
    _housingSpace:1,
    _trainingTime:0,
    //_barrackLevelRequired:1,        //Luc lay du lieu ve thi khong can cai nay
    _level:1,
    _trainingDarkElixir:0,
    _trainingElixir:0,

    ctor: function (troopName, amount, isInQueue, currentPosition) {
        this.initItem(troopName, amount, isInQueue, currentPosition);
    },

    initItem: function(troopName, amount, isInQueue, currentPosition) {
        this._name = troopName;
        this._amount = amount;
        this._isInQueue = isInQueue;
        this._currentPosition = currentPosition;
        //this._level = troopInfo[this._name].level;
        this._level = 1;
        this._housingSpace = config.troopBase[troopName].housingSpace;
        this._trainingTime = config.troopBase[troopName].trainingTime;
        //this._barrackLevelRequired = config.troopBase[troopName].barracksLevelRequired;
        this._trainingDarkElixir = config.troop[troopName][this._level].trainingDarkElixir;
        this._trainingElixir = config.troop[troopName][this._level].trainingElixir;
    },

    getCost: function(){
        var trainingElixir = this._trainingElixir;
        var trainingDarkElixir = this._trainingDarkElixir;
        return {gold:0, elixir:trainingElixir, darkElixir:trainingDarkElixir, coin:0};
    }

});