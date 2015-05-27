function Wizard() {
	
	var FirstPage = require('wizard/FirstPage');
	var SecondPage = require('wizard/SecondPage');
	
	var firstPage = new FirstPage();
	var secondPage = new SecondPage();

	var window = Titanium.UI.createWindow({
		width : '100%',
		height : '100%',
		statusBarStyle : Titanium.UI.iPhone.StatusBar.GREY,
		navBarHidden : true
	});

	var scrollableView = Ti.UI.createScrollableView({
		views : [firstPage, secondPage],
		showPagingControl : false,
		scrollingEnabled: true,
		width:'100%',
		height:'100%',
		layout:'composite',
		backgroundColor:'#F5F4F2'
	});
		
	window.add(scrollableView);

	return window;
}

module.exports = Wizard;
