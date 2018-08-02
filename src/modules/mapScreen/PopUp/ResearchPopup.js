var createResearchPopup = function(){
    var size = {
        width: 739,
        height: 476
    }
    var content = [];

    var Time_text_dir = 'res/Art/Fonts/soji_20.fnt';
    var research_dir = "res/Art/GUIs/research troop/";
    var img_troop_dir = "res/Art/GUIs/upgrade_troop/small_icon/";
    var nameTroop_font_dir = 'res/Art/Fonts/soji_20.fnt';
    var description_dir = 'res/Art/Fonts/fista_20_non.fnt';
    var imgG_dir = "res/Art/GUIs/shop_gui/g.png";
    //*****************add mieng trang*******************
    
    var mieng_trang = new cc.Sprite(research_dir+"mieng_trang.png");
    mieng_trang.attr({
        anchorX: 0.5,
        anchorX: 0.5,
        x: 0,
        y: 130,

    });
    //*****************add hinh anh quan linh dang nghien cuu *******************
    
    var img_troop = new cc.Sprite(img_troop_dir+"ARM_1_1.png");
    img_troop.attr({
        x: mieng_trang.width/7,
        y: mieng_trang.height/2
    })
    mieng_trang.addChild(img_troop);
    //*****************hien thi info*******************
    //dao tac cap 2
    
    nameTroopText = new cc.LabelBMFont('ĐẠO TẶC CẤP 2', nameTroop_font_dir );
    nameTroopText.attr({
        x: mieng_trang.width/2,
        y: mieng_trang.height*4/5
    });
    mieng_trang.addChild(nameTroopText);

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
    
    Time_text = new cc.LabelBMFont('22h20p18s', Time_text_dir );
    Time_text.attr({
        x: mui_ten.width/2,
        y: mui_ten.height/2
    });
    mui_ten.addChild(Time_text);

    //***************** hien thi button *******************
    //button
    var quickFinishBtn = new ccui.Button(research_dir+"button.png", research_dir+"button.png","");
    quickFinishBtn.attr({
        x: mieng_trang.width-70,
        y: mui_ten.y,        
    });    
    mieng_trang.addChild(quickFinishBtn);

    var numberG_Text = new cc.LabelBMFont('485', Time_text_dir );
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
    var quick_finish_Text = new cc.LabelBMFont("Thời gian nghiên cứu", description_dir );
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



    //*****************add scrollView***********************************************************
    //*****************add scrollView***********************************************************
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
    scrollView.setContentSize(cc.size(size.width -100,size.height));
    scrollView.setPosition(cc.p(0,0));
    scrollView.setAnchorPoint(cc.p(0.5,0.5));
    //scrollView.setHeight()

    for (var i=0;i<6;i++){
        var button = new ccui.Button();
        button.setTouchEnabled(true);
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
        button.addChild(img);
        scrollView.addChild(button);
    }

    for (var i=6;i<10;i++){
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPosition(cc.p((i-6)*(innerWidth+10)+innerWidth/2+10,scrollView.height/2 - innerHeight - 10 ));
        dir_arm_ = 'res/Art/GUIs/train_troop_gui/icon/ARM_'+(i+1)+".png";
        button.loadTextures(dir_btn_bg_,dir_btn_bg_,"");
        var img = new cc.Sprite(dir_arm_);
        img.attr({
            x: button.width/2+2,
            y: button.height/2,
            anchorX:0.5,
            anchorY:0.5,
        });
        button.addChild(img);
        scrollView.addChild(button);
    }
    //mieng_trang.setVisible(false);

    

    content.push(mieng_trang);
    content.push(mieng_trang_nothing);
    content.push(scrollView);

    var researchPopup = new ui.PopUp("Nhà nghiên cứu", content, 'res/Art/GUIs/research troop/nen 1.png');
    //cc.log("researchPopup size =" + researchPopup.frame.width+ " "+researchPopup.frame.height); 739*476
    MAPSCENE.addChild(researchPopup, 1000);
};