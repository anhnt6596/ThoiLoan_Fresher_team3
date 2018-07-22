//Khoi tao mapLogic
var createMapLogic = function(){
    var _mapLogic = [];

    //tao ban do 42x42
    _mapLogic = new Array(42);
    for (var i = 0; i < 42; i++) {
        _mapLogic[i] = new Array(42);
    }

    //Set giua ban do = 0
    for(var v = 1; v < 41; v++){
        for(var t = 1; t < 41; t++){
            _mapLogic[v][t] = 0;
        }
    }

    //Set bien (bao) cua ban do = -1
    for(var m = 0; m < 42; m++){
        _mapLogic[0][m] = -1;
    }
    for(var n = 0; n < 42; n++){
        _mapLogic[41][n] = -1;
    }
    for(var p = 0; p < 42; p++){
        _mapLogic[p][0] = -1;
    }
    for(var q = 0; q < 42; q++){
        _mapLogic[q][41] = -1;
    }

    //Set khu vuc co nha da dc dat = 1
    for(var k in contructionList){
        var item = contructionList[k];
        _mapLogic[item.posX][item.posY] = 1;
        for(var a = 0; a < item.width; a++){
            for(var b = 0; b < item.height; b++){
                _mapLogic[item.posX + a][item.posY + b] = 1;
            }
        }
    }

    //Set khu vuc co vat can = -1
    for(var k in obstacleLists){
        var item = obstacleLists[k];
        _mapLogic[item.posX][item.posY] = -1;
        for(var a = 0; a < item.width; a++){
            for(var b = 0; b < item.height; b++){
                _mapLogic[item.posX + a][item.posY + b] = -1;
            }
        }
    }

    return _mapLogic;
};

//Ham tinh diem dua vao boundary cua building
var scoringPosition = function(posX, posY, width, height, mapLogic){
    var score = 0;

    for(var m = posY - 1; m < posY + height + 1; m++){
        if(mapLogic[posX - 1][m] == 1){
            score++;
        }
    }
    for(var n = posY - 1; n < posY + height + 1; n++){
        if(mapLogic[posX + height][n] == 1){
            score++;
        }
    }
    for(var i = posX; i < posX + width; i++){
        if(mapLogic[i][posY - 1] == 1){
            score++;
        }
    }
    for(var j = posX; j < posX + width; j++){
        if(mapLogic[j][posY + width] == 1){
            score++;
        }
    }

    return score;
};

//Tra ve false neu khong the dat nha, tra ve diem neu dat duoc
var checkAvailablePosition = function(posX, posY, width, height, mapLogic){
    if(posX + width > 39 || posY + height > 39){
        return false;
    }
    for(var k = 0; k < width; k++){
        for(var h = 0; h < height; h++){
            if(mapLogic[posX + k][posY + h] == 0){
                continue;
            }else{
                return false;
            }
        }
    }
    return scoringPosition(posX, posY, width, height, mapLogic);
};

//Suggest vi tri cho building co width, height cho trc trong 1 mapLogic cho truoc
var suggestLocation = function(width, height, mapLogic){
    var maxScore = checkAvailablePosition(1, 1, width, height, mapLogic);
    var posXMax = 1;
    var posYMax = 1;

    for(var a = 1; a < mapLogic.length; a++){
        for(var b = 1; b < mapLogic[0].length; b++){
            var score = checkAvailablePosition(a, b, width, height, mapLogic);
            if(score > maxScore){
                maxScore = score;
                posXMax = a;
                posYMax = b;
            }
        }
    }

    var location = {posX:posXMax, posY:posYMax};
    return location;
};


