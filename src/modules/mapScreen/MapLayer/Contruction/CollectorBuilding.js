var CollectorBuilding = Building.extend({
    ctor: function(info) {
        this._super(info);
        var self = this;
        var x = setInterval(function() {
            //console.log("chay vao icon");
            self.setCollectIcon();
        }, 1000);
    },
    disableCollectIcon: function(){
        this.collect_bg && this.collect_bg.setVisible(false);
        this.full_bg && this.full_bg.setVisible(false);
    },
    setCollectIcon: function() {
        //cc.log(this._
        // level+"= level");
        if (this._status === 'complete' && this.startTime) {
            var time_sx = (getCurrentServerTime() - this.startTime)/1000;
            //cc.log("============================start time: " +this.startTime);
            var productivity = timeToProductivity(this._name,this._level,time_sx);
            this.productivity = productivity;
            var suc_chua = config.building[this._name][this._level].capacity;
            //console.log("san luong = "+ productivity.sanluong);
            if (productivity.sanluong>=1) {
                LOBBY.objectMenu.enableCollectorBtn();
            }
            if ( (productivity.sanluong>=suc_chua/100)  ){
                this.addCollectIcon(productivity.is_full);
            }
            else {
                this.disableCollectIcon();
            }

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
            this.buildingImg.addChild(this.collect_bg, 1100);
            this.buildingImg.addChild(this.full_bg, 1100);
        }
        var self = this;
        this.collect_bg.addClickEventListener(() => self.onCollectResource(false));
        this.full_bg.addClickEventListener(() => self.onCollectResource(false));

        this.collect_bg.setVisible(!is_full);
        this.full_bg.setVisible(is_full);

        var resource_img = null;
        switch (this._name){
            case 'RES_1':
                resource_img = res.gold_img;
                break;
            case 'RES_2':
                resource_img = res.elixir_img;
                break;
            case 'RES_3':
                resource_img = res.darkElixir_img;
                break;
        }
        var collect_img = new cc.Sprite(resource_img);
        this.collect_img = collect_img;
        collect_img.attr({
            x: this.collect_bg.width/2,
            y: this.collect_bg.height/2 + 5,
        });

        var collect_img2 = new cc.Sprite(resource_img);
        this.collect_img2 = collect_img2;
        collect_img2.attr({
            x: this.collect_bg.width/2,
            y: this.collect_bg.height/2 + 5,
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
        cc.log("============================start time: " +this.startTime);
        cc.log("============================time san xuat: " + time_sx);
        var productivity = timeToProductivity(this._name,this._level,time_sx);
        productivity.sanluong = Math.round(productivity.sanluong);

        cc.log("============================san luong thu hoach: " +productivity.sanluong);
        switch (this._name){
            case 'RES_1':
                addUserResources(Math.floor(productivity.sanluong),0,0,0);
                break;
            case 'RES_2':
                addUserResources(0,Math.floor(productivity.sanluong),0,0);
                break;
            case 'RES_3':
                addUserResources(0,0,Math.floor(productivity.sanluong),0);
                break;
        }


        this.disableCollectIcon();
        this.setStartTime();
        for(var item in contructionList){
            if(contructionList[item]._id == this._id){
                contructionList[item].startTime = this.startTime;
                break;
            }
        }
        this.collectEffect(this._name, productivity.sanluong);
    },
    collect: function() {
        if (this.full_bg.isVisible()|| this.collect_bg.isVisible() ){
            cc.log("cho phep upgrade");
            this.onCollectResource(false);
        }
        else {
            MAP._targetedObject = this;
            this.onTarget();
        }
    },
    collectEffect: function(type, product) {
        ui.productTextEffect(this, type, product);
        if (type === "RES_1") ui.dropCoinEffect(this, product);
        else if (type === "RES_2") ui.dropElixirEff(this, product);
        else if (type === "RES_3") ui.dropElixirEff(this, product, 1);
    }
});