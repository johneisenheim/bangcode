function Motion() {

	var CoreMotion = require('ti.coremotion');

	var self = {};

	var accelX = accelY = accelZ = 0;
	var lastX = lastY = lastZ = 0;
	var ACCEL_THRESHOLD = 1;
	var SHAKE_THRESHOLD = 1;
	self.imInStarting = false;
	var stopCatchingYaw = false;
	var startCountdown = false;
	var startingYaw = 0;
	var userCanFire = false;
	var timeout = null;
	var shouldListeningForPosition = true;

	/*var bangSound = Ti.Media.createSound({
	 url : "music/colt_shot.mp3",
	 looping : false,
	 volume : 1
	 });*/

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
			CoreMotion.setDeviceMotionUpdateInterval(200);
			var frames = CoreMotion.availableAttitudeReferenceFrames();
			var ref_frame = CoreMotion.ATTITUDE_REFERENCE_FRAME_X_ARBITRARY_CORRECTED_Z_VERTICAL;
			if (frames & ref_frame) {
				// Use the True North Frame if available
				Ti.API.info('REFERENCE FRAME: True North');
				CoreMotion.startDeviceMotionUpdatesUsingReferenceFrame({
					referenceFrame : ref_frame
				}, updateMotionData);
			} else if ( ref_frame = CoreMotion.getAttitudeReferenceFrame()) {
				// Use the default frame if it exists
				Ti.API.info('REFERENCE FRAME: Default ' + ref_frame);
				CoreMotion.startDeviceMotionUpdatesUsingReferenceFrame({
					referenceFrame : ref_frame
				}, updateMotionData);
			} else {
				// Do not use a reference frame
				Ti.API.info('REFERENCE FRAME: None');
				CoreMotion.startDeviceMotionUpdates(updateMotionData);
			}
		}
	};

	self.stopMotionRecognizer = function() {
		CoreMotion.stopDeviceMotionUpdates();
		Ti.API.info('Motion updates stop');
	};

	function updateMotionData(e) {
		if (e.success) {
			var userAcceleration = e.userAcceleration;
			if (Math.abs(lastX - userAcceleration.x) > ACCEL_THRESHOLD) {
				accelX++;
			}
			if (Math.abs(lastY - userAcceleration.y) > ACCEL_THRESHOLD) {
				accelY++;
			}
			if (Math.abs(lastZ - userAcceleration.z) > ACCEL_THRESHOLD) {
				accelZ++;
			}
			analyzeResults();
			lastX = userAcceleration.x;
			lastY = userAcceleration.y;
			lastZ = userAcceleration.z;

			var data = e.attitude;

			if (shouldListeningForPosition) {
				//if (!self.imInStarting) {
				if ((data.pitch >= -2.25 && data.pitch < -0.25) && (data.roll >= 0.9 && data.roll < 2.5)) {
					Ti.API.info("Starting position!");
					//self.imInStarting = true;
					Ti.App.fireEvent('position', {
						what : true
					});
					//userCanFire = true;
					//da cancellare perché determina la fine del countdown
				} else {
					Ti.API.info("No starting position");
					//self.imInStarting = false;
					Ti.App.fireEvent('position', {
						what : false
					});
				}
			}

			if (self.imInStarting) {
				//Ti.API.info('sono in starting e la variabile è ' + userCanFire);
				if ((data.pitch >= -0.4 && data.pitch < 0.4 ) && (data.roll >= 1.2 && data.roll < 1.7)) {
					//if (data.yaw >= (startingYaw - 0.5) && data.yaw < (startingYaw + 0.5)) {
					//if (data.yaw >= (startingYaw - 0.3) && data.yaw < (startingYaw + 0.8)) {
					if ((data.yaw) >= 0.80 && (data.yaw) < 1.50) {
						Ti.API.info('Here I am ' + data.yaw + ' beetwen :' + startingYaw - 0.3 + ' ' + startingYaw + 0.8);
						if (userCanFire) {
							Ti.API.info("Bang!");
							bangSound.play();
							Ti.API.info("ACCELERAZIONE: " + lastX + ' ' + lastY + ' ' + lastZ);
							Ti.API.info(data.yaw + " con yaw di riferimento " + startingYaw + " e differenza " + (startingYaw - 0.3) + ' ' + (startingYaw + 0.8));
							self.imInStarting = false;
							stopCatchingYaw = false;
							self.stopMotionRecognizer();
							endTime = new Date();
							diffTime = endTime - startTime;
							Ti.API.info('Tempo inizio: '+startTime+'; tempo fine: '+endTime+'; diff: '+diffTime);
							Ti.App.fireEvent('timeExchange', {flag: 0, acceleration: lastY});
						} else {
							Ti.API.info("Fault!");
							faultSound.play();
							Ti.App.fireEvent('fault', {});
							userCanFire = false;
							self.imInStarting = false;
							stopCatchingYaw = false;
							Ti.API.info(data.yaw + " con yaw di riferimento " + startingYaw + " e differenza " + (startingYaw - 0.3) + ' ' + (startingYaw + 0.8));
							self.stopMotionRecognizer();
							endTime = new Date();
							diffTime = endTime - startTime;
							Ti.API.info('Tempo inizio: '+startTime+'; tempo fine: '+endTime+'; diff: '+diffTime);
							Ti.App.fireEvent('timeExchange', {flag:88888888,acceleration: lastY});
						}
					} else {
						missSound.play();
						Ti.API.info("Missed!");
						self.imInStarting = false;
						stopCatchingYaw = false;
						Ti.API.info(data.yaw + " con yaw di riferimento " + startingYaw + " e differenza " + (startingYaw - 0.3) + ' ' + (startingYaw + 0.8));
						endTime = new Date();
						diffTime = endTime - startTime;
						Ti.API.info('Tempo inizio: '+startTime+'; tempo fine: '+endTime+'; diff: '+diffTime);
						self.stopMotionRecognizer();
						Ti.App.fireEvent('timeExchange', {flag:999999999,acceleration: lastY});
					}
					//self.imInStarting = false;
				}
			} else {
				Ti.API.info('im in starting è false');
			}

			if (!stopCatchingYaw)
				startingYaw = data.yaw;
		} else {
			if (e.error)
				Ti.API.error(e.error);
		}
	}

	function analyzeResults() {
		if (accelX > SHAKE_THRESHOLD || accelY > SHAKE_THRESHOLD || accelZ > SHAKE_THRESHOLD) {
			var err = SHAKE_THRESHOLD * 1;
			if (accelX > SHAKE_THRESHOLD && accelY > SHAKE_THRESHOLD) {
				Ti.API.info("Quit shaking me back and forth!");
				Ti.API.info(accelZ);
			} else if (accelX > SHAKE_THRESHOLD && accelZ > SHAKE_THRESHOLD) {
				Ti.API.info("Quit shaking me up and down!");
			} else if (accelZ > SHAKE_THRESHOLD && accelY > SHAKE_THRESHOLD) {
				Ti.API.info("Why are you shaking me like that?!");
			} else {
				//Ti.API.info("Quit shaking me!");
			}
			accelX = accelY = accelZ = 0;
		}
	}


	Ti.App.addEventListener('user_can_fire', function() {
		userCanFire = true;
		shouldListeningForPosition = false;
	});

	return self;
}

module.exports = Motion;
