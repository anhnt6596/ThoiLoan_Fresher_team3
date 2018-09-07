var ResearchStatusInfo = cc.Sprite.extend({
    ctor: function() {
        this._super();                
        this.init();
    },
    init: function() {
        this.initBg();
        this.initResearchStatusNode();
        this.initNoResearchStatus();
        research_constant.troop && this.setStatusVisible(research_constant.troop);
        !research_constant.troop && this.setStatusInvisible();
    },
    initBg: function(){
        var mieng_trang = new cc.Sprite("res/Art/GUIs/research troop/mieng_trang.png");
        this.mieng_trang = mieng_trang;
        this.mieng_trang.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: 0,
            y: 0,
        });
        this.addChild(mieng_trang);
    },
    initResearchStatusNode: function(){
        var researchStatusNode = new cc.Node();
        this.researchStatusNode = researchStatusNode;
        researchStatusNode.attr({
            x: this.mieng_trang.x,
            y: this.mieng_trang.y,
            width: this.mieng_trang.width,
            height: this.mieng_trang.height,
        })
        var img_troop = this.initImgTroop();
        this.img_troop = img_troop;
        this.mieng_trang.addChild(this.img_troop);

        var nameTroopText = this.initNameTroop();
        this.nameTroopText = nameTroopText;
        this.researchStatusNode.addChild(this.nameTroopText);        

        var timeBar = this.initTimeBar();
        this.timeBar = timeBar;
        this.researchStatusNode.addChild(timeBar);        

        var qFinishBtnNode = this.initQuickFinishBtn();
        this.qFinishBtnNode = qFinishBtnNode;
        this.researchStatusNode.addChild(qFinishBtnNode);         

        this.mieng_trang.addChild(researchStatusNode);
    },
    initNoResearchStatus: function(){
        var Chon_quan_linh_nang_cap_Text = new cc.LabelBMFont('HÃY CHỌN QUÂN LÍNH MÀ BẠN MUỐN NÂNG CẤP!', research_constant.nameTroop_font_dir );
        this.noResearchInfo = Chon_quan_linh_nang_cap_Text;
        Chon_quan_linh_nang_cap_Text.attr({
            x: this.mieng_trang.width/2,
            y: this.mieng_trang.height/2
        });
        this.mieng_trang.addChild(Chon_quan_linh_nang_cap_Text);
    },
    initImgTroop: function(){        
        var img_troop = new cc.Sprite(research_constant.img_troop_dir+'ARM_1_1.png');
        this.img_troop = img_troop;
        img_troop.attr({
            x: this.mieng_trang.width/7,
            y: this.mieng_trang.height/2,
            scale: 0.5,
        })
        img_troop.setVisible(false);
        return img_troop;
    },
    initNameTroop: function(troop){
        var nameTroopText = new cc.LabelBMFont('', research_constant.nameTroop_font_dir );        
        nameTroopText.attr({
            x: this.mieng_trang.width/2,
            y: this.mieng_trang.height*4/5
        });
        
        return nameTroopText;
    },
    initTimeBar: function(){
        var timeBar = new cc.Node();
        //mui ten
        var mui_ten  = new cc.Sprite(research_constant.research_dir+"mui ten.png");
        this.mui_ten = mui_ten;
        mui_ten.attr({
            x: this.mieng_trang.width/2,
            y: this.mieng_trang.height/5,
        })
        timeBar.addChild(mui_ten);

        //thoi gian nghien cuu
        var research_time_Text = new cc.LabelBMFont("Thời gian nghiên cứu", research_constant.description_dir );        
        research_time_Text.attr({
                x: this.mieng_trang.width/2,
                y: this.mieng_trang.height/2,
                scale: 0.75
            }
        )
        research_time_Text.setColor(new cc.Color(134,95,48));
        timeBar.addChild(research_time_Text);

        //Time Text
        var time_text = new cc.LabelBMFont('', research_constant.time_text_dir );
        this.time_text = time_text;
        this.time_text.attr({
            x: this.mui_ten.width/2,
            y: this.mui_ten.height/2
        });
        mui_ten.addChild(this.time_text);    
        return timeBar;    
    },
    initQuickFinishBtn: function(){
        var qFinishBtnNode = new cc.Node();
        //button
        var quickFinishBtn = new ccui.Button(research_constant.research_dir+"button.png");
        quickFinishBtn.attr({
            x: this.mieng_trang.width-70,
            y: this.mui_ten.y,
        });
        var self = this;
        quickFinishBtn.addClickEventListener(() => RESEARCH_GUI.quickFinishResearch());     
        
        //so tien hien thi tren button
        var numberG_Text = new cc.LabelBMFont('', research_constant.time_text_dir );
        this.numberG_Text = numberG_Text;
        numberG_Text.attr({
            x: quickFinishBtn.width*3/7,
            y: quickFinishBtn.height/2
        });
        quickFinishBtn.addChild(numberG_Text);
        //hinh anh icon G
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
                y: this.mieng_trang.height/2,
                scale: 0.75
            }
        )
        quick_finish_Text.setColor(new cc.Color(134,95,48));
        qFinishBtnNode.addChild(quick_finish_Text);
        qFinishBtnNode.addChild(quickFinishBtn);

        return qFinishBtnNode;
    },
    updateTimeCountDown: function(troop){        
        var countDownDate = config.troop[troop.type][troop.level+1].researchTime*1000;
        var self = this;
        var x = setInterval(function() {
            self.time_count = x;
            // Get todays date and time
            var now = getCurrentServerTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - (now - troop.timeStart);
            // console.log("Thoi gian research quan: "+ troop.type+" level "+ troop.level+"len level "+ (troop.level +1) );
            // cc.log("timeStart= "+troop.timeStart+"countDownDate= "+countDownDate+"distance="+distance);
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
    },
    setNameTroop: function(troop){
        cc.log("troop typeeeeeeee " + troop.type);
        
        var nameTroop = name.troop[troop.type].vi;
        var level = troop.level; 
        this.nameTroopText.setString(nameTroop+ " cấp "+(level+1));
    },
    setStatusVisible: function(troop){        
        this.setNameTroop(troop);
        this.setImgTroop(troop);
        this.updateTimeCountDown(troop);
        this.researchStatusNode.setVisible(true);
        this.noResearchInfo.setVisible(false);
        
    },
    setStatusInvisible: function(){
        this.researchStatusNode.setVisible(false);
        this.time_count && clearInterval(this.time_count);
        this.noResearchInfo.setVisible(true);
        this.img_troop.setVisible(false);
    },
    setImgTroop: function(troop){        
        this.mieng_trang.removeChild(this.img_troop);

        var dir = research_constant.img_troop_dir+troop.type+"_"+(troop.level+1)+".png";
        var img_troop = new cc.Sprite(dir);
        this.img_troop = img_troop;
        img_troop.attr({
            x: this.mieng_trang.width/7,
            y: this.mieng_trang.height/2,
            scale: 0.5,
        })
        this.mieng_trang.addChild(this.img_troop);
        this.img_troop.setVisible(true);
    },
    update: function(){
        if (research_constant.troop) {            
            this.setStatusVisible(research_constant.troop);
        }
        else {
            this.setStatusInvisible();
        }
    }


});