function QuickGameFinderView() {

	var Motion = require('core/Motion');
	var motion = new Motion();

	var flag = false;
	var status = 0;

	var orientation = 0;

	var self = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical',
		//top : 10
	});

	var label = Titanium.UI.createLabel({
		top : 60,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Assumi la posizione di starting come mostrato nell\'immagine. Una volta raggiunta la posizione, il dispositivo vibrerà finché la tua posizione non sarà corretta.',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var position = Titanium.UI.createImageView({
		top : 50,
		image : 'images/position1.png',
		backgroundColor : 'transparent',
		width : 90,
		height : 356
	});

	var gun = Titanium.UI.createImageView({
		top : 30,
		image : 'images/gun.png',
		backgroundColor : 'transparent',
		width : '70%',
		height : '90%'
	});

	var whenUpside = function() {
		if (flag) {
			motion.imInStarting = true;
			Ti.API.info('im in starting ' + motion.imInStarting);
		}
	};

	gun.addEventListener('click', whenUpside);

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		orientation = e.orientation;
		switch(e.orientation) {
		case 2:
			motion.startMotionRecognizer();
			self.removeAllChildren();
			self.add(gun);
			break;
		case 1:
			motion.stopMotionRecognizer();
			self.remove(gun);
			self.add(label);
			self.add(position);
			//gun.removeEventListener('click', whenUpside);
			break;
		default:
			break;
		}
	});

	Ti.App.addEventListener('position', function(e) {
		if (e.what) {
			if (!flag)
				flag = true;
		} else {
			Ti.Media.vibrate();
			if (flag)
				flag = false;
		}
	});

	self.add(label);
	self.add(position);

	return self;
}

module.exports = QuickGameFinderView;
