var countdownLabel;
var timespan;
var year,
    month,
    day,
    hours,
    minutes,
    seconds,
    latitude,
    longitude,
    player_one,
    player_two,
    matchID;
function ChallengesDetailsTable1() {

	var Countdown = require('core/Countdown');
	var _master = -1;

	var BigTile = require('ui/customUI/BigTile');
	var bigTile = new BigTile();
	bigTile.initialize('tileTitle', 15, 19);
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 75);
	var CustomDisabledButton = require('ui/customUI/CustomDisabledButton');
	var customDisabledButton = new CustomDisabledButton();
	customDisabledButton.initialize('Inzia', 35, 18);
	var CustomButton = require('ui/customUI/CustomButton');
	var showMapButton = new CustomButton();
	showMapButton.initialize('Mostra mappa', 10, 18);

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

	var startLabel = Titanium.UI.createLabel({
		text : 'Tieniti pronto in',
		top : 25,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	countdownLabel = Titanium.UI.createLabel({
		text : 'Countdown',
		top : 15,
		font : {
			fontSize : 80,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});

	var countdownInstructions = Titanium.UI.createLabel({
		//text : 'ore : minuti : secondi',
		text : 'Calcolo...',
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var retireButton = Titanium.UI.createButton({
		title : 'Ritirati',
		font : {
			fontSize : 21
		},
		color : '#856C64',
		top : 10
	});

	retireButton.addEventListener('click', function() {
		var aDialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Si, sono codardo', 'Ci ho ripensato'],
			message : 'Sei sicuro di volerti ritirare?',
			title : 'Ritirati'
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
							alert("Error");
						}
					},
					onerror : function(e) {
						loader.hideLoader(self);
						Ti.API.debug(e.error);
					},
					timeout : 5000
				});
				var dataToSend = {
					id : matchID,
					id_player : Ti.App.Properties.getString('fb_id')
				};
				Ti.API.info(JSON.stringify(dataToSend));
				request.open("GET", global.bangServerUrl + '/challenge-retiredChallenge.php?challenge=' + JSON.stringify(dataToSend));
				request.send();
			}
		});
	});

	self.initialize = function(data) {
		bigTile.setTitle(data.title + ' nei paraggi di ' + data.address);
		var challengeDate = data.challenge_date;
		Ti.API.info(data.player_one);
		if (Ti.App.Properties.getString('fb_id') === data.player_one) {
			//sono il master, uso QuickGameView
			player_one = data.player_one;
			player_two = data.player_two;
			_master = 1;
		} else {
			//sono lo slave uso QuickGameFinder
			player_one = data.player_two;
			player_two = data.player_one;
			_master = 0;
		}
		Ti.API.info(challengeDate);
		//2015-05-16 13:31:00 year, month, day, hours, minutes, seconds
		//startCountdown();
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

		setInterval(function() {
			timespan = Countdown(null, new Date(year, month - 1, day, hours, minutes, seconds), Countdown.DEFAULTS, 0, 20);
			//Ti.API.info(timespan.days + ", "+timespan.hours+", "+timespan.minutes+", "+Math.floor(timespan.seconds));
			if (timespan.months > 0) {
				if (timespan.months == 1) {
					countdownLabel.text = timespan.months + " mese";
					countdownInstructions.text = '';
				} else {
					countdownLabel.text = timespan.months + " mesi";
					countdownInstructions.text = '';
				}
			} else if (timespan.days > 0) {
				if (timespan.days == 1) {
					countdownLabel.text = timespan.days + " giorno";
					countdownInstructions.text = '';
				} else {
					countdownLabel.text = timespan.days + " giorni";
					countdownInstructions.text = '';
				}
			} else {
				countdownLabel.text = timespan.hours + ":" + timespan.minutes + ":" + Math.floor(timespan.seconds);
				countdownInstructions.text = 'ore:minuti:secondi';
				if (timespan.hours == 0 && timespan.minutes <= 10) {
					//abilita il bottone inizia
					customDisabledButton.enable();
				}
			}
		}, 1000);
		//startCountdown();
		//countIt();
	};

	customDisabledButton.addEventListener('click', function() {
		if (!customDisabledButton.isEnabled)
			return;
		if (master) {
			var Master = require('ui/challenges/Master');
			var master = new Master();
			master.setIDOpponent(player_two);
			master.open({
				modal : true,
				modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
				modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
			});
		}else{
			var Slave = require('ui/challenges/Slave');
			var slave = new Slave();
			slave.setMasterID(player_one);
			slave.open({
				modal : true,
				modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
				modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
			});
		}
	});

	self.addEventListener('close', function() {
		clear();
	});

	showMapButton.addEventListener('click', function() {
		var Map = require('ui/challenges/Map');
		new Map(latitude, longitude).open();
	});

	container.add(pageTitle);
	//container.add(versusLabel);
	container.add(bigTile);
	container.add(startLabel);
	container.add(countdownLabel);
	container.add(countdownInstructions);
	container.add(customDisabledButton);
	container.add(showMapButton);
	container.add(retireButton);
	self.add(container);

	return self;

}

module.exports = ChallengesDetailsTable1;

function startCountdown() {

}

function clear() {
	clearInterval(timespan);
}
