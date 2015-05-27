function FacebookFriends() {
	
	var currentFriend = '';
	var currentID = '';

	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
		if ( currentFriend !== '')
			Ti.App.fireEvent('friend_choosen',{who:currentFriend, id:currentID});
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

	/*var toolbarDone = Ti.UI.createButton({
	 systemButton : Titanium.UI.iPhone.SystemButton.CANCEL
	 });
	 var flexSpace = Titanium.UI.createButton({
	 systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	 });*/

	var search = Titanium.UI.createSearchBar({
		barColor : '#d5d1c8',
		height : 43,
		hintText : 'Cerca amici',
		borderColor : '#d5d1c8',
		top : 64,
		showCancel : true,
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
		var jsonRes = JSON.parse(e.data);
		var dataTable = [];
		for (var i = 1; i <= jsonRes.length; i++) {
			var row = Ti.UI.createTableViewRow({
				className : jsonRes[i - 1].name, // used to improve table performance
				rowIndex : i, // custom property, useful for determining the row during events
				height : 50,
				font : {
					fontFamily : "Roboto-Light",
					fontSize : 19
				},
				color : '#958078',
				title : jsonRes[i - 1].name,
				selectedColor : 'white',
				selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY,
				fb_id : jsonRes[i - 1].id,
				hasCheck : false,
				leftImage : 'http://graph.facebook.com/' + jsonRes[i - 1].id + '/picture?width=100&height=100'
			});
			Ti.API.info(row.leftImage);
			dataTable.push(row);
		}
		table = Titanium.UI.createTableView({
			height : jsonRes.length * 50,
			backgroundColor : 'white',
			width : '100%',
			separatorColor : '#958078',
			top : 107,
			data : dataTable,
			tintColor : 'E2BB5A'
		});
		table.addEventListener('click', function(e) {
			currentID = e.rowData.fb_id;
			e.rowData.hasCheck = true;
			currentFriend = e.rowData.title;
		});

		self.add(table);
		activityIndicator.hide();
	});

	win.addEventListener('open', function() {
		var FacebookHandler = require('login/facebook/FacebookHandler');
		var facebookHandler = new FacebookHandler();
		facebookHandler.getInvitableFriends();
	});

	win.add(search);
	win.add(activityIndicator);

	activityIndicator.show();

	return self;
}

module.exports = FacebookFriends;
