var troopInfo = troopInfo || [];
var ResearchPOPUP = ResearchPOPUP || null;
var ResearchPopUp = ui.PopUp.extend({

    lab_level: 1,
    listTroop: {
        ARM_1: {
            name: "Đạo tặc",
            level: 0,
        },
        ARM_2: {
            name: "Cô nương",
            level: 0,
        },
        ARM_3: {
            name: "Công tước",
            level: 0,
        },
        ARM_4: {
            name: "Quái thú",
            level: 0,
        },
        ARM_5: {
            name: "Chiến binh",
            level: 0,
        },
        ARM_6: {
            name: "Quân sư",
            level: 0,
        },
        ARM_7: {
            name: "Pháp sư",
            level: 0,
        },
        ARM_8: {
            name: "Chó trắng",
            level: 0,
        },
        ARM_9: {
            name: "Ốc con công",
            level: 0,
        },
        ARM_10: {
            name: "Cây xà quỳ",
            level: 0,
        },

    },
    listBtn_troop : [],
    listImg_troop : {},
    status: research_constant.status.free,
    troop : "",
    timeStart: 0,
    size : {
        width: 739,
        height: 476
    },
    count: 0,
    time_text: "",
    numberG_Text: "",
    nameTroopText: "",
    ctor: function() {
        ResearchPOPUP = this,
        this._super("Nhà nghiên cứu", [], 'res/Art/GUIs/research troop/nen 1.png');
        this.init();
    },
    init: function () {
        //console.log("khi open: ");
        //console.log("lab_status : "+ research_constant.status.now);
        //console.log("troop dang train neu co: "+ this.troop.toString());
        //
        //for (item in troopInfo) {
        //    var obj = troopInfo[item];
        //    cc.log('troopInfo.'+obj.type+'.level', troopInfo[item].level)
        //    cc.log('troopInfo.'+obj.type+'.isUnlock', troopInfo[item].isUnlock)
        //    cc.log('troopInfo.'+obj.type+'.population', troopInfo[item].population)
        //    cc.log('troopInfo.'+obj.type+'.startTime', troopInfo[item].startTime)
        //    cc.log('troopInfo.'+obj.type+'.status', troopInfo[item].status)
        //}
        this.checkStatusTroop();

        this.lab_level = this.getConstructionList("LAB_1","level");
        var troop = this.getTroopResearching();

        if (troop===null) {
            console.log("Khong co troop dang train");
            this.status = research_constant.status.free;
        }
        else {
            console.log("Troop dang upgrade la:" + troop.type);
            this.status = research_constant.status.busy;
            research_constant.status.now = this.status;
            this.troop = troop;
            this.timeStart = troop.startTime;
        }
        console.log("lab_level "+ this.lab_level);
        this.initInfoResearch();
        this.initScrollBar();
    },
    checkStatusTroop: function(){
        console.log("vao check status");
        for (item in troopInfo){
            obj = troopInfo[item];
            console.log(obj.type+" status: "+obj.status);
            if (obj.status === research_constant.status.busy){

                var countDownDate =config.troop[obj.type][obj.level+1].researchTime*1000;
                var now = getCurrentServerTime();
                console.log(obj.type+" startTime= "+obj.startTime+ "currentTime="+now);
                var distance = countDownDate - (now - obj.startTime);
                if (distance<=0){
                    obj.level++;

                    cc.log("=========================================HERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR 1===================");
                    //Cap nhat lai level linh trong TrainPopup cua Barrack
                    for(var i in barrackQueueList){
                        var barrack = barrackQueueList[i];
                        if(barrack._troopList){
                            for(var k in barrack._troopList){
                                if(barrack._troopList[k]._name == obj.type){
                                    barrack._troopList[k]._level++;
                                    cc.log("=========================================HERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR 3===================");
                                }
                            }
                        }
                    }

                    obj.status = research_constant.status.free;
                }
            }
        }
    },
    //tim building dua theo ten
    getConstructionList: function(name, type){
        for (buil in contructionList){
            building = contructionList[buil];
            if (building.name===name){
                //LAB_BUILDING = building;
                return building[type];
            }
        }
    },
    //tim troop dua theo type
    getTroopList: function( type){
        for (item in troopInfo){
            var troop = troopInfo[item];
            if (troop.type===type){
                return troop;
            }
        }
    },
    initInfoResearch: function(){
        this.listTroop = troopInfo;

        //*****************hien thi info*******************
        //dao tac cap 2
        var mieng_trang = new cc.Sprite("res/Art/GUIs/research troop/mieng_trang.png");
        this.mieng_trang = mieng_trang;
        mieng_trang.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: 0,
            y: 130,
        });
        //*****************add hinh anh quan linh dang nghien cuu *******************
        var i = 0;
        for (i = 0;i<=10;i++){
            var troop = this.getTroopList("ARM_"+(i+1));
            var img_troop = new cc.Sprite(research_constant.img_troop_dir+"ARM_"+(i+1)+"_"+(troop.level+1)+".png");
            img_troop.attr({
                x: mieng_trang.width/7,
                y: mieng_trang.height/2
            })
            mieng_trang.addChild(img_troop);
            img_troop.setVisible(false);
            this.listImg_troop["ARM_"+(i+1)] = img_troop;
        };
        this.nameTroopText = new cc.LabelBMFont('', research_constant.nameTroop_font_dir );
        this.nameTroopText.attr({
            x: mieng_trang.width/2,
            y: mieng_trang.height*4/5
        });
        mieng_trang.addChild(this.nameTroopText);

        //mui ten
        var mui_ten  = new cc.Sprite(research_constant.research_dir+"mui ten.png");
        mui_ten.attr({
            x: mieng_trang.width/2,
            y: mieng_trang.height/5,
        })
        mieng_trang.addChild(mui_ten);

        //thoi gian nghien cuu
        var research_time_Text = new cc.LabelBMFont("Thời gian nghiên cứu", research_constant.description_dir );
        research_time_Text.attr({
                x: mieng_trang.width/2,
                y: mieng_trang.height/2,
                scale: 0.75
            }
        )
        research_time_Text.setColor(new cc.Color(134,95,48));
        mieng_trang.addChild(research_time_Text);

        //Time Text
        this.time_text = new cc.LabelBMFont('', research_constant.time_text_dir );
        this.time_text.attr({
            x: mui_ten.width/2,
            y: mui_ten.height/2
        });
        mui_ten.addChild(this.time_text);

        //***************** hien thi button *******************
        //button
        var quickFinishBtn = new ccui.Button(research_constant.research_dir+"button.png");
        quickFinishBtn.attr({
            x: mieng_trang.width-70,
            y: mui_ten.y,
        });

        mieng_trang.addChild(quickFinishBtn);

        var numberG_Text = new cc.LabelBMFont('', research_constant.time_text_dir );
        this.numberG_Text = numberG_Text;
        numberG_Text.attr({
            x: quickFinishBtn.width*3/7,
            y: quickFinishBtn.height/2
        });
        quickFinishBtn.addChild(numberG_Text);
        self = this;



        var imgG  = new cc.Sprite(research_constant.imgG_dir);
        imgG.attr({
            x: quickFinishBtn.width*6/7,
            y: quickFinishBtn.height/2,
        })
        quickFinishBtn.addChild(imgG);

        //Quick finish Text
        var quick_finish_Text = new cc.LabelBMFont("Hoàn thành ngay:",research_constant. description_dir );
        quick_finish_Text.attr({
                x: quickFinishBtn.x,
                y: mieng_trang.height/2,
                scale: 0.75
            }
        )
        quick_finish_Text.setColor(new cc.Color(134,95,48));
        mieng_trang.addChild(quick_finish_Text);
        //********************khi khong co quan linh dang train********************************* */
        //********************khi khong co quan linh dang train********************************* */
        var mieng_trang_nothing = new cc.Sprite(research_constant.research_dir+"mieng_trang.png");
        this.mieng_trang_nothing = mieng_trang_nothing;
        mieng_trang_nothing.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: 0,
            y: 130,

        });

        var Chon_quan_linh_nang_cap_Text = new cc.LabelBMFont('HÃY CHỌN QUÂN LÍNH MÀ BẠN MUỐN NÂNG CẤP!', research_constant.nameTroop_font_dir );
        Chon_quan_linh_nang_cap_Text.attr({
            x: mieng_trang_nothing.width/2,
            y: mieng_trang_nothing.height/2
        });
        mieng_trang_nothing.addChild(Chon_quan_linh_nang_cap_Text);

        quickFinishBtn.addClickEventListener(() => self.quickFinishResearch(self.troop.type));
        this.addChild(mieng_trang_nothing, 100);
        this.addChild(mieng_trang, 100);
