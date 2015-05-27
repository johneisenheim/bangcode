function Map() {

	var Map = require('ti.map');
	
	var currentPosition = '';

	var done = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	done.addEventListener('click', function() {
		if( currentPosition !== '' )
			Ti.App.fireEvent('location_choosen',{latitude: self.latitude, longitude: self.longitude});
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
	
	self.latitude = '';
	self.longitude = '';

	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		animate : true,
		regionFit : true,
		userLocation : true
	});

	win.add(mapview);

	var calculateLatLngfromPixels = function(mapview, xPixels, yPixels) {
		var region = mapview.region;
		Ti.API.info(region.latitudeDelta);
		var heightDegPerPixel = -region.latitudeDelta / mapview.rect.height;
		var widthDegPerPixel = region.longitudeDelta / mapview.rect.width;
		return {
			lat : (yPixels - mapview.rect.height / 2) * heightDegPerPixel + region.latitude,
			lon : (xPixels - mapview.rect.width / 2) * widthDegPerPixel + region.longitude
		};
	};

	var newPin = Map.createAnnotation({
		pincolor : Map.ANNOTATION_RED,
		draggable : true
	});

	mapview.addEventListener('longpress', function(e) {
		var coordinates = calculateLatLngfromPixels(mapview, e.x, e.y);
		self.latitude = coordinates.lat;
		self.longitude = coordinates.lon;
		newPin.latitude = coordinates.lat;
		newPin.longitude = coordinates.lon;
		mapview.addAnnotation(newPin);
		currentPosition = true;
	});
	
	self.isLocationSet = function(){
		if( self.latitude === '' && self.longitude === '' )
			return false;
		else return {latitude: self.latitude, longitude: self.longitude};
	};

	return self;
}

module.exports = Map;

function getCords(evt) {
	var region = evt.source.actualRegion || evt.source.region;
	var pxWidth = evt.source.rect.width;
	var pxHeight = evt.source.rect.height;

	// should invert because of the pixel reference frame
	var heightDegPerPixel = -region.latitudeDelta / pxHeight;
	var widthDegPerPixel = region.longitudeDelta / pxWidth;

	var coords = {
		lat : (evt.y - pxHeight / 2) * heightDegPerPixel + region.latitude,
		lon : (evt.x - pxWidth / 2) * widthDegPerPixel + region.longitude
	};

	return coords;
}
