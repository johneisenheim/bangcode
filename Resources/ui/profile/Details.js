function Details() {

	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duelli', 10);

	var table1 = null,
	    table2 = null;

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

	var headerView1 = Titanium.UI.createView({
		backgroundColor : '#E2BB5A',
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
		text : 'Sfide vinte',
		textAlign : 'center',
		color : 'white'
	});
	headerView1.add(headerView1Title);

	var headerView2 = Titanium.UI.createView({
		backgroundColor : '#E2BB5A',
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
		text : 'Sfide perse',
		textAlign : 'center',
		color : 'white'
	});

	headerView2.add(headerView2Title);

	loader.showLoader(self);

	self.addEventListener('open', function() {
		var request = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				var response = JSON.parse(this.responseText);
				var dataTable1 = [],
				    dataTable2 = [];
				var myID = Ti.App.Properties.getString('fb_id');
				for (var i = 0; i < response.length; i++) {
					if (response[i].idMaster == myID) {
						if (response[i].winner == 0) {
							dataTable1.push({
								title : response[i].playerTwo + ' il ' + response[i].challenge_date,
								height : 45,
								color : '#856C64',
								font : {
									fontSize : 18,
									fontFamily : "Roboto-Light"
								}
							});
						} else {
							dataTable2.push({
								title : response[i].playerTwo + ' il ' + response[i].challenge_date,
								height : 45,
								color : '#856C64',
								font : {
									fontSize : 18,
									fontFamily : "Roboto-Light"
								}
							});
						}
					} else {
						if (response[i].winner == 0) {
							dataTable1.push({
								title : response[i].playerOne + ' il ' + response[i].challenge_date,
								height : 45,
								color : '#856C64',
								font : {
									fontSize : 18,
									fontFamily : "Roboto-Light"
								}
							});
						} else {
							dataTable2.push({
								title : response[i].playerOne + ' il ' + response[i].challenge_date,
								height : 45,
								color : '#856C64',
								font : {
									fontSize : 18,
									fontFamily : "Roboto-Light"
								}
							});
						}
					}
				}
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

				if (dataTable1.length == 0) {
					if (dataTable2.length == 0) {
						var noData = Titanium.UI.createLabel({
							top : '30%',
							font : {
								fontSize : 19,
								fontFamily : "Roboto-Light"
							},
							text : 'Non ci sono sfide effettuate.',
							textAlign : 'center',
							color : '#aa938b',
							width : '95%'
						});
						view.add(noData);
					} else {
						view.add(table2);
					}
				} else {
					if (dataTable2.length == 0) {
						view.add(table1);
					} else {
						view.add(table1);
						view.add(table2);
					}

				}

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
		request.open("GET", global.bangServerUrl + '/churchbell-getChurchbell.php?churchbell=' + JSON.stringify(dataToSend));
		request.send();
	});

	view.add(pageTitle);

	self.add(view);

	return self;

}

module.exports = Details;
