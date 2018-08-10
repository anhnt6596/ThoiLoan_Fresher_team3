var CollectorBuilding = Building.extend({
    ctor: function(info) {
        this._super(info);
    },
    disableCollectIcon: function(){
        if (this.collect_bg){
            this.collect_bg.setVisible(false);
        }
        if (this.full_bg){
            this.full_bg.setVisible(false);
        }
    },
});