var TownHall = Building.extend({
    img_x: -50,
    img_y: -40,
    ctor: function(info) {
        this._super(info);
        this.addTownHallImg();
    },
    addTownHallImg: function() {
        var level = this.info.level || 1;
        var dir = 'res/Art/Buildings/townhall/TOW_1_'+ level +'/idle/image0000.png';
        var townHallImage = new cc.Sprite(dir);
        townHallImage.anchorX = 0;
        townHallImage.anchorY = 0;
        townHallImage.x = this.img_x;
        townHallImage.y = this.img_y;
        this.addChild(townHallImage, 10);
    }
});
