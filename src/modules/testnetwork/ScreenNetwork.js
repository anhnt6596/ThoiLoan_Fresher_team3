/**
 * Created by GSN on 7/9/2015.
 */

var Direction =
{
    UP:1,
    DOWN:2,
    LEFT:3,
    RIGHT:4
};
var ScreenNetwork = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.director.getVisibleSize();
        //text field id login -linhrafa
        this.tfId = gv.TextField("Id","linhrafa",size.width/4,5*size.height/9);
        this.tfId.setMaxLengthEnabled(true);
        this.tfId.setMaxLength(12);
        this.addChild(this.tfId);


        this.tfPassword = gv.TextField("Password","linhrafa",size.width/4,4*size.height/9);
        this.tfPassword.setPasswordEnabled(true);
        this.tfPassword.setPasswordStyleText("*");
        this.addChild(this.tfPassword);


        //var btnBack = gv.commonButton(200, 64, size.width - 120, 50,"Back");
        //this.addChild(btnBack);
        //btnBack.addClickEventListener(this.onSelectBack.bind(this));
        var yBtn = size.height/3;

        var btnLogin = gv.commonButton(200, 64, size.width/2, yBtn,"Login");
        this.addChild(btnLogin);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));

        //var btnDisconnect = gv.commonButton(200, 64, size.width/2, yBtn,"Disconnect");
        //this.addChild(btnDisconnect);
        //btnDisconnect.addClickEventListener(this.onSelectDisconnect.bind(this));
        //
        //var btnReconnect = gv.commonButton(200, 64, 3*size.width/4, yBtn,"Reconnect");
        //this.addChild(btnReconnect);
        //btnReconnect.addClickEventListener(this.onSelectReconnect.bind(this));
        //
        //var btnTest = gv.commonButton(200, 64, 3*size.width/4, yBtn/2,"Test");
        //this.addChild(btnTest);
        //btnTest.addClickEventListener(this.onSelectTest.bind(this));
        //
        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);

        //this.lblTest = gv.commonText(fr.Localization.text("NUll"), size.width*0.4, size.height*0.05);
        //this.addChild(this.lblTest);

        this.initGuiGame();
    },
    initGuiGame:function()
    {
        var size = cc.director.getVisibleSize();

        this._gameNode = new cc.Node();
        this._gameNode.setPosition(cc.p(size.width*0.4, size.height*0.4));
        this._gameNode.setVisible(false);
        this.addChild(this._gameNode);

        //var btnLeft = gv.commonButton(64, 64, -80, 0,"<");
        //this._gameNode.addChild(btnLeft);
        //btnLeft.addClickEventListener(function()
        //{
        //    testnetwork.connector.sendMove(Direction.LEFT);
        //}.bind(this));
        //
        //var btnRight = gv.commonButton(64, 64, 80, 0,">");
        //this._gameNode.addChild(btnRight);
        //btnRight.addClickEventListener(function()
        //{
        //    testnetwork.connector.sendMove(Direction.RIGHT);
        //}.bind(this));
        //var btnUp = gv.commonButton(64, 64, 0, 80,"<");
        //btnUp.setRotation(90);
        //this._gameNode.addChild(btnUp);
        //btnUp.addClickEventListener(function()
        //{
        //    testnetwork.connector.sendMove(Direction.UP);
        //}.bind(this));
        //var btnDown = gv.commonButton(64, 64, 0, -80,">");
        //btnDown.setRotation(90);
        //this._gameNode.addChild(btnDown);
        //btnDown.addClickEventListener(function()
        //{
        //    testnetwork.connector.sendMove( Direction.DOWN);
        //}.bind(this));
        //
        //var btnTest_small = gv.commonButton(64, 64, 160 , 0,"+");
        //btnTest_small.addClickEventListener(function()
        //{
        //    testnetwork.connector.sendTest(5);
        //}.bind(this));

    },
    //onSelectBack:function(sender)
    //{
    //    fr.view(ScreenMenu);
    //},
    onSelectLogin:function(sender)
    {
        this.lblLog.setString("Start Connect!");
        cc.log(this.tfId.getString());
        cc.log(this.tfPassword.getString());
        gv.user.username = this.tfId.getString()
        gv.user.password = this.tfPassword.getString();
        gv.gameClient.connect();
    },
    onSelectDisconnect:function(sender)
    {
        this.lblLog.setString("Coming soon!");
    },
    onSelectReconnect:function(sender)
    {
        this.lblLog.setString("Coming soon!");
    },
    onSelectTest:function(sender)
    {
        this.lblLog.setString("Test Connect");
        gv.gameClient.connect();

    },
    onConnectSuccess:function()
    {

    },
    onConnectFail:function(text)
    {
        this.lblLog.setString("Connect fail: " + text);
    },
     onFinishLogin:function(validated)
    {
       // this.lblLog.setString("Finish login!");
       // this._gameNode.setVisible(true);


    },
    onUserInfo:function(userName, username,password, validate)
    {

    },
    updateMove:function(x, y)
    {
        this.lblLog.setString("Pos:" + x + "," + y);
    },
    updateTest:function (number) {
        this.lblTest.setString("Number: "+number);
    },
    onUserValidate:function(userName, username,password, validate)
    //onUserValidate:function(validate){
    {
        this._gameNode.setVisible(true);
        //this.lblLog.setString("Pos:" + x + "," + y);
        cc.log("linhrafa client nhan: " + username + "  " + password);
        cc.log("linhrafa validate nhan: " + validate);
        if (validate){
            fr.view(ScreenTest);

        }
        else {
            this.lblLog.setString("Connect Fail! Sai mat khau va password");
        }
}

});