var CLANCASTLE = CLANCASTLE || null;
var ClanCastle = Building.extend({
    _listArmy: [],
    ctor: function(info) {
        CLANCASTLE = this;
        this._super(info);
    },
    addBuildingImg: function() {
        var dir = res.building.clanCastle[this._level];
        var buildingImg = new cc.Sprite(dir);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
        this.initRange();
        //this.addClanIcon();
    },
    addClanIcon: function() {
        if (this.icon !== null) {
            this.rangeLine = null;
            this.buildingImg.removeAllChildrenWithCleanup(true);
            this.icon = null;
        }
        if (gv.user.is_in_guild) {
            var iconType = myClanInfo && myClanInfo.iconType || 1;
            cc.log("ICON TYPE:" + gv.user.id_logo_guild );
            var icon = new cc.Sprite(res.clan.mapIconDir + iconType + ".png");
            this.icon = icon;
            icon.attr({
                x: this.buildingImg.width / 2,
                y: this.buildingImg.height / 2 + 75,
                scale: 1.2
            });
            this.buildingImg.addChild(icon);
            var clanName = new cc.LabelBMFont(gv.user.name_guild, res.font_soji[24]);
            clanName.attr({
                x: this.buildingImg.width / 2,
                y: this.buildingImg.height / 2,
                scale: 1.2
            });
            this.buildingImg.addChild(clanName);
            this.initRange();
        }
    },
    addArmy: function(troop) {
        this._listArmy.push(troop);
        // listTroopRefs.push(troop);
        // this.calculatePopulation();
    },
    armyRun: function() {
        createSolidMapArray();
        this._listArmy.forEach(element => {
            element.receiveFromClanAnims();
        });
    },
    removeTroop: function(troop) {
        cc.log("Remove")

        var index = this._listArmy.indexOf(troop);
        if (index > -1) {
            this._listArmy.splice(index, 1);
            cc.log("Remove complete")
        }
    },
    initRange: function() {
        var rootP = new cc.p(this.buildingImg.width / 2 - TILE_WIDTH / 2, this.buildingImg.height / 2);
        var radius = TILE_WIDTH * 4;
        var color1 = new cc.Color(224, 224, 224, 150);
        var color2 = new cc.Color(224, 224, 224, 40);

        var range = new cc.DrawNode();
        this.rangeLine = range;
        range.drawCircle(rootP, radius, 50, 200, false, 2, color1);
        range.drawDot(rootP, radius, color2);

        this.buildingImg.addChild(range);
        range.attr({ scaleX: TILE_WIDTH / TILE_HEIGHT });
        range.setVisible(false);
    },
    showRange: function() {
       this.rangeLine && this.rangeLine.setVisible(true);
    },
    hideRange: function() {
       this.rangeLine && this.rangeLine.setVisible(false);
    },
});