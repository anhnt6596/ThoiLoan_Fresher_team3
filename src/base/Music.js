var mu = mu || {};

mu.playTheme = function() {
    if (MUSIC) cc.audioEngine.playMusic(sRes.theme, true);
    else {}
}