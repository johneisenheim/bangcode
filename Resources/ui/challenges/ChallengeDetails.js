var countdownLabel;
function ChallengesDetails() {

	var BigTile = require('ui/customUI/BigTile');
	var bigTile = new BigTile();
	bigTile.initialize('tileTitle', 15, 19);
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 75);
	var CustomDisabledButton = require('ui/customUI/CustomDisabledButton');
	var customDisabledButton = new CustomDisabledButton();
	customDisabledButton.initialize('Inzia', 50, 18);
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
		text : 'Sfida contro Carboma',
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
		top : 25,
		font : {
			fontSize : 80,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});
	
	var countdownInstructions = Titanium.UI.createLabel({
		text : 'ore : minuti : secondi',
		top : 5,
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var retireButton = Titanium.UI.createButton({
		title: 'Ritirati',
		font : {
			fontSize: 21
		},
		color:'#856C64',
		top : 10
	});

	self.initialize = function(data) {
		startCountdown();
	};

	container.add(pageTitle);
	container.add(versusLabel);
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

module.exports = ChallengesDetails;

function countdown() {
	var year = 2015;
	var month = 4;
	var day = 8;
	var hours = 14;
	var minutes = 00;
	var seconds = 00;

	setTimeout(function() {
		var endDate = new Date(year, (month - 1), day, hours, minutes, seconds, 00);
		var thisDate = new Date();
		var thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds(), 00, 00);

		var daysLeft = parseInt((endDate - thisDate) / 86400000);
		var hoursLeft = parseInt((endDate - thisDate) / 3600000);
		var minutesLeft = parseInt((endDate - thisDate) / 60000);
		var secondsLeft = parseInt((endDate - thisDate) / 1000);

		seconds = minutesLeft * 60;
		seconds = secondsLeft - seconds;

		minutes = hoursLeft * 60;
		minutes = minutesLeft - minutes;

		hours = daysLeft * 24;
		hours = (hoursLeft - hours) < 0 ? 0 : hoursLeft - hours;

		days = daysLeft;
		
		if( days > 0 ){
			countdownLabel.font.fontSize = 100;
			countdownLabel.text = days + " giorni";
		}else{
			countdownLabel.font.fontSize = 100;
			countdownLabel.text = hours +":"+minutes+":"+seconds;
		}
		startCountdown();
	}, 1000);
}

function startCountdown(){
	countdown();
}
