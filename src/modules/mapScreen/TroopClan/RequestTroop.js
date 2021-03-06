var RequestTroop = TinyPopup.extend({
    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent();
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        //Send message request troop here

        var content = this.textField.getString();
        content = content.trim();
        if (content.length > MAX_LENGTH_MESSAGE){
            showPopupNotEnoughG('over_length_message');
        }else {
            temp.messageContent = content;
            temp.messageType = MESSAGE_ASK_TROOP;
            temp.guildCapacityAtTime = getCurrentGuildCapacity();
            NETWORK.sendNewMessage(MESSAGE_ASK_TROOP, content);
        }
    },

    showContent: function() {
        var label = new cc.LabelBMFont("Enter your message", res.font_soji[20]);
        label.setPosition(this._frame.x, this._frame.y + 50);
        this.addChild(label, 200);

        var textField = new cc.EditBox(cc.size(this._frame.width/2, 100),"res/Art/GUIs/Chat/bg_text.png");
        textField.setString("Please give me some troops!");
        textField.setFontColor(new cc.Color(0,0,0,255));
        textField.setFontSize(25);
        textField.setPosition(label.x, label.y - 70);
        this.textField = textField;
        this.addChild(textField, 200);

        this._btnText.setString("Request");
        this.unitG.setPosition(-1000, -1000);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
    }
});