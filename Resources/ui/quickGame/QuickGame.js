function QuickGame() {

	var Telepathy = null;
	var telepathy = null;
	var telepathyStartedServices = false;
	var QuickGameView = require('ui/quickGame/QuickGameView');
	var quickGameView = new QuickGameView();
	var counter = 0;
	var interval = null;
	var Calculating = null;
	var calculating = null;
	amITheMaster = 1;

	var Loader = require('ui/customUI/Loader');
	var load = new Loader();

	var firstTimeExchange = true;

	var duelTime = 0;

	var myAcceleration = 0;
	var vsAcceleration = 0;

	var idWinner = 0;

	var random = Math.floor((Math.random() * 4) + 1);

	var churchbellSound = ZLSound.createSample({
		media : 'music/bell.mp3',
		volume : 1.0
	});

	var ticSound = ZLSound.createSample({
		media : 'music/tic.mp3',
		volume : 1.0
	});

	var opponentID = 0;

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
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Cerco l\'avversario...',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});

	//loader.showLoader(self);

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

	var initQuickGameCallback = function() {
		Ti.API.info('initQuickGameCallback');
		Ti.API.info('Telepathy is null');
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
				statusLabel.text = 'Ricerco l\'avversario...';
				Ti.API.info(opponentID);
				telepathy.setupSessionAndStartServices(Ti.App.Properties.getString('fb_id'), opponentID, 1);
				telepathyStartedServices = true;
				break;
			}
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
				Ti.API.info('calling initialize from setTimeout');
				quickGameView.initialize();
				self.add(quickGameView);
				try {
					telepathy.sendData('tellme:');
				} catch(ex) {
					Ti.API.info('Telepathy tell me in connected event listener');
				}
				try {
					telepathy.sendData('random:' + random);
				} catch(ex) {
					Ti.API.info('Telepathy random in connected event listener');
				}

			}, 2000);

		});

		telepathy.addEventListener('notConnected', function() {
			telepathy.tryToReconnect(Ti.App.Properties.getString('fb_id'), opponentID, 1);
		});

		telepathy.addEventListener('didReceiveData', function(e) {
			var sMessage = (e.message).split(':');
			Ti.API.info("[INFO] RECEIVED MESSAGE : " + sMessage[0]);
			switch(sMessage[0]) {
			case 'notready':
				try {
					telepathy.sendData('tellme:');
				} catch(ex) {
					Ti.API.info('Telepathy tell me in didreceivedata');
				}
				break;
			case 'ready':
				Ti.API.info('Can I send Start packet? ' + quickGameView.canISendStartPacket());
				if (quickGameView.canISendStartPacket()) {
					try {
						telepathy.sendData('start:');
					} catch(ex) {
						Ti.API.info('Telepathy start in case ready in didreceivedata');
					}
					counter = 3 + random;
					//setTimeout(function() {
					ticSound.play();
					startCountdown();
					//}, 100);
				} else {
					try {
						telepathy.sendData('tellme:');
					} catch(ex) {
						Ti.API.info('Telepathy tellme in case ready in didreceivedata');
					}
				}
				break;
			case 'calculate':
				vsTime = sMessage[1];
				Ti.API.info('vs time is ' + vsTime);
				if (myTime < vsTime) {
					try {
						telepathy.sendData('youLoose:');
					} catch(ex) {
						Ti.API.info('Telepathy youloose in calculate in didreceivedata');
					}
					var Win = require('ui/winlose/Win');
					var win = new Win(self);
					idWinner = Ti.App.Properties.getString('fb_id');
					sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
					setTimeout(function() {
						telepathy.stopServices();
						self.remove(calculating);
						self.add(win);
						win.playSound();
					}, 2500);
				} else if (myTime > vsTime) {
					try {
						telepathy.sendData('youWin:');
					} catch(ex) {
						Ti.API.info('Telepathy youwin in calculate in didreceivedata');
					}
					var Lose = require('ui/winlose/Lose');
					var lose = new Lose(self);
					idWinner = opponentID;
					sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
					setTimeout(function() {
						telepathy.stopServices();
						self.remove(calculating);
						self.add(lose);
						lose.playSound();
					}, 2500);
				} else {
					try {
						telepathy.sendData('youLoose:');
					} catch(ex) {
						Ti.API.info('Telepathy youloose in calculate in didreceivedata 2');
					}
					var Lose = require('ui/winlose/Lose');
					var lose = new Lose(self);
					idWinner = opponentID;
					sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
					setTimeout(function() {
						telepathy.stopServices();
						self.remove(calculating);
						self.add(lose);
						lose.playSound();
					}, 2500);
				}
				break;
			case 'times':
				vsTime = sMessage[1];
				if (vsTime == 888888888) {
					clearInterval(interval);
					ticSound.stop();
					Calculating = require('ui/winlose/Calculating');
					calculating = new Calculating();
					var tmp = null;
					if (quickGameView != null) {
						tmp = quickGameView.getMotionObject();
						quickGameView.removeEventOnOrientation();
						tmp.stopMotionRecognizer();
						self.remove(quickGameView);
					}
					self.add(calculating);
					var Win = require('ui/winlose/Win');
					var win = new Win(self);
					win.setLabelText('Hai vinto! Il tuo avversario ha sparato per primo. Avrà mica voluto barare?');
					idWinner = Ti.App.Properties.getString('fb_id');
					sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
					setTimeout(function() {
						self.remove(calculating);
						self.add(win);
						win.playSound();
					}, 2500);
				} else if (myTime != 0) {
					if (myTime == vsTime) {
						try {
							telepathy.sendData('draw:');
						} catch(ex) {
							Ti.API.info('Telepathy youloose in calculate in didreceivedata 3');
						}
						var Lose = require('ui/winlose/Lose');
						var lose = new Lose(self);
						lose.setLabelText('Avete perso entrambi...Impara bene gringo, rischi la pelle nel vecchio west!');
						idWinner = opponentID;
						sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
						setTimeout(function() {
							telepathy.stopServices();
							self.remove(calculating);
							self.add(lose);
							lose.playSound();
						}, 2500);
					} else if (myTime < vsTime) {
						try {
							telepathy.sendData('youLoose:');
						} catch(ex) {
							Ti.API.info('Telepathy youloose in calculate in didreceivedata 3');
						}
						var Win = require('ui/winlose/Win');
						var win = new Win(self);
						win.setLabelText('Hai vinto. Il tuo tempo è ' + myTime + 'ms e il tempo dell\'avversario è ' + vsTime);
						idWinner = Ti.App.Properties.getString('fb_id');
						sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
						setTimeout(function() {
							telepathy.stopServices();
							self.remove(calculating);
							self.add(win);
							win.playSound();
						}, 2500);
					} else {
						try {
							telepathy.sendData('youWin:');
						} catch(ex) {
							Ti.API.info('Telepathy youwin in calculate in didreceivedata 2');
						}
						var Lose = require('ui/winlose/Lose');
						var lose = new Lose(self);
						lose.setLabelText('Hai perso. Il tuo tempo è ' + myTime + 'ms e il tempo dell\'avversario è ' + vsTime);
						idWinner = opponentID;
						sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration);
						setTimeout(function() {
							telepathy.stopServices();
							self.remove(calculating);
							self.add(lose);
							lose.playSound();
						}, 2500);
					}
				}
				break;
			case 'acceleration':
				vsAcceleration = sMessage[1];
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


	self.setIDOpponent = function(id) {
		Ti.API.info('Opponent ID is ' + id);
		opponentID = id;
	};

	self.addEventListener('open', initQuickGameCallback);

	closeButton.addEventListener('click', function() {
		self.close();
	});

	Ti.App.addEventListener('timeExchange', function(e) {
		if (!firstTimeExchange)
			return;
		firstTimeExchange = false;
		Calculating = require('ui/winlose/Calculating');
		calculating = new Calculating();
		var tmp = null;
		if (quickGameView != null) {
			tmp = quickGameView.getMotionObject();
			quickGameView.removeEventOnOrientation();
			tmp.stopMotionRecognizer();
			self.remove(quickGameView);
		}
		self.add(calculating);

		if (e.flag == 999999999) {
			Ti.API.info('e.flag: ' + e.flag);
			myTime = e.flag;
			try {
				telepathy.sendData('times:' + e.flag);
			} catch(ex) {
				Ti.API.info('Telepathy times in timeExchange');
			}
		} else if (e.flag == 888888888) {
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
			Ti.API.info('myTime not parsed ' + myTime);
			Ti.API.info('myTime parsed ' + parseFloat(myTime));
			try {
				telepathy.sendData('times:' + diffTime);
			} catch(ex) {
				Ti.API.info('Telepathy times in timeExchange else');
			}
		}
	});

	self.add(statusLabel);
	self.add(closeButton);
	self.add(load);
	load.showLoader(self);

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
		quickGameView.deallocModule();
		quickGameView = null;
		QuickGameView = null;
	};

	self.addEventListener('close', closingFunction);
	
	Ti.App.addEventListener('resume', function(e) {
		Ti.API.info('resumed');
		//chamber.animate();
		load.hideLoader(self);
		load.showLoader(self);
	});

	return self;

}

function sendDataToServer(opponentID, idWinner, random, myTime, vsTime, myAcceleration, vsAcceleration) {
	var request = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			var response = JSON.parse(this.responseText);
			if (response.return == 0) {
				Ti.API.info('duello registrato');
			} else if (response.return == -1) {
				Ti.API.info('duello NON registrato');
			}
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000
	});

	var dataToSend = {
		player_one : Ti.App.Properties.getString('fb_id'),
		player_two : opponentID,
		id_winner : idWinner,
		status : 0,
		round_time : random,
		acceleration1 : myAcceleration,
		acceleration2 : vsAcceleration,
		diff_timestamp1 : myTime,
		diff_timestamp2 : vsTime
	};

	if (myTime == 999999999)
		dataToSend.num_faults1 = 1;
	else
		dataToSend.num_faults1 = 0;

	if (vsTime == 999999999)
		dataToSend.num_faults2 = 1;
	else
		dataToSend.num_faults2 = 0;

	Ti.API.info(JSON.stringify(dataToSend));
	request.open("GET", global.bangServerUrl + '/challenge-quickgameChallenge.php?challenge=' + JSON.stringify(dataToSend));
	request.send();
}

module.exports = QuickGame;
