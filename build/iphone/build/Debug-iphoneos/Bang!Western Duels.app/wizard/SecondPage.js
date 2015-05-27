function SecondPage() {
	
	//var FacebookHandler = require('login/facebook/FacebookHandler');
	//var facebookHandler = new FacebookHandler();
	var FacebookHandler = require('login/facebook/FacebookHandler');
	var facebookHandler = new FacebookHandler();
	
	var self = Titanium.UI.createScrollView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	var guns = Titanium.UI.createLabel({
		text:'F',
		font:{
     		fontSize:490,
      		fontFamily:"Wild West Icons"
   		},
   		color:'#856C64',
   		top:0
	});
	
	var loginMessage = Titanium.UI.createLabel({
		top: -60,
		font:{
     		fontSize:18,
      		fontFamily:"Roboto-Light"
   		},
   		text:String.format(L('wizard:loginLabel'),''),
   		textAlign:'center',
   		color:'#856C64',
   		width:'95%'
	});
	
	var fbButton = Titanium.UI.createButton({
		title:String.format(L('wizard:loginButtonLabel'),''),
		color:'#856C64',
		font:{
			fontSize:23
		},
		top:25
	});
	
	fbButton.addEventListener('click', function(){
		facebookHandler.logMeIn();
	});
	
	self.add(guns);
	self.add(loginMessage);
	self.add(fbButton);

	return self;

}

module.exports = SecondPage;
