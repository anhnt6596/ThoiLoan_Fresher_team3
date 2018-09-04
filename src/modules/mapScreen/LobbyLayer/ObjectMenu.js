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

        var infoBtn = ui.iconButton(100, size.width / 2 - 120, - 55, res.gui.info_icon, 'Info');
        this._listBtn.push(infoBtn);
        this.infoBtn = infoBtn;
        this.addChild(infoBtn);
        infoBtn.addClickEventListener(this.onInfo.bind(this));

        var upgradeBtn = ui.iconButton(100, 0, - 55, res.gui.upgrade_icon, 'Upgrade');
        this._listBtn.push(upgradeBtn);
        this.upgradeBtn = upgradeBtn;
        this.addChild(upgradeBtn);
        upgradeBtn.addClickEventListener(this.upgrade.bind(this));

        var cancelBtn = ui.iconButton(100, 0, - 55, res.gui.cancel_icon, 'Cancel');
        this._listBtn.push(cancelBtn);
        this.cancelBtn = cancelBtn;
        this.addChild(cancelBtn);
        cancelBtn.addClickEventListener(this.cancel.bind(this));

        var quickFinishBtn = ui.iconButton(100, 0, - 55, res.gui.quick_finish_icon, 'Quick\nFinish');
        this._listBtn.push(quickFinishBtn);
        this.quickFinishBtn = quickFinishBtn;
        this.addChild(quickFinishBtn);
        quickFinishBtn.addClickEventListener(this.quickFinish.bind(this));

        var removeBtn = ui.iconButton(100, 0, - 55, res.gui.remove_icon, 'Remove');
        this._listBtn.push(removeBtn);
        this.removeBtn = removeBtn;
        this.addChild(removeBtn);
        //removeBtn.addClickEventListener(this.remove.bind(this));

        var researchBtn = ui.iconButton(100, 0, - 55, res.gui.research_icon, 'Research');
        this._listBtn.push(researchBtn);
        this.researchBtn = researchBtn;
        this.addChild(researchBtn);
        researchBtn.addClickEventListener(this.research.bind(this));

        var collectGoldBtn = ui.iconButton(100, 0, - 55, res.gui.collect_gold_icon, 'Collect');
        this._listBtn.push(collectGoldBtn);
        this.collectGoldBtn = collectGoldBtn;
        this.addChild(collectGoldBtn);
        collectGoldBtn.addClickEventListener(this.collect.bind(this));

        var collectElixirBtn = ui.iconButton(100, 0, - 55, res.gui.collect_elixir_icon, 'Collect');
        this._listBtn.push(collectElixirBtn);
        this.collectElixirBtn = collectElixirBtn;
        this.addChild(collectElixirBtn);
        collectElixirBtn.addClickEventListener(this.collect.bind(this));

        var collectDarkElixirBtn = ui.iconButton(100, 0, - 55, res.gui.collect_dark_elixir_icon, 'Collect');
        this._listBtn.push(collectDarkElixirBtn);
        this.collectDarkElixirBtn = collectDarkElixirBtn;
        this.addChild(collectDarkElixirBtn);
        collectDarkElixirBtn.addClickEventListener(this.collect.bind(this));

        var trainBtn = ui.iconButton(100, 0, - 55, res.gui.train_icon, 'Train');
        this._listBtn.push(trainBtn);
        this.trainBtn = trainBtn;
        this.addChild(trainBtn);
        trainBtn.addClickEventListener(this.train.bind(this));

        var selectLineBtn = ui.iconButton(100, 0, - 55, res.gui.select_line_icon, 'SelectLine');
        this._listBtn.push(selectLineBtn);
        this.selectLineBtn = selectLineBtn;
        this.addChild(selectLineBtn);
        selectLineBtn.addClickEventListener(this.selectLine.bind(this));

        var rotateBtn = ui.iconButton(100, 0, - 55, res.gui.rotate_icon, 'Rotate');
        this._listBtn.push(rotateBtn);
        this.rotateBtn = rotateBtn;
        this.addChild(rotateBtn);
        rotateBtn.addClickEventListener(this.rotate.bind(this));
        
        var clanBtn = ui.iconButton(100, 0, - 55, res.gui.clan_icon, 'Clan');
        this._listBtn.push(clanBtn);
        this.clanBtn = clanBtn;
        this.addChild(clanBtn);
        clanBtn.addClickEventListener(this.clan.bind(this));

        var requestTroopBtn = ui.iconButton(100, 0, - 55, res.gui.request_troop_icon, 'Request');
        this._listBtn.push(requestTroopBtn);
        this.requestTroopBtn = requestTroopBtn;
        this.addChild(requestTroopBtn);
        requestTroopBtn.addClickEventListener(this.requestTroop.bind(this));
    },
    onInfo: function() {
        if(MAP._targetedObject){
            var data = {_level: MAP._targetedObject._level, itemName:MAP._targetedObject._name};
            var popup = new ItemInfo(cc.winSize.width*3/4, cc.winSize.height*5.7/6, name.building[data.itemName].en + ' level ' + data._level, true, data);
            cc.director.getRunningScene().addChild(popup, 200);
        }
    },
    upgrade: function() {
        if (MAP._targetedObject._name === "WAL_1" && wallSelectingArray.length >= 2) {
            MAP._targetedObject.upgradeAllSelectingWall();
        } else MAP._targetedObject && MAP._targetedObject._status === 'complete' && createUpgradePopUp();
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
        //var researchPopUp = new ResearchPopUp();
        if (RESEARCH_GUI){
            RESEARCH_GUI.setVisible(true);
            RESEARCH_GUI.updateInfo();
        }
        else {
            var researchPopUp = new ResearchGUI();
            MAPSCENE.addChild(researchPopUp, 1000);
        }
    },
    collect: function() {
        cc.log('===========> COLLECT');
        MAP._targetedObject.onCollectResource();
        this.disableCollectorBtn();
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
    selectLine: function() {
        if (MAP._targetedObject) {
            MAP._targetedObject.selectLine();
            this.setUpValidBtn(MAP._targetedObject);
        }
    },
    rotate: function() {
        if (MAP._targetedObject) {
            MAP._targetedObject.rotate();
        }
    },
    clan: function() {
        CLAN_GUI.openAction();
    },
    requestTroop: function() {
        var popup = new RequestTroop(cc.winSize.width/2, cc.winSize.height/1.5, "Request troop from your clan ", false, null);
        cc.director.getRunningScene().addChild(popup, 200);
    },
    setUpValidBtn: function(object) {
        this.hideAll();
        this._listValidBtn = [];
        if (object instanceof Contruction) {
            this._listValidBtn.push(this.infoBtn);              // info đầu tiên
            if (
                object._status == 'complete'
                && object._name !== 'BDH_1'
            ) { // nếu trang thái hoàn thành thì thêm nút upgrade và các nút khác tùy tên
                if (!(object._name === 'LAB_1' && research_constant.troop)) this._listValidBtn.push(this.upgradeBtn);
                if (object._name == "LAB_1")  this._listValidBtn.push(this.researchBtn);
                if (object._name == "RES_1")  this._listValidBtn.push(this.collectGoldBtn);
                if (object._name == "RES_2")  this._listValidBtn.push(this.collectElixirBtn);
                if (object._name == "RES_3")  this._listValidBtn.push(this.collectDarkElixirBtn);
                if (object._name == "BAR_1")  this._listValidBtn.push(this.trainBtn);
                if (object._name == "WAL_1" && wallSelectingArray.length === 0)  this._listValidBtn.push(this.selectLineBtn);
                if (object._name == "WAL_1" && wallSelectingArray.length >= 2)  this._listValidBtn.push(this.rotateBtn);
            } else if (object._status == 'upgrade' || object._status == 'pending') {
                this._listValidBtn.push(this.cancelBtn);        // cancel tiếp theo
                this._listValidBtn.push(this.quickFinishBtn);   // quick finish
            }
            if (object._name == "CLC_1") {
                this._listValidBtn.push(this.clanBtn);
                var condition1 = gv.user.is_in_guild && ((getCurrentServerTime() - gv.user.lastRequestTroopTimeStamp) >= TIME_REQUEST_TROOP);
                var capacityGuild = getCurrentGuildCapacity();
                var capacityTroopGuild = getTotalCapacityTroopGuild();
                var condition2 = (capacityTroopGuild < capacityGuild);

                if(condition1){
                    cc.log("========================== condition1 true");
                }else{
                    cc.log("========================== condition1 false");
                    cc.log("=================== lastRequestTroopTimeStamp " + gv.user.lastRequestTroopTimeStamp);
                }

                if (condition1 && condition2) {
                    this._listValidBtn.push(this.requestTroopBtn);
                }
            }
        } else if (object instanceof Obstacle) {
            this._listValidBtn.push(this.removeBtn);
        }
        var size = cc.winSize;
        var len = this._listValidBtn.length;
        // var isOdd = false;
        // if (len % 2 == 1) isOdd = true;
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
    },
    disableCollectorBtn: function() {
        this.collectGoldBtn.setEnabled(false);
        this.collectElixirBtn.setEnabled(false);
        this.collectDarkElixirBtn.setEnabled(false);
    },
    enableCollectorBtn: function() {
        this.collectGoldBtn.setEnabled(true);
        this.collectElixirBtn.setEnabled(true);
        this.collectDarkElixirBtn.setEnabled(true);
    }
});

//var