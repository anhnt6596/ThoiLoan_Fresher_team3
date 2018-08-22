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
        btnGuild.addClickEventListener(this.onInteractiveGuild.bind(this));
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
        var resource = { gold:1000, elixir:0, darkElixir:0, coin:1000000 };
        _.extend(ReducedTempResources, resource);
        NETWORK.sendAddResource(1000, 0, 0, 1000000);
        // NETWORK.sendGetTroopInfo();
    },
    onSetting: function () {
        CLAN_GUI.openAction();
    },
    onTreasure: function() {
        //createSolidMapArray();
        //listTroopRefs.forEach(element => {
        //    element.moveTo(objectRefs[0]);
        //});
        // NETWORK.sendResearchComplete("ARM_1");
    },

    onInteractiveGuild: function() {
        var size = cc.winSize;
        var bg = new ccui.Button('res/Art/GUIs/shop_gui/black.jpg');
        bg.setAnchorPoint(0, 0);
        bg.setScale(cc.winSize.width *3/5 / bg.width, cc.winSize.height / bg.height);
        bg.setColor(cc.color(0,255,0,255));
        bg.setZoomScale(0);
        this.getParent().addChild(bg, 20, 17);

        var layer = cc.LayerColor.create(cc.color(139,69,19, 128), bg.width, cc.winSize.height);
        layer.setAnchorPoint(0, 0);
        bg.addChild(layer);


        var textField = cc.EditBox.create(cc.size(size.width*1.5/5, size.height/10),"res/Art/GUIs/Main_Gui/login/bg_text.png");
        textField.setPosition(textField.width/2, size.height - textField.height/2);
        textField.setPlaceHolder("  uuid");
        this.getParent().addChild(textField, 1111, 21);

        var btnSend = gv.commonButton(size.width*0.5/5, size.height/10 - 5, textField.x + textField.width/2 + 60, textField.y, "Send");
        this.getParent().addChild(btnSend, 1111, 22);


        var messageScrollView = this.createMessageScroll();
        this.getParent().addChild(messageScrollView, 100, 19);

        var memberScrollView = this.createMemberScroll();
        this.getParent().addChild(memberScrollView, 101, 20);

        var prevBtn = new ccui.Button('res/Art/GUIs/train_troop_gui/previous.png', 'res/Art/GUIs/train_troop_gui/previous.png');
        prevBtn.setPosition(bg.x + bg.width*bg.scaleX + prevBtn.width/2 - 5, cc.winSize.height/2);
        prevBtn.addClickEventListener(this.onCloseInteractiveGuild.bind(this));
        this.getParent().addChild(prevBtn, 21, 18);
    },

    onCloseInteractiveGuild: function() {
        this.getParent().removeChildByTag(17);
        this.getParent().removeChildByTag(18);
        this.getParent().removeChildByTag(19);
        this.getParent().removeChildByTag(20);
        this.getParent().removeChildByTag(21);
        this.getParent().removeChildByTag(22);
    },

    createMessageScroll: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(cc.winSize.width*2/5, cc.winSize.height));
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        //scrollView.setPropagateTouchEvents(false);


        for(var i = 0; i < 30; i++){
            var nodeContainer = new ccui.Widget();
            nodeContainer.setPosition(0, 0);
            scrollView.addChild(nodeContainer);

            //var amountLabel = new cc.LabelBMFont('Message thu ' + i, 'res/Art/Fonts/soji_20.fnt');
            //var amountLabel = new cc.LabelBMFont('Message thu ' + i, 'res/Art/Fonts/fista_20_non.fnt');
            var amountLabel = new cc.LabelBMFont('adefafkiamadefafkiamadefafkiamadefafkiamadefafki ' + i, 'res/Art/Fonts/fista_20_non.fnt');
            amountLabel.setAnchorPoint(0, 0);
            amountLabel.setPosition(10, 100*i + 10);
            nodeContainer.addNode(amountLabel);


            var btn = new ccui.Button('res/Art/GUIs/Main_Gui/setting.png', 'res/Art/GUIs/Main_Gui/setting.png');
            btn.setAnchorPoint(0, 0);
            btn.setPosition(50, amountLabel.y - btn.height - 5);
            nodeContainer.addNode(btn);

            //scrollView.addChild(amountLabel);
        }

        scrollView.setInnerContainerSize(cc.size(scrollView.width, 30 * 100));
        return scrollView;


    },

    createMemberScroll: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(cc.winSize.width/5, cc.winSize.height));
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(cc.winSize.width*2/5, 0);
        //scrollView.setPropagateTouchEvents(false);

        for(var i = 0; i < 20; i++){
            var amountLabel = new cc.LabelBMFont('Member thu ' + i, 'res/Art/Fonts/soji_12.fnt');
            amountLabel.setAnchorPoint(0, 0);
            amountLabel.setPosition(10, 50*i + 10);
            scrollView.addChild(amountLabel);
        }

        scrollView.setInnerContainerSize(cc.size(scrollView.width, 20 * 50));
        return scrollView;
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