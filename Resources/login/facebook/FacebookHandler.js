function FacebookHandler() {

	var self = {};

	var fb = require('com.facebook');
	fb.permissions = ['public_profile', 'user_friends', 'email'];

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			global.startApplication();
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000
	});

	fb.addEventListener('login', function(e) {
		if (e.success) {
			Ti.API.info('login success: ' + JSON.stringify(e.data));
			Titanium.App.Properties.setBool("user_logged", 1);
			Titanium.App.Properties.setString("fb_id", e.data.id);
			Titanium.App.Properties.setString("fb_last_name", e.data.last_name);
			Titanium.App.Properties.setString("fb_first_name", e.data.fb_first_name);
			Titanium.App.Properties.setString("fb_mail", e.data.email);
			//{"gender":"male","locale":"it_IT","id":"10205296649568711","updated_time":"2014-10-03T12:30:12+0000","last_name":"Saulino","timezone":1,"email":"nllsaulino@gmail.com","link":"https://www.facebook.com/app_scoped_user_id/10205296649568711/","verified":true,"name":"Nello Saulino","first_name":"Nello"}
			Ti.API.info('Actual permissions: ' + JSON.stringify(fb.permissions));
			Ti.API.info(global.bangServerUrl+'/registerUser.php?user_account='+JSON.stringify(e.data));
			client.open("GET", global.bangServerUrl+'/registerUser.php?user_account='+JSON.stringify(e.data));
			client.send();
		} else if (e.cancelled) {
			Ti.API.info('login cancelled');
		} else if (e.error) {
			Ti.API.info(e.error);
		}
	});
	
	fb.addEventListener('logout', function(e) {
		Ti.API.info(JSON.stringify(e));
	});

	self.logMeIn = function() {
		fb.authorize();
	};

	self.getInvitableFriends = function() {
		fb.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
			if (e.success) {
				alert(e.result);
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	};

	fb.initialize(6000, true);

	self.logMeOut = function() {
		fb.logout();
	};

	return self;

}

module.exports = FacebookHandler;
