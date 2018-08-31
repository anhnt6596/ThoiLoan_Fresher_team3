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
    //setCollectIcon: function() {
    //    cc.log(this._level+"= level");
    //    if (this._status === 'complete' && this.startTime) {
    //        var time_sx = (getCurrentServerTime() - this.startTime)/1000;
    //        cc.log("============================start time: " +this.startTime);
    //        var productivity = timeToProductivity(this._name,this._level,time_sx);
    //        var suc_chua = config.building[this._name][this._level].capacity;
    //        if ( (productivity.sanluong>=suc_chua/100)  ){
    //            this.addCollectIcon(productivity.is_full);
    //        }
    //        else {
    //            this.disableCollectIcon();
    //        }
    //
    //    }
    //},

});