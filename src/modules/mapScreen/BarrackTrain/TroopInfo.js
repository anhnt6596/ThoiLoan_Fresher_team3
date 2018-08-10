var TroopInfo = TinyPopup.extend({

    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showInfoItem(width, height, data.itemName, data._level);
    },

    showInfoItem:function(width, height, itemName, level){
        var dir = 'res/Art/GUIs/upgrade_troop/icon/';

        var image = new cc.Sprite(dir + itemName + '_' + level + '.png');
        image.setPosition(-1*this._frame.width/3.5 * this._frame.scaleX, this._frame.height/7 * this._frame.scaleY);
        this.addChild(image, 10);

        var grass = new cc.Sprite('res/Art/GUIs/upgrade_troop/small_icon/troop_bg.png');
        grass.setScale(3);
        grass.setPosition(image.x, image.y - image.height/3);
        this.addChild(grass, 9);

        //var barsInfo = this.showBars(itemName, level);
        //barsInfo.setPosition(0, this._frame.height/5 * this._frame.scaleY);
        //this.addChild(barsInfo, 10);
    },
    
    showBars: function(itemName, level) {
        var infoArea = new cc.Node();
        var listInfo = ['damage', 'hitpoint', 'cost'];

        listInfo.forEach(function(element, i) {
            var dirName = element == 'damage' ? capacityforeachbuilding[itemName] : element;
            var dirName = element == 'productivity' ? productforeachbuilding[itemName] : dirName;
            var icon = new cc.Sprite(icons[dirName]);
            icon.attr({ y: - i * 40 });
            infoArea.addChild(icon);

            var infoBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
            infoBar.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBar, 0);

            var infoBarBG = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_BG.png');
            infoBarBG.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBarBG, 2);

            var buildingConfig = config.building[itemName];
            var curValue = buildingConfig[level][element];
            var maxValue = buildingConfig[objectSize(buildingConfig)][element];
            cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', objectSize(buildingConfig));

            infoBarBG.setTextureRect(cc.rect(0, 0, (curValue/maxValue) * infoBar.width, infoBar.height));

            var textInfo = cc.LabelBMFont(curValue, 'res/Art/Fonts/soji_12.fnt');
            textInfo.attr({ anchorX: 0, x: 35, y: - i * 40 });
            infoArea.addChild(textInfo, 5);
        });
        return infoArea;
    }

});
