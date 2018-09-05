var ItemInfo = TinyPopup.extend({
    troopGuildListDiff: {},

    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);

        if(data.itemName == "CLC_1"){
            this.troopGuildListDiff = {};
            //Hien thi so luong quan hien tai cua guild
            this.showClanInfo();
        }

        this.showInfoItem(width, height, data.itemName, data._level);
    },

    showClanInfo: function() {
        for(var i in troopGuildList){
            var item = troopGuildList[i];
            var name = item.typeTroop + "_" + item.level;
            if(this.troopGuildListDiff[name]){
                this.troopGuildListDiff[name] += 1;
            }else{
                this.troopGuildListDiff[name] = 1;
            }
        }

        var h = 1;
        for(var j in this.troopGuildListDiff){
            var name2 = j.substring(0, 5);
            cc.log("================= DUY: loai quan: " + name2);
            var level2 = j.substring(6, 7);
            cc.log("================= DUY: level: " + level2);
            cc.log("================= DUY: amount: " + this.troopGuildListDiff[j]);

            var troop = new TroopGuildItem(name2, level2, this.troopGuildListDiff[j]);
            troop.setPosition(-450 + 150*h, -100);
            this.addChild(troop, 1000);
            h++;
        }
    },


    showInfoItem:function(width, height, itemName, level){
        var missImage = false;
        for(var d in listBuildingMissImage){
            if(listBuildingMissImage[d] == itemName){
                missImage = true;
                break;
            }
        }
        if(missImage){
            var note = cc.LabelBMFont('This building has no image' , res.font_soji[24]);
            note.setPosition(0, 0);
            this.addChild(note, 10);
            return;
        }
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
        var shadow;
        var buildingAnim;
        var animSprite;
        switch (itemName) {
            case 'TOW_1':
                buildingImg = new cc.Sprite(res.building.townhall[level]);

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'AMC_1':
                buildingImg = new cc.Sprite(res.building.army_camp[level]);
                buildingAnim = ui.makeAnimation('armycam_1/', 0, 4, 0.2);
                animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2 + 3,
                    y: buildingImg.height / 2 + 38
                });
                animSprite.runAction(buildingAnim.repeatForever());
                break;
            case 'BAR_1':
                buildingImg = new cc.Sprite(res.building.barrack[level]);
                if (level >= 4) {
                    var animsDir = level <= 8 ? 'BAR_1_' + level + '_effect/' : 'BAR_1_8_effect/';
                    buildingAnim = ui.makeAnimation(animsDir, 0, 5, 0.2);
                    animSprite = new cc.Sprite();
                    buildingImg.addChild(animSprite, 11);
                    animSprite.attr({
                        x: buildingImg.width / 2,
                        y: buildingImg.height / 2
                    });
                    animSprite.runAction(buildingAnim.repeatForever());
                }

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'RES_1':
                buildingImg = new cc.Sprite(res.building.gold_mine[level]);

                var goldmineAnim = ui.makeAnimation('RES_1_' + level + '_effect/', 0, 9, 0.2);
                animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2,
                    y: buildingImg.height / 2
                });
                animSprite.runAction(goldmineAnim.repeatForever());

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'RES_2':
                buildingImg = new cc.Sprite(res.building.elixir_collector[level]);

                var elixirCollectorAnim = ui.makeAnimation('RES_2_' + level + '_effect/', 0, 9, 0.2);
                animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2,
                    y: buildingImg.height / 2
                });
                animSprite.runAction(elixirCollectorAnim.repeatForever());

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'STO_1':
                buildingImg = new cc.Sprite(res.building.gold_storage[level][3]);

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'STO_2':
                buildingImg = new cc.Sprite(res.building.elixir_storage[level][3]);

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ widthBuilding +'_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);

                shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
                shadow.attr({ scale: 2 });
                content.addChild(shadow, 5);
                break;
            case 'RES_3':
                buildingImg = new cc.Sprite(res.building.dark_elixir_collector[level]);
                break;
            case 'STO_3':
                buildingImg = new cc.Sprite(res.building.dark_elixir_storage[level][3]);
                break;
            case 'BDH_1':
                buildingImg = new cc.Sprite(res.building.builder_hut);
                break;
            case 'CLC_1':
                buildingImg = new cc.Sprite(res.building.clanCastle[level]);
                break;
            case 'WAL_1':
                buildingImg = new cc.Sprite(res.building.wall[level][2]);
                break;
            case 'LAB_1':
                buildingImg = new cc.Sprite(res.building.labratory[level]);
                break;
            case 'DEF_1':
                var dir = res.building.canon_base[level];
                buildingImg = new cc.Sprite(dir);
                buildingImg.setCascadeColorEnabled(true);
                var cannonImg = new cc.Sprite(res.building.canon[level][3]);
                cannonImg.attr({
                    x: buildingImg.width / 2 + 7,
                    y: buildingImg.height / 2
                });
                buildingImg.addChild(cannonImg);

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
            case 'CLC_1':
                listInfo.push('hitpoints');
                listInfo.push('troopCapacity');
                break;
            default:
                break;
        }
        listInfo.forEach(function(element, i) {
            var dirName = (element == 'capacity') ? capacityforeachbuilding[itemName] : element;
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

            var textInfo = cc.LabelBMFont(curValue, res.font_soji[12]);
            textInfo.attr({ anchorX: 0, x: 35, y: - i * 40 });
            infoArea.addChild(textInfo, 5);
        });
        return infoArea;
    }
});

var TroopGuildItem = ccui.Button.extend({
    _name:null,

    ctor: function (troopName, level, amount) {
        this._super('res/Art/GUIs/train_troop_gui/slot.png');
        this._name = troopName;
        this.initItem(troopName, level, amount);
    },

    initItem:function(troopName, level, amount){
        var img = new cc.Sprite(train_troop_constant.img_train_troop_dir + troopName+'.png');
        img.setPosition(this.width/2, this.height/2);
        this.addChild(img, 100);


        var levelLabel = new cc.LabelBMFont(level, res.font_soji[24]);
        levelLabel.setPosition(levelLabel.width/2 + 5, this.height - levelLabel.height/2 - 5);
        levelLabel.setColor(new cc.color(0, 255, 0, 255));
        this.addChild(levelLabel, 109);

        var amountLabel = new cc.LabelBMFont(amount, res.font_soji[24]);
        amountLabel.setPosition(amountLabel.width/2 + 5, amountLabel.height/2 + 5);
        amountLabel.setColor(new cc.color(0, 255, 0, 255));
        this.addChild(amountLabel, 109);
    }
});
