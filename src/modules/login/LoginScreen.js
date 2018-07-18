/**
 * Created by GSN on 7/9/2015.
 */

var LOGIN = LOGIN || null;

var LoginScreen = cc.Layer.extend({
    ctor:function() {
        this._super();
        LOGIN = this;

        var size = cc.winSize;
        var yBtn = size.height/3;

        this.tfId = gv.TextField("Id","linhrafa",size.width/4,5*size.height/9);
        this.tfId.setMaxLengthEnabled(true);
        this.tfId.setMaxLength(12);
        this.addChild(this.tfId);


        var btnLogin = gv.commonButton(200, 64, size.width/2, yBtn,"Login");
        this.addChild(btnLogin);
        // btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        btnLogin.addClickEventListener(this.loginTrucTiep.bind(this));

        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);

    },

    loginTrucTiep: function(){
        cc.director.runScene(createMapScene());
        this.setUserResourcesCapacity();
    },
    onSelectLogin:function(sender)
    {
        //this.lblLog.setString("Start Connect!");

        gv.user.uuid = this.tfId.getString()
        cc.log("uuid "+  gv.user.uuid  );
        gv.gameClient.connect();
    },
    onConnectSuccess:function()
    {

    },
    onConnectFail:function(text)
    {
        this.lblLog.setString("Connect fail: " + text);
    },
    onFinishGameInfo:function(){
        this.setUserResourcesCapacity();
        cc.director.runScene(createMapScene());
    },

    setUserResourcesCapacity:function(){
        var goldCapacity = 0;
        var elixirCapacity = 0;
        var darkElixirCapacity = 0;
        var currentLevelTownHall = 1;

        for(var k in contructionList){
            var build = contructionList[k];
            if(build.status == 'complete'){
                if(build.name == 'STO_1'){
                    goldCapacity += config.building['STO_1'][build.level].capacity;
                }else if(build.name == 'STO_2'){
                    elixirCapacity += config.building['STO_2'][build.level].capacity;
                }else if(build.name == 'STO_3'){
                    darkElixirCapacity += config.building['STO_3'][build.level].capacity;
                }
            }
        }

        for(var k in contructionList){
            if(contructionList[k].name == 'TOW_1'){
                currentLevelTownHall = contructionList[k].level;
            }
        }

        gv.user.maxCapacityGold = goldCapacity + config.building['TOW_1'][currentLevelTownHall].capacityGold;
        gv.user.maxCapacityElixir = elixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityElixir;
        gv.user.maxCapacityDarkElixir = darkElixirCapacity + config.building['TOW_1'][currentLevelTownHall].capacityDarkElixir;
    }
});