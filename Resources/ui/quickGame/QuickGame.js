function QuickGame() {

	var Telepathy = require('com.pj');
	var telepathy = null;
	var QuickGameView = require('ui/quickGame/QuickGameView');
	var quickGameView = new QuickGameView();
	var counter = 0;

	var random = Math.floor((Math.random() * 4) + 1);
	
	
	var churchbellSound = ZLSound.createSample({
        media: 'music/churchbell.mp3',
        volume : 1.0
    });
    
    var ticSound = ZLSound.createSample({
        media: 'music/tic.mp3',
        volume : 1.0
    });
	
	var opponentID = 0;

	var self = Titanium.UI.createWindow({
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		tabBarHidden : true,
		modal : true
	});

	var statusLabel = Titanium.UI.createLabel({
		top : '50%',
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
				telepathy.setupSessionAndStartServices(Ti.App.Properties.getString('fb_id'), opponent, 1);
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
				self.add(quickGameFinderView);
				telepathy.sendData('tellme:');
				telepathy.sendData('random:'+random);
			}, 2000);

		});

		telepathy.addEventListener('notConnected', function() {
			telepathy.tryToReconnect(Ti.App.Properties.getString('fb_id'), opponent, 1);
		});

		telepathy.addEventListener('didReceiveData', function(e) {
			var sMessage = (e.message).split(':');
			switch(sMessage[0]) {
			case 'notready':
				telepathy.sendData('tellme:');
				break;
			case 'ready':
				if (quickGameView.flag) {
					telepathy.sendData('start:');
					counter = 3+random;
					ticSound.play();
					startCountdown();
				} else {
					telepathy.sendData('tellme:');
				}
				break;
			}
		});
	};
	
	function startCountdown() {
		setInterval(function() {
			if (counter == 0) {
				//countdown.text = 'BANG!!!';
				Ti.API.info('countdown BANG!');
				ticSound.stop();
				churchbellSound.play();
				Ti.App.fireEvent('user_can_fire',{});
				return;
			} else {
				counter = counter - 1;
				startCountdown();
				//countdown.text = counter;
			}
		}, 1000);
	}

	self.setIDOpponent = function(id) {
		opponentID = id;
	};

	self.addEventListener('open', initQuickGameCallback);

	self.add(statusLabel);

	return self;

}

module.exports = QuickGame;
