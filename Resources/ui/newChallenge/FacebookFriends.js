function FacebookFriends(){
	
	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
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
	
	win.addEventListener('click', function(){
		var FacebookHandler = require('login/facebook/FacebookHandler');
		var facebookHandler = new FacebookHandler();
		facebookHandler.getInvitableFriends();
	});
	
	self.getFriends = function(){
		//facebookHandler.getInvitableFriends();
	};
	
	return self;
}
module.exports = FacebookFriends;
