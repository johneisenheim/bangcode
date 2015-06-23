function Loader2() {

	var currentObject = null;

	Ti.API.info('loader2 called');
	var matrix = null, animation = null;

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

	/*animation.addEventListener('complete', function(){
	 Ti.API.info('complete animation');
	 chamber.animate(animation);
	 });*/

	self.add(chamber);

	self.showLoader = function(win) {
		if (win != null)
			currentObject = win;
		matrix = Ti.UI.create2DMatrix();
		matrix = matrix.rotate(180);

		animation = Ti.UI.createAnimation({
			transform : matrix,
			duration : 900,
			//autoreverse : true,
			repeat : 10000000
		});
		win.add(self);
		chamber.animate(animation);
	};

	self.restartAnimation = function() {
		chamber.animate(animation);
		Ti.API.info('restartAnimation function');
	};

	self.hideLoader = function(win) {
		win.remove(self);
	};

	function startAnimation() {
		chamber.animate(animation);
	}

	return self;

}

module.exports = Loader2;
