var res = res || {};

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

    collect_bg: 'res/Art/GUIs/collect_res/collect_bg.png',
    full_bg: 'res/Art/GUIs/collect_res/full_bg.png',
    gold_img:  'res/Art/GUIs/collect_res/RES_1.png',
    elixir_img:  'res/Art/GUIs/collect_res/RES_2.png',
    darkElixir_img:  'res/Art/GUIs/collect_res/RES_3.png',

    textureTransparentPack_png : 'res/textureTransparentPack.png'
};

var mapDir = 'res/Art/Map/';

res.map = {
    map_tmx: mapDir + '42x42map.tmx',
    map_bl: mapDir + '1_0001_Layer-1.png',
    map_br: mapDir + '1_0003_Layer-2.png',
    map_tl: mapDir + '1_0000_Layer-3.png',
    map_tr: mapDir + '1_0002_Layer-4.png',
    arrow_move: [
        mapDir + 'map_obj_bg/BG/arrowmove1.png',
        mapDir + 'map_obj_bg/BG/arrowmove1.png',
        mapDir + 'map_obj_bg/BG/arrowmove2.png',
        mapDir + 'map_obj_bg/BG/arrowmove3.png',
        mapDir + 'map_obj_bg/BG/arrowmove4.png',
        mapDir + 'map_obj_bg/BG/arrowmove5.png',
    ],
    green_bg: [
        mapDir + 'map_obj_bg/BG/GREEN_1.png',
        mapDir + 'map_obj_bg/BG/GREEN_1.png',
        mapDir + 'map_obj_bg/BG/GREEN_2.png',
        mapDir + 'map_obj_bg/BG/GREEN_3.png',
        mapDir + 'map_obj_bg/BG/GREEN_4.png',
        mapDir + 'map_obj_bg/BG/GREEN_5.png',
    ],
    red_bg: [
        mapDir + 'map_obj_bg/BG/RED_1.png',
        mapDir + 'map_obj_bg/BG/RED_1.png',
        mapDir + 'map_obj_bg/BG/RED_2.png',
        mapDir + 'map_obj_bg/BG/RED_3.png',
        mapDir + 'map_obj_bg/BG/RED_4.png',
        mapDir + 'map_obj_bg/BG/RED_5.png',
    ],
    grass: [
        mapDir + 'map_obj_bg/BG_0/1.png',
        mapDir + 'map_obj_bg/BG_0/1.png',
        mapDir + 'map_obj_bg/BG_0/2.png',
        mapDir + 'map_obj_bg/BG_0/3.png',
        mapDir + 'map_obj_bg/BG_0/4.png',
        mapDir + 'map_obj_bg/BG_0/5.png',
    ],
};

var guiDir = 'res/Art/GUIs/';

res.gui = {
    action_building_icon: {
        accept: guiDir + 'Action_Building_Icon/accept.png',
        accept: guiDir + 'Action_Building_Icon/cancel.png',
    },
};

var buildingsDir = 'res/Art/Buildings/';

