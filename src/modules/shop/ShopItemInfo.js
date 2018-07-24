var ShopItemInfo = TinyPopup.extend({

    ctor:function(width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
        this.showInfoItem(title)
    },

    showInfoItem:function(itemName){
        //var buildingImg = this.showBuildingImg(itemName);
        //buildingImg.attr({
        //    x: -250,
        //    y: 100,
        //});
        //
        //var buildingInfo = this.showBuildingInfo(itemName);
        //buildingInfo.attr({
        //    x: -50,
        //    y: 130,
        //});



    },
    
    showBuildingImg:function(itemName){

    },

    showBuildTimeText:function(itemName){
        
    },
    
    showBuildingInfo:function(itemName){
        
    },


    //ghi de ham trong popup
    onCloseCallback:function () {
        cc.director.popToRootScene();
    },
});
