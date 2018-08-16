var ShowBuildPopup = TinyPopup.extend({
    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.showContent(data)
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        if(this._data.type != 'builder'){
            _.extend(ReducedTempResources, this._data.building.cost);
            ReducedTempResources.coin += this._data.g;
            if(!checkIsFreeBuilder()){
                var gBuilder = getGToReleaseBuilder();
                if(gv.user.coin < gBuilder){
                    showPopupNotEnoughG('release_builder');
                }else{
                    var data2 = {type:'builder', building:this._data.building, newBuilding:this._data.newBuilding, g:gBuilder};
                    var popup = new ShowBuildPopup(cc.winSize.width/2, cc.winSize.height/1.5, "All builders are busy", false, data2);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }else{
                NETWORK.sendRequestAddConstruction(this._data.newBuilding, this._data.building);
                // MAP.suggestNewWal(this._data.newBuilding);
            }
        }else if(this._data.type == 'builder'){
            ReducedTempResources.coin += this._data.g;
            finishSmallestRemainingTimeBuilding();
            NETWORK.sendRequestAddConstruction(this._data.newBuilding, this._data.building);
            // MAP.suggestNewWal(this._data.newBuilding);
        }
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        resetReducedTempResources();
    },
});