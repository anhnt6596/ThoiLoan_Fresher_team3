var temp = temp || {};

temp.lastMoveBuilding = temp.lastMoveBuilding || null;

var lastIndexContructionList = 0;

var ReducedTempResources = {gold: 0, elixir: 0, darkElixir: 0, coin: 0};

//Add Construction
temp.buildingAdd = null;
temp.newBuildingAdd = null;

//Upgrade Construction
temp.buildingUpgrade = null;

//Quick Finish Construction
temp.buildingQuickFinish = null;

//Finish Time Construction
temp.buildingFinishTime = null;

//Cancel Construction
temp.buildingCancel = null;

//Train Troop
temp.trainedBarrackId = null;
temp.trainedTroopType = null;
//Bao hieu vuot qua capacity: true
temp.pauseOverCapacityFlag = false;

//Lan gui request message dau tien
temp.getListMessageFirst = false;

//Flag cho phep gui message
temp.enableSendMessageFlag = true;

//
temp.messageContent = null;
temp.messageType = null;