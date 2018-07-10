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
var ScreenTest = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.winSize;

        cc.log("vao man hinh Scren Test" )
        var btnAttack = gv.MGButton(10,10,0,0,res.mg_attack);

        this.addChild(btnAttack);

        //text field id login -linhrafa


       // var btnDisconnect = gv.commonButton(200, 64, size.width/2, yBtn,"Disconnect");
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

        this.initGuiGame();
    },
    initGuiGame:function()
    {
        //var size = cc.director.getVisibleSize();
        //
        //this._gameNode = new cc.Node();
        //this._gameNode.setPosition(cc.p(size.width*0.4, size.height*0.4));
        ////this._gameNode.setVisible(false);
        //this.addChild(this._gameNode);
        //
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
        //    testnetwork.connector.sendMove(Direction.DOWN);
        //}.bind(this));
        ////
        ////var btnTest_small = gv.commonButton(64, 64, 160 , 0,"+");
        ////btnTest_small.addClickEventListener(function()
        ////{
        ////    testnetwork.connector.sendTest(5);
        ////}.bind(this));

    },


});