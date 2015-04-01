function CustomButton() {

	var self = Titanium.UI.createView({
		backgroundColor : 'transparent',
		width : 200,
		height : 45
	});

	var solid = Titanium.UI.createView({
		backgroundColor : '#F7CD63',
		width : '100%',
		height : 42,
		top : 0
	});

	var shadow = Titanium.UI.createView({
		backgroundColor : '#B49138',
		width : '100%',
		height : 3,
		top : 42
	});

	var title = Titanium.UI.createLabel({
		text : '',
		font : {
			fontSize : 21,
			fontFamily : "Roboto-Regular"
		},
		color : 'white',
		textAlign : 'center'
	});

	self.initialize = function(buttonTitle, buttonTop) {
		self.top = buttonTop;
		title.text = buttonTitle;
		solid.add(title);
	};

	self.add(solid);
	self.add(shadow);

	return self;
}

module.exports = CustomButton;
