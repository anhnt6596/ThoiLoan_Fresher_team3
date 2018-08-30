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
    var textEff = new cc.LabelBMFont(text, res.font_soji[24]);
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
ui.dropCoinEffect = function(building, product) {
    var numberOfCoin = 1;
    if (product < 100) {
        numberOfCoin = Math.floor(product / 5 + 1);
    } else if (product < 1000) {
        numberOfCoin = Math.floor(product / 50 + 21);
    } else if (product < 10000) {
        numberOfCoin = Math.floor(product / 500 + 41);
    } else if (product < 100000) {
        numberOfCoin = Math.floor(product / 5000 + 61);
    } else {
        numberOfCoin = 80;
    }

    var dropCoinEff = new cc.Sprite();
    dropCoinEff.attr({
        x: building.buildingImg.x,
        y: building.buildingImg.y,
    });
    MAP.addChild(dropCoinEff, 1100);
    
    for(var i = 0; i < numberOfCoin; i++) {
        (function() {
            setTimeout(function() {
                var coinSprite = new cc.Sprite();
                
                var coin_type = randomInt(2, 3);
                var isFlip = randomInt(0, 1);
                isFlip && coin_type == 2 && coinSprite.attr({ scaleX: -1 });
                isFlip && coin_type == 3 && coinSprite.setRotation(90);
                
                dropCoinEff.addChild(coinSprite);
                
                var coin_anims = ui.makeAnimation('coindrop_' + coin_type + '/', 0, 4, 0.1);
                var jump_action = cc.JumpBy.create(0.8,cc.p(randomInt(-80,80),randomInt(50, 150)),randomInt(200, 300),1);
                var fade_action = cc.FadeOut(1);
            
                coinSprite.runAction(coin_anims.repeatForever());
                coinSprite.runAction(jump_action);
                coinSprite.runAction(fade_action);
            }, i*20);
        })(i);
    }

    setTimeout(function() {
        MAP.removeChild(dropCoinEff);
    }, 3000);
};

ui.dropElixirEff = function(building, product, isDark = 0) {
    var numberOfDrop = 1;
    if (product < 100) {
        numberOfDrop = Math.floor(product / 5 + 1)
    } else if (product < 1000) {
        numberOfDrop = Math.floor(product / 50 + 21);
    } else if (product < 10000) {
        numberOfDrop = Math.floor(product / 500 + 41);
    } else if (product < 100000) {
        numberOfDrop = Math.floor(product / 5000 + 61);
    } else {
        numberOfDrop = 80;
    }

    var dropElixirEff = new cc.Sprite();
    dropElixirEff.attr({
        x: building.buildingImg.x,
        y: building.buildingImg.y,
    });
    dropElixirEff.setOpacity(100);
    MAP.addChild(dropElixirEff, 1100);
    
    for(var i = 0; i < numberOfDrop; i++) {
        (function() {
            setTimeout(function() {
                var elixirSprite = new cc.Sprite(!isDark ? "res/Art/GUIs/upgrade_building_gui/small/10.png" : "res/Art/GUIs/upgrade_building_gui/small/9.png");
                
                dropElixirEff.addChild(elixirSprite);
                
                var jump_action = cc.JumpBy.create(0.8,cc.p(randomInt(-80,80),randomInt(200, 280)),randomInt(250, 300),1);
                var fade_action = cc.FadeOut(0.75);
            
                elixirSprite.runAction(jump_action);
                elixirSprite.runAction(fade_action);
            }, i*20);
        })(i);
    }

    setTimeout(function() {
        MAP.removeChild(dropElixirEff);
    }, 3000);
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