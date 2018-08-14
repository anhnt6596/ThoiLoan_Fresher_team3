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
        var btnShop = ui.iconButton(100, size.width - 55, 55, 'res/Art/GUIs/Main_Gui/shop.png', 'SHOP');
        this.addChild(btnShop);
        btnShop.addClickEventListener(this.onOpenShop.bind(this));

        var btnAttack = ui.iconButton(103, 55, 55, 'res/Art/GUIs/Main_Gui/attack.png', 'TẤN CÔNG');
        this.addChild(btnAttack);
        btnAttack.addClickEventListener(this.onAttack.bind(this));

        var btnSetting = ui.iconButton(60, size.width - 35, 135, 'res/Art/GUIs/Main_Gui/setting.png', '');
        this.addChild(btnSetting);
        btnSetting.addClickEventListener(this.onSetting.bind(this));

        var btnTreasure = ui.iconButton(60, size.width - 35, 195, 'res/Art/GUIs/Main_Gui/kho.png', '');
        this.addChild(btnTreasure);
        btnTreasure.addClickEventListener(this.onTreasure.bind(this));

        var btnGuild = ccui.Button('res/Art/GUIs/train_troop_gui/forward.png', 'res/Art/GUIs/train_troop_gui/forward.png');
        btnGuild.setPosition(btnGuild.width/2, size.height/2);
        btnGuild.addClickEventListener(this.onGuild.bind(this));
        this.addChild(btnGuild);
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
        var resource = { gold:0, elixir:0, darkElixir:0, coin:1000000 };
        _.extend(ReducedTempResources, resource);
        NETWORK.sendAddResource(0, 0, 0, 1000000);
        // NETWORK.sendGetTroopInfo();
    },
    onSetting: function () {
        var l = ["ARM_1", "ARM_1", "ARM_1", "ARM_1", "ARM_1", "ARM_2", "ARM_2", "ARM_3", "ARM_4"];
        var createNewTroop = function(type) {
            switch (type) {
                case "ARM_1":
                    var troop = new Warrior(armyCampRefs[0]);
                    break;
                case "ARM_2":
                    var troop = new Archer(armyCampRefs[0]);
                    break;
                case "ARM_3":
                    var troop = new Goblin(armyCampRefs[0]);
                    break;
                case "ARM_4":
                    var troop = new Giant(armyCampRefs[0]);
                    break;
                default:
                    break;
            }
            troop && troop.appear(MAP._targetedObject);
        };
        if (MAP._targetedObject) {
            var r = randomInt(0,8);
            createNewTroop(l[r]);
            //var troop = new Warrior(armyCampRefs[0]); // truyen vao object Army camp
            //troop.appear(MAP._targetedObject); // truyen vao nha bat dau de no chay ra nha army camp tuong ung, con k co dong nay thi no se xuat hien o AMC ben tren
        }
        // NETWORK.sendResearchTroop("ARM_1");
    },
    onTreasure: function() {
        //createSolidMapArray();
        //listTroopRefs.forEach(element => {
        //    element.moveTo(objectRefs[0]);
        //});
        // NETWORK.sendResearchComplete("ARM_1");
    },

    onGuild: function() {
        var bg = new ccui.Button('res/Art/GUIs/shop_gui/black.jpg');
        bg.setAnchorPoint(0, 0);
        bg.setScale(cc.winSize.width *3/5 / bg.width, cc.winSize.height / bg.height);
        bg.setColor(cc.color(0,255,0,255));
        bg.setZoomScale(0);
        this.getParent().addChild(bg, 20, 17);

        var layer = cc.LayerColor.create(cc.color(139,69,19, 128), bg.width, cc.winSize.height);
        layer.setAnchorPoint(0, 0);
        bg.addChild(layer);

        var prevBtn = new ccui.Button('res/Art/GUIs/train_troop_gui/previous.png', 'res/Art/GUIs/train_troop_gui/previous.png');
        prevBtn.setPosition(bg.x + bg.width*bg.scaleX + prevBtn.width/2 - 5, cc.winSize.height/2);
        prevBtn.addClickEventListener(this.onCloseGuild.bind(this));
        this.getParent().addChild(prevBtn, 21, 18);
    },

    onCloseGuild: function() {
        this.getParent().removeChildByTag(17);
        this.getParent().removeChildByTag(18);
    },

    hideLobby: function() {
        this.attr({
            x: - 100000,
            y: - 100000,
        });
    },
    showLobby: function() {
        this.attr({
            x: 0,
            y: 0,
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