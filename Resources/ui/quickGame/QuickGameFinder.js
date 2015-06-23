function QuickGameFinder() {

	var Telepathy = null;
	var telepathy = null;

	var status = 'notready';
	var vsStatus = 'notready';
	var random = 0;
	var counter = 0;
	var interval = null;
	amITheMaster = 0;

	var telepathyStartedServices = false;

	var QuickGameFinderView = require('ui/quickGame/QuickGameFinderView');
	var quickGameFinderView = new QuickGameFinderView();
	var Calculating = null;
	var calculating = null;

	var firstTimeExchange = true;

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

	var statusLabel = Titanium.UI.createLabel({
		top : '55%',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Controllo Bluetooth...',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
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

	var dialog = Ti.UI.createAlertDialog({
		//message : 'Il tuo dispositivo sembra non essere connesso ad Internet.',
		ok : 'Okay',
		title : 'Bang!'
	});

	loader.showLoader(self);

	var initQuickGameCallback = function() {
		Telepathy = require('com.pj');
		telepathy = Telepathy.createSession();
		var bluetoothState = telepathy.checkBluetoothAccess();
		telepathy.addEventListener('bluetoothState', function(e) {
			switch(e.state) {
			case 'The connection with the system service was momentarily lost, update imminent.' || 'State unknown, update imminent.':
				break;
			case 'The platform doesn\'t support Bluetooth Low Energy.':
				dialog.message = 'Il tuo dispositivo non supporta il bluetooth 4.0. Bang! non può funzionare su questi dispositivi.';
				dialog.show();
				statusLabel.text = 'Bluetooth non supportato.';
				Telepathy = null;
				telepathy = null;
				break;
			case 'The app is not authorized to use Bluetooth Low Energy.':
				dialog.message = 'Non hai autorizzato Bang! a poter utilizzare il bluetooth.';
				dialog.show();
				statusLabel.text = 'Bluetooth non autorizzato.';
				Telepathy = null;
				telepathy = null;
				break;
			case 'Bluetooth is currently powered off.':
				dialog.message = 'Il Bluetooth è spento! Per favore, accedi alle impostazioni e attivalo.';
				dialog.show();
				statusLabel.text = 'Il Bluetooth è spento.';
				break;
			case 'Bluetooth is currently powered on and available to use.':
				statusLabel.text = 'Ricerco la partita...';
				telepathy.setupSessionAndStartServices(Ti.App.Properties.getString('fb_id'), '', 0);
				telepathyStartedServices = true;
				break;
			}
		});

		telepathy.addEventListener('didReceiveInvitationFromPeer', function() {
			statusLabel.text = 'Ho trovato la partita!Preparo il gioco...';
		});

		telepathy.addEventListener('connecting', function() {
			statusLabel.text = 'Connetto allo sfidante...';
		});

		telepathy.addEventListener('connected', function() {
			statusLabel.text = 'Connesso! Iniziamo...';
			//Costruisci UI
			setTimeout(function() {
				loader.hideLoader(self);
				self.remove(statusLabel);
				quickGameFinderView.initialize();
				self.add(quickGameFinderView);
			}, 2000);

		});

		telepathy.addEventListener('notConnected', function() {
			Ti.API.info('Ho lanciato il notConnected');
		});

		telepathy.addEventListener('didReceiveData', function(e) {
			var sMessage = (e.message).split(':');
			switch(sMessage[0]) {
			case 'tellme':
				if (quickGameFinderView.getMyOwnStatus())
					status = 'ready';
				else
					status = 'notready';
				Ti.API.info('[INFO] Sending ' + status);
				try {
					telepathy.sendData(status + ':');
				} catch(ex) {
					Ti.API.info('Telepathy status in tellme case in didreceivedata');
				}

				break;
			case 'start':
				counter = 3 + parseInt(random);
				Ti.API.info('[INFO] Counter is ' + counter);
				startCountdown();
				ticSound.play();
				break;
			case 'random':
				random = sMessage[1];
				break;
			case 'youWin':
				telepathy.stopServices();
				setTimeout(function() {
					var Win = require('ui/winlose/Win');
					var win = new Win(self);
					win.setLabelText('Hai vinto. Il tuo tempo è ' + myTime + 'ms e il tempo dell\'avversario è ' + vsTime);
					self.remove(calculating);
					self.add(win);
					win.playSound();
				}, 2500);
				//alert("Hai vinto!");
				break;
			case 'youLoose':
				telepathy.stopServices();
				setTimeout(function() {
					var Lose = require('ui/winlose/Lose');
					var lose = new Lose(self);
					if (myTime == 999999999)
						lose.setLabelText('Hai mancato il tuo avversario! Aggiusta la mira, gringo!');
					else
						lose.setLabelText('Hai perso. Il tuo tempo è ' + myTime + 'ms e il tempo dell\'avversario è ' + vsTime);
					self.remove(calculating);
					self.add(lose);
					lose.playSound();
				}, 2500);
				break;
			case 'draw':
				telepathy.stopServices();
				var Lose = require('ui/winlose/Lose');
				var lose = new Lose(self);
				lose.setLabelText('Avete perso entrambi...Impara bene gringo, rischi la pelle nel vecchio west!');
				setTimeout(function() {
					self.remove(calculating);
					self.add(lose);
					lose.playSound();
				}, 2500);
				break;
			case 'times':
				vsTime = sMessage[1];
				if (vsTime == 888888888) {
					clearInterval(interval);
					ticSound.stop();
					Calculating = require('ui/winlose/Calculating');
					calculating = new Calculating();
					var tmp = null;
					if (quickGameFinderView != null) {
						tmp = quickGameFinderView.getMotionObject();
						quickGameFinderView.removeEventOnOrientation();
						tmp.stopMotionRecognizer();
						self.remove(quickGameFinderView);
					}
					self.add(calculating);
					var Win = require('ui/winlose/Win');
					var win = new Win(self);
					win.setLabelText('Hai vinto! Il tuo avversario ha sparato per primo. Avrà mica voluto barare?');
					setTimeout(function() {
						self.remove(calculating);
						self.add(win);
						win.playSound();
					}, 2500);
				} else if (myTime != 0) {
					try {
						telepathy.sendData('calculate:' + myTime);
					} catch(ex) {
						Ti.API.info('calculate in times case in didreceivedata');
					}
				}
				break;
			}
		});
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
		interval = setInterval(count, 1000);
	}


	self.addEventListener('open', initQuickGameCallback);

	closeButton.addEventListener('click', function() {
		self.close();
	});

	Ti.App.addEventListener('timeExchange', function(e) {
		if (!firstTimeExchange)
			return;
		firstTimeExchange = false;
		Ti.API.info('timeExchange');
		try {
			telepathy.sendData('acceleration:' + e.acceleration);
		} catch(ex) {
			Ti.API.info('Telepathy acceleration timeExchange');
		}
		Calculating = require('ui/winlose/Calculating');
		calculating = new Calculating();
		var tmp = null;
		if (quickGameFinderView != null) {
			tmp = quickGameFinderView.getMotionObject();
			quickGameFinderView.removeEventOnOrientation();
			tmp.stopMotionRecognizer();
			self.remove(quickGameFinderView);
		}
		self.add(calculating);

		if (e.flag == 999999999) {
			myTime = e.flag;
			try {
				telepathy.sendData('times:' + e.flag);
			} catch(ex) {
				Ti.API.info('Telepathy times timeExchange');
			}
		} else if (e.flag == 888888888) {
			Ti.API.info('flag is 888888888');
			clearInterval(interval);
			ticSound.stop();
			myTime = e.flag;
			try {
				telepathy.sendData('times:' + e.flag);
			} catch(ex) {
				Ti.API.info('Telepathy times timeExchange');
			}
			var Lose = require('ui/winlose/Lose');
			var lose = new Lose(self);
			lose.setLabelText('Ehi gringo, attento! Hai sparato troppo presto!');
			setTimeout(function() {
				self.remove(calculating);
				self.add(lose);
				lose.playSound();
			}, 2500);
		} else {
			myTime = diffTime;
			try {
				telepathy.sendData('times:' + diffTime);
			} catch(ex) {
				Ti.API.info('Telepathy times timeExchange else');
			}
		}
	});

	self.add(statusLabel);
	self.add(closeButton);

	var closingFunction = function() {
		Ti.API.info('closing window...');
		telepathy.stopServices();
		Telepathy = null;
		telepathy = null;
		myTime = 0;
		vsTime = 0;
		startTime = 0;
		endTime = 0;
		diffTime = 0;
		quickGameFinderView.deallocModule();
		quickGameFinderView = null;
		QuickGameFinderView = null;
	};

	self.addEventListener('close', closingFunction);

	return self;

}

module.exports = QuickGameFinder;
