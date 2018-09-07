var ui = ui || {};

ui.optionButton = function(text, src1, src2, src3) {
    var button = ccui.Button(src1, src2, src3);
    var label = new cc.LabelBMFont(text, res.font_soji[16]);
    button.label = label;
    label.attr({
        x: button.width / 2,
        y: button.height / 2,
    });
    button.addChild(label);
    return button;
}