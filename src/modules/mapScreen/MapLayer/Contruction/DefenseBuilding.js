var DefenseBuilding = Building.extend({
    ctor: function(info) {
        this._super(info);
        var range = new cc.DrawNode();
        range.drawCircle(new cc.p(this.buildingImg.x, this.buildingImg.x), 300, 50, 50, false, 50, new cc.Color(0, 0, 0, 255));
        this.buildingImg.addChild(range, 10000000);
    },
    showRange: function() {
        // hiển thị tầm, kế thừa ở DefenseBuilding và ClanCastle
    },
    hideRange: function() {
        // hiển thị tầm, kế thừa ở DefenseBuilding và ClanCastle
    },
});