/**
 * Created by GSN on 7/9/2015.
*/
var MAPSCENE = MAPSCENE || null;
var CLAN_GUI = CLAN_GUI || null;
createMapScene = function() {
    cc.spriteFrameCache.addSpriteFrames('res/Art/building_imgs.plist');
    var game = new cc.Scene();
    MAPSCENE = game;
    var mapLayer = new MapLayer(gv.user);
    var lobbyLayer = new LobbyLayer(gv.user);
    // var lagScreen = new LagScreen();
    game.addChild(mapLayer, 0);
    game.addChild(lobbyLayer, 1);
    // game.addChild(lagScreen, 1);

    // add ClanGUIPopUp
    var clanGUI = new ClanGUI();
    game.addChild(clanGUI, 1000);
    CLAN_GUI = clanGUI;

    clanGUI.attr({

    });

    return game;
}