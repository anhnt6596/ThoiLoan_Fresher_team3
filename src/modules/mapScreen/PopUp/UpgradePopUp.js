var createUpgradePopUp = function() {
    var info = MAP._targetedObject;
    var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
    acceptBtn.attr({
        x: 0,
        y: -180,
        scale: 1.5
    });
    var content = [
        acceptBtn
    ];
    var req = {};
    if (MAP._targetedObject) {
        var _targetedObject = MAP._targetedObject;
        req.goldReq = config.building[_targetedObject._name][_targetedObject._level + 1].gold || 0;
        req.elixirReq = config.building[_targetedObject._name][_targetedObject._level + 1].elixir || 0;
        req.darkElixirReq = config.building[_targetedObject._name][_targetedObject._level + 1].darkElixir || 0;
    }
    var num = 0;
    if (req.goldReq > 0) {
        var item = createNewRequireItem('gold', formatNumber(req.goldReq), num);
        content.push(item);
        num += 1;
    }
    if (req.elixirReq > 0) {
        var item = createNewRequireItem('elixir', formatNumber(req.elixirReq), num);
        content.push(item);
        num += 1;
    }
    if (req.darkElixirReq > 0) {
        var item = createNewRequireItem('dark_elixir', formatNumber(req.darkElixirReq), num);
        content.push(item);
        // num += 1;
    }

    var nextBuildingImg = showNextBuildingImg(info);
    nextBuildingImg.attr({
        x: -230,
        y: 100
    });
    content.push(nextBuildingImg);

    var buildTimeText = showBuildTimeText(config.building[info._name][info._level + 1].buildTime);
    buildTimeText.attr({
        x: -230,
        y: -10
    });
    content.push(buildTimeText);

    var nextBuildingInfo = showNextBuildingInfo(info);
    nextBuildingInfo.attr({
        x: -40,
        y: 130
    });
    content.push(nextBuildingInfo);
    var upgradePopUp = new ui.PopUp('Upgrade', content);

    MAPSCENE.addChild(upgradePopUp, 1000);
    acceptBtn.addClickEventListener(function() {
        MAP._targetedObject && MAP._targetedObject.upgrade();
        upgradePopUp.close();
    });
};

var createNewRequireItem = function(type, value, num) {
    var titleText;
    var icon;
    switch (type) {
        case 'gold':
            icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/gold.png');
            titleText = new cc.LabelBMFont(value, 'res/Art/Fonts/soji_12.fnt');
            break;
        case 'elixir':
            icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/elixir.png');
            titleText = new cc.LabelBMFont(value, 'res/Art/Fonts/soji_12.fnt');
            break;
        case 'dark_elixir':
            icon = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/small/dElixir.png');
            titleText = new cc.LabelBMFont(value, 'res/Art/Fonts/soji_12.fnt');
            break;
        default:
            break;
    }
    icon.attr({
        x: 75,
        y: -165 - num * 30,
        scale: 1.5
    });
    icon.addChild(titleText);
    titleText.attr({ anchorX: 1, y: 10, x: 0 });
    return icon;
};

var showNextBuildingImg = function(info) {
    var nextLevel = info._level + 1;
    var content = new cc.Sprite();
    var grass = new cc.Sprite(res.map.grass[info._width]);
    grass.attr({
        scale: 2
    });
    var buildingImg;
    switch (info._name) {
        case 'TOW_1':
            buildingImg = new cc.Sprite(res.building.townhall[nextLevel]);
            
            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info._width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'AMC_1':
            buildingImg = new cc.Sprite(res.building.army_camp[nextLevel]);
            var buildingAnim = ui.makeAnimation('armycam_1_', 0, 4, 0.2);
            var animSprite = new cc.Sprite();
            buildingImg.addChild(animSprite, 11);
            animSprite.attr({
                x: buildingImg.width / 2 + 3,
                y: buildingImg.height / 2 + 38
            });
            animSprite.runAction(buildingAnim.repeatForever());
            break;
        case 'BAR_1':
            buildingImg = new cc.Sprite(res.building.barrack[nextLevel]);
            if (nextLevel >= 4) {
                var animsDir = nextLevel <= 8 ? 'BAR_1_' + nextLevel + '_effect_' : 'BAR_1_8_effect_';
                var buildingAnim = ui.makeAnimation(animsDir, 0, 5, 0.2);
                var animSprite = new cc.Sprite();
                buildingImg.addChild(animSprite, 11);
                animSprite.attr({
                    x: buildingImg.width / 2,
                    y: buildingImg.height / 2
                });
                animSprite.runAction(buildingAnim.repeatForever());
            }
            
            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info._width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'RES_1':
            buildingImg = new cc.Sprite(res.building.gold_mine[nextLevel]);

            var goldmineAnim = ui.makeAnimation('RES_1_' + nextLevel + '_effect_', 0, 9, 0.2);
            var animSprite = new cc.Sprite();
            buildingImg.addChild(animSprite, 11);
            animSprite.attr({
                x: buildingImg.width / 2,
                y: buildingImg.height / 2
            });
            animSprite.runAction(goldmineAnim.repeatForever());

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info._width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'RES_2':
            buildingImg = new cc.Sprite(res.building.elixir_collector[nextLevel]);

            var elixirCollectorAnim = ui.makeAnimation('RES_2_' + nextLevel + '_effect_', 0, 9, 0.2);
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
        case 'RES_3':
            buildingImg = new cc.Sprite(res.building.dark_elixir_collector[nextLevel]);
            break;
        case 'STO_1':
            buildingImg = new cc.Sprite(res.building.gold_storage[nextLevel][3]);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info._width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'STO_2':
            buildingImg = new cc.Sprite(res.building.elixir_storage[nextLevel][3]);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info._width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'STO_3':
            buildingImg = new cc.Sprite(res.building.dark_elixir_storage[nextLevel][3]);
            break;
        case 'BDH_1':
            buildingImg = new cc.Sprite(res.building.builder_hut[nextLevel]);
            break;
        case 'LAB_1':
            buildingImg = new cc.Sprite(res.building.labratory[nextLevel]);
            break;
        case 'DEF_1':
            var dir = res.building.canon_base[nextLevel];
            buildingImg = new cc.Sprite(dir);
            buildingImg.setCascadeColorEnabled(true);
            var cannonImg = new cc.Sprite(res.building.canon[nextLevel][3]);
            cannonImg.attr({
                x: buildingImg.width / 2 + 7,
                y: buildingImg.height / 2
            });
            buildingImg.addChild(cannonImg);
            break;
        default:
            buildingImg = new cc.Sprite(res.building.army_camp[nextLevel]);
            break;
    }

    content.addChild(grass, 4);
    content.addChild(buildingImg, 6);
    content.setScale(3 / info._width);
    return content;
};

