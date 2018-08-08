var temp = temp || {};

temp.lastMoveBuilding = temp.lastMoveBuilding || null;

var lastIndexContructionList = 0;

var ReducedTempResources = {gold: 0, elixir: 0, darkElixir: 0, coin: 0};

//Add Construction
var buildingAdd = null;
var newBuildingAdd = null;

//Upgrade Construction
var buildingUpgrade = null;

//Quick Finish Construction
var buildingQuickFinish = null;

//Cancel Construction
var buildingCancel = null;

//Train Troop
var trainedBarrackId = null;
var trainedTroopType = null;