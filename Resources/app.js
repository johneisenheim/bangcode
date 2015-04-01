/*
* Single Window Application Template:
* A basic starting point for your application.  Mostly a blank canvas.
*
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*
*/

/*
Properties list:
- user_logged: describe if user is logged (boolean)
- fb_id: the facebook account id
- fb_last_name: facebook account last name
- fb_first_name: facebook account first name
- fb_mail: facebook account mail
* */

//bootstrap and check dependencies
if (Ti.version < 1.8) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

var platform = Ti.Platform.osname;
var Window,
    NewWindow,
    window,
    newWindow;

var global = {
	startApplication : function() {
		switch(platform) {
		case 'android':
			NewWindow = require('ui/handheld/android/ApplicationWindow');
			newWindow = new NewWindow();
			window.close();
			newWindow.open();
			break;
		default:
			NewWindow = require('ui/handheld/iOS/ApplicationWindow');
			newWindow = new NewWindow();
			window.close();
			newWindow.open();
			break;
		}
	}
};

// This is a single context application with multiple windows in a stack
(function() {
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
	    version = Ti.Platform.version,
	    height = Ti.Platform.displayCaps.platformHeight,
	    width = Ti.Platform.displayCaps.platformWidth;

	//considering tablets to have width over 720px and height over 600px - you can define your own
	function checkTablet() {
		switch (platform) {
		case 'ipad':
			return true;
		case 'android':
			var psc = Ti.Platform.Android.physicalSizeCategory;
			var tiAndroid = Ti.Platform.Android;
			return psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_LARGE || psc === tiAndroid.PHYSICAL_SIZE_CATEGORY_XLARGE;
		default:
			return Math.min(Ti.Platform.displayCaps.platformHeight, Ti.Platform.displayCaps.platformWidth) >= 400;
		}
	}

	var isTablet = checkTablet();
	console.log(isTablet);

	if (Titanium.App.Properties.getBool("user_logged", 0)) {
		//Start application
		switch(platform) {
		case 'android':
			Window = require('ui/handheld/android/ApplicationWindow');
			break;
		default:
			Window = require('ui/handheld/iOS/ApplicationWindow');
			break;
		}
	} else {
		//Start wizard
		Window = require('wizard/Wizard');
	}
	window = new Window();
	window.open();
})();
