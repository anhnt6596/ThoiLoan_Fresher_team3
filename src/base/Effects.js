var ui = ui || {};
ui.makeAnimation =  function(name, s, e, fps){
    var i;
    var animFrames = [];
    for(i = s; i <= e; ++i){
        var frame = cc.spriteFrameCache.getSpriteFrame(name + (i < 10 ? ("0" + i) : i) + ".png");
        animFrames.push(frame);
    }

    var animation = new cc.Animation(animFrames, fps);
    return cc.animate(animation);
};