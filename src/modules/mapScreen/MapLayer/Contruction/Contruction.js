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

        this.addShadow();
    },
    onTarget: function() {
        var coor = this.xyOnMap(this.info.posX, this.info.posY);
        var act = new cc.FadeIn(0.2);
        MAP.arrows[this.info.width].attr({
            x: coor.x,
            y: coor.y,
        });
        MAP.arrows[this.info.width].runAction(act);
        if (this.grass) this.grass.opacity = 0;
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
        } 
    },
    removeTarget: function() {
        var act = new cc.FadeOut(0.2);
        MAP.arrows[this.info.width].runAction(act);
        if (this.grass) this.grass.opacity = 255;
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
        if (this._status === 'setting') {
            MAP.cancelBtn.attr({
                x: coor.x - (this.info.width - 3) / 2 * TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
            MAP.acceptBtn.attr({
                x: coor.x + (this.info.width + 1) / 2 * TILE_WIDTH,
                y: coor.y + 2 * TILE_HEIGHT,
            });
        }
    },
    setImgCoor: function(coor) {
        this.buildingImg.attr({
            x: coor.x + this.img_x,
            y: coor.y + this.img_y,
        });
        this.grass && this.grass.attr({
            x: coor.x,
            y: coor.y,
        });
        this.shadow && this.shadow.attr({
            x: coor.x,
            y: coor.y,
        });
    },
    updatePosition: function(mapPos) {
        var oldX = this.info.posX;
        var oldX = this.info.posY;
        this.info.posX = mapPos.x;
        this.info.posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        // sendMoveConstruction(this.info._id, mapPos.x, mapPos.y);
        if(this.status === 'setting') {
            call_API_new_construction(this.info._id, mapPos.x, mapPos.y); // linhrafa
        } else { //move Construction
            NETWORK.sendMoveConstruction(this.info._id, mapPos.x, mapPos.y); // linhrafa
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
            anchorX: 0,
            anchorY: 0,
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
            anchorX: 0,
            anchorY: 0,
            scale: 2,
            x: coor.x,
            y: coor.y,
        });
        MAP.addChild(shadow, Z.BUILDING_SHADOW);
    },
    xyOnMap: function(posX, posY) {
        var newX = rootMapPos.x + (posY - posX) * TILE_WIDTH / 2 - TILE_WIDTH * (this.info.width / 2);
        var newY = rootMapPos.y + (posX + posY) * TILE_HEIGHT / 2 - TILE_HEIGHT * 0.5;
        return { x: newX, y: newY };
    },


    remove: function() {
        this.removeTarget();
        MAP.removeChild(this.buildingImg);
        MAP.removeChild(this.grass);
        this.shadow && MAP.removeChild(this.shadow);
    }
});
