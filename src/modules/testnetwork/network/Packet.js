/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;

gv.CMD.GET_MAP_INFO = 2001;
gv.CMD.MOVE_CONSTRUCTION =2002;
gv.CMD.ADD_CONSTRUCTION = 2003;
gv.CMD.UPGRADE_CONSTRUCTION = 2004;
gv.CMD.CANCEL_CONSTRUCTION = 2005;
gv.CMD.REMOVE_OBSTACLE = 2006;
gv.CMD.DO_HARVEST = 2008;
gv.CMD.MOVE_MULTI_WALL = 2009;
gv.CMD.UPGRADE_MULTI_WALL = 2010;


gv.CMD.GET_SERVER_TIME = 2100;
gv.CMD.FINISH_TIME_CONSTRUCTION = 2101;
gv.CMD.QUICK_FINISH = 2102;
gv.CMD.ADD_RESOURCE = 1500;

gv.CMD.TEST = 3001;

gv.CMD.GET_TROOP_INFO = 4001;
gv.CMD.RESEARCH_TROOP = 4002;
gv.CMD.RESEARCH_TROOP_COMPLETE = 4003;
gv.CMD.RESEARCH_TROOP_QUICK_COMPLETE = 4004;

gv.CMD.GET_BARRACK_QUEUE_INFO = 7001;
gv.CMD.TRAIN_TROOP = 7002;
gv.CMD.CANCEL_TRAIN_TROOP = 7003;
gv.CMD.QUICK_FINISH_TRAIN_TROOP = 7004;
gv.CMD.FINISH_TIME_TRAIN_TROOP = 7005;

gv.CMD.NEW_MESSAGE = 8001;
gv.CMD.GIVE_TROOP_GUILD = 8002;
gv.CMD.GET_INTERACTION_GUILD = 8003;
gv.CMD.ONLINE_MESSAGE = 8004



testnetwork = testnetwork||{};
testnetwork.packetMap = {};

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
);
CmdSendUserInfo = fr.OutPacket.extend(
    {

        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function(){
            //username = gv.user.username;
            //password = gv.user.password;
            this.packHeader();
            //this.putString(username);
            //this.putString(password);
            this.updateSize();
        }
    }
);
CmdSendMapInfo = fr.OutPacket.extend(
    {

        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_MAP_INFO);
        },
        pack:function(){
            //username = gv.user.username;
            //password = gv.user.password;
            this.packHeader();
            //this.putString(username);
            //this.putString(password);
            this.updateSize();
        }
    }
);

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(sessionKey,uuid){

            this.packHeader();
            this.putString(sessionKey);
            this.putInt(uuid);
            this.updateSize();
        }
    }
);

CmdSendMove = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MOVE_CONSTRUCTION);

        },
        pack:function(id, x, y){
            this.packHeader();
            this.putInt(parseInt(id));
            this.putInt(x);
            this.putInt(y);
            //this.putInt(22);
            //this.putInt(27);
            this.updateSize();
        }
    }
);

CmdSendMoveMultiWall = fr.OutPacket.extend({
    ctor:function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.MOVE_MULTI_WALL);

    },
    pack:function(list){
        this.packHeader();
        this.putInt(list.length);
        for (var i = 0; i < list.length; i++) {
            this.putInt(list[i]._id);
            this.putInt(list[i]._posX);
            this.putInt(list[i]._posY);
        }
        //this.putInt(22);
        //this.putInt(27);
        this.updateSize();
    }
});

CmdSendAddConstruction = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_CONSTRUCTION);
        },
        pack:function(type, x, y){
            this.packHeader();
            this.putString(type);
            this.putInt(x);
            this.putInt(y);
            this.updateSize();
        }
    }
);

CmdSendUpgradeConstruction = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UPGRADE_CONSTRUCTION);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);

CmdSendUpgradeMultiWall = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.UPGRADE_MULTI_WALL);
        },
        pack:function(list){
            this.packHeader();
            this.putInt(list.length);
            for (var i = 0; i < list.length; i++) {
                this.putInt(list[i]._id);
            }
            this.updateSize();
        }
    }
);

CmdSendFinishTimeConstruction = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.FINISH_TIME_CONSTRUCTION);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);


CmdSendQuickFinish = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.QUICK_FINISH);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);


CmdSendCancelConstruction = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CANCEL_CONSTRUCTION);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);

CmdSendRemoveObstacle = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.REMOVE_OBSTACLE);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);


CmdGetServerTime = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_SERVER_TIME);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }

    }
);


CmdSendTest = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.TEST);
        },
        pack:function(number){
            this.packHeader();
            this.putInt(number);
            this.updateSize();
        }
    }
);

