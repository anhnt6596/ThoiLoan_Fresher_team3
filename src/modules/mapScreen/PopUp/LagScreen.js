var LAG_SCREEN = LAG_SCREEN || null;

var LagScreen = cc.Node.extend({
    ctor: function() {
        this._super();
        LAG_SCREEN = this;
        var size = cc.winSize;
        var bg = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png');
        bg.setOpacity(0);
        bg.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: size.width / 2,
            y: size.height / 2,
            scale: 1000
        });
        this.addChild(bg);
        var text = new cc.LabelBMFont("Đợi tí...", 'res/Art/Fonts/soji_24.fnt');
        text.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: size.width / 2,
            y: size.height / 2,
        });
        text.setOpacity(150);
        this.addChild(text);

        var reconnectBtn = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png');
        reconnectBtn.setOpacity(100);
        reconnectBtn.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: size.width / 2,
            y: size.height / 2 - 100,
            scale: 2
        });
        this.addChild(reconnectBtn);

        var text2 = new cc.LabelBMFont("Kết nối lại", 'res/Art/Fonts/soji_16.fnt');
        text2.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: reconnectBtn.width / 2,
            y: reconnectBtn.height / 2,
            scale: 0.5,
        });
        text2.setOpacity(150);
        reconnectBtn.addChild(text2);

        reconnectBtn.addClickEventListener(function() {
            fr.view(LoginScreen);
        });

        this.hide();
    },
    show: function() {
        this.attr({
            x: 0,
            y: 0
        });
    },
    hide: function() {
        this.attr({
            x: -10000000,
            y: -10000000
        });
    }
});