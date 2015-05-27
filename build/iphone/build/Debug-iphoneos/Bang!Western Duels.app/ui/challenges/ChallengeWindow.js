function ChallengeWindow() {

	var ChallengeView = require('ui/challenges/ChallengeView');
	var ChallengesDetailsTable1 = require('ui/challenges/ChallengesDetailsTable1');
	var ChallengesDetailsTable2 = require('ui/challenges/ChallengesDetailsTable2');
	var ChallengesDetailsTable3 = require('ui/challenges/ChallengesDetailsTable3');

	var challengeView = null;

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

	loader.showLoader(self);

	var request = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			var response = JSON.parse(this.responseText);
			switch(response.return) {
			case -1:
				//errore
				break;
			case -2:
				//non ci sono sfide
				challengeView = new ChallengeView([null, null, null, null]);
				setTimeout(function() {
					loader.hideLoader(self);
					self.add(challengeView);
				}, 1000);
				break;
			default:
				//costruisci tabelle
				var tables = createTables(response, ChallengesDetailsTable1, ChallengesDetailsTable2, ChallengesDetailsTable3);
				challengeView = new ChallengeView(tables);
				setTimeout(function() {
					loader.hideLoader(self);
					self.add(challengeView);
				}, 2000);
				break;
			}
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000
	});

	var dataToSend = {
		id_player : Ti.App.Properties.getString('fb_id'),
	};
	Ti.API.info(JSON.stringify(dataToSend));
	request.open("GET", global.bangServerUrl + '/challenge-myChallenge.php?challenge=' + JSON.stringify(dataToSend));
	request.send();

	self.reload = function() {
		Ti.API.info("qui");
		Ti.API.info(challengeView);
		self.remove(challengeView);
		Ti.API.info("quo");
		loader.showLoader(self);
		Ti.API.info("qua");
		request.open("GET", global.bangServerUrl + '/challenge-myChallenge.php?challenge=' + JSON.stringify(dataToSend));
		request.send();
	};

	Ti.App.addEventListener('reload', function() {
		self.reload();
	});

	return self;
}

module.exports = ChallengeWindow;

