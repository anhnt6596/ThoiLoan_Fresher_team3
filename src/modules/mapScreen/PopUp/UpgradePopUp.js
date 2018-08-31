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
        y: 110
    });
    content.push(nextBuildingImg);

    var buildTimeText = showBuildTimeText(config.building[info._name][info._level + 1].buildTime);
    buildTimeText.attr({
        x: -230,
        y: 23
    });
    content.push(buildTimeText);

    var nextBuildingInfo = showNextBuildingInfo(info);
    nextBuildingInfo.attr({
        anchorY: 1,
        x: -40,
        y: 160
    });
    content.push(nextBuildingInfo);
    if (MAP._targetedObject._name === "TOW_1") {
        var scrollList = createScrollBar(info._level);
        scrollList.attr({
            x: 0,
            y: -58
        });
        content.push(scrollList);
        var text3 = new cc.LabelTTF("CÔNG TRÌNH MỞ KHÓA:", "Calibri", 26);
        text3.attr({ y: -15, color: new cc.color(142, 8, 8, 255) });
        content.push(text3);
    } else if (MAP._targetedObject._name === "BAR_1") {
        var unlockedUnit = config.building.BAR_1[info._level+1].unlockedUnit;
        var slot = new cc.Sprite("res/Art/GUIs/train_troop_gui/slot.png");
        slot.attr({ x: 0, y: -80 });
        var img = new cc.Sprite(train_troop_constant.img_train_troop_dir + unlockedUnit + '.png' || train_troop_constant.img_train_troop_dir + "ARM_1.png");
        img.attr({ anchorX: 0.5, anchorY: 0.5, x: slot.width / 2, y: slot.height / 2 });
        slot.addChild(img);
        content.push(slot);
        var text3 = new cc.LabelTTF("QUÂN LÍNH ĐƯỢC MỞ KHÓA:", "Calibri", 26);
        text3.attr({ y: -15, color: new cc.color(142, 8, 8, 255) });
        content.push(text3);
    }
    var upgradePopUp = new ui.PopUp('Upgrade', content);
    upgradePopUp.openAction();

    scrollList && scrollList.setContentSize(cc.size(upgradePopUp.frame.width - 50, 200));

    MAPSCENE.addChild(upgradePopUp, 1000);
    acceptBtn.addClickEventListener(function() {
        MAP._targetedObject && MAP._targetedObject.upgrade();
        upgradePopUp.close();
    });
};

var createScrollBar = function(tow_level) {
    var scrollView = new ccui.ScrollView();
    scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
    scrollView.setTouchEnabled(true);
    scrollView.setBounceEnabled(false);
    // scrollView.setContentSize(cc.size(800,200));
    scrollView.setPosition(cc.p(0,0));
    scrollView.setAnchorPoint(cc.p(0.5,0.5));

    var thisLevelInfo = config.building.TOW_1[tow_level];
    var nextLevelInfo = config.building.TOW_1[tow_level + 1];

    var count = 0;

    listBuildingShortName.forEach(function(item, i) {
        var number = nextLevelInfo[item] - thisLevelInfo[item];
        if(number && number > 0 && count < 10) {
            slot = createSlot(item, number);
            slot.attr({ x: 100 * (count) + 70, y: 75 });
            count += 1;            
            scrollView.addChild(slot);
        }
    });

    scrollView.setInnerContainerSize(cc.size(count * 100 + 70, 200));
    return scrollView;
};

