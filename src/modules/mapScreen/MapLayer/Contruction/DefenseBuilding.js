var DefenseBuilding = Building.extend({
    ctor: function(info) {
        this._super(info);
    },
    showRange: function() {
        this.rangeLine && this.rangeLine.setVisible(true);
    },
    hideRange: function() {
        this.rangeLine && this.rangeLine.setVisible(false);
    },
    initRange: function() {
        // ghi đè
    }
});