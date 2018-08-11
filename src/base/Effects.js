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
ui.productTextEffect = function (building, type, text) {
    var textEff = new cc.LabelBMFont(text, 'res/Art/Fonts/soji_24.fnt');
    var color;
    switch (type) {
        case "RES_1":
            color = new cc.color(255,255,0, 255);
            break;
        case "RES_2":
            color = new cc.color(255,0,255, 255);
            break;
        case "RES_3":
            color = new cc.color(128,0,255, 255);
            break;
        default:
            color = new cc.color(255,255,0, 255);
            break;
    }
    textEff.attr({
        x: building.buildingImg.x,
        y: building.buildingImg.y,
        color: color,
    });

    var fly_in_action = cc.JumpBy.create(1,cc.p(0,80),90 ,1);

    //var fade_action = cc.FadeOut(0.1);

    textEff.runAction(fly_in_action);
    //textEff.runAction(fade_action);

    MAP.addChild(textEff, 1200);

    setTimeout(function() {
        MAP.removeChild(textEff);
    }, 1200);
};
ui.dropCoinEffect = function(building, isFlip) {
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

    isFlip && coin2Sprite.attr({ scaleX: -1 });
    isFlip && coin3Sprite.setRotation(90);
    dropCoinEff.addChild(coin2Sprite);
    dropCoinEff.addChild(coin3Sprite);


    var jump2_action = cc.JumpBy.create(0.8,cc.p(randomInt(-80,80),randomInt(50, 150)),randomInt(200, 300),1);
    var jump3_action = cc.JumpBy.create(0.8,cc.p(randomInt(-80,80),randomInt(50, 150)),randomInt(200, 300),1);
    var jump4_action = cc.JumpBy.create(0.8,cc.p(randomInt(-80,80),randomInt(50, 150)),randomInt(200, 300),1);

    var fade_action = cc.FadeOut(0.8);


    coin2Sprite.runAction(coin2.repeatForever());
    coin2Sprite.runAction(jump2_action);
    coin2Sprite.runAction(fade_action);

    coin3Sprite.runAction(coin3.repeatForever());
    coin3Sprite.runAction(jump3_action);
    coin3Sprite.runAction(fade_action.clone());

    setTimeout(function() {
        MAP.removeChild(dropCoinEff);
    }, 1000);
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