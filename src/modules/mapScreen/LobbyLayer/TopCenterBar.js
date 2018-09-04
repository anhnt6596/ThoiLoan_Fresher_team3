var TopCenterBar = cc.Sprite.extend({
    ctor: function(x, y, type, userInfo) {
        this._super(res.gui.troophy_bg);
        this.x = x;
        this.y = y;
        this.type = type;
        this.scale = 1.25;
        var title;
        var leftIconRes;
        switch (type) {
            case 'builder':
                title = "Builder";
                value = userInfo.freeBuilder + '/' + userInfo.allBuilder;
                leftIconRes = res.gui.builder_icon;
                break;
            case 'army':
                title = "Army";
                value = getTotalCurrentTroopCapacity() + '/' + getTotalCapacityAMCs();
                leftIconRes = res.gui.army_icon;
                break;
            case 'shield':
                title = "Shield";
                value = "không";
                leftIconRes = res.gui.shield_icon;
                break;
            default:
            break;
        }
        var leftIcon = new cc.Sprite(leftIconRes);
        leftIcon.attr({
            x: 5,
            y: this.height / 2,
        });
        this.addChild(leftIcon);
        var titleP = new cc.LabelBMFont(title, res.font_soji[12]);
        titleP.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: this.width / 2,
            y: 25,
        });
        this.addChild(titleP);

        var valueP = new cc.LabelBMFont(value, res.font_soji[12]);
        this.valueP = valueP;
        valueP.attr({
            anchorX: 0.5,
            anchorY: 0, 
            x: this.width / 2,
            y: 6,
        });
        this.addChild(valueP);
    },
    update: function(userInfo) {
        var value;
        switch (this.type) {
            case 'builder':
                value = userInfo.freeBuilder + '/' + userInfo.allBuilder;;
                break;
            case 'army':
                value = getTotalCurrentTroopCapacity() + '/' + getTotalCapacityAMCs();
                break;
            case 'shield':
                value = "không";
                break;
            default:
                break;
        }
        this.valueP.setString(value);
    },
});