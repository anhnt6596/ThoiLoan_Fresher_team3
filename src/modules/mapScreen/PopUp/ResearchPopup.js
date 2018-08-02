var createResearchPopup = function(){
    var size = {
        width: 739,
        height: 476
    }
    var content = [];


    //*****************add mieng trang*******************
    var mieng_trang = new cc.Sprite("res/Art/GUIs/research troop/mieng_trang.png");
    mieng_trang.attr({
        anchorX: 0.5,
        anchorX: 0.5,
        x: 0,
        y: 130,

    });
    //*****************add mieng trang*******************
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
            x: button.width/2,
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
            x: button.width/2,
            y: button.height/2,
            anchorX:0.5,
            anchorY:0.5,
        });
        button.addChild(img);
        scrollView.addChild(button);
    }

    content.push(mieng_trang);
   content.push(scrollView);

    var researchPopup = new ui.PopUp("Nhà nghiên cứu", content, 'res/Art/GUIs/research troop/nen 1.png');
    //cc.log("researchPopup size =" + researchPopup.frame.width+ " "+researchPopup.frame.height); 739*476
    MAPSCENE.addChild(researchPopup, 1000);
};