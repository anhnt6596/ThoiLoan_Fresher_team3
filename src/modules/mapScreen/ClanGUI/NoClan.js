var NoClan = cc.Sprite.extend({
    ctor: function() {
        this._super();

        var searchClanButton = new ui.optionButton("Tìm Bang", "res/Art/Bang hoi/POPUP_0000_Group-3.png");
        searchClanButton.attr({
            x: 90,
        });
        this.addChild(searchClanButton);
        searchClanButton.addClickEventListener(() => CLAN_GUI_HEADER.selectTabAction(3));

        var createClanButton = new ui.optionButton("Tạo Bang", "res/Art/Bang hoi/POPUP_0000_Group-3.png");
        createClanButton.attr({
            x: -90,
        });
        this.addChild(createClanButton);
        createClanButton.addClickEventListener(() => CLAN_GUI_HEADER.selectTabAction(3));
    },
});