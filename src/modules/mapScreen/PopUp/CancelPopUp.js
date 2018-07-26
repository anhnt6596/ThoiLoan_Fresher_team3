var createCancelPopUp = function() {
    var titleText = new cc.LabelBMFont('If cancel, you will lose half the resources you spent', 'res/Art/Fonts/soji_12.fnt');
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
    titleText = new cc.LabelBMFont('Confirm', 'res/Art/Fonts/soji_20.fnt');
    titleText.attr({
        x: 0,
        y: -230 - num * 30,
        scale: 1.5,
    });
    content.push(titleText);
    num += 1;
    var cancelPopUp = new ui.PopUp('Cancel', content, acceptBtn);
    MAPSCENE.addChild(cancelPopUp, 1000);
    acceptBtn.addClickEventListener(() => {
        MAP._targetedObject && MAP._targetedObject.cancel(MAP._targetedObject);
        cancelPopUp.close();
    });
};
