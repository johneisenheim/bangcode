function FacebookHandler() {

	var self = {};

	var fb = require('facebook');
	fb.permissions = ['public_profile', 'user_friends', 'email'];
	
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			var parsed = JSON.parse(this.responseText);
			if (parsed.return != -1) {
				global.startApplication();
			} else {
				alert("Error!");
			}
		},
		onerror : function(e) {
			Ti.API.debug(e.error);
		},
		timeout : 5000
	});


	fb.addEventListener('login', function(e) {
		if (e.success) {
			var parsed = JSON.parse(e.data);
			//Ti.API.info('login success: ' + parsed.first_name);
			if (!Titanium.App.Properties.getBool("user_logged")) {

				var profileImage = Titanium.UI.createImageView({
					image : 'https://graph.facebook.com/' + parsed.id + '/picture?width=500&height=500',
					width : 500,
					height : 500
				});
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'profile_name.png');
				f.write(profileImage.toBlob());

				Ti.API.info(profileImage.image);

				Titanium.App.Properties.setBool("user_logged", 1);
				Titanium.App.Properties.setString("fb_id", parsed.id);
				Titanium.App.Properties.setString("fb_last_name", parsed.last_name);
				Titanium.App.Properties.setString("fb_first_name", parsed.first_name);
				Titanium.App.Properties.setString("fb_mail", e.data.email);
				//{"gender":"male","locale":"it_IT","id":"10205296649568711","updated_time":"2014-10-03T12:30:12+0000","last_name":"Saulino","timezone":1,"email":"nllsaulino@gmail.com","link":"https://www.facebook.com/app_scoped_user_id/10205296649568711/","verified":true,"name":"Nello Saulino","first_name":"Nello"}
				//Ti.API.info('Actual permissions: ' + JSON.stringify(fb.permissions));
				//id,locale,gender,email,first_name,last_name,region
				//Ti.API.info(' first name: '+e.data.first_name);
				var dataToSend = {
					id : parsed.id,
					locale : parsed.locale,
					gender : parsed.gender,
					email : parsed.email,
					first_name : parsed.first_name,
					last_name : parsed.last_name,
					region : 'null'
				};
				Ti.API.info(dataToSend);
				client.open("GET", global.bangServerUrl + '/user-registerUser.php?user_account=' + JSON.stringify(dataToSend));
				client.send();
			}
		} else if (e.cancelled) {
			Ti.API.info('login cancelled');
		} else if (e.error) {
			Ti.API.info(e.error);
		}
	});

	fb.addEventListener('logout', function(e) {
		if (e.success) {
			Titanium.App.Properties.removeProperty("user_logged");
			Titanium.App.Properties.removeProperty("fb_id");
			Titanium.App.Properties.removeProperty("fb_last_name");
			Titanium.App.Properties.removeProperty("fb_first_name");
			Titanium.App.Properties.removeProperty("fb_mail");
		} else if (e.cancelled) {
			Ti.API.info('login cancelled');
		} else if (e.error) {
			Ti.API.info(e.error);
		}
	});

	self.getInvitableFriends = function() {
		if (fb.getLoggedIn()) {
			Ti.API.info('App is still logged, I\'m getting cached login session.');
			fb.initialize(5000);
		} else {
			Ti.API.info('App is authorizing...');
			fb.authorize();
		}
		fb.requestWithGraphPath('me/friends', {
			fields : 'installed,name,id'
		}, 'GET', function(e) {
			Ti.API.info('e is '+ JSON.stringify(e));
			var parsed = JSON.parse(e.result);
			if (e.success) {
				Ti.API.info('request result Get Friends' + JSON.stringify(parsed.data));
				Ti.App.fireEvent('friends_done', {
					data : JSON.stringify(parsed.data)
				});
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	};

	self.getInvitableFriendsForChart = function() {
		fb.initialize(5000);
		fb.requestWithGraphPath('me/friends', {
			fields : 'installed,name,id'
		}, 'GET', function(e) {
			if (e.success) {
				var parsed = JSON.parse(e.result);
				var toPush = {
					name : Ti.App.Properties.getString('fb_first_name') + ' ' + Ti.App.Properties.getString('fb_last_name'),
					id : Ti.App.Properties.getString('fb_id')
				};
				parsed.push(toPush);
				return parsed;
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	};

	self.logMeIn = function() {
		if (fb.getLoggedIn()) {
			Ti.API.info('App is still logged, I\'m getting cached login session.');
			fb.initialize(5000);
		} else {
			Ti.API.info('App is authorizing...');
			fb.authorize();
		}
	};

	return self;

}

module.exports = FacebookHandler;
