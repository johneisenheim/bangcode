function Motion() {

	var CoreMotion = require('ti.coremotion');

	var self = {};
	
	self.imInStarting = false;
	var startCountdown = false;
	var userCanFire = false;
	var shouldListeningForPosition = true;
	var currentYaw = 0;
	var positionReached = true;  
	/*siccome il richiamo della funzione di callback del motion è molto veloce, può accedere che si
	 * possa fare bang, missed o fault anche quando una delle condizioni avvenga. Quindi usiamo questo flag
	 * */

	var pitch,
	    roll,
	    yaw;

	var bangSound = ZLSound.createSample({
		media : 'music/colt_shot.mp3',
		volume : 1.0
	});

	var missSound = ZLSound.createSample({
		media : 'music/missed.mp3',
		volume : 1.0
	});

	var faultSound = ZLSound.createSample({
		media : 'music/fault.mp3',
		volume : 1.0
	});

	self.startMotionRecognizer = function() {
		if (CoreMotion.isDeviceMotionAvailable()) {
			CoreMotion.setDeviceMotionUpdateInterval(20);
			var frames = CoreMotion.availableAttitudeReferenceFrames();
			var ref_frame = CoreMotion.ATTITUDE_REFERENCE_FRAME_X_TRUE_NORTH_Z_VERTICAL;
			CoreMotion.startDeviceMotionUpdatesUsingReferenceFrame({
				referenceFrame : ref_frame
			}, updateMotionData);
		}
	};

	self.stopMotionRecognizer = function() {
		CoreMotion.stopDeviceMotionUpdates();
		Ti.API.info('Motion updates stop');
	};

	function updateMotionData(e) {
		if (e.success) {
			if( !positionReached )
				return;
			
			var userAcceleration = e.userAcceleration;

			xAcc = userAcceleration.x;

			var data = e.attitude;
			pitch = data.pitch;
			roll = data.roll;
			yaw = data.yaw;

			if (shouldListeningForPosition) {
				if (transform(pitch) <= -60 && transform(pitch) > -90) {
					Ti.API.info("Starting position!");
					currentYaw = transform(yaw);
					Ti.App.fireEvent('position', {
						what : true
					});
				} else {
					Ti.API.info("No starting position");
					Ti.App.fireEvent('position', {
						what : false
					});
				}
			}

			if (self.imInStarting) {
				if (transform(pitch) >= 1 && transform(pitch) < 10) {
					//BANG
					if (userCanFire) {
						if (transform(yaw) >= (currentYaw + 10) || transform(yaw) < (currentYaw - 10)) {
							//MISSED
							missSound.play();
							Ti.API.info("Missed!");
							self.imInStarting = false;
							endTime = new Date();
							diffTime = endTime - startTime;
							self.stopMotionRecognizer();
							Ti.App.fireEvent('timeExchange', {
								flag : 999999999,
								acceleration : xAcc
							});
							positionReached = false;
						} else {
							Ti.API.info("Bang!");
							bangSound.play();
							self.imInStarting = false;
							self.stopMotionRecognizer();
							endTime = new Date();
							diffTime = endTime - startTime;
							Ti.App.fireEvent('timeExchange', {
								flag : 0,
								acceleration : xAcc
							});
							positionReached = false;
						}
					} else {
						Ti.API.info("Fault!");
						faultSound.play();
						Ti.App.fireEvent('fault', {});
						userCanFire = false;
						self.imInStarting = false;
						self.stopMotionRecognizer();
						endTime = new Date();
						diffTime = endTime - startTime;
						Ti.App.fireEvent('timeExchange', {
							flag : 88888888,
							acceleration : xAcc
						});
						positionReached = false;
					}
				}
			} else {
				Ti.API.info('im in starting è false');
			}

		} else {
			if (e.error)
				Ti.API.error(e.error);
		}
	}
	
	Ti.App.addEventListener('user_can_fire', function() {
		userCanFire = true;
		shouldListeningForPosition = false;
	});

	return self;
}

function transform(element) {
	return element * 180 / Math.PI;
}

module.exports = Motion;
