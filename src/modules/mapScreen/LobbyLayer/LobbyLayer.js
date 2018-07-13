
var LobbyLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
        var size = cc.winSize;
        var yBtn = size.height/3;

        var btnShop = ui.iconButton(100, size.width - 55, 55, 'res/Art/GUIs/Main_Gui/shop.png', 'shop');
        this.addChild(btnShop);
        btnShop.addClickEventListener(this.onOpenShop.bind(this));

        // var btnShop = new TextButton(100, size.width - 55, 55, 'res/Art/GUIs/Main_Gui/shop.png', 'shop');
        // this.addChild(btnShop);

        var btnAttack = ui.iconButton(103, 55, 55, 'res/Art/GUIs/Main_Gui/attack.png', 'Tấn công');
        this.addChild(btnAttack);
        btnAttack.addClickEventListener(this.onAttack.bind(this));

        var goldBar = new ResourceBar(size.width - 118, size.height - 40, 'gold');
        this.addChild(goldBar);
        var elixirBar = new ResourceBar(size.width - 118, size.height - 100, 'elixir');
        this.addChild(elixirBar);
        var darkElixirBar = new ResourceBar(size.width - 118, size.height - 160, 'dark_elixir');
        this.addChild(darkElixirBar);
    },
    onOpenShop: function(){
        fr.view(ShopScreen);
    },
    onAttack: function() {},
});
