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
	bangServerUrl : 'https://bangserver-churchbell.rhcloud.com'
};

var ZLSound = require('com.salsarhythmsoftware.zlsound');

var musicVolume = Ti.App.Properties.getDouble('volume', 0.4);
/*var player = Ti.Media.createSound({
 url : "music/theme.mp3",
 looping : true,
 volume : musicVolume
 });*/

var player = ZLSound.createSample({
	media : "music/theme.mp3",
	volume : musicVolume
});

player.loop(1000);
player.play();

//player.play();

if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
	Ti.API.info("I am iOS 8!");
	// Create notification actions
	var acceptAction = Ti.App.iOS.createUserNotificationAction({
		identifier : "ACCEPT_IDENTIFIER",
		title : "Vai a Bang!",
		activationMode : Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_FOREGROUND,
		destructive : false,
		authenticationRequired : true
	});

	var rejectAction = Ti.App.iOS.createUserNotificationAction({
		identifier : "REJECT_IDENTIFIER",
		title : "Dopo",
		activationMode : Ti.App.iOS.USER_NOTIFICATION_ACTIVATION_MODE_BACKGROUND,
		destructive : true,
		authenticationRequired : false
	});

	// Create a notification category
	var duelContent = Ti.App.iOS.createUserNotificationCategory({
		identifier : "DUEL",
		actionsForDefaultContext : [acceptAction, rejectAction]
	});
	// Register for user notifications and categories
	Ti.App.iOS.registerUserNotificationSettings({
		types : [Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND],
		categories : [duelContent]
	});
	// Monitor notifications received while app is in the background
	Ti.App.iOS.addEventListener('localnotificationaction', function(e) {
		if (e.category == "DUEL" && e.identifier == "ACCEPT_IDENTIFIER") {
			alert("start download");
		}

		// Reset the badge value
		if (e.badge > 0) {
			Ti.App.iOS.scheduleLocalNotification({
				date : new Date(new Date().getTime() + 3000),
				badge : "-1"
			});
		}
		Ti.API.info(JSON.stringify(e));
	});
}

// Monitor notifications received while app is in the foreground
Ti.App.iOS.addEventListener('notification', function(e) {
	// Reset the badge value
	if (e.badge > 0) {
		Ti.App.iOS.scheduleLocalNotification({
			date : new Date(new Date().getTime() + 3000),
			badge : "-1"
		});
	}
	Ti.API.info(JSON.stringify(e));
});

var Loader = require('ui/customUI/Loader');
var loader = new Loader();

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
