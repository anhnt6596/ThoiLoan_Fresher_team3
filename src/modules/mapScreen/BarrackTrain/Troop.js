var Troop = cc.Class.extend({
    _amount:0,
    _isInQueue:false,
    _name:null,
    _currentPosition:-1,
    _positionsInQueue:[],
    _housingSpace:1,
    _trainingTime:0,
    _barrackLevelRequired:1,
    _level:1,                       //cost phu thuoc vao level
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
    }

});