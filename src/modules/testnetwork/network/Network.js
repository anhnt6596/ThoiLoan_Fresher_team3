/**
 * Created by KienVN on 10/2/2017.
 */
//var count =0;
var gv = gv||{};
var testnetwork = testnetwork||{};
count =0;
var requestedServerTime = 0;

var NETWORK = NETWORK || null;

testnetwork.Connector = cc.Class.extend({
    ctor:function(gameClient)
    {
        NETWORK = this;
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
        this.sessionKey = 10001010;

    },
    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd)
        {
            case gv.CMD.HAND_SHAKE:

                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                this.sendGetUserInfo();
                //LoginScreen = fr.getCurrentScreen();
                //fr.getCurrentScreen().onFinishLogin(packet.username, packet.password);
                break;
            case gv.CMD.USER_INFO:

                //this.setUserInfomation();
                //fr.getCurrentScreen().onUserValidate(packet.name,packet.username, packet.password,packet.validate);
                //fr.getCurrentScreen().onUserValidate(packet.validate);
                this.setUserInfomation(packet);
                this.sendGetMapInfo();
                //this.sendGetBarrackQueueInfo();
                //Phai hien thi them cac troop da dc train offline
                //this.sendGetTroopInfo();
                break;
            case gv.CMD.GET_MAP_INFO:
                fr.getCurrentScreen().onFinishGameInfo();
                this.sendGetTroopInfo();
                break;
            case gv.CMD.MOVE_CONSTRUCTION:
                //short packet.validate //success=1; false=0;
                if (packet.validate) {
                    cc.log("================================= SERVER XAC NHAN MOVE CONSTRUCTION============================");
                    temp.lastMoveBuilding && temp.lastMoveBuilding.acceptSendMoveFromServer();
                    temp.lastMoveBuilding = null;
                }
                else {
                    cc.log("================================= SERVER TU CHOI MOVE CONSTRUCTION============================");
                    temp.lastMoveBuilding && temp.lastMoveBuilding.sendMoveIsDenined();
                    temp.lastMoveBuilding = null;
                }
                break;
            case gv.CMD.ADD_CONSTRUCTION:
                //short packet.validate //success=1; false=0;
                if (packet.validate) {
                    cc.log('=======================================G bi tru di khi xay: ' + ReducedTempResources.coin);
                    cc.log("=======================================XAC NHAN XAY tu SERVER=======================================");
                    MAP.updateMapWhenValidatedBuild(newBuildingAdd, buildingAdd);
                    cc.log('=======================================G bi tru di khi xay: ' + ReducedTempResources.coin);
                    reduceUserResources(ReducedTempResources);
                    logReducedUserResources();
                    resetReducedTempResources();

                    //reset
                    buildingAdd = null;
                    newBuildingAdd = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI XAY=======================================");
                    showPopupNotEnoughG('server_denied_build');
                    //reset
                    buildingAdd = null;
                    newBuildingAdd = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.UPGRADE_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN UPGRADE tu SERVER=======================================");

                    buildingUpgrade.setStatus('upgrade');
                    cc.log(buildingUpgrade._status);
                    buildingUpgrade.startTime = getCurrentServerTime();
                    cc.log(buildingUpgrade.startTime);
                    var cur = (getCurrentServerTime() - buildingUpgrade.startTime)/1000;
                    var max = config.building[buildingUpgrade._name][buildingUpgrade._level+1].buildTime;
                    buildingUpgrade.addTimeBar(cur, max);
                    buildingUpgrade.countDown(cur, max);
                    buildingUpgrade.buildTime = max;

                    for(var item in contructionList){
                        if(contructionList[item]._id == buildingUpgrade._id){
                            contructionList[item].status = 'upgrade';
                            contructionList[item].startTime = buildingUpgrade.startTime;
                            contructionList[item].buildTime = max;
                            break;
                        }
                    }

                    updateBuilderNumber();
                    reduceUserResources(ReducedTempResources);
                    resetReducedTempResources();

                    //reset
                    buildingUpgrade = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI UPGRADE=======================================");
                    showPopupNotEnoughG('server_denied_upgrade');
                    //reset
                    buildingUpgrade = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.QUICK_FINISH:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN QUICK FINISH tu SERVER=======================================");
                    reduceUserResources(ReducedTempResources);
                    logReducedUserResources();
                    if(buildingQuickFinish._status == 'pending'){
                        buildingQuickFinish.buildComplete(true);
                    }else if(buildingQuickFinish._status == 'upgrade'){
                        buildingQuickFinish.upgradeComplete(true);
                    }
                    //reset
                    buildingQuickFinish = null;
                    resetReducedTempResources();
                }else {
                    cc.log("=======================================SERVER TU CHOI QUICK FINISH=======================================");
                    showPopupNotEnoughG('server_denied_quick_finish');
                    //reset
                    buildingQuickFinish = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.CANCEL_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN CANCEL tu SERVER=======================================");
                    if (buildingCancel._status == 'upgrade') buildingCancel.cancelUpgrade();
                    else if (buildingCancel._status == 'pending') buildingCancel.cancelBuild();
                    //reset
                    buildingCancel = null;
                    resetReducedTempResources();
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL=======================================");
                    showPopupNotEnoughG('server_denied_cancel');
                    //reset
                    buildingCancel = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.REMOVE_OBSTACLE:
                if(packet.validate) {

                }else {
                    cc.log("=======================================SERVER TU CHOI REMOVE OBSTACLE=======================================");
                    showPopupNotEnoughG('server_denied_remove_obstacle');
                }
                break;
            case gv.CMD.GET_SERVER_TIME:
                requestedServerTime++;
                time.DeltaTime = getCurrentClientTime() - packet.currentServerTime;
                //updateTimeFlag = true;
                //cc.log("DeltaTime lan thu " + requestedServerTime + " nhan tu SERVER: " + time.DeltaTime + " ms");
                break;
            case gv.CMD.ADD_RESOURCE:
                if(packet.validate) {
                    cc.log("=======================================XAC NHAN ADD RESOURCE tu SERVER=======================================");
                    increaseUserResources(ReducedTempResources);
                    resetReducedTempResources();
                }else {
                    cc.log("=======================================SERVER TU CHOI ADD RESOURCE tu SERVER=======================================");
                    showPopupNotEnoughG('server_denied_add_resources');
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.GET_TROOP_INFO:
                cc.log('================>', packet.message);
                cc.log("=======================================SERVER phan hoi TROOP INFO=======================================");
                this.sendGetBarrackQueueInfo();
                this.divideTroopToArmyCamp();
                break;
            case gv.CMD.GET_BARRACK_QUEUE_INFO:
                cc.log("=======================================SERVER phan hoi BARRACK QUEUE INFO=======================================");
                //Cap nhat lai population cua linh sau khi kiem tra barrack queue info --> cai tien: chi can yeu cau population
                //this.sendGetTroopInfo();
                break;
            case gv.CMD.TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN TRAIN TROOP tu SERVER=======================================");


                    cc.log("======================================= trainedBarrackId" + trainedBarrackId);
                    this.trainTroopCompleted(trainedTroopType);

                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_train_troop');

                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }
                break;
            case gv.CMD.CANCEL_TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN CANCEL TRAIN TROOP tu SERVER=======================================");


                    cc.log("======================================= trainedBarrackId" + trainedBarrackId);
                    this.canceledTrainTroop(trainedTroopType);

                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_cancel_train_troop');

                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }
                break;
            case gv.CMD.FINISH_TIME_TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN FINISH TIME TRAIN TROOP tu SERVER=======================================");
                    //this.createTroopAfterSVResponseSuccess("ARM_1", armyCampRefs[0], MAP._targetedObject);


                    cc.log("======================================= trainedBarrackId" + trainedBarrackId);
                    this.finishTimeTroopTrain(trainedTroopType);
                    troopInfo[trainedTroopType].population++;

                    //Cho linh chay ra


                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_finish_time_train_troop');

                    //reset
                    trainedBarrackId = null;
                    trainedTroopType = null;
                }
                break;
        }
    },

    createTroopAfterSVResponseSuccess: function(type, armyCamp, barrack) {
        var troop = this.createNewTroop(type, armyCamp);
        troop && troop.appear(barrack);
    },

    divideTroopToArmyCamp: function() {
        // cc.log(">>>>>>>>>>>>>>>>>: ", troopInfo.ARM_1.level + ' :<<<<<<<<<<<<<<<>>: ' + armyCampRefs[0]._name);
        var numAMC = armyCampRefs.length;
        var curAMCindex = 0;
        var capacitys = armyCampRefs.map(function(amc) {
            // cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: ', config.building.AMC_1[amc._level].capacity);
            return config.building.AMC_1[amc._level].capacity;
        });
        for(item in troopInfo) {
            var troopType = troopInfo[item];
            if (troopType.population > 0) {
                for (var i = 0; i < troopType.population; i++) {
                    this.createNewTroop_1(troopType.type, armyCampRefs[curAMCindex]);

                    curAMCindex += 1;
                    if (curAMCindex >= numAMC) curAMCindex = 0;
                }
            }
        }
    },

    createNewTroop_1: function(type, armyCamp) {
        switch (type) {
            case "ARM_1":
                var troop = new Warrior(armyCamp);
                break;
            case "ARM_2":
                var troop = new Archer(armyCamp);
                break;
            case "ARM_3":
                var troop = new Goblin(armyCamp);
                break;
            case "ARM_4":
                var troop = new Giant(armyCamp);
                break;
            default:
                break;
        }
        return troop;
    },

    finishTimeTroopTrain: function(troopType) {
        var here = barrackQueueList[trainedBarrackId];

        //if(TRAIN_POPUP._troopList[troopType]._amount > 0){
        TRAIN_POPUP._troopList[troopType]._amount--;
        TRAIN_POPUP._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        here._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");
        TRAIN_POPUP.enableItemDisplay();
        //Het icon trong item
        if(TRAIN_POPUP._troopList[troopType]._amount == 0){
            TRAIN_POPUP._amountItemInQueue--;
            here._amountItemInQueue--;
            TRAIN_POPUP._itemInQueue[troopType].setPosition(-1000, -1000);
            TRAIN_POPUP._troopList[troopType]._currentPosition = -1;
            //Het item trong queue
            if(TRAIN_POPUP._amountItemInQueue == 0){
                TRAIN_POPUP._timeBar.visible = false;
                cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
                TRAIN_POPUP._statusCountDown = false;
                return;
                //Con item trong queue
            }else{
                TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[troopType]._currentPosition);
                TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
            }
            //Con icon trong item
        }else{
            TRAIN_POPUP._itemInQueue[troopType].updateAmountSmall();
            TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
            TRAIN_POPUP._startTime = getCurrentServerTime();
            here._startTime = getCurrentServerTime();
            TRAIN_POPUP._isShowTimeBar = true;
            TRAIN_POPUP._statusCountDown = true;
            TRAIN_POPUP.countDown();
        }
        //}
    },


    trainTroopCompleted: function(troopType) {
        var here = barrackQueueList[trainedBarrackId];

        if(TRAIN_POPUP._troopList[troopType]._amount == 0) {
            TRAIN_POPUP._amountItemInQueue++;
            here._amountItemInQueue++;
            TRAIN_POPUP._troopList[troopType]._currentPosition = TRAIN_POPUP._amountItemInQueue - 1;

            //item dau tien va icon dau tien trong item
            if(TRAIN_POPUP._troopList[troopType]._currentPosition == 0 && TRAIN_POPUP._troopList[troopType]._amount == 0){
                TRAIN_POPUP._startTime = getCurrentServerTime();
                here._startTime = getCurrentServerTime();

                if(!TRAIN_POPUP._isShowTimeBar){
                    cc.log("================================ SHOW TIME BAR sau khi train troop ================================");
                    TRAIN_POPUP.showTimeBar();
                    TRAIN_POPUP._isShowTimeBar = true;
                    TRAIN_POPUP._statusCountDown = true;
                }else{
                    TRAIN_POPUP._statusCountDown = true;
                    if(TRAIN_POPUP._isShowTimeBar){
                        TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
                        TRAIN_POPUP.countDown();
                    }
                }
                TRAIN_POPUP._timeBar.visible = true;
            }

            TRAIN_POPUP._itemInQueue[troopType].setPosition(TRAIN_POPUP._positionsInQueue[TRAIN_POPUP._troopList[troopType]._currentPosition]);
        }
        TRAIN_POPUP._troopList[troopType]._amount++;
        TRAIN_POPUP._totalTroopCapacity += TRAIN_POPUP._troopList[troopType]._housingSpace;
        here._totalTroopCapacity += TRAIN_POPUP._troopList[troopType]._housingSpace;
        TRAIN_POPUP.disableItemDisplay();

        TRAIN_POPUP.updateAmount(TRAIN_POPUP._itemDisplay[troopType]);
        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");
    },


    canceledTrainTroop: function(troopType) {
        var here = barrackQueueList[trainedBarrackId];

        TRAIN_POPUP._troopList[troopType]._amount--;
        TRAIN_POPUP._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        here._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        if(TRAIN_POPUP._troopList[troopType]._amount == 0){
            TRAIN_POPUP._amountItemInQueue--;
            here._amountItemInQueue--;
            if(TRAIN_POPUP._amountItemInQueue == 0){
                TRAIN_POPUP._isShowTimeBar = false;
                if(TRAIN_POPUP._timeBar) TRAIN_POPUP._timeBar.visible = false;
                TRAIN_POPUP._statusCountDown = false;

                cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
            }else{
                TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[troopType]._currentPosition);
            }
            TRAIN_POPUP._itemInQueue[troopType].setPosition(-1000, -1000);
            TRAIN_POPUP._troopList[troopType]._currentPosition = -1;
        }
        TRAIN_POPUP._itemInQueue[troopType].updateAmountSmall();
        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");
        TRAIN_POPUP.enableItemDisplay();
    },


    sendGetUserInfo:function()
    {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendGetMapInfo:function()
    {
        cc.log("sendGetMapInfo");
        var pk = this.gameClient.getOutPacket(CmdSendMapInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendLoginRequest: function () {
        cc.log("sendLoginRequest");
        var pk = this.gameClient.getOutPacket(CmdSendLogin);
        pk.pack(this.sessionKey, gv.user.uuid);
        this.gameClient.sendPacket(pk);
    },
    setUserInfomation:function(packet){
        time.DeltaTime = getCurrentClientTime() - packet.serverTime;
        cc.log("DeltaTime ban dau nhan tu SERVER: " + time.DeltaTime + " ms");
        gv.user.id = packet.id;
        gv.user.name = packet.name;
        gv.user.exp = packet.exp;
        gv.user.coin = packet.coin;
        gv.user.gold = packet.gold;
        gv.user.elixir = packet.elixir;
        gv.user.darkElixir = packet.darkElixir;
        cc.log("========================================== Gold: " + gv.user.gold);
        cc.log("========================================== Elixir: " + gv.user.elixir);
        cc.log("========================================== Dark Elixir: " + gv.user.darkElixir);
        cc.log("========================================== Coin: " + gv.user.coin);
        gv.user.allBuilder = packet.builderNumber;
        gv.user.freeBuilder = gv.user.allBuilder - checkPendingBuilding();
        cc.log("========================================== All Builder: " + gv.user.allBuilder);
        cc.log("========================================== Free Builder: " + gv.user.freeBuilder);
    },
    sendMoveConstruction:function(id,x,y) {
        cc.log("sendMoveConstruction" +id+" "+x+ " "+y);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(id, x, y);
        this.gameClient.sendPacket(pk);
    },
    sendAddConstruction:function(type,x,y){
        cc.log("sendAddConstruction" +type+" "+x+ " "+y);
        var pk = this.gameClient.getOutPacket(CmdSendAddConstruction);
        pk.pack(type, x, y);
        this.gameClient.sendPacket(pk);
    },
    sendRequestAddConstruction: function(newBuilding, building){
        this.sendAddConstruction(building.name, newBuilding._posX, newBuilding._posY);
        buildingAdd = building;
        newBuildingAdd = newBuilding;
        cc.log("=======================================SEND REQUEST ADD CONSTRUCTION=======================================" + building._id);
    },
    sendUpgradeConstruction:function(id){
        cc.log("sendUpgradeConstruction" +id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST UPGRADE CONSTRUCTION=======================================" + id);
    },
    sendRequestUpgradeConstruction:function(building){
        NETWORK.sendUpgradeConstruction(building._id);
        buildingUpgrade = building;
    },

    //Finish build or Finish upgrade
    sendFinishTimeConstruction:function(id){
        cc.log("sendTimeFinishConstruction: " +id);
        var pk = this.gameClient.getOutPacket(CmdSendFinishTimeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST FINISH TIME CONSTRUCTION=======================================");
    },

    //Quick Finish
    sendQuickFinish:function(id){
        var pk = this.gameClient.getOutPacket(CmdSendQuickFinish);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST QUICK FINISH======================================= " + id);
    },

    //Cancel
    sendCancel:function(id){
        var pk = this.gameClient.getOutPacket(CmdSendCancelConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST CANCEL CONSTRUCTION=======================================" +id);
    },

    sendGetServerTime:function(){
        var pk = this.gameClient.getOutPacket(CmdGetServerTime);
        pk.pack();
        this.gameClient.sendPacket(pk);
        //cc.log("=======================================SEND REQUEST GET SERVER TIME=======================================");
    },
    sendAddResource: function(gold, elixir, darkElixir, coin) {
        cc.log('Add Resource');
        var pk = this.gameClient.getOutPacket(CmdSendAddResource);
        pk.pack(gold, elixir, darkElixir, coin);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST ADD RESOURCE=======================================");
    },
    sendGetTroopInfo: function() {
        var pk = this.gameClient.getOutPacket(CmdSendGetTroopInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GET TROOP INFO==========================================');
    },
    sendResearchTroop: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroop);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP==========================================');
    },
    sendResearchComplete: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroopComplete);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP COMPLETE====================================');
    },
    sendResearchQuickFinish: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroopQuickFinish);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP QUICK FINISH====================================');
    },
    sendGetBarrackQueueInfo: function() {
        var pk = this.gameClient.getOutPacket(CmdSendGetBarrackQueueInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GET BARRACK QUEUE INFO==========================================');
    },

    sendTrainTroop: function(idBarrack, typeTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendTrainTroop);
        pk.pack(idBarrack, typeTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND TRAIN TROOP==========================================');
    },

    sendCancelTrainTroop: function(idBarrack, typeTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendCancelTrainTroop);
        pk.pack(idBarrack, typeTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND CANCEL TRAIN TROOP==========================================');
    },

    sendFinishTimeTrainTroop: function(idBarrack, typeTroop, remainTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendFinishTimeTrainTroop);
        pk.pack(idBarrack, typeTroop, remainTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND FINISH TIME TRAIN TROOP==========================================');
    }
});
