var CLANCASTLE = CLANCASTLE || null;
var ClanCastle = Building.extend({
    _listArmy: [],
    ctor: function(info) {
        CLANCASTLE = this;
        this._super(info);
        var range = new cc.DrawNode();
        range.drawCircle(new cc.p(this.buildingImg.x, this.buildingImg.x), 300, 50, 50, false, 50, new cc.Color(0, 0, 0, 255));
        this.buildingImg.addChild(range, 10000000);
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
        //this.addClanIcon();
    },
    addClanIcon: function() {
        if (this.icon !== null) {
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
            var clanName = new cc.LabelBMFont(gv.user.name_guild + this._level, res.font_soji[24]);
            clanName.attr({
                x: this.buildingImg.width / 2,
                y: this.buildingImg.height / 2,
                scale: 1.2
            });
            this.buildingImg.addChild(clanName);
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
    }
});