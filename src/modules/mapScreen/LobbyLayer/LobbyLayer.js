var LOBBY = LOBBY || null;
var LobbyLayer = cc.Layer.extend({
    ctor:function(userInfo) {
        this._super();
        this.userInfo = userInfo;
        LOBBY = this;
    
        this.init();
    },
    init: function() {
        this.initBar();
        this.initButton();
        this.initObjectMenu();
    },
    initButton: function() {
        var size = cc.winSize;
        var btnShop = ui.iconButton(100, size.width - 55, 55, res.gui.shop_icon, 'SHOP');
        this.addChild(btnShop);
        btnShop.addClickEventListener(this.onOpenShop.bind(this));

        var btnAttack = ui.iconButton(103, 55, 55, res.gui.attack_icon, 'TẤN CÔNG');
        this.addChild(btnAttack);
        btnAttack.addClickEventListener(this.onAttack.bind(this));

        var btnSetting = ui.iconButton(60, size.width - 35, 135, res.gui.setting_icon, '');
        this.addChild(btnSetting);
        btnSetting.addClickEventListener(this.onSetting.bind(this));

        var btnTreasure = ui.iconButton(60, size.width - 35, 195, res.gui.treasure_icon, '');
        this.addChild(btnTreasure);
        btnTreasure.addClickEventListener(this.onTreasure.bind(this));

        var levelGuild = getLevelGuildBuilding();
        if(levelGuild > 0){
            var btnGuild = ccui.Button('res/Art/GUIs/Chat/button chinh.png', 'res/Art/GUIs/Chat/button chinh.png');
            btnGuild.setPosition(btnGuild.width/2, size.height/2);
            btnGuild.addClickEventListener(this.onInteractiveGuild.bind(this));
            this.addChild(btnGuild);
        }

    },
    initBar: function() {
        var size = cc.winSize;
        // Resource Bar
        var goldBar = new ResourceBar(size.width - 118, size.height - 40, 'gold', this.userInfo);
        this.goldBar = goldBar;
        this.addChild(goldBar);
        var elixirBar = new ResourceBar(size.width - 118, size.height - 100, 'elixir', this.userInfo);
        this.elixirBar = elixirBar;
        this.addChild(elixirBar);
        var darkElixirBar = new ResourceBar(size.width - 118, size.height - 160, 'dark_elixir', this.userInfo);
        this.darkElixirBar = darkElixirBar;
        this.addChild(darkElixirBar);
        var gBar = new GBar(size.width - 106, size.height - 210, this.userInfo.coin);
        this.gBar = gBar;
        this.addChild(gBar);
        // Top Center Bar
        var ArmyBar = new TopCenterBar(size.width / 2 - 150, size.height - 40, 'army', this.userInfo);
        this.ArmyBar = ArmyBar;
        this.addChild(ArmyBar);
        var BuilderBar = new TopCenterBar(size.width / 2, size.height - 40, 'builder', this.userInfo);
        this.BuilderBar = BuilderBar;
        this.addChild(BuilderBar);
        var ShieldBar = new TopCenterBar(size.width / 2 + 150, size.height - 40, 'shield', this.userInfo);
        this.ShieldBar = ShieldBar;
        this.addChild(ShieldBar);

        var topLeftBar = new TopLeftBar(50, size.height - 75, this.userInfo);
        this.topLeftBar = topLeftBar;
        this.addChild(topLeftBar);
    },
    initObjectMenu: function() {
        var size = cc.winSize;
        var objectMenu = new ObjectMenu();
        this.objectMenu = objectMenu;
        this.addChild(objectMenu);
    },
    onOpenShop: function(){
        // fr.view(ShopScreen);
        var shopScreen = new ShopScreen(cc.winSize.width, cc.winSize.height, "SHOP", null, true);
        var shopScene = new cc.Scene();
        shopScene.addChild(shopScreen);
        cc.director.pushScene(shopScene);
    },
    onAttack: function() {
        var resource = { gold:10000, elixir:0, darkElixir:0, coin:100000 };
        _.extend(ReducedTempResources, resource);
        NETWORK.sendAddResource(10000, 0, 0, 100000);
        // NETWORK.sendGetTroopInfo();
    },
    onSetting: function () {
        SETTING_GUI.openAction();
        // CLAN_GUI.openAction();
    },
    onTreasure: function() {
        //createSolidMapArray();
        //listTroopRefs.forEach(element => {
        //    element.moveTo(objectRefs[0]);
        //});
        // NETWORK.sendResearchComplete("ARM_1");
        // donateTroopShowAnims("ARM_1");
        // receiveTroopShowAnims("ARM_2", 4);
    },

    onInteractiveGuild: function(isAni = true) {
        cc.log("=============== MO MESSAGE BOX o LOBBY ===========");
        var messLayer = new MessageGUI();
        messLayer.setAnchorPoint(0, 0);
        messLayer.setPosition(-1000, 0);
        this.messLayer = messLayer;
        cc.director.getRunningScene().addChild(messLayer, 17, 17);

        if(isAni){
            var showAct = cc.moveTo(0.25, cc.p(0, 0));
            messLayer.runAction(showAct);
        }

    },

    hideLobby: function() {
        this.attr({
            x: - 100000,
            y: - 100000
        });
    },
    showLobby: function() {
        this.attr({
            x: 0,
            y: 0
        });
    },
    showObjectMenu: function(object) {
        this.objectMenu.setUpValidBtn(object);
        var showAct = cc.moveTo(0.2, cc.p(0, 0));
        var fadeInAct = cc.FadeIn(0.2);
        this.objectMenu.stopAllActions();
        this.objectMenu.attr({ y: -200, opacity: 0 });
        this.objectMenu.runAction(showAct);
        this.objectMenu.runAction(fadeInAct);

        // set ko disable mac dinh
        this.objectMenu.enableCollectorBtn();

        // disable mot so button o day nhe'
        var tartgetedObj = MAP._targetedObject;
        //console.log("san luong = " +tartgetedObj.productivity.sanluong);

        if (tartgetedObj instanceof CollectorBuilding && tartgetedObj.productivity && tartgetedObj.productivity.sanluong < 1){
            this.objectMenu.disableCollectorBtn();
        }
        //this.objectMenu.collectGoldBtn.setBright(false);
        //this.objectMenu.collectGoldBtn.setOpacity(100);
    },
    hideObjectMenu: function(object) {
        var hideAct = cc.moveTo(0.2, cc.p(0, -200));
        var fadeOutAct = cc.FadeOut(0.2);
        // this.objectMenu.stopAllActions();
        this.objectMenu.runAction(hideAct);
        this.objectMenu.runAction(fadeOutAct);
    },
    update: function(userInfo) {
        this.gBar.update(userInfo);
        this.goldBar.update(userInfo);
        this.elixirBar.update(userInfo);
        this.darkElixirBar.update(userInfo);
        this.ArmyBar.update(userInfo);
        this.BuilderBar.update(userInfo);
        this.ShieldBar.update(userInfo);
    },
});

