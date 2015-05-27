function ChallengesDetailsTable3(){
	
	var BigTile = require('ui/customUI/BigTile');
	var bigTile = new BigTile();
	bigTile.initialize('tileTitle', 15, 19);
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 75);
	var MinusNormalTile = require('ui/customUI/MinusNormalTile');
	var whenTile = new MinusNormalTile();
	
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
		title : 'Annulla richiesta',
		font : {
			fontSize : 21
		},
		color : '#856C64',
		top : 30
	});
	
	retireButton.addEventListener('click', function() {
		var aDialog = Ti.UI.createAlertDialog({
			cancel : 1,
			buttonNames : ['Si, annulla', 'Ci ho ripensato'],
			message : 'Sei sicuro di voler annullare la richiesta?',
			title : 'Annulla richiesta'
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
						if( response.return === '0'){
							loader.hideLoader(self);
							Ti.API.info("ok");
							Ti.App.fireEvent('reload',{});
							setTimeout(function(){
								self.close();
							},1000);
						}else{
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
					id : matchID
				};
				Ti.API.info(JSON.stringify(dataToSend));
				request.open("GET", global.bangServerUrl + '/challenge-rejectChallenge.php?id_challenge=' + JSON.stringify(dataToSend));
				request.send();
			}
		});
	});
	
	self.initialize = function(data) {
		bigTile.setTitle(data.title + ' nei paraggi di ' + data.address);
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
		
		whenTile.initialize('il giorno '+day+'-'+month+'-'+year+' alle ore '+hours+':'+minutes, 10, 18);
	};
	
	container.add(pageTitle);
	container.add(bigTile);
	container.add(whenTile);
	container.add(retireButton);
	
	self.add(container);
	
	return self;
	
}

module.exports = ChallengesDetailsTable3;
