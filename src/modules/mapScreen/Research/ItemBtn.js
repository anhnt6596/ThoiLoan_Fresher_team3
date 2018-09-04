var ItemBtn = ccui.Button.extend({
    ctor: function(type, w, h) {
        this._super("res/Art/GUIs/research troop/slost.png");        
        this.type = type;   
        this.setPosition(cc.p(w,h));
        this.initImg();
        this.initLevelText();
        this.initNentrong();
        this.initResourceInfo();
        this.initLevelRequireInfo();

        var self = this;
        this.addClickEventListener(() => self.onSelectItem(self.type));     
    },
    
    initLevelText: function(){
        var level_txt = new cc.LabelBMFont("", 'res/Art/Fonts/soji_12.fnt');
        this.level_txt = level_txt;        
        level_txt.attr({
            x:  this.width/4,
            y: this.height-15,
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 1.5,
        })
        this.addChild(level_txt,500);

    },
    initImg: function(){
        //var imgTroop = new cc.Sprite
        dir_arm_ = 'res/Art/GUIs/train_troop_gui/icon/' + this.type + '.png';
        //button.loadTextures(dir_btn_bg_,dir_btn_bg_,"");
        var img = new cc.Sprite(dir_arm_);
        this.img = img;
        img.attr({
            x: this.width/2+2,
            y: this.height/2,
            anchorX:0.5,
            anchorY:0.5,
        });   
        this.addChild(img,100);
    },
    initNentrong: function(){
        var nen_trong = new cc.Sprite(research_constant.research_dir+"nen trong.png");
        this.nen_trong = nen_trong;
        this.nen_trong.attr({
            x: this.width/2+2,
            y: this.nen_trong.height/2+7,
        })
        this.addChild(this.nen_trong,101);
    },
    initResourceInfo: function(){
                
        var resourceInfo = new cc.Node();
        this.resourceInfo = resourceInfo;

        //gia tri dau hong
        var researchElixir_txt = new cc.LabelBMFont("", 'res/Art/Fonts/soji_12.fnt');        
        this.researchElixir_txt = researchElixir_txt;
        researchElixir_txt.attr({
                x: this.nen_trong.width/2-10,
                y: this.nen_trong.height/5*4,
            }
        );
        resourceInfo.addChild(researchElixir_txt,102);

        //gia tri dau den
        var researchDarkElixir_txt = new cc.LabelBMFont("", 'res/Art/Fonts/soji_12.fnt');        
        this.researchDarkElixir_txt = researchDarkElixir_txt;
        researchDarkElixir_txt.attr({
                x: this.nen_trong.width/2-10,
                y: this.nen_trong.height/3,
            }
        );
        resourceInfo.addChild(researchDarkElixir_txt,102);
    
        //icon dau hong
        var img_icon_elixir = new cc.Sprite(research_constant.research_dir+ "dau tim.png");
        img_icon_elixir.attr({
                x: this.nen_trong.width/2+30,
                y: this.nen_trong.height/5*4,
            }
        );        
        resourceInfo.addChild(img_icon_elixir,102);

        //icon dau den
        var img_icon_dark_elixir = new cc.Sprite(research_constant.research_dir+ "dau den.png");
        img_icon_dark_elixir.attr({
                x: this.nen_trong.width/2+30,
                y: this.nen_trong.height/3,
            }
        );        
        resourceInfo.addChild(img_icon_dark_elixir,102);
        
        this.nen_trong.addChild(resourceInfo,100);
    },
    initLevelRequireInfo: function(){
        var level = troopInfo[this.type].level;
        var level_lab = LAB_BUILDING._level;

        var levelRequireInfo = new cc.Node();
        this.levelRequireInfo = levelRequireInfo;


        var text_rq = new cc.LabelBMFont("", research_constant.description_dir );    
        this.text_rq = text_rq;    
        text_rq.attr({
            x: this.nen_trong.width/2,
            y: this.nen_trong.height,

        })
        text_rq.setColor(new cc.Color(220,20,60));
        levelRequireInfo.addChild(text_rq,102);

        this.nen_trong.addChild(levelRequireInfo,100);
    },
    setEnableBtn: function(status){
        this.setEnabled(status);
        if (status) {
            this.img.setColor(new cc.color(255, 255, 255, 255));
        } else {
            element.img.setColor(new cc.color(100, 100, 100, 255));
        }
    },    
    updateBtnBuyInfo: function(){
        var enought_rq = true;
        var level_cur = troopInfo[this.type].level;
        var level_rq = config.troop[this.type][level_cur+1].laboratoryLevelRequired;
        cc.log("level_rq,LAB_BUILDING level, ok? =  " + level_rq+", "+LAB_BUILDING._level+" , " );
    
        if (level_rq > LAB_BUILDING._level){
            enought_rq  = false;
        }
        this.updateResourceInfo();
        this.updateLevelRequireInfo();
        this.updateLevelTextInfo();
        this.resourceInfo.setVisible(enought_rq);
        this.levelRequireInfo.setVisible(!enought_rq);  
        this.setEnableBtn(enought_rq);
    },
    updateLevelTextInfo: function(){
        var level = troopInfo[this.type].level;
        this.level_txt.setString(level);
    },
    updateResourceInfo: function(){        
        var level = troopInfo[this.type].level;
        var researchElixir = config.troop[this.type][level+1].researchElixir;
        var researchDarkElixir = config.troop[this.type][level+1].researchDarkElixir;
        this.researchElixir_txt.setString(researchElixir.toString());
        this.researchDarkElixir_txt.setString(researchDarkElixir.toString());
    },
    updateLevelRequireInfo: function(){
        var level_cur = troopInfo[this.type].level;
        var level_rq = config.troop[this.type][level_cur+1].laboratoryLevelRequired;
        this.text_rq.setString("Yêu cầu nhà \nnghiên cứu \n   cấp "+ level_rq);
    },
    onSelectItem: function(){
        var type = this.type;
        var level = troopInfo[type].level;
        var countDownDate = config.troop[type][level + 1].researchTime * 1000;
        var elixir_rq = config.troop[type][level+1].researchElixir;
        var dark_elixir_rq = config.troop[type][level+1].researchDarkElixir;
                
        var data = {_level: troopInfo[type].level + 1, itemName: type, countDownDate: countDownDate, elixir_rq: elixir_rq, dark_elixir_rq: dark_elixir_rq};
        var popup = new TroopResearchInfo(cc.winSize.width * 3 / 4, cc.winSize.height * 5.7 / 6, name.troop[type].vi + ' nâng lên cấp ' + (troopInfo[type].level + 1), true, data);
        cc.director.getRunningScene().addChild(popup, 1500);
    }
})