var TroopResearchInfo = TroopInfo.extend({

    ctor:function(width, height, title, type, data) {
        this._super(width, height, title, type, data);
        this.initResearchInfo(data);

    },
    showInfoItem:function(width, height, itemName, level){
        var dir = 'res/Art/GUIs/upgrade_troop/icon/';

        var image = new cc.Sprite(dir + itemName + '_' + level + '.png');
        image.setPosition(-1*this._frame.width/3.5 * this._frame.scaleX, this._frame.height/7 * this._frame.scaleY);
        this.addChild(image, 10);

        var grass = new cc.Sprite('res/Art/GUIs/upgrade_troop/icon/troop_bg.png');
        grass.setPosition(image.x, image.y - image.height/3);
        this.addChild(grass, 9);

        var barsInfo = this.showBars(itemName, level);
        barsInfo.setPosition(0, this._frame.height/5 * this._frame.scaleY + 80);
        barsInfo.setScale(1.15);
        this.addChild(barsInfo, 10);

        this.barsInfo = barsInfo;
        this.showBarsIncrease(itemName, level);
        this.showDescription(itemName, level);


    },

    initResearchInfo: function (data) {
        //button
        var researchBtn = new ccui.Button(research_constant.research_dir+"button.png");
        researchBtn.attr({
            x: this.width/2,
            y: - this._frame.height/2+30,
            scale: 1.5
        });
        this.addChild(researchBtn, 500);
        researchBtn.addClickEventListener(() => this.selectReseachItem(data.itemName));


        var mieng_trang = new cc.Sprite("res/Art/GUIs/research troop/mieng_trang.png");
        mieng_trang.attr({
            anchorX: 0.5,
            anchorX: 0.5,
            x: this.width/2,
            y: - this._frame.height/2+30,
            scaleX: 1.15
        });
        this.addChild(mieng_trang,499);

        //thoi gian nghien cuu
        var research_time_Text = new cc.LabelBMFont("Thời gian nghiên cứu", research_constant.description_dir );
        research_time_Text.attr({
                x: -1*this._frame.width/3.5 * this._frame.scaleX,
                y: - this._frame.height/7-20,
                scale: 1.15,
            }
        )
        research_time_Text.setColor(new cc.Color(134,95,48));
        this.addChild(research_time_Text,499);

        var string = this.getStringTime(data);
        var number_time_Text = new cc.LabelBMFont(string, research_constant.description_dir );
        number_time_Text.attr({
                x: -1*this._frame.width/3.5 * this._frame.scaleX - 20,
                y: - this._frame.height/7-50,
                scale: 1.15,
            }
        )
        number_time_Text.setColor(new cc.Color(134,95,48));
        this.addChild(number_time_Text,499);

        var type = data.itemName;
        var elixir_rq = ResearchPOPUP.getResourceRequire(type, troopInfo[type].level+1, "researchElixir");
        var dark_elixir_rq = ResearchPOPUP.getResourceRequire(type, troopInfo[type].level+1, "researchDarkElixir");

        var researchElixir_txt = new cc.LabelBMFont(elixir_rq, 'res/Art/Fonts/soji_12.fnt');
        researchElixir_txt.attr({
                x: researchBtn.x - 20,
                y: researchBtn.y + 10,
                scale: 1.5
            }
        );
        this.addChild(researchElixir_txt, 501);

        var researchDarkElixir_txt = new cc.LabelBMFont(dark_elixir_rq.toString(), 'res/Art/Fonts/soji_12.fnt');
        researchDarkElixir_txt.attr({
                x: researchBtn.x - 20,
                y: researchBtn.y - 10,
                scale: 1.5
            }
        );
        this.addChild(researchDarkElixir_txt, 501);

        var img_icon_elixir = new cc.Sprite(research_constant.research_dir+ "dau tim.png");
        img_icon_elixir.attr({
                x: researchElixir_txt.x+75,
                y: researchElixir_txt.y,
                scale: 1.25
            }
        );
        this.addChild(img_icon_elixir, 501);

        var img_icon_dark_elixir = new cc.Sprite(research_constant.research_dir+ "dau den.png");
        img_icon_dark_elixir.attr({
                x: researchDarkElixir_txt.x+75,
                y: researchDarkElixir_txt.y,
                scale: 1.25
            }
        );
        this.addChild(img_icon_dark_elixir, 501);
    },
    getStringTime: function (data) {

        var string = "";
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(data.countDownDate / (1000 * 60 * 60 * 24));
        if (days !== 0) { string = string + days + "d "};
        var hours = Math.floor((data.countDownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours !== 0) { string = string + hours + "h "};
        var minutes = Math.floor((data.countDownDate % (1000 * 60 * 60)) / (1000 * 60));
        if (minutes !== 0) { string = string + minutes + "m "};
        var seconds = Math.floor((data.countDownDate % (1000 * 60)) / 1000);
        if (seconds !== 0) { string = string + seconds + "s"};

        return string;
    },
    showBarsIncrease: function (itemName, level) {
        var increase = this.calculateBarsIncrease(itemName, level);

    },
    calculateBarsIncrease: function(itemName, level) {
        var ans = {};
        var listInfo = ['damagePerAttack', 'hitpoints', 'trainingElixir'];
        //if(itemName == 'ARM_3'){
        //    listInfo.push('damagePerSecondOnResources');
        //}
        var troopConfig = config.troop[itemName];

        var self = this;
        listInfo.forEach(function (element, i) {
            var curValue = troopConfig[level][element];
            var nextValue = troopConfig[level+1][element];
            ans[element] = nextValue - curValue;

            var textInfo = cc.LabelBMFont("+ "+ (nextValue - curValue), 'res/Art/Fonts/soji_12.fnt');
            textInfo.attr({ anchorX: 0, x: 280, y: - i * 40 });
            textInfo.setColor(new cc.Color(255,255,0));
            self.barsInfo.addChild(textInfo, 5);
        })
        return ans;
    },
    showDescription: function (itemName, level) {
        var ans = {};

        var listInfo = ['favoriteTarget', 'attackType', 'attackArea', 'moveSpeed', 'trainingTime', 'housingSpace'];
        var listInfoText = ['Mục tiêu yêu thích', 'Hình thức tấn công', 'Mục tiêu', 'Tốc độ di chuyển', 'Thời gian luyện', 'Chỗ ở'];

        //if(itemName == 'ARM_3'){
        //    listInfo.push('damagePerSecondOnResources');
        //}
        var troopConfig = config.troopBase[itemName];

        var self = this;
        listInfo.forEach(function (element, i) {
            var curValue = troopConfig[element];
            //var nextValue = troopConfig[element];
            //ans[element] = nextValue - curValue;

            var infoText = new cc.LabelBMFont(listInfoText[i]+" : "+ curValue, research_constant.description_dir );
            infoText.attr({
                    x: 1*self._frame.width/7 * self._frame.scaleX,
                    y: -i * 30 + 50,
                    scale: 1.15,
                }
            )
            infoText.setColor(new cc.Color(134,95,48));
            self.addChild(infoText, 499);

        })
        return ans;
    },
    selectReseachItem: function (type) {
        ResearchPOPUP.onResearchItem(type);
        this.close();
    }

});