var showBuildTimeText = function(time) {
    var text1 = new cc.LabelTTF("Thời gian nâng cấp", "Calibri", 30);
    text1.attr({ color: new cc.color(142, 8, 8, 255) });
    var text2 = new cc.LabelBMFont(timeToReadable(time), 'res/Art/Fonts/soji_24.fnt');
    text2.attr({ y: -20, x: text1.width / 2 });
    text1.addChild(text2);
    return text1;
};

var showNextBuildingInfo = function(info) {
    var infoArea = new cc.Node();
    var listInfo = [];
    switch (info._name) {
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
        var dirName = element == 'capacity' ? capacityforeachbuilding[info._name] : element;
        var dirName = element == 'productivity' ? productforeachbuilding[info._name] : dirName;
        var icon = new cc.Sprite(icons[dirName]);
        icon.attr({ y: - i * 60 });
        infoArea.addChild(icon);

        var infoBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
        infoBar.attr({ anchorX: 0, x: 30, y: - i * 60 });
        infoArea.addChild(infoBar, 0);

        var infoBarNext = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
        infoBarNext.attr({ anchorX: 0, x: 30, y: - i * 60 });
        infoArea.addChild(infoBarNext, 1);

        var infoBarBG = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_BG.png');
        infoBarBG.attr({ anchorX: 0, x: 30, y: - i * 60 });
        infoArea.addChild(infoBarBG, 2);

        var buildingConfig = config.building[info._name];
        var curValue = buildingConfig[info._level][element];
        var nextValue = buildingConfig[info._level + 1][element];
        var maxValue = buildingConfig[objectSize(buildingConfig)][element];
        cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', objectSize(buildingConfig));

        infoBarBG.setTextureRect(cc.rect(0, 0, (curValue/maxValue) * infoBar.width, infoBar.height));
        infoBarNext.setTextureRect(cc.rect(0, 0, (nextValue/maxValue) * infoBar.width, infoBar.height));
        
        var textInfo = cc.LabelBMFont(curValue + ' + ' + (nextValue - curValue), 'res/Art/Fonts/soji_12.fnt');
        textInfo.attr({ anchorX: 0, x: 35, y: - i * 60 });
        infoArea.addChild(textInfo, 5);
    });
    return infoArea;
};

var icons = {
    troop_capacity: 'res/Art/GUIs/upgrade_building_gui/small/TroopCapacity_Icon.png',
    capacityGold: 'res/Art/GUIs/upgrade_building_gui/small/Gold_Capacity_Icon.png',
    capacityElixir: 'res/Art/GUIs/upgrade_building_gui/small/Elixir_Capacity_Icon.png',
    capacityDarkElixir: 'res/Art/GUIs/upgrade_building_gui/small/DarkElixir_Capacity_Icon.png',
    hitpoints: 'res/Art/GUIs/upgrade_building_gui/small/Hitpoints_Icon.png',
    gold_productivity: 'res/Art/GUIs/upgrade_building_gui/small/Gold_ProductionRate_Icon.png',
    elixir_productivity: 'res/Art/GUIs/upgrade_building_gui/small/Elixir_ProductionRate_Icon.png',
};

var capacityforeachbuilding = {
    AMC_1: 'troop_capacity',
    STO_1: 'capacityGold',
    STO_2: 'capacityElixir',
    RES_1: 'capacityGold',
    RES_2: 'capacityElixir'
};

var productforeachbuilding = {
    RES_1: 'gold_productivity',
    RES_2: 'elixir_productivity'
};
