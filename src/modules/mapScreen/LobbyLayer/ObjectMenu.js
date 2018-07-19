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
        var titleText = new cc.LabelBMFont('Nâng cấp đi', 'res/Art/Fonts/soji_24.fnt');
        titleText.attr({
            x: 0,
            y: 0,
            scale: 1.5,
        });
        var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
        acceptBtn.attr({
            x: 0,
            y: -100,
        });
        var content = [
            titleText,
            acceptBtn,
        ];
        var upgradePopUp = new ui.PopUp('Nâng cấp', content, acceptBtn);
        MAPSCENE.addChild(upgradePopUp, 1000);
        acceptBtn.addClickEventListener(() => {
            MAP._targetedObject && MAP._targetedObject.upgrade();
            upgradePopUp.close();
        });
    },
});