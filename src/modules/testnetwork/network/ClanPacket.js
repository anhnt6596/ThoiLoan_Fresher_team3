gv.CMD = gv.CMD ||{};
var VALIDATE = 1;

gv.CMD.CREATE_GUILD = 5001;
gv.CMD.ADD_MEMBER = 5002;
gv.CMD.REMOVE_MEMBER = 5003;
gv.CMD.ADD_REQUEST_MEMBER = 5004;    
gv.CMD.DENY_REQUEST_MEMBER = 5005;
gv.CMD.SEARCH_GUILD_INFO = 5006;    
gv.CMD.GET_GUILD_INFO = 5007;
gv.CMD.EDIT_GUILD_INFO = 5008;
gv.CMD.SET_GUILD_POSITION = 5009;
gv.CMD.GET_GUILD_LISTMEMBER_INFO = 5010;


testnetwork = testnetwork||{};

CmdGetGuildListMemberInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_GUILD_LISTMEMBER_INFO);
            cc.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")
        },
        pack:function(id){
            this.packHeader();

            this.putInt(id);

            this.updateSize();
        }
    }
);

CmdSendCreateGuild = fr.OutPacket.extend(
    {

        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.CREATE_GUILD);
        },
        pack:function(data){
            cc.log("aaaaaaaaaaaaaaaaaaaaa   " + data.status);
            this.packHeader();
            
            this.putString(data.name);
            this.putInt(data.iconType);
            this.putShort(data.status);
            this.putInt(data.requireTroophy);
            this.putString(data.description);

            this.updateSize();
        }
    }
);

CmdSendAddRequestMember = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_REQUEST_MEMBER);
        },
        pack:function(id){
            this.packHeader();

            this.putInt(id);

            this.updateSize();
        }
    }
);

CmdSendAddMember = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.ADD_MEMBER);
        },
        pack:function(id){
            this.packHeader();

            this.putInt(id);

            this.updateSize();
        }
    }
);
CmdSendGetGuildInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.GET_GUILD_INFO);
        },
        pack:function(id){
            this.packHeader();
            //id_guild
            cc.log("a>>>>>>>>>>>>>>>>>>>>ID: " + id)
            this.putInt(id);

            this.updateSize();
        }
    }
);
CmdSendEditGuildInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.EDIT_GUILD_INFO);
        },
        pack:function(id, name, logo_id, status, require_danh_vong, description){
            this.packHeader();

            this.putInt(id);
            this.putString(name);
            this.putInt(logo_id);
            this.putShort(status);
            this.putInt(require_danh_vong);
            this.putString(description);

            this.updateSize();
        }
    }
);


testnetwork.packetMap[gv.CMD.CREATE_GUILD] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.validate  = this.getShort();
            if (this.validate){
                this.id  = this.getInt();
                this.name = this.getString();
                this.iconType = this.getInt();
                this.status = this.getShort();
                this.level  = this.getInt();
                this.troophy = this.getInt();
                this.troophyRequire = this.getInt();
                this.description = this.getString();
            }
            else {
                
            }
        }
    }
);
testnetwork.packetMap[gv.CMD.ADD_MEMBER] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.type  = this.getShort();
            if (this.type === VALIDATE){
                this.validate = this.getShort();
            }
            else {//gui cho tat ca moi nguoi khac trong guild
                this.id = this.getInt();
                this.name = this.getString();
            }
        }
    }
);
testnetwork.packetMap[gv.CMD.GET_GUILD_INFO] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.id  = this.getInt();
            this.name = this.getString();
            this.iconType = this.getInt();
            this.status = this.getShort();
            this.level  = this.getInt();
            this.troophy  = this.getInt();
            this.troophyRequire  = this.getInt();
            this.member = this.getInt();
            this.description = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.EDIT_GUILD_INFO] = fr.InPacket.extend(
    {
        ctor: function()
        {
            this._super();
        },
        readData: function(){
            
            this.validate = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.GET_GUILD_LISTMEMBER_INFO] = fr.InPacket.extend(
    {
        ctor: function()
        {
            this._super();
        },
        readData: function(){
            var length = this.getInt();
            this.listUser = [];
            for (var i = 0; i < length; i ++) {
                var id = this.getInt();
                var name = this.getString();
                var donateTroop = this.getShort();
                var requestTroop = this.getShort();
                var position = this.getShort();
                var troophy = this.getInt();
                this.listUser.push({ id, name, donateTroop, requestTroop, position, troophy });
            }
        }
    }
);
