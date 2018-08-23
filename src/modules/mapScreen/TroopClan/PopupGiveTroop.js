var PopupGiveTroop = ccui.Button.extend({
    ctor: function(){
        this._super('res/Art/Bang hoi/POPUP_0002_Layer-4.png');
        this.setPosition(LOBBY.width/2.5, LOBBY.height/2);
        this.setScaleX(3.5);
        this.setScaleY(3);
        this.setZoomScale(0);

        this.addClickEventListener(this.clickInside.bind(this));
        this.addEventListener();
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
        this.getParent().removeChild(this);
    },
    onTouchEnded: function(touch) {
        this.getParent().removeChild(this);
    },
    clickInside: function() {

    }
});