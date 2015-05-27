function QuickGame(){
	
	var Telepathy = require('com.pj');
	var telepathy = null;
	
	var self = Titanium.UI.createWindow({
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		tabBarHidden : true,
		modal : true
	});
	
	var statusLabel = Titanium.UI.createLabel({
		top : '50%',
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Cerco l\'avversario...',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});
	
	loader.showLoader(self);
	
	var initQuickGameCallback = function(){
		telepathy = Telepathy.createSession();
		
	};
	
	//self.addEventListener('open', initQuickGameCallback);
	
	self.add(statusLabel);
	
	return self;
	
}

module.exports = QuickGame;
