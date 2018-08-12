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

        var grass = new cc.Sprite('res/Art/GUIs/upgrade_troop/icon/troop_bg.png');
        grass.setPosition(image.x, image.y - image.height/3);
        this.addChild(grass, 9);

        var barsInfo = this.showBars(itemName, level);
        barsInfo.setPosition(0, this._frame.height/5 * this._frame.scaleY);
        this.addChild(barsInfo, 10);

        var trainingTime = new cc.LabelBMFont("Training time: " + timeToReadable(config.troopBase[itemName].trainingTime), 'res/Art/Fonts/soji_20.fnt');
        trainingTime.setPosition(width/8, -1* height / 9);
        trainingTime.color = new cc.color(0, 255, 0, 255);
        this.addChild(trainingTime, 100);

        var housingSpace = new cc.LabelBMFont("Housing space: " + config.troopBase[itemName].housingSpace, 'res/Art/Fonts/soji_20.fnt');
        housingSpace.setPosition(trainingTime.x, -1 * height / 6);
        housingSpace.color = new cc.color(0, 255, 0, 255);
        this.addChild(housingSpace, 100);
    },
    
    showBars: function(itemName, level) {
        var infoArea = new cc.Node();
        var listInfo = ['damagePerAttack', 'hitpoints', 'trainingElixir'];
        //if(itemName == 'ARM_3'){
        //    listInfo.push('damagePerSecondOnResources');
        //}

        listInfo.forEach(function(element, i) {
            var icon;

            switch(element) {
                case 'damagePerAttack':
                    icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/DAMA_TROOP.png');
                    break;
                //case 'damagePerSecondOnResources':
                //    icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/DAMA_TROOP.png');
                //    break;
                case 'hitpoints':
                    icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/HP_TROOP.png');
                    break;
                case 'trainingElixir':
                    icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/TrainingCost_Icon.png');
                    break;
                default:

            }


            icon.attr({ y: - i * 40 });
            infoArea.addChild(icon);

            var infoBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
            infoBar.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBar, 0);

            var infoBarBG = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_BG.png');
            infoBarBG.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBarBG, 2);

            var troopConfig = config.troop[itemName];
            var curValue = troopConfig[level][element];
            var maxValue = troopConfig[objectSize(troopConfig)][element];

            infoBarBG.setTextureRect(cc.rect(0, 0, (curValue/maxValue) * infoBar.width, infoBar.height));

            var textInfo = cc.LabelBMFont(curValue, 'res/Art/Fonts/soji_12.fnt');
            textInfo.attr({ anchorX: 0, x: 35, y: - i * 40 });
            infoArea.addChild(textInfo, 5);
        });

        return infoArea;
    }

});
