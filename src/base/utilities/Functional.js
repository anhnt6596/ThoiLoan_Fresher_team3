//Kiem tra so nha dang xay hoac dang nang cap + so cay hoac da dang thu hoach (neu co)
var checkPendingBuilding = function(){
    var pendingBuilding = 0;
    for(var k in contructionList){
        if(contructionList[k].status == "pending"){                 //co the de bang "building" va "upgrading"
            pendingBuilding++;
        }
    }
    return pendingBuilding;
};

//Kiem tra so tho xay user co
var checkBuilder = function(){
    var builder = 0;
    for(var k in contructionList){
        if(contructionList[k].name == "BDH_1"){                 //co the de bang "building" hoac "upgrading"
            builder++;
        }
    }
    return builder;
};

//Kiem tra co tho xay nao ranh khong
var checkIsFreeBuilder = function(){
    var pendingBuilding = checkPendingBuilding();
    var builder = checkBuilder();
    if(builder - pendingBuilding > 0){
        return true;
    }
    return false;
};

//Kiem tra tai nguyen co du khong
//Neu g = 0 la du tai nguyen
//Neu g > 0 la so G con thieu so voi cost
var checkUserResources = function(costBuilding){
    var g = 0;
    if(gv.user.gold < costBuilding.gold){
        g += goldToG(costBuilding.gold - gv.user.gold);
    }
    if(gv.user.elixir < costBuilding.elixir){
        g += elixirToG(costBuilding.elixir - gv.user.elixir);
    }
    if(gv.user.darkElixir < costBuilding.darkElixir){
        g += darkElixirToG(costBuilding.darkElixir - gv.user.darkElixir);
    }
    if(gv.user.coin < costBuilding.coin){
        g = gv.user.coin - costBuilding.coin;          //Khong du g de mua building ma can g <=> g < 0
    }
    return g;
};


//Get G de release Building dang xay (hoac dang upgrade) co thoi gian pending con lai la it nhat
//Truoc khi dung ham nay nen dung ham checkIsFreeBuilder()
var getGToReleaseBuilder = function(){
    var minTimeRemain = Infinity;
    for(var k in contructionList){
        if(contructionList[k].status == "pending") {
            var timeRemain = contructionList[k].buildTime*1000 - (getCurrentServerTime() - contructionList[k].startTime);
            if(timeRemain < minTimeRemain){
                minTimeRemain = timeRemain;
            }
        }
    }
    if(minTimeRemain == Infinity){
        return 0;
    }else{
        return timeToG(minTimeRemain/1000);
    }
};

//Tra ve id cua nha ma co thoi gian con lai la it nhat
var getIdBuildingMinRemainTime = function(){
    var minTimeRemain = Infinity;
    var id = null;
    for(var k in contructionList){
        if(contructionList[k].status == "pending") {
            var timeRemain = contructionList[k].buildTime * 1000 - (getCurrentServerTime() - contructionList[k].startTime);
            if(timeRemain < minTimeRemain){
                minTimeRemain = timeRemain;
                id = contructionList[k]._id;
            }
        }
    }
    return id;
}



//Tru tai nguyen cua user
var reduceUserResources = function(costBuilding){
    if(gv.user.gold >= costBuilding.gold){
        gv.user.gold -= costBuilding.gold;
    }
    if(gv.user.elixir >= costBuilding.elixir){
        gv.user.elixir -= costBuilding.elixir;
    }
    if(gv.user.darkElixir >= costBuilding.darkElixir){
        gv.user.darkElixir -= costBuilding.darkElixir;
    }
    if(gv.user.coin >= costBuilding.coin){
        gv.user.coin -= costBuilding.coin;
    }

    LOBBY.update(gv.user);
};



//Quy doi tai nguyen sang G
var goldToG = function(gold){
    return Math.floor(gold);
};
var elixirToG = function(elixir){
    return Math.floor(elixir);
};
var darkElixirToG = function(darkElixir){
    return Math.floor(darkElixir);
};


//Quy doi thoi gian (s) sang G
var timeToG = function(time){
    return Math.ceil(time/60);
};


//Format Number
var formatNumber = function(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var doNothing = function() {};

var randomInt = function(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
};

//ms
var getCurrentClientTime = function(){
    var date = new Date();
    return date.getTime();
};

//ms
var getCurrentServerTime = function(){
    return getCurrentClientTime() - DeltaTime;
};

var timeToString = function(second) {
    return second + 's';
};
