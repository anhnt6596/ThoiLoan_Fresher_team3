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

        var size = cc.director.getVisibleSize();

        var height = 480;
        var width = 800;
        var background = new cc.Sprite("res/Art/GUIs/Main_Gui/login/background.jpg");
        background.attr({
            x: size.width/2,
            y: size.height/2,
            scale: 1.5

        });

        this.addChild(background);
        //
        //
        this.tfId = gv.EditBox("Id","linhrafa",size.width/4,5*size.height/9);
        //this.tfId.setMaxLengthEnabled(true);
        this.tfId.maxLength = 12;
        this.addChild(this.tfId);


        var btnLogin = gv.commonButton(200, 64, size.width/2, yBtn,"Login");
        this.addChild(btnLogin);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        // btnLogin.addClickEventListener(this.loginTrucTiep.bind(this));

        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);

    },

    loginTrucTiep: function(){
        setUserResourcesCapacity();
        cc.director.runScene(createMapScene());
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
        setUserResourcesCapacity();
        cc.director.runScene(createMapScene());
    },
});