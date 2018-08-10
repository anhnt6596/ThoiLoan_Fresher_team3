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
        //removeBtn.addClickEventListener(this.remove.bind(this));

        var researchBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/research_icon.png', 'Research');
        this._listBtn.push(researchBtn);
        this.researchBtn = researchBtn;
        this.addChild(researchBtn);
        researchBtn.addClickEventListener(this.research.bind(this));

        var collectGoldBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/harvest_gold.png', 'Collect');
        this._listBtn.push(collectGoldBtn);
        this.collectGoldBtn = collectGoldBtn;
        this.addChild(collectGoldBtn);
        collectGoldBtn.addClickEventListener(this.collect.bind(this));

        var collectElixirBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/harvest_elixir.png', 'Collect');
        this._listBtn.push(collectElixirBtn);
        this.collectElixirBtn = collectElixirBtn;
        this.addChild(collectElixirBtn);
        collectElixirBtn.addClickEventListener(this.collect.bind(this));

        var collectDarkElixirBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/harvest_dark_elixir.png', 'Collect');
        this._listBtn.push(collectDarkElixirBtn);
        this.collectDarkElixirBtn = collectDarkElixirBtn;
        this.addChild(collectDarkElixirBtn);
        collectDarkElixirBtn.addClickEventListener(this.collect.bind(this));

        var trainBtn = ui.iconButton(100, 0, - 55, 'res/Art/GUIs/Action_Building_Icon/train_icon.png', 'Train');
        this._listBtn.push(trainBtn);
        this.trainBtn = trainBtn;
        this.addChild(trainBtn);
        trainBtn.addClickEventListener(this.train.bind(this));
    },
    onInfo: function() {
        if(MAP._targetedObject){
            var data = {_level: MAP._targetedObject._level, itemName:MAP._targetedObject._name};
            var popup = new ItemInfo(cc.winSize.width*3/4, cc.winSize.height*5.7/6, name.building[data.itemName].en + ' level ' + data._level, true, data);
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
    research: function() {
        cc.log('===========> RESEARCH');
        console.log("open Popup research");
        var researchPopUp = new ResearchPopUp();
        MAPSCENE.addChild(researchPopUp, 1000);
        //createResearchPopup();
        //if (research_constant.used_open){
        //    console.log("Re-open Popup research");
        //    ResearchPOPUP.attr({
        //        x: cc.winSize.width / 2,
        //        y: cc.winSize.height / 2,
        //        anchorX: 0.5,
        //        anchorY: 0.5,
        //    });
        //
        //     //cho popUp ve vi tri cu tren man hinh
        //}
        //else {
        //    console.log("open Popup research");
        //    var researchPopUp = new ResearchPopUp();
        //    MAPSCENE.addChild(researchPopUp, 1000);
        //}

    },
    collect: function() {
        cc.log('===========> COLLECT');
        MAP._targetedObject.onCollectResource();
        ui.dropCoinEffect(MAP._targetedObject);

    },
    train: function() {
        //NETWORK.sendGetBarrackQueueInfo();
        var data = {train: true, barrack: MAP._targetedObject};
        var popup = new TrainPopup(cc.winSize.width*5/6, cc.winSize.height*99/100, "Barrack id " + data.barrack._id, true, data);
        cc.director.getRunningScene().addChild(popup, 200);
    },
    quickFinish: function(){
        if(MAP._targetedObject){
            var remainTime = MAP._targetedObject.buildTime - (getCurrentServerTime() - MAP._targetedObject.startTime)/1000;
            var gFinish = timeToG(remainTime);
            cc.log("==========================================THOI GIAN: " + remainTime);
            if(gv.user.coin < gFinish){
                showPopupNotEnoughG('quick_finish');
            }else{
                var data = {building:MAP._targetedObject, g:gFinish};
                var popup = new QuickFinishPopup(cc.winSize.width/2, cc.winSize.height/1.5, "Use G to quick finish this building", false, data);
                cc.director.getRunningScene().addChild(popup, 2000000);
            }
        }
    },
    setUpValidBtn: function(object) {
        this.hideAll();
        this._listValidBtn = [];
        if (object instanceof Contruction) {
            this._listValidBtn.push(this.infoBtn);              // info đầu tiên
            if (object._status == 'complete' && object._name !== 'BDH_1') { // nếu trang thái hoàn thành thì thêm nút upgrade và các nút khác tùy tên
                this._listValidBtn.push(this.upgradeBtn);
                if (object._name == "LAB_1")  this._listValidBtn.push(this.researchBtn);
                if (object._name == "RES_1")  this._listValidBtn.push(this.collectGoldBtn);
                if (object._name == "RES_2")  this._listValidBtn.push(this.collectElixirBtn);
                if (object._name == "RES_3")  this._listValidBtn.push(this.collectDarkElixirBtn);
                if (object._name == "BAR_1")  this._listValidBtn.push(this.trainBtn);
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
        this._listValidBtn.forEach(function(element, i) {
            element.attr({
                x: size.width / 2 + 120 * (i - len / 2 + 0.5),
                y: 55
            });
        });
    },
    hideAll: function() {
        this._listBtn.forEach(function(element) {
            element.attr({
                y: -55
            });
        });
    }
});

//var