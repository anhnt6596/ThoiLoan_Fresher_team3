var ui = ui || {};
ui.makeAnimation = function(name, s, e, fps){
    var i;
    var animFrames = [];
    for(i = s; i <= e; ++i){
        var frame = cc.spriteFrameCache.getSpriteFrame(name + (i < 10 ? ("0" + i) : i) + ".png");
        animFrames.push(frame);
    }

    var animation = new cc.Animation(animFrames, fps);
    return cc.animate(animation);
};

ui.BounceEff = function(scale = 1) {
    var act1 = new cc.ScaleTo(0.15, 1.1 * scale, 1.1 * scale);
    var act2 = new cc.ScaleTo(0.05, scale, scale);
    return new cc.Sequence(act1, act2);
};

ui.targettingEff = function() {
    var act1 = cc.tintTo(0.75, 220, 200, 220);
    var act2 = cc.tintTo(0.75, 255, 255, 255);
    return new cc.Sequence(act1, cc.delayTime(0.25), act2, cc.delayTime(0.25));
};

ui.backToDefaultColor = function() {
    return cc.tintTo(0, 255, 255, 255);
};

ui.landingEffect = function() {
    var act1 = new cc.MoveBy(0.15, cc.p(0, -7));
    var act2 = new cc.MoveBy(0.05, cc.p(0, 7));

    var seq1 = new cc.Sequence(act1, act2);
    return seq1;
};