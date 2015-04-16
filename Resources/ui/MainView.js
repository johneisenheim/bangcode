function MainView() {

	var NormalTile = require('ui/customUI/NormalTile');
	var duelsTile = new NormalTile();
	var challengesTile = new NormalTile();
	var statsTile = new NormalTile();
	var FacebookHandler = require('login/facebook/FacebookHandler');
	var facebookHandler = new FacebookHandler();

	var self = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical'
	});

	var bang = Titanium.UI.createLabel({
		text : 'B!',
		font : {
			fontSize : 310,
			fontFamily : "Outlaw"
		},
		color : '#856C64',
		top : 15
	});

	var separator = Titanium.UI.createLabel({
		text : 'x',
		font : {
			fontSize : 140,
			fontFamily : "Sughayer Separates 4"
		},
		color : '#856C64',
		top : -165
	});

	var subtitle = Titanium.UI.createLabel({
		text : 'western duels',
		font : {
			fontSize : 65,
			fontFamily : "Western"
		},
		color : '#856C64',
		textAlign : 'center',
		width : '70%',
		top : -30
	});

	duelsTile.initialize(String.format(L('main:duelLabel'), ''), 45, 21);
	challengesTile.initialize(String.format(L('main:challengesLabel'), ''), 10, 21);
	statsTile.initialize(String.format(L('main:profilestatsLabel'), ''), 10, 21);

	self.add(bang);
	self.add(separator);
	self.add(subtitle);

	self.add(duelsTile);
	self.add(challengesTile);
	self.add(statsTile);

	duelsTile.addEventListener('click', function() {
		var StartChallengeWindow = require('ui/newChallenge/StartChallengeWindow');
		var startChallengeWindow = new StartChallengeWindow();
		global.mainTab.open(startChallengeWindow, {
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});

	challengesTile.addEventListener('click', function() {
		var ChallengeWindow = require('ui/challenges/ChallengeWindow');
		var challengeWindow = new ChallengeWindow();
		global.mainTab.open(challengeWindow, {
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	statsTile.addEventListener('click', function(){
		facebookHandler.logMeOut();
	});

	return self;

}

module.exports = MainView;
