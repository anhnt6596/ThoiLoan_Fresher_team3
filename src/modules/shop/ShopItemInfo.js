var ItemInfo = TinyPopup.extend({

    ctor:function(width, height, title, type, listener) {
        this._super(width, height, title, type, listener);
        this.showInfoItem(title)
    },

    showInfoItem:function(itemName){
        //Tren chiem 1/2 chieu cao ben trong cua popup
            //Trai co hinh anh
            //Phai co tu 1 toi 4 thanh:


        //Duoi co nen trang chua intro, 1 so nha co hinh anh cua cac loai item dc mo khoa
        //var mapLayer = cc.LayerColor.create(cc.color(100, 128, 128, 255), this._frame.width*this._frame.scaleX, this._frame.height*this._frame.scaleY);
        //mapLayer.scaleX = this._frame.width*this._frame.scaleX;
        //mapLayer.scaleY = this._frame.height*this._frame.scaleY;
        //mapLayer.setAnchorPoint(0, 0);
        //mapLayer.setPosition(this._frame.x, this._frame.y);
        //this._frame.addChild(mapLayer, 2);

    },
    


    //ghi de ham trong popup
    onCloseCallback:function () {
        cc.director.popToRootScene();
    }
});
