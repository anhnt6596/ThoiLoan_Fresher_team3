var ui = ui || {};

ui.PopUp = cc.Sprite.extend({
    ctor: function(title = "", content = [], frameDir = 'res/Art/GUIs/research troop/nen 1.png') {
        this._super();
        var size = cc.winSize;
        this.attr({
            x: size.width / 2,
            y: size.height / 2,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png', 'res/Art/GUIs/pop_up/bg_color.png');
        background.attr({
            x: 0,
            y: 0,
            scale: 100
        });
        this.addChild(background, 0);
        var frame = new cc.Sprite(frameDir);
        this.frame = frame;
        frame.attr({
            scale: 1,
            x: 0,
            y: 0
        });
        this.addChild(frame, 1);

        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
        closeBtn.attr({
            x: frame.width - 33,
            y: frame.height - 28,
            scale: 1
        });
        frame.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));

        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_24.fnt');
        titleText.attr({
            x: frame.width / 2,
            y: frame.height - 30,
            scale: 1
        });
        frame.addChild(titleText, 2);

        var self = this;
        content.forEach(function(element) {
            self.addChild(element, 2)
        });
        this.openAction(size.width / this.frame.width * 0.8);
    },
    openAction: function(scale) {
        this.runAction(ui.BounceEff(scale));
    },
    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4 * this.scale, 1.4 * this.scale);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
    }
});