function createTables(response, ChallengesDetailsTable1, ChallengesDetailsTable2, ChallengesDetailsTable3) {

	//Sfide da accettare[status 1 tab 2], Sfide in attesa[status 2 tab 3], Pronte per il duello[status 0 tab 1], Sfide rifiutate[status 3]

	var headerView1 = Titanium.UI.createView({
		backgroundColor : '#90BD88',
		width : '100%',
		height : 30,
		layout : 'horizontal'
	});

	var headerView1Title = Titanium.UI.createLabel({
		left : 10,
		top : 3,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Pronte per il duello',
		textAlign : 'center',
		color : 'white'
	});

	var headerView2 = Titanium.UI.createView({
		backgroundColor : '#64A8E4',
		width : '100%',
		height : 30,
		layout : 'horizontal'
	});

	var headerView2Title = Titanium.UI.createLabel({
		left : 10,
		top : 3,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Sfide da accettare',
		textAlign : 'center',
		color : 'white'
	});

	var headerView3 = Titanium.UI.createView({
		backgroundColor : '#F4D181',
		width : '100%',
		height : 30,
		layout : 'horizontal'
	});

	var headerView3Title = Titanium.UI.createLabel({
		left : 10,
		top : 3,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Sfide in attesa',
		textAlign : 'center',
		color : 'white'
	});

	var headerView4 = Titanium.UI.createView({
		backgroundColor : '#CD6565',
		width : '100%',
		height : 30,
		layout : 'horizontal'
	});

	var headerView4Title = Titanium.UI.createLabel({
		left : 10,
		top : 3,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Sfide rifiutate',
		textAlign : 'center',
		color : 'white'
	});

	headerView1.add(headerView1Title);
	headerView2.add(headerView2Title);
	headerView3.add(headerView3Title);
	headerView4.add(headerView4Title);

	var dataTable1 = [];
	var dataTable2 = [];
	var dataTable3 = [];
	var dataTable4 = [];

	var itsMe = Ti.App.Properties.getString('fb_id');

	for (var i = 0; i < response.length; i++) {
		if (response[i].status == 0) {
			if (response[i].id_winner == null) {
				dataTable1.push({
					title : 'Sfida contro ' + response[i].vsName,
					height : 45,
					hasChild : 'true',
					color : '#856C64',
					font : {
						fontSize : 18,
						fontFamily : "Roboto-Light"
					},
					challenge_date : response[i].challenge_date,
					status : response[i].status,
					latitude : response[i].latitude,
					longitude : response[i].longitude,
					vsId : response[i].player_two,
					address : response[i].address,
					id : response[i].id
				});
			}
		} else if (response[i].status == 1) {
			if (response[i].player_one === itsMe) {
				dataTable2.push({
					title : 'Sfida contro ' + response[i].vsName,
					height : 45,
					hasChild : 'true',
					color : '#856C64',
					font : {
						fontSize : 18,
						fontFamily : "Roboto-Light"
					},
					challenge_date : response[i].challenge_date,
					status : response[i].status,
					latitude : response[i].latitude,
					longitude : response[i].longitude,
					vsId : response[i].player_two,
					address : response[i].address,
					id : response[i].id
				});
			} else if (response[i].player_two === itsMe) {
				dataTable3.push({
					title : 'Sfida contro ' + response[i].vsName,
					height : 45,
					hasChild : 'true',
					color : '#856C64',
					font : {
						fontSize : 18,
						fontFamily : "Roboto-Light"
					},
					challenge_date : response[i].challenge_date,
					status : response[i].status,
					latitude : response[i].latitude,
					longitude : response[i].longitude,
					vsId : response[i].player_two,
					address : response[i].address,
					id : response[i].id
				});
			}
		} else if (response[i].status == 2) {
			if (response[i].player_two === itsMe) {
				dataTable2.push({
					title : 'Sfida contro ' + response[i].vsName,
					height : 45,
					hasChild : 'true',
					color : '#856C64',
					font : {
						fontSize : 18,
						fontFamily : "Roboto-Light"
					},
					challenge_date : response[i].challenge_date,
					status : response[i].status,
					latitude : response[i].latitude,
					longitude : response[i].longitude,
					vsId : response[i].player_two,
					address : response[i].address,
					id : response[i].id
				});
			} else if (response[i].player_one === itsMe) {
				dataTable3.push({
					title : 'Sfida contro ' + response[i].vsName,
					height : 45,
					hasChild : 'true',
					color : '#856C64',
					font : {
						fontSize : 18,
						fontFamily : "Roboto-Light"
					},
					challenge_date : response[i].challenge_date,
					status : response[i].status,
					latitude : response[i].latitude,
					longitude : response[i].longitude,
					vsId : response[i].player_two,
					address : response[i].address,
					id : response[i].id
				});
			}

		} else if (response[i].status == 3 && response[i].remove_challenge !== Ti.App.Properties.getString('fb_id')) {
			dataTable4.push({
				title : 'Sfida contro ' + response[i].vsName,
				height : 45,
				//hasChild : 'true',
				color : '#856C64',
				font : {
					fontSize : 18,
					fontFamily : "Roboto-Light"
				},
				challenge_date : response[i].challenge_date,
				status : response[i].status,
				latitude : response[i].latitude,
				longitude : response[i].longitude,
				vsId : response[i].player_two,
				address : response[i].address,
				id : response[i].id
			});
		}
	}

	var table1 = null,
	    table2 = null,
	    table3 = null,
	    table4 = null;

	if (dataTable1.length != 0) {
		table1 = Titanium.UI.createTableView({
			top : 25,
			width : '100%',
			height : (dataTable1.length * 45) + 30,
			showVerticalScrollIndicator : true,
			separatorColor : '#B8B1AF',
			backgroundColor : '#FDFDFD',
			headerView : headerView1,
			data : dataTable1,
			scrollable : false,
			selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY
		});

		table1.addEventListener('click', function(e) {
			var challengesDetailsTable1 = new ChallengesDetailsTable1();
			Ti.API.info(e.rowData.title);
			challengesDetailsTable1.initialize(e.rowData);
			global.mainTab.open(challengesDetailsTable1, {
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
	}

	if (dataTable2.length != 0) {
		table2 = Titanium.UI.createTableView({
			top : 25,
			width : '100%',
			height : (dataTable2.length * 45) + 30,
			showVerticalScrollIndicator : true,
			separatorColor : '#B8B1AF',
			backgroundColor : '#FDFDFD',
			headerView : headerView2,
			data : dataTable2,
			scrollable : false,
			selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY
		});

		table2.addEventListener('click', function(e) {
			var challengesDetailsTable2 = new ChallengesDetailsTable2();
			Ti.API.info(e.rowData.title);
			challengesDetailsTable2.initialize(e.rowData);
			global.mainTab.open(challengesDetailsTable2, {
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
	}

	if (dataTable3.length != 0) {
		table3 = Titanium.UI.createTableView({
			top : 25,
			width : '100%',
			height : (dataTable3.length * 45) + 30,
			showVerticalScrollIndicator : true,
			separatorColor : '#B8B1AF',
			backgroundColor : '#FDFDFD',
			headerView : headerView3,
			data : dataTable3,
			scrollable : false,
			selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY
		});

		table3.addEventListener('click', function(e) {
			var challengesDetailsTable3 = new ChallengesDetailsTable3();
			Ti.API.info(e.rowData.title);
			challengesDetailsTable3.initialize(e.rowData);
			global.mainTab.open(challengesDetailsTable3, {
				transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
			});
		});
	}

	if (dataTable4.length != 0) {
		table4 = Titanium.UI.createTableView({
			top : 25,
			width : '100%',
			height : (dataTable4.length * 45) + 30,
			showVerticalScrollIndicator : true,
			separatorColor : '#B8B1AF',
			backgroundColor : '#FDFDFD',
			headerView : headerView4,
			data : dataTable4,
			scrollable : false,
			selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY,
			editable : true
		});

		table4.addEventListener('delete', function(e) {
			var request = Ti.Network.createHTTPClient({
				onload : function(e) {
					Ti.API.info("Received text: " + this.responseText);
					var response = JSON.parse(this.responseText);
					Ti.API.info(response.return);
					if (response.returnPlayer === '0' && response.returnGetChallenge === '0' && response.returnDeleteChallenge === '0') {
						Ti.API.info("ok");
						Ti.App.fireEvent('reload', {});
					} else {
						alert('Error');
					}
				},
				onerror : function(e) {
					Ti.API.debug(e.error);
				},
				timeout : 5000
			});
			var dataToSend = {
				id : e.rowData.id,
				id_player : Ti.App.Properties.getString('fb_id')
			};
			Ti.API.info(JSON.stringify(dataToSend));
			request.open("GET", global.bangServerUrl + '/challenge-removeRejectChallenge.php?challenge=' + JSON.stringify(dataToSend));
			request.send();
		});
	}

	return [table1, table2, table3, table4];

}
