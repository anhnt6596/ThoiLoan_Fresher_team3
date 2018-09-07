var testscrollview = ccui.ScrollView.extend({
    listBtn_troop: {},
    // //外部参数
    // reslist:null, //按钮资源列表
    // selectreslist:null, //选中资源列表
    // direction:null, //方向 水平从左到右 垂直从上到下 ccui.ScrollView.DIR_VERTICAL ccui.ScrollView.DIR_HORIZONTAL
    // click_callback:null, //点击回调
    // itemspace:0, //item间隔
    
    // //内部参数
    // itemlist:null,                  //item列表
    // selected:null,                  // 选中tag
    // currentselect:null,             //当前选中
    // itemsize:null,                  //item尺寸，包含宽高
    // innersize:null,                 //内部宽高
    ctor : function(){
        this._super();
        this.initListBtn();
        this.update();
    },
    onExist:function(){
        this._super();
    },    
    initListBtn: function(){
        this.innerWidth = 116;
        this.innerHeight = 127;

        for (var i=0;i<6;i++){
            var type = 'ARM_'+(i+1);
            cc.log("type = " + type);
            var button = new ItemBtn(type,i*(this.innerWidth+10)+ this.innerWidth/2+10, 230);            
            this.addChild(button,100);
            this.listBtn_troop[type] = button;
        }
        i = 6;
        for (i=6;i<10;i++){
            var type = 'ARM_'+(i+1);
            cc.log("type = " + type);            
            var button = new ItemBtn(type,(i - 6) * (this.innerWidth + 10) + this.innerWidth / 2 + 10, 100);            
            this.addChild(button,100);
            this.listBtn_troop[type] = button;
        }                
    },
    update: function(){
        for (item in this.listBtn_troop){
            element = this.listBtn_troop[item];
            element.updateBtnBuyInfo();
            if (research_constant.troop ) {
                element.setEnableBtn(false);
            }
        }       
    },
    });
    