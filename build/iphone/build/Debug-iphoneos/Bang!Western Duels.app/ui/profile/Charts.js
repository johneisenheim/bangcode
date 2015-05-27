function Charts() {

	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Charts', 10);
	var table1 = null;

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
		text : 'Classifica globale',
		textAlign : 'center',
		color : 'white'
	});
	headerView1.add(headerView1Title);

	var threePointContainer = Titanium.UI.createView({
		width : Ti.Platform.displayCaps.platformWidth,
		height : 45,
		backgroundColor : 'transparent',
		layout : 'composite'
	});

	var threePoint = Titanium.UI.createView({
		width : 29,
		height : 8,
		backgroundColor : 'transparent',
		backgroundImage : 'images/points.png'
	});

	threePointContainer.add(threePoint);

	var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'separator.png');
	//if( !f.exists() )
	f.write(threePointContainer.toImage());

	view.add(pageTitle);

	self.add(view);

	self.addEventListener('open', function() {
		loader.showLoader(self);
		var request = Ti.Network.createHTTPClient({
			onload : function(e) {
				Ti.API.info("Received text: " + this.responseText);
				var response = JSON.parse(this.responseText);
				var myGlobalPlace = response[0][0].global_chart;
				var dataTable1 = [];
				var globalChart = response[1];
				for (var i = 0; i < globalChart.length; i++) {
					var toPush = {
						title : (i + 1) + '. ' + globalChart[i].vsName + ' con ' + globalChart[i].global_chart + ' punti',
						height : 45,
						font : {
							fontSize : 18,
							fontFamily : "Roboto-Light"
						}
					};
					if( globalChart[i].vsName === Ti.App.Properties.getString('fb_first_name')+ ' '+Ti.App.Properties.getString('fb_last_name') ){
						toPush.color = 'white';
						toPush.backgroundColor = '#F4D181';
					}else{
						toPush.color = '#856C64';
					}
					dataTable1.push(toPush);
				}
				if (myGlobalPlace > 20) {
					dataTable1.push({
						title : '',
						height : 45,
						color : '#856C64',
						backgroundColor : '#F5F4F2',
						backgroundImage : f.getNativePath()
					});
					dataTable1.push({
						title : myGlobalPlace + '. ' + Titanium.App.Properties.getString("fb_first_name") + ' ' + Titanium.App.Properties.getString("fb_last_name"),
						height : 45,
						color : '#856C64',
						font : {
							fontSize : 18,
							fontFamily : "Roboto-Light"
						}
					});
				}
				if (dataTable1.length > 0) {
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
					view.add(table1);
				}

				view.add(fakeView);
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
		request.open("GET", global.bangServerUrl + '/stats-getGlobalChart.php?chart=' + JSON.stringify(dataToSend));
		request.send();
	});

	var fakeView = Titanium.UI.createView({
		width : 1,
		height : 20,
		backgroundColor : 'transparent'
	});

	return self;

}

module.exports = Charts;
