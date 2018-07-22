var TinyPopup = cc.Node.extend({
    _frame:null,
    _listener:null,

    //type = true (X)
    //type = false (X + functinal Btn)
    //listener la 1 obj: listener.type = "resource" || "builder"; listener.building = building
    ctor:function(width, height, title, data, type, listener) {
        this._super();
        this.init(width, height, title, data, type, listener);
    },

    init:function(width, height, title, data, type, listener){
        this._listener = listener;
        this.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height / 2,
            width: cc.winSize.width,
            height: cc.winSize.height,
            color: cc.color(100, 100, 100, 100),
        });

        var background = new ccui.Button('res/Art/GUIs/pop_up/bg_color.png', 'res/Art/GUIs/pop_up/bg_color.png');
        background.attr({
            x: 0,
            y: 0,
            scale: 100,
        });
        this.addChild(background, 0);

        this._frame = new cc.Sprite('res/Art/GUIs/train_troop_gui/background.png');
        this._frame.attr({
            scale: 2.3,
            x: 0,
            y: 0,
        });
        this.addChild(this._frame, 1);


        var closeBtn = new ccui.Button('res/Art/GUIs/pop_up/close.png');
        closeBtn.attr({
            x: this._frame.width - 30,
            y: this._frame.height - 25,
            scale: 1,
        });
        this._frame.addChild(closeBtn, 2);
        closeBtn.addClickEventListener(this.close.bind(this));


        if(!type){
            var acceptBtn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button2.png');
            acceptBtn.attr({
                x: this._frame.x + 200,
                y: this._frame.y + 40,
                scale: 1,
            });
            this._frame.addChild(acceptBtn, 200);
            acceptBtn.addClickEventListener(this.ok.bind(this));

            var btnText = new cc.LabelBMFont("Confirm", 'res/Art/Fonts/soji_12.fnt');
            btnText.attr({
                x: this._frame.x + 200,
                y: this._frame.y + 40,
                scale: 1,
            });
            this._frame.addChild(btnText, 202);
        }

        var titleText = new cc.LabelBMFont(title, 'res/Art/Fonts/soji_12.fnt');
        titleText.attr({
            x: this._frame.width / 2,
            y: 245,
            scale: 1,
        });
        this._frame.addChild(titleText, 2);

        if(!listener.contentBuyG){
            var contentText = new cc.LabelBMFont('Use ' + (listener.gBuilder ? listener.gBuilder : listener.gResources), 'res/Art/Fonts/soji_20.fnt');
            contentText.attr({
                x: this._frame.width / 2,
                y: 145,
                scale: 1,
                color: cc.color(0, 255, 0, 255),
            });
            this._frame.addChild(contentText, 2);


            var unit = new cc.Sprite('res/Art/GUIs/pop_up/G.png');
            unit.attr({
                x: contentText.x + contentText.width - 30,
                y: 145,
                scale: 0.7,
            });
            this._frame.addChild(unit, 2);
        }else{
            var contentText = new cc.LabelBMFont(listener.contentBuyG, 'res/Art/Fonts/soji_12.fnt');
            contentText.attr({
                x: this._frame.width / 2,
                y: 145,
                scale: 0.7,
                color: cc.color(0, 255, 0, 255),
            });
            this._frame.addChild(contentText, 2);
        }
        
        this.openAction();
    },
    openAction: function() {
        this.runAction(ui.BounceEff());
    },

    close: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));
        if(this._listener.type == 'resources'){
            MAP.buildNewContruction(listener.building);
        }else if(this._listener.type == 'builder'){
            MAP.buildNewContruction(listener.building);
        }
        MAP.resetReducedTempResources();
    },

    ok: function() {
        var act1 = new cc.ScaleTo(0.1, 1.4, 1.4);
        this.runAction(new cc.Sequence(act1, cc.CallFunc(() => this.getParent().removeChild(this), this)));

        if(this._listener.type == 'resources'){
            ReducedTempResources.gold += this._listener.building.cost.gold;
            ReducedTempResources.elixir += this._listener.building.cost.elixir;
            ReducedTempResources.darkElixir += this._listener.building.cost.darkElixir;
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
                    var popup = new TinyPopup(cc.winSize.width*3/5, cc.winSize.height*2/5, "Use G to release a builder", null, false, listener2);
                    cc.director.getRunningScene().addChild(popup, 2000000);
                }
            }else{
                MAP.sendRequestAddConstruction(this._listener.newBuilding, this._listener.building, ReducedTempResources);
            }
        }else if(this._listener.type == 'builder'){
            ReducedTempResources.coin += this._listener.gBuilder;
            //Neu ok, Chuyen trang thai nha dc release sang 'complete'
            var idBuildingWillComplete = getIdBuildingMinRemainTime();
            for(var item in contructionList){
                if(contructionList[item]._id == idBuildingWillComplete){
                    contructionList[item].status = 'complete';
                }
            }
            for(var k in objectRefs){
                if(objectRefs[k]._id == idBuildingWillComplete){
                    objectRefs[k].buildComplete();
                }
            }
            MAP.sendRequestAddConstruction(this._listener.newBuilding, this._listener.building, ReducedTempResources);            
        }
    }
});
