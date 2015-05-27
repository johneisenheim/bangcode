function Map(lat, lon) {

	var Map = require('ti.map');

	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
		self.close();
	});

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

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		animate : true,
		regionFit : true,
		userLocation : true,
		region : {
			latitude : lat,
			longitude : lon,
			longitudeDelta : 0.3,
			latitudeDelta : 0.3
		}
	});

	win.add(mapview);

	var newPin = Map.createAnnotation({
		pincolor : Map.ANNOTATION_RED,
		draggable : true,
		latitude : lat,
		longitude : lon
	});
	
	mapview.addAnnotation( newPin );

	return self;
}

module.exports = Map;