CmdSendAddResource = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.ADD_RESOURCE);
    },
    pack: function(gold, elixir, darkElixir, coin) {
        this.packHeader();
        this.putInt(gold);
        this.putInt(elixir);
        this.putInt(darkElixir);
        this.putInt(coin);
        this.updateSize();
    }
});

CmdSendGetTroopInfo = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_TROOP_INFO);
    },
    pack: function() {
        this.packHeader();
        this.updateSize();
    }
});

CmdSendResearchTroop = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.RESEARCH_TROOP);
    },
    pack: function(type) {
        this.packHeader();
        this.putString(type);
        this.updateSize();
    }
});

CmdSendResearchTroopComplete = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.RESEARCH_TROOP_COMPLETE);
    },
    pack: function(type) {
        this.packHeader();
        this.putString(type);
        this.updateSize();
    }
});
CmdSendResearchTroopQuickFinish = fr.OutPacket.extend({
    ctor: function() {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.RESEARCH_TROOP_QUICK_COMPLETE);
    },
    pack: function(type) {
        this.packHeader();
        this.putString(type);
        this.updateSize();
    }
});

CmdSendGetBarrackQueueInfo = fr.OutPacket.extend({
    ctor:function()
    {
        this._super();
        this.initData(100);
        this.setCmdId(gv.CMD.GET_BARRACK_QUEUE_INFO);
    },
    pack:function(){
        this.packHeader();
        this.updateSize();
    }
});

CmdSendTrainTroop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.TRAIN_TROOP);
        },
        pack:function(idBarrack, typeTroop){
            this.packHeader();
            this.putInt(idBarrack);
            this.putString(typeTroop);
            this.updateSize();
        }
    }
);

CmdSendCancelTrainTroop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CANCEL_TRAIN_TROOP);
        },
        pack:function(idBarrack, typeTroop){
            this.packHeader();
            this.putInt(idBarrack);
            this.putString(typeTroop);
            this.updateSize();
        }
    }
);

CmdSendQuickFinishTrainTroop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.QUICK_FINISH_TRAIN_TROOP);
        },
        pack:function(idBarrack){
            this.packHeader();
            this.putInt(idBarrack);
            this.updateSize();
        }
    }
);

CmdSendFinishTimeTrainTroop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.FINISH_TIME_TRAIN_TROOP);
        },
        pack:function(idBarrack, typeTroop, remainTroop){
            this.packHeader();
            this.putInt(idBarrack);
            this.putString(typeTroop);
            //So luong cua troop do con lai trong hang doi
            this.putInt(remainTroop);
            this.updateSize();
        }
    }
);
CmdSendDoHarvest = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.DO_HARVEST);
        },
        pack:function(id){
            this.packHeader();
            this.putInt(id);
            this.updateSize();
        }
    }
);


CmdSendNewMessage = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.NEW_MESSAGE);
        },
        pack:function(type, content){
            this.packHeader();
            this.putShort(type);
            this.putString(content);
            this.updateSize();
        }
    }
);


CmdSendGiveTroop = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GIVE_TROOP_GUILD);
        },
        pack:function(idUserGet, troopType, level){
            this.packHeader();
            this.putInt(idUserGet);
            this.putString(troopType);
            this.putShort(level);
            this.updateSize();
        }
    }
);


CmdSendGetInteractionGuild = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_INTERACTION_GUILD);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
);



/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){

        }
    }
);

