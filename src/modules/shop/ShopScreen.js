CATALOGY_WIDTH = 241;
CATALOGY_HEIGHT = 186;

var ShopScreen = Popup.extend({
    //_resInfo:null,
    //_close:null,
    _catalogyList:[],
    _catalogy:null,

    ctor:function(width, height, x, y, text, data, bool) {
        cc.log("-----------ctor ShopScreen-----------");
        this._super(width, height, x, y, text, data, bool);
        this.initCatalogy();
    },

    initCatalogy:function() {
        var gap_x = (cc.winSize.width - 3*CATALOGY_WIDTH)/4;
        var gap_y = (cc.winSize.height - this._resInfo.height - 2*CATALOGY_HEIGHT)/3;

        this.createCatalogy('type_buy_res');
        this.createCatalogy('type_res');
        this.createCatalogy('type_dc');
        this.createCatalogy('type_army');
        this.createCatalogy('type_defense');
        this.createCatalogy('type_sheild');

        for(var i = 0; i < this._catalogyList.length; i++){
            if(i < 3){
                this._catalogyList[i].x = (i+1)%4*gap_x + i%3*CATALOGY_WIDTH;
                this._catalogyList[i].y = 2*gap_y + CATALOGY_HEIGHT;
            }else{
                this._catalogyList[i].x = (i-2)*gap_x + (i-3)*CATALOGY_WIDTH;
                this._catalogyList[i].y = gap_y;
            }

            this.addChild(this._catalogyList[i], 3);
        }
    },

    switchToName:function(string){
        switch(string) {
            case "type_army":
                return "army";
            case "type_buy_res":
                return "treasures";
            case "type_dc":
                return "decorations";
            case "type_defense":
                return "defense";
            case "type_res":
                return "resources";
            case "type_sheild":
                return "shield";
            default:
                return false;
        }
    },

    createCatalogy:function(catalogyName){
        this._catalogy = new ccui.Button('res/Art/GUIs/shop_gui/slot_catalogy.png');
        this._catalogy.anchorX = 0;
        this._catalogy.anchorY = 0;

        var bg = new cc.Sprite('res/Art/GUIs/shop_gui/catalogy_bg.png');
        bg.anchorX = 0;
        bg.anchorY = 0;
        this._catalogy.addChild(bg, 1, 1);

        var ha = new cc.Sprite('res/Art/GUIs/shop_gui/' + catalogyName + '.png');
        ha.anchorX = 0;
        ha.anchorY = 0;
        this._catalogy.addChild(ha, 2, 2);

        var titleBg = new cc.Sprite('res/Art/GUIs/shop_gui/title_background.png');
        titleBg.anchorX = 0;
        titleBg.anchorY = 0;
        titleBg.x = this._catalogy.x + 6;
        this._catalogy.addChild(titleBg, 3, 3);

        var name = new cc.LabelTTF(this.switchToName(catalogyName).toUpperCase(), "Arial", 20);
        name.anchorX = 0;
        name.anchorY = 0;
        name.x = titleBg.x + (CATALOGY_WIDTH-name.width)/2;
        name.y = titleBg.y + (titleBg.height-name.height)/2;
        this._catalogy.addChild(name, 4, 4);

        var self = this;

        var listener = cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {

            },
            onMouseUp: function (event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(event.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    var shopCatalogyScreen = new ShopCatalogyScreen(cc.winSize.width, cc.winSize.height, 0, 0, self.switchToName(catalogyName).toUpperCase(), null, true);
                    var scene = new cc.Scene();
                    scene.addChild(shopCatalogyScreen);
                    cc.director.pushScene(scene);
                }
            }
        });
        cc.eventManager.addListener(listener, this._catalogy);


        this._catalogyList.push(this._catalogy);
        this._catalogy.retain();
    },

    onEnter:function(){
        cc.log("-----------onEnter ShopScreen-----------");
        this._super();
    },

    onExit:function(){
        cc.log("-----------onExit ShopScreen-----------");
        this._super();
    }
});