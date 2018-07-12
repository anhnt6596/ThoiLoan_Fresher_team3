var DuyTest = cc.Layer.extend({

    ctor:function() {
        cc.log("-----------ctor DuyTest-----------");
        this._super();
        this.init();
    },

    init:function(){
        var pp = lad.popup(900, 600, cc.winSize.width/2, cc.winSize.height/2, "Test Popup", null, true);
        this.addChild(pp, 100);
        return true;
    },

    onEnter:function(){
        cc.log("-----------onEnter DuyTest-----------");
        this._super();
    },

    onExit:function(){
        cc.log("-----------onExit DuyTest-----------");
        this._super();
    }
});


