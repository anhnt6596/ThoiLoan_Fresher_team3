var solidMapArray = solidMapArray || [];

var createSolidMapArray = function() {
    solidMapArray = [];
    var i = 0;
    var j = 0;
    for (i = 0; i < SOLID_MAP_VALUE.SIZE; i++) {
        var row = [];
        for(j = 0; j < SOLID_MAP_VALUE.SIZE; j++) {
            row.push(SOLID_MAP_VALUE.GROUND);
        }
        this.solidMapArray.push(row);
    }
    var fill = function(q) {
        var _inRow = obj._posX * 2;
        var _inColumn = obj._posY * 2;
        var _size = obj._width * 2;
        for (var i = q; i < _size - q; i++) {
            for (var j = q; j < _size - q; j++) {
                if (_inRow + i < SOLID_MAP_VALUE.SIZE && _inColumn + j < SOLID_MAP_VALUE.SIZE)
                solidMapArray[_inRow + i][_inColumn + j] = SOLID_MAP_VALUE.SOLID_2;
            }
        }
    };
    for (object in objectRefs) {
        var obj = objectRefs[object];
        if (obj._name === "AMC_1") {
            fill(4);
        // } else if (obj._width <= 2 ) {
        //     fill(0);
        } else {
            fill(1);
        }
        //cc.log('>>>>> ', this.solidMapArray[_inRow + 1][_inColumn + 1]);
    }
};