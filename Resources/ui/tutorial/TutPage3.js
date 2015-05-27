function TutPage3() {
	
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});

	var title = Titanium.UI.createLabel({
		text : 'Step2',
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
		text : 'Quando giungerai nel posto e all\'ora stabilita, una notifica ti ricorderà l\'inizio della sfida. A quel punto, posizionatoti di fronte al tuo avversario, ti verrà chiesto di metterti in posizione di starting.',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});
	
	var position = Titanium.UI.createImageView({
		top : 10,
		image : 'images/position1.png',
		backgroundColor : 'transparent',
		width : 70,
		height : 306
	});

	
	self.add(title);
	self.add(separator);
	self.add(message);
	self.add(position);

	return self;
	
}

module.exports = TutPage3;
