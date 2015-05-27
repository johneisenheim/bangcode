function TutPage5(){
	
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});

	var title = Titanium.UI.createLabel({
		text : 'Step4',
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
		top : 0,
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		text : 'Il vincitore sarà colui che ha completato il gesto dello sparo nel minor tempo possibile. Vinci il maggior numero di duelli per scalare la vetta della classifica!',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var goodLuck = Titanium.UI.createLabel({
		text : 'Buona Fortuna!',
		top : 80,
		font : {
			fontSize : 90,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});

	
	self.add(title);
	self.add(separator);
	self.add(message);
	self.add(goodLuck);

	return self;
}

module.exports = TutPage5;