//****************************************************************************
        if (this.status===research_constant.status.busy){
            mieng_trang.setVisible(true);
            mieng_trang_nothing.setVisible(false);
            var troop = this.getTroopResearching();
            console.log("troop dang research la: "+ troop.type);
            this.listImg_troop[troop.type].setVisible(true);
            this.updateInfo(troop.name, troop.level);
            this.updateTimeCountDown(troop.type,troop.startTime,troop.level);
        }
        else if (this.status===research_constant.status.free){
            mieng_trang.setVisible(false);
            mieng_trang_nothing.setVisible(true);
        }
    },
    quickFinishResearch: function(){

        console.log("on Quick Finish Researching");
        troop = this.getTroopResearching();

        var countDownDate = config.troop[troop.type][troop.level+1].researchTime*1000;
        var now = getCurrentServerTime();
        var distance = countDownDate - (now - troop.startTime);
        console.log("distance = " + distance);
        var gFinish = timeToG(distance/1000);


        cc.log("==========================================THOI GIAN: " + distance);
        if(gv.user.coin < gFinish){
            showPopupNotEnoughG('quick_finish');
        }else {
            gv.user.coin -=gFinish;
            console.log("gFinish = "+ gFinish);
            console.log("gv.user.coin = "+ gv.user.coin);
            LOBBY.update(gv.user);
            NETWORK.sendResearchQuickFinish(troop.type);
            this.onFinishResearch(troop.type, true);
        }
    },
    getTroopResearching: function(){
        for (item in troopInfo) {
            var obj = troopInfo[item];
            if (obj.status==="researching"){
                return obj;
            }
        }
        return null;
    }
    ,
    initScrollBar: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(false);
        //scrollView.setBackGroundImage('res/Art/GUIs/research troop/mieng_trang.png');

        //scrollView.setInnerContainerSize(cc.size(2500,2500));
        //scrollView.setPercentContentSize(300,200);

        //var scrollViewRect = scrollView.getContentSize();
        var dir_btn_bg_ = "res/Art/GUIs/research troop/slost.png";
        var imageView = new ccui.ImageView();
        imageView.loadTexture(dir_btn_bg_);
        var innerWidth = imageView.getContentSize().width;
        var innerHeight =imageView.getContentSize().height;

        scrollView.setInnerContainerSize(cc.size(6*(innerWidth+10), 2*(innerHeight+10)));
        scrollView.setContentSize(cc.size(this.size.width -100,this.size.height));
        scrollView.setPosition(cc.p(0,0));
        scrollView.setAnchorPoint(cc.p(0.5,0.5));
        //scrollView.setHeight()

        this.listBtn_troop = [];
        for (var i=0;i<6;i++){
            var button = new ccui.Button(dir_btn_bg_);
            button.setCascadeColorEnabled(true);
            button.name = 'ARM_'+(i+1);
            var troop = this.getTroopList('ARM_'+(i+1));
            console.log("troop level ="+troop.level);
            var level_txt = new cc.LabelBMFont(troop.level.toString(), 'res/Art/Fonts/soji_12.fnt');

            button.level_txt = level_txt;
            button.level_txt.attr({
                    x:  button.width/4,
                    y: button.height-15,
                    anchorX: 0.5,
                    anchorY: 0.5,
                    scale: 1.5,
                }
            )


            button.label_rq = new cc.Sprite(research_constant.research_dir+"nen trong.png");
            button.label_rq.attr({
                x: button.width/2+2,
                y: button.label_rq.height/2+7,
            })
            button.label_rq.text_rq1 = new cc.LabelBMFont("Yêu cầu nhà", research_constant.description_dir );
            button.label_rq.text_rq1.attr({
                    x: button.label_rq.width/2,
                    y: button.label_rq.height,
                }
            )
            button.label_rq.text_rq1.setColor(new cc.Color(220,20,60));

/**/
            button.label_rq.text_rq2 = new cc.LabelBMFont("nghiên cứu", research_constant.description_dir );
            button.label_rq.text_rq2.attr({
                    x: button.label_rq.width/2,
                    y: button.label_rq.height/2,

                }
            )
            button.label_rq.text_rq2.setColor(new cc.Color(220,20,60));
/**/
            console.log("button name " + button.name);
            var level_btn = this.listTroop[button.name].level;
            console.log("level_btn ="+level_btn);
            var level_text_rq = config.troop[button.name][level_btn+1].laboratoryLevelRequired;
            console.log("level_text_rq ="+level_text_rq);
            button.label_rq.text_rq3 = new cc.LabelBMFont("cáp "+level_text_rq, research_constant.description_dir );
            button.label_rq.text_rq3.attr({
                    x: button.label_rq.width/2,
                    y: 0,
                }
            )
            button.label_rq.text_rq3.setColor(new cc.Color(220,20,60));

            button.label_rq_ = new cc.Sprite(research_constant.research_dir+"nen trong.png");
            button.label_rq.attr({
                x: button.width/2+2,
                y: button.label_rq.height/2+7,
            })
/**/
            button.label_rq.addChild(button.label_rq.text_rq1);
            button.label_rq.addChild(button.label_rq.text_rq2);
            button.label_rq.addChild(button.label_rq.text_rq3);

            var label_rq_resource = new cc.Sprite(research_constant.research_dir+"nen trong.png");
            button.label_rq_resource = label_rq_resource;
            button.label_rq_resource.attr({
                x: button.width/2+2,
                y: button.label_rq_resource.height/2+7,
            });
            var level = troopInfo[button.name].level;
            console.log("level "+ level);
            var researchElixir = config.troop[button.name][level+1].researchElixir;
            var researchDarkElixir = config.troop[button.name][level+1].researchDarkElixir;
            console.log(researchElixir + "researchElixir");
            console.log(researchDarkElixir + "researchDarkElixir");

            var researchElixir_txt = new cc.LabelBMFont(researchElixir, 'res/Art/Fonts/soji_12.fnt');
            button.label_rq_resource.researchElixir_txt = researchElixir_txt;
            researchElixir_txt.attr({
                    x: button.label_rq_resource.width/2-10,
                    y: button.label_rq_resource.height/5*4,
                }
            );
            button.label_rq_resource.addChild(button.label_rq_resource.researchElixir_txt);

            var researchDarkElixir_txt = new cc.LabelBMFont(researchDarkElixir.toString(), 'res/Art/Fonts/soji_12.fnt');
            button.label_rq_resource.researchDarkElixir_txt = researchDarkElixir_txt;
            researchDarkElixir_txt.attr({
                    x: button.label_rq_resource.width/2-10,
                    y: button.label_rq_resource.height/3,
                }
            );
            button.label_rq_resource.addChild(button.label_rq_resource.researchDarkElixir_txt);

            var img_icon_elixir = new cc.Sprite(research_constant.research_dir+ "dau tim.png");
            img_icon_elixir.attr({
                    x: button.label_rq_resource.width/2+30,
                    y: button.label_rq_resource.height/5*4,
                }
            );
            button.label_rq_resource.addChild(img_icon_elixir);

            var img_icon_dark_elixir = new cc.Sprite(research_constant.research_dir+ "dau den.png");
            img_icon_dark_elixir.attr({
                    x: button.label_rq_resource.width/2+30,
                    y: button.label_rq_resource.height/3,
                }
            );
            button.label_rq_resource.addChild(img_icon_dark_elixir);



            /**/
            cc.log("button.name: " + button.name);
            //button.setTouchEnabled(true);
            button.setPosition(cc.p(i*(innerWidth+10)+innerWidth/2+10,scrollView.height/2 ));
            dir_arm_ = 'res/Art/GUIs/train_troop_gui/icon/ARM_'+(i+1)+".png";
            //button.loadTextures(dir_btn_bg_,dir_btn_bg_,"");
            var img = new cc.Sprite(dir_arm_);
            img.attr({
                x: button.width/2+2,
                y: button.height/2,
                anchorX:0.5,
                anchorY:0.5,
            });
            button.img = img;
            //button.addClickEventListener(() => this.onSelectItem(button.name));
            button.addChild(img);
            button.addChild(button.label_rq);
            button.addChild(button.label_rq_resource);
            button.addChild(button.level_txt);
            scrollView.addChild(button);
            this.listBtn_troop.push(button);
        }

        for (var i=6;i<10;i++) {
            var button = new ccui.Button(dir_btn_bg_);
            button.setCascadeColorEnabled(true);
            button.name = 'ARM_'+(i+1);

            button.label_rq = new cc.Sprite(research_constant.research_dir+"nen trong.png");
            button.label_rq.attr({
                x: button.width/2+2,
                y: button.label_rq.height/2+7,
            })
            button.label_rq.text_rq1 = new cc.LabelBMFont("Yêu cầu nhà", research_constant.description_dir );
            button.label_rq.text_rq1.attr({
                    x: button.label_rq.width/2,
                    y: button.label_rq.height,

                }
            )
            button.label_rq.text_rq1.setColor(new cc.Color(220,20,60));

            /**/
            button.label_rq.text_rq2 = new cc.LabelBMFont("nghiên cứu", research_constant.description_dir );
            button.label_rq.text_rq2.attr({
                    x: button.label_rq.width/2,
                    y: button.label_rq.height/2,

                }
            )

            button.label_rq.text_rq2.setColor(new cc.Color(220,20,60));
            /**/
            var level_btn = this.listTroop[button.name].level;
            console.log("level_btn ="+level_btn);
            var level_text_rq = config.troop[button.name][level_btn+1].laboratoryLevelRequired;
            console.log("level_text_rq ="+level_text_rq);
            button.label_rq.text_rq3 = new cc.LabelBMFont("cáp "+level_text_rq, research_constant.description_dir );
            button.label_rq.text_rq3.attr({
                    x: button.label_rq.width/2,
                    y: 0,

                }
            )
            button.label_rq.text_rq3.setColor(new cc.Color(220,20,60));
            /**/
            button.label_rq.addChild(button.label_rq.text_rq1);
            button.label_rq.addChild(button.label_rq.text_rq2);
            button.label_rq.addChild(button.label_rq.text_rq3);
            /**/
            cc.log("button.name: " + button.name);

            //button.setTouchEnabled(true);
            button.setPosition(cc.p((i - 6) * (innerWidth + 10) + innerWidth / 2 + 10, scrollView.height / 2 - innerHeight - 10));
            var dir_arm_ = 'res/Art/GUIs/train_troop_gui/icon/ARM_' + (i + 1) + ".png";
            //button.loadTextures(dir_btn_bg_, dir_btn_bg_, "");
            var img = new cc.Sprite(dir_arm_);
            img.attr({
                x: button.width / 2 + 2,
                y: button.height / 2,
                anchorX: 0.5,
                anchorY: 0.5,
            });
            button.img = img;
            //button.addClickEventListener(() => this.onSelectItem(button.name));

            button.addChild(img);
            button.addChild(button.label_rq);

            scrollView.addChild(button);
            this.listBtn_troop.push(button);
        }
        var self = this;
        this.setBackStatusBtn();

        this.listBtn_troop.forEach(function(element) {
            try {
                element.addClickEventListener(() => self.onSelectItem(element.name));
            } catch (e) {
            }
        });
        this.addChild(scrollView, 100);

        if (this.status === research_constant.status.busy){
            this.listBtn_troop.forEach(function(element) {
                try {
                    self.checkRequireBtn(element,self.listTroop[element.name].level);
                } catch (e) {
                }
            });
            this.setEnableBtn(false);
        }
        else {
            self = this;
            this.listBtn_troop.forEach(function(element) {
                try {
                    self.checkRequireBtn(element,self.listTroop[element.name].level);
                } catch (e) {
                }
            });

        }
    }
    ,
    onSelectItem:function(type)
    {
        var elixir_rq = this.getResourceRequire(type, troopInfo[type].level+1, "researchElixir");
        var dark_elixir_rq = this.getResourceRequire(type, troopInfo[type].level+1, "researchDarkElixir");

        var g_chuyendoi = checkUserResourcesResearch(0,elixir_rq,dark_elixir_rq,0);
        if (g_chuyendoi>gv.user.coin){
            showPopupNotEnoughG('research');
        }
        else {
            console.log("status cua quan linh truoc khi train la "+ this.listTroop[type].status);
            NETWORK.sendResearchTroop(type);
            this.timeStart = getCurrentServerTime();
            reduceUserResourcesResearch(0,elixir_rq,dark_elixir_rq,g_chuyendoi);
            // new popUp info cua troop hien len
            this.mieng_trang_nothing.setVisible(false);
            this.mieng_trang.setVisible(true);
            console.log("Click vao item: "+type);
            //troop = this.listTroop[name];
            this.status = research_constant.status.busy;
            this.listTroop[type].status = research_constant.status.busy;
            this.listTroop[type].startTime = this.timeStart;
            console.log("status cua quan linh dang train la "+ this.listTroop[type].status);
            //disable all button
            this.setEnableBtn(false);

            //this.name_troop = type;

            this.listImg_troop[type].setVisible(true);
            this.updateInfo(this.listTroop[type].name, this.listTroop[type].level);
            this.updateTimeCountDown(type,this.timeStart, this.listTroop[type].level);
        }
    },
    getResourceRequire: function(type,level,resource_type){
        return config.troop[type][level][resource_type];
    },
    updateInfo: function(name,level){
        this.nameTroopText.setString(name+ " cấp "+(level+1));

    },
    updateTimeCountDown: function(type,timeStart,level){
        cc.log(name + "name");
        cc.log(level + "level");
        var countDownDate = config.troop[type][level+1].researchTime*1000;
        var self = this;
        var x = setInterval(function() {

            // Get todays date and time
            var now = getCurrentServerTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - (now - timeStart);
            console.log("Thoi gian research quan: "+ type+" level "+ level+"len level "+ (level +1) );
            cc.log("timeStart= "+timeStart+"countDownDate= "+countDownDate+"distance="+distance);
            var gFinish = timeToG(distance*0.001);

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                console.log("Het gio");
                //ham thuc hien cap nhat khi nghien cuu xong quan linh
                self.onFinishResearch(type,false);
            }
            var string = "";
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            if (days !== 0) { string = string + days + "d "};
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            if (hours !== 0) { string = string + hours + "h "};
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            if (minutes !== 0) { string = string + minutes + "m "};
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (seconds !== 0) { string = string + seconds + "s"};
            // Display the result in the element with id="demo"
            self.time_text.setString(string);
            self.numberG_Text.setString(gFinish);


        }, 1000);
        //this.time_text.setString(timeStart);
    },
    onFinishResearch: function (type, isQuickFinish) {

        this.listTroop[type].status = research_constant.status.free;
        this.upgradeBtn(type);
        this.status = research_constant.status.free;
        this.mieng_trang.setVisible(false);
        this.mieng_trang_nothing.setVisible(true);
        //this.setEnableBtn(true);
        if (!isQuickFinish) {
            NETWORK.sendResearchComplete(type);
        }
    },
    setEnableBtn: function (status) {
        this.listBtn_troop.forEach(function(element) {
            element.setEnabled(status);
            //element.img.setCascadeColorEnabled(!status);
        })
    },
    setBackStatusBtn: function () {
        cc.log("setBackStatusBtn");
        self = this;
        this.listBtn_troop.forEach(function(element) {
            if (config.troop[element.name][self.listTroop[element.name].level+1].laboratoryLevelRequired > self.lab_level ) {
                element.status = false;

            }
            else {
                element.status = true;

            }
            console.log(element.name+" level="+ self.listTroop[element.name].level +" lab_level_rq= "+ config.troop[element.name][self.listTroop[element.name].level+1].laboratoryLevelRequired );
            console.log("status = "+element.status);
            element.setEnabled(element.status);
            //element.img.setCascadeColorEnabled(!element.status);
        })
    },
    checkRequireBtn: function (btn, level_cur) {
        if (config.troop[btn.name][level_cur+1].laboratoryLevelRequired > this.lab_level ) {
            btn.setEnabled(false);
            btn.status = false;
            btn.label_rq.setVisible(true);
            btn.label_rq.text_rq1.setVisible(true);
            btn.label_rq.text_rq2.setVisible(true);
            btn.label_rq.text_rq2.setVisible(true);
            btn.label_rq_resource.setVisible(false);
            //btn.img.setCascadeColorEnabled(!btn.status);
        }
        else {
            btn.label_rq.setVisible(false);
            btn.label_rq.text_rq1.setVisible(false);
            btn.label_rq.text_rq2.setVisible(false);
            btn.label_rq.text_rq2.setVisible(false);
            btn.label_rq_resource.setVisible(true);
        }

    },
    upgradeBtn: function(type){
        this.listTroop[type].level ++;
        var level_btn = this.listTroop[type].level;

        console.log("level_btn ="+level_btn);
        self = this;
        this.setBackStatusBtn();
        this.listBtn_troop.forEach(function(element) {
            element.setEnabled(element.status);
            //element.img.setCascadeColorEnabled(!element.status);
            if (element.name === type) {
                var level_text_rq = config.troop[element.name][level_btn+1].laboratoryLevelRequired;
                console.log("level_text_rq ="+level_text_rq);
                element.label_rq.text_rq3.setString("cấp "+level_text_rq);
                element.level_txt.setString(self.listTroop[type].level);
                self.checkRequireBtn(element, level_btn);
            }

        })
    },
    close: function(){
        //this.zIndex = -1000;
        //ResearchPOPUP.getParent().reorderChild(ResearchPOPUP,-1000);
        //this.x = - 1000000; //cho ra khoi man hinh
        //research_constant.used_open = true;
        //console.log("Da hide popup");
        //console.log("truowc khi close: ");
        //console.log("lab_status : "+ research_constant.status);
        //console.log("troop dang train neu co: "+ this.troop.toString());
        research_constant.troop = this.getTroopResearching();
        this.time_text.retain();
        this.numberG_Text.retain();
        //this.time_text.retain();
        var act1 = new cc.ScaleTo(0.1, 1.4 * this.scale, 1.4 * this.scale);
        var self = this;
        this.runAction(new cc.Sequence(act1, cc.CallFunc(function() {
            self.getParent().removeChild(self);
        }, this)));

        LAB_BUILDING.addResearchTimeBar();
        LAB_BUILDING.countDownResearchBar();
    }
});
