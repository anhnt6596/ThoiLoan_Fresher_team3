var BarrackQueue = cc.Class.extend({
    _idBarrack:null,
    _barrackLevel:1,
    _startTime:0,
    _troopList:null,

    ctor: function (id, level, startTime) {
        this._idBarrack = id;
        this._barrackLevel = level;
        this._startTime = startTime;
        this._troopList = [];
    },

    getTroopInBarrackByName: function(troopType) {
        //for(var i = 0; i < this._troopList.length; i++) {
        for(var i in this._troopList) {
            var troop = this._troopList[i];
            if(troop._name == troopType) return troop;
        }
        return null;
    },

    getTroopPositionInQueue: function(troopType) {
        for(var i = 0; i < this._troopList.length; i++) {
            var troop = this._troopList[i];
            if(troop._name == troopType) return i;
        }
    },

    removeTroopInBarrackByName: function(troopType) {
        for(var i = 0; i < this._troopList.length; i++) {
            var troop = this._troopList[i];
            if(troop._name == troopType) this._troopList.splice(i, 1);
        }
    },

    doReset: function() {
        this._troopList = [];
    },

    updateQueue: function(dropedPosition) {
        this._troopList.splice(dropedPosition, 1);
    },

    getTotalTroopCapacity: function() {
        var total = 0;
        for(var i = 0; i < this._troopList.length; i++) {
            var troop = this._troopList[i];
            total += troop._amount * troop._housingSpace;
        }
        return total;
    },

    getAmountItemInQueue: function() {
        return this._troopList.length;
    }
});