//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MainWindow = require('ui/MainWindow');
	var mainWindow = new MainWindow();

	//create component instance
	var self = Titanium.UI.createTabGroup({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		translucent : true
	});

	var home = global.mainTab;
	home.setWindow(mainWindow);
	
	self.addTab(home);

	self.setActiveTab(home);

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
