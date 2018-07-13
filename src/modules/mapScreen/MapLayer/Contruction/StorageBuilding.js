var StorageBuilding = Building.extend({
    maxStorage: 1000,
    curStorage: 250,
    ctor: function(info) {
        this._super(info);
    },
    presentImg: function() {
        var self = this;
        var present = (4 * this.curStorage / this.maxStorage - 0.5).toFixed(0);
        if (present == 4) present = 3;
        this.buildingImage.forEach(function(item, i) {
            if (i == present) self.buildingImage[i].opacity = 255;
            else self.buildingImage[i].opacity = 0;
        });
    }
});