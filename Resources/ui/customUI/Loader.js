function Loader() {

	var currentObject = null;

	var self = Titanium.UI.createView({
		backgroundColor : '#FAD985',
		width : 60,
		height : 60,
		borderRadius : 10,
		opacity : 0.96,
		zIndex : 10,
		top : '40%',
		layout : 'composite',
		viewShadowColor : '#817F7F',
		viewShadowRadius : 2,
		viewShadowOffset : (0, 2)
	});

	var chamber = Titanium.UI.createView({
		backgroundImage : 'images/loading.png',
		backgroundColor : 'transparent',
		width : 35,
		height : 35
	});

	var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.rotate(180);

	self.add(chamber);

	self.showLoader = function(win) {
		if( win != null )
			currentObject = win;
		chamber.animate({
			transform : matrix,
			duration : 900,
			//autoreverse : true,
			repeat : 300000
		});
		win.add(self);
	};
	
	self.reloadAnimation = function(){
		chamber.animate({
			transform : matrix,
			duration : 900,
			//autoreverse : true,
			repeat : 300000
		});
	};

	self.hideLoader = function(win) {
		win.remove(self);
	};

	return self;

}

module.exports = Loader;
