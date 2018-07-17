
var LOBBY = LOBBY || null;
var LobbyLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
        LOBBY = this;
        LOBBY = this;
        var size = cc.winSize;
        var yBtn = size.height/3;

        var btnShop = ui.iconButton(100, size.width - 55, 55, 'res/Art/GUIs/Main_Gui/shop.png', 'SHOP');
        this.addChild(btnShop);
        btnShop.addClickEventListener(this.onOpenShop.bind(this));

        // var btnShop = new TextButton(100, size.width - 55, 55, 'res/Art/GUIs/Main_Gui/shop.png', 'shop');
        // this.addChild(btnShop);

        var btnAttack = ui.iconButton(103, 55, 55, 'res/Art/GUIs/Main_Gui/attack.png', 'TẤN CÔNG');
        this.addChild(btnAttack);
        btnAttack.addClickEventListener(this.onAttack.bind(this));

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

        var avt = new TopCenterBar(100, size.width - 100);
        this.addChild(avt);
    },
    onOpenShop: function(){
        // fr.view(ShopScreen);
        var shopScreen = new ShopScreen(cc.winSize.width, cc.winSize.height, 0, 0, "SHOP", null, true);
        var shopScene = new cc.Scene();
        shopScene.addChild(shopScreen);
        cc.director.pushScene(shopScene);
    },
    onAttack: function() {
        MAP.buildNewContruction();
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
    }
});
