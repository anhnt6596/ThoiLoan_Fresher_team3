var ArmyCamp = Building.extend({
    _listArmy: [],
    _capacity: 20,
    _curStorage: 0,
    ctor: function(info) {
        this._listArmy = []; // chống trùng reference
        this._super(info);
        this.calculatePopulation();
        // this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.army_camp[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
        var buildingAnim = ui.makeAnimation('armycam_1/', 0, 4, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.attr({
            x: buildingImg.width / 2,
            y: buildingImg.height / 2 + 35
        });
        animSprite.runAction(buildingAnim.repeatForever());
    },
    caluclateZOrder: function(mapPos) {
        var newZ = 1000 - (mapPos.x + mapPos.y + (this._height - 3) / 2) * 10 + 1;
        return newZ - 200;
    },
    addArmy: function(troop) {
        this._listArmy.push(troop);
        listTroopRefs.push(troop);
        // cc.log("listTroopRefs.length" + listTroopRefs.length);
        // cc.log(">>>>>>>>>>>>>>>><<<<<<<<<<>>>>>>>>>>>> length: " + armyCampRefs[0]._listArmy.length + ' & ' + armyCampRefs[1]._listArmy.length);
        this.calculatePopulation();
    },
    armyRun: function() {
        createSolidMapArray();
        this._listArmy.forEach(element => {
            element.moveTo();
        });
    },
    calculatePopulation: function() {
        if (this._status === 'complete' || this._status === 'upgrade') {
            this._capacity = config.building[this._name][this._level].capacity;
            // cc.log(">>>>>>>>>>><<<<<<<<<<<<>>>>>>>>>>>>>>>this._capacity: " + this._capacity);
            this._curStorage = 0;
            var self = this;
            this._listArmy.forEach(function(troop) {
                self._curStorage += troop._housingSpace;
            });
            // cc.log(">>>>>>>>>>><<<<<<<<<<<<>>>>>>>>>>>>>>>this._curStorage: " + this._curStorage);
        } else {
            this._capacity = 0;
            this._curStorage = 0;
        }
        this.presentImg();
    },

    updateArmyCampCapacity: function() {
        cc.log("================== DUY 1");
        temp.pauseOverCapacityFlag = false;

        //Neu chua co linh train thi khong cowntdown
        for(var i = 0; i < barrackRefs.length; i++){
            cc.log("================== DUY 2");

            var id = barrackRefs[i]._id;
            if(BARRACK[id]){
                cc.log("================== DUY 3");

                BARRACK[id].countDown();
                //Hien thi timebar ben ngoai
                if(!barrackRefs[i].timeBar){
                    cc.log("================== DUY 4");

                    barrackRefs[i].addTimeBarTrain(0, 20);
                }
            }
        }
    },

    removeTroop: function(troop) {
        var index = this._listArmy.indexOf(troop);
        if (index > -1) {
            this._listArmy.splice(index, 1);
        }
        this.calculatePopulation();
    }
});