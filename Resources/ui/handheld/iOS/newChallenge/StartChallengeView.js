function StartChallengeView() {

	var Picker = require('ui/handheld/iOS/newChallenge/Picker');
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

	var self = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		top:65
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

	var opts = {
		cancel : 3,
		options : ['Tra 10 minuti', 'Tra un\'ora', 'Scegli data', 'Annulla'],
		destructive : 3,
		title : 'Imposta data'
	};

	var dialog = Ti.UI.createOptionDialog(opts);

	dialog.addEventListener('click', function(e) {
		switch(e.index) {
		case 0:
			var date = new Date();
			date.setMinutes(date.getMinutes() + 10);
			var hourFormat = date.toLocaleTimeString();
			var hourToShow = hourFormat.split(':');
			whenTile.setTitle(date.toLocaleDateString() + " " + hourToShow[0] + ":" + hourToShow[1]);
			break;
		case 1:
			var date = new Date();
			date.setHours(date.getHours() + 1);
			var hourFormat = date.toLocaleTimeString();
			var hourToShow = hourFormat.split(':');
			whenTile.setTitle(date.toLocaleDateString() + " " + hourToShow[0] + ":" + hourToShow[1]);
			break;
		case 2:
			dialog.hide();
			Ti.App.fireEvent('show_picker', {});
			break;
		}

	});

	whenTile.addEventListener('click', function() {
		dialog.show();
	});

	locationTile.addEventListener('click', function() {
		Ti.App.fireEvent('close_picker', {});
		var Map = require('ui/handheld/iOS/newChallenge/Map');
		var map = new Map();
		map.open();
	});

	challengerTile.addEventListener('click', function() {
		Ti.App.fireEvent('close_picker', {});
		var FacebookFriends = require('ui/handheld/iOS/newChallenge/FacebookFriends');
		var facebookFriends = new FacebookFriends();
		facebookFriends.open();
	});

	sendChallengeButton.initialize('Conferma', 50);
	
	self.getDateFromPicker = function(date){
		whenTile.setTitle(date);
	};

	self.add(pageTitle);
	self.add(dateLabel);
	self.add(whenTile);
	self.add(placeLabel);
	self.add(locationTile);
	self.add(challengerLabel);
	self.add(challengerTile);
	self.add(sendChallengeButton);
	//self.add(challengeController);

	return self;
}

module.exports = StartChallengeView;
