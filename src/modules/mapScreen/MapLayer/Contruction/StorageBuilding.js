var StorageBuilding = Building.extend({
    _capacity: 1000,
    _curStorage: 250,
    ctor: function(info, userInfo) {
        this._super(info);
        this.calculateStorage(info, userInfo);
    },
    presentImg: function() {
        var self = this;
        var present = (4 * this._curStorage / this._capacity - 0.5).toFixed(0);
        if (present < 0) {
            present = 0;
        } else if (present >= 4) {
            present = 3;
        }
        this.buildingImage.forEach(function(item, i) {
            if (i == present) self.buildingImage[i].opacity = 255;
            else self.buildingImage[i].opacity = 0;
        });
    },
    calculateStorage: function(info, userInfo) {
        if (info.status === 'complete' || info.status === 'upgrade') {
            this._capacity = config.building[info.name][info.level].capacity;
            this._curStorage = userInfo[typeOfResource[this._name]] * this._capacity / userInfo[typeOfCapacity[this._name]];
        } else {
            this._capacity = 0;
            this._curStorage = 0;
        }
        this.presentImg();
    },
});

var typeOfResource = {
    'STO_1': 'gold',
    'STO_2': 'elixir',
    'STO_3': 'darkElixir',
};

var typeOfCapacity = {
    'STO_1': 'maxCapacityGold',
    'STO_2': 'maxCapacityElixir',
    'STO_3': 'maxCapacityDarkElixir',
};