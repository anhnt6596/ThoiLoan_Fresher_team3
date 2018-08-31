var MESSAGE_BOX;

var MessageGUI = ccui.Button.extend({
    ctor: function () {
        MESSAGE_BOX = this;
        this._super('res/Art/GUIs/Chat/nen.png');
        this.init();
    },

    init: function() {
        if(!gv.user.is_in_guild){
            this.showJoinClan();
        }else{
            temp.isOpenMessageBox = true;
            if(!temp.getListMessageFirst){
                temp.getListMessageFirst = true;
                NETWORK.sendGetInteractionGuild();
            }else{
                this.showMessageGui();
            }
        }
    },

    showJoinClan: function() {
        var size = cc.winSize;
        this.setAnchorPoint(0, 0);
        this.setScale(cc.winSize.width *3/5 / this.width, cc.winSize.height / this.height);
        this.setZoomScale(0);

        var bgMember = new ccui.Button('res/Art/GUIs/Chat/vc_0004_Layer-80-copy.png');
        bgMember.setAnchorPoint(0, 0);
        bgMember.setPosition(cc.winSize.width *2/5 + 10, 0);
        bgMember.setScale(cc.winSize.width /5 / bgMember.width, cc.winSize.height / bgMember.height);
        bgMember.setZoomScale(0);
        cc.director.getRunningScene().addChild(bgMember, 21, 23);

        var headClan = new ccui.Button('res/Art/GUIs/Chat/nen button 2.png');
        headClan.setPosition(cc.winSize.width *1/5, size.height - headClan.height/2 - 7);
        headClan.scaleY = 1.4;
        cc.director.getRunningScene().addChild(headClan, 21, 24);

        var btnJoinClan = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button.png');
        btnJoinClan.setPosition(size.width/5, size.height/2);
        btnJoinClan.addClickEventListener(this.joinClan.bind(this));
        cc.director.getRunningScene().addChild(btnJoinClan, 21, 25);

        var label = new cc.LabelBMFont("  Join now", 'res/Art/Fonts/fista_20_non.fnt');
        label.setPosition(size.width/5, size.height/2);
        cc.director.getRunningScene().addChild(label, 22, 22);

        var prevBtn = new ccui.Button('res/Art/GUIs/Chat/button chinh 1.png', 'res/Art/GUIs/Chat/button chinh 1.png');
        prevBtn.setPosition(this.x + this.width*this.scaleX + prevBtn.width/2 - 5, cc.winSize.height/2);
        prevBtn.addClickEventListener(LOBBY.onCloseInteractiveGuild.bind(LOBBY));
        cc.director.getRunningScene().addChild(prevBtn, 21, 18);
    },

    showMessageGui: function() {
        var size = cc.winSize;
        this.setAnchorPoint(0, 0);
        this.setScale(cc.winSize.width *3/5 / this.width, cc.winSize.height / this.height);
        this.setZoomScale(0);

        var bgMember = new ccui.Button('res/Art/GUIs/Chat/vc_0004_Layer-80-copy.png');
        bgMember.setAnchorPoint(0, 0);
        bgMember.setPosition(cc.winSize.width *2/5 + 10, 0);
        bgMember.setScale(cc.winSize.width /5 / bgMember.width, cc.winSize.height / bgMember.height);
        bgMember.setZoomScale(0);
        cc.director.getRunningScene().addChild(bgMember, 21, 23);

        var headClan = new ccui.Button('res/Art/GUIs/Chat/nen button 2.png');
        headClan.setPosition(cc.winSize.width *1/5, size.height - headClan.height/2 - 7);
        headClan.scaleY = 1.4;
        cc.director.getRunningScene().addChild(headClan, 21, 24);

        var labelCLAN = new cc.LabelBMFont("CLAN", 'res/Art/Fonts/soji_20.fnt');
        labelCLAN.setPosition(headClan.x, headClan.y - 5);
        cc.director.getRunningScene().addChild(labelCLAN, 22, 25);


        var textField = new cc.EditBox(cc.size(size.width*1.5/5, size.height/12),"res/Art/GUIs/Main_Gui/login/bg_text.png");
        textField.setPosition(textField.width/2, size.height - 140 + textField.height/2);
        textField.setFontColor(new cc.Color(0,0,0,255));
        textField.setFontSize(25);
        //textField.setPlaceHolder("  Enter your message");
        this.textField = textField;
        cc.director.getRunningScene().addChild(textField, 21, 21);

        //var btnSend = gv.commonButton(size.width*0.5/5, size.height/12 - 5, textField.x + textField.width/2 + 60, textField.y - 2, "Send");
        var btnSend = ui.optionButton("Send", 'res/Art/GUIs/pop_up/button.png');
        btnSend.setPosition(textField.x + textField.width/2 + 60, textField.y - 2);
        btnSend.addClickEventListener(this.sendMessage.bind(this));
        cc.director.getRunningScene().addChild(btnSend, 21, 22);
        //cc.director.getRunningScene().addChild(btnSend, 21, 22);


        var nameGuildLabel = new cc.LabelBMFont(myClanInfo.name || gv.user.name_guild, 'res/Art/Fonts/soji_20.fnt');
        nameGuildLabel.setPosition(nameGuildLabel.width/2 + 10, size.height - 160 + textField.height + nameGuildLabel.height);
        cc.director.getRunningScene().addChild(nameGuildLabel, 24, 26);

        var messageScrollView = this.createMessageScroll();
        cc.director.getRunningScene().addChild(messageScrollView, 100, 19);

        var memberScrollView = this.createMemberScroll();
        cc.director.getRunningScene().addChild(memberScrollView, 101, 20);

        var prevBtn = new ccui.Button('res/Art/GUIs/Chat/button chinh 1.png', 'res/Art/GUIs/Chat/button chinh 1.png');
        prevBtn.setPosition(this.x + this.width*this.scaleX + prevBtn.width/2 - 5, cc.winSize.height/2);
        prevBtn.addClickEventListener(LOBBY.onCloseInteractiveGuild.bind(LOBBY));
        cc.director.getRunningScene().addChild(prevBtn, 21, 18);
    },

    joinClan: function() {
        CLAN_GUI.openAction();
        LOBBY.onCloseInteractiveGuild();
    },

    onCloseInteractiveGuild: function() {
        temp.isOpenMessageBox = false;
        cc.director.getRunningScene().removeChildByTag(17);
        cc.director.getRunningScene().removeChildByTag(18);
        cc.director.getRunningScene().removeChildByTag(19);
        cc.director.getRunningScene().removeChildByTag(20);
        cc.director.getRunningScene().removeChildByTag(21);
        cc.director.getRunningScene().removeChildByTag(22);
        cc.director.getRunningScene().removeChildByTag(23);
        cc.director.getRunningScene().removeChildByTag(24);
        cc.director.getRunningScene().removeChildByTag(25);
        cc.director.getRunningScene().removeChildByTag(26);
    },

    sendMessage: function() {
        var content = this.textField.getString();
        content = content.trim();
        if(!content){
            //showPopupNotEnoughG('none_length_message');
        }else if (content.length > MAX_LENGTH_MESSAGE){
            showPopupNotEnoughG('over_length_message');
        }else if(temp.enableSendMessageFlag){
            temp.enableSendMessageFlag = false;
            temp.messageContent = content;
            temp.messageType = MESSAGE_NORMAL;
            NETWORK.sendNewMessage(MESSAGE_NORMAL, content);
        }
    },

    createMessageScroll: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(cc.winSize.width*2/5, cc.winSize.height - 150));
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(0, 0);
        scrollView.setScrollBarEnabled(false);

        //scrollView.setPropagateTouchEvents(false);

        for(var i = 1; i <= messageList.length; i++){
            var item = messageList[i-1];

            var nodeContainer = new ccui.Widget();
            nodeContainer.setPosition(0, 0);
            scrollView.addChild(nodeContainer);

            var content = new cc.LabelBMFont(item.content, 'res/Art/Fonts/fista_20_non.fnt');
            content.setAnchorPoint(0, 0);
            content.setPosition(10, 150*i - 80);
            content.color = cc.color(0, 255, 0, 255);
            nodeContainer.addNode(content);


            var sender = new cc.LabelBMFont(item.usernameSend, 'res/Art/Fonts/fista_20_non.fnt');
            sender.setAnchorPoint(0, 0);
            sender.setPosition(content.x, content.y + 30);
            nodeContainer.addNode(sender);


            var timeStamp = new cc.LabelBMFont(timeToReadable((getCurrentServerTime() - item.timeStamp) / 1000) + " before", 'res/Art/Fonts/fista_20_non.fnt');
            timeStamp.setAnchorPoint(0, 0);
            timeStamp.setPosition(scrollView.width - timeStamp.width/2 - 80, sender.y);
            nodeContainer.addNode(timeStamp);

            if(item.typeMessage == MESSAGE_ASK_TROOP) {
                var timeBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/bg_train_bar.png');
                timeBar.setAnchorPoint(0, 0);
                timeBar.setPosition(100, content.y - 50);
                nodeContainer.addChild(timeBar);

                var processBar = new cc.Sprite('res/Art/GUIs/train_troop_gui/train_bar.png');
                this._processBar = processBar;
                processBar.setAnchorPoint(0, 0);
                timeBar.addChild(processBar);

                var cur = item.currentCapacityGot;
                var max = item.guildCapacityAtTime;

                var ratio = cur / max;
                processBar.setTextureRect(cc.rect(0, 0, processBar.width * ratio, processBar.height));

                var timeText = new cc.LabelBMFont(cur + "/" + max, 'res/Art/Fonts/soji_12.fnt');
                this._timeText = timeText;
                timeBar.addChild(timeText);
                timeText.setPosition(-timeBar.width/2, timeText.height/2);

                if(item.userId != gv.user.id){
                    //Neu van cho the cho
                    if(!userGotList[item.userId] || userGotList[item.userId] < MAX_TROOP_AMOUNT_USER_CAN_GIVE){
                        var btn = new ccui.Button('res/Art/GUIs/pop_up/button.png', 'res/Art/GUIs/pop_up/button.png');
                        btn.setAnchorPoint(0, 0);
                        btn.setPosition(200, content.y - btn.height - 5);
                        btn.addClickEventListener(this.donateTroop.bind(btn));
                        btn.userSend = item.userId;
                        nodeContainer.addNode(btn);

                        var label = new cc.LabelBMFont("  Donate", 'res/Art/Fonts/fista_20_non.fnt');
                        label.setAnchorPoint(0, 0);
                        label.setPosition(btn.x + 30, btn.y + 20);
                        nodeContainer.addNode(label);
                    }else{
                        var labelThank = new cc.LabelBMFont("  Thank you for donated", 'res/Art/Fonts/fista_20_non.fnt');
                        labelThank.setAnchorPoint(0, 0);
                        labelThank.setPosition(200, content.y - labelThank.height - 10);
                        labelThank.color = cc.color(0, 255, 0, 255);
                        nodeContainer.addNode(labelThank);
                    }
                }
            }

            var line = new cc.Sprite('res/Art/GUIs/Chat/dong ke.png');
            line.setAnchorPoint(0, 0);
            line.scaleX = (cc.winSize.width*2/5 - 40) / line.width;
            line.setPosition(content.x, content.y - 70);
            nodeContainer.addNode(line);
        }

        scrollView.setInnerContainerSize(cc.size(scrollView.width, messageList.length * 150 + 10));
        return scrollView;
    },

    donateTroop: function() {
        cc.log("Click donate " + this.userSend);

        var popup = new PopupGiveTroop(this.userSend);
        cc.director.getRunningScene().addChild(popup, 2222, 171);
    },

    createMemberScroll: function() {
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        scrollView.setTouchEnabled(true);
        scrollView.setContentSize(cc.size(cc.winSize.width/5, cc.winSize.height - 20));
        scrollView.setBounceEnabled(true);
        scrollView.setPosition(cc.winSize.width*2/5, -20);
        scrollView.setScrollBarEnabled(false);
        //scrollView.setPropagateTouchEvents(false);

        for(var i = 1; i <= memberListOnline.length; i++){
            var item = memberListOnline[i-1];

            var nameLabel = new cc.LabelBMFont(item.username, 'res/Art/Fonts/soji_16.fnt');
            nameLabel.setAnchorPoint(0, 0);
            nameLabel.setPosition(20, 40*i + 10);
            scrollView.addChild(nameLabel);

            var btnOnline;
            if(item.valueOnline == ONLINE){
                btnOnline = new ccui.Button('res/Art/GUIs/Chat/vc_0001_Shape-84.png', 'res/Art/GUIs/Chat/vc_0001_Shape-84.png');

            }else if(item.valueOnline == OFFLINE){
                btnOnline = new ccui.Button('res/Art/GUIs/Chat/vc_0000_Layer-4.png', 'res/Art/GUIs/Chat/vc_0000_Layer-4.png');
            }

            btnOnline.setAnchorPoint(0, 0);
            btnOnline.setScale(1.5);
            btnOnline.setPosition(cc.winSize.width/5 - 30, nameLabel.y);
            scrollView.addChild(btnOnline, 12000);
        }


        scrollView.setInnerContainerSize(cc.size(scrollView.width, memberListOnline.length * 50));
        return scrollView;
    },
});