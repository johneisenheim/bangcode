function QuickGame() {

	var Telepathy = require('com.pj');
	var telepathy = null;
	var QuickGameView = require('ui/quickGame/QuickGameView');
	var quickGameView = new QuickGameView();
	var counter = 0;
	var interval = null;

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

	loader.showLoader(self);

	var initQuickGameCallback = function() {
		Ti.API.info('initQuickGameCallback');
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
				self.add(quickGameView);
				telepathy.sendData('tellme:');
				telepathy.sendData('random:' + random);
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
				telepathy.sendData('tellme:');
				break;
			case 'ready':
				Ti.API.info('Can I send Start packet? '+quickGameView.canISendStartPacket());
				if (quickGameView.canISendStartPacket()) {
					telepathy.sendData('start:');
					counter = 3 + random;
					//setTimeout(function() {
						ticSound.play();
						startCountdown();
					//}, 100);
				} else {
					telepathy.sendData('tellme:');
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
			//setTimeout(function() {
			churchbellSound.play();
			Ti.App.fireEvent('user_can_fire', {});
			clearInterval(interval);
			//},300);
		} else {
			Ti.API.info(counter);
			counter = counter - 1;
			//countdown.text = counter;
		}
	}

	function startCountdown() {
		interval = setInterval(function() {
			Ti.API.info('called startCountdown');
			count();
		}, 1000);
	}


	self.setIDOpponent = function(id) {
		Ti.API.info('Opponent ID is ' + id);
		opponentID = id;
	};

	self.addEventListener('open', initQuickGameCallback);

	self.add(statusLabel);

	return self;

}

module.exports = QuickGame;
