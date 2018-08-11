var LAB_BUILDING =  null;
var Labratory = Building.extend({
    ctor: function(info) {
        this._super(info);
        LAB_BUILDING = this;
        // this.addBuildingImg();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite(res.building.labratory[this._level]);
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);
    },
    addResearchTimeBar: function(){
        if (research_constant.troop){
            var cur = getCurrentServerTime() - research_constant.troop.startTime;
            var max = config.troop[research_constant.troop.type][research_constant.troop.level+1].researchTime*1000;
            if (research_constant.status.now === research_constant.status.free){
                return;
            }

            var upgradeBarrier = new cc.Sprite('res/Art/Map/map_obj_bg/upgrading.png');
            upgradeBarrier.attr({
                x: this.buildingImg.width / 2,
                y: this.buildingImg.height / 2 - TILE_WIDTH / 2,
                scale: this._width * 3 / 4
            });
            this.buildingImg.addChild(upgradeBarrier, 1000);

            var timeBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
            this.timeBar = timeBar;
            var coor = this.xyOnMap(this._posX, this._posY);
            timeBar.attr({
                x: coor.x,
                y: coor.y + (this._height / 2) * TILE_HEIGHT + 60
            });
            MAP.addChild(timeBar, 1100);

            var processBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
            this.processBar = processBar;
            processBar.attr({
                anchorX: 0,
                anchorY: 0
            });
            timeBar.addChild(processBar);

            var ratio = cur / max;

            processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

            //var t = timeToString(max - cur);
            var t = timeToReadable(max - cur);
            var timeText = new cc.LabelBMFont(t, 'res/Art/Fonts/soji_16.fnt');
            this.timeText = timeText;
            timeText.attr({
                x: timeBar.width / 2,
                y: 42
            });
            timeBar.addChild(timeText);
        }

    },
    countDownResearchBar: function(){
        this.startTime = research_constant.troop.startTime;
        //var cur = getCurrentServerTime() - research_constant.troop.startTime;
        var max = config.troop[research_constant.troop.type][research_constant.troop.level+1].researchTime;

        var tick = () => {
            setTimeout(() => {
                cur = (getCurrentServerTime() - this.startTime)/1000;
            if (cur >= max) {
                research_constant.status.now = research_constant.status.free;
                //linhrafa need to xu li tang level troop
                return;
            } else {
                this.updateTimeResearchBar(cur, max);
                if(research_constant.status.now = research_constant.status.busy){
                    tick();
                }
            }
            //cur +=1;
        }, 1000);
        }
        //Chay 1 lan
        tick();
    },
    updateTimeResearchBar: function(cur, max) {
        if (this.timeBar) {
            var ratio = cur / max;
            //var t = timeToString(max - cur);
            var t = timeToReadable(max - cur);
            this.processBar.setTextureRect(cc.rect(0, 0, this.timeBar.width * ratio, this.timeBar.height));
            this.timeText.setString(t);
        }
    },
});