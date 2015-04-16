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
		NewWindow = require('ui/ApplicationWindow');
		newWindow = new NewWindow();
		window.close();
		newWindow.open();
	},
	mainTab : Titanium.UI.createTab({}),
	bangServerUrl: 'https://bangserver-churchbell.rhcloud.com'
};

// This is a single context application with multiple windows in a stack
(function() {
	if (Titanium.App.Properties.getBool("user_logged", 0)) {
		//Start application
		Window = require('ui/ApplicationWindow');
	} else {
		//Start wizard
		Window = require('wizard/Wizard');
	}
	window = new Window();
	window.open();
})();