res.building = {
    builder_hut: buildingsDir + 'builder hut/idle/image0000.png',
    army_camp: [
        buildingsDir + 'army camp/AMC_1_1/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_1/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_2/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_3/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_4/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_5/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_6/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_7/idle/image0000.png',
        buildingsDir + 'army camp/AMC_1_8/idle/image0000.png',
    ],
    barrack: [
        buildingsDir + 'barrack/BAR_1_1/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_1/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_2/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_3/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_4/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_5/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_6/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_7/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_8/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_9/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_10/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_11/idle/image0000.png',
        buildingsDir + 'barrack/BAR_1_12/idle/image0000.png',
    ],
    elixir_collector: [
        buildingsDir + 'elixir collector/RES_2_1/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_1/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_2/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_3/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_4/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_5/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_6/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_7/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_8/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_9/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_10/idle/image0000.png',
        buildingsDir + 'elixir collector/RES_2_11/idle/image0000.png',
    ],
    elixir_storage: [
        [],
        [
            buildingsDir + 'elixir storage/STO_2_1/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_1/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_1/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_1/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_2/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_2/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_2/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_2/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_3/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_3/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_3/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_3/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_4/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_4/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_4/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_4/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_5/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_5/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_5/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_5/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_6/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_6/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_6/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_6/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_7/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_7/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_7/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_7/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_8/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_8/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_8/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_8/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_9/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_9/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_9/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_9/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_10/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_10/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_10/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_10/idle/image0003.png',
        ],
        [
            buildingsDir + 'elixir storage/STO_2_11/idle/image0000.png',
            buildingsDir + 'elixir storage/STO_2_11/idle/image0001.png',
            buildingsDir + 'elixir storage/STO_2_11/idle/image0002.png',
            buildingsDir + 'elixir storage/STO_2_11/idle/image0003.png',
        ],
    ],
    gold_mine: [
        buildingsDir + 'gold mine/RES_1_1/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_1/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_2/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_3/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_4/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_5/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_6/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_7/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_8/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_9/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_10/idle/image0000.png',
        buildingsDir + 'gold mine/RES_1_11/idle/image0000.png',
    ],
    gold_storage: [
        [],
        [
            buildingsDir + 'gold storage/STO_1_1/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_1/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_1/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_1/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_2/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_2/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_2/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_2/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_3/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_3/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_3/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_3/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_4/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_4/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_4/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_4/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_5/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_5/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_5/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_5/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_6/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_6/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_6/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_6/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_7/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_7/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_7/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_7/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_8/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_8/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_8/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_8/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_9/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_9/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_9/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_9/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_10/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_10/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_10/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_10/idle/image0003.png',
        ],
        [
            buildingsDir + 'gold storage/STO_1_11/idle/image0000.png',
            buildingsDir + 'gold storage/STO_1_11/idle/image0001.png',
            buildingsDir + 'gold storage/STO_1_11/idle/image0002.png',
            buildingsDir + 'gold storage/STO_1_11/idle/image0003.png',
        ],
    ],
    townhall: [
        buildingsDir + 'townhall/TOW_1_1/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_1/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_2/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_3/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_4/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_5/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_6/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_7/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_8/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_9/idle/image0000.png',
        buildingsDir + 'townhall/TOW_1_10/idle/image0000.png',
    ],
    canon_base: [
        buildingsDir + 'defense_base/DEF_1_1_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_1_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_2_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_3_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_4_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_5_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_6_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_7_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_8_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_9_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_10_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_11_Shadow.png',
        buildingsDir + 'defense_base/DEF_1_12_Shadow.png',
    ],
    canon: [
        [],
        [
            buildingsDir + 'cannon/canon_1/idle/image0000.png',
            buildingsDir + 'cannon/canon_1/idle/image0001.png',
            buildingsDir + 'cannon/canon_1/idle/image0002.png',
            buildingsDir + 'cannon/canon_1/idle/image0003.png',
            buildingsDir + 'cannon/canon_1/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_2/idle/image0000.png',
            buildingsDir + 'cannon/canon_2/idle/image0001.png',
            buildingsDir + 'cannon/canon_2/idle/image0002.png',
            buildingsDir + 'cannon/canon_2/idle/image0003.png',
            buildingsDir + 'cannon/canon_2/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_3/idle/image0000.png',
            buildingsDir + 'cannon/canon_3/idle/image0001.png',
            buildingsDir + 'cannon/canon_3/idle/image0002.png',
            buildingsDir + 'cannon/canon_3/idle/image0003.png',
            buildingsDir + 'cannon/canon_3/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_4/idle/image0000.png',
            buildingsDir + 'cannon/canon_4/idle/image0001.png',
            buildingsDir + 'cannon/canon_4/idle/image0002.png',
            buildingsDir + 'cannon/canon_4/idle/image0003.png',
            buildingsDir + 'cannon/canon_4/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_5/idle/image0000.png',
            buildingsDir + 'cannon/canon_5/idle/image0001.png',
            buildingsDir + 'cannon/canon_5/idle/image0002.png',
            buildingsDir + 'cannon/canon_5/idle/image0003.png',
            buildingsDir + 'cannon/canon_5/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_6/idle/image0000.png',
            buildingsDir + 'cannon/canon_6/idle/image0001.png',
            buildingsDir + 'cannon/canon_6/idle/image0002.png',
            buildingsDir + 'cannon/canon_6/idle/image0003.png',
            buildingsDir + 'cannon/canon_6/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_7/idle/image0000.png',
            buildingsDir + 'cannon/canon_7/idle/image0001.png',
            buildingsDir + 'cannon/canon_7/idle/image0002.png',
            buildingsDir + 'cannon/canon_7/idle/image0003.png',
            buildingsDir + 'cannon/canon_7/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_8/idle/image0000.png',
            buildingsDir + 'cannon/canon_8/idle/image0001.png',
            buildingsDir + 'cannon/canon_8/idle/image0002.png',
            buildingsDir + 'cannon/canon_8/idle/image0003.png',
            buildingsDir + 'cannon/canon_8/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_9/idle/image0000.png',
            buildingsDir + 'cannon/canon_9/idle/image0001.png',
            buildingsDir + 'cannon/canon_9/idle/image0002.png',
            buildingsDir + 'cannon/canon_9/idle/image0003.png',
            buildingsDir + 'cannon/canon_9/idle/image0004.png',
        ],
        [
            buildingsDir + 'cannon/canon_10/idle/image0000.png',
            buildingsDir + 'cannon/canon_10/0idle/image0001.png',
            buildingsDir + 'cannon/canon_10/idle/image0002.png',
            buildingsDir + 'cannon/canon_10/idle/image0003.png',
            buildingsDir + 'cannon/canon_10/idle/image0004.png',
        ],
    ],
    labratory: [
        buildingsDir + 'labratory/LAB_1_1/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_1/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_2/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_3/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_4/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_5/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_6/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_7/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_8/idle/image0000.png',
        buildingsDir + 'labratory/LAB_1_9/idle/image0000.png'
    ],
    dark_elixir_collector: [
        buildingsDir + 'dark elixir collector/RES_3_1/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_1/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_2/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_3/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_4/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_5/idle/image0000.png',
        buildingsDir + 'dark elixir collector/RES_3_6/idle/image0000.png',
    ],
    dark_elixir_storage: [
        [],
        [
            buildingsDir + 'dark elixir storage/STO_3_1/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_1/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_1/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_1/idle/image0003.png',
        ],
        [
            buildingsDir + 'dark elixir storage/STO_3_2/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_2/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_2/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_2/idle/image0003.png',
        ],
        [
            buildingsDir + 'dark elixir storage/STO_3_3/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_3/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_3/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_3/idle/image0003.png',
        ],
        [
            buildingsDir + 'dark elixir storage/STO_3_4/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_4/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_4/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_4/idle/image0003.png',
        ],
        [
            buildingsDir + 'dark elixir storage/STO_3_5/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_5/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_5/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_5/idle/image0003.png',
        ],
        [
            buildingsDir + 'dark elixir storage/STO_3_6/idle/image0000.png',
            buildingsDir + 'dark elixir storage/STO_3_6/idle/image0001.png',
            buildingsDir + 'dark elixir storage/STO_3_6/idle/image0002.png',
            buildingsDir + 'dark elixir storage/STO_3_6/idle/image0003.png',
        ],
    ],
    wall: [
        [],
        [
            buildingsDir + 'wall/WAL_1_1/WAL_1_1/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_1/WAL_1_1/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_1/WAL_1_1/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_1/WAL_1_1/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_2/WAL_1_2/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_2/WAL_1_2/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_2/WAL_1_2/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_2/WAL_1_2/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_3/WAL_1_3/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_3/WAL_1_3/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_3/WAL_1_3/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_3/WAL_1_3/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_4/WAL_1_4/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_4/WAL_1_4/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_4/WAL_1_4/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_4/WAL_1_4/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_5/WAL_1_5/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_5/WAL_1_5/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_5/WAL_1_5/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_5/WAL_1_5/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_6/WAL_1_6/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_6/WAL_1_6/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_6/WAL_1_6/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_6/WAL_1_6/idle/image0003.png',
        ],
        [
            buildingsDir + 'wall/WAL_1_7/WAL_1_7/idle/image0000.png',
            buildingsDir + 'wall/WAL_1_7/WAL_1_7/idle/image0001.png',
            buildingsDir + 'wall/WAL_1_7/WAL_1_7/idle/image0002.png',
            buildingsDir + 'wall/WAL_1_7/WAL_1_7/idle/image0003.png',
        ],
    ],
    clanCastle: [
        buildingsDir + 'clan_castle/CLC_1_0/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_1/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_2/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_3/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_4/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_5/idle/image0000.png',
        buildingsDir + 'clan_castle/CLC_1_6/idle/image0000.png',
    ]
};



