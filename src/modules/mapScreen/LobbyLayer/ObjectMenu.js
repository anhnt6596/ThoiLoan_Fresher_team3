var ObjectMenu = cc.Node.extend({
    _listBtn: [],
    _listValidBtn: [],
    ctor: function() {
        this._super();
        this.init();
        this.attr({
            anchorX: 0.5,
            anchorY: 0,
            y: -200,
        });
    },
    init: function() {
        var size = cc.winSize;

        var infoBtn = ui.iconButton(100, size.width / 2 - 120, - 55, 'res/Art/GUIs/Action_Building_Icon/info_icon.png', 'Info');
        this._listBtn.push(infoBtn);
        this.infoBtn = infoBtn;
        this.addChild(infoBtn);
        infoBtn.addClickEventListener(this.onInfo.bind(this));

        var upgradeBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/upgrade_icon.png', 'Upgrade');
        this._listBtn.push(upgradeBtn);
        this.upgradeBtn = upgradeBtn;
        this.addChild(upgradeBtn);
        upgradeBtn.addClickEventListener(this.upgrade.bind(this));

        var cancelBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/cancel_icon.png', 'Cancel');
        this._listBtn.push(cancelBtn);
        this.cancelBtn = cancelBtn;
        this.addChild(cancelBtn);
        cancelBtn.addClickEventListener(this.cancel.bind(this));

        var quickFinishBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/quick_finish.png', 'Quick\nFinish');
        this._listBtn.push(quickFinishBtn);
        this.quickFinishBtn = quickFinishBtn;
        this.addChild(quickFinishBtn);
        quickFinishBtn.addClickEventListener(this.quickFinish.bind(this));

        var removeBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/remove_icon.png', 'Remove');
        this._listBtn.push(removeBtn);
        this.removeBtn = removeBtn;
        this.addChild(removeBtn);
        removeBtn.addClickEventListener(this.remove.bind(this));
    },
    onInfo: function() {
        if(MAP._targetedObject){
            var listener = {level: MAP._targetedObject.level, itemName:MAP._targetedObject.name};
            var popup = new ItemInfo(cc.winSize.width*3/4, cc.winSize.height*5.7/6, name.building[listener.itemName].en, true, listener);
            cc.director.getRunningScene().addChild(popup, 200);
        }
    },
    upgrade: function() {
        // MAP._targetedObject && MAP._targetedObject.upgrade();
        MAP._targetedObject && MAP._targetedObject._status === 'complete' && createUpgradePopUp();
    },
    remove: function() {
        MAP._targetedObject && MAP._targetedObject instanceof Obstacle && MAP.removeObstacle(MAP._targetedObject);
    },
    cancel: function() {
        //Neu MAP._targetedObject != undefine, null, 0 thi ve phai moi chay
        MAP._targetedObject && createCancelPopUp();
    },
    quickFinish: function(){
        if(MAP._targetedObject){
            var remainTime = MAP._targetedObject.buildTime - (getCurrentServerTime() - MAP._targetedObject.startTime)/1000;
            var gFinish = timeToG(remainTime);
            cc.log("==========================================THOI GIAN: " + remainTime);
            if(gv.user.coin < gFinish){
                var listener = {contentBuyG:"Please add more G to quick finish this building!"};
                var popup = new TinyPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Not enough G to quick finish this building", true, listener);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }else{
                var listener = {building:MAP._targetedObject, gResources:gFinish};
                var popup = new QuickFinishPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to quick finish this building", false, listener);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }
        }
    },
    setUpValidBtn: function(object) {
        this.hideAll();
        this._listValidBtn = [];
        if (object instanceof Contruction) {
            this._listValidBtn.push(this.infoBtn);              // info đầu tiên
            if (object._status == 'complete' && object.info.name !== 'BDH_1') {
                this._listValidBtn.push(this.upgradeBtn);
            } else if (object._status == 'upgrade' || object._status == 'pending') {
                this._listValidBtn.push(this.cancelBtn);        // cancel tiếp theo
                this._listValidBtn.push(this.quickFinishBtn);   // quick finish
            }
        } else if (object instanceof Obstacle) {
            this._listValidBtn.push(this.removeBtn);
        }
        var size = cc.winSize;
        var len = this._listValidBtn.length;
        var isOdd = false;
        if (len % 2 == 1) isOdd = true;
        this._listValidBtn.forEach((element, i) => {
            element.attr({
                x: size.width / 2 + 120 * (i - len / 2 + 0.5),
                y: 55,
            });
        });
    },
    hideAll: function() {
        this._listBtn.forEach(element => {
            element.attr({
                y: -55,
            });
        });
    }
});

//var