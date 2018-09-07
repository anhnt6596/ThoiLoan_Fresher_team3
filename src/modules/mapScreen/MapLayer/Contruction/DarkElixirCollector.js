var DarkElixirCollector = CollectorBuilding.extend({
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
        var self = this;
        var x = setInterval(function() {
            //console.log("chay vao icon");
            self.setCollectIcon();
        }, 1000);
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.dark_elixir_collector[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);        
    },
    //tra ve true neu day capacity, tra ve false neu chua day`
    isFullCapacity: function(sanluong){
        if (sanluong+gv.user.darkElixir > gv.user.maxCapacityDarkElixir){
            return true
        }
        return false;
    },

});