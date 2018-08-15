var MAP = MAP || null;

var wall = wall || {};
var mapLogicArray = mapLogicArray || [];
var wallRefs = wallRefs || [];

var wallSelectingArray = wallSelectingArray || [];

var Wall = Building.extend({
    _selectMulti: false,
    ctor: function(info) {
        this._super(info);
        this.initBG();
    },
    addBuildingImg: function() {
        var buildingImg = new cc.Sprite();
        this.buildingImg = buildingImg;
        var coor = this.xyOnMap(this._posX, this._posY);
        buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        var zOrder = this.caluclateZOrder({ x: this._posX, y: this._posY });
        MAP.addChild(buildingImg, zOrder);

        var buildingImage = [];
        for (var i = 0; i < 4; i++) {
            buildingImage[i] = new cc.Sprite(res.building.wall[this._level][i]);
            buildingImage[i].attr({
                opacity: 0,
            });
            buildingImg.addChild(buildingImage[i], 10);
        }
        this.buildingImage = buildingImage;

        buildingImage[0].setOpacity(255);
    },
    initBG: function() {
        this.greenBG = new cc.Sprite(res.map.green_bg[0]);
        this.greenBG.attr({
            scale: 2,
            opacity: 0,
        });
        this.buildingImg.addChild(this.greenBG, 0);

        this.redBG = new cc.Sprite(res.map.red_bg[0]);
        this.redBG.attr({
            scale: 2,
            opacity: 0,
        });
        this.buildingImg.addChild(this.redBG, 0);
    },
    updatePresentImg: function(pos) {
        if (pos === undefined) {
            pos = {
                x: this._posX,
                y: this._posY,
            };
        }
        var iShow = 0;
        var topLeftBuildingId = mapLogicArray[pos.x + 1][pos.y];
        var topRightBuildingId = mapLogicArray[pos.x][pos.y + 1];
        wallRefs.forEach(function(wall) {
            if(wall._id === topLeftBuildingId) iShow += 2;
            if(wall._id === topRightBuildingId) iShow += 1;
        });
        this.buildingImage.forEach(function(img) {
            img.setOpacity(0);
        });
        this.buildingImage[iShow].setOpacity(255);
        cc.log("=========>>>>>>>>>>>>>id: " + this._id + " level:  " + this._level + " isShow: " + iShow + " topLeftID: ");
    },
    selectLine: function() {
        var self = this;
        var wallSelectingX = [];
        var wallSelectingY = [];
        cc.log("Select Line");
        wallRefs.forEach(function(wall) {
            if (wall._posX === self._posX) {
                wallSelectingX.push(wall);
            }
            if (wall._posY === self._posY) {
                wallSelectingY.push(wall);
            }
        });
        wallSelectingArray = (wallSelectingX.length >= wallSelectingY.length) ? wallSelectingX : wallSelectingY;
        
        wallSelectingArray.forEach(function(wall) {
            wall.wallSelectInLine();
        });
    },
    wallSelectInLine: function() {
        var act = new cc.FadeOut(0.2);
        MAP.arrows[this._width].runAction(act);

        var coor = this.xyOnMap(this._posX, this._posY);
        //if (this.grass) this.grass.opacity = 0;
        if (this.checkNewPosition({ x: this._posX, y: this._posY })) {
            this.greenBG.attr({ opacity: 230, });
            this.redBG.attr({ opacity: 0, });
        } else {
            this.greenBG.attr({ opacity: 0, });
            this.redBG.attr({ opacity: 230, });
        };
        this.buildingImg.runAction(ui.BounceEff());
        this.buildingImg.runAction(ui.targettingEff().repeatForever());
    },
    onTarget: function() {
        var coor = this.xyOnMap(this._posX, this._posY);
        var act = new cc.FadeIn(0.2);
        MAP.arrows[this._width].attr({
            x: coor.x,
            y: coor.y,
        });
        MAP.arrows[this._width].runAction(act);
        //if (this.grass) this.grass.opacity = 0;
        this.nameText.opacity = 255;
        if (this.checkNewPosition({ x: this._posX, y: this._posY })) {
            this.greenBG.attr({ opacity: 230, });
            this.redBG.attr({ opacity: 0, });
        } else {
            this.greenBG.attr({ opacity: 0, });
            this.redBG.attr({ opacity: 230, });
        };
        this.buildingImg.runAction(ui.BounceEff());
        this.buildingImg.runAction(ui.targettingEff().repeatForever());
        this.onTargetSound();
        LOBBY.showObjectMenu(MAP._targetedObject);
    },
    moving: function(mapPos) {
        var coor = this.xyOnMap(mapPos.x, mapPos.y);
        var self = this;
        if (wallSelectingArray.length >= 1) {
            wallSelectingArray.forEach(function(wall) {
                var pos = {
                    x: mapPos.x + wall._posX - self._posX,
                    y: mapPos.y + wall._posY - self._posY,
                };
                wall.movingWall(pos);
            });
            
            // đặt tọa độ, hiển thị nền xanh đỏ
            if (this.checkNewPosition(mapPos)) {
                wallSelectingArray.forEach(function(wall) {
                    wall.greenBG.attr({ opacity: 230, });
                    wall.redBG.attr({ opacity: 0, });
                });
            } else {
                wallSelectingArray.forEach(function(wall) {
                    wall.greenBG.attr({ opacity: 0, });
                    wall.redBG.attr({ opacity: 230, });
                });
            }
        } else {
            this.movingWall(mapPos);
        }

        if (this._status === 'setting') {
            MAP.cancelBtn.attr({
                x: coor.x - TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
            MAP.acceptBtn.attr({
                x: coor.x + TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
        }
    },
    movingWall: function(mapPos) {
        if (wallSelectingArray.length >= 1) {
            var coor = this.xyOnMap(mapPos.x, mapPos.y);
            this.tempX = mapPos.x;
            this.tempY = mapPos.y;
            this.setImgCoor(coor); // đặt lại vị trí
            // setzOrder
            var newZ = this.caluclateZOrder(mapPos);
            cc.log("NewZ: " + newZ);
            MAP.reorderChild(this.buildingImg, newZ);
            
            // MAP.arrows[this._width].attr({
            //     x: coor.x,
            //     y: coor.y,
            // });
        } else {
            var coor = this.xyOnMap(mapPos.x, mapPos.y);
            this.tempX = mapPos.x;
            this.tempY = mapPos.y;
            this.setImgCoor(coor); // đặt lại vị trí
            // setzOrder
            var newZ = this.caluclateZOrder(mapPos);
            cc.log("NewZ: " + newZ);
            MAP.reorderChild(this.buildingImg, newZ);
            // đặt tọa độ, hiển thị nền xanh đỏ
            if (this.checkNewPosition(mapPos)) {
                this.greenBG.attr({ opacity: 230, });
                this.redBG.attr({ opacity: 0, });
            } else {
                this.greenBG.attr({ opacity: 0, });
                this.redBG.attr({ opacity: 230, });
            }
            MAP.arrows[this._width].attr({
                x: coor.x,
                y: coor.y,
            });
        }
    },
    // checkNewPosition: function(mapPos) {
    //     if (wallSelectingArray.length >= 1) {
    //         return this.checkNewPositionMultiWall(mapPos);
    //     } else return this.checkNewPositionMultiWall(mapPos);
    // },
    checkNewPosition: function(mapPos) {
        var self = this;
        var result = 0;
        if (wallSelectingArray.length >= 1) {
            wallSelectingArray.forEach(function(wall) {
                var pos = {
                    x: mapPos.x + wall._posX - self._posX,
                    y: mapPos.y + wall._posY - self._posY,
                };
                if (!self.checkPositionForOneWall(pos)) result += 1;
            });
            return result === 0;
        } else {
            if (mapPos.x < 0 || mapPos.y < 0 || mapPos.x > MAPVALUE.MAPSIZE - this._width || mapPos.y > MAPVALUE.MAPSIZE - this._height) return false;
            if (mapLogicArray[mapPos.x][mapPos.y] !== MAPVALUE.UNUSED && mapLogicArray[mapPos.x][mapPos.y] !== this.info._id) return false;
            return true;
        }
    },
    checkPositionForOneWall: function(mapPos) {
        if (mapPos.x < 0 || mapPos.y < 0 || mapPos.x > MAPVALUE.MAPSIZE - 1 || mapPos.y > MAPVALUE.MAPSIZE - 1) return false;
        var check = 0;
        wallSelectingArray.forEach(function(item) {
            if (mapLogicArray[mapPos.x][mapPos.y] === item._id) check += 1;
        });
        if (mapLogicArray[mapPos.x][mapPos.y] === MAPVALUE.UNUSED || check > 0) {
            return true;
        }
        return false;
    },
    updatePosition: function(mapPos) {
        var self = this;
        var _posX = this._posX;
        var _posY = this._posY;
        if (wallSelectingArray.length >= 1) {
            if (this.checkNewPosition(mapPos)) {
                wallSelectingArray.forEach(function(wall) {
                var pos = {
                    x: mapPos.x + wall._posX - _posX,
                    y: mapPos.y + wall._posY - _posY,
                };
                wall.updatePositionWall(pos);
                });
            }
        } else {
            this.updatePositionWall(mapPos);
        }
        
        // this.resetSelectingArray();
        // try {
        //     temp.lastMoveBuilding = this;
        //     if(this._status !== 'setting' && (this._oldX !== this._posX || this._oldY !== this._posY)) {
        //         cc.log('sendMove>>>>>>>>>>>>>>>before');
        //         cc.log('sendMove>>>>>>>>>>>>>>>this.info._id' + this.info._id);
        //         cc.log('sendMove>>>>>>>>>>>>>>>mapPos.x' + mapPos.x);
        //         //cc.log('sendMove>>>>>>>>>>>>>>>mapPos.y' + mapPos.y);
        //         NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
        //         cc.log('sendMove>>>>>>>>>>>>>>>after');
        //     }
        // } catch (error) {
        //     cc.log('network error!');
        // }
    },
    reversePosition: function() {
        wallSelectingArray.forEach(function(wall) {
            var coor = this.xyOnMap(wall._posX, wall._posY);
            wall.buildingImg.attr({
                x: coor.x,
                x: coor.y,
            });
        });
    },
    resetSelectingArray: function() {
        wallSelectingArray.forEach(function(wall) {
            wall.wallRemoveTarget();
        });
        wallSelectingArray = [];
    },
    removeTarget: function() {
        if (wallSelectingArray.length >= 1) {
            wallSelectingArray.forEach(function(wall) {
                //if (this.grass) this.grass.opacity = 255;
                wall.nameText.opacity = 0;
                wall.greenBG.attr({ opacity: 0, });
                wall.redBG.attr({ opacity: 0, });

                var coor = wall.xyOnMap(wall._posX, wall._posY);
                wall.setImgCoor(coor);
                wall.tempX = wall._posX;
                wall.tempY = wall._posY;
                wall.buildingImg.stopAllActions();
                wall.buildingImg.runAction(ui.backToDefaultColor());
                LOBBY.hideObjectMenu();
            });
            this.resetSelectingArray();
        } else {
            var act = new cc.FadeOut(0.2);
            MAP.arrows[this._width].runAction(act);
            //if (this.grass) this.grass.opacity = 255;
            this.nameText.opacity = 0;
            this.greenBG.attr({
                opacity: 0,
            });
            this.redBG.attr({
                opacity: 0,
            });

            var coor = this.xyOnMap(this._posX, this._posY);
            this.setImgCoor(coor);
            this.tempX = this._posX;
            this.tempY = this._posY;
            this.buildingImg.stopAllActions();
            this.buildingImg.runAction(ui.backToDefaultColor());
            LOBBY.hideObjectMenu();
        }
    },
    wallRemoveTarget: function() {
        //if (this.grass) this.grass.opacity = 255;
        this.nameText.opacity = 0;
        MAP.greenBGs[this._width].attr({
            opacity: 0,
        });
        MAP.redBGs[this._width].attr({
            opacity: 0,
        });

        var coor = this.xyOnMap(this._posX, this._posY);
        this.setImgCoor(coor);
        this.tempX = this._posX;
        this.tempY = this._posY;
        this.buildingImg.stopAllActions();
        this.buildingImg.runAction(ui.backToDefaultColor());
        LOBBY.hideObjectMenu();
    },
    updatePositionWall: function(mapPos) {
        //if (this.tempX !== this._posX && this.tempX !== this._posY) {
        var eff = ui.landingEffect();
        this.buildingImg.runAction(eff);
        this.onPlaceSound();
        //}
        this._posX = mapPos.x;
        this._posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        
        this.afterUpdatePosionAction(mapPos);
        // try {
        //     temp.lastMoveBuilding = this;
        //     if(this._status !== 'setting' && (this._oldX !== this._posX || this._oldY !== this._posY)) {
        //         cc.log('sendMove>>>>>>>>>>>>>>>before');
        //         cc.log('sendMove>>>>>>>>>>>>>>>this.info._id' + this.info._id);
        //         cc.log('sendMove>>>>>>>>>>>>>>>mapPos.x' + mapPos.x);
        //         //cc.log('sendMove>>>>>>>>>>>>>>>mapPos.y' + mapPos.y);
        //         NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
        //         cc.log('sendMove>>>>>>>>>>>>>>>after');
        //     }
        // } catch (error) {
        //     cc.log('network error!');
        // }
    },
});
