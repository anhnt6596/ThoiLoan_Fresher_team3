var Warrior = Troop.extend({
    ctor: function(building, level) {
        this._type = "ARM_1";
        this._direction = randomInt(1, 8);
        this._moveSpeed = config.troopBase[this._type].moveSpeed || 16;
        this._super(building, level, "res/Art/Map/map_obj_bg/1x1_bong.png");
    },
    createTroopImg: function() {
        var troopImg = new cc.Sprite();
        troopImg.attr({
            x: this.width / 2,
            y: this.height / 2,
        });
        this.addChild(troopImg);
        return troopImg;
    },
    standingEff: function() {
        // cc.log("================> ", this._direction);
        var startFrame = 0;
        var endFrame = 0;
        var flip = 1;
        switch (this._direction) {
            case 1:
                startFrame = 0;
                endFrame = 5;
                break;
            case 2: case 5:
                startFrame = 12;
                endFrame = 17;
                break;
            case 3: case 6:
                startFrame = 12;
                endFrame = 17;
                break;
            case 4: case 7:
                startFrame = 18;
                endFrame = 23;
                break;
            case 8:
                startFrame = 24;
                endFrame = 29;
                break;
            default:
                break;
        }
        if ([2, 3, 4].indexOf(this._direction) !== -1) flip = -1;
        this.troopImg.attr({ scaleX: flip });
        var standingAnims = ui.makeAnimation(this._type + '_' + this._level + '/idle/image00', startFrame, endFrame, 0.1);
        this.troopImg.stopAllActions();
        this.troopImg.runAction(standingAnims.repeatForever());
    },
    runningEff: function() {
        // cc.log("================> ", this._direction);
        var startFrame = 0;
        var endFrame = 0;
        var flip = 1;
        switch (this._direction) {
            case 1:
                startFrame = 0;
                endFrame = 13;
                break;
            case 2: case 5:
                startFrame = 14;
                endFrame = 27;
                break;
            case 3: case 6:
                startFrame = 28;
                endFrame = 41;
                break;
            case 4: case 7:
                startFrame = 42;
                endFrame = 55;
                break;
            case 8:
                startFrame = 56;
                endFrame = 69;
                break;
            default:
                break;
        }
        if ([2, 3, 4].indexOf(this._direction) !== -1) flip = -1;
        this.troopImg.attr({ scaleX: flip });
        var runningAnims = ui.makeAnimation(this._type + '_' + this._level + '/run/image00', startFrame, endFrame, 0.10);
        this.troopImg.stopAllActions();
        this.troopImg.runAction(runningAnims.repeatForever());
    },
});