var Contruction = cc.Sprite.extend({
    ctor: function(info) {
        this._super();
        this.info = info;
        this.init();
    },
    init: function() {
        var newX = rootMapPos.x + (this.info.posY - this.info.posX) * TILE_WIDTH / 2 - TILE_WIDTH*(this.info.width/2);
        var newY = rootMapPos.y - (this.info.posX + this.info.posY) * TILE_HEIGHT / 2 - TILE_HEIGHT*(this.info.height - 0.5);
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
    },
    updatePosition: function(mapPos) {
    },
    checkNewPosition: function(mapPos) {
        return true;
    },
    onTarget: function() {
    },
    removeTarget: function() {
    },

    // shadow
    addShadow: function() {
        switch (this.info.name) {
            case 'BDH':
                this.squareShadow2();
                break;
            case 'GOL_1', 'GOL_2':
                this.squareShadow3();
            default:
                break;
        }
    },
    squareShadow2: function () {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_2_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        shadow.anchorX = 0;
        shadow.anchorY = 0;
        shadow.scale = 2;
        this.addChild(shadow, 2);
    },
    squareShadow3: function () {
        var resShadow = 'res/Art/Map/map_obj_bg/GRASS_3_Shadow.png';
        var shadow = new cc.Sprite(resShadow);
        shadow.anchorX = 0;
        shadow.anchorY = 0;
        shadow.scale = 2;
        this.addChild(shadow, 2);
    },
});
