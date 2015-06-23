function QuickGameView() {

	var Motion = require('core/Motion');
	var motion = new Motion();
	var status = 0;
	
	var iHaveAlreadyLoadedTheGun = false;

	var orientation = 0;

	var loadSound = ZLSound.createSample({
		media : 'music/gun_loading.mp3',
		volume : 1.0
	});

	var self = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical',
		isGunAdded : false
		//top : 10
	});

	var flag = false;
	
	var masterCanSendStartPacket = false;

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
		width : johnsLib.calculateHeight(90),
		height : johnsLib.calculateHeight(356)
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
			if (!iHaveAlreadyLoadedTheGun) {
				motion.imInStarting = true;
				Ti.API.info('im in starting ' + motion.imInStarting);
				loadSound.play();
				iHaveAlreadyLoadedTheGun = true;
				masterCanSendStartPacket = true;
			}
		}
	};

	gun.addEventListener('click', whenUpside);
	
	var orientationChangeCallback = function(e){
		Ti.API.info('orientationChangeCallback');
		orientation = e.orientation;
		if( Motion == null ){
			Ti.API.info('Motion is null');
			Motion = require('core/Motion');
			motion = new Motion();
		}else{
			Ti.API.info('Motion is not null.');
		}
		Ti.API.info(orientation);
		switch(e.orientation) {
		case 2:
			motion.startMotionRecognizer();
			self.removeAllChildren();
			self.add(gun);
			self.isGunAdded = true;
			break;
		case 1 || 3 || 4 || 5:
			if (self.isGunAdded) {
				motion.stopMotionRecognizer();
				self.remove(gun);
				self.add(label);
				self.add(position);
				self.isGunAdded = false;
			}
			break;
		default:
			break;
		}
	};

	Ti.App.addEventListener('position', function(e) {
		if (e.what) {
			if (!flag) {
				flag = true;
			}
		} else {
			Ti.Media.vibrate();
			Ti.Media.beep();
			if (flag)
				flag = false;
		}
	});
	
	self.initialize = function(){
		Ti.API.info('initialize for the master called');
		Ti.Gesture.addEventListener('orientationchange', orientationChangeCallback);
	};
	
	self.canISendStartPacket = function(){
		return masterCanSendStartPacket;
	};
	
	self.getMotionObject = function(){
		return motion;
	};
	
	self.deallocModule = function(){
		Motion = null;
		motion = null;
	};
	
	self.removeEventOnOrientation = function(){
		Ti.API.info('remove orientation');
		Ti.Gesture.removeEventListener('orientationchange', orientationChangeCallback);
	};

	self.add(label);
	self.add(position);

	return self;
}

module.exports = QuickGameView;