var changeValueTextEffect = function(obj, newValue) {
    var timeTick = 27;
    var oldValueStr = obj.getString();
    var oldValue = formatNumberToNumber(oldValueStr);
    cc.log("oldValue: " + oldValue);
    // giá trị không đổi thì thôi
    if (oldValue == newValue) return;
    // nếu thay đổi ít quá thì giảm hiệu ứng
    if (Math.abs(oldValue - newValue) < timeTick) timeTick = Math.abs(oldValue - newValue);
    // thay đổi trên mỗi lần nhảy số
    var changePerTick = ((newValue - oldValue) / timeTick).toFixed(0);
    var curText = parseInt(oldValue);
    var count = 0;
    obj.setScale(1.05);
    var tick = function() {
        setTimeout(function() {
            curText += parseInt(changePerTick);
            obj.setString(formatNumber(curText));
            count += 1;
            if (count >= timeTick) {
                obj.setString(formatNumber(newValue));
                obj.setScale(1);
            } else {
                tick();
            }
        }, 20);
    };
    tick();
};

var formatNumberToNumber = function(str) {
    var result = str;
    result = result.replace(",", "");
    result = result.replace(",", "");
    result = result.replace(",", "");
    result = result.replace(",", "");
    cc.log("result: "  + result);
    return parseInt(result);
};