var ShopScreen = Popup.extend({

    _catalogyList:[],
    _catalogy:null,
    _obj:null,

    ctor:function(width, height, text, data, bool) {
        cc.log("-----------ctor ShopScreen-----------");
        this._super(width, height, text, data, bool);
        //this._obj = JSON.parse(shopInfo);
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
                return "Army";
            case "type_buy_res":
                return "Treasures";
            case "type_dc":
                return "Decorations";
            case "type_defense":
                return "Defense";
            case "type_res":
                return "Resources";
            case "type_sheild":
                return "Shield";
            default:
                return false;
        }
    },

    createCatalogy:function(catalogyName){
        this._catalogy = new cc.Sprite('res/Art/GUIs/shop_gui/slot_catalogy.png');
        this._catalogy.setAnchorPoint(0, 0);

        var bg = new cc.Sprite('res/Art/GUIs/shop_gui/catalogy_bg.png');
        bg.setAnchorPoint(0, 0);
        this._catalogy.addChild(bg, 1, 1);

        var ha = new cc.Sprite('res/Art/GUIs/shop_gui/' + catalogyName + '.png');
        ha.setAnchorPoint(0, 0);
        this._catalogy.addChild(ha, 2, 2);

        var titleBg = new cc.Sprite('res/Art/GUIs/shop_gui/title_background.png');
        titleBg.setAnchorPoint(0, 0);
        titleBg.x = this._catalogy.x + 6;
        this._catalogy.addChild(titleBg, 3, 3);

        var name = new cc.LabelBMFont(this.switchToName(catalogyName).toUpperCase(), 'res/Art/Fonts/soji_20.fnt');
        //name.scale = 0.8;
        name.setAnchorPoint(0, 0);
        name.x = titleBg.x + (CATALOGY_WIDTH-name.width)/2;
        name.y = titleBg.y + (titleBg.height-name.height)/2;
        this._catalogy.addChild(name, 4, 4);

        var self = this;
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {
                    var shopCatalogyScreen = new ShopCatalogyScreen(cc.winSize.width, cc.winSize.height, self.switchToName(catalogyName), null, true);
                    var scene = new cc.Scene();
                    scene.addChild(shopCatalogyScreen, 0, 17);
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