var contructionList = contructionList || [];
var obstacleLists = obstacleLists || [];
testnetwork.packetMap[gv.CMD.GET_MAP_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
            contructionList = [];
            obstacleLists = [];
        },
        readData:function(){
            this.n = this.getInt();
            gv.user.largestId = this.n;
            cc.log("================================= LARGEST ID: "+ gv.user.largestId);
            for (var i=0;i<this.n;i++){
                this._id = this.getInt();
                this.name = this.getString();
                cc.log("========================name Nha: " + this.name);
                cc.log("_id: " + this._id);
                this.posX = this.getInt();
                cc.log("posX: " + this.posX);
                this.posY = this.getInt();
                cc.log("posY: " + this.posY);
                this.level = this.getInt();
                cc.log("Level: " + this.level);

                this.status = this.getString();
                cc.log("Status: " + this.status);
                this.startTime = this.getLong();
                cc.log("Start Time: " + this.startTime);

                if (config.building[this.name] && this.status!=="destroy") {
                    var contruction = {
                        _id: this._id,
                        name: this.name,
                        level: this.level,
                        posX: this.posX,
                        posY: this.posY,
                        status: this.status,
                        startTime: this.startTime,
                        buildTime: this.level > 0 ? config.building[this.name][this.level].buildTime : 0,
                        width: config.building[this.name][1].width,
                        height: config.building[this.name][1].height,
                    };
                    contructionList.push(contruction);
                }

            }
            //console.log(contructionList);
            this.n_obs = this.getInt();
            //cc.log("size"+ this.n_obs);
            console.log("Co tat ca "+this.n_obs+" obs");
            for ( var j=0;j<this.n_obs;j++) {
                this.idObs = this.getInt();
                //cc.log("obs so: " + this.idObs);
                this.typeObs = this.getString();
                //cc.log(", type: " + this.typeObs);
                this.posXObs = this.getInt();
                //cc.log(", posX: " + this.posXObs);
                this.posYObs = this.getInt();
                //cc.log(", posY: " + this.posYObs);

                //console.log("/n");
                var obstacle = {
                    _id: this.idObs,
                    name: this.typeObs,
                    posX: this.posXObs,
                    posY: this.posYObs,
                    width: config.obtacle[this.typeObs][1].width,
                    height: config.obtacle[this.typeObs][1].height,
                };
                obstacleLists.push(obstacle);
            }


        }
    }
);

testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.id = this.getInt();
            //cc.log("id = "+this.id);
            this.name = this.getString();
            //cc.log("name = "+this.name);
            this.exp = this.getLong();
            //cc.log("exp = "+this.exp);
            this.coin = this.getInt();
            //cc.log("coin = "+this.coin);
            this.gold = this.getInt();
            //cc.log("gold = "+this.gold);
            this.elixir = this.getInt();
            //cc.log("elixir = "+this.elixir);
            this.darkElixir = this.getInt();
            //cc.log("darkElixir = "+this.darkElixir);
            this.builderNumber = this.getInt();
            //cc.log("builderNumber = "+this.builderNumber);
            this.serverTime = this.getLong();
            //cc.log("server time: " + this.serverTime);

            this.is_in_guild = this.getBool();
            if (this.is_in_guild){
                this.id_guild = this.getInt();
                this.name_guild = this.getString();
                this.id_logo_guild = this.getInt();
                this.last_time_ask_for_troops = this.getLong();
                this.last_time_out_guild = this.getLong();
            }
            //get level troop
            //gv.user.troopLevel = {};
            //gv.user.troopLevel.ARM_1 = this.getShort();
            //gv.user.troopLevel.ARM_2 = this.getShort();
            //gv.user.troopLevel.ARM_3 = this.getShort();
            //gv.user.troopLevel.ARM_4 = this.getShort();
            //
            //cc.log("===================================================TROOP LEVEL: ARM_1: " + gv.user.troopLevel.ARM_1);
            //cc.log("===================================================TROOP LEVEL: ARM_2: " + gv.user.troopLevel.ARM_2);
            //cc.log("===================================================TROOP LEVEL: ARM_3: " + gv.user.troopLevel.ARM_3);
            //cc.log("===================================================TROOP LEVEL: ARM_4: " + gv.user.troopLevel.ARM_4);
        }
    }
);

testnetwork.packetMap[gv.CMD.MOVE_CONSTRUCTION] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);
testnetwork.packetMap[gv.CMD.ADD_CONSTRUCTION] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.UPGRADE_CONSTRUCTION] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.FINISH_TIME_CONSTRUCTION] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);


testnetwork.packetMap[gv.CMD.QUICK_FINISH] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.CANCEL_CONSTRUCTION] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.UPGRADE_MULTI_WALL] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.REMOVE_OBSTACLE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.GET_SERVER_TIME] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.currentServerTime  = this.getLong();
            cc.log("SERVER da phan hoi Current Server Time: " + this.currentServerTime);
        }
    }
);

testnetwork.packetMap[gv.CMD.ADD_RESOURCE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.TEST] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.number = this.getInt();
        }
    }
);

var troopInfo = troopInfo || [];