var clanDir = "res/Art/Bang hoi/";
res.clan = {
    cup1: clanDir + "CUP 1.png",
    cup2: clanDir + "cup nho.png",
    cup3: clanDir + "cup.png",
    greenBtn: clanDir + "button _xem lai.png",
    redBtn: clanDir + "button _ tra thu.png",
    myClanBg: clanDir + "NEN NHO _BANG HOI CUA TOI.png",
    troophyBg: clanDir + "1.png",
    textBg1: clanDir + "slost nen 1.png",
    textBg2: clanDir + "slost nen 2.png",
    nextBtn: clanDir + "next 1.png",
    prevBtn: clanDir + "next 2.png",
    popupBtn: clanDir + "POPUP_0000_Group-3.png",
    tabSelect: clanDir + "o duoi.png",
    tabUnselect: clanDir + "o duoi 1.png",
    flagSelect: clanDir + "co 1.png",
    flagUnselect: clanDir + "co 2.png",
    checkBoxBg: clanDir + "Untitled-1.png",
    checkBoxSelect: clanDir + "Untitled-1.pngsdva.png",
    slost: clanDir + "slost.png",
    bigStar: clanDir + "sao sao.png",
    smallStar: clanDir + "sao nho.png",
    bubble: [
        clanDir + "POPUP_0002_Layer-4.png",
        clanDir + "POPUP_0003_Shape-86.png",
        clanDir + "POPUP_0004_Layer-3.png",
        clanDir + "POPUP_0005_Layer-2.png",
    ],
    bubbleButton: clanDir + "POPUP_0000_Group-3.png",

    mapIconDir: clanDir + "bieu tuong tren map/",
    iconDir: clanDir + "icon bieu tuong/",
};

