var Obstacle = cc.Class.extend({
    ctor: function(info) {
        this.info = info;
        this._id = info.id;
        cc.log("============== DUY id obstacle: " + info.id);
        this._name = info.name;
        this._posX = info.posX;
        this._posY = info.posY;
        this._width = info.width;
        this._height = info.height;
        this._buildTime = config.obtacle[this._name][1].buildTime;
        this._startTime = info.startTime;
        this._status = info.status;
        // this._super('res/Art/Buildings/obstacle/' + this._name + '/idle/image0000.png');
        var grass = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_0_' + this._width + '_OBS.png');
        this.grass = grass;
        var coor = this.xyOnMap(this._posX, this._posY);
        grass.attr({
            x: coor.x,
            y: coor.y,
            scale: 2
        });
        MAP.addChild(grass, Z.BACKGROUND);

        var objImg = new cc.Sprite('#Buildings/obstacle/' + this._name + '/idle/image0000.png');
        this.objImg = objImg;
        objImg.attr({
            x: coor.x,
            y: coor.y,
            scale: 1
        });
        MAP.addChild(objImg, this.caluclateZOrder());
        this.setObsStatus();
    },

    setObsStatus: function() {
        cc.log("================= DUY =================");
        if ((this._status == PENDING) && this._startTime) {
            var cur = (getCurrentServerTime() - this._startTime)/1000;
            var max = config.obtacle[this._name][1].buildTime;

            if(!this.timeBar){
                this.addTimeBar(cur, max);
                this.countDown(cur, max);
            }
        }

    },

    xyOnMap: function(posX, posY) {
        var newX = rootMapPos.x + (posY - posX) * TILE_WIDTH / 2;
        var newY = rootMapPos.y + (posX + posY) * TILE_HEIGHT / 2 + TILE_HEIGHT * (this._height - 1) * 0.5;
        return { x: newX, y: newY };
    },
    caluclateZOrder: function() {
        var _x = this._posX;
        var _y = this._posY;
        var newZ = 1000 - (_x + _y + (this._height - 3) / 2) * 10 + 1;
        return newZ;
    },
    onTargeting: function() {
        this.objImg.runAction(ui.BounceEff());
        this.objImg.runAction(ui.targettingEff().repeatForever());
        LOBBY.showObjectMenu(MAP._targetedObject);
    },
    removeTarget: function() {
        this.objImg.stopAllActions();
        this.objImg.runAction(ui.backToDefaultColor());
        LOBBY.hideObjectMenu(MAP._targetedObject);
    },
    remove: function(obstacle) {

        this.removeComplete();
    },
    removeComplete: function() {
        var newObstacleList = obstacleLists.filter(function(element) {
            if (element.id == this._id){
                return false;
            }
            return true;
        });
        obstacleLists = newObstacleList;
        this.removeImg();
        this._status = DESTROY;
        for(var i in obstacleLists) {
            if(obstacleLists[i].id == this._id){
                obstacleLists[i].status = DESTROY;
            }
        }

        this.timeBar && MAP.removeChild(this.timeBar);
        this.timeBar = null;

        MAP.createLogicArray(contructionList, obstacleLists);
        updateGUI();
    },
    removeImg: function() {
        this.removeTarget();
        this.grass.attr({
            x: -1000000,
            y: -1000000
        });
        this.objImg.attr({
            x: -1000000,
            y: -1000000
        });
    },

    addTimeBar: function(cur, max) {
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

        var t = timeToReadable(max - cur);
        var timeText = new cc.LabelBMFont(t, res.font_soji[16]);
        this.timeText = timeText;
        timeText.attr({
            x: timeBar.width / 2,
            y: 42
        });
        timeBar.addChild(timeText);
    },
    updateTimeBar: function(cur, max) {
        if (this.timeBar) {
            var ratio = cur / max;
            //var t = timeToString(max - cur);
            var t = timeToReadable(max - cur);
            this.processBar.setTextureRect(cc.rect(0, 0, this.timeBar.width * ratio, this.timeBar.height));
            this.timeText.setString(t);
        }
    },

    countDown: function(cur, max){
        var tick = () => {
            setTimeout(() => {
                cur = (getCurrentServerTime() - this._startTime)/1000;
            if (cur >= max) {
                temp.obsFinishTime = this;
                NETWORK.sendFinishTimeRemoveObs(this._id);
                return;
            } else {
                this.updateTimeBar(cur, max);
                if(this._status == PENDING){
                    tick();
                }
            }
        }, 1000);
    }
    tick();
},
});