testnetwork.packetMap[gv.CMD.GET_TROOP_INFO] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData: function() {
        cc.log('receive TROOP_INFO');
        var size = this.getInt();
        //cc.log("so loai troop: "+size);
        for (var i = 1; i <= size; i ++) {
            var type = this.getString();
            var isUnlock = this.getShort();
            var level = this.getShort();
            var population = this.getShort();
            var timeStart = this.getLong();
            var status = this.getString();
            //cc.log('type = '+type );
            troopInfo[type] = {
                type: type,
                isUnlock: isUnlock,
                level: level,
                population: population,
                startTime: timeStart,                
                status: status,
                name: name.troop[type].vi
            };

        }
        for (var item in troopInfo) {

            var obj = troopInfo[item];
            if (obj.status===research_constant.status.busy){
                research_constant.status.now = obj.status;
                research_constant.troop = obj;
            }
            // cc.log('troopInfo.'+obj.type+'.level', troopInfo[item].level);
            // cc.log('troopInfo.'+obj.type+'.isUnlock', troopInfo[item].isUnlock);
            // cc.log('troopInfo.'+obj.type+'.population', troopInfo[item].population);
            // cc.log('troopInfo.'+obj.type+'.startTime', troopInfo[item].startTime);
            // cc.log('troopInfo.'+obj.type+'.status', troopInfo[item].status);
        }
    }
});

testnetwork.packetMap[gv.CMD.RESEARCH_TROOP] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData:function(){
        var validate = this.getShort();
        cc.log('===================RESEARCH===> ', validate);
    }
});

testnetwork.packetMap[gv.CMD.RESEARCH_TROOP_COMPLETE] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData:function(){
        var validate = this.getShort();
        cc.log('===================RESEARCH COMPLETE===> ', validate);
    }
});


barrackQueueList = [];
testnetwork.packetMap[gv.CMD.GET_BARRACK_QUEUE_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();

        },
        readData:function(){
            this.n = this.getInt();
            cc.log("================================= SO LUONG BARRACK QUEUE INFO: " + this.n);
            for (var i = 0; i < this.n; i++){
                cc.log("================================= BARRACK thu : " + (i+1));
                this.idBarrack = this.getInt();
                this.barrackLevel = this.getInt();
                this.startTime = this.getLong();

                var barrackQueue = new BarrackQueue(this.idBarrack, this.barrackLevel, this.startTime);
                barrackQueue._isFirst = true;

                //Dat them 1 thuoc tinh flag cho Barrack de stop countdown luc barrack dc upgrade, neu barrack dang upgrade thi khong countdown
                if(getObjBuildingById(this.idBarrack)._status == 'upgrade'){
                    barrackQueue.flagCountDown = false;
                }else{
                    barrackQueue.flagCountDown = true;
                }

                this.m = this.getInt();
                cc.log("================================= SO LUONG TROOP: " + this.m);
                for (var j = 0; j < this.m; j++){
                    cc.log("================================= Troop thu : " + (j+1));
                    this.troopType = this.getString();
                    cc.log("================================= Troop name : " + this.troopType);
                    this.amount = this.getInt();
                    cc.log("================================= Troop amount : " + this.amount);
                    var troopInBarrack = new TroopInBarrack(this.troopType, this.amount);
                    barrackQueue._troopList.push(troopInBarrack);
                }

                barrackQueueList.push(barrackQueue);


                //Cho chạy ngầm từ đầu
                var barrackObj = getObjBuildingById(this.idBarrack);
                var totalCapacity = getTotalCapacityAMCs();
                cc.log("================================= totalCapacity: " + totalCapacity);
                var currentCapacity = getTotalCurrentTroopCapacity();
                cc.log("================================= currentCapacity: " + currentCapacity);

                if(currentCapacity >= totalCapacity){
                    cc.log("================================= Set  pauseOverCapacityFlag = TRUE");
                    temp.pauseOverCapacityFlag = true;
                }

                if(barrackQueue._troopList.length > 0) {
                    cc.log("================================= Barrack " + this.idBarrack + " chay COUNTDOWN");
                    var data = {train: true, barrack: barrackObj};
                    new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
                }
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.TRAIN_TROOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.CANCEL_TRAIN_TROOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.QUICK_FINISH_TRAIN_TROOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.FINISH_TIME_TRAIN_TROOP] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
            this.idBarrack = this.getInt();
            this.troopType = this.getString();
            //Neu server tra ve false thi phai gui lai get BarrackQueueInfo
        }
    }
);

testnetwork.packetMap[gv.CMD.NEW_MESSAGE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.typeResponse  = this.getShort();       //validate or toAll
            if(this.typeResponse == RESPONSE_VALIDATE){
                this.validateValue = this.getShort();
            }else if(this.typeResponse == RESPONSE_TO_ALL){
                this.messageType = this.getShort();
                cc.log("Loai message: " + this.messageType);
                this.idUserSend = this.getInt();
                cc.log("Id sender: " + this.idUserSend);
                this.usernameSend = this.getString();
                cc.log("Username sender: " + this.usernameSend);
                this.contentMessage = this.getString();
                cc.log("Content Message: " + this.contentMessage);
                this.currentCapacityTroop = this.getInt();
                cc.log("Current Capacity Troop: " + this.currentCapacityTroop);
                this.guildCapacityAtTime = this.getInt();
                cc.log("Guild Capacity At Time: " + this.guildCapacityAtTime);
            }
        }
    }
);

