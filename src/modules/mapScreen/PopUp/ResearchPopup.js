var ResearchPopUp = ui.PopUp.extend({
    lab_level: 1,
    listTroop: {
        ARM_1: {
            name: "Đạo tặc",
            level: 1,
        },
        ARM_2: {
            name: "Cô nương",
            level: 1,
        },
        ARM_3: {
            name: "Công tước",
            level: 1,
        },
        ARM_4: {
            name: "Quái thú",
            level: 1,
        },
        ARM_5: {
            name: "Chiến binh",
            level: 1,
        },
        ARM_6: {
            name: "Quân sư",
            level: 1,
        },
        ARM_7: {
            name: "Pháp sư",
            level: 1,
        },
        ARM_8: {
            name: "Chó trắng",
            level: 1,
        },
        ARM_9: {
            name: "Ốc con công",
            level: 1,
        },
        ARM_10: {
            name: "Cây xà quỳ",
            level: 1,
        },

    },


    listBtn_troop : [],
    listImg_troop : {},
    status: research_constant.status.free,
    name_troop : "",
    timeStart: 0,
    size : {
        width: 739,
        height: 476
    },
    count: 0,
    time_text: "",
    nameTroopText: "",
    ctor: function() {


        this._super("Nhà nghiên cứu", [], 'res/Art/GUIs/research troop/nen 1.png');
        this.init();
    },
    init: function () {
        this.initInfoResearch();
        this.initScrollBar();
    },
    initInfoResearch: function(){
        troopInfo[type] = {
            type: type,
            isUnlock: isUnlock,
            level: level,
            population: population,
            startTime: startTime,
            status: status
        };
        self = this;
        troopInfo.forEach(function(element) {
            self.listTroop[element.type].name = name.troop[element.type];
            self.listTroop[element.type].isUnlock = element.isUnlock;
            self.listTroop[element.type].level = element.level
            ;
            self.listTroop[element.type].population = element.population;
            self.listTroop[element.type].startTime = element.startTime;
        })
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

        for (i = 0;i<=10;i++){
            var img_troop = new cc.Sprite(research_constant.img_troop_dir+"ARM_"+(i+1)+"_1.png");
            img_troop.attr({
                x: mieng_trang.width/7,
                y: mieng_trang.height/2
            })
            mieng_trang.addChild(img_troop);
            img_troop.setVisible(false);
            this.listImg_troop["ARM_"+(i+1)] = img_troop;
        };
        this.nameTroopText = new cc.LabelBMFont('ĐẠO TẶC CẤP 2', research_constant.nameTroop_font_dir );
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
        var quickFinishBtn = new ccui.Button(research_constant.research_dir+"button.png", research_constant.research_dir+"button.png","");
        quickFinishBtn.attr({
            x: mieng_trang.width-70,
            y: mui_ten.y,
        });
        mieng_trang.addChild(quickFinishBtn);

        var numberG_Text = new cc.LabelBMFont('485', research_constant.time_text_dir );
        numberG_Text.attr({
            x: quickFinishBtn.width*3/7,
            y: quickFinishBtn.height/2
        });
        quickFinishBtn.addChild(numberG_Text);

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

        this.addChild(mieng_trang_nothing, 100);
        this.addChild(mieng_trang, 100);
        mieng_trang.setVisible(false);
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

            //button.addClickEventListener(() => this.onSelectItem(button.name));
            button.addChild(img);
            button.addChild(button.label_rq);
            scrollView.addChild(button);
            this.listBtn_troop.push(button);
        }

        for (var i=6;i<10;i++) {
            var button = new ccui.Button(dir_btn_bg_);
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
    }
    ,
    onSelectItem:function(type)
    {
        this.timeStart = getCurrentServerTime();
        // new popUp info cua troop hien len
        this.mieng_trang_nothing.setVisible(false);
        this.mieng_trang.setVisible(true);
        console.log("Click vao item: "+type);
        //troop = this.listTroop[name];
        this.status = research_constant.status.busy;
        //disable all button
        this.setEnableBtn(false);

        this.name_troop = type;

        this.listImg_troop[type].setVisible(true);
        this.updateInfo(this.listTroop[type].name, this.listTroop[type].level);
        this.updateTimeCountDown(type,this.timeStart, this.listTroop[type].level);
    },
    updateInfo: function(name,level){
        this.nameTroopText.setString(name+ " cấp "+level);

    },
    updateTimeCountDown: function(type,timeStart,level){
        cc.log(name + "name");
        cc.log(level + "level");
        var countDownDate = timeStart + config.troop[type][level].researchTime;
        var self = this;
        var x = setInterval(function() {

            // Get todays date and time
            var now = getCurrentServerTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                console.log("Het gio");
                //ham thuc hien cap nhat khi nghien cuu xong quan linh
                self.onFinishResearch(type);
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
            self.time_text.setString( string);


        }, 1000);
        //this.time_text.setString(timeStart);
    },
    onFinishResearch: function (type) {

        this.upgradeBtn(type);
        this.status = research_constant.status.free;
        this.mieng_trang.setVisible(false);
        this.mieng_trang_nothing.setVisible(true);
        //this.setEnableBtn(true);
    },
    setEnableBtn: function (status) {
        this.listBtn_troop.forEach(function(element) {
            element.setEnabled(status);
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
        })
    },
    checkRequireBtn: function (btn, level_cur) {
        if (config.troop[btn.name][level_cur+1].laboratoryLevelRequired > this.lab_level ) {
            btn.setEnabled(false);
            btn.status = false;
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
            if (element.name === type) {
                var level_text_rq = config.troop[element.name][level_btn+1].laboratoryLevelRequired;
                console.log("level_text_rq ="+level_text_rq);
                element.label_rq.text_rq3.setString("cấp "+level_text_rq);
                self.checkRequireBtn(element, level_btn);
            }
        })



    }
});
