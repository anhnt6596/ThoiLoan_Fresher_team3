var ui = ui || {};

ui.PopUp = cc.Node.extend({
    ctor: function(title, content) {
        this._super();
        var size = cc.winSize;
        this.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
        });
        this.attr({
            width: cc.winSize.width,
            height: cc.winSize.height,
            color: cc.color(100, 100, 100, 100),
        });
        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png', 'res/Art/GUIs/pop_up/bg_color.png');
        background.attr({
            x: 0,
            y: 0,
            scale: 100,
        });
        this.addChild(background, 0);
        var frame = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        frame.attr({
            scale: 2,
            x: 0,
            y: 0,
        });
        this.addChild(frame, 1);

        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
        closeBtn.attr({
            x: 335,
            y: 225,
            scale: 2,
        });
        this.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));

        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_24.fnt');
        titleText.attr({
            x: 0,
            y: 225,
            scale: 1.5,
        });
        this.addChild(titleText, 2);

        content.forEach(element => {
            this.addChild(element, 2)
        });
        this.openAction();
    },
    openAction: function() {
        var act1 = new cc.ScaleTo(0.25, 1.1, 1.1);
        var act2 = new cc.ScaleTo(0.15, 1, 1);
        this.runAction(new cc.Sequence(act1, act2));
    },
    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        // this.getParent().removeChild(this);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
    },
});
