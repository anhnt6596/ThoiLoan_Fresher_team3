/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.GET_MAP_INFO = 2001;
gv.CMD.TEST = 3001;

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
)
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
)
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
)

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
            this.putString(uuid);
            this.updateSize();
        }
    }
)

//CmdSendMove = fr.OutPacket.extend(
//    {
//        ctor:function()
//        {
//            this._super();
//            this.initData(100);
//            this.setCmdId(gv.CMD.MOVE);
//        },
//        pack:function(direction){
//            this.packHeader();
//            this.putShort(direction);
//            this.updateSize();
//        }
//    }
//)

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
)

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

// var contructionList = contructionList || [];

testnetwork.packetMap[gv.CMD.GET_MAP_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
            // contructionList = [];
        },
        readData:function(){
            this.n = this.getInt();
            console.log("Co tat ca "+this.n+" nha/n");
            for (var i=0;i<this.n;i++){
                this._id = this.getInt().toString();
                //cc.log("nha so: "+ this.id);
                this.name = this.getString();
                //this.name = "STO_1";
                cc.log(", type: "+ this.name);
                this.posX = this.getInt();
                cc.log(", posX: "+ this.posX);
                this.posY = this.getInt();
                cc.log(", posY: "+ this.posY);
                this.level = this.getInt();
                cc.log(", level: "+ this.level);
                this.timebuild = this.getInt();
                cc.log(", timebuild: "+ this.timebuild);
                this.status = this.getString();
                cc.log(", status: "+ this.status);
                console.log("/n");
                this.width =3;
                this.height =3;
                contructionList.push(this);

            }
           //console.log(contructionList);
            this.n_obs = this.getInt();
            cc.log("size"+ this.n_obs);
            console.log("Co tat ca "+this.n_obs+" obs");
            for ( var j=0;j<this.n_obs;j++) {
                this.idObs = this.getInt();
                cc.log("obs so: " + this.idObs);
                this.typeObs = this.getString();
                cc.log(", type: " + this.typeObs);
                this.posXObs = this.getInt();
                cc.log(", posX: " + this.posXObs);
                this.posYObs = this.getInt();
                cc.log(", posY: " + this.posYObs);

                console.log("/n");
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
            cc.log("id = "+this.id);
            this.name = this.getString();
            cc.log("name = "+this.name);
            this.exp = this.getLong();
            cc.log("exp = "+this.exp);
            this.coin = this.getInt();
            cc.log("coin = "+this.coin);
            this.gold = this.getInt();
            cc.log("gold = "+this.gold);
            this.elixir = this.getInt();
            cc.log("elixir = "+this.elixir);
            this.darkElixir = this.getInt();
            cc.log("darkElixir = "+this.darkElixir);
            this.builderNumber = this.getInt();
            cc.log("builderNumber = "+this.builderNumber);
        }
    }
);

testnetwork.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
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




