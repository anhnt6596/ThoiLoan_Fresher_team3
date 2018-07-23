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
                break;
            case gv.CMD.GET_MAP_INFO:
                fr.getCurrentScreen().onFinishGameInfo();
                break;
            case gv.CMD.MOVE_CONSTRUCTION:
                //short packet.validate //success=1; false=0;
                if (packet.validate) {
                    cc.log("VI TRI DA DC CAP NHAT");

                }
                else {
                    cc.log("VI TRI DA CO NHA O");
                }
                break;
            case gv.CMD.ADD_CONSTRUCTION:
                //short packet.validate //success=1; false=0;
                if (packet.validate) {
                    cc.log("XAC NHAN XAY tu SERVER");
                }else {
                    contructionList = contructionList.pop();
                    objectRefs = objectRefs.pop();
                    MAP.createLogicArray(contructionList, {});
                    //Khoi phuc tien cho user (Can xet them T.H server chua kip phan hoi FALSE thi user da request xay tiep)
                    increaseUserResources(LastReduceResources);

                    //Cap nhat lai map

                    cc.log("SERVER TU CHOI XAY và CLIENT da CAP NHAT lai nha CHUA duoc xay");
                }
                break;
            case gv.CMD.UPGRADE_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("XAC NHAN UPGRADE tu SERVER");
                }else {
                    cc.log("SERVER TU CHOI UPGRADE");
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
        gv.user.id = packet.id;
        gv.user.name = packet.name;
        gv.user.exp = packet.exp;
        gv.user.coin = packet.coin;
        gv.user.gold = packet.gold;
        gv.user.elixir = packet.elixir;
        gv.user.darkElixir = packet.darkElixir;
        gv.user.builderNumber = packet.builderNumber;
        DeltaTime = getCurrentClientTime() - packet.serverTime;
        cc.log("DeltaTime ban dau nhan tu SERVER: " + DeltaTime + " ms");

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
    sendUpgradeConstruction:function(id){
        cc.log("sendUpgradeConstruction" +id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendRequestUpgradeConstruction:function(building, reducedUserResources){
        NETWORK.sendUpgradeConstruction(building._id);
        cc.log("=======================================SEND REQUEST UPGRADE CONSTRUCTION=======================================");
        reduceUserResources(reducedUserResources);
        MAP.logReducedUserResources();
        _.extend(LastReduceResources, reducedUserResources);
        MAP.resetReducedTempResources();


        building.setStatus('upgrade');
        building.startTime = getCurrentServerTime();
        var cur = (getCurrentServerTime() - building.startTime)/1000;
        var max = config.building[building.name][building.level+1].buildTime;
        building.addTimeBar(cur, max);
        building.countDown(cur, max);
        building.buildTime = max;
        //cc.log(building.buildTime);
        for(var item in contructionList){
            if(contructionList[item]._id == building._id){
                contructionList[item].status = 'upgrade';
                contructionList[item].startTime = building.startTime;
                contructionList[item].buildTime = max;
                return;
            }
        }
    },
    //Finish build or Finish upgrade
    sendFinishTimeConstruction:function(id){
        cc.log("sendTimeFinishConstruction: " +id);
        var pk = this.gameClient.getOutPacket(CmdSendFinishTimeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
    },
    sendGetServerTime:function(){
        var pk = this.gameClient.getOutPacket(CmdGetServerTime);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log("CLIENT da gui yeu cau get Server Time");
    },
    sendAddResource: function(gold, elixir, darkElixir, coin) {
        cc.log('Add Resource');
        var pk = this.gameClient.getOutPacket(CmdSendAddResource);
        pk.pack(gold, elixir, darkElixir, coin);
        this.gameClient.sendPacket(pk);
    }
});
