var GoldMine = CollectorBuilding.extend({
    img_x: -3,
    img_y: -26,
    ctor: function(info) {
        this._super(info);
        //this.setCollectIcon();

        var self = this;
        var x = setInterval(function() {
            //console.log("chay vao icon");
            self.setCollectIcon();
        }, 1000);


    },
    checkSetCollectItem: function () {

    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.gold_mine[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);

        var goldmineAnim = ui.makeAnimation('RES_1_' + this._level + '_effect_', 0, 9, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.attr({
            x: buildingImg.width / 2,
            y: buildingImg.height / 2,
        });
        animSprite.runAction(goldmineAnim.repeatForever());


    },
    setCollectIcon: function() {
        //cc.log(this._
        // level+"= level");
        if (this._status === 'complete' && this.startTime) {
            var time_sx = (getCurrentServerTime() - this.startTime)/1000;
            //cc.log("============================start time: " +this.startTime);
            var productivity = timeToProductivity(this._name,this._level,time_sx);
            var suc_chua = config.building[this._name][this._level].capacity;
            if ( (productivity.sanluong>=suc_chua/100)  ){
                this.addCollectIcon(productivity.is_full);
            }
            else {
                this.disableCollectIcon();
            }

        }
    },
    disableCollectIcon: function(){
        if (this.collect_bg){
            this.collect_bg.setVisible(false);
        }
        if (this.full_bg){
            this.full_bg.setVisible(false);
        }
    },
    addCollectIcon: function(is_full){
        if (!this.collect_bg){
            var collect_bg = new ccui.Button(res.collect_bg);
            this.collect_bg = collect_bg;
            var full_bg = new ccui.Button(res.full_bg);
            this.full_bg = full_bg;

            collect_bg.attr({
                x: 130,
                y: 220,
            });
            full_bg.attr({
                x: 130,
                y: 220,
            });
            this.buildingImg.addChild(this.collect_bg);
            this.buildingImg.addChild(this.full_bg);
        }
        var self = this;
        this.collect_bg.addClickEventListener(() => self.onCollectResource(false));
        this.full_bg.addClickEventListener(() => self.onCollectResource(false));

        this.collect_bg.setVisible(!is_full);
        this.full_bg.setVisible(is_full);


        var collect_img = new cc.Sprite(res.gold_img);
        this.collect_img = collect_img;
        collect_img.attr({
            x: this.collect_bg.width/2,
            y: this.collect_bg.height/2,
        });

        var collect_img2 = new cc.Sprite(res.gold_img);
        this.collect_img2 = collect_img2;
        collect_img2.attr({
            x: this.collect_bg.width/2,
            y: this.collect_bg.height/2,
        });

        this.collect_bg.addChild(collect_img);
        this.full_bg.addChild(collect_img2);
    },
    onCollectResource: function (is_upgrade) {
        console.log("Thu hoach resource "+this._name+" id="+this._id);
        if (!is_upgrade) {
            NETWORK.sendDoHarvest(this._id);
        }

        var time_sx = (getCurrentServerTime() - this.startTime)/1000;
        cc.log("============================cur_time: " +getCurrentServerTime());
        //cc.log("============================start time: " +this.startTime);
        cc.log("============================time san xuat: " + time_sx);
        var productivity = timeToProductivity(this._name,this._level,time_sx);
        productivity.sanluong = Math.round(productivity.sanluong);
        cc.log("============================san luong thu hoach: " +productivity.sanluong);
        addUserResources(Math.floor(productivity.sanluong),0,0,0);

        this.disableCollectIcon();
        this.setStartTime();
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].startTime = this.startTime;
                break;
            }
        }
    }
});