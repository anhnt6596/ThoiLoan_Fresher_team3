var ErrorPopup = TinyPopup.extend({
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

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        this.refreshGame();
    },

    refreshGame: function() {
        cc.director.popToRootScene();
        var scene = cc.director.getRunningScene();
        var children = scene.getChildren();
        for(var i in children){
            children[i].retain();
            scene.removeChild(children[i]);
        }
        scene.removeAllChildren(true);
        scene.removeFromParent();
        scene.retain();

        cc.game.run();
    }
});


//Show thong bao khong du G de lam gi do
var showErrorPopup = function(type){
    var data = {};
    var title;
    switch (type) {
        case 'server_denied_build':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to build";
            break;
        case 'server_denied_upgrade':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to upgrade";
            break;
        case 'server_denied_quick_finish':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to quick finish";
            break;
        case 'server_denied_finish_time':
            data.content = "Please try again later!";
            title = "Server denied to finish this building";
            break;
        case 'server_denied_cancel':
            data.content = "Please try again later!";
            title = "Server denied to cancel";
            break;
        case 'server_denied_remove_obstacle':
            data.content = "Please try again later!";
            title = "Server denied to remove";
            break;
        case 'server_denied_finish_time_obstacle':
            data.content = "Please try again later!";
            title = "Server denied to finish time this obstacle";
            break;
        case 'server_denied_add_resources':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to add resources";
            break;
        case 'server_denied_quick_finish_train_troop':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to quick finish those troops";
            break;
        case 'server_denied_train_troop':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to train this troop";
            break;
        case 'server_denied_cancel_train_troop':
            resetReducedTempResources();
            data.content = "Please try again later!";
            title = "Server denied to cancel this troop";
            break;
        case 'server_denied_finish_time_train_troop':
            data.content = "Please try again later!";
            title = "Server denied to finish this troop";
            break;
        case 'server_denied_send_new_message':
            data.content = "Please try again later";
            title = "Server denied to send new message";
            break;
        case 'server_denied_give_troop_guild':
            data.content = "Please try again later";
            title = "Server denied to give troop guild";
            break;
        case 'server_denied_upgrade_multi_wall':
            data.content = "Please try again later";
            title = "Server denied to upgrade multi wall";
            break;
        default:
            break;
    }

    var popup = new ErrorPopup(cc.winSize.width/2, cc.winSize.height/1.5, title, true, data);
    cc.director.getRunningScene().addChild(popup, 2000000);
};