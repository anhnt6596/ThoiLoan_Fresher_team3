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

ui.dropCoinEffect = function(building) {
    var dropCoinEff = new cc.Sprite();
    dropCoinEff.attr({
        x: building.buildingImg.x,
        y: building.buildingImg.y,
    });
    MAP.addChild(dropCoinEff, 1100);
    var coin2 = ui.makeAnimation('coindrop_2_', 0, 4, 0.1);
    var coin3 = ui.makeAnimation('coindrop_3_', 0, 4, 0.1);
    var coin2Sprite = new cc.Sprite();
    var coin3Sprite = new cc.Sprite();
    dropCoinEff.addChild(coin2Sprite);
    dropCoinEff.addChild(coin3Sprite);


    var jump2_action = cc.JumpBy.create(0.5,cc.p(20,80),100,1);

    coin2Sprite.runAction(coin2.repeatForever());
    coin2Sprite.runAction(jump2_action);
    coin2Sprite.attr({ x: - 10 });
    coin3Sprite.runAction(coin3.repeatForever());
    coin3Sprite.attr({ x: + 10 });

    //MAP.removeChild(dropCoinEff);
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