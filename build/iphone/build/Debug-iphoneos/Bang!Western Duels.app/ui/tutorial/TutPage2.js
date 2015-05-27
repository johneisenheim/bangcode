function TutPage2(){
	
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	var title = Titanium.UI.createLabel({
		text : 'Step1',
		top : 80,
		font : {
			fontSize : 70,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});
	
	var separator = Titanium.UI.createLabel({
		text : 'x',
		font : {
			fontSize : 110,
			fontFamily : "Sughayer Separates 4"
		},
		color : '#856C64',
		top : -80
	});
	
	var message = Titanium.UI.createLabel({
		top: 0,
		font:{
     		fontSize:18,
      		fontFamily:"Roboto-Light"
   		},
   		text:'Per poter iniziare a giocare a Bang! clicca sulla tile \"Inizia un duello\" nella Home dell\'applicazione.',
   		textAlign:'center',
   		color:'#856C64',
   		width:'95%'
	});
	
	var myWidth = Titanium.Platform.displayCaps.platformWidth - 30;
	var myHeight = (331*myWidth)/1500;

	var screen1 = Titanium.UI.createView({
		width : myWidth,
		height : myHeight,
		backgroundImage : 'images/screen1.png',
		top : 40,
		viewShadowColor : '#b6b6b6',
		viewShadowRadius : 3,
		viewShadowOffset : (0, 4),
		borderRadius : 3
	});
	
	var message2 = Titanium.UI.createLabel({
		top: 40,
		font:{
     		fontSize:18,
      		fontFamily:"Roboto-Light"
   		},
   		text:'Ti verrà chiesto di specificare una data, un\'ora e una posizione per poter organizzare un duello. Infine, ti verrà chiesto di inserire uno sfidante da una lista di amici che hanno già installato l\'applicazione sul proprio dispositivo. Dovrai quindi attendere che lo sfidante accetti o rifiuti la tua richiesta.',
   		textAlign:'center',
   		color:'#856C64',
   		width:'95%'
	});
	
	
	self.add(title);
	self.add(separator);
	self.add(message);
	self.add(screen1);
	self.add(message2);
	
	return self;
	
}

module.exports = TutPage2;
