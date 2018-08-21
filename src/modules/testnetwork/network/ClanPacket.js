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
gv.CMD.SET_GUILD_LEADER = 5009;
gv.CMD.SET_GUILD_MODERATOR = 5010;
gv.CMD.SET_GUILD_MEMBER = 5011;


testnetwork = testnetwork||{};

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
CmdDenyRequestMember = fr.OutPacket.extend(
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
CmdSearchGuildInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.SEARCH_GUILD_INFO);
        },
        pack:function(type, id, name){  //type = 0 : search theo id
                                        //type = 1: search theo name
            this.packHeader();

            this.putShort(type);
            this.putInt(id);
            this.putString(name);
            
            this.updateSize();
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

testnetwork.packetMap[gv.CMD.EDIT_GUILD_INFO] = fr.InPacket.extend(
    {
        ctor: function()
        {
            this._super();
        },
        readData: function(){
            
            this.validate  = this.getShort();
        }
    }
);

testnetwork.packetMap[gv.CMD.SEARCH_GUILD_INFO] = fr.InPacket.extend(
    {
        ctor: function()
        {
            this._super();
        },
        readData: function(){
            this.listSearchClanInfo = listSearchClanInfo || null;
            this.validate  = this.getShort();
            this.number_of_guild = this.getInt();
            for(var i=0; i<this.number_of_guild; i++){
                var guild = {
                    id: this.getInt(),
                    name: this.getString(),
                    iconType: this.getInt(),
                    status: this.getShort(),
                    level: this.getInt(),
                    member: this.getInt(),
                    troophy: this.getInt(),
                    troophyRequire: this.getInt(),
                };
            this.listSearchClanInfo.push(guild);
            }
        }
    }
);