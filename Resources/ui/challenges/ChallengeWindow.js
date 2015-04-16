function ChallengeWindow() {
		
	var ChallengeView = require('ui/challenges/ChallengeView');
	var challengeView = new ChallengeView();
	
	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		backButtonTitle:String.format(L('main:back'),''),
		tabBarHidden : true
	});
	
	var actInd = Titanium.UI.createActivityIndicator({
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	

	//self.add(actInd);
	//actInd.show();

	/*setTimeout(function(){
	 actInd.hide();
	 self.add(challengeView);
	 },3000);*/

	self.add(challengeView);

	return self;
}

module.exports = ChallengeWindow;
