var RESEARCH_GUI = RESEARCH_GUI || null;
var troopInfo = troopInfo || [];

var ResearchGUI = ui.PopUp.extend({            
    size : {
        width: 739,
        height: 476
    },    
    ctor: function() {
        RESEARCH_GUI = this,
        this._super("Nhà nghiên cứu", [], 'res/Art/GUIs/research troop/nen 1.png');
        this.init();
        this.openAction();
    },
    init: function () {
        this.initInfoResearch();
        this.initScrollBar();

    },           
    initInfoResearch: function(){        
        //*****************hien thi info*******************
        var researchStatusInfo = new ResearchStatusInfo();
        this.researchStatusInfo = researchStatusInfo;
        researchStatusInfo.attr({
            x: 0,
            y: 130
        })
        this.addChild(researchStatusInfo,100);
    },
    quickFinishResearch: function(){
        console.log("on Quick Finish Researching");        
        troop = research_constant.troop;
        var countDownDate = config.troop[troop.type][troop.level+1].researchTime*1000;
        var now = getCurrentServerTime();
        var distance = countDownDate - (now - troop.startTime);
        console.log("distance = " + distance);
        var gFinish = timeToG(distance/1000);


        cc.log("==========================================THOI GIAN: " + distance);
        if(gv.user.coin < gFinish){
            showPopupNotEnoughG('quick_finish');
        }else {
            this.researchStatusInfo.time_count && clearInterval(this.researchStatusInfo.time_count);
            gv.user.coin -=gFinish;            
            LOBBY.update(gv.user);
            NETWORK.sendResearchQuickFinish(research_constant.troop.type);
            this.onFinishResearch(research_constant.troop.type, true);
        }
    },

    initScrollBar: function() {
        var scrollView = new testscrollview();
        

        this.scrollView = scrollView;

        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        var dir_btn_bg_ = "res/Art/GUIs/research troop/slost.png";
        var imageView = new ccui.ImageView();
        imageView.loadTexture(dir_btn_bg_);
        var innerWidth = 116;
        var innerHeight = 127;

        //scrollView.setInnerContainerSize(cc.size(6*(116+10), 2*(127+10)));
        
        scrollView.setContentSize(cc.size(639,300));        
        scrollView.setPosition(cc.p(0,-80));
        scrollView.setAnchorPoint(cc.p(0.5,0.5));
        
        cc.log("OK");
        

        this.addChild(scrollView, 100);
    },    
    onResearchItem: function(type) {
        
        var elixir_rq = this.getResourceRequire(type, troopInfo[type].level+1, "researchElixir");
        var dark_elixir_rq = this.getResourceRequire(type, troopInfo[type].level+1, "researchDarkElixir");

        var g_chuyendoi = checkUserResourcesResearch(0,elixir_rq,dark_elixir_rq,0);
        if (g_chuyendoi>gv.user.coin){
            showPopupNotEnoughG('research');
        }
        else {
            console.log("status cua quan linh truoc khi train la "+ troopInfo[type].status);
            NETWORK.sendResearchTroop(type);
            research_constant.status.now = research_constant.status.busy;

            var timeStart = getCurrentServerTime();
            var troop = {type: type, level: troopInfo[type].level , status: research_constant.status.busy, timeStart: timeStart};
            research_constant.troop = troop;

            reduceUserResourcesResearch(0,elixir_rq,dark_elixir_rq,g_chuyendoi);

            this.researchStatusInfo.update();
            this.scrollView.update();

            LAB_BUILDING.progressStatus();
        }
    },
    onFinishResearch: function (type, isQuickFinish) {

        troopInfo[type].status = research_constant.status.free;                
        troopInfo[type].level ++;

        research_constant.status.now = research_constant.status.free;
        research_constant.troop = null;
        
        this.researchStatusInfo.update();
        this.scrollView.update();
        //this.setEnableBtn(true);
        if (!isQuickFinish) {
            NETWORK.sendResearchComplete(type);
        }
        console.log("Xu ly mat timebar");
        LAB_BUILDING.clearResearchTimebar();

    },
    getResourceRequire: function(type,level,resource_type){
        return config.troop[type][level][resource_type];
    },
    updateInfo: function(){
        this.researchStatusInfo.update();
        this.scrollView.update();    
    
    },
    setEnableBtn: function (status) {
        var self = this;
        this.listBtn_troop.forEach(function(element) {
            element.setEnabled(status);
            if (status) {
                element.img.setColor(new cc.color(255, 255, 255, 255));
            } else {
                element.img.setColor(new cc.color(100, 100, 100, 255));
            }
        })
    },
    close: function(){
        
        //this.zIndex = -1000;
        RESEARCH_GUI.setVisible(false)
        LAB_BUILDING.progressStatus();
    }
});
