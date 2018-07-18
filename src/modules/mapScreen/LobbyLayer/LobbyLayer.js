var LOBBY = LOBBY || null;
var LobbyLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
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

    },
    initBar: function() {
        var size = cc.winSize;
        // Resource Bar
        var goldBar = new ResourceBar(size.width - 118, size.height - 40, 'gold');
        this.addChild(goldBar);
        var elixirBar = new ResourceBar(size.width - 118, size.height - 100, 'elixir');
        this.addChild(elixirBar);
        var darkElixirBar = new ResourceBar(size.width - 118, size.height - 160, 'dark_elixir');
        this.addChild(darkElixirBar);
        // Top Center Bar
        var ArmyBar = new TopCenterBar(size.width / 2 - 150, size.height - 40, 'army');
        this.addChild(ArmyBar);
        var BuilderBar = new TopCenterBar(size.width / 2, size.height - 40, 'builder');
        this.addChild(BuilderBar);
        var ShieldBar = new TopCenterBar(size.width / 2 + 150, size.height - 40, 'shield');
        this.addChild(ShieldBar);

        var topLeftBar = new TopLeftBar(50, size.height - 75);
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
        var shopScreen = new ShopScreen(cc.winSize.width, cc.winSize.height, 0, 0, "SHOP", null, true);
        var shopScene = new cc.Scene();
        shopScene.addChild(shopScreen);
        cc.director.pushScene(shopScene);
    },
    onAttack: function() {
        //
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
    showObjectMenu: function(object = {}) {
        var showAct = cc.moveTo(0.2, cc.p(0, 0));
        var fadeInAct = cc.FadeIn(0.2);
        this.objectMenu.stopAllActions();
        this.objectMenu.runAction(showAct);
        this.objectMenu.runAction(fadeInAct);
    },
    hideObjectMenu: function(object) {
        var hideAct = cc.moveTo(0.2, cc.p(0, -200));
        var fadeOutAct = cc.FadeOut(0.2);
        this.objectMenu.stopAllActions();
        this.objectMenu.runAction(hideAct);
        this.objectMenu.runAction(fadeOutAct);
    },
});
