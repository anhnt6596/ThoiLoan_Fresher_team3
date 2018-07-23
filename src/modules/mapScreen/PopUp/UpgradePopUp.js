var createUpgradePopUp = function() {
    var titleText = new cc.LabelBMFont('Nâng cấp đi', 'res/Art/Fonts/soji_24.fnt');
    titleText.attr({
        x: 0,
        y: 0,
        scale: 1.5,
    });
    var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
    acceptBtn.attr({
        x: 0,
        y: -230,
        scale: 1.5,
    });
    var content = [
        titleText,
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
    var upgradePopUp = new ui.PopUp('Nâng cấp', content, acceptBtn);
    MAPSCENE.addChild(upgradePopUp, 1000);
    acceptBtn.addClickEventListener(() => {
        MAP._targetedObject && MAP._targetedObject.upgrade();
        upgradePopUp.close();
    });

    var content = createUpgradePopUpContent();

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

var createUpgradePopUpContent = function() {
    var content = new cc.Sprite();
};