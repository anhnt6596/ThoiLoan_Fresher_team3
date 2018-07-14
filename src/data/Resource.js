/**
 * Created by GSN on 6/2/2015.
 */
var res = res || {};

// res.map = {
//     map_tmx: mapDir + '42x42map.tmx',
//     map_bl: mapDir + '1_0001_Layer-1.png',
//     map_br: mapDir + '1_0003_Layer-2.png',
//     map_tl: mapDir + '1_0000_Layer-3.png',
//     map_tr: mapDir + '1_0002_Layer-4.png',
//     builder_hut_png: mapDir + 'builder hut.png',
// }

/**
 * Created by linhrafa on 7/10/2018.
 */




var res = {
    mg_armyicon : 'res/Art/GUIs/Main_Gui/army_icon.png',
    mg_attack : 'res/Art/GUIs/Main_Gui/attack.png',
    mg_bg_bar_1 : 'res/Art/GUIs/Main_Gui/bg_bar_1.png',
    mg_bg_bar_2 : 'res/Art/GUIs/Main_Gui/bg_bar_2.png',
    mg_bg_bar_3 : 'res/Art/GUIs/Main_Gui/bg_bar_3.png',
    mg_bg_bar_4 : 'res/Art/GUIs/Main_Gui/bg_bar_4.png',
    mg_bg_exp : 'res/Art/GUIs/Main_Gui/bg_exp.png',
    mg_bg_slider : 'res/Art/GUIs/Main_Gui/bg_slider.png',
    mg_builder_icon: 'res/Art/GUIs/Main_Gui/builder_icon.png',
    mg_darkElixir_bar: 'res/Art/GUIs/Main_Gui/darkElixir_bar.png',
    mg_darkElixir_icon: 'res/Art/GUIs/Main_Gui/darkElixir_icon.png',
    mg_elixir_bar: 'res/Art/GUIs/Main_Gui/elixir_bar.png',
    mg_elixir_icon: 'res/Art/GUIs/Main_Gui/elixir_icon.png',
    mg_exp_bar: 'res/Art/GUIs/Main_Gui/exp_bar.png',
    mg_exp_bg_bar: 'res/Art/GUIs/Main_Gui/exp_bg_bar.png',
    mg_exp_icon: 'res/Art/GUIs/Main_Gui/exp_icon.png',
    mg_g_bar: 'res/Art/GUIs/Main_Gui/g_bar.png',
    mg_g_icon: 'res/Art/GUIs/Main_Gui/g_icon.png',
    mg_gold_bar: 'res/Art/GUIs/Main_Gui/gold_bar.png',
    mg_gold_icon: 'res/Art/GUIs/Main_Gui/gold_icon.png',
    mg_home: 'res/Art/GUIs/Main_Gui/home.png',
    mg_ic_exp: 'res/Art/GUIs/Main_Gui/ic_exp.png',
    mg_kho: 'res/Art/GUIs/Main_Gui/kho.png',
    mg_level_up: 'res/Art/GUIs/Main_Gui/level_up.png',
    mg_loading: 'res/Art/GUIs/Main_Gui/loading.png',
    mg_ranking: 'res/Art/GUIs/Main_Gui/ranking.png',
    mg_setting: 'res/Art/GUIs/Main_Gui/setting.png',
    mg_shield: 'res/Art/GUIs/Main_Gui/shield.png',
    mg_shop: 'res/Art/GUIs/Main_Gui/shop.png',
    mg_trophy: 'res/Art/GUIs/Main_Gui/trophy.png',
    mg_trophy_bg_bar: 'res/Art/GUIs/Main_Gui/trophy_bg_bar.png',

    textureTransparentPack_png : 'res/textureTransparentPack.png'
};

var mapDir = 'res/Art/Map/';

res.map = {
    map_tmx: mapDir + '42x42map.tmx',
    map_bl: mapDir + '1_0001_Layer-1.png',
    map_br: mapDir + '1_0003_Layer-2.png',
    map_tl: mapDir + '1_0000_Layer-3.png',
    map_tr: mapDir + '1_0002_Layer-4.png',
};

var buildingsDir = 'res/Art/Buildings/'

res.building = {
    builder_hut: buildingsDir + 'builder hut/idle/image0000.png',
};

var g_mainmenu = [
    res.loading_png,
    res.flare_jpg,
    res.menu_png,
    res.logo_png,
    res.logoBack_png,
    res.b01_png,
    res.b01_plist,
    res.mainMainMusic_mp3,
    res.mainMainMusic_ogg,
    res.mainMainMusic_wav,
    res.menuTitle_png,
    res.textureTransparentPack_plist,
    res.textureTransparentPack_png
];

var g_resources = [
    "CloseNormal.png",
    "CloseSelected.png",
    "config.json",
    "Default/Button_Disable.png",
    "Default/Button_Normal.png",
    "Default/Button_Press.png",

    "favicon.ico",
    "fonts/diceNumber.fnt",
    "fonts/diceNumber.png",
    "fonts/eff_number.fnt",
    "fonts/eff_number.png",
    "fonts/number_1.fnt",
    "fonts/number_1.png",
    "ipConfig.json",
    "localize/config.json",
    "localize/vi.txt",
    "localize/en.txt",
];

var TILE_WIDTH = 76;
var TILE_HEIGHT = 57;

var Z = {
    TILEMAP: 0,
    BACKGROUND: 1,
    BUILDING_GRASS: 5,
    GREEN_BG: 6,
    RED_BG: 6,
    BUILDING_SHADOW: 8,
    BUILDING_SCALE: 10,
    ARROW_MOVE: 999,
    TARGET: 1000, 
}