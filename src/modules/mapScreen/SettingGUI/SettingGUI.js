var SettingGUI = ui.PopUp.extend({
    ctor: function() {
        this._super("Cài đặt", [], 'res/Art/Bang hoi/nen 1.png');
        this.init();
    },
    init: function() {
        this.initContent();
    },
    initContent: function() {
        var text1 = new cc.LabelTTF("Âm thanh:", "Calibri", 22);
        text1.attr({ 
            x: -170,
            y: this.height + 100,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(text1, 100);

        var leftButton1 = new ccui.Button(res.clan.prevBtn);
        leftButton1.attr({
            x: this.width / 2 - 90,
            y: this.height + 100,
        });
        this.addChild(leftButton1, 100);
        leftButton1.addClickEventListener(this.toggleSound.bind(this));

        var rightButton1 = new ccui.Button(res.clan.nextBtn);
        rightButton1.attr({ 
            x: this.width / 2 + 90,
            y: this.height + 100,
        });
        this.addChild(rightButton1, 100);
        rightButton1.addClickEventListener(this.toggleSound.bind(this));

        var t = SOUND ? "Bật" : "Tắt";
        var soundText = new cc.LabelBMFont(t, res.font_soji[16]);
        this.soundText = soundText;
        soundText.attr({
            x: this.width / 2,
            y: this.height + 100,
        });
        this.addChild(soundText, 100);
    },
    toggleSound: function() {
        SOUND = !SOUND;
        var t = SOUND ? "Bật" : "Tắt";
        this.soundText.setString(t);
    },
    openAction: function(scale) {
        var size = cc.winSize;
        this.setVisible(true);
        this.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 1,
        });
        if (scale === undefined) scale = size.width / this.frame.width * 0.85;
        this.runAction(ui.BounceEff(scale));
    },
    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4 * this.scale, 1.4 * this.scale);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.setVisible(false);
        }, this)));
    },
});
