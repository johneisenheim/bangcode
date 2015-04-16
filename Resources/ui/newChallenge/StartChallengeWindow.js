function StartChallengeWindow() {

	var StartChallengeView = require('ui/newChallenge/StartChallengeView');
	var startChallengeView = new StartChallengeView();
	var Picker = require('ui/newChallenge/Picker');
	var picker = new Picker();

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		backButtonTitle : String.format(L('main:back'), '')
	});

	self.add(startChallengeView);

	Ti.App.addEventListener('show_picker', function() {
		if (!picker.isShown) {
			self.add(picker);
			picker.animate({
				bottom : 0,
				duration : 300
			});
			picker.isShown = true;
		}
	});

	Ti.App.addEventListener('close_picker', function(e) {
		if (picker.isShown) {
			picker.animate({
				bottom : -250,
				duration : 300
			}, function() {
				self.remove(picker);
				picker.isShown = false;
				startChallengeView.getDateFromPicker(e.date);
			});
		}
	});

	return self;
}

module.exports = StartChallengeWindow;
