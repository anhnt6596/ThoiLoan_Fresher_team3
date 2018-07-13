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

    // btn.setTitleText(text);
    // btn.setTitleFontSize(15);
    // btn.setTitleColor(cc.color(255,255,255,255));
    // btn.setZoomScale(0.1);
    // btn.setPressedActionEnabled(true);

    btn.setScale9Enabled(true);
    btn.setUnifySizeEnabled(false);
    btn.ignoreContentAdaptWithSize(false);
    var capInsets = cc.rect(15,15, 15, 15);
    btn.setCapInsets(capInsets);
    btn.setContentSize(cc.size(size,size));
    return btn;
};