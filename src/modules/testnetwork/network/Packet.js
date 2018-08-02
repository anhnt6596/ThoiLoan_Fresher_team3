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
gv.CMD.CANCLE_CONSTRUCTION = 2005;
gv.CMD.REMOVE_OBSTACLE = 2006;

gv.CMD.GET_SERVER_TIME = 2100;
gv.CMD.FINISH_TIME_CONSTRUCTION = 2101;
gv.CMD.QUICK_FINISH = 2102;
gv.CMD.ADD_RESOURCE = 1500;

gv.CMD.TEST = 3001;

gv.CMD.GET_TROOP_INFO = 4001;
gv.CMD.RESEARCH_TROOP = 4002;

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
            this.setCmdId(gv.CMD.CANCLE_CONSTRUCTION);
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
                        buildTime: config.building[this.name][this.level].buildTime,
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


testnetwork.packetMap[gv.CMD.CANCLE_CONSTRUCTION] = fr.InPacket.extend(
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
            cc.log("SERVER da phan hoi Current Server Time");
        },
        readData:function(){
            this.currentServerTime  = this.getLong();
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
        for (var i = 1; i <= size; i ++) {
            var type = this.getString();
            var isUnlock = this.getShort();
            var level = this.getShort();
            var population = this.getShort();
            var status = this.getString();
            var timeStart = this.getLong();
            var numberOnQueue = this.getShort();
            troopInfo[type] = {
                type: type,
                isUnlock: isUnlock,
                level: level,
                population: population,
                status: status,
                timeStart: timeStart,
                numberOnQueue: numberOnQueue
            };
        }
        cc.log('troopInfo.ARM_1.level', troopInfo.ARM_1.level)
        cc.log('troopInfo.ARM_1.isUnlock', troopInfo.ARM_1.isUnlock)
        cc.log('troopInfo.ARM_1.population', troopInfo.ARM_1.population)
        cc.log('troopInfo.ARM_1.status', troopInfo.ARM_1.status)
        cc.log('troopInfo.ARM_1.timeStart', troopInfo.ARM_1.timeStart)
        cc.log('troopInfo.ARM_1.numberOnQueue', troopInfo.ARM_1.numberOnQueue)
    }
});

testnetwork.packetMap[gv.CMD.RESEARCH_TROOP] = fr.InPacket.extend({
    ctor: function() {
        this._super();
    },
    readData:function(){
        var validate = this.getShort();
        cc.log('======================> ', validate);
    }
});
