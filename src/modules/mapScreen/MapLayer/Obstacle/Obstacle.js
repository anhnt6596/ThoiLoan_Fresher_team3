var Obstacle = cc.Class.extend({
    ctor: function(info) {
        this.info = info;
        this._id = info._id;
        this._name = info.name;
        this._posX = info.posX;
        this._posY = info.posY;
        this._width = info.width;
        this._height = info.height;
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
        var self = this;
        var newObstacleList = obstacleLists.filter(function(element) {
            if (element._id == self._id){
                return false;
            }
            return true;
        });
        obstacleLists = newObstacleList;
        this.removeImg();
        MAP.createLogicArray(contructionList, obstacleLists);
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
    }
});