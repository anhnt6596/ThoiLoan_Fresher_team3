
var MapLayer = cc.Layer.extend({
    ctor:function() {
        this._super();
        var test = cc.Sprite('res/Art/GUIs/Main_Gui/Demo.png');
        test.attr({
           x: 0,
           y: 0,
           anchorX: 0.5,
           anchorY: 0.5,
           scale: 1,
        });
        this.addChild(test);
        this.addTouchListener();
    },
    addTouchListener: function() {
        var self = this;
        if (self == null) return;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded,
        }, this);
    },
    onTouchBegan: function(touch, event) {
        cc.log(touch.getLocation().x);
        return true;
    },
    onTouchMoved: function(touch, event) {
        this.moveMap(touch);
    },
    moveMap: function(touch) {
        var delta = touch.getDelta();
        var curPos = cc.p(this.x, this.y);
        curPos = cc.pAdd(curPos, delta);
        // curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p((cc.winSize.width - 3054), (cc.winSize.height - 2100)));
        this.x = curPos.x;
        this.y = curPos.y;
        curPos = null;
    }
});
