function Tutorial() {

	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
		self.close();
	});

	var TutPage1 = require('ui/tutorial/TutPage1');
	var tutPage1 = new TutPage1();
	var TutPage2 = require('ui/tutorial/TutPage2');
	var tutPage2 = new TutPage2();
	var TutPage3 = require('ui/tutorial/TutPage3');
	var tutPage3 = new TutPage3();
	var TutPage4 = require('ui/tutorial/TutPage4');
	var tutPage4 = new TutPage4();
	var TutPage5 = require('ui/tutorial/TutPage5');
	var tutPage5 = new TutPage5();

	var win = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		tabBarHidden : true,
		rightNavButton : done
	});

	var self = Ti.UI.iOS.createNavigationWindow({
		modal : true,
		modalTransitionStyle : Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
		modalStyle : Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET,
		window : win
	});

	var ViewScrollr = require("ui/customUI/ViewScrollr");

	var view = ViewScrollr.create({
		navigation : {
			backgroundColor : '#F5F4F2',
			selectedColor : '#856C64',
			color : '#BEA49C'
		},
		panels : [
			{view : tutPage1},
			{view : tutPage2},
			{view : tutPage3},
			{view : tutPage4},
			{view : tutPage5}
		]
	});

	/*var view = Titanium.UI.createScrollableView({
	 views : [tutPage1],
	 showPagingControl : true,
	 scrollingEnabled: true,
	 width:'100%',
	 height:'100%',
	 layout:'composite',
	 backgroundColor:'#F5F4F2',
	 pa
	 overlayEnabled : true,
	 pagingControlAlpha : 1,
	 pagingControlColor : '#856C64'
	 });*/

	win.add(view);

	return self;

}

module.exports = Tutorial;
