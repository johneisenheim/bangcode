function Profile() {
	
	var CustomButton = require('ui/customUI/CustomButton');
	var chartsButton = new CustomButton();
	chartsButton.initialize('Classifiche', 25);

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		backButtonTitle : String.format(L('main:back'), '')
	});

	var view = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		top : 65
	});

	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'profile_name.png');

	var photoContainer = Titanium.UI.createView({
		backgroundColor : 'transparent',
		backgroundImage : file.getNativePath(),
		width : 200,
		height : 200,
		top : 20
	});

	var frame = Titanium.UI.createView({
		width : 200,
		height : 200,
		backgroundImage : 'images/frame.png',
		backgroundColor : 'transparent'
	});

	var name = Titanium.UI.createLabel({
		top : 20,
		font : {
			fontSize : 25,
			fontFamily : "Roboto-Regular"
		},
		text : Ti.App.Properties.getString('fb_first_name') + ' ' + Ti.App.Properties.getString('fb_last_name'),
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var separator = Titanium.UI.createLabel({
		text : 'x',
		font : {
			fontSize : 110,
			fontFamily : "Sughayer Separates 4"
		},
		color : '#856C64',
		top : -80
	});

	var victoriesLabel = Titanium.UI.createLabel({
		top : 10,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Vittorie: ',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var lostsLabel = Titanium.UI.createLabel({
		top : 10,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Sconfitte: ',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var missedLabel = Titanium.UI.createLabel({
		top : 10,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Mancati: ',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var detailsButton = Titanium.UI.createButton({
		title : 'Dettagli',
		font : {
			fontSize : 21
		},
		color : '#856C64',
		top : 10
	});
	
	var logoutButton = Titanium.UI.createButton({
		title : 'Logout',
		font : {
			fontSize : 21
		},
		color : '#856C64',
		top : 10
	});
	
	logoutButton.addEventListener('click', function(){
		
	});
	
	detailsButton.addEventListener('click', function(){
		var Details = require('ui/profile/Details');
		var details = new Details();
		global.mainTab.open(details, {
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});
	
	chartsButton.addEventListener('click', function(){
		var Charts = require('ui/profile/Charts');
		global.mainTab.open(new Charts(), {
			transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		});
	});

	var accelerationLabel = Titanium.UI.createLabel({
		top : 10,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Velocità media: ',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	photoContainer.add(frame);

	view.add(photoContainer);
	view.add(name);
	view.add(separator);
	self.add(view);

	loader.showLoader(self);

	self.addEventListener('open', function() {
		var request = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				var response = JSON.parse(this.responseText);
				victoriesLabel.text += response[0].num_winner_matches;
				view.add(victoriesLabel);
				lostsLabel.text += response[0].num_loose_matches;
				view.add(lostsLabel);
				missedLabel.text += response[0].num_faults;
				view.add(missedLabel);
				accelerationLabel.text += response[0].acceleration;
				view.add(accelerationLabel);
				view.add(detailsButton);
				view.add(chartsButton);
				loader.hideLoader(self);
			},
			onerror : function(e) {
				Ti.API.debug(e.error);
				loader.hideLoader(self);
			},
			timeout : 5000
		});

		var dataToSend = {
			id_player : Ti.App.Properties.getString('fb_id')
		};
		Ti.API.info(JSON.stringify(dataToSend));
		request.open("GET", global.bangServerUrl + '/stats-getStats.php?stats=' + JSON.stringify(dataToSend));
		request.send();
	});    

	return self;

}

module.exports = Profile;
