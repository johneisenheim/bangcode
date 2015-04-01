//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MainWindow = require('ui/handheld/iOS/MainWindow');
	var mainWindow = new MainWindow();

	//create component instance
	var self = Titanium.UI.createTabGroup({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		translucent : true
	});

	var home = Titanium.UI.createTab({
		window : mainWindow
	});
	self.addTab(home);

	self.setActiveTab(home);

	Ti.App.addEventListener('goto_page', function(e) {
		Ti.API.info(e.what);
		switch(e.what) {
		case 'challenges':
			var ChallengeWindow = require('ui/handheld/iOS/challenges/ChallengeWindow');
			var challengeWindow = new ChallengeWindow();
			home.open(challengeWindow, {
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
			break;
		case 'start_duel':
			var StartChallengeWindow = require('ui/handheld/iOS/newChallenge/StartChallengeWindow');
			var startChallengeWindow = new StartChallengeWindow();
			home.open(startChallengeWindow, {
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});

			break;
		}
	});

	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
