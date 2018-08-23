var PopupGiveTroop = ccui.Button.extend({
    listTroopTag:[],

    ctor: function(idUserGet){
        this._super('res/Art/Bang hoi/POPUP_0002_Layer-4.png');
        this.setPosition(LOBBY.width/2.5, LOBBY.height/2);
        this.setScaleX(3);
        this.setScaleY(2);
        this.setZoomScale(0);

        this.init(idUserGet);

        this.addClickEventListener(this.clickInside.bind(this));
        this.addEventListener();
    },

    init: function(idUserGet) {
        var j = 1;
        for(var i in troopInfo) {
            var item = troopInfo[i];
            if(item.population > 0){
                var troop = new TroopGive(item.type);
                troop.setAnchorPoint(0, 0);
                troop.setPosition(this.x - 2.7 * troop.width + troop.width * j, this.y);
                troop.setScale(1);
                troop.idUserGet = idUserGet;
                troop.level = item.level;
                troop.type = item.type;
                troop.tagTroopGive = j;
                troop.addClickEventListener(this.giveTroop.bind(troop));
                cc.director.getRunningScene().addChild(troop, 2223, j);
                this.listTroopTag.push(j);
                j++;
            }
        }
    },

    giveTroop: function() {
        if(troopInfo[this.type].population <= 0){
            return;
        }

        temp.idUserGetTroop = this.idUserGet;
        temp.typeTroopGive = this.type;
        temp.tagTroopGive = this.tagTroopGive;
        NETWORK.sendGiveTroop(this.idUserGet, this.type, this.level);
    },

    addEventListener: function() {
        this.listener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);
    },
    onTouchBegan: function(touch) {
        return true;
    },
    onTouchMoved: function(touch) {

    },
    onTouchEnded: function(touch) {
        for(var i in this.listTroopTag){
            cc.log("=================== REMOVE: " + i);

            var child = cc.director.getRunningScene().getChildByTag(this.listTroopTag[i]);
            if(child){
                child.retain();
            }

            cc.director.getRunningScene().removeChildByTag(this.listTroopTag[i]);

        }
        this.getParent().removeChild(this);
    },
    clickInside: function() {

    },

    removeAll: function() {
        for(var i in this.listTroopTag){
            cc.log("=================== REMOVE: " + i);

            var child = cc.director.getRunningScene().getChildByTag(this.listTroopTag[i]);
            if(child){
                child.retain();
            }

            cc.director.getRunningScene().removeChildByTag(this.listTroopTag[i]);

        }
        this.getParent().removeChild(this);
    }
});