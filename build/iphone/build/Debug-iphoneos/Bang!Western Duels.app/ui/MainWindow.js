function MainWindow() {

	var MainView = require('ui/MainView');
	var mainView = new MainView();
	
	var notify = require('bencoding.localnotify');

	var tutorialButton = Titanium.UI.createButton({
		title : 'Tutorial'
	});

	tutorialButton.addEventListener('click', function() {
		var Tutorial = require('ui/tutorial/Tutorial');
		var tutorial = new Tutorial();
		tutorial.open();
	});
	
	var settingsButton = Titanium.UI.createButton({
		backgroundColor : 'transparent',
		backgroundImage : 'images/settings.png',
		width : 25,
		height : 20
	});
	
	settingsButton.addEventListener('click', function(){
		var Settings = require('ui/settings/Settings');
		var settings = new Settings();
		global.mainTab.open(settings,{
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'vertical',
		tabBarHidden : true,
		rightNavButton : settingsButton,
		leftNavButton : tutorialButton,
		clipMode : Titanium.UI.iOS.CLIP_MODE_ENABLED
	});

	self.add(mainView);

	return self;
}

module.exports = MainWindow;
