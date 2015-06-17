function StartChallengeView() {

	var Picker = require('ui/newChallenge/Picker');
	var challengeController = new Picker();
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 10);
	var NormalTile = require('ui/customUI/NormalTile');
	var whenTile = new NormalTile();
	whenTile.initialize(String.format(L('duels:whenInstruction'), ''), 10, 18);
	var locationTile = new NormalTile();
	locationTile.initialize(String.format(L('duels:whereInstruction'), ''), 10, 18);
	var challengerTile = new NormalTile();
	challengerTile.initialize(String.format(L('duels:challengerInstruction'), ''), 10, 18);
	var CustomButton = require('ui/customUI/CustomButton');
	var sendChallengeButton = new CustomButton();
	var isQuickGame = false;
	var QuickGame = null;
	var quickGame = null;

	var responseDialog = Ti.UI.createAlertDialog({
		//message : 'Il tuo dispositivo sembra non essere connesso ad Internet.',
		ok : 'Okay',
		title : 'Bang!'
	});

	var months = {
		"gennaio" : "01",
		"febbraio" : "02",
		"marzo" : "03",
		"aprile" : "04",
		"maggio" : "05",
		"giugno" : "06",
		"luglio" : "07",
		"agosto" : "08",
		"settembre" : "09",
		"ottobre" : "10",
		"novembre" : "11",
		"dicembre" : "12"
	};

	var currentID = '';
	var latitude,
	    longitude;

	var self = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		top : 60
	});

	var dateLabel = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : String.format(L('duels:chooseWhen'), ''),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var dateSubtitle = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'L\'ora che imposti sarà calcolata con un intorno di 3 minuti prima e dopo la scadenza per permettere più flessibilità ai partecipanti.',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});

	var placeLabel = Titanium.UI.createLabel({
		top : 25,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : String.format(L('duels:chooseWhere'), ''),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var placeSubtitle = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'La posizione che determini sarà calcolata con un raggio di 100 mt rispetto al marker che inserirai sulla mappa.',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});

	var challengerLabel = Titanium.UI.createLabel({
		top : 25,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : String.format(L('duels:chooseChallenger'), ''),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var challengerSubtitle = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'La lista mostrerà i tuoi amici di Facebook che utilizzano Bang! sul proprio dispositivo.',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});

	var opts = {
		cancel : 4,
		options : ['Quick game', 'Tra 10 minuti', 'Tra un\'ora', 'Scegli data', 'Annulla'],
		//destructive : 4,
		title : 'Imposta data'
	};

	var fakeView = Titanium.UI.createView({
		width : 1,
		height : 15,
		backgroundColor : '#F5F4F2'
	});

	var dialog = Ti.UI.createOptionDialog(opts);

	dialog.addEventListener('click', function(e) {
		switch(e.index) {
		case 0:
			isQuickGame = true;
			whenTile.setTitle('Quick Game');
			locationTile.disable();
			break;
		case 1:
			var date = new Date();
			date.setMinutes(date.getMinutes() + 10);
			var hourFormat = date.toLocaleTimeString();
			var hourToShow = hourFormat.split(':');
			whenTile.setTitle(date.toLocaleDateString() + " " + hourToShow[0] + ":" + hourToShow[1]);
			locationTile.enable();
			isQuickGame = false;
			break;
		case 2:
			var date = new Date();
			date.setHours(date.getHours() + 1);
			var hourFormat = date.toLocaleTimeString();
			var hourToShow = hourFormat.split(':');
			whenTile.setTitle(date.toLocaleDateString() + " " + hourToShow[0] + ":" + hourToShow[1]);
			locationTile.enable();
			isQuickGame = false;
			break;
		case 3:
			dialog.hide();
			Ti.App.fireEvent('show_picker', {});
			locationTile.enable();
			isQuickGame = false;
			break;
		}

	});

	whenTile.addEventListener('click', function() {
		dialog.show();
	});

	locationTile.addEventListener('click', function() {
		if (isQuickGame)
			return;
		Ti.App.fireEvent('close_picker', {});
		if (!Titanium.Network.getOnline()) {
			var dialog = Ti.UI.createAlertDialog({
				message : 'Il tuo dispositivo sembra non essere connesso ad Internet.',
				ok : 'Okay',
				title : 'Network'
			});
			dialog.show();
			return;
		}
		var Map = require('ui/newChallenge/Map');
		var map = new Map();
		map.open();
	});

	challengerTile.addEventListener('click', function() {
		Ti.App.fireEvent('close_picker', {});
		if (!Titanium.Network.getOnline()) {
			var dialog = Ti.UI.createAlertDialog({
				message : 'Il tuo dispositivo sembra non essere connesso ad Internet.',
				ok : 'Okay',
				title : 'Network'
			});
			dialog.show();
			return;
		}
		var FacebookFriends = require('ui/newChallenge/FacebookFriends');
		var facebookFriends = new FacebookFriends();
		facebookFriends.open();
	});

	sendChallengeButton.initialize('Conferma', 40);

	self.getDateFromPicker = function(date) {
		whenTile.setTitle(date);
	};

	sendChallengeButton.addEventListener('click', function() {
		var dialog = Ti.UI.createAlertDialog({
			title : 'Crea Duello',
			message : 'Per inserire un duello, devi inserire tutte le informazioni!',
			ok : 'Ho capito'
		});

		if (whenTile.getTitle() === String.format(L('duels:whenInstruction'), '')) {
			dialog.show();
			return;
		}

		if (isQuickGame) {
			QuickGame = require('ui/quickGame/QuickGame');
			quickGame = new QuickGame();
			quickGame.setIDOpponent(currentID);
			Ti.API.info(currentID);
			quickGame.open({
				modal : true,
				modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
				modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
			});
		} else {
			loader.showLoader(self);
			var text = whenTile.getTitle();
			var splitted = text.split(' ');
			var request = Ti.Network.createHTTPClient({
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					var response = JSON.parse(this.responseText);
					loader.hideLoader(self);
					if (response.return == 0) {
						responseDialog.message = 'Duello registrato!';
						var time = splitted[3].split(':');
						Ti.API.info(time);
						var hh = time[0];
						Ti.API.info(hh);
						var minutes = time[1];
						minutes = minutes - 5;
						var month = months[splitted[1]];
						var date = new Date(splitted[2], month - 1, splitted[0], hh, minutes, 0, 0);
						//response.last_id
						Ti.App.iOS.scheduleLocalNotification({
							alertBody : 'Un nuovo duello ti aspetta!',
							badge : 1,
							sound : 'music/notification.mp3',
							userInfo : {
								"id" : response.last_id
							},
							date : date,
							category : 'DUEL',
							timezone : 'CET'
						});
						Ti.API.info(date.toLocaleString());
						responseDialog.show();
						Ti.App.fireEvent('back', {});
					} else if (response.return == -2) {
						responseDialog.message = "Inserisci un orario che sia superiore di 15 minuti rispetto all\'ultimo inserito!";
						responseDialog.show();
					} else {
						responseDialog.message = "Pare ci sia stato un problema. Riprova!";
						responseDialog.show();
					}
				},
				onerror : function(e) {
					Ti.API.debug(e.error);
					loader.hideLoader(self);
				},
				timeout : 5000
			});

			var dataToSend = {
				player_one : Ti.App.Properties.getString('fb_id'),
				player_two : currentID,
				latitude : latitude,
				longitude : longitude,
				challenge_date : "(" + splitted[2] + "-" + months[splitted[1]] + "-" + splitted[0] + " " + splitted[3] + ":00)"
			};
			Ti.API.info(JSON.stringify(dataToSend));
			request.open("GET", global.bangServerUrl + '/challenge-registerChallenge.php?challenge=' + JSON.stringify(dataToSend));
			request.send();
		}

	});

	Ti.App.addEventListener('friend_choosen', function(e) {
		challengerTile.setTitle(e.who);
		currentID = e.id;
	});

	Ti.App.addEventListener('location_choosen', function(e) {
		locationTile.setTitle('Posizione impostata');
		latitude = e.latitude + "";
		longitude = e.longitude + "";
	});

	Ti.App.addEventListener('reloadMasterView', function() {
		QuickGame = null;
		quickGame = null;
		loader.reloadAnimation();
		var QuickGame = require('ui/quickGame/QuickGame');
		var quickGame = new QuickGame();
		quickGame.setIDOpponent(currentID);
		Ti.API.info(currentID);
		quickGame.open({
			modal : true,
			modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
			modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
	});

	self.add(pageTitle);
	self.add(dateLabel);
	self.add(whenTile);
	self.add(dateSubtitle);
	self.add(placeLabel);
	self.add(locationTile);
	self.add(placeSubtitle);
	self.add(challengerLabel);
	self.add(challengerTile);
	self.add(challengerSubtitle);
	self.add(sendChallengeButton);
	self.add(fakeView);
	//self.add(challengeController);

	return self;
}

module.exports = StartChallengeView;