res.font_soji = {
    "20": 'res/Art/Fonts/soji_20.fnt',
    "16": 'res/Art/Fonts/soji_16.fnt',
    "12": 'res/Art/Fonts/soji_12.fnt',
    "24": 'res/Art/Fonts/soji_24.fnt'
};

res.gui = {
    bg_exp: 'res/Art/GUIs/Main_Gui/bg_exp.png',
    exp_bg_bar: 'res/Art/GUIs/Main_Gui/exp_bg_bar.png',
    ic_exp: 'res/Art/GUIs/Main_Gui/ic_exp.png',
    exp_bar: 'res/Art/GUIs/Main_Gui/exp_bar.png',
    trophy_bg_bar: 'res/Art/GUIs/Main_Gui/trophy_bg_bar.png',
    ranking: 'res/Art/GUIs/Main_Gui/ranking.png',

    builder_icon: 'res/Art/GUIs/Main_Gui/builder_icon.png',
    army_icon: 'res/Art/GUIs/Main_Gui/army_icon.png',
    shield_icon: 'res/Art/GUIs/Main_Gui/shield.png',

    gold_icon: 'res/Art/GUIs/Main_Gui/gold_icon.png',
    elixir_icon: 'res/Art/GUIs/Main_Gui/elixir_icon.png',
    dark_elixir_icon: 'res/Art/GUIs/Main_Gui/darkElixir_icon.png',
    gold_bar: 'res/Art/GUIs/Main_Gui/gold_bar.png',
    elixir_bar: 'res/Art/GUIs/Main_Gui/elixir_bar.png',
    dark_elixir_bar: 'res/Art/GUIs/Main_Gui/darkElixir_bar.png',
    res_bg: 'res/Art/GUIs/Main_Gui/bg_bar_2.png',
    g_bg: "res/Art/GUIs/Main_Gui/bg_bar_3.png",
    g_icon: "res/Art/GUIs/Main_Gui/g_icon.png",
    troophy_bg: 'res/Art/GUIs/Main_Gui/bg_bar_1.png',

    shop_icon: 'res/Art/GUIs/Main_Gui/shop.png',
    attack_icon: 'res/Art/GUIs/Main_Gui/attack.png',
    setting_icon: 'res/Art/GUIs/Main_Gui/setting.png',
    treasure_icon: 'res/Art/GUIs/Main_Gui/kho.png',
    info_icon: 'res/Art/GUIs/Action_Building_Icon/info_icon.png',
    upgrade_icon: 'res/Art/GUIs/Action_Building_Icon/upgrade_icon.png',
    cancel_icon: 'res/Art/GUIs/Action_Building_Icon/cancel_icon.png',
    quick_finish_icon: 'res/Art/GUIs/Action_Building_Icon/quick_finish.png',
    remove_icon: 'res/Art/GUIs/Action_Building_Icon/remove_icon.png',
    research_icon: 'res/Art/GUIs/Action_Building_Icon/research_icon.png',
    collect_gold_icon: 'res/Art/GUIs/Action_Building_Icon/harvest_gold.png',
    collect_elixir_icon: 'res/Art/GUIs/Action_Building_Icon/harvest_elixir.png',
    collect_dark_elixir_icon: 'res/Art/GUIs/Action_Building_Icon/harvest_dark_elixir.png',
    train_icon: 'res/Art/GUIs/Action_Building_Icon/train_icon.png',
    select_line_icon: 'res/Art/GUIs/Action_Building_Icon/select_line.png',
    rotate_icon: 'res/Art/GUIs/Action_Building_Icon/rotate_icon.png',
    clan_icon: 'res/Art/GUIs/Action_Building_Icon/clan_button.png',
    request_troop_icon: 'res/Art/GUIs/Action_Building_Icon/request_troop_button.png',
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

var g_resources = [];

var name = name || {};
name.building = {
    TOW_1: {
        vi: 'Nhà chính',
        en: 'TownHall'
    },
    CLC_1: {
        vi: 'Nhà Bang Hội',
        en: 'Clan Castle'
    },
    BDH_1: {
        vi: 'Nhà thợ xây',
        en: 'Builder Hut'
    },
    AMC_1: {
        vi: 'Doanh Trại',
        en: 'Army Camp'
    },
    BAR_1: {
        vi: 'Nhà lính',
        en: 'Barrack'
    },
    STO_1: {
        vi: 'Kho vàng',
        en: 'Gold Storage'
    },
    STO_2: {
        vi: 'Kho dầu',
        en: 'Elixir Storage'
    },
    STO_3: {
        vi: 'Kho dầu đen',
        en: 'Dark Elixir Storage'
    },
    RES_1: {
        vi: 'Mỏ vàng',
        en: 'Gold Mine'
    },
    RES_2: {
        vi: 'Mỏ dầu',
        en: 'Elixir Mine'
    },
    RES_3: {
        vi: 'Mỏ dầu đen',
        en: 'Dark Elixir Mine'
    },
    WAL_1: {
        vi: 'Tường',
        en: 'Wall'
    },
    LAB_1: {
        vi: '',
        en: 'Laboratory'
    },
    SPF_1: {
        vi: '',
        en: 'Spell Factory'
    },
    KQB_1: {
        vi: '',
        en: 'King'
    },
    KQB_2: {
        vi: '',
        en: 'Queen'
    },
    KQB_3: {
        vi: '',
        en: 'Temple'
    },
    BAR_2: {
        vi: '',
        en: 'X-men House'
    },
    KQB_4: {
        vi: '',
        en: 'KQB_4'
    },
    DEF_1: {
        vi: 'Thần công',
        en: 'Cannon'
    },
    DEF_2: {
        vi: '',
        en: 'Archer Tower'
    },
    DEF_3: {
        vi: '',
        en: 'Trebuchet'
    },
    DEF_4: {
        vi: '',
        en: 'Wizard Tower'
    },
    DEF_5: {
        vi: '',
        en: 'A.A Gun'
    },
    DEF_7: {
        vi: '',
        en: 'Bow Machine'
    },
    DEF_8: {
        vi: '',
        en: 'Lightning Tower'
    }
};

name.troop = {
    ARM_1: {
        vi: 'Chiến binh',
        en: 'Warrior'
    },
    ARM_2: {
        vi: 'Cung thủ',
        en: 'Archer'
    },
    ARM_3: {
        vi: 'Đạo tặc',
        en: 'Goblin'
    },
    ARM_4: {
        vi: 'Gã khổng lồ',
        en: 'Giant'
    },
    ARM_5: {
        vi: 'Xác ướp',
        en: ''
    },
    ARM_6: {
        vi: 'Kẻ đào tẩu',
        en: ''
    },
    ARM_7: {
        vi: 'Nhà tiên tri',
        en: ''
    },
    ARM_8: {
        vi: 'Thiên tộc',
        en: ''
    },
    ARM_9: {
        vi: 'Rồng vàng',
        en: ''
    },
    ARM_10: {
        vi: 'Chúa tể bóng tối',
        en: ''
    },
    ARM_11:{  },
    ARM_12:{  },
    DAR_1:{  },
    DAR_2:{  },
    DAR_3:{  },
    DAR_4:{  },
    DAR_5:{  },
    DAR_6:{  },
    DAR_7:{  },
    DAR_8:{  },
    ARM_13:{  },
    ARM_14:{  },
    ARM_15:{  },
    ARM_16:{  },
    ARM_17:{  },
    DAR_9:{  },
    DAR_10:{  },
    ARM_18:{  },
    ARM_19:{  },
    ARM_31:{  },
}

var TILE_WIDTH = 76;
var TILE_HEIGHT = 57;
var DIAGONAL = 95;

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

var MAPVALUE = {
    UNUSED: -1,
    MAPSIZE: 40,
};

var SOLID_MAP_VALUE = {
    SIZE: 80,
    GROUND: 0,
    SOLID_1: 1,
    SOLID_2: 2
};

var SOUND = true;

var ZOOM_SCALE = {
    MAX: 2,
    MIN: 0.4
};
           
var time = {
    BONUS_TIME: 2,
    DeltaTime: 0   //Client - Server
};


var research_constant = {
    troop: null,
    time_text_dir : 'res/Art/Fonts/soji_20.fnt',
    research_dir : "res/Art/GUIs/research troop/",
    img_troop_dir : "res/Art/GUIs/upgrade_troop/small_icon/",
    nameTroop_font_dir : 'res/Art/Fonts/soji_20.fnt',
    description_dir : 'res/Art/Fonts/fista_20_non.fnt',
    imgG_dir : "res/Art/GUIs/shop_gui/g.png",
    status: {
        free: "completed",
        busy: "researching",
        now: "completed",
    },
    used_open : false
};

//type Response
var RESPONSE_VALIDATE = 1;
var RESPONSE_TO_ALL = 2;

//type message
var MESSAGE_NORMAL = 1;
var MESSAGE_ASK_TROOP = 2;

//type member
var ONLINE = 1;
var OFFLINE = 2;

var MAX_MESSAGES_QUEUE = 100;
var MAX_LENGTH_MESSAGE = 50;
var MAX_TROOP_AMOUNT_USER_CAN_GIVE = 5;
var TIME_REQUEST_TROOP = 1200000;              //ms
//var ID_CLC_BUILDING = 0;