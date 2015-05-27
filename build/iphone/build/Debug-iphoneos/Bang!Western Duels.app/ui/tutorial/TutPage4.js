function TutPage4(){
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});

	var title = Titanium.UI.createLabel({
		text : 'Step3',
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
		text : 'Un segnale ti avviserà nel momento in cui il dispositivo sarà fuori dal range della posizione raggiunta nella fase precedente. Se manterrai la posizione, partirà un conto alla rovescia sincronizzato tra i due sfidanti al termine del quale il segnale di Bang! ti avviserà di mimare il gesto dell’estrazione della pistola.',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var position = Titanium.UI.createImageView({
		top : 30,
		image : 'images/position2.png',
		backgroundColor : 'transparent',
		width : 120,
		height : 236
	});

	
	self.add(title);
	self.add(separator);
	self.add(message);
	self.add(position);

	return self;
}

module.exports = TutPage4;
