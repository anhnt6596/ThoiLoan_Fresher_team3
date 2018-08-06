var directionCircle = {
    1: [2, 3, 5, 6],
    2: [1, 3, 4, 5],
    3: [1, 2, 4, 8],
    4: [2, 3, 7, 8],
    5: [1, 2, 6, 7],
    6: [1, 5, 7, 8],
    7: [4, 5, 6, 8],
    8: [3, 4, 6, 7],
};

var Troop = cc.Sprite.extend({
    _level: 1,
    _direction: 1,
    _status: "standing",
    _moveSpeed: 1,
    _stopFlag: 0,
    solidMapArray: [],
    ctor: function(building, level, img) {
        // this._super(cc.spriteFrameCache.getSpriteFrame("ARM_1_1_idle_00.png"));
        this._super(img);
        this._level = level;
        this._buildingContain = building;
        this.init();
    },
    init: function() {
        // Lop con nap chong
    },
    moveTo: function(obj) {
        this._stopFlag = 0
        this.createSolidMapArray();
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
            (this.x !== this._finalDestination.x || this.y !== this._finalDestination.y)
            && !this._stopFlag
        ) {
            var direction = this.calculateDirection(this._finalDestination);
            var nextSubDestination = this.calculateNextSubDestination(direction);

            // cc.log("TOA DO NHA TIEP THEO SAP DI VAO" + MAP.calculatePos(nextSubDestination).x  + '/' + MAP.calculatePos(nextSubDestination).y);

            var coor = this.calculatePositionInSolidMapArray(nextSubDestination);
            // cc.log("GIA TRI VI TRI TIEP THEO SAP DI VAO TRUOC: " + this.solidMapArray[coor.x][coor.y]);
            if (this.solidMapArray[coor.x][coor.y] !== 0) {
                nextSubDestination = this.recalculateNextSubDestination(direction);
            }
            // cc.log("GIA TRI VI TRI TIEP THEO SAP DI VAO SAU: " + this.solidMapArray[coor.x][coor.y]);
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
        // cc.log("===direction=============> ", direction);
        return direction;
    },
    calculateNextSubDestination: function(direction, recalc = false) {
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
            && !recalc
        ) nextSubDestination.x = this._finalDestination.x;
        if (
            Math.abs(this.y - this._finalDestination.y) < TILE_HEIGHT / 2
            && !recalc
        ) nextSubDestination.y = this._finalDestination.y;
        return nextSubDestination;
    },
    recalculateNextSubDestination: function(direction) {
        var self = this;
        var minDistance = Number.MAX_SAFE_INTEGER;
        var listNextDes = directionCircle[direction].map(function (dir) {
            var nextDes = self.calculateNextSubDestination(dir, true);
            cc.log("nextDes: " + nextDes.x  + '/' + nextDes.y);
            cc.log("this.pos: " + self.x  + '/' + self.y);
            var coor = self.calculatePositionInSolidMapArray(nextDes);
            var distance;
            if (self.solidMapArray[coor.x][coor.y] !== 0) {
                distance = Number.MAX_SAFE_INTEGER;
            } else {
                distance = calculateDistance(nextDes, self._finalDestination);
            }
            if(distance < minDistance) minDistance = distance;
            return {
                des: nextDes,
                distance: distance,
                direction: dir,
            };
        });
        // var nextSubDestination = listNextDes[0].des;
        for(var i = 0; i < listNextDes.length; i++) {
            if(listNextDes[i].distance === minDistance) {
                nextSubDestination = listNextDes[i].des;
                cc.log('nextSubDestination direction: ' + listNextDes[i].direction);
            }
        }
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
    },
    createSolidMapArray: function() {
        this.solidMapArray = [];
        var i = 0;
        var j = 0;
        for (i = 0; i < SOLID_MAP_VALUE.SIZE; i++) {
            var row = [];
            for(j = 0; j < SOLID_MAP_VALUE.SIZE; j++) {
                row.push(SOLID_MAP_VALUE.GROUND);
            }
            this.solidMapArray.push(row);
        }
        for (object in objectRefs) {
            var obj = objectRefs[object];
            if(obj._name !== "AMC_1") {
                var _inRow = obj._posX * 2;
                var _inColumn = obj._posY * 2;
                var _size = obj._width * 2;
                for (var i = 1; i < _size - 1; i++) {
                    for (var j = 1; j < _size - 1; j++) {
                        if (_inRow + i < SOLID_MAP_VALUE.SIZE && _inColumn + j < SOLID_MAP_VALUE.SIZE)
                        this.solidMapArray[_inRow + i][_inColumn + j] = SOLID_MAP_VALUE.SOLID_2;
                    }
                }
            }
            //cc.log('>>>>> ', this.solidMapArray[_inRow + 1][_inColumn + 1]);
        }
    },
    calculatePositionInSolidMapArray: function(coorInMap) {
        var coor = { x: 0, y: 0 };
        var x = coorInMap.x - rootMapPos.x;
        var y = coorInMap.y - rootMapPos.y;
        coor.x = parseInt(((y / (TILE_HEIGHT/4) - x / (TILE_WIDTH/4)) / 2).toFixed(0));
        coor.y = parseInt(((x / (TILE_WIDTH/4) + y / (TILE_HEIGHT/4)) / 2).toFixed(0));
        // cc.log(coor.x + ' / ' + coor.y);
        return coor;
    }
});

function indexOfMin(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var min = arr[0];
    var minIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            minIndex = i;
            min = arr[i];
        }
    }
    return minIndex;
}