testnetwork.packetMap[gv.CMD.GIVE_TROOP_GUILD] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.typeResponse  = this.getShort();                   //validate or toAll
            if(this.typeResponse == RESPONSE_VALIDATE){
                this.validateValue = this.getShort();
            }else if(this.typeResponse == RESPONSE_TO_ALL){
                this.idUserGet = this.getInt();
                //this.capacityGet = this.getShort();
                this.troopType = this.getString();
                this.levelTroop = this.getInt();
                this.idUserGive = this.getInt();
            }
        }
    }
);

var troopGuildList = [];
var messageList = [];
var memberListOnline = [];
var userGotList = {};

testnetwork.packetMap[gv.CMD.GET_INTERACTION_GUILD] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            //this.lastRequestTroopTimeStamp = this.getLong();
            //gv.user.lastRequestTroopTimeStamp = this.lastRequestTroopTimeStamp;
            //cc.log("=============== Last Request Troop Time Stamp: " + this.lastRequestTroopTimeStamp);

            this.sizeTroopGuildList = this.getInt();
            cc.log("=============== Troop Guild List Size: " + this.sizeTroopGuildList);

            for(var i = 0; i < this.sizeTroopGuildList; i++) {
                cc.log("=============== Troop thu " + (i+1));
                this.typeTroop = this.getString();
                cc.log("=============== Type Troop: " + this.typeTroop);
                this.levelTroop = this.getShort();
                cc.log("=============== Level Troop: " + this.levelTroop);

                troopGuildList[i] = {typeTroop: this.typeTroop, level: this.levelTroop};
            }

            this.sizeMessageList = this.getInt();
            cc.log("=============== Message List Size: " + this.sizeMessageList);

            for(var j = 0; j < this.sizeMessageList; j++) {
                cc.log("=============== Message thu " + (j+1));
                this.typeMessage = this.getShort();
                cc.log("=============== Type Message: " + this.typeMessage);
                this.id_user = this.getInt();
                cc.log("=============== User ID send: " + this.id_user);

                this.usernameSend = this.getString();
                cc.log("=============== Username Sender: " + this.usernameSend);

                this.content = this.getString();
                cc.log("=============== Message Content: " + this.content);

                this.timeStamp = this.getLong();
                cc.log("=============== Message timeStamp: " + this.timeStamp);

                this.currentCapacityTroop = this.getInt();
                cc.log("Current Capacity Troop: " + this.currentCapacityTroop);

                this.guildCapacityAtTime = this.getInt();
                cc.log("Guild Capacity At Time: " + this.guildCapacityAtTime);

                messageList[j] = {
                    typeMessage: this.typeMessage,
                    userId: this.id_user,
                    usernameSend: this.usernameSend,
                    content: this.content,
                    timeStamp: this.timeStamp,
                    currentCapacityGot: this.currentCapacityTroop,
                    guildCapacityAtTime: this.guildCapacityAtTime
                };
            }



            this.sizeMemberList = this.getInt();
            cc.log("=============== Message List Size: " + this.sizeMemberList);

            for(var k = 0; k < this.sizeMemberList; k++) {
                cc.log("=============== Member thu " + (k+1));
                this.idUser = this.getInt();
                cc.log("=============== User ID: " + this.idUser);

                this.username = this.getString();
                cc.log("=============== Username: " + this.username);

                this.valueOnline = this.getShort();
                cc.log("=============== Value online: " + this.valueOnline);

                memberListOnline[k] = {idUser: this.idUser, username: this.username, valueOnline: this.valueOnline};
            }


            this.sizeUserGotList = this.getInt();
            cc.log("=============== User Got List Size: " + this.sizeUserGotList);

            for(var d = 0; d < this.sizeUserGotList; d++) {
                cc.log("=============== User Got thu " + (d+1));
                this.idUserGot = this.getInt();
                cc.log("=============== User Got ID: " + this.idUserGot);
                this.amountGot = this.getInt();
                cc.log("=============== Amount Got: " + this.amountGot);

                userGotList[this.idUserGot] = this.amountGot;
            }

        }
    }
);

testnetwork.packetMap[gv.CMD.ONLINE_MESSAGE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.userOnline  = this.getInt();
            cc.log("=================== User Online: " + this.userOnline);
            this.valueOnline = this.getShort();
            cc.log("=================== Value Online: " + this.valueOnline);
        }
    }
);