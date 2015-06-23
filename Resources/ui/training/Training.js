function Training(){
	
	var TrainingView = require('ui/training/TrainingView');
	var trainingView = new TrainingView();
	var interval = null;
	
	var tmp = null;

	var firstTimeExchange = true;

	var duelTime = 0;

	var random = Math.floor((Math.random() * 4) + 1);
	var counter = 3+random;

	var churchbellSound = ZLSound.createSample({
		media : 'music/bell.mp3',
		volume : 1.0
	});

	var ticSound = ZLSound.createSample({
		media : 'music/tic.mp3',
		volume : 1.0
	});

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.GRAY,
		layout : 'composite',
		tabBarHidden : true,
		modal : true,
		orientationModes : [1]
	});


	var closeButton = Titanium.UI.createButton({
		title : 'Chiudi',
		font : {
			fontSize : 19
		},
		color : '#856C64',
		top : 20,
		right : 15
	});

	var initTrainingCallback = function() {
		trainingView.initialize();
		self.add(trainingView);
	};

	function count() {
		if (counter == 0) {
			//countdown.text = 'BANG!!!';
			Ti.API.info('countdown BANG!');
			ticSound.stop();
			clearInterval(interval);
			setTimeout(function() {
				startTime = new Date();
				churchbellSound.play();
				Ti.App.fireEvent('user_can_fire', {});
			}, 300);
		} else {
			Ti.API.info(counter);
			counter = counter - 1;
			//countdown.text = counter;
		}
	}

	function startCountdown() {
		Ti.API.info('startCountdown function');
		Ti.API.info(counter);
		ticSound.play();
		interval = setInterval(count, 1000);
	}

	self.addEventListener('open', initTrainingCallback);

	closeButton.addEventListener('click', function() {
		self.close();
	});

	Ti.App.addEventListener('timeExchange', function(e) {
		if (!firstTimeExchange)
			return;
		var Calculating = require('ui/training/Calculating');
		var calculating = new Calculating();
		firstTimeExchange = false;
		var tmp = null;
		if (trainingView != null) {
			tmp = trainingView.getMotionObject();
			trainingView.removeEventOnOrientation();
			tmp.stopMotionRecognizer();
			self.remove(trainingView);
		}
		self.add(calculating);

		if (e.flag == 999999999) {
			Ti.API.info('e.flag: ' + e.flag);
			myTime = e.flag;
			var TrainingMissed = require('ui/training/TrainingMissed');
			var trainingMissed = new TrainingMissed(self);
			setTimeout(function() {
				self.remove(calculating);
				self.add(trainingMissed);
				trainingMissed.playSound();
			}, 2500);
		} else if (e.flag == 888888888) {
			clearInterval(interval);
			ticSound.stop();
			myTime = e.flag;
			var TrainingLose = require('ui/training/TrainingLose');
			var trainingLose = new TrainingLose(self);
			setTimeout(function() {
				self.remove(calculating);
				self.add(trainingLose);
				trainingLose.playSound();
			}, 2500);
		} else {
			myTime = diffTime;
			var TrainingWin = require('ui/training/TrainingWin');
			var trainingWin = new TrainingWin(self);
			setTimeout(function() {
				self.remove(calculating);
				self.add(trainingWin);
				trainingWin.playSound();
			}, 2500);
		}
	});

	self.add(closeButton);

	var closingFunction = function() {
		Ti.API.info('closing window...');
		myTime = 0;
		vsTime = 0;
		startTime = 0;
		endTime = 0;
		diffTime = 0;
		counter = 0;
		//quickGameView.deallocModule();
		//quickGameView = null;
		//QuickGameView = null;
	};

	self.addEventListener('close', closingFunction);
	
	Ti.App.addEventListener('start_countdown',function(){
		Ti.API.info('start_countdown called');
		startCountdown();
	});

	return self;
	
}

module.exports = Training;
