var ItemInfo = TinyPopup.extend({

    ctor:function(width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
        this.showInfoItem(width, height, listener.itemName, listener.level);
    },

    showInfoItem:function(width, height, itemName, level){
        //Tren chiem 1/2 chieu cao ben trong cua popup
        //Trai co hinh anh
        //var img = new cc.Sprite(this.getImagePath(itemName, level));
        //img.scaleX = width / 3 / img.width;
        //img.scaleY = height*2 / 5.5 / img.height;
        //img.setAnchorPoint(0, 0);
        //img.setPosition(this._frame.x + 30, this._frame.y + width/2 - img.height*img.scaleY/2);
        ////img.setPosition(this._frame.x + 30, this._frame.y + width/2);
        //this.addChild(img, 100);
        //
        //var grass = new cc.Sprite(res.map.grass[config.building[itemName][1].width]);
        //grass.setAnchorPoint(0, 0);
        //grass.setPosition(img.x, img.y);
        //grass.scaleX = img.width*img.scaleX / grass.width;
        //grass.scaleY = img.height*img.scaleY / grass.height;
        //this.addChild(grass, 99);

        var image = this.showImage(itemName, level);
        image.setAnchorPoint(0, 0);
        image.setPosition(this._frame.x + image.width*image.scaleX + 200, this._frame.y + height*2/3);
        this.addChild(image, 10);

        var buildingInfo = this.showbuildingInfo(itemName, level);
        buildingInfo.setAnchorPoint(0, 0);
        buildingInfo.setPosition(image.x + image.width*image.scaleX + 250, this._frame.y + height*3/4);
        this.addChild(buildingInfo, 10);



        //Phai co tu 1 toi 4 thanh:
        var listBars = [];
        //Neu la nha nao thi push cac thanh cua nha do vao mang


        //Duoi co nen trang chua intro, 1 so nha co hinh anh cua cac loai item dc mo khoa
        var bgUnder = new cc.Sprite('res/Art/GUIs/Main_Gui/login/bg.png');
        bgUnder.scaleX = (this._frame.width*this._frame.scaleX - 20) / bgUnder.width;
        bgUnder.scaleY = this._frame.height*this._frame.scaleY/2 / bgUnder.height;
        bgUnder.setAnchorPoint(0, 0);
        bgUnder.setPosition(this._frame.x + 10, this._frame.y + 15);
        this.addChild(bgUnder, 10);

    },


    showImage:function(itemName, level){
        var widthBuilding = config.building[itemName][1].width;
        var content = new cc.Sprite();
        var grass = new cc.Sprite(res.map.grass[widthBuilding]);
        grass.attr({
            scale: 2,
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
                        y: buildingImg.height / 2,
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
                    y: buildingImg.height / 2,
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
                    y: buildingImg.height / 2,
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
        listInfo.forEach((element, i) => {
            var dirName = element == 'capacity' ? capacityforeachbuilding[itemName] : element;
            var dirName = element == 'productivity' ? productforeachbuilding[itemName] : dirName;
            var icon = new cc.Sprite(icons[dirName]);
            icon.attr({ y: - i * 40 });
            infoArea.addChild(icon);

            var infoBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
            infoBar.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBar, 0);

            //var infoBarNext = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
            //infoBarNext.attr({ anchorX: 0, x: 30, y: - i * 60 });
            //infoArea.addChild(infoBarNext, 1);

            var infoBarBG = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_BG.png');
            infoBarBG.attr({ anchorX: 0, x: 30, y: - i * 40 });
            infoArea.addChild(infoBarBG, 2);

            var buildingConfig = config.building[itemName];
            var curValue = buildingConfig[level][element];
            //var nextValue = buildingConfig[level + 1][element];
            var maxValue = buildingConfig[objectSize(buildingConfig)][element];
            cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', objectSize(buildingConfig));

            infoBarBG.setTextureRect(cc.rect(0, 0, (curValue/maxValue) * infoBar.width, infoBar.height));
            //infoBarNext.setTextureRect(cc.rect(0, 0, (nextValue/maxValue) * infoBar.width, infoBar.height));

            //var textInfo = cc.LabelBMFont(curValue + ' + ' + (nextValue - curValue), 'res/Art/Fonts/soji_12.fnt');
            var textInfo = cc.LabelBMFont(curValue, 'res/Art/Fonts/soji_12.fnt');
            textInfo.attr({ anchorX: 0, x: 35, y: - i * 40 });
            infoArea.addChild(textInfo, 5);
        });
        return infoArea;
    },


    getImagePath:function(itemName, level){
        var root = 'res/Art/Buildings/';
        switch (itemName) {
            case 'TOW_1':
                return root + 'townhall/TOW_1_' + level + '/idle/image0000.png';
                break;
            case 'RES_1':
                return root + 'gold mine/RES_1_' + level + '/idle/image0000.png';
                break;
            case 'RES_2':
                return root + 'elixir collector/RES_2_' + level + '/idle/image0000.png';
                break;
            case 'RES_3':

                break;
            case 'STO_1':
                return root + 'gold storage/STO_1_' + level + '/idle/image0000.png';
                break;
            case 'STO_2':
                return root + 'elixir storage/STO_2_' + level + '/idle/image0000.png';
                break;
            case 'STO_3':

                break;
            case 'BDH_1':
                return root + 'builder hut/BDH_1_' + level + '/idle/image0000.png';
                break;
            case 'AMC_1':
                return root + 'army camp/AMC_1_' + level + '/idle/image0000.png';
                break;
            case 'BAR_1':
                return root + 'barrack/BAR_1_' + level + '/idle/image0000.png';
                break;
            case 'DEF_1':
                return root + 'cannon/cannon_' + level + '/idle/image0000.png';
                break;
            default:
                return null;
                break;
        }
    },
    


    //ghi de ham trong popup
    onCloseCallback:function () {
        cc.director.popToRootScene();
    }
});
