var config = config || {};
config.building = {};

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}

var listBuildingConfigDir = [
    "res/Config json/ArmyCamp.json",
    "res/Config json/Barrack.json",
    "res/Config json/BuilderHut.json",
    "res/Config json/Laboratory.json",
    "res/Config json/Barrack.json",
    "res/Config json/Resource.json",
    "res/Config json/Storage.json",
    "res/Config json/TownHall.json",
];

listBuildingConfigDir.forEach(function(dir) {
    cc.loader.loadJson(dir, function(error, data){
        var building = config.building;
        building = extend(building, data);
        config.building = building;
    });
});

cc.log('>>>>>>>>>>>>>', config.building.RES_1[1].width)
