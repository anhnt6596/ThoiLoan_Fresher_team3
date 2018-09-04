var ui = ui || {};

ui.iconButton = function(size, x, y, src_img, text = ''){
    if(text === undefined)
        text = "";
    var btn = new ccui.Button(src_img);
    if(x === undefined)
        x = 0;
    if(y === undefined)
        y = 0;
    btn.attr({
        x: x,
        y: y
    });

    btn.setScale9Enabled(true);
    btn.setUnifySizeEnabled(false);
    btn.ignoreContentAdaptWithSize(false);
    var capInsets = cc.rect(15,15, 15, 15);
    btn.setCapInsets(capInsets);
    btn.setContentSize(cc.size(size,size));

    var valueText = new cc.LabelBMFont(text, res.font_soji[16]);
    valueText.attr({
        anchorX: 0.5,
        anchorY: 0,
        x: btn.width / 2,
        y: 8,
        scale: 0.9
    });
    btn.addChild(valueText, 100);

    return btn;
};