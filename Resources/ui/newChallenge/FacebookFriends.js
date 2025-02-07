function FacebookFriends() {

	var currentFriend = '';
	var currentID = '';

	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
		if (currentFriend !== '')
			Ti.App.fireEvent('friend_choosen', {
				who : currentFriend,
				id : currentID
			});
		self.close();
	});

	var win = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		tabBarHidden : true,
		rightNavButton : done
	});

	var self = Ti.UI.iOS.createNavigationWindow({
		modal : true,
		modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
		window : win
	});

	var search = Titanium.UI.createSearchBar({
		barColor : '#d5d1c8',
		height : 43,
		hintText : 'Cerca amici',
		borderColor : '#d5d1c8',
		top : 64,
		showCancel : false,
		tintColor : 'white'
	});

	search.addEventListener('cancel', function() {
		search.blur();
	});

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : '#856C64',
		font : {
			fontFamily : "Roboto-Light",
			fontSize : 19
		},
		//message : 'Loading...',
		style : Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		top : '50%'
	});

	var table = null;

	Ti.App.addEventListener('friends_done', function(e) {
		var jsonRes = null;
		try {
			jsonRes = JSON.parse(e.data);
		} catch(ex) {
			alert(e.data);
		}
		var dataTable = [];
		var imgFile = null;
		for (var i = 1; i <= jsonRes.length; i++) {
			var fileName = jsonRes[i - 1].id + '.png';
			imgFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
			if (!imgFile.exists()) {
				var miniImage = Titanium.UI.createImageView({
					image : 'https://graph.facebook.com/' + jsonRes[i - 1].id + '/picture?width=200&height=200',
					width : 120,
					height : 120
				});
				imgFile.write(miniImage.toBlob());
			}
			var row = Ti.UI.createTableViewRow({
				className : jsonRes[i - 1].name, // used to improve table performance
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				font : {
					fontFamily : "Roboto-Light",
					fontSize : 19
				},
				color : '#958078',
				backgroundColor : 'white',
				title : jsonRes[i - 1].name,
				selectedColor : 'white',
				selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY,
				fb_id : jsonRes[i - 1].id,
				hasCheck : false,
				leftImage : imgFile.getNativePath()
			});
			dataTable.push(row);
			imgFile = null;
		}
		table = Titanium.UI.createTableView({
			height : (jsonRes.length * 50),
			backgroundColor : 'transparent',
			width : '100%',
			height : '100%',
			separatorColor : '#958078',
			top : 60,
			data : dataTable,
			tintColor : '#E2BB5A',
			style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
			search : search
		});
		table.addEventListener('click', function(e) {
			currentID = e.rowData.fb_id;
			currentFriend = e.rowData.title;
			var tmp = e.rowData.rowIndex;
			Ti.API.info('TMP è '+tmp);
			for (var j = 0; j < dataTable.length; j++ ){
				if( j == (tmp-1) ) 
					dataTable[j].hasCheck = true;
				else if( j != (tmp-1) ){
					Ti.API.info(j+ ' è diverso da '+tmp);
					Ti.API.info(dataTable[j]);
					dataTable[j].hasCheck = false;
				}
			}
			table.setData(dataTable);
		});

		self.add(table);
		activityIndicator.hide();
	});

	win.addEventListener('open', function() {
		var FacebookHandler = require('login/facebook/FacebookHandler');
		var facebookHandler = new FacebookHandler();
		facebookHandler.getInvitableFriends();
	});

	//win.add(search);
	win.add(activityIndicator);

	activityIndicator.show();

	return self;
}

module.exports = FacebookFriends;
