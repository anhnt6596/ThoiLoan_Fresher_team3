var SettingGUI = ui.PopUp.extend({
    ctor: function() {
        this._super("Cài đặt", [], 'res/Art/Bang hoi/nen 1.png');
        this.init();
    },
    init: function() {
        this.initContent();
    },
    initContent: function() {
        // Sound
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

        // Music
        var text2 = new cc.LabelTTF("Nhạc:", "Calibri", 22);
        text2.attr({ 
            x: -170,
            y: this.height + 50,
            anchorX: 1,
            color: new cc.color(142, 8, 8, 255)
        });
        this.addChild(text2, 100);

        var leftButton2 = new ccui.Button(res.clan.prevBtn);
        leftButton2.attr({
            x: this.width / 2 - 90,
            y: this.height + 50,
        });
        this.addChild(leftButton2, 100);
        leftButton2.addClickEventListener(this.toggleMusic.bind(this));

        var rightButton2 = new ccui.Button(res.clan.nextBtn);
        rightButton2.attr({ 
            x: this.width / 2 + 90,
            y: this.height + 50,
        });
        this.addChild(rightButton2, 100);
        rightButton2.addClickEventListener(this.toggleMusic.bind(this));

        var t2 = MUSIC ? "Bật" : "Tắt";
        var musicText = new cc.LabelBMFont(t2, res.font_soji[16]);
        this.musicText = musicText;
        musicText.attr({
            x: this.width / 2,
            y: this.height + 50,
        });
        this.addChild(musicText, 100);
    },
    toggleSound: function() {
        SOUND = !SOUND;
        cc.sys.localStorage.setItem("sound", SOUND.toString());
        var t = SOUND ? "Bật" : "Tắt";
        this.soundText.setString(t);
    },
    toggleMusic: function() {
        MUSIC = !MUSIC;
        cc.sys.localStorage.setItem("music", MUSIC.toString());
        if (!MUSIC) cc.audioEngine.pauseMusic();
        else cc.audioEngine.resumeMusic();
        var t = MUSIC ? "Bật" : "Tắt";
        this.musicText.setString(t);
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
