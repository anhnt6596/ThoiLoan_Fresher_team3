var TinyPopup = cc.Node.extend({
    _frame:null,
    _data:null,
    _titleText:null,
    _btnText:null,

    //type = true (X) || false (X + functinal Btn)
    ctor:function(width, height, title, type, data) {
        this._super();
        this.init(width, height, title, type, data);
    },

    init:function(width, height, title, type, data){
        this._data = data;
        this.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.openAction();

        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png');
        background.scale = 100;
        this.addChild(background, 0);

        this._frame = new cc.Sprite('res/Art/GUIs/shop_gui/bg.png');
        this._frame.setScale(width/this._frame.width, height/this._frame.height);
        this.addChild(this._frame, 1);

        this._titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_20.fnt');
        this._titleText.setPosition(0, this._frame.height*this._frame.scaleY/2 - this._titleText.height/2 - 15);
        this.addChild(this._titleText, 2);

        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png', 'res/Art/GUIs/pop_up/close.png');
        closeBtn.setPosition(this._frame.width/2 * this._frame.scaleX - closeBtn.width * closeBtn.scaleX/2 - 10, this._frame.height/2 * this._frame.scaleY - closeBtn.height * closeBtn.scaleY/2 - 7);
        this.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));

        if(!type){
            var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
            acceptBtn.setPosition(this._frame.x, this._frame.y - this._frame.height * this._frame.scaleY/2 + acceptBtn.height + 10);
            this.addChild(acceptBtn, 200);
            acceptBtn.addClickEventListener(this.ok.bind(this));

            this._btnText = new cc.LabelBMFont("20", 'res/Art/Fonts/soji_20.fnt');
            this._btnText.setPosition(acceptBtn.x, acceptBtn.y);
            this.addChild(this._btnText, 202);

            var unitG = new cc.Sprite('res/Art/GUIs/pop_up/G.png');
            unitG.setPosition(this._btnText.x + this._btnText.width/2 + 20, this._btnText.y);
            this.unitG = unitG;
            this.addChild(unitG, 202);
        }
    },

    showContent: function(data) {
        var contentText;
        if(data.type == 'builder'){
            contentText = new cc.LabelBMFont('Do you want to release a builder?', 'res/Art/Fonts/soji_20.fnt');
        }else{
            contentText = new cc.LabelBMFont('Do you want to by lacking resources?', 'res/Art/Fonts/soji_20.fnt');
            var stt = 0;
            for(var i in data.type){
                if(data.type[i] > 0){
                    stt++;
                    var res = new cc.LabelBMFont(formatNumber(data.type[i]), 'res/Art/Fonts/soji_20.fnt');
                    res.setPosition(contentText.x, contentText.y - 30*stt);
                    this.addChild(res, 2);

                    var unit = new cc.Sprite('res/Art/GUIs/Main_Gui/'+ i +'_icon.png');
                    unit.setPosition(res.x + res.width/2 + 20, res.y);
                    this.addChild(unit, 2);
                }
            }
        }
        contentText.setPosition(0, 50);
        contentText.color = cc.color(0, 255, 0, 255);
        this.addChild(contentText, 2);


        //set Text button
        this._btnText.setString(formatNumber(data.g));
        this.unitG.setPosition(this._btnText.x + this._btnText.width/2 + 15, this._btnText.y);
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
