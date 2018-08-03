var ResearchPopUp = ui.PopUp.extend({
    listTroop: {
        ARM_1: {
            name: "Đạo tặc",
            level: 2,

        }
    },
    listBtn_troop : [],
    listImg_troop : {},
    status: "free",
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
        //*****************hien thi info*******************
        //dao tac cap 2
        var mieng_trang = new cc.Sprite("res/Art/GUIs/research troop/mieng_trang.png");
        mieng_trang.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: 0,
            y: 130,
        });
        //*****************add hinh anh quan linh dang nghien cuu *******************

        for (i = 0;i<=10;i++){
            var img_troop = new cc.Sprite(img_troop_dir+"ARM_"+(i+1)+"_1.png");
            img_troop.attr({
                x: mieng_trang.width/7,
                y: mieng_trang.height/2
            })
            mieng_trang.addChild(img_troop);
            img_troop.setVisible(false);
            this.listImg_troop["ARM_"+(i+1)] = img_troop;
        };
        this.nameTroopText = new cc.LabelBMFont('ĐẠO TẶC CẤP 2', nameTroop_font_dir );
        this.nameTroopText.attr({
            x: mieng_trang.width/2,
            y: mieng_trang.height*4/5
        });
        mieng_trang.addChild(this.nameTroopText);

        //mui ten
        var mui_ten  = new cc.Sprite(research_dir+"mui ten.png");
        mui_ten.attr({
            x: mieng_trang.width/2,
            y: mieng_trang.height/5,
        })
        mieng_trang.addChild(mui_ten);

        //thoi gian nghien cuu
        var research_time_Text = new cc.LabelBMFont("Thời gian nghiên cứu", description_dir );
        research_time_Text.attr({
                x: mieng_trang.width/2,
                y: mieng_trang.height/2,
                scale: 0.75
            }
        )
        research_time_Text.setColor(new cc.Color(134,95,48));
        mieng_trang.addChild(research_time_Text);

        //Time Text

        this.time_text = new cc.LabelBMFont('22h20p18s', time_text_dir );
        this.time_text.attr({
            x: mui_ten.width/2,
            y: mui_ten.height/2
        });
        mui_ten.addChild(this.time_text);

        //***************** hien thi button *******************
        //button
        var quickFinishBtn = new ccui.Button(research_dir+"button.png", research_dir+"button.png","");
        quickFinishBtn.attr({
            x: mieng_trang.width-70,
            y: mui_ten.y,
        });
        mieng_trang.addChild(quickFinishBtn);

        var numberG_Text = new cc.LabelBMFont('485', time_text_dir );
        numberG_Text.attr({
            x: quickFinishBtn.width*3/7,
            y: quickFinishBtn.height/2
        });
        quickFinishBtn.addChild(numberG_Text);

        var imgG  = new cc.Sprite(imgG_dir);
        imgG.attr({
            x: quickFinishBtn.width*6/7,
            y: quickFinishBtn.height/2,
        })
        quickFinishBtn.addChild(imgG);

        //Quick finish Text
        var quick_finish_Text = new cc.LabelBMFont("Hoàn thành ngay:", description_dir );
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
        var mieng_trang_nothing = new cc.Sprite(research_dir+"mieng_trang.png");
        mieng_trang_nothing.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: 0,
            y: 130,

        });

        var Chon_quan_linh_nang_cap_Text = new cc.LabelBMFont('HÃY CHỌN QUÂN LÍNH MÀ BẠN MUỐN NÂNG CẤP!', nameTroop_font_dir );
        Chon_quan_linh_nang_cap_Text.attr({
            x: mieng_trang_nothing.width/2,
            y: mieng_trang_nothing.height/2
        });
        mieng_trang_nothing.addChild(Chon_quan_linh_nang_cap_Text);

        this.addChild(mieng_trang, 100);
    }
    ,
    initScrollBar: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        //scrollView.setBackGroundImage('res/Art/GUIs/research troop/mieng_trang.png');

        //scrollView.setInnerContainerSize(cc.size(2500,2500));
        //scrollView.setPercentContentSize(300,200);

        var scrollViewRect = scrollView.getContentSize();
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
            var button = new ccui.Button();
            button.name = 'ARM_'+(i+1);
            cc.log("button.name: " + button.name);
            //button.setTouchEnabled(true);
            button.setPosition(cc.p(i*(innerWidth+10)+innerWidth/2+10,scrollView.height/2 ));
            dir_arm_ = 'res/Art/GUIs/train_troop_gui/icon/ARM_'+(i+1)+".png";
            button.loadTextures(dir_btn_bg_,dir_btn_bg_,"");
            var img = new cc.Sprite(dir_arm_);
            img.attr({
                x: button.width/2+2,
                y: button.height/2,
                anchorX:0.5,
                anchorY:0.5,
            });

            //button.addClickEventListener(() => this.onSelectItem(button.name));
            button.addChild(img);
            scrollView.addChild(button);
            this.listBtn_troop.push(button);
        }

        for (var i=6;i<10;i++) {
            var button = new ccui.Button(dir_btn_bg_);
            button.name = 'ARM_'+(i+1);
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
            scrollView.addChild(button);
            this.listBtn_troop.push(button);
        }
        var self = this;
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
        // new popUp info cua troop hien len
        console.log("Click vao item: "+type);
        //troop = this.listTroop[name];
        this.status = "upgrade";
        this.name_troop = type;
        this.timeStart = getCurrentServerTime();
        this.listImg_troop[type].setVisible(true);
        this.updateInfo(this.listTroop[type].name, this.listTroop[type].level);
        this.updateTimeCountDown(type,this.timeStart, this.listTroop[type].level);
    },
    updateInfo: function(name,level){
        this.nameTroopText.setString(name+ " cấp "+level);

    },
    updateTimeCountDown: function(name,timeStart,level){
        cc.log(name + "name");
        cc.log(level + "level");
        var countDownDate = timeStart + config.troop[name][level].researchTime*3600;
        var self = this;
        var x = setInterval(function() {

            // Get todays date and time
            var now = getCurrentServerTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                //document.getElementById("demo").innerHTML = "EXPIRED";
                console.log("Het gio");
            }

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Display the result in the element with id="demo"
            self.time_text.setString( days + "d " + hours + "h "+ minutes + "m " + seconds + "s ");


        }, 1000);
        //this.time_text.setString(timeStart);
    }
});
