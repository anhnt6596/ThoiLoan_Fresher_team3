var Troop = cc.Sprite.extend({
    _direction: 1,
    _status: "standing",
    _moveSpeed: 1,
    ctor: function(img) {
        // this._super(cc.spriteFrameCache.getSpriteFrame("ARM_1_1_idle_00.png"));
        this._super(img);
        this.init();
    },
    init: function() {
        // Lop con nap chong
    },
    moveTo: function(obj) {
        var obj1 = MAP._targetedObject;
        if (obj1) {
            this._finalDestination = {
                x: obj1.buildingImg.x,
                y: obj1.buildingImg.y
            };
            this.runStep();
        }
    },
    runStep: function() {
        if (
            this.x !== this._finalDestination.x
            || this.y !== this._finalDestination.y
        ) {
            var direction = this.calculateDirection(this._finalDestination);
            var nextSubDestination = this.calculateNextSubDestination(direction);

            cc.log("TOA DO NHA TIEP THEO SAP DI VAO" + MAP.calculatePos(nextSubDestination).x  + '/' + MAP.calculatePos(nextSubDestination).y);

            var lastDirection = this._direction;
            var lastStatus = this._status;
            this._status = "running";
            this._direction = this.calculateDirection(nextSubDestination);
            var moveTime = calculateDistance(nextSubDestination, this) / this._moveSpeed / 4;
            var moveAction = new cc.MoveTo(moveTime, cc.p(nextSubDestination.x, nextSubDestination.y));
            var sequence = new cc.Sequence(moveAction, new cc.CallFunc(this.runStep, this));
            this.stopAllActions();
            this.runAction(sequence);
            this.setZOrder();
            if (lastDirection !== this._direction || lastStatus === "standing") {
                this.runningEff();
            }
        } else {
            this._status = "standing";
            this.standingEff();
        }
    },
    calculateDirection: function(destination) {
        var direction;
        var difX = this.x - destination.x;
        var difY = this.y - destination.y;
        if (difX < 0 && difY < 0) direction = 4;
        else if (difX > 0 && difY < 0) direction = 7;
        else if (difX > 0 && difY > 0) direction = 5;
        else if (difX < 0 && difY > 0) direction = 2;
        else if (difX < 0) direction = 3;
        else if (difX > 0) direction = 6;
        else if (difY < 0) direction = 8;
        else if (difY > 0) direction = 1;
        cc.log("================> ", direction);
        return direction;
    },
    calculateNextSubDestination: function(direction) {
        var nextSubDestination = { x: this.x, y: this.y };
        var x = this.x;
        var y = this.y;
        switch (direction) {
            case 1:
                nextSubDestination = { x: this.x, y: this.y - TILE_HEIGHT / 2 }
                break;
            case 2:
                nextSubDestination = { x: this.x + TILE_WIDTH / 2, y: this.y - TILE_HEIGHT / 2 }
                break;
            case 3:
                nextSubDestination = { x: this.x + TILE_WIDTH / 2, y: this.y }
                break;
            case 4:
                nextSubDestination = { x: this.x + TILE_WIDTH / 2, y: this.y + TILE_HEIGHT / 2 }
                break;
            case 5:
                nextSubDestination = { x: this.x - TILE_WIDTH / 2, y: this.y - TILE_HEIGHT / 2 }
                break;
            case 6:
                nextSubDestination = { x: this.x - TILE_WIDTH / 2, y: this.y }
                break;
            case 7:
                nextSubDestination = { x: this.x - TILE_WIDTH / 2, y: this.y + TILE_HEIGHT / 2 }
                break;
            case 8:
                nextSubDestination = { x: this.x, y: this.y + TILE_HEIGHT / 2}
                break;
            default:
                break;
        }
        if (
            Math.abs(this.x - this._finalDestination.x) < TILE_WIDTH / 2
        ) nextSubDestination.x = this._finalDestination.x;
        if (
            Math.abs(this.y - this._finalDestination.y) < TILE_HEIGHT / 2
        ) nextSubDestination.y = this._finalDestination.y;
        return nextSubDestination;
    },
    standing: function() {

    },
    showAnims: function() {

    },
    setZOrder: function() {
        var mapPos = MAP.calculatePos(this);
        var newZ = 1000 - (mapPos.x + mapPos.y) * 10 + 40;
        MAP.reorderChild(this, newZ);
    }
});