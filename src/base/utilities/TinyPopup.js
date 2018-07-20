var TinyPopup = cc.Node.extend({
    _frame:null,


    //type = true (X)
    //type = false (X + functinal Btn)
    ctor:function(width, height, title, data, type) {
        this._super();
        this.init(width, height, title, data, type);
    },

    init:function(width, height, title, data, type){
        this.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
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

        this._frame = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        this._frame.attr({
            scale: 2.3,
            x: 0,
            y: 0,
        });
        this.addChild(this._frame, 1);

        if(type){
            var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
            closeBtn.attr({
                x: this._frame.width - 30,
                y: this._frame.height - 25,
                scale: 1,
            });
            this._frame.addChild(closeBtn, 2);
            closeBtn.addClickEventListener(this.close.bind(this));
        }


        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_24.fnt');
        titleText.attr({
            x: this._frame.width / 2,
            y: 245,
            scale: 1,
        });
        this._frame.addChild(titleText, 2);


        this.openAction();
    },
    openAction: function() {
        this.runAction(ui.BounceEff());
    },
    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
    },

});
