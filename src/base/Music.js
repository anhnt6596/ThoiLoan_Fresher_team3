var mu = mu || {};

mu.playTheme = function() {
    // if (MUSIC) 
    cc.audioEngine.playMusic(sRes.theme, true);
    if (!MUSIC) cc.audioEngine.pauseMusic();
    // else {}
}