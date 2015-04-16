function FirstPage(){
	
	var self = Titanium.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		backgroundColor:'#F5F4F2',
		layout:'vertical'
	});
	
	var gunman = Titanium.UI.createLabel({
		text:'h',
		font:{
     		fontSize:420,
      		fontFamily:"Wild West Icons"
   		},
   		color:'#856C64',
   		top:-50
	});
	
	var bangLabel = Titanium.UI.createLabel({
		text:'BANG!',
		font:{
     		fontSize:110,
      		fontFamily:"Outlaw"
   		},
   		color:'#856C64',
   		top:gunman.height,
   		top:-85
	});
	
	var separator = Titanium.UI.createLabel({
		text:'x',
		font:{
     		fontSize:100,
      		fontFamily:"Sughayer Separates 4"
   		},
   		color:'#856C64',
   		top:-90
	});
	
	var welcomeMessage = Titanium.UI.createLabel({
		top: 0,
		font:{
     		fontSize:18,
      		fontFamily:"Roboto-Light"
   		},
   		text:String.format(L('welcome'),''),
   		textAlign:'center',
   		color:'#856C64',
   		width:'95%'
	});
	
	var nextButton = Titanium.UI.createButton({
		title:String.format(L('wizard:next_button'),''),
		color:'#856C64',
		font:{
			fontSize:20
		},
		top:25
	});
	
	self.add(gunman);
	self.add(bangLabel);
	self.add(separator);
	self.add(welcomeMessage);
	//self.add(nextButton);

	
	return self;
}

module.exports = FirstPage;
