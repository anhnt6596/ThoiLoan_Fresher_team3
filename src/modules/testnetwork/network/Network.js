/**
 * Created by KienVN on 10/2/2017.
 */
//var count =0;
var gv = gv||{};
var testnetwork = testnetwork||{};
count =0;
var sendTroopInfoFlag = false;
var requestedServerTime = 0;

var NETWORK = NETWORK || null;

testnetwork.Connector = cc.Class.extend({
    ctor:function(gameClient)
    {
        NETWORK = this;
        this.gameClient = gameClient;
        gameClient.packetFactory.addPacketMap(testnetwork.packetMap);
        gameClient.receivePacketSignal.add(this.onReceivedPacket, this);
        this.sessionKey = 10001010;

    },
    onReceivedPacket:function(cmd, packet)
    {
        cc.log("onReceivedPacket:", cmd);
        switch (cmd)
        {
            case gv.CMD.HAND_SHAKE:

                this.sendLoginRequest();
                break;
            case gv.CMD.USER_LOGIN:
                this.sendGetUserInfo();
                //LoginScreen = fr.getCurrentScreen();
                //fr.getCurrentScreen().onFinishLogin(packet.username, packet.password);
                break;
            case gv.CMD.USER_INFO:

                //this.setUserInfomation();
                //fr.getCurrentScreen().onUserValidate(packet.name,packet.username, packet.password,packet.validate);
                //fr.getCurrentScreen().onUserValidate(packet.validate);
                this.setUserInfomation(packet);
                this.sendGetMapInfo();
                //this.sendGetTroopInfo();
                //this.sendGetBarrackQueueInfo();
                //Phai hien thi them cac troop da dc train offline
                //this.sendGetTroopInfo();
                break;
            case gv.CMD.GET_MAP_INFO:
                this.sendGetTroopInfo();

                //fr.getCurrentScreen().onFinishGameInfo();

                break;
            case gv.CMD.MOVE_CONSTRUCTION:
                //short packet.validate //success=1; false=0;
                if (packet.validate) {
                    cc.log("================================= SERVER XAC NHAN MOVE CONSTRUCTION============================");
                    temp.lastMoveBuilding && temp.lastMoveBuilding.acceptSendMoveFromServer();
                    temp.lastMoveBuilding = null;
                }
                else {
                    cc.log("================================= SERVER TU CHOI MOVE CONSTRUCTION============================");
                    temp.lastMoveBuilding && temp.lastMoveBuilding.sendMoveIsDenined();
                    temp.lastMoveBuilding = null;
                }
                break;
            case gv.CMD.ADD_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN XAY tu SERVER=======================================");
                    MAP.updateMapWhenValidatedBuild(temp.newBuildingAdd, temp.buildingAdd);
                    // eo hieu gi
                    if (temp.newBuildingAdd._name === "WAL_1") {
                        wallRefs.push(temp.newBuildingAdd);
                        wallRefs.forEach(function(element) {
                            element.updatePresentImg();
                        });
                        if (wallRefs.length < (config.building.TOW_1[getCurrentLevelTownHall()].WAL_1 || 0)) {
                            setTimeout(function() {
                                MAP.suggestNewWal(temp.newBuildingAdd);
                            }, 50);
                        }
                    }
                }else {
                    cc.log("=======================================SERVER TU CHOI XAY=======================================");
                    showPopupNotEnoughG('server_denied_build');
                }
                break;
            case gv.CMD.UPGRADE_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN UPGRADE tu SERVER=======================================");
                    this.upgradeConstruction(temp.buildingUpgrade);
                }else {
                    cc.log("=======================================SERVER TU CHOI UPGRADE=======================================");
                    showPopupNotEnoughG('server_denied_upgrade');
                }
                break;
            case gv.CMD.QUICK_FINISH:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN QUICK FINISH tu SERVER=======================================");
                    this.quickFinishConstruction(temp.buildingQuickFinish);
                }else {
                    cc.log("=======================================SERVER TU CHOI QUICK FINISH=======================================");
                    showPopupNotEnoughG('server_denied_quick_finish');
                }
                break;
            case gv.CMD.FINISH_TIME_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN FINISH TIME tu SERVER=======================================");
                    //this.finishTimeConstruction(temp.buildingFinishTime);
                }else {
                    cc.log("=======================================SERVER TU CHOI FINISH TIME=======================================");
                    showPopupNotEnoughG('server_denied_finish_time');
                }
                break;
            case gv.CMD.CANCEL_CONSTRUCTION:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN CANCEL tu SERVER=======================================");
                    this.cancelConstruction(temp.buildingCancel);
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL=======================================");
                    showPopupNotEnoughG('server_denied_cancel');
                }
                break;
            case gv.CMD.UPGRADE_MULTI_WALL:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN UPGRADE MULTI WALL tu SERVER=======================================");
                    this.processUpgradeMultiWalls(temp.listWall);
                }else {
                    cc.log("=======================================SERVER TU CHOI UPGRADE MULTI WALL=======================================");
                    showPopupNotEnoughG('server_denied_upgrade_multi_wall');
                }
                break;
            case gv.CMD.REMOVE_OBSTACLE:
                if(packet.validate) {

                }else {
                    cc.log("=======================================SERVER TU CHOI REMOVE OBSTACLE=======================================");
                    showPopupNotEnoughG('server_denied_remove_obstacle');
                }
                break;
            case gv.CMD.GET_SERVER_TIME:
                requestedServerTime++;
                time.DeltaTime = getCurrentClientTime() - packet.currentServerTime;
                break;
            case gv.CMD.ADD_RESOURCE:
                if(packet.validate) {
                    cc.log("=======================================XAC NHAN ADD RESOURCE tu SERVER=======================================");
                    increaseUserResources(ReducedTempResources);
                }else {
                    cc.log("=======================================SERVER TU CHOI ADD RESOURCE tu SERVER=======================================");
                    showPopupNotEnoughG('server_denied_add_resources');
                }
                break;
            case gv.CMD.GET_TROOP_INFO:
                cc.log("=======================================SERVER phan hoi TROOP INFO=======================================");
                    this.sendGetBarrackQueueInfo();
                    fr.getCurrentScreen().onFinishGameInfo();
                    LOBBY.update(gv.user);
                    this.divideTroopToArmyCamp();
                    for (var item in troopInfo) {
                        var obj = troopInfo[item];
                        if (obj.status===research_constant.status.busy){
                            research_constant.status.now = obj.status;
                            research_constant.troop = obj;
                        }
                        //cc.log('troopInfo.'+obj.type+'.population', troopInfo[item].population);
                    }
                //}
                break;
            case gv.CMD.GET_BARRACK_QUEUE_INFO:
                cc.log("=======================================SERVER phan hoi BARRACK QUEUE INFO=======================================");
                break;
            case gv.CMD.TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN TRAIN TROOP tu SERVER=======================================");
                    this.trainTroopCompleted(temp.trainedTroopType);
                }else {
                    cc.log("=======================================SERVER TU CHOI TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_train_troop');
                }
                break;
            case gv.CMD.CANCEL_TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN CANCEL TRAIN TROOP tu SERVER=======================================");
                    this.canceledTrainTroop(temp.trainedTroopType);
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_cancel_train_troop');
                }
                break;
            case gv.CMD.FINISH_TIME_TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN FINISH TIME TRAIN TROOP tu SERVER=======================================");
                    this.finishTimeTroopTrain(temp.trainedBarrackId, temp.trainedTroopType);
                }else {
                    cc.log("=======================================SERVER TU CHOI CANCEL TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_finish_time_train_troop');
                }
                break;
            case gv.CMD.QUICK_FINISH_TRAIN_TROOP:
                if (packet.validate) {
                    cc.log("=======================================XAC NHAN QUICK FINISH TRAIN TROOP tu SERVER=======================================");
                    this.quickFinishTroopTrain(temp.trainedBarrackId);
                }else {
                    cc.log("=======================================SERVER TU CHOI QUICK FINISH TRAIN TROOP=======================================");
                    showPopupNotEnoughG('server_denied_quick_finish_train_troop');
                }
                break;
            case gv.CMD.RESEARCH_TROOP_COMPLETE:
                cc.log("RESEARCH COMPLETEEEEEEEEEEEEEEEE");
                break;
            case gv.CMD.RESEARCH_TROOP_QUICK_COMPLETE:
                cc.log("RESEARCH COMPLETEEEEEEEEEEEEEEEE");
                break;
            case gv.CMD.CREATE_GUILD:
                this.processCreateGuild(packet);
                break;
            case gv.CMD.GET_GUILD_INFO:
                this.processGetGuildInfo(packet);
                break;
            case gv.CMD.GET_GUILD_LISTMEMBER_INFO:
                this.processGetListMemberClan(packet);
                break;
            case gv.CMD.SEARCH_GUILD_INFO:
                this.processSearchClan(packet);
                break;
            case gv.CMD.ADD_REQUEST_MEMBER:
                this.processAddRequestMember(packet);
                break;
            case gv.CMD.EDIT_GUILD_INFO:
                this.processEditGuildInfo(packet);
                break;
            case gv.CMD.REMOVE_MEMBER:
                this.processRemoveMember(packet);
                break;
            case gv.CMD.SET_GUILD_POSITION:
                this.processSetGuildPosition(packet);
                break;
            case gv.CMD.NEW_MESSAGE:
                if(packet.typeResponse == RESPONSE_VALIDATE){
                    if(packet.validateValue) {
                        cc.log("=======================================XAC NHAN SEND NEW MESSAGE tu SERVER=======================================");
                        this.processNewMessage();
                    }else{
                        cc.log("=======================================SERVER TU CHOI SEND NEW MESSAGE=======================================");
                        showPopupNotEnoughG('server_denied_send_new_message');
                    }
                }else if(packet.typeResponse == RESPONSE_TO_ALL){
                    this.processNewMessageToAll(packet);
                    cc.log("=======================================SERVER PHAN HOI NEW MESSAGE CHO MOI NGUOI=======================================");
                }
                break;
            case gv.CMD.GIVE_TROOP_GUILD:
                if(packet.typeResponse == RESPONSE_VALIDATE){
                    if(packet.validateValue) {
                        cc.log("=======================================XAC NHAN GIVE TROOP GUILD tu SERVER=======================================");
                        this.processGiveTroop();
                    }else{
                        cc.log("=======================================SERVER TU CHOI GIVE TROOP GUILD=======================================");
                        showPopupNotEnoughG('server_denied_give_troop_guild');
                    }
                }else if(packet.typeResponse == RESPONSE_TO_ALL){
                    this.processGiveTroopToAll(packet);
                    cc.log("=======================================SERVER PHAN HOI GIVE TROOP CHO MOI NGUOI=======================================");
                }
                break;
            case gv.CMD.GET_INTERACTION_GUILD:
                this.processInteractiveGuild();
                break;
            case gv.CMD.ONLINE_MESSAGE:
                cc.log("=======================================SERVER SEND ONLINE MEMBER=======================================");
                this.processOnlineMessage(packet);
                break;
        }
    },
    processSetGuildPosition: function(data) {
        if (data.validate) {
            cc.log("=======================================XAC NHAN SET GUILD POSITION tu SERVER=======================================");

            requestMyClanMember = true;
            this.getGuildListMemberInfo(gv.user.id_guild);

            var pos;
            switch(data.position) {
                case 0:
                    pos = "Member";
                    break;
                case 1:
                    pos = "Moderator";
                    break;
                case 2:
                    pos = "Leader";
                    break;
                default:
                    pos = "Member";
            }

            var mess =  {
                typeMessage: MESSAGE_NORMAL,
                userId: -1,
                usernameSend: "SYSTEM",
                content: "Fresher_" + data.id + " becomes to " + pos,
                timeStamp: getCurrentServerTime(),
                currentCapacityGot: 0,
                guildCapacityAtTime: 0
            };
            messageList.push(mess);
            updateMessageBox();
        }
    },
    processRemoveMember: function(data) {
        if (data.validate) {
            cc.log("=======================================XAC NHAN REMOVE MEMBER tu SERVER=======================================");

            if (data.id === gv.user.id) {
                var popup = new ui.PopUp("Bạn đã bị đuổi khỏi Bang");
                MAPSCENE.addChild(popup, 1000);
                popup.openAction();
                gv.user.is_in_guild = false;
                CLAN_GUI.initHeader(5);
                CLANCASTLE.addClanIcon();

                messageList = [];
                memberListOnline = [];
                memberListOnline[0] = {idUser: gv.user.id, username: gv.user.name, valueOnline: ONLINE};
            } else if (gv.user.is_in_guild) {
                requestMyClanMember = true;
                this.getGuildListMemberInfo(gv.user.id_guild);

                var mess =  {
                    typeMessage: MESSAGE_NORMAL,
                    userId: -1,
                    usernameSend: "SYSTEM",
                    content: "Fresher_" + data.id + " has been removed",
                    timeStamp: getCurrentServerTime(),
                    currentCapacityGot: 0,
                    guildCapacityAtTime: 0
                };
                messageList.push(mess);
                for(var i in memberListOnline) {
                    if(memberListOnline[i].idUser == data.id){
                        memberListOnline.splice(i, 1);
                    }
                }

                updateMessageBox();
            }
        }
    },
    processEditGuildInfo: function(data) {
        if (data.validate) {
            cc.log("=======================================XAC NHAN EDIT GUILD INFO tu SERVER=======================================");

            myClanInfo = extend(myClanInfo, temp.editGuildData);
            CLAN_GUI.TAB1.initClanInfo();
            CLANCASTLE.addClanIcon();

            var mess =  {
                typeMessage: MESSAGE_NORMAL,
                userId: -1,
                usernameSend: "SYSTEM",
                content: "Clan description has changed!",
                timeStamp: getCurrentServerTime(),
                currentCapacityGot: 0,
                guildCapacityAtTime: 0
            };
            messageList.push(mess);
            updateMessageBox();
        }
    },
    processAddRequestMember: function(data) {
        if (data.validate) {
            cc.log("=======================================XAC NHAN ADD REQUEST MEMBER tu SERVER=======================================");

            if (youAreRequest) {
                gv.user.lastRequestTroopTimeStamp = 0;
                youAreRequest = false;
                gv.user.is_in_guild = true;
                gv.user.id_guild = temp.reqJoinClanId;
                // CLAN_GUI_HEADER && CLAN_GUI.removeChild(CLAN_GUI_HEADER);
                CLAN_GUI.initHeader(1);

                requestMyClanMember = true;
                if (temp.reqJoinClanId !== undefined) {
                    this.getGuildListMemberInfo(temp.reqJoinClanId);
                    this.sendGetGuildInfo(temp.reqJoinClanId);
                }
            }
            var mess =  {
                typeMessage: MESSAGE_NORMAL,
                userId: -1,
                usernameSend: "SYSTEM",
                content: "Fresher_" + data.id + " has joined!",
                timeStamp: getCurrentServerTime(),
                currentCapacityGot: 0,
                guildCapacityAtTime: 0
            };
            messageList.push(mess);
            temp.statusRequest = true;
            memberListOnline.push({idUser: data.id, username: ("Fresher_" + data.id), valueOnline: ONLINE});
            updateMessageBox();
        }
    },
    processSearchClan: function(data) {
        if (searchSuggestClan) {
            suggestClanList = data.listClan;
            CLAN_GUI.TAB5.pushClanItem();
            searchSuggestClan = false;
        } else {
            listClanInfo = data.listClan;
            CLAN_GUI.TAB3.pushClanItem();
        }
    },
    processGetListMemberClan: function(data) {
        if (requestMyClanMember) {
            myClanMember = data.listUser;
            cc.log("...... " + data.listUser.length);
            requestMyClanMember = false;
            CLAN_GUI.TAB2.pushClanMember();
        } else {
            clanMember = data.listUser;
            CLAN_GUI.TAB3.pushMemberItem();
        }
    },
    processGetGuildInfo: function(data) {
        if (data.id === gv.user.id_guild) {
            myClanInfo = {
                id: data.id,
                name: data.name,
                iconType: data.iconType,
                status: data.status,
                level: data.level,
                member: data.member,
                description: data.description,
                troophy: data.troophy,
                troophyRequire: data.troophyRequire,
            }
            CLANCASTLE.addClanIcon();
        }
        CLAN_GUI.TAB1.initClanInfo();
    },
    processCreateGuild: function(data) {
        if (data.validate) {
            cc.log("=======================================XAC NHAN CREATE GUILD tu SERVER=======================================");

            gv.user.is_in_guild = true;
            gv.user.lastRequestTroopTimeStamp = 0;
            gv.user.id_guild = data.id;
            myClanInfo = {
                id: data.id,
                name: data.name,
                iconType: data.iconType,
                status: data.status,
                level: data.level,
                member: 0,
                description: data.description,
                troophy: data.troophy,
                troophyRequire: data.troophyRequire,
                description: data.description,
            };
            // CLAN_GUI_HEADER && CLAN_GUI.removeChild(CLAN_GUI_HEADER);
            CLAN_GUI.initHeader(1);
            CLAN_GUI.TAB1.initClanInfo();
            this.getGuildListMemberInfo(data.id);
            requestMyClanMember = true;

            CLANCASTLE.addClanIcon();
            LOBBY.showObjectMenu();

            var mess =  {
                typeMessage: MESSAGE_NORMAL,
                userId: -1,
                usernameSend: "SYSTEM",
                content: gv.user.name + " has created this clan!",
                timeStamp: getCurrentServerTime(),
                currentCapacityGot: 0,
                guildCapacityAtTime: 0
            };
            messageList.push(mess);
            temp.statusRequest = true;
            updateMessageBox();

        } else {
            cc.log("Có lỗi xảy ra, rảnh thì làm popUp");
        }
    },

    upgradeConstruction: function(building) {
        if (building._name == "WAL_1") {
            building.upgradeComplete(true);
        } else {
            if (building._name===('RES_1'||'RES_2'||'RES_3') ) {
                cc.log("cho phep upgrade");
                building.onCollectResource(true);
            }

            building.setStatus('upgrade');
            building.startTime = getCurrentServerTime();
            var cur = (getCurrentServerTime() - building.startTime)/1000;
            var max = config.building[building._name][building._level+1].buildTime;
            building.addTimeBar(cur, max);
            building.countDown(cur, max);
            building.buildTime = max;

            for(var item in contructionList){
                if(contructionList[item]._id == building._id){
                    contructionList[item].status = 'upgrade';
                    contructionList[item].startTime = building.startTime;
                    contructionList[item].buildTime = max;
                    break;
                }
            }

            updateBuilderNumber();
            reduceUserResources(ReducedTempResources);
            resetReducedTempResources();
            console.log("ten nha = "+ building._name);

            if(building._name == "BAR_1"){
                //Cap nhat startTime cho barrack
                barrackQueueList[building._id]._startTime = building.startTime - barrackQueueList[building._id]._startTime;
                //Dung countdown cua barrack nay
                barrackQueueList[building._id].flagCountDown = false;
            }
        }
    },

    quickFinishConstruction: function(building) {
        reduceUserResources(ReducedTempResources);
        if(building._status == 'pending'){
            building.buildComplete(true);
        }else if(building._status == 'upgrade'){
            building.upgradeComplete(true);
        }
        resetReducedTempResources();
    },

    finishTimeConstruction: function(building) {
        if(building._status == 'pending'){
            building.buildComplete(true);
        }else if(building._status == 'upgrade'){
            building.upgradeComplete(true);
        }
    },

    cancelConstruction: function(building) {
        if (building._status == 'upgrade') building.cancelUpgrade();
        else if (building._status == 'pending') building.cancelBuild();
    },

    processUpgradeMultiWalls: function(listWall) {
        listWall.forEach(function(wall) {
            wall.upgradeComplete(false);
        });

        temp.listWall = null;
    },

    createTroopAfterSVResponseSuccess: function(type, barrack) {
        var armyCamp = armyCampRefs[0];
        armyCampRefs.forEach(function(element) {
            if(element._curStorage < armyCamp._curStorage) armyCamp = element;
        });
        var troop = this.createNewTroop_1(type, armyCamp);
        troop && troop.appear(barrack);
    },

    divideTroopToArmyCamp: function() {
        // cc.log(">>>>>>>>>>>>>>>>>: ", troopInfo.ARM_1.level + ' :<<<<<<<<<<<<<<<>>: ' + armyCampRefs[0]._name);
        var numAMC = armyCampRefs.length;
        var curAMCindex = 0;
        var capacitys = armyCampRefs.map(function(amc) {
            // cc.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: ', config.building.AMC_1[amc._level].capacity);
            return config.building.AMC_1[amc._level].capacity;
        });
        for(var item in troopInfo) {
            var troopType = troopInfo[item];
            if (troopType.population > 0) {
                for (var i = 0; i < troopType.population; i++) {
                    var troop = this.createNewTroop_1(troopType.type, armyCampRefs[curAMCindex]);
                    curAMCindex += 1;
                    if (curAMCindex >= numAMC) curAMCindex = 0;
                }
            }
        }
    },

    createNewTroop_1: function(type, armyCamp) {
        switch (type) {
            case "ARM_1":
                var troop = new Warrior(armyCamp);
                break;
            case "ARM_2":
                var troop = new Archer(armyCamp);
                break;
            case "ARM_3":
                var troop = new Goblin(armyCamp);
                break;
            case "ARM_4":
                var troop = new Giant(armyCamp);
                break;
            default:
                break;
        }
        return troop;
    },

    finishTimeTroopTrain: function(id, troopType) {
        //Cho linh chay ra
        var start;
        for(var i in objectRefs){
            if(objectRefs[i]._id == id){
                start = objectRefs[i];
                break;
            }
        }
        this.createTroopAfterSVResponseSuccess(troopType, start);
        troopInfo[troopType].population++;
        LOBBY.update(gv.user);
        var here = barrackQueueList[id];

        cc.log("=================================== id luc xac nhan finish time: " + id);
        BARRACK[id]._troopList[troopType]._amount--;
        BARRACK[id]._totalTroopCapacity -= BARRACK[id]._troopList[troopType]._housingSpace;
        here._totalTroopCapacity -= BARRACK[id]._troopList[troopType]._housingSpace;
        BARRACK[id]._titleText.setString("Barrack id: " + BARRACK[id]._id + "   (" + BARRACK[id]._totalTroopCapacity+"/"+BARRACK[id]._queueLength + ")");
        BARRACK[id].enableItemDisplay();
        //Het icon trong item
        if(BARRACK[id]._troopList[troopType]._amount == 0){
            BARRACK[id]._amountItemInQueue--;
            here._amountItemInQueue--;
            BARRACK[id]._itemInQueue[troopType].setPosition(-1000, -1000);
            BARRACK[id]._troopList[troopType]._currentPosition = -1;
            BARRACK[id]._startTime = getCurrentServerTime();
            here._startTime = getCurrentServerTime();
            //Het item trong queue
            if(BARRACK[id]._amountItemInQueue == 0){
                BARRACK[id]._timeBar.visible = false;
                cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
                BARRACK[id]._statusCountDown = false;
                return;
                //Con item trong queue
            }else{
                BARRACK[id].updateQueue(BARRACK[id]._troopList[troopType]._currentPosition);
                BARRACK[id].updateTimeBar(0, BARRACK[id].getFirstItemInQueue()._trainingTime);
            }
            //Con icon trong item
        }else{
            BARRACK[id]._itemInQueue[troopType].updateAmountSmall();
            BARRACK[id].updateTimeBar(0, BARRACK[id].getFirstItemInQueue()._trainingTime);
            BARRACK[id]._startTime = getCurrentServerTime();
            here._startTime = getCurrentServerTime();
            BARRACK[id]._isShowTimeBar = true;
            BARRACK[id]._statusCountDown = true;
            BARRACK[id].countDown();
        }

        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacity = getTotalCurrentTroopCapacity();
        BARRACK[id].str.setString('Total troops after training: ' + currentCapacity +'/' + totalCapacity);
        BARRACK[id].upadateQuickFinishTimeAndCost();

        //update label
        var totalAfterTrain = getTotalCurrentTroopCapacity();
        for(var i in barrackQueueList){
            totalAfterTrain += barrackQueueList[i]._totalTroopCapacity;
        }
        TRAIN_POPUP.str.setString('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity);
    },

    quickFinishTroopTrain: function(id) {
        //Tru tien
        reduceUserResources(ReducedTempResources);
        resetReducedTempResources();

        //An tat ca, reset queue, troop
        var here = barrackQueueList[id];

        TRAIN_POPUP._startTime = 0;
        here._startTime = 0;
        TRAIN_POPUP._totalTroopCapacity = 0;
        here._totalTroopCapacity = 0;
        TRAIN_POPUP._amountItemInQueue = 0;
        here._amountItemInQueue = 0;

        var start;
        for(var i in objectRefs){
            if(objectRefs[i]._id == id){
                start = objectRefs[i];
                break;
            }
        }

        //cho tat ca linh chay
        for(var i in TRAIN_POPUP._troopList){
            for(var j = 0; j < TRAIN_POPUP._troopList[i]._amount; j++){
                this.createTroopAfterSVResponseSuccess(i, start);
            }
        }

        for(var i in TRAIN_POPUP._troopList){
            troopInfo[i].population += TRAIN_POPUP._troopList[i]._amount;
            TRAIN_POPUP._troopList[i]._amount = 0;
            TRAIN_POPUP._itemInQueue[i].setPosition(-1000, -1000);
            TRAIN_POPUP._troopList[i]._currentPosition = -1;

            TRAIN_POPUP._timeBar.visible = false;
            TRAIN_POPUP._statusCountDown = false;
        }
        LOBBY.update(gv.user);

        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");
        TRAIN_POPUP.enableItemDisplay();

        var totalCapacity = getTotalCapacityAMCs();
        var currentCapacity = getTotalCurrentTroopCapacity();
        TRAIN_POPUP.str.setString('Total troops after training: ' + currentCapacity +'/' + totalCapacity);
    },

    trainTroopCompleted: function(troopType) {
        reduceUserResources(ReducedTempResources);
        resetReducedTempResources();

        var here = barrackQueueList[temp.trainedBarrackId];

        if(TRAIN_POPUP._troopList[troopType]._amount == 0) {
            TRAIN_POPUP._amountItemInQueue++;
            here._amountItemInQueue++;
            TRAIN_POPUP._troopList[troopType]._currentPosition = TRAIN_POPUP._amountItemInQueue - 1;

            //item dau tien va icon dau tien trong item
            if(TRAIN_POPUP._troopList[troopType]._currentPosition == 0 && TRAIN_POPUP._troopList[troopType]._amount == 0){
                TRAIN_POPUP._startTime = getCurrentServerTime();
                here._startTime = getCurrentServerTime();

                if(!TRAIN_POPUP._isShowTimeBar){
                    cc.log("================================ SHOW TIME BAR sau khi train troop ================================");
                    TRAIN_POPUP.showTimeBar();
                    TRAIN_POPUP._isShowTimeBar = true;
                    TRAIN_POPUP._statusCountDown = true;
                }else{
                    TRAIN_POPUP._statusCountDown = true;
                    if(TRAIN_POPUP._isShowTimeBar){
                        TRAIN_POPUP.updateTimeBar(0, TRAIN_POPUP.getFirstItemInQueue()._trainingTime);
                        TRAIN_POPUP.countDown();
                    }
                }
                TRAIN_POPUP._timeBar.visible = true;
            }

            TRAIN_POPUP._itemInQueue[troopType].setPosition(TRAIN_POPUP._positionsInQueue[TRAIN_POPUP._troopList[troopType]._currentPosition]);
        }
        TRAIN_POPUP._troopList[troopType]._amount++;
        TRAIN_POPUP._totalTroopCapacity += TRAIN_POPUP._troopList[troopType]._housingSpace;
        here._totalTroopCapacity += TRAIN_POPUP._troopList[troopType]._housingSpace;
        TRAIN_POPUP.disableItemDisplay();

        TRAIN_POPUP.updateAmount(TRAIN_POPUP._itemDisplay[troopType]);
        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");

        //update label
        var totalCapacity = getTotalCapacityAMCs();
        var totalAfterTrain = getTotalCurrentTroopCapacity();
        for(var i in barrackQueueList){
            totalAfterTrain += barrackQueueList[i]._totalTroopCapacity;
        }
        TRAIN_POPUP.str.setString('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity);

        cc.log("========================================= total time: " + TRAIN_POPUP.getTotalTimeQuickFinish());
        TRAIN_POPUP.upadateQuickFinishTimeAndCost();
    },

    canceledTrainTroop: function(troopType) {
        var here = barrackQueueList[temp.trainedBarrackId];

        TRAIN_POPUP._troopList[troopType]._amount--;
        TRAIN_POPUP._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        here._totalTroopCapacity -= TRAIN_POPUP._troopList[troopType]._housingSpace;
        if(TRAIN_POPUP._troopList[troopType]._amount == 0){
            TRAIN_POPUP._amountItemInQueue--;
            here._amountItemInQueue--;
            if(TRAIN_POPUP._amountItemInQueue == 0){
                TRAIN_POPUP._isShowTimeBar = false;
                if(TRAIN_POPUP._timeBar) TRAIN_POPUP._timeBar.visible = false;
                TRAIN_POPUP._statusCountDown = false;

                cc.log("=========================VISIBLE TIMEBAR = FALSE=========================");
            }else{
                TRAIN_POPUP.updateQueue(TRAIN_POPUP._troopList[troopType]._currentPosition);
            }
            TRAIN_POPUP._itemInQueue[troopType].setPosition(-1000, -1000);
            TRAIN_POPUP._troopList[troopType]._currentPosition = -1;
        }
        TRAIN_POPUP._itemInQueue[troopType].updateAmountSmall();
        TRAIN_POPUP._titleText.setString("Barrack id: " + TRAIN_POPUP._id + "   (" + TRAIN_POPUP._totalTroopCapacity+"/"+TRAIN_POPUP._queueLength + ")");

        //update label
        var totalCapacity = getTotalCapacityAMCs();
        var totalAfterTrain = getTotalCurrentTroopCapacity();
        for(var i in barrackQueueList){
            totalAfterTrain += barrackQueueList[i]._totalTroopCapacity;
        }
        TRAIN_POPUP.str.setString('Total troops after training: ' + totalAfterTrain +'/' + totalCapacity);

        TRAIN_POPUP.enableItemDisplay();
        TRAIN_POPUP.upadateQuickFinishTimeAndCost();

        //Refund
        var costItem = TRAIN_POPUP._troopList[troopType].getCost();
        cc.log("============================= Elixir cost: " + costItem.elixir);
        var refundResources = {gold:costItem.gold, elixir:costItem.elixir, darkElixir:costItem.darkElixir, coin:costItem.coin};
        increaseUserResources(refundResources);
    },

    processGiveTroop: function() {
        troopInfo[temp.typeTroopGive].population--;
        LOBBY.update(gv.user);
        if(userGotList[temp.idUserGetTroop]){
            userGotList[temp.idUserGetTroop] += 1;
        }else{
            userGotList[temp.idUserGetTroop] = 1;
        }

        for(var i in messageList) {
            var item = messageList[i];
            if(item.typeMessage == MESSAGE_ASK_TROOP && item.userId == temp.idUserGetTroop) {
                item.currentCapacityGot += config.troopBase[temp.typeTroopGive].housingSpace;

                //Neu userGet da nhan full troop
                if(item.currentCapacityGot == item.guildCapacityAtTime){
                    messageList.splice(i, 1);
                    cc.director.getRunningScene().getChildByTag(171).removeAll();

                    //Cap nhat lai la co the cho quan
                    if(userGotList[temp.idUserGetTroop]){
                        userGotList[temp.idUserGetTroop] = 0;
                    }
                }else{
                    if(userGotList[temp.idUserGetTroop] && userGotList[temp.idUserGetTroop] == MAX_TROOP_AMOUNT_USER_CAN_GIVE){
                        cc.log("========================= MAX =5 ==================");
                        cc.director.getRunningScene().getChildByTag(171).removeAll();
                        break;
                    }

                    var troopItem = cc.director.getRunningScene().getChildByTag(temp.tagTroopGive);
                    if(troopItem){
                        if(troopInfo[troopItem._name].population == 0){
                            cc.director.getRunningScene().removeChildByTag(temp.tagTroopGive);
                        }else{
                            troopItem.currentAmount.setString(troopInfo[troopItem._name].population);
                        }
                    }
                }

                break;
            }
        }

        updateMessageBox();
        donateTroopShowAnims(temp.typeTroopGive);
    },

    processGiveTroopToAll: function(message) {
        for(var i in messageList) {
            var item = messageList[i];
            if(item.typeMessage == MESSAGE_ASK_TROOP && item.userId == message.idUserGet) {
                item.currentCapacityGot += config.troopBase[message.troopType].housingSpace;

                //Neu userGet da nhan full troop
                if(item.currentCapacityGot == item.guildCapacityAtTime){
                    messageList.splice(i, 1);

                    //Cap nhat lai la co the cho quan
                    if(userGotList[temp.idUserGetTroop]){
                        userGotList[temp.idUserGetTroop] = 0;
                    }
                }
                break;
            }
        }

        //Neu nguoi nhan linh la minh thi tang TroopGuild
        if(message.idUserGet == gv.user.id) {
            troopGuildList.push({typeTroop: message.troopType, level: message.levelTroop});
            receiveTroopShowAnims(message.troopType, message.levelTroop);
        }
        updateMessageBox();
    },

    processNewMessage: function() {
        var message = {
            typeMessage: temp.messageType,
            userId: gv.user.id,
            usernameSend: gv.user.name,
            content: temp.messageContent,
            timeStamp: getCurrentServerTime(),
            currentCapacityGot: getTotalCapacityTroopGuild(),
            guildCapacityAtTime: temp.guildCapacityAtTime
        };
        if(message.typeMessage == MESSAGE_ASK_TROOP) {
            gv.user.lastRequestTroopTimeStamp = getCurrentServerTime();
            for(var i in messageList) {
                if(messageList[i].userId == message.userId && messageList[i].typeMessage == MESSAGE_ASK_TROOP){
                    messageList.splice(i, 1);
                }
            }
            var cur = (getCurrentServerTime() - gv.user.lastRequestTroopTimeStamp)/1000;
            var max = TIME_REQUEST_TROOP / 1000;
            if(!objectRefs[ID_CLC_BUILDING].timeBar){
                objectRefs[ID_CLC_BUILDING].addTimeBar(cur, max);
                objectRefs[ID_CLC_BUILDING].countDownRequest(cur, max);
            }
        }
        messageList.push(message);
        temp.enableSendMessageFlag = true;
        updateMessageBox();
    },

    processNewMessageToAll: function(message) {
        var newMessage = {
            typeMessage: message.messageType,
            userId: message.idUserSend,
            usernameSend: message.usernameSend,
            content: message.contentMessage,
            timeStamp: getCurrentServerTime(),
            currentCapacityGot: message.currentCapacityTroop,
            guildCapacityAtTime: message.guildCapacityAtTime
        };
        if(message.typeMessage == MESSAGE_ASK_TROOP) {
            for(var i in messageList) {
                if(messageList[i].userId == message.userId && messageList[i].typeMessage == MESSAGE_ASK_TROOP){
                    messageList.splice(i, 1);
                }
            }
        }
        messageList.push(newMessage);
        updateMessageBox();
    },

    processInteractiveGuild: function() {
        LOBBY.onInteractiveGuild();
        updateMessageBox();
    },

    processOnlineMessage: function(packet) {
        for(var i in memberListOnline) {
            if(packet.userOnline == memberListOnline[i].idUser){
                memberListOnline[i].valueOnline = packet.valueOnline;
            }
        }
        updateMessageBox();
    },


    sendGetUserInfo:function()
    {
        cc.log("sendGetUserInfo");
        var pk = this.gameClient.getOutPacket(CmdSendUserInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendGetMapInfo:function()
    {
        cc.log("sendGetMapInfo");
        var pk = this.gameClient.getOutPacket(CmdSendMapInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
    },
    sendLoginRequest: function () {
        cc.log("sendLoginRequest");
        var pk = this.gameClient.getOutPacket(CmdSendLogin);
        pk.pack(this.sessionKey, gv.user.uuid);
        this.gameClient.sendPacket(pk);
    },
    setUserInfomation:function(packet){
        time.DeltaTime = getCurrentClientTime() - packet.serverTime;
        cc.log("DeltaTime ban dau nhan tu SERVER: " + time.DeltaTime + " ms");
        gv.user.id = packet.id;
        gv.user.name = packet.name;
        gv.user.exp = packet.exp;
        gv.user.coin = packet.coin;
        gv.user.gold = packet.gold;
        gv.user.elixir = packet.elixir;
        gv.user.darkElixir = packet.darkElixir;

        gv.user.lastRequestTroopTimeStamp = packet.last_time_ask_for_troops;
        if(getCurrentServerTime() - gv.user.lastRequestTroopTimeStamp < TIME_REQUEST_TROOP){
            temp.statusRequest = true;
            cc.log(" =========================== status request = true ");
        }

        cc.log(" ================ DUY: lastRequestTroopTimeStamp" + gv.user.lastRequestTroopTimeStamp);

        gv.user.is_in_guild = packet.is_in_guild;
        gv.user.id_guild = packet.id_guild || -1,
            gv.user.name_guild = packet.name_guild || "",
            gv.user.id_logo_guild = packet.id_logo_guild || 1,
            gv.user.last_time_ask_for_troops = packet.last_time_ask_for_troops || -1,
            gv.user.last_time_out_guild = packet.last_time_out_guild || 0;
        cc.log("========================================== Gold: " + gv.user.gold);
        cc.log("========================================== Elixir: " + gv.user.elixir);
        cc.log("========================================== Dark Elixir: " + gv.user.darkElixir);
        cc.log("========================================== Coin: " + gv.user.coin);
        gv.user.allBuilder = packet.builderNumber;
        gv.user.freeBuilder = gv.user.allBuilder - checkPendingBuilding();
        cc.log("========================================== All Builder: " + gv.user.allBuilder);
        cc.log("========================================== Free Builder: " + gv.user.freeBuilder);
    },
    sendMoveConstruction:function(id,x,y) {
        cc.log("sendMoveConstruction" +id+" "+x+ " "+y);
        var pk = this.gameClient.getOutPacket(CmdSendMove);
        pk.pack(id, x, y);
        this.gameClient.sendPacket(pk);
    },
    sendMoveMultiWall: function(list) {
        var pk = this.gameClient.getOutPacket(CmdSendMoveMultiWall);
        pk.pack(list);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================sendMoveMultiWall=======================================" + list.length);
    },
    sendAddConstruction:function(type,x,y){
        cc.log("sendAddConstruction" +type+" "+x+ " "+y);
        var pk = this.gameClient.getOutPacket(CmdSendAddConstruction);
        pk.pack(type, x, y);
        this.gameClient.sendPacket(pk);
    },
    sendRequestAddConstruction: function(newBuilding, building){
        this.sendAddConstruction(building.name, newBuilding._posX, newBuilding._posY);
        temp.buildingAdd = building;
        temp.newBuildingAdd = newBuilding;
        cc.log("=======================================SEND REQUEST ADD CONSTRUCTION=======================================" + building._id);
    },
    sendUpgradeConstruction:function(id){
        cc.log("sendUpgradeConstruction" +id);
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST UPGRADE CONSTRUCTION=======================================" + id);
    },
    upgradeMultiWall: function(list){
        temp.listWall = list;
        var pk = this.gameClient.getOutPacket(CmdSendUpgradeMultiWall);
        pk.pack(list);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================upgradeMultiWall=======================================" + list.length);
    },
    sendRequestUpgradeConstruction:function(building){
        NETWORK.sendUpgradeConstruction(building._id);
        temp.buildingUpgrade = building;
    },

    //Finish build or Finish upgrade
    sendFinishTimeConstruction:function(id){
        cc.log("sendTimeFinishConstruction: " +id);
        var pk = this.gameClient.getOutPacket(CmdSendFinishTimeConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST FINISH TIME CONSTRUCTION=======================================");
    },

    //Quick Finish
    sendQuickFinish:function(id){
        var pk = this.gameClient.getOutPacket(CmdSendQuickFinish);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST QUICK FINISH======================================= " + id);
    },

    //Cancel
    sendCancel:function(id){
        var pk = this.gameClient.getOutPacket(CmdSendCancelConstruction);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST CANCEL CONSTRUCTION=======================================" +id);
    },

    sendGetServerTime:function(){
        var pk = this.gameClient.getOutPacket(CmdGetServerTime);
        pk.pack();
        this.gameClient.sendPacket(pk);
        //cc.log("=======================================SEND REQUEST GET SERVER TIME=======================================");
    },
    sendAddResource: function(gold, elixir, darkElixir, coin) {
        cc.log('Add Resource');
        var pk = this.gameClient.getOutPacket(CmdSendAddResource);
        pk.pack(gold, elixir, darkElixir, coin);
        this.gameClient.sendPacket(pk);
        cc.log("=======================================SEND REQUEST ADD RESOURCE=======================================");
    },
    sendGetTroopInfo: function() {
        var pk = this.gameClient.getOutPacket(CmdSendGetTroopInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GET TROOP INFO==========================================');
    },
    sendResearchTroop: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroop);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP==========================================');
    },
    sendResearchComplete: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroopComplete);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP COMPLETE====================================');
    },
    sendResearchQuickFinish: function(type) {
        var pk = this.gameClient.getOutPacket(CmdSendResearchTroopQuickFinish);
        pk.pack(type);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND RESEARCH TROOP QUICK FINISH====================================');
    },
    sendGetBarrackQueueInfo: function() {
        var pk = this.gameClient.getOutPacket(CmdSendGetBarrackQueueInfo);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GET BARRACK QUEUE INFO==========================================');
    },

    sendTrainTroop: function(idBarrack, typeTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendTrainTroop);
        pk.pack(idBarrack, typeTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND TRAIN TROOP==========================================');
        cc.log("=======================================idBarrack: " + idBarrack);
        cc.log("=======================================typeTroop: " + typeTroop);
    },

    sendCancelTrainTroop: function(idBarrack, typeTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendCancelTrainTroop);
        pk.pack(idBarrack, typeTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND CANCEL TRAIN TROOP==========================================');
    },

    sendFinishTimeTrainTroop: function(idBarrack, typeTroop, remainTroop) {
        var pk = this.gameClient.getOutPacket(CmdSendFinishTimeTrainTroop);
        pk.pack(idBarrack, typeTroop, remainTroop);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND FINISH TIME TRAIN TROOP==========================================');
    },

    sendQuickFinishTrainTroop: function(idBarrack) {
        var pk = this.gameClient.getOutPacket(CmdSendQuickFinishTrainTroop);
        pk.pack(idBarrack);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND QUICK FINISH TRAIN TROOP==========================================');
    },
    sendDoHarvest: function (id) {
        var pk = this.gameClient.getOutPacket(CmdSendDoHarvest);
        pk.pack(id);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND FINISH TIME TRAIN TROOP==========================================');
    },

    sendNewMessage: function (type, content) {
        var pk = this.gameClient.getOutPacket(CmdSendNewMessage);
        pk.pack(type, content);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND NEW MESSAGE==========================================');
    },

    sendGiveTroop: function (idUserGet, troopType, level) {
        var pk = this.gameClient.getOutPacket(CmdSendGiveTroop);
        pk.pack(idUserGet, troopType, level);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GIVE TROOP==========================================');
    },

    sendGetInteractionGuild: function () {
        var pk = this.gameClient.getOutPacket(CmdSendGetInteractionGuild);
        pk.pack();
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GET INTERACTION GUILD==========================================');
    },
    sendCreateGuild: function(data) {
        var pk = this.gameClient.getOutPacket(CmdSendCreateGuild);
        pk.pack(data);
        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND CREATE GUIDE==========================================');
    },
    sendGetGuildInfo: function(data) {
        cc.log("NETWORK ID " + data);
        var pk = this.gameClient.getOutPacket(CmdSendGetGuildInfo);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND GUIDE INFO ' + data + '==========================================');
    },
    sendAddRequestMember: function(data) {
        var pk = this.gameClient.getOutPacket(CmdSendAddRequestMember);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================SEND ADD REQUEST MEMBER==========================================');
    },
    getGuildListMemberInfo: function(data) {
        var pk = this.gameClient.getOutPacket(CmdGetGuildListMemberInfo);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================GetGuildListMemberInfo==========================================');
    },
    searchGuildInfo: function(data) {
        var pk = this.gameClient.getOutPacket(CmdSearchGuildInfo);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================SearchGuildInfo==========================================');
    },
    sendEditGuildInfo: function(data) {
        var pk = this.gameClient.getOutPacket(CmdSendEditGuildInfo);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================SendEditGuildInfo==========================================');
    },
    sendRemoveMember: function(data) {
        var pk = this.gameClient.getOutPacket(CmdRemoveMember);
        pk.pack(data);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================sendRemoveMember==========================================');
    },
    sendSetGuildMemberPosition: function(id, position) {
        var pk = this.gameClient.getOutPacket(CmdSetGuildMemberPosition);
        pk.pack(id, position);

        this.gameClient.sendPacket(pk);
        cc.log('=======================================sendSetGuildMemberPosition==========================================');
    },
});
