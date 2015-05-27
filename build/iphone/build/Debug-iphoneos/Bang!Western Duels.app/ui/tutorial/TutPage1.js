function TutPage1(){
	
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	var cowboy = Titanium.UI.createLabel({
		text:'i',
		font:{
     		fontSize:420,
      		fontFamily:"Wild West Icons"
   		},
   		color:'#856C64',
   		top:40
	});
	
	var tutorial = Titanium.UI.createLabel({
		text : 'Bang!',
		font : {
			fontSize : 100,
			fontFamily : "Outlaw"
		},
		color : '#856C64',
		top : -90
	});
	
	var separator = Titanium.UI.createLabel({
		text : 'x',
		font : {
			fontSize : 100,
			fontFamily : "Sughayer Separates 4"
		},
		color : '#856C64',
		top : -90
	});
	
	var message = Titanium.UI.createLabel({
		top: 0,
		font:{
     		fontSize:18,
      		fontFamily:"Roboto-Light"
   		},
   		text:'Questo tutorial ti mostrerà le operazioni basilari per poter utilizzare Bang! Western Duels. Scorri sulla pagina per proseguire nel tutorial.',
   		textAlign:'center',
   		color:'#856C64',
   		width:'95%'
	});

	
	self.add(cowboy);
	self.add(tutorial);
	self.add(separator);
	self.add(message);
	
	return self;
	
}

module.exports = TutPage1;
