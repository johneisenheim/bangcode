function Loader() {

	var currentObject = null;

	var self = Titanium.UI.createView({
		backgroundColor : '#FAD985',
		width : 60,
		height : 60,
		borderRadius : 10,
		opacity : 0.96,
		zIndex : 50,
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

	var animation = Ti.UI.createAnimation({
		transform : matrix,
		duration : 900,
		//autoreverse : true,
		repeat : 10000000
	});
	
	/*animation.addEventListener('complete', function(){
		Ti.API.info('complete animation');
		chamber.animate(animation);
	});*/

	self.add(chamber);

	self.showLoader = function(win) {
		if (win != null)
			currentObject = win;
		win.add(self);
		startAnimation();
	};
	
	
	/*self.addEventListener('postlayout', function(){
		Ti.API.info('postlayout');
		chamber.animate(animation);
	});
	
	self.reloadAnimation = function() {
		Ti.API.info('reload');
		chamber.animate();
		startAnimation();
	};*/

	self.hideLoader = function(win) {
		win.remove(self);
	};
	
	function startAnimation(){
		chamber.animate(animation);
	}

	return self;

}

module.exports = Loader;
