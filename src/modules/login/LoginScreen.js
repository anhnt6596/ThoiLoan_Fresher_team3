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
        var background = new cc.Sprite("res/Art/LoginGui/loginScreen.png");
        background.attr({
            x: size.width/2,
            y: size.height/2,
            scale: 1

        });

        this.addChild(background);
        //
        //
        //this.tfId = gv.TextField("Id","linhrafa",size.width/4,5*size.height/9);
        //this.tfId.setMaxLengthEnabled(true);
        //this.tfId.setMaxLength(12);
        //this.addChild(this.tfId);
        this.uuidEb = cc.EditBox.create(cc.size(size.width/3,size.height/10),"res/Art/LoginGui/g_background.png");
        this.uuidEb.setPlaceHolder("  Tài khoản");
        this.uuidEb.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: size.width/2 - 175,
            y: size.height/2 + 30,
            fontSize: 35,
            scale: 1.1,
            //placeHolderFontColor: cc.color(255,255,255,200)
        });
        this.uuidEb.setFontColor(new cc.Color(255, 255, 255, 255));
        this.uuidEb.setInputFlag(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.uuidEb.setMaxLength(8);
        var temp = cc.sys.localStorage.getItem("uuid");
        temp && this.uuidEb.setString(temp);
        this.addChild(this.uuidEb);

        //var btnLogin = gv.commonButton(200, 64, size.width/2, size.height/5,"");
        var btnLogin = ui.optionButton("Login", "res/Art/LoginGui/bg-btn-login.png");
        btnLogin.attr({
            x: this.uuidEb.x,
            y: this.uuidEb.y - 140,            
        });
        btnLogin.label.setScale(2);

        this.addChild(btnLogin);
        btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        // btnLogin.addClickEventListener(this.loginTrucTiep.bind(this));
        // btnLogin.addClickEventListener(this.vaoClanPopup.bind(this));


        this.lblLog = gv.commonText(fr.Localization.text("..."), size.width*0.4, size.height*0.05);
        this.addChild(this.lblLog);

    },

    loginTrucTiep: function(){
        setUserResourcesCapacity();
        cc.director.runScene(createMapScene());
    },
    vaoClanPopup: function() {
        var createScene = function() {
            var game = new cc.Scene();
            var clanGUI = new ClanGUI();
            game.addChild(clanGUI, 1000);
            CLAN_GUI = clanGUI;
            clanGUI.openAction();
            return game;
        }
        cc.director.runScene(createScene());
    },
    onSelectLogin:function(sender)
    {
        //this.lblLog.setString("Start Connect!");

        gv.user.uuid = this.uuidEb.getString();
        cc.sys.localStorage.setItem("uuid", gv.user.uuid);
        cc.log("uuid "+  gv.user.uuid  );
        var test = gv.gameClient.connect();
        cc.log('=================================CONNECT====================='+test);
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
        cc.director.pushScene(createMapScene());
        //cc.director.runScene(createMapScene());
    }
});