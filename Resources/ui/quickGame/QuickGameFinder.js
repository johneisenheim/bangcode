function QuickGameFinder() {

	var Telepathy = null;
	var telepathy = null;

	var status = 'notready';
	var vsStatus = 'notready';
	
	var QuickGameFinderView = require('ui/quickGame/QuickGameFinderView');
	var quickGameFinderView = new QuickGameFinderView();

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

	/*loader.showLoader(self);

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
		});

		telepathy.addEventListener('notConnected', function() {
			Ti.API.info('Ho lanciato il notConnected');
		});

		telepathy.addEventListener('didReceiveData', function(e) {
			switch(e.message) {
			case 'tellme':
				telepathy.sendData(status);
				break;
			case 'start':
				interval = setInterval(function() {
					if (counter == 0) {
						//countdown.text = 'BANG!!!';
						clearInterval(interval);
					} else {
						counter = counter - 1;
						//countdown.text = counter;
					}
				}, 1000);
				break;
			}
		});
	};

	self.addEventListener('open', initQuickGameCallback);*/

	closeButton.addEventListener('click', function() {
		Telepathy = null;
		telepathy = null;
		self.close();
	});
	
	self.add(quickGameFinderView);

	//self.add(statusLabel);
	//self.add(closeButton);

	return self;

}

module.exports = QuickGameFinder;
