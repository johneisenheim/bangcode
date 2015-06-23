function Calculating(){
	
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Duello', 30);
	
	var self = Titanium.UI.createView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	var boots = Titanium.UI.createImageView({
		top : 30,
		image : 'images/boots.png',
		backgroundColor : 'transparent',
		width : johnsLib.calculateWidth(250),
		height : johnsLib.calculateHeight(300)
	});
	
	var calculateLabel = Titanium.UI.createLabel({
		top : 50,
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Light"
		},
		text : 'Sto calcolando i tuoi risultati, attendi...',
		textAlign : 'center',
		color : '#856C64',
		width : '85%'
	});
	
	self.add(pageTitle);
	self.add(boots);
	self.add(calculateLabel);
	
	return self;
	
}

module.exports = Calculating;
