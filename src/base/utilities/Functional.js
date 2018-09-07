//Kiem tra so nha dang xay hoac dang nang cap + so cay hoac da dang thu hoach (neu co)
var checkPendingBuilding = function(){
    var pendingBuilding = 0;
    for(var k in contructionList){
        if(contructionList[k].status == PENDING || contructionList[k].status == UPGRADE){                 //co the de bang "building" va "upgrading"
            pendingBuilding++;
        }
    }
    return pendingBuilding;
};

//kiem tra xem co quan linh dang duoc nghien cuu khong
var getTroopResearching = function(){
    for (item in troopInfo) {
        var obj = troopInfo[item];
        if (obj.status==="researching"){
            research_constant.troop = obj;
            return obj;
        }
    }
    return null;
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
            if(objectRefs[k]._status == PENDING){
                objectRefs[k].buildComplete(false);
            }else if(objectRefs[k]._status == UPGRADE){
                objectRefs[k].upgradeComplete(false);
            }
        }
    }
};

var getObjBuildingById = function(id) {
    for(var k in objectRefs){
        if(objectRefs[k]._id == id){
            return objectRefs[k];
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
var checkUserResourcesResearch = function(gold,elixir,darkElixir,coin){
    var g = 0;
    if(gv.user.gold < gold){
        g += goldToG(gold - gv.user.gold);
    }
    if(gv.user.elixir < elixir){
        g += elixirToG(elixir - gv.user.elixir);
    }
    if(gv.user.darkElixir < darkElixir){
        g += darkElixirToG(darkElixir - gv.user.darkElixir);
    }
    return g;
};

//Get loại tài nguyên bị thiếu
var getLackingResources = function(cost){
    var lackingResource = {gold:0, elixir:0, darkElixir:0};
    if(gv.user.gold < cost.gold) lackingResource.gold = cost.gold - gv.user.gold;
    if(gv.user.elixir < cost.elixir) lackingResource.elixir = cost.elixir - gv.user.elixir;
    if(gv.user.darkElixir < cost.darkElixir) lackingResource.darkElixir = cost.darkElixir - gv.user.darkElixir;
    return lackingResource;
};


//Get G de release Building dang xay (hoac dang upgrade) co thoi gian pending con lai la it nhat
//Truoc khi dung ham nay nen dung ham checkIsFreeBuilder()
var getGToReleaseBuilder = function(){
    var minTimeRemain = Infinity;
    for(var k in contructionList){
        if(contructionList[k].status == PENDING || contructionList[k].status == UPGRADE) {
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
        if(contructionList[k].status == PENDING || contructionList[k].status == UPGRADE) {
            var timeRemain = contructionList[k].buildTime * 1000 - (getCurrentServerTime() - contructionList[k].startTime);
            if(timeRemain < minTimeRemain){
                minTimeRemain = timeRemain;
                id = contructionList[k]._id;
            }
        }
    }
    return id;
};

//Kiem tra dieu kien upgrade
var checkConditionUpgrade = function(building){
    var currentLevelTownHall = getCurrentLevelTownHall();
    var nextLevel = building._level + 1;
    if(config.building[building._name][nextLevel].townHallLevelRequired > currentLevelTownHall){
        return false;
    }
    return true;
};

//Tru tai nguyen cua user
var reduceUserResources = function(costBuilding){
    if(gv.user.gold >= costBuilding.gold){
        gv.user.gold -= costBuilding.gold;
    }else{
        gv.user.gold = 0;
    }
    if(gv.user.elixir >= costBuilding.elixir){
        gv.user.elixir -= costBuilding.elixir;
    }else{
        gv.user.elixir = 0;
    }
    if(gv.user.darkElixir >= costBuilding.darkElixir){
        gv.user.darkElixir -= costBuilding.darkElixir;
    }else{
        gv.user.darkElixir = 0;
    }
    if(gv.user.coin >= costBuilding.coin){
        gv.user.coin -= costBuilding.coin;
    }else{
        gv.user.coin = 0;
    }

    this.updateGUI();
};

var timeToProductivity = function(type,level,time_sanxuat){ //ham chuyen doi thoi gian sang san luong, thoi gian truyen vao tinh theo s
    var unit_product = config.building[type][level].productivity;
    //console.log("unit_product = "+unit_product);
    var ans = ((time_sanxuat / (60 * 60)) * unit_product);
    var capacity = config.building[type][level].capacity;

    if (ans>capacity){
        ans = capacity;
        return {sanluong:ans, is_full:true};
    }
    return {sanluong:ans, is_full:false};
};

var changeUserResource = function (_gold,_elixir,_darkElixir,_coin, is_add) {
    is_add
    ? addUserResources(_gold,_elixir,_darkElixir,_coin)
    : reduceUserResourcesResearch(_gold,_elixir,_darkElixir,_coin);
    LOBBY.update(gv.user);
    storageBuildingUpdateImg(gv.user);
};

var addUserResources = function (_gold,_elixir,_darkElixir,_coin) {
    gv.user.gold = gv.user.gold + _gold;
    if (gv.user.gold>gv.user.maxCapacityGold) {
        gv.user.gold = gv.user.maxCapacityGold;
    }
    gv.user.elixir = gv.user.elixir + _elixir;
    if (gv.user.elixir>gv.user.maxCapacityElixir) {
        gv.user.elixir = gv.user.maxCapacityElixir;
    }
    gv.user.darkElixir = gv.user.darkElixir + _darkElixir;
    if (gv.user.darkElixir>gv.user.maxCapacityDarkElixir){
        gv.user.darkElixir = gv.user.maxCapacityDarkElixir;
    }
    gv.user.coin = gv.user.coin + _coin;
    LOBBY.update(gv.user);

};

var reduceUserResourcesResearch = function(gold,elixir,darkElixir,coin){
    if(gv.user.gold >= gold){
        gv.user.gold -= gold;
    }else{
        gv.user.gold = 0;
    }
    if(gv.user.elixir >= elixir){
        gv.user.elixir -= elixir;
    }else{
        gv.user.elixir = 0;
    }
    if(gv.user.darkElixir >= darkElixir){
        gv.user.darkElixir -= darkElixir;
    }else{
        gv.user.darkElixir = 0;
    }
    if(gv.user.coin >= coin){
        gv.user.coin -= coin;
    }else{
        gv.user.coin = 0;
    }
    storageBuildingUpdateImg(gv.user);
    LOBBY.update(gv.user);
};

var storageBuildingUpdateImg = function(userInfo) {
    storageBuildingRefs.forEach(function(element) {
        element.calculateStorage(userInfo);
    });
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

    if(gv.user.gold + resources.gold > gv.user.maxCapacityGold){
        gv.user.gold = gv.user.maxCapacityGold;
    }else{
        gv.user.gold += resources.gold;
    }

    if(gv.user.elixir + resources.elixir > gv.user.maxCapacityElixir){
        gv.user.elixir = gv.user.maxCapacityElixir;
    }else{
        gv.user.elixir += resources.elixir;
    }

    //if(gv.user.darkElixir + resources.darkElixir > gv.user.maxCapacityDarkElixir){
    //    gv.user.darkElixir = gv.user.maxCapacityDarkElixir;
    //}else{
        gv.user.darkElixir += resources.darkElixir;
    //}

    gv.user.coin += resources.coin;
    this.updateGUI();
    resetReducedTempResources();
};

var setUserResourcesCapacity = function(){
    var goldCapacity = 0;
    var elixirCapacity = 0;
    var darkElixirCapacity = 0;
    var currentLevelTownHall = getCurrentLevelTownHall();

    for(var k in contructionList){
        var build = contructionList[k];
        if(build.status == COMPLETE || build.status == UPGRADE){
            if(build.name == 'STO_1'){
                goldCapacity += config.building['STO_1'][build.level].capacity;
            }else if(build.name == 'STO_2'){
                elixirCapacity += config.building['STO_2'][build.level].capacity;
            }else if(build.name == 'STO_3'){
                darkElixirCapacity += config.building['STO_3'][build.level].capacity;
            }
        }
    }

    gv.user.maxCapacityGold = goldCapacity + config.building['TOW_1'][currentLevelTownHall].capacityGold;
    gv.user.maxCapacityElixir = elixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityElixir;
    gv.user.maxCapacityDarkElixir = darkElixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityDarkElixir;

    storageBuildingUpdateImg(gv.user);
};

//get level TOW_1 hien tai
var getCurrentLevelTownHall = function(){
    for(var k in contructionList){
        if(contructionList[k].name == 'TOW_1'){
            return contructionList[k].level;
        }
    }
};

var getCurrentGuildCapacity = function() {
    var levelCLC = 1;
    for(var k in contructionList){
        if(contructionList[k].name == 'CLC_1'){
            levelCLC = contructionList[k].level;
            break;
        }
    }
    return config.building.CLC_1[levelCLC].troopCapacity;
};

var updateBuilderNumber = function(){
    gv.user.allBuilder = checkBuilder();
    var a = checkPendingBuilding();
    gv.user.freeBuilder = gv.user.allBuilder - a;
    cc.log("========================================== All Builder: " + gv.user.allBuilder);
    cc.log("========================================== Busy Builder: " + a);
    cc.log("========================================== Free Builder: " + gv.user.freeBuilder);
};

//Hien thi lai giao dien
var updateGUI = function() {
    updateBuilderNumber();
    setUserResourcesCapacity();
    LOBBY.update(gv.user);
};

var updateMessageBox = function() {
    if(temp.isOpenMessageBox){
        cc.log("==================================== MESSAGE BOX dang MO =====================");
        LOBBY.onCloseInteractiveGuild();
        LOBBY.onInteractiveGuild();
    }else{
        cc.log("==================================== MESSAGE BOX dang DONG =====================");
        LOBBY.onInteractiveGuild();
        LOBBY.onCloseInteractiveGuild();
    }
};

var getLevelGuildBuilding = function() {
    for(var k in contructionList){
        if(contructionList[k].name == 'CLC_1'){
            return contructionList[k].level;
        }
    }
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
    return getCurrentClientTime() - time.DeltaTime - time.BONUS_TIME;
};

//time: s
var timeToReadable = function(time){
    var count = 0;
    var timeString = '';
    var buildTime = Math.ceil(time);
    var day = Math.floor(buildTime/86400);
    if(day != 0 && count < 2){
        count++;
        timeString += (day + 'd');
    }
    var hour = Math.floor((buildTime - 86400*day)/3600);
    if(hour != 0 && count < 2){
        count++;
        timeString += (hour + 'h');
    }
    var minute = Math.floor((buildTime - 86400*day - 3600*hour)/60);
    if(minute != 0 && count < 2){
        count++;
        timeString += (minute + 'm');
    }
    var second = buildTime - 86400*day - 3600*hour - minute*60;
    if(second != 0 && count < 2){
        count++;
        timeString += (second + 's');
    }
    var t = timeString ? timeString : '0s';
    return t;
};

var objectSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var getTotalCapacityAMCs = function(){
    var total = 0;
    for(var k in contructionList){
        var build = contructionList[k];
        if((build.status == COMPLETE || build.status == UPGRADE) && (build.name == 'AMC_1')){
            total += config.building['AMC_1'][build.level].capacity;
        }
    }
    return total;
};

var getTotalCurrentTroopCapacity = function(){
    var total = 0;
    for(var i in troopInfo){
        total += troopInfo[i].population * config.troopBase[i].housingSpace;
    }
    return total;
};

var getTotalCapacityTroopGuild = function(){
    var totalCapacity = 0;
    for(var i in troopGuildList){
        var item = troopGuildList[i];
        totalCapacity += config.troopBase[item.typeTroop].housingSpace;
    }
    return totalCapacity;
};

var getIdGuildBuilding = function() {
    for(var k in contructionList){
        var build = contructionList[k];
        if(build.name == 'CLC_1'){
            return build._id;
        }
    }
};

var getGuildBuildingById = function () {
    for(var k in objectRefs){
        var build = objectRefs[k];
        if(build._name == 'CLC_1'){
            return build;
        }
    }
};

var getBarrackQueueById = function(id) {
    for(var i = 0; i < barrackQueueList.length; i++) {
        var barrackQueue = barrackQueueList[i];
        if(barrackQueue._idBarrack == id) return barrackQueue;
    }
    return null;
};

var getBarrackObjectById = function(id) {
    for(var i in barrackRefs){
        if(barrackRefs[i]._id == id){
            return barrackRefs[i];
        }
    }
};

var getBarrackOrderById = function(id) {
    var order = 1;
    for(var i in barrackRefs){
        if(barrackRefs[i]._id < id){
            order++;
        }
    }
    return order;
};

var createTrainPopup = function(barrackObject, isShowPopup) {
    var data = {train: true, barrack: barrackObject};
    var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack " + getBarrackOrderById(barrackObject._id), true, data);
    if(isShowPopup) cc.director.getRunningScene().addChild(popup, 200);
};

var listBuildingMissImage = ['SPF_1', 'KQB_1', 'KQB_2', 'KQB_3', 'KQB_4', 'BAR_2', 'DEF_2', 'DEF_3', 'DEF_4', 'DEF_5', 'DEF_7', 'DEF_8'];

var calculateDistance = function(a, b) {
    return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));
};

var checkHasWallInPos = function(x, y) {
    var result = {
        status: false,
        wall: null,
    };
    for (var i = 0; i < wallRefs.length; i++) {
        var wall = wallRefs[i];
        if (wall._posX == x && wall._posY == y)  {
            cc.log(wall._posY);
            // cc.log("có tường ở giữa")
            result = {
                status: true,
                wall: wall,
            }
            return result;
        }
    }
    result.status = false;
    return result;
}

var numberInRange = function(x, a, b) {
    if (x < a) return false;
    if (x > b) return false;
    return true;
}