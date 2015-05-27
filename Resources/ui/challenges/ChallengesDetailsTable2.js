function ChallengesDetailsTable2() {
	var VeryBigTile = require('ui/customUI/VeryBigTile');
	var bigTile = new VeryBigTile();
	bigTile.initialize('tileTitle', 15, 19);
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 75);
	var MapToSet = require('ui/challenges/MapToSet');
	var mapToSet = new MapToSet();
	var MinusNormalTile = require('ui/customUI/MinusNormalTile');
	var negDateAndTime = new MinusNormalTile();
	var negLocation = new MinusNormalTile();
	var CustomButton = require('ui/customUI/CustomButton');
	var showMapButton = new CustomButton();
	showMapButton.initialize('Mostra mappa', 40, 18);
	var CustomDisabledButton = require('ui/customUI/CustomDisabledButton');
	var negButton = new CustomDisabledButton();
	negButton.initialize('Negozia', 40, 18);
	var acceptButton = new CustomButton();
	acceptButton.initialize('Accetta', 10, 18);
	var Picker = require('ui/challenges/Picker');
	var picker = new Picker();
	var matchID = null;
	var currentDate = null;
	var currentLatitude = null,
	    currentLongitude = null;
	var dateIsChanged = false,
	    positionIsChanged = false;

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

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		backButtonTitle : String.format(L('main:back'), ''),
		tabBarHidden : true
	});

	var container = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});

	var versusLabel = Titanium.UI.createLabel({
		text : '',
		top : 15,
		font : {
			fontSize : 24,
			fontFamily : "Roboto-Light"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var retireButton = Titanium.UI.createButton({
		title : 'Rifiuta richiesta',
		font : {
			fontSize : 21
		},
		color : '#856C64',
		top : 10
	});

	retireButton.addEventListener('click', function() {
		var aDialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Si, ho troppa paura', 'No, voglio duellare'],
			message : 'Sei sicuro di voler rifiutare la richiesta di duello?',
			title : 'Rifiuta Duello'
		});
		aDialog.show();
		aDialog.addEventListener('click', function(e) {
			if (e.index !== e.source.cancel) {
				loader.showLoader(self);
				var request = Ti.Network.createHTTPClient({
					onload : function(e) {
						Ti.API.info("Received text: " + this.responseText);
						var response = JSON.parse(this.responseText);
						Ti.API.info(response.return);
						if (response.return === '0') {
							loader.hideLoader(self);
							Ti.API.info("ok");
							Ti.App.fireEvent('reload', {});
							setTimeout(function() {
								self.close();
							}, 1000);
						} else {
							loader.hideLoader(self);
							alert('Error');
						}
					},
					onerror : function(e) {
						loader.hideLoader(self);
						Ti.API.debug(e.error);
					},
					timeout : 5000
				});
				var dataToSend = {
					id : matchID
				};
				Ti.API.info(JSON.stringify(dataToSend));
				request.open("GET", global.bangServerUrl + '/challenge-rejectChallenge.php?id_challenge=' + JSON.stringify(dataToSend));
				request.send();
			}
		});
	});

	self.initialize = function(data) {
		var challengeDate = data.challenge_date;
		Ti.API.info(challengeDate);
		var firstSplit = challengeDate.split(' ');
		var secondSplit = firstSplit[0].split('-');
		var thirdSplit = firstSplit[1].split(':');
		year = secondSplit[0],
		month = secondSplit[1],
		day = secondSplit[2],
		hours = thirdSplit[0],
		minutes = thirdSplit[1],
		seconds = thirdSplit[2];
		latitude = data.latitude;
		longitude = data.longitude;
		matchID = data.id;
		currentDate = new Date(year, month - 1, day, hours, minutes, seconds);

		bigTile.setTitle(data.title + ' nei paraggi di ' + data.address + ' il giorno ' + day + '-' + month + '-' + year + ' alle ore ' + hours + ':' + minutes);

		negDateAndTime.initialize('Negozia data e/o ora', 35, 18);
		negLocation.initialize('Negozia la posizione', 7, 18);
	};

	acceptButton.addEventListener('click', function() {
		if (!acceptButton.canFire)
			return;
		var aDialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Si, accetto', 'Ci ho ripensato'],
			message : 'Sei sicuro di voler accettare il duello?',
			title : 'Accetta Duello'
		});
		aDialog.show();
		aDialog.addEventListener('click', function(e) {
			if (e.index !== e.source.cancel) {
				loader.showLoader(self);
				var request = Ti.Network.createHTTPClient({
					onload : function(e) {
						Ti.API.info("Received text: " + this.responseText);
						var response = JSON.parse(this.responseText);
						Ti.API.info(response.return);
						if (response.acceptDuels === '0' && response.getChallenge === '0' && response.insertChurchbell === '0') {
							loader.hideLoader(self);
							Ti.API.info("ok");
							Ti.App.fireEvent('reload', {});
							setTimeout(function() {
								self.close();
							}, 1000);
						} else {
							loader.hideLoader(self);
							if (response.acceptDuels === '-1')
								alert('acceptDuels');
							if (response.getChallenge === '-1')
								alert('getChallenge');
							if (response.insertChurchbell === '-1')
								alert('insertChurchbell');
						}
					},
					onerror : function(e) {
						loader.hideLoader(self);
						Ti.API.debug(e.error);
					},
					timeout : 5000
				});
				var dataToSend = {
					id : matchID
				};
				Ti.API.info(JSON.stringify(dataToSend));
				request.open("GET", global.bangServerUrl + '/challenge-acceptChallenge.php?challenge=' + JSON.stringify(dataToSend));
				request.send();
			}
		});
	});

	negDateAndTime.addEventListener('click', function() {
		picker.setDate(currentDate);
		picker.customShow();
	});

	negButton.addEventListener('click', function() {
		if (!negButton.isEnabled)
			return;
		loader.showLoader(self);
		var request = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				var response = JSON.parse(this.responseText);
				Ti.API.info(response.return);
				if (response.return === '0') {
					Ti.API.info("ok");
					Ti.App.fireEvent('reload', {});
					loader.hideLoader(self);
					setTimeout(function() {
						self.close();
					}, 1000);
				} else {
					if (response.acceptDuels === '-1')
						alert('acceptDuels');
					if (response.getChallenge === '-1')
						alert('getChallenge');
					if (response.insertChurchbell === '-1')
						alert('insertChurchbell');
				}
			},
			onerror : function(e) {
				Ti.API.debug(e.error);
			},
			timeout : 5000
		});
		var dataToSend = {
			id : matchID,
			id_player : Ti.App.Properties.getString('fb_id')
		};
		if (positionIsChanged) {
			dataToSend.latitude = currentLatitude;
			dataToSend.longitude = currentLongitude;
		} else {
			dataToSend.latitude = '';
			dataToSend.longitude = '';
		}
		if (dataIsChanged) {
			var text = negDateAndTime.getTitle();
			var splitted = text.split(' ');
			dataToSend.challenge_date = "(" + splitted[2] + "-" + months[splitted[1]] + "-" + splitted[0] + " " + splitted[3] + ":00)";
		} else {
			dataToSend.challenge_date = '';
		}
		Ti.API.info(JSON.stringify(dataToSend));
		request.open("GET", global.bangServerUrl + '/challenge-negotiateChallenge.php?challenge=' + JSON.stringify(dataToSend));
		request.send();
	});

	Ti.App.addEventListener('close_second_picker', function(e) {
		dataIsChanged = true;
		negDateAndTime.setTitle(e.date);
		negButton.enable();
		acceptButton.disable();
	});

	Ti.App.addEventListener('location_choosen', function(e) {
		positionIsChanged = true;
		negLocation.setTitle('Posizione impostata');
		currentLatitude = e.latitude;
		currentLongitude = e.longitude;
		negButton.enable();
		acceptButton.disable();
	});

	negLocation.addEventListener('click', function() {
		mapToSet.open();
	});

	container.add(pageTitle);
	container.add(bigTile);
	container.add(negDateAndTime);
	container.add(negLocation);
	container.add(negButton);
	container.add(acceptButton);
	container.add(retireButton);

	self.add(container);
	self.add(picker);

	return self;

}

module.exports = ChallengesDetailsTable2;
