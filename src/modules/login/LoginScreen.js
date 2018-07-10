/**
 * Created by GSN on 7/9/2015.
 */


var LoginScreen = cc.Layer.extend({
    ctor:function() {
        this._super();


        var size = cc.winSize;
        var yBtn = size.height/3;

        var btnLogin = gv.commonButton(200, 64, size.width/2, yBtn,"Login");
        this.addChild(btnLogin);
        //btnLogin.addClickEventListener(this.onSelectLogin.bind(this));
        btnLogin.addClickEventListener(this.loginTrucTiep.bind(this));





    },

    loginTrucTiep: function(){
        cc.director.runScene(createGameScene());

    }

});