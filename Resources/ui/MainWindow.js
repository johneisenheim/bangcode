function MainWindow() {
	
	var MainView = require('ui/MainView');
	var mainView = new MainView();
	
	var tutorialButton = Titanium.UI.createButton({
		title:'Tutorial'
	});
	
	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor:'#F5F4F2',
		statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout:'composite',
		tabBarHidden:true,
		rightNavButton:tutorialButton
	});
	
	self.add(mainView);

	return self;
}

module.exports = MainWindow;