var createSlot = function (type, number) {
    var slot = new cc.Sprite("res/Art/GUIs/upgrade_building_gui/slot.png");
    var img = new cc.Sprite("res/Art/GUIs/icons/shop_gui/icon/" + type + ".png");
    img.attr({
        anchorX: 0.5,
        anchory: 0.5,
        x: slot.width / 2,
        y: slot.height / 2,
        scale: 0.5
    });
    var number = new cc.LabelBMFont("x" + number, 'res/Art/Fonts/soji_16.fnt');
    number.attr({
        x: slot.width - 20,
        y: slot.height - 20,
    });
    slot.addChild(img);
    slot.addChild(number);
    return slot;
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
            var buildingAnim = ui.makeAnimation('armycam_1/', 0, 4, 0.2);
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
                var animsDir = nextLevel <= 8 ? 'BAR_1_' + nextLevel + '_effect/' : 'BAR_1_8_effect/';
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

            var goldmineAnim = ui.makeAnimation('RES_1_' + nextLevel + '_effect/', 0, 9, 0.2);
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

            var elixirCollectorAnim = ui.makeAnimation('RES_2_' + nextLevel + '_effect/', 0, 9, 0.2);
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
        case 'CLC_1':
            buildingImg = new cc.Sprite(res.building.clanCastle[nextLevel]);
            break;
        case 'WAL_1':
            buildingImg = new cc.Sprite(res.building.wall[nextLevel][3]);
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
    text2.attr({ y: -10, x: text1.width / 2 });
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
        case 'LAB_1':
        case 'WAL_1':
            listInfo.push('hitpoints');
            break;
        case 'STO_1':
        case 'STO_2':
        case 'STO_3':
            listInfo.push('capacity');
            listInfo.push('hitpoints');
            break;
        case 'CLC_1':
            listInfo.push('troopCapacity');
            listInfo.push('hitpoints');
            break;
        case 'RES_1':
        case 'RES_2':
        case 'RES_3':
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
    var distanceY = 45;
    listInfo.forEach(function(element, i) {
        var dirName = element == 'capacity' ? capacityforeachbuilding[info._name] : element;
        var dirName = element == 'productivity' ? productforeachbuilding[info._name] : dirName;
        var icon = new cc.Sprite(icons[dirName]);
        icon.attr({ y: - i * distanceY });
        infoArea.addChild(icon);

        var infoBar = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar.png');
        infoBar.attr({ anchorX: 0, x: 30, y: - i * distanceY });
        infoArea.addChild(infoBar, 0);

        var infoBarNext = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_nextlv_BG.png');
        infoBarNext.attr({ anchorX: 0, x: 30, y: - i * distanceY });
        infoArea.addChild(infoBarNext, 1);

        var infoBarBG = new cc.Sprite('res/Art/GUIs/upgrade_building_gui/info_bar_BG.png');
        infoBarBG.attr({ anchorX: 0, x: 30, y: - i * distanceY });
        infoArea.addChild(infoBarBG, 2);

        var buildingConfig = config.building[info._name];
        var curValue = buildingConfig[info._level][element];
        var nextValue = buildingConfig[info._level + 1][element];
        var maxValue = buildingConfig[objectSize(buildingConfig)][element];
        cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', objectSize(buildingConfig));

        infoBarBG.setTextureRect(cc.rect(0, 0, (curValue/maxValue) * infoBar.width, infoBar.height));
        infoBarNext.setTextureRect(cc.rect(0, 0, (nextValue/maxValue) * infoBar.width, infoBar.height));
        
        var textInfo = cc.LabelBMFont(curValue + ' + ' + (nextValue - curValue), 'res/Art/Fonts/soji_12.fnt');
        textInfo.attr({ anchorX: 0, x: 35, y: - i * distanceY });
        infoArea.addChild(textInfo, 5);
    });
    return infoArea;
};

var icons = {
    troopCapacity: 'res/Art/GUIs/upgrade_building_gui/small/TroopCapacity_Icon.png',
    capacityGold: 'res/Art/GUIs/upgrade_building_gui/small/Gold_Capacity_Icon.png',
    capacityElixir: 'res/Art/GUIs/upgrade_building_gui/small/Elixir_Capacity_Icon.png',
    capacityDarkElixir: 'res/Art/GUIs/upgrade_building_gui/small/DarkElixir_Capacity_Icon.png',
    hitpoints: 'res/Art/GUIs/upgrade_building_gui/small/Hitpoints_Icon.png',
    gold_productivity: 'res/Art/GUIs/upgrade_building_gui/small/Gold_ProductionRate_Icon.png',
    elixir_productivity: 'res/Art/GUIs/upgrade_building_gui/small/Elixir_ProductionRate_Icon.png',
    dark_elixir_productivity: 'res/Art/GUIs/upgrade_building_gui/small/DarkElixir_ProductionRate_Icon.png'
};

var capacityforeachbuilding = {
    AMC_1: 'troopCapacity',
    STO_1: 'capacityGold',
    STO_2: 'capacityElixir',
    STO_3: 'capacityDarkElixir',
    RES_1: 'capacityGold',
    RES_2: 'capacityElixir',
    RES_3: 'capacityDarkElixir',
    CLC_1: 'troopCapacity'
};

var productforeachbuilding = {
    RES_1: 'gold_productivity',
    RES_2: 'elixir_productivity',
    RES_3: 'dark_elixir_productivity'
};

var listBuildingShortName = [
    "LAB_1",
    "CLC_1",
    "WAL_1",
    "RES_1",
    "RES_2",
    "RES_3",
    "STO_1",
    "STO_2",
    "STO_3",
    "BAR_1",
    "BAR_2",
    "AMC_1",
    "SPF_1",
    "DEF_1",
    "DEF_2",
    "DEF_3",
    "DEF_4",
    "DEF_5",
    // "DEF_6",
    "DEF_7",
    "DEF_8",
    "DEF_9",
    // "DEF_11",
    "DEF_12",
    // "GUA_1",
    "TRA_1",
    "TRA_2",
    "TRA_3",
    "TRA_4",
    // "TRA_5",
    "TRA_6",
    // "DAF_1",
    "KQB_1",
    "KQB_2",
    "KQB_3",
    "KQB_4",
    "DEC_1",
    "DEC_2",
    "DEC_3",
    "DEC_4",
    "DEC_5",
    "DEC_6",
    // "DEC_7",
    // "DEC_8",
    // "DEC_9",
    // "DEC_10",
    // "DEC_11",
    // "DEC_12"
];