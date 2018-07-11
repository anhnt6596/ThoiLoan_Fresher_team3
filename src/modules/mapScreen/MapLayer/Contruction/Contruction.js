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

        this.addBG();
        this.addShadow();
        this.addArrowMove();
        this.addGreenBG();
        this.addRedBG();
    },
    addBG: function() {
    },
    addGreenBG: function() {
    },
    addRedBG: function() {
    },
    addShadow: function() {
    },
    addArrowMove: function() {
    },
    squareShadow2: function () {
    },
    squareShadow3: function () {
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
});
