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
        //btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));





    },

    loginTrucTiep: function(){
        cc.director.runScene(createMapScene());
    },
    onSelectLogin:function(sender)
    {
        //this.lblLog.setString("Start Connect!");

        gv.user.uuid = this.tfId.getString()
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
        cc.director.runScene(createMapScene());
    }

});