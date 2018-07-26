var TinyPopup = cc.Node.extend({
    _frame:null,
    _listener:null,

    //type = true (X)
    //type = false (X + functinal Btn)
    //listener la 1 obj: listener.type = "resource" || "builder"; listener.building = building
    ctor:function(width, height, title, type, listener) {
        this._super();
        this.init(width, height, title, type, listener);
        if(listener != null){
            this.showContent(listener);
        }
    },

    init:function(width, height, title, type, listener){
        this._listener = listener;
        this.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            width: cc.winSize.width,
            height: cc.winSize.height,
            color: cc.color(100, 100, 100, 50),
        });

        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png', 'res/Art/GUIs/pop_up/bg_color.png');
        background.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            scale: 100,
        });
        this.addChild(background, 0);

        this._frame = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        this._frame.attr({
            anchorX: 0,
            anchorY: 0,
            scaleX: width/this._frame.width,
            scaleY: height/this._frame.height,
            x: (cc.winSize.width - width)/2,
            y: (cc.winSize.height - height)/2,
        });
        this.addChild(this._frame, 1);


        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
        closeBtn.attr({
            anchorX: 0,
            anchorY: 0,
            scale: 1.2,
            x: this._frame.x+width - closeBtn.width*closeBtn.scaleX - 30,
            y: this._frame.y+height - closeBtn.height*closeBtn.scaleY - 25,
        });
        this.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));


        if(!type){
            var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
            acceptBtn.attr({
                anchorX: 0,
                anchorY: 0,
                x: (cc.winSize.width - acceptBtn.width)/2,
                y: this._frame.y + 40,
                scale: 1,
            });
            this.addChild(acceptBtn, 200);
            acceptBtn.addClickEventListener(this.ok.bind(this));

            var btnText = new cc.LabelBMFont("Confirm", 'res/Art/Fonts/soji_20.fnt');
            btnText.attr({
                x: acceptBtn.x + btnText.width/2 + 10,
                y: acceptBtn.y + acceptBtn.height/2,
                scale: 1,
            });
            this.addChild(btnText, 202);
        }

        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_20.fnt');
        titleText.attr({
            anchorX: 0,
            anchorY: 0,
            x: (cc.winSize.width - titleText.width)/2,
            y: this._frame.y + height - titleText.height - 30,
            scale: 1,
        });
        this.addChild(titleText, 2);

        this.openAction();
    },

    showContent:function(listener){
        if(!listener.contentBuyG && !listener.level){
            var contentText = new cc.LabelBMFont('Use ' + (listener.gBuilder ? listener.gBuilder : listener.gResources), 'res/Art/Fonts/soji_20.fnt');
            contentText.attr({
                x: this._frame.width / 2,
                y: 145,
                scale: 1,
                color: cc.color(0, 255, 0, 255),
            });
            this._frame.addChild(contentText, 2);


            var unit = new cc.Sprite('res/Art/GUIs/pop_up/G.png');
            unit.attr({
                x: contentText.x + contentText.width - 30,
                y: 145,
                scale: 0.7,
            });
            this._frame.addChild(unit, 2);
        }else{
            var contentText = new cc.LabelBMFont(listener.contentBuyG, 'res/Art/Fonts/soji_20.fnt');
            contentText.attr({
                x: this._frame.width / 2,
                y: 145,
                scale: 0.7,
                color: cc.color(0, 255, 0, 255),
            });
            this._frame.addChild(contentText, 2);
        }
    },

    openAction: function() {
        this.runAction(ui.BounceEff());
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
    }
});
