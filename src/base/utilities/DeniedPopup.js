var DeniedPopup = TinyPopup.extend({
    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent(data)
    },

    showContent: function(data) {
        var contentText = new cc.LabelBMFont(data.content, res.font_soji[20]);
        contentText.setPosition(0, 30);
        contentText.color = cc.color(0, 255, 0, 255);
        this.addChild(contentText, 2);
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));
        resetReducedTempResources();

    }
});


var showPopupDisconect = function(){
    var data = {};
    data.content = "Please try to reconnect";
    var title = "Disconected to server";
    var popup = new ErrorPopup(cc.winSize.width/2, cc.winSize.height/1.5, title, true, data);
    cc.director.getRunningScene().addChild(popup, 2000000);
};


//Show thong bao khong du G de lam gi do
var showPopupNotEnoughG = function(type){
    var data = {};
    var title;
    //content: train_troop, release_builder, quick_finish, build, upgrade, upgrade_require_townhall, ...
    switch (type) {
        case 'train_troop':
            data.content = "Add more G to train this troop!";
            title = "Not enough resources to train";
            break;
        case 'release_builder':
            data.content = "Add more G to release a builder!";
            title = "All builders are busy";
            break;
        case 'build':
            data.content = "Add more G to buy lacking resources!";
            title = "Not enough resources to build";
            break;
        case 'upgrade':
            data.content = "Add more G to buy lacking resources!";
            title = "Not enough resources to upgrade";
            break;
        case 'quick_finish':
            data.content = "Add more G to quick finish this progress!";
            title = "Not enough G to quick finish";
            break;
        case 'upgrade_require_townhall':
            data.content = "Upgrade TownHall to upgrade this building!";
            title = "Not enough level of TownHall";
            break;
        case 'research':
            data.content = "Add more G to buy resource";
            title = "Do not have enough resource";
            break;
        case 'over_length_message':
            data.content = "Maximum message's length is 50 characters";
            title = "Your message is too long";
            break;
        case 'none_length_message':
            data.content = "Please add more characters to could be send";
            title = "Your message is nothing";
            break;
        // case 'create_clan_not_enough_gold':
        //     data.content = "";
        default:
            break;
    }

    var popup = new DeniedPopup(cc.winSize.width/2, cc.winSize.height/1.5, title, true, data);
    cc.director.getRunningScene().addChild(popup, 2000000);
};
