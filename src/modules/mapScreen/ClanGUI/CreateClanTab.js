var CreateClanTab = Tab.extend({
    _status: ["Mở", "Đóng", "Xác nhận"],
    clanStatus: 0,
    requireTroophy: 0,
    iconType: 1,
    cost: 40000,
    ctor: function(tabNumber) {
        this._super(tabNumber);
        this.init();
    },
    init: function() {
        this.initCreateClanView();
    },
    initCreateClanView: function() {
        var editView = new EditClanView();
        editView.attr({
            x: this.width / 2,
            y: this.height / 2,
            width: this.width,
            height: this.height,
        });
        this.addChild(editView);
    }
});