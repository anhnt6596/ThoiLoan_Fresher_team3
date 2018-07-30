var ItemInfo = TinyPopup.extend({

    ctor:function(width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
        this.showInfoItem(width, height, listener.itemName, listener._level);
    },

    showInfoItem:function(width, height, itemName, level){
        var image = this.showImage(itemName, level);
        image.setPosition(-1*this._frame.width/3.5 * this._frame.scaleX, this._frame.height/7 * this._frame.scaleY);
        this.addChild(image, 10);

        var buildingInfo = this.showbuildingInfo(itemName, level);
        buildingInfo.setPosition(0, this._frame.height/5 * this._frame.scaleY);
        this.addChild(buildingInfo, 10);


        //Duoi co nen trang chua intro, 1 so nha co hinh anh cua cac loai item dc mo khoa
        var bgUnder = new cc.Sprite('res/Art/GUIs/Main_Gui/login/bg.png');
        bgUnder.scaleX = (this._frame.width*this._frame.scaleX - 20) / bgUnder.width;
        bgUnder.scaleY = this._frame.height*this._frame.scaleY/2 / bgUnder.height;
        bgUnder.setPosition(0, -1*this._frame.height/4 * this._frame.scaleY);
        this.addChild(bgUnder, 10);
    },


    showImage:function(itemName, level){
        var widthBuilding = config.building[itemName][1].width;
        var content = new cc.Sprite();
        var grass = new cc.Sprite(res.map.grass[widthBuilding]);
        grass.attr({
            scale: 2
        });
        var buildingImg;

        switch (itemName) {
            case 'TOW_1':
                buildingImg = new cc.Sprite(res.building.townhall[level]);

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'AMC_1':
                buildingImg = new cc.Sprite(res.building.army_camp[level]);
                var buildingAnim = ui.makeAnimation('armycam_1_', 0, 4, 0.2);
                var animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2 + 3,
                    y: buildingImg.height / 2 + 38,
                });
                animSprite.runAction(buildingAnim.repeatForever());
                break;
            case 'BAR_1':
                buildingImg = new cc.Sprite(res.building.barrack[level]);
                if (level >= 4) {
                    var animsDir = level <= 8 ? 'BAR_1_' + level + '_effect_' : 'BAR_1_8_effect_';
                    var buildingAnim = ui.makeAnimation(animsDir, 0, 5, 0.2);
                    var animSprite = new cc.Sprite();
                    buildingImg.addChild(animSprite, 11);
                    animSprite.attr({
                        x: buildingImg.width / 2,
                        y: buildingImg.height / 2
                    });
                    animSprite.runAction(buildingAnim.repeatForever());
                }

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'RES_1':
                buildingImg = new cc.Sprite(res.building.gold_mine[level]);

                var goldmineAnim = ui.makeAnimation('RES_1_' + level + '_effect_', 0, 9, 0.2);
                var animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2,
                    y: buildingImg.height / 2
                });
                animSprite.runAction(goldmineAnim.repeatForever());

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'RES_2':
                buildingImg = new cc.Sprite(res.building.elixir_collector[level]);

                var elixirCollectorAnim = ui.makeAnimation('RES_2_' + level + '_effect_', 0, 9, 0.2);
                var animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2,
                    y: buildingImg.height / 2
                });
                animSprite.runAction(elixirCollectorAnim.repeatForever());

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'STO_1':
                buildingImg = new cc.Sprite(res.building.gold_storage[level][3]);

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'STO_2':
                buildingImg = new cc.Sprite(res.building.elixir_storage[level][3]);

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);

                var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            default:
                buildingImg = new cc.Sprite(res.building.army_camp[level]);
                break;
        }

        content.addChild(grass, 4);
        content.addChild(buildingImg, 6);
        content.setScale(3.5 / widthBuilding);
        return content;
    },


    showbuildingInfo:function(itemName, level) {
        var infoArea = new cc.Node();
        var listInfo = [];
        switch (itemName) {
            case 'AMC_1':
                listInfo.push('capacity');
                listInfo.push('hitpoints');
                break;
            case 'BAR_1':
                listInfo.push('hitpoints');
                break;
            case 'STO_1':
            case 'STO_2':
                listInfo.push('capacity');
                listInfo.push('hitpoints');
                break;
            case 'RES_1':
            case 'RES_2':
                listInfo.push('productivity');
                listInfo.push('capacity');
                listInfo.push('hitpoints');
                break;
            case 'TOW_1':
                listInfo.push('capacityGold');
                listInfo.push('capacityElixir');
                listInfo.push('capacityDarkElixir');
                listInfo.push('hitpoints');
                break;
            default:
                break;
        }
        listInfo.forEach(function(element, i) {
            var dirName = element == 'capacity' ? capacityforeachbuilding[itemName] : element;
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
