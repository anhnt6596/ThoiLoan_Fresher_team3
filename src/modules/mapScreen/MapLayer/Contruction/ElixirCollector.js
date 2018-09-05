var ElixirCollector = CollectorBuilding.extend({
    ctor: function(info) {
        this._super(info);
        // this.addBuildingImg();
        //this.setCollectIcon();
        var self = this;
        var x = setInterval(function() {
            //console.log("chay vao icon");
            self.setCollectIcon();
        }, 1000);
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.elixir_collector[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
        var elixirCollectorAnim = ui.makeAnimation('RES_2_' + this._level + '_effect/', 0, 9, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.attr({
            x: buildingImg.width / 2,
            y: buildingImg.height / 2,
        });
        animSprite.runAction(elixirCollectorAnim.repeatForever());
    },
    //tra ve true neu day capacity, tra ve false neu chua day`
    isFullCapacity: function(sanluong){
        if (sanluong+gv.user.elixir > gv.user.maxCapacityElixir){
            return true
        }
        return false;
    },

});