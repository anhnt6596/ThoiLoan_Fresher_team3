var Contruction = cc.Class.extend({
    _status: 'complete',
    ctor: function(info) {
        // this._super();
        this.info = info;
        this.init();
    },
    init: function() {
        this.tempX = this.info.posX;
        this.tempY = this.info.posY;
        this._oldX = this.info.posX;
        this._oldY = this.info.posY;

        this.addShadow();
        this.addNameText();
    },
    onTarget: function() {
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        cc.log('targeted pos' + this.info.posX + '/' + this.info.posY);
        var act = new cc.FadeIn(0.2);
        MAP.arrows[this.info.width].attr({
            x: coor.x,
            y: coor.y,
        });
        MAP.arrows[this.info.width].runAction(act);
        //if (this.grass) this.grass.opacity = 0;
        this.nameText.opacity = 255;
        if (this.checkNewPosition({ x: this.info.posX, y: this.info.posY })) {
            MAP.greenBGs[this.info.width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this.info.width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
        } else {
            MAP.greenBGs[this.info.width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this.info.width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
        };
        LOBBY.showObjectMenu();
    },
    removeTarget: function() {
        var act = new cc.FadeOut(0.2);
        MAP.arrows[this.info.width].runAction(act);
        //if (this.grass) this.grass.opacity = 255;
        this.nameText.opacity = 0;
        MAP.greenBGs[this.info.width].attr({
            opacity: 0,
        });
        MAP.redBGs[this.info.width].attr({
            opacity: 0,
        });

        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        this.setImgCoor(coor);
        this.tempX = this.info.posX;
        this.tempY = this.info.posY;
        LOBBY.hideObjectMenu();
    },
    moving: function(mapPos) {
        var coor = this.xyOnMap(mapPos.x, mapPos.y);
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        this.setImgCoor(coor); // đặt lại vị trí
        // setzOrder
        var newZ = this.caluclateZOrder(mapPos);
        MAP.reorderChild(this.buildingImg, newZ);
        // đặt tọa độ, hiển thị nền xanh đỏ
        if (this.checkNewPosition(mapPos)) {
            MAP.greenBGs[this.info.width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this.info.width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
        } else {
            MAP.greenBGs[this.info.width].attr({
                opacity: 0,
                x: coor.x,
                y: coor.y,
            });
            MAP.redBGs[this.info.width].attr({
                opacity: 230,
                x: coor.x,
                y: coor.y,
            });
        }
        
        MAP.arrows[this.info.width].attr({
            x: coor.x,
            y: coor.y,
        });
        if (this._status === 'pending') {
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
    setImgCoor: function(coor) {
        this.buildingImg.attr({
            x: coor.x,
            y: coor.y,
        });
        this.grass && this.grass.attr({
            x: coor.x,
            y: coor.y,
        });
        this.shadow && this.shadow.attr({
            x: coor.x,
            y: coor.y,
        });
        this.nameText.attr({
            x: coor.x,
            y: coor.y + (this.info.height / 2) * TILE_HEIGHT + 50,
        });
    },
    updatePosition: function(mapPos) {
        this.info.posX = mapPos.x;
        this.info.posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        try {
            if(this._status !== 'pending' && this._oldX !== this.info.posX && this._oldY !== this.info.posY) {
                cc.log('sendMove>>>>>>>>>>>>>>>before');
                cc.log('sendMove>>>>>>>>>>>>>>>this.info._id' + this.info._id);
                cc.log('sendMove>>>>>>>>>>>>>>>mapPos.x' + mapPos.x);
                //cc.log('sendMove>>>>>>>>>>>>>>>mapPos.y' + mapPos.y);
                NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
                cc.log('sendMove>>>>>>>>>>>>>>>after');
            }
        } catch (error) {
            cc.log('network error!');
        }
    },
    checkNewPosition: function(mapPos) {
        if (mapPos.x < 0 || mapPos.y < 0 || mapPos.x > 40 - this.info.width || mapPos.y > 40 - this.info.height) return false;
        for (var i = 0; i < this.info.width; i++) {
            for (var j = 0; j < this.info.height; j++) {
                if (mapLogicArray[mapPos.x + i][mapPos.y + j] !== 0 && mapLogicArray[mapPos.x + i][mapPos.y + j] !== this.info._id) {
                    return false;
                }
            }
        }
        return true;
    },
    setStatus: function(status) {
        this._status = status;
    },
    caluclateZOrder: function(mapPos) {
        var newZ = 1000 - (mapPos.x + mapPos.y + (this.info.height - 3) / 2) * 10 + 1;
        return newZ;
    },
    addShadow: function() {
        switch (this.info.name) {
            case 'BDH_1':
                this.squareShadow(2);
                break;
            case 'TOW_1':
                this.squareShadow(4);
                break;
            case 'BAR_1':
            case 'RES_1':
                this.squareShadow(3);
                break
            case 'STO_1':
            case 'STO_2':
            case 'RES_2':
                this.roundShadow();
                break;
            default:
                break;
        }
    },
    squareShadow: function(size) {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_'+ size +'_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        this.shadow = shadow;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        shadow.attr({
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(shadow, Z.BUILDING_SHADOW);
    },
    roundShadow: function() {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_5_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        this.shadow = shadow;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        shadow.attr({
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(shadow, Z.BUILDING_SHADOW);
    },
    addNameText: function() {
        var bd_name = name.building[this.info.name] ? name.building[this.info.name].vi : 'unknown';
        var nameText = new cc.LabelBMFont(bd_name, 'res/Art/Fonts/soji_24.fnt');
        this.nameText = nameText;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        nameText.attr({
            x: coor.x,
            y: coor.y + (this.info.height / 2) * TILE_HEIGHT + 50,
            color: cc.color(255, 255, 0, 255),
            opacity: 0,
        });
        MAP.addChild(nameText, 1000);
        
        var levelText = new cc.LabelBMFont('cấp ' + this.info.level, 'res/Art/Fonts/soji_16.fnt');
        this.levelText = levelText;
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        levelText.attr({
            x: nameText.width / 2,
            y: -5,
        });
        nameText.addChild(levelText, 1000);
    },
    xyOnMap: function(posX, posY) {
        var newX = rootMapPos.x + (posY - posX) * TILE_WIDTH / 2;
        var newY = rootMapPos.y + (posX + posY) * TILE_HEIGHT / 2 + TILE_HEIGHT * (this.info.height - 1) * 0.5;
        return { x: newX, y: newY };
    },


    remove: function() {
        this.removeTarget();
        MAP.removeChild(this.buildingImg);
        MAP.removeChild(this.grass);
        this.shadow && MAP.removeChild(this.shadow);
    },
    upgrade: function() {
        if (this.info.level < 11) this.upgradeComplete();
    },
    upgradeComplete: function() {
        this.info.level = this.info.level + 1;
        MAP.removeChild(this.buildingImg);
        this.addBuildingImg();

        this.levelText.setString('cấp ' + this.info.level);
        var effLevelUp = ui.makeAnimation('level_up_', 0, 11, 0.2);
    },
    addBuildingImg: function() {

    },
});
