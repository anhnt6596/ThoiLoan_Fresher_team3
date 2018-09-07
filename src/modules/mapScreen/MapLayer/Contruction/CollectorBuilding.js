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
        if (this._status === 'complete' && this.startTime) {
            var time_sx = (getCurrentServerTime() - this.startTime)/1000;
            //cc.log("============================start time: " +this.startTime);
            var productivity = timeToProductivity(this._name,this._level,time_sx);
            this.productivity = productivity;
            var suc_chua = config.building[this._name][this._level].capacity;
            if (productivity.sanluong >= 1 && MAP._targetedObject === this) {
                console.log("san luong = "+ productivity.sanluong);
                LOBBY.objectMenu.enableCollectorBtn();
            }
            if ( (productivity.sanluong>=suc_chua/100)  ){
            //if ( (productivity.sanluong>=0)  ){
                var is_full = this.isFullCapacity(productivity.sanluong);
                this.addCollectIcon(is_full);
            }
            else {
                this.disableCollectIcon();
            }

        }
    },
    isFullCapacity: function(sanluong){
        return false;
    },
    addCollectIcon: function(is_full){
        if (!this.collect_bg){
            var collect_bg = new ccui.Button(res.collect_bg);
            this.collect_bg = collect_bg;
            var full_bg = new ccui.Button(res.full_bg);
            this.full_bg = full_bg;

            var resource_img = null;
            var x_bg = null;
            var y_bg = null;
            switch (this._name){
                case 'RES_1':
                    resource_img = res.gold_img;
                    x_bg = this.buildingImg.width/2;
                    y_bg = this.buildingImg.height-30;
                    break;
                case 'RES_2':
                    resource_img = res.elixir_img;
                    x_bg = this.buildingImg.width/2;
                    y_bg = this.buildingImg.height-30;
                    break;
                case 'RES_3':
                    resource_img = res.darkElixir_img;
                    x_bg = this.buildingImg.width/2;
                    y_bg = this.buildingImg.height-150;
                    break;
            }

            collect_bg.attr({
                x: x_bg,
                y: y_bg,
            });
            full_bg.attr({
                x: x_bg,
                y: y_bg,
            });
            this.buildingImg.addChild(this.collect_bg, 1100);
            this.buildingImg.addChild(this.full_bg, 1100);
        }
        var self = this;
        this.collect_bg.addClickEventListener(() => self.onCollectResource(false));
        this.full_bg.addClickEventListener(() => self.onCollectResource(false));

        this.collect_bg.setVisible(!is_full);
        this.full_bg.setVisible(is_full);


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
        temp.collectingBuilding = this;
        if (!is_upgrade) {
            NETWORK.sendDoHarvest(this._id); //Neu dang upgrade thi khong can gui goi tin thu hoach, server tu xu li thu hoach
        }
    },
    processCollectResource: function(sanluong){        
        switch (this._name){
            case 'RES_1':
                addUserResources(sanluong,0,0,0);
                break;
            case 'RES_2':
                addUserResources(0,sanluong,0,0);
                break;
            case 'RES_3':
                addUserResources(0,0,sanluong,0);
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
        this.collectEffect(this._name, sanluong);
        this.playCollectSound();
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
    },
    playCollectSound: function() {
        if (SOUND) {
            switch (this._name) {
                case 'RES_1':
                    cc.audioEngine.playEffect(sRes.collect_gold);
                    break;
                case 'RES_2':
                    cc.audioEngine.playEffect(sRes.collect_elixir);
                    break;
                case 'STO_3':
                    cc.audioEngine.playEffect(sRes.collect_dark_elixir);
                default:
                    break;
            }
        }
    }
});