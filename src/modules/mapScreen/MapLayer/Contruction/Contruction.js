var Contruction = cc.Node.extend({
    ctor: function(info) {
        this._super();
        this.info = info;
        this.init();
    },
    init: function() {
        var newX = rootMapPos.x + (this.info.posY - this.info.posX) * TILE_WIDTH / 2 - TILE_WIDTH*(this.info.width / 2);
        var newY = rootMapPos.y + (this.info.posX + this.info.posY) * TILE_HEIGHT / 2 - TILE_HEIGHT * 0.5;
        this.x = newX;
        this.y = newY;
        this.anchorX = 0;
        this.anchorY = 0;
        this.scale = 1;

        this.tempX = this.info.posX;
        this.tempY = this.info.posY;

        this.addShadow();
        this.addArrowMove();
        this.addGreenBG();
        this.addRedBG();
    },
    addGreenBG: function() {
        var resBG = 'res/Art/Map/map_obj_bg/BG/GREEN_' + this.info.width + '.png';
        var greenBG = new cc.Sprite(resBG);
        this.greenBG = greenBG;
        greenBG.attr({
            anchorX: 0,
            anchorY: 0,
            scale: 2,
            opacity: 0,
        });
        this.addChild(greenBG, 1);
    },
    addRedBG: function() {
        var resBG = 'res/Art/Map/map_obj_bg/BG/RED_' + this.info.width + '.png';
        var redBG = new cc.Sprite(resBG);
        this.redBG = redBG;
        redBG.attr({
            anchorX: 0,
            anchorY: 0,
            scale: 2,
            opacity: 0,
        });
        this.addChild(redBG, 1);
    },
    addArrowMove: function() {
        var arrowMoveRes = 'res/Art/Map/map_obj_bg/BG/arrowmove' + this.info.width + '.png'
        this.arrowMove = new cc.Sprite(arrowMoveRes)
        this.arrowMove.attr({
            anchorX: 0,
            anchorY: 0,
            opacity: 0,
        });
        this.addChild(this.arrowMove, 2);
    },
    moving: function(mapPos) {
        var newX = rootMapPos.x + (mapPos.y - mapPos.x) * TILE_WIDTH / 2 - TILE_WIDTH*(this.info.width / 2);
        var newY = rootMapPos.y + (mapPos.x + mapPos.y) * TILE_HEIGHT / 2 - TILE_HEIGHT * 0.5;
        this.x = newX;
        this.y = newY;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;
        if (this.checkNewPosition(mapPos)) {
            this.greenBG.opacity = 230;
            this.redBG.opacity = 0;
        } else {
            this.greenBG.opacity = 0;
            this.redBG.opacity = 230;
        }
    },
    updatePosition: function(mapPos) {
        var oldX = this.info.posX;
        var oldX = this.info.posY;

        this.info.posX = mapPos.x;
        this.info.posY = mapPos.y;
        this.tempX = mapPos.x;
        this.tempY = mapPos.y;

        // call_API_update_position(this.info._id, mapPos.x, mapPos.y); linhrafa
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
    onTarget: function() {
        var act = new cc.FadeIn(0.2);
        this.arrowMove.runAction(act);
        if (this.grass) this.grass.opacity = 0;
        this.greenBG.opacity = 230;
    },
    removeTarget: function() {
        var act = new cc.FadeOut(0.2);
        this.arrowMove.runAction(act);
        var newZ = 900 - (this.info.posX + this.info.posY) * 10;
        this.parent.reorderChild(this, newZ);
        if (this.grass) this.grass.opacity = 255;
        this.greenBG.opacity = 0;
        this.redBG.opacity = 0;

        var newX = rootMapPos.x + (this.info.posY - this.info.posX) * TILE_WIDTH / 2 - TILE_WIDTH*(this.info.width / 2);
        var newY = rootMapPos.y + (this.info.posX + this.info.posY) * TILE_HEIGHT / 2 - TILE_HEIGHT * 0.5;
        this.x = newX;
        this.y = newY;
        this.tempX = this.info.posX;
        this.tempY = this.info.posY;
    },

    // shadow
    addShadow: function() {
        switch (this.info.name) {
            case 'BDH':
                this.squareShadow(2);
                break;
            case 'TOW':
                this.squareShadow(4);
                break;
            case 'BAR':
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
        shadow.anchorX = 0;
        shadow.anchorY = 0;
        shadow.scale = 2;
        this.addChild(shadow, 2);
    },
    roundShadow: function() {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_5_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        shadow.attr({
            anchorX: 0,
            anchorY: 0,
            scale: 2,
            x: 0,
            y: 0,
        });
        this.addChild(shadow, 2);
    },
});
