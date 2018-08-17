var ui = ui || {};

ui.optionButton = function(text, src1, src2, src3) {
    var button = ccui.Button(src1, src2, src3);
    var label = new cc.LabelBMFont(text, 'res/Art/Fonts/soji_16.fnt');
    label.attr({
        x: button.width / 2,
        y: button.height / 2,
    });
    button.addChild(label);
    return button;
}