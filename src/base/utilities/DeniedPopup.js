var DeniedPopup = TinyPopup.extend({
    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent(data)
    },

    showContent: function(data) {
        var contentText = new cc.LabelBMFont(data.content, 'res/Art/Fonts/soji_20.fnt');
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

        //Xu ly o day
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




//Show thong bao khong du G de lam gi do
var showPopupNotEnoughG = function(type){
    var data = {};
    var title;
    //content: train_troop, release_builder, quick_finish, build, upgrade, upgrade_require_townhall, server_denied
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
        case 'server_denied_build':
            data.content = "Please try again later!";
            title = "Server denied to build";
            break;
        case 'server_denied_upgrade':
            data.content = "Please try again later!";
            title = "Server denied to upgrade";
            break;
        case 'server_denied_quick_finish':
            data.content = "Please try again later!";
            title = "Server denied to quick finish";
            break;
        case 'server_denied_cancel':
            data.content = "Please try again later!";
            title = "Server denied to cancel";
            break;
        case 'server_denied_remove_obstacle':
            data.content = "Please try again later!";
            title = "Server denied to remove";
            break;
        case 'server_denied_add_resources':
            data.content = "Please try again later!";
            title = "Server denied to add resources";
            break;
        case 'server_denied_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to train this troop";
            break;
        case 'server_denied_cancel_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to cancel this troop";
            break;
        case 'server_denied_finish_time_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to finish this troop";
            break;
        case 'server_denied_quick_finish_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to quick finish those troops";
            break;
        case 'research':
            data.content = "Add more G to buy resource";
            title = "Do not have enough resource";
        case 'server_denied_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to train this troop";
            break;
        case 'server_denied_cancel_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to cancel this troop";
            break;
        case 'server_denied_finish_time_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to finish this troop";
            break;
        default:
            break;
    }

    var popup = new DeniedPopup(cc.winSize.width/2, cc.winSize.height/1.5, title, true, data);
    cc.director.getRunningScene().addChild(popup, 2000000);
};
