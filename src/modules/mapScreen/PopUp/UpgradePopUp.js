var createUpgradePopUp = function() {
    var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
    acceptBtn.attr({
        x: 0,
        y: -230,
        scale: 1.5,
    });
    var content = [
        acceptBtn,
    ];
    var req = {};
    if (MAP._targetedObject) {
        var _targetedObject = MAP._targetedObject;
        req.goldReq = config.building[_targetedObject.info.name][_targetedObject.info.level + 1].gold || 0;
        req.elixirReq = config.building[_targetedObject.info.name][_targetedObject.info.level + 1].elixir || 0;
        req.darkElixirReq = config.building[_targetedObject.info.name][_targetedObject.info.level + 1].darkElixir || 0;
    };
    var num = 0;
    if (req.goldReq > 0) {
        var item = createNewRequireItem('gold', req.goldReq, num);
        content.push(item);
        num += 1;
    }
    if (req.elixirReq > 0) {
        var item = createNewRequireItem('elixir', req.elixirReq, num);
        content.push(item);
        num += 1;
    }
    if (req.darkElixirReq > 0) {
        var item = createNewRequireItem('dark_elixir', req.darkElixirReq, num);
        content.push(item);
        num += 1;
    }

    var nextBuildingImg = showNextBuildingImg(MAP._targetedObject.info);
    nextBuildingImg.attr({
        x: -250,
        y: 100,
    });
    content.push(nextBuildingImg);

    // var nextBuildingInfo = showNextBuildingInfo(MAP._targetedObject.info);
    // content.push(nextBuildingImg);

    var upgradePopUp = new ui.PopUp('Nâng cấp', content, acceptBtn);

    MAPSCENE.addChild(upgradePopUp, 1000);
    acceptBtn.addClickEventListener(() => {
        MAP._targetedObject && MAP._targetedObject.upgrade();
        upgradePopUp.close();
    });
};

var createNewRequireItem = function(type, value, num) {
    var titleText;
    switch (type) {
        case 'gold':
            titleText = new cc.LabelBMFont('Vàng: ' + value, 'res/Art/Fonts/soji_12.fnt');
            titleText.attr({
                x: 0,
                y: -215 - num * 30,
                scale: 1.5,
            });
            break;
        case 'elixir':
            titleText = new cc.LabelBMFont('Dầu: ' + value, 'res/Art/Fonts/soji_12.fnt');
            titleText.attr({
                x: 0,
                y: -215 - num * 30,
                scale: 1.5,
            });
            break;
        case 'dark_elixir':
            titleText = new cc.LabelBMFont('Dầu đen: ' + value, 'res/Art/Fonts/soji_12.fnt');
            titleText.attr({
                x: 0,
                y: -215 - num * 30,
                scale: 1.5,
            });
            break;
        default:
            break;
    }
    return titleText;
};

var showNextBuildingImg = function(info) {
    var nextLevel = info.level + 1;
    var content = new cc.Sprite();
    var grass = new cc.Sprite(res.map.grass[info.width]);
    grass.attr({
        scale: 2,
    });
    var buildingImg;
    switch (info.name) {
        case 'TOW_1':
            buildingImg = new cc.Sprite(res.building.townhall[nextLevel]);
            
            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info.width +'_Shadow.png');
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
                y: buildingImg.height / 2 + 38,
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
                    y: buildingImg.height / 2,
                });
                animSprite.runAction(buildingAnim.repeatForever());
            }
            
            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info.width +'_Shadow.png');
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
                y: buildingImg.height / 2,
            });
            animSprite.runAction(goldmineAnim.repeatForever());

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info.width +'_Shadow.png');
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
                y: buildingImg.height / 2,
            });
            animSprite.runAction(elixirCollectorAnim.repeatForever());
            
            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'STO_1':
            buildingImg = new cc.Sprite(res.building.gold_storage[nextLevel][3]);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info.width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        case 'STO_2':
            buildingImg = new cc.Sprite(res.building.elixir_storage[nextLevel][3]);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_'+ info.width +'_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);

            var shadow = new cc.Sprite('res/Art/Map/map_obj_bg/GRASS_5_Shadow.png');
            shadow.attr({ scale: 2 });
            content.addChild(shadow, 5);
            break;
        default:
            buildingImg = new cc.Sprite(res.building.army_camp[nextLevel]);
            break;
    }
    content.addChild(grass, 4);
    content.addChild(buildingImg, 6);
    content.setScale(4 / info.width);
    return content;
};

var showNextBuildingInfo = function(info) {
    
};