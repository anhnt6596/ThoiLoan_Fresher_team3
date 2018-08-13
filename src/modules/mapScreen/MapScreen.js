/**
 * Created by GSN on 7/9/2015.
*/
var MAPSCENE = MAPSCENE || null;
createMapScene = function() {
    var game = new cc.Scene();
    MAPSCENE = game;
    var mapLayer = new MapLayer(gv.user);
    var lobbyLayer = new LobbyLayer(gv.user);
    // var lagScreen = new LagScreen();
    game.addChild(mapLayer, 0);
    game.addChild(lobbyLayer, 1);
    // game.addChild(lagScreen, 1);
    return game;
}