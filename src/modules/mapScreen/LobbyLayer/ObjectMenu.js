var ObjectMenu = cc.Node.extend({
    ctor: function() {
        this._super();
        this.init();
        this.attr({
            anchorX: 0.5,
            anchorY: 0,
            y: -200,
        });
    },
    init: function() {
        var size = cc.winSize;
        var upgradeBtn = ui.iconButton(100, size.width / 2, 55, 'res/Art/GUIs/Action_Building_Icon/upgrade_icon.png', 'Upgrade');
        this.addChild(upgradeBtn);
        upgradeBtn.addClickEventListener(this.upgrade.bind(this));
    },
    upgrade: function() {
        // MAP._targetedObject && MAP._targetedObject.upgrade();
        MAP._targetedObject && MAP._targetedObject._status === 'complete' && createUpgradePopUp();
    },
});