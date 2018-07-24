var ShowBuildPopup = TinyPopup.extend({
    ctor:function(width, height, title, data, type, listener) {
        this._super(width, height, title, data, type, listener);
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
        if(this._listener.type == 'resources'){
            MAP.buildNewContruction(this._listener.building);
        }else if(this._listener.type == 'builder'){
            MAP.buildNewContruction(this._listener.building);
        }
        MAP.resetReducedTempResources();
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));

        if(this._listener.type == 'resources'){
            _.extend(ReducedTempResources, this._listener.building.cost);
            ReducedTempResources.coin += this._listener.gResources;
            if(!checkIsFreeBuilder()){
                var gBuilder = getGToReleaseBuilder();
                if(gv.user.coin < gBuilder){
                    //Show popup khong du G va thoat
                    var listener1 = {contentBuyG:"Please add more G to release a builder!"};
                    var popup = new TinyPopup(cc.winSize.width*3/5, cc.winSize.height*2/5, "All builders are busy", null, true, listener1);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }else{
                    //Show popup dung G de release 1 tho xay
                    var listener2 = {type:'builder', building:this._listener.building, newBuilding:this._listener.newBuilding, gBuilder:gBuilder};
                    var popup = new ShowBuildPopup(cc.winSize.width*3/5, cc.winSize.height*2/5, "Use G to release a builder", null, false, listener2);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }else{
                NETWORK.sendRequestAddConstruction(this._listener.newBuilding, this._listener.building, ReducedTempResources);
            }
        }else if(this._listener.type == 'builder'){
            ReducedTempResources.coin += this._listener.gBuilder;
            //Neu ok, Chuyen trang thai nha dc release sang 'complete'
            var idBuildingWillComplete = getIdBuildingMinRemainTime();
            finishSmallestRemainingTimeBuilding();
            NETWORK.sendRequestAddConstruction(this._listener.newBuilding, this._listener.building, ReducedTempResources);
        }
    }
});