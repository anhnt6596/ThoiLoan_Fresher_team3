/**
 * Created by GSN on 7/9/2015.
 */

createGameScene = function() {
    var game = new cc.Scene();
    var mapLayer = new MapLayer();
    var lobbyLayer = new LobbyLayer();
    game.addChild(mapLayer, 0);
    game.addChild(lobbyLayer, 1);
    return game;
}