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
            x: cc.winSize.width/2,
            y: cc.winSize.height/2,
            color: cc.color(100, 100, 100, 50)
        });

        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png', 'res/Art/GUIs/pop_up/bg_color.png');
        background.scale = 100;
        this.addChild(background, 0);

        this._frame = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        this._frame.setScale(width/this._frame.width, height/this._frame.height);
        this.addChild(this._frame, 1);

        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
        closeBtn.setPosition(this._frame.width/2 * this._frame.scaleX - closeBtn.width * closeBtn.scaleX/2 - 20, this._frame.height/2 * this._frame.scaleY - closeBtn.height * closeBtn.scaleY/2 - 15);
        closeBtn.scale = 1.2;
        this.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));


        if(!type){
            var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
            acceptBtn.setPosition(this._frame.x, this._frame.y - this._frame.height * this._frame.scaleY/2 + acceptBtn.height + 10);
            this.addChild(acceptBtn, 200);
            acceptBtn.addClickEventListener(this.ok.bind(this));

            var btnText = new cc.LabelBMFont("Confirm", 'res/Art/Fonts/soji_20.fnt');
            btnText.setPosition(acceptBtn.x, acceptBtn.y);
            this.addChild(btnText, 202);
        }

        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_20.fnt');
        titleText.setPosition(0, this._frame.height*this._frame.scaleY/2 - titleText.height/2 - 20);
        this.addChild(titleText, 2);

        this.openAction();
    },

    showContent:function(listener){
        if(!listener.contentBuyG && !listener._level){
            var contentText = new cc.LabelBMFont('Use ' + (listener.gBuilder ? listener.gBuilder : listener.gResources), 'res/Art/Fonts/soji_20.fnt');
            contentText.setPosition(-10, 0);
            contentText.color = cc.color(0, 255, 0, 255);
            this.addChild(contentText, 2);

            var unit = new cc.Sprite('res/Art/GUIs/pop_up/G.png');
            unit.setPosition(contentText.x + contentText.width - 25, 0);
            this.addChild(unit, 2);
        }else{
            var contentText = new cc.LabelBMFont(listener.contentBuyG, 'res/Art/Fonts/soji_20.fnt');
            contentText.setPosition(-10, 0);
            contentText.color = cc.color(0, 255, 0, 255);
            this.addChild(contentText, 2);
        }
    },

    openAction: function() {
        this.runAction(ui.BounceEff());
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
    }
});
