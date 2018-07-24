//Kiem tra so nha dang xay hoac dang nang cap + so cay hoac da dang thu hoach (neu co)
var checkPendingBuilding = function(){
    var pendingBuilding = 0;
    for(var k in contructionList){
        if(contructionList[k].status == "pending" || contructionList[k].status == "upgrade"){                 //co the de bang "building" va "upgrading"
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

var finishSmallestRemainingTimeBuilding = function(){
    var idBuildingWillComplete = getIdBuildingMinRemainTime();
    for(var k in objectRefs){
        if(objectRefs[k]._id == idBuildingWillComplete){
            if(objectRefs[k]._status == 'pending'){
                objectRefs[k].buildComplete();
            }else if(objectRefs[k]._status == 'upgrade'){
                objectRefs[k].upgradeComplete();
            }
        }
    }
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
        if(contructionList[k].status == "pending" || contructionList[k].status == "upgrade") {
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
        if(contructionList[k].status == "pending" || contructionList[k].status == "upgrade") {
            var timeRemain = contructionList[k].buildTime * 1000 - (getCurrentServerTime() - contructionList[k].startTime);
            if(timeRemain < minTimeRemain){
                minTimeRemain = timeRemain;
                id = contructionList[k]._id;
            }
        }
    }
    return id;
};

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

var logReducedUserResources = function(){
    cc.log("========================REDUCED USER RESOURCE========================");
    cc.log("Gold:                   " + ReducedTempResources.gold);
    cc.log("Elixir:                 " + ReducedTempResources.elixir);
    cc.log("Dark Elixir:            " + ReducedTempResources.darkElixir);
    cc.log("Coin (G):               " + ReducedTempResources.coin);
    cc.log("========================REMAIN USER RESOURCE========================");
    cc.log("Gold remain:            " + gv.user.gold);
    cc.log("Elixir remain:          " + gv.user.elixir);
    cc.log("Dark Elixir remain:     " + gv.user.darkElixir);
    cc.log("Coin (G) remain:        " + gv.user.coin);
    cc.log("====================================================================");
};

var resetReducedTempResources = function(){
    ReducedTempResources.gold = 0;
    ReducedTempResources.elixir = 0;
    ReducedTempResources.darkElixir = 0;
    ReducedTempResources.coin = 0;
};

var getResourcesNextLevel = function(name, level){
    var cost = null;
    var gold = config.building[name][level+1].gold || 0;
    var elixir = config.building[name][level+1].elixir || 0;
    var darkElixir = config.building[name][level+1].darkElixir || 0;
    var coin = config.building[name][level+1].coin || 0;

    cost = { gold: gold, elixir: elixir, darkElixir: darkElixir, coin: coin };
    return cost;
};

//Tang tai nguyen cua user
var increaseUserResources = function(resources){
    gv.user.gold += resources.gold;
    gv.user.elixir += resources.elixir;
    gv.user.darkElixir += resources.darkElixir;
    gv.user.coin += resources.coin;

    LOBBY.update(gv.user);
};

var setUserResourcesCapacity = function(){
    var goldCapacity = 0;
    var elixirCapacity = 0;
    var darkElixirCapacity = 0;
    var currentLevelTownHall = 1;

    for(var k in contructionList){
        var build = contructionList[k];
        if(build.status == 'complete' || build.status == 'upgrade'){
            if(build.name == 'STO_1'){
                goldCapacity += config.building['STO_1'][build.level].capacity;
            }else if(build.name == 'STO_2'){
                elixirCapacity += config.building['STO_2'][build.level].capacity;
            }else if(build.name == 'STO_3'){
                darkElixirCapacity += config.building['STO_3'][build.level].capacity;
            }
        }
    }

    for(var k in contructionList){
        if(contructionList[k].name == 'TOW_1'){
            currentLevelTownHall = contructionList[k].level;
        }
    }

    gv.user.maxCapacityGold = goldCapacity + config.building['TOW_1'][currentLevelTownHall].capacityGold;
    gv.user.maxCapacityElixir = elixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityElixir;
    gv.user.maxCapacityDarkElixir = darkElixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityDarkElixir;
};

var updateBuilderNumber = function(){
    gv.user.allBuilder = checkBuilder();
    var a = checkPendingBuilding();
    gv.user.freeBuilder = gv.user.allBuilder - a;
    cc.log("========================================== All Builder: " + gv.user.allBuilder);
    cc.log("========================================== Busy Builder: " + a);
    cc.log("========================================== Free Builder: " + gv.user.freeBuilder);
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
    return getCurrentClientTime() - DeltaTime - BONUS_TIME;
};

var timeToString = function(second) {
    return second + 's';
};

//time: ms
var timeToReadable = function(time){
    time = Math.floor(time);
    var day = Math.floor(time/86400);
    var hour = Math.floor((time - 86400*day)/3600);
    var minute = Math.floor((time - 86400*day - 3600*hour)/60);
    var second = time - 86400*day - 36000*hour - 60*minute;
    var t = (day ? (day + 'd'):'') + (hour ? (hour + 'h'):'') + (minute ? (minute + 'm'):'')  + (second ? (second + 's'):'');
    t = t ? t : '0s';
    return t;
};

var objectSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
