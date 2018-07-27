/**
 * Created by KienVN on 10/2/2017.
 */
//var count =0;
var gv = gv||{};
var testnetwork = testnetwork||{};
count =0;
var requestedServerTime = 0;

//Add Construction
var buildingAdd = null;
var newBuildingAdd = null;

//Upgrade Construction
var buildingUpgrade = null;

//Quick Finish Construction
var buildingQuickFinish = null;

//Cancel Construction
var buildingCancel = null;


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
                break;
            case gv.CMD.GET_MAP_INFO:
                fr.getCurrentScreen().onFinishGameInfo();
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
                    _.extend(LastReduceResources, ReducedTempResources);
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
                    //var listener = {contentBuyG:"Please check your connection to server!"};
                    var listener = {contentBuyG:"Please try again later!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Server denied to build this construction", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                    //reset
                    buildingAdd = null;
                    newBuildingAdd = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.UPGRADE_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN UPGRADE tu SERVER=======================================");
                    _.extend(LastReduceResources, ReducedTempResources);

                    buildingUpgrade.setStatus('upgrade');
                    cc.log(buildingUpgrade._status);
                    buildingUpgrade.startTime = getCurrentServerTime();
                    cc.log(buildingUpgrade.startTime);
                    var cur = (getCurrentServerTime() - buildingUpgrade.startTime)/1000;
                    var max = config.building[buildingUpgrade.name][buildingUpgrade.level+1].buildTime;
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
                    logReducedUserResources();
                    resetReducedTempResources();

                    //reset
                    buildingUpgrade = null;
                }else {
                    cc.log("=======================================SERVER TU CHOI UPGRADE=======================================");
                    var listener = {contentBuyG:"Please try again later!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Server denied to upgrade this construction", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
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
                    var listener = {contentBuyG:"Please try again later!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Server denied to quick finish this construction", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                    //reset
                    buildingQuickFinish = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.CANCLE_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN CANCEL tu SERVER=======================================");
                    if (buildingCancel._status == 'upgrade') buildingCancel.cancelUpgrade();
                    else if (buildingCancel._status == 'pending') buildingCancel.cancelBuild();
                    //reset
                    buildingCancel = null;
                    resetReducedTempResources();
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL=======================================");
                    var listener = {contentBuyG:"Please try again later!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Server denied to cancel this construction", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                    //reset
                    buildingCancel = null;
                    resetReducedTempResources();
                }
                break;
            case gv.CMD.REMOVE_OBSTACLE:
                if(packet.validate) {

                }else {
                    cc.log("=======================================SERVER TU CHOI REMOVE OBSTACLE=======================================");
                    var listener = {contentBuyG:"Please try again later!"};
                    var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Server denied to remove this obstacle", true, listener);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
                break;
            case gv.CMD.GET_SERVER_TIME:
                requestedServerTime++;
                DeltaTime = getCurrentClientTime() - packet.currentServerTime;
                //updateTimeFlag = true;
                cc.log("DeltaTime lan thu " + requestedServerTime + " nhan tu SERVER: " + DeltaTime + " ms");
                break;
        }
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
        DeltaTime = getCurrentClientTime() - packet.serverTime;
        cc.log("DeltaTime ban dau nhan tu SERVER: " + DeltaTime + " ms");
        gv.user.id = packet.id;
        gv.user.name = packet.name;
        gv.user.exp = packet.exp;
        gv.user.coin = packet.coin;
        gv.user.gold = packet.gold;
        gv.user.elixir = packet.elixir;
        gv.user.darkElixir = packet.darkElixir;
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
        this.sendAddConstruction(building.name, building.posX, building.posY);
        cc.log("=======================================SEND REQUEST ADD CONSTRUCTION=======================================");
        buildingAdd = building;
        newBuildingAdd = newBuilding;
    },
    sendUpgradeConstruction:function(id){
        cc.log("sendUpgradeConstruction" +id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendRequestUpgradeConstruction:function(building){
        NETWORK.sendUpgradeConstruction(building._id);
        buildingUpgrade = building;
        cc.log("=======================================SEND REQUEST UPGRADE CONSTRUCTION=======================================");
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
        cc.log("=======================================SEND REQUEST QUICK FINISH=======================================");
    },

    //Cancel
    sendCancel:function(id){
        var pk = this.gameClient.getOutPacket(CmdSendCancelConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND CANCEL CONSTRUCTION=======================================");
    },

    sendGetServerTime:function(){
        var pk = this.gameClient.getOutPacket(CmdGetServerTime);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log("=======================================CLIENT GUI YEU CAU GET SERVER TIME=======================================");
    },
    sendAddResource: function(gold, elixir, darkElixir, coin) {
        cc.log('Add Resource');
        var pk = this.gameClient.getOutPacket(CmdSendAddResource);
        pk.pack(gold, elixir, darkElixir, coin);
        this.gameClient.sendPacket(pk);
    }
});
