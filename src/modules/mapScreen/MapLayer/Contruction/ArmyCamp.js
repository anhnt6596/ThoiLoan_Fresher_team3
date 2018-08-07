var ArmyCamp = Building.extend({
    _listArmy: [],
    ctor: function(info) {
        this._super(info);
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
        var buildingAnim = ui.makeAnimation('armycam_1_', 0, 4, 0.2);
        var animSprite = new cc.Sprite();
        buildingImg.addChild(animSprite, 11);
        animSprite.attr({
            x: buildingImg.width / 2,
            y: buildingImg.height / 2 + 35
        });
        animSprite.runAction(buildingAnim.repeatForever());
        this.createArmy(); // test
        this.createArmy(); // test
        this.createArmy(); // test
        this.createArmy(); // test
        this.createArmy(); // test
    },
    caluclateZOrder: function(mapPos) {
        var newZ = 1000 - (mapPos.x + mapPos.y + (this._height - 3) / 2) * 10 + 1;
        return newZ - 200;
    },
    createArmy: function() {
        var warrior = new Warrior(this, 4);
        this._listArmy.push(warrior);
        listTroopRefs.push(warrior);
    },
    armyRun: function() {
        createSolidMapArray();
        listTroopRefs.forEach(element => {
            element.moveTo(objectRefs[0]);
        });
    },
});