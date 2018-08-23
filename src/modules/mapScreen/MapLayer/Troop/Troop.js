// var directionCircle = {
//     1: [2, 3, 5, 6],
//     2: [1, 3, 4, 5],
//     3: [1, 2, 4, 8],
//     4: [2, 3, 7, 8],
//     5: [1, 2, 6, 7],
//     6: [1, 5, 7, 8],
//     7: [4, 5, 6, 8],
//     8: [3, 4, 6, 7],
// };

var directionCircle = {
    1: [2, 5],
    2: [4, 5],
    3: [2, 4],
    4: [2, 7],
    5: [2, 7],
    6: [5, 7],
    7: [4, 5],
    8: [4, 7],
};

var Troop = cc.Sprite.extend({
    _level: 1,
    _direction: 1,
    _status: "standing",
    _moveSpeed: 1,
    _stopFlag: 0,
    
    ctor: function(building, img) {
        this._super(img);
        this._level = troopInfo[this._type].level || 1;
        this._housingSpace = config.troopBase[this._type].housingSpace;
        this._buildingContain = building;
        this._buildingContain.addArmy(this);
        this.init();
    },
    init: function() {
        MAP.addChild(this);
        this.setZOrder();
        var coor = this.calculateTroopCoorInArmyCamp();
        this.attr({
            x: coor.x,
            y: coor.y,
        });
        this.troopImg = this.createTroopImg();
        this.standingEff();
    },
    appear: function(building) {
        var coor = this.calculateStartPosionInBarrack(building);
        this.attr({
            x: coor.x,
            y: coor.y,
        });
        this.moveTo();
    },
    moveTo: function(obj) {
        this._stopFlag = 0
        // createSolidMapArray();
        // var obj1 = MAP._targetedObject;
        var obj1 = this._buildingContain;
        if (obj1) {
            var coor = this.calculateTroopCoorInArmyCamp();
            this._finalDestination = {
                x: coor.x,
                y: coor.y,
            };
            this.runStep();
        }
    },
    moveToWorldGate: function() {
        this._moveToWorldGate = true;
        this._finalDestination = {
            x: 2905,
            y: 1158,
        };
        this.runStep();
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
            if (solidMapArray[coor.x][coor.y] !== 0) {
                nextSubDestination = this.recalculateNextSubDestination(direction);
            }
            // cc.log("GIA TRI VI TRI TIEP THEO SAP DI VAO SAU: " + this.solidMapArray[coor.x][coor.y]);
            var lastDirection = this._direction;
            var lastStatus = this._status;
            this._status = "running";
            this._direction = this.calculateDirection(nextSubDestination);
            var moveTime = calculateDistance(nextSubDestination, this) / this._moveSpeed / 6;
            var moveAction = new cc.MoveTo(moveTime, cc.p(nextSubDestination.x, nextSubDestination.y));
            var sequence = new cc.Sequence(moveAction, new cc.CallFunc(this.runStep, this));
            this.stopAllActions();
            this.runAction(sequence);
            this.setZOrder();
            if (lastDirection !== this._direction || lastStatus === "standing") {
                this.runningEff();
            }
        } else {
            if(this._moveToWorldGate) {
                var nextDes = { x: 4195, y: 240 };
                var moveTime = calculateDistance(this, nextDes) / this._moveSpeed / 6;
                var moveAction = new cc.MoveTo(moveTime, cc.p(nextDes.x, nextDes.y));
                this._direction = 2;
                this.runningEff();
                this.runAction(moveAction);
                var self = this;
                setTimeout(function() {
                    // self.setVisible(false);
                    MAP.removeChild(self);
                }, moveTime*1000);
            } else {
                this._lastDirection = 0;
                this._status = "standing";
                this.setZOrder();
                this.standingEff();
            }
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
                nextSubDestination = { x: this.x, y: this.y - TILE_HEIGHT / 4 }
                break;
            case 2:
                nextSubDestination = { x: this.x + TILE_WIDTH / 4, y: this.y - TILE_HEIGHT / 4 }
                break;
            case 3:
                nextSubDestination = { x: this.x + TILE_WIDTH / 4, y: this.y }
                break;
            case 4:
                nextSubDestination = { x: this.x + TILE_WIDTH / 4, y: this.y + TILE_HEIGHT / 4 }
                break;
            case 5:
                nextSubDestination = { x: this.x - TILE_WIDTH / 4, y: this.y - TILE_HEIGHT / 4 }
                break;
            case 6:
                nextSubDestination = { x: this.x - TILE_WIDTH / 4, y: this.y }
                break;
            case 7:
                nextSubDestination = { x: this.x - TILE_WIDTH / 4, y: this.y + TILE_HEIGHT / 4 }
                break;
            case 8:
                nextSubDestination = { x: this.x, y: this.y + TILE_HEIGHT / 4}
                break;
            default:
                break;
        }
        var distance = calculateDistance(this, this._finalDestination);
        if (
            Math.abs(this.x - this._finalDestination.x) < TILE_WIDTH / 4
            && (!recalc || distance <= DIAGONAL)
        ) nextSubDestination.x = this._finalDestination.x;
        if (
            Math.abs(this.y - this._finalDestination.y) < TILE_HEIGHT / 4
            && (!recalc || distance <= DIAGONAL)
        ) nextSubDestination.y = this._finalDestination.y;
        return nextSubDestination;
    },
    recalculateNextSubDestination: function(direction) {
        var self = this;
        var minDistance = Number.MAX_SAFE_INTEGER;
        var listNextDes = directionCircle[direction].map(function (dir) {
            var nextDes = self.calculateNextSubDestination(dir, true);
            // cc.log("nextDes: " + nextDes.x  + '/' + nextDes.y);
            // cc.log("this.pos: " + self.x  + '/' + self.y);
            var coor = self.calculatePositionInSolidMapArray(nextDes);
            var distance;
            if (solidMapArray[coor.x][coor.y] !== 0) {
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
        var nextSubDestination;
        for(var i = 0; i < listNextDes.length; i++) {
            // cc.log(">>>>>>>>SUM>>>>>>>>>>>" + (listNextDes[i].direction + this._lastDirection));
            if(listNextDes[i].distance === minDistance) {
                if (listNextDes[i].direction + this._lastDirection === 9 && true) {
                    var j = i === 0 ? 1 : 0;
                    nextSubDestination = listNextDes[j].des;
                    this._lastDirection = listNextDes[j].direction;
                } else {
                    nextSubDestination = listNextDes[i].des;
                    this._lastDirection = listNextDes[i].direction;
                }
                // cc.log('nextSubDestination direction: ' + listNextDes[i].direction);
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
        var newZ = 1000 - (mapPos.x + mapPos.y) * 10 + 27;
        MAP.reorderChild(this, newZ);
    },
    createSolidMapArray: function() {
        solidMapArray = [];
        var i = 0;
        var j = 0;
        for (i = 0; i < SOLID_MAP_VALUE.SIZE; i++) {
            var row = [];
            for(j = 0; j < SOLID_MAP_VALUE.SIZE; j++) {
                row.push(SOLID_MAP_VALUE.GROUND);
            }
            solidMapArray.push(row);
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
                        solidMapArray[_inRow + i][_inColumn + j] = SOLID_MAP_VALUE.SOLID_2;
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
    },
    calculateTroopCoorInArmyCamp: function() {
        var add1 = randomInt(0, 1);
        var add2 = randomInt(0, 1);
        var x = add1 
        ? this._buildingContain.buildingImg.x + randomInt(2, 6) * TILE_WIDTH / 4
        : this._buildingContain.buildingImg.x - randomInt(2, 6) * TILE_WIDTH / 4;

        var y = add2
        ? this._buildingContain.buildingImg.y + randomInt(2, 6) * TILE_HEIGHT / 4
        : this._buildingContain.buildingImg.y - randomInt(2, 6) * TILE_HEIGHT / 4;
        
        return { x: x, y: y };
    },
    calculateStartPosionInBarrack: function(bar) {
        var x = bar.buildingImg.x + bar._width * TILE_WIDTH / 4;
        var y = bar.buildingImg.y - bar._height * TILE_HEIGHT / 4;
        return { x: x, y: y };
    },
});

function donateTroopShowAnims(troopType) { // ARM_1
    for (var i = 0; i < listTroopRefs.length; i++) {
        var troop = listTroopRefs[i];
        if (troop._type === troopType) {
            troop._buildingContain.removeTroop(troop);
            troop.moveToWorldGate();
            listTroopRefs.splice(i, 1);
            break;
        }
    }
}

// function indexOfMin(arr) {
//     if (arr.length === 0) {
//         return -1;
//     }
//     var min = arr[0];
//     var minIndex = 0;
//     for (var i = 1; i < arr.length; i++) {
//         if (arr[i] < min) {
//             minIndex = i;
//             min = arr[i];
//         }
//     }
//     return minIndex;
// }