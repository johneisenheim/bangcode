function FacebookHandler() {

	var self = {};

	var fb = require('com.facebook');
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
			Ti.API.info('login success: ' + JSON.stringify(e.data));
			if (Titanium.App.Properties.getBool("user_logged")) {

				var profileImage = Titanium.UI.createImageView({
					image : 'https://graph.facebook.com/' + e.data.id + '/picture?width=500&height=500',
					width : 500,
					height : 500
				});
				var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'profile_name.png');
				f.write(profileImage.toBlob());
				
				Ti.API.info(profileImage.image);

				Titanium.App.Properties.setBool("user_logged", 1);
				Titanium.App.Properties.setString("fb_id", e.data.id);
				Titanium.App.Properties.setString("fb_last_name", e.data.last_name);
				Titanium.App.Properties.setString("fb_first_name", e.data.first_name);
				Titanium.App.Properties.setString("fb_mail", e.data.email);
				//{"gender":"male","locale":"it_IT","id":"10205296649568711","updated_time":"2014-10-03T12:30:12+0000","last_name":"Saulino","timezone":1,"email":"nllsaulino@gmail.com","link":"https://www.facebook.com/app_scoped_user_id/10205296649568711/","verified":true,"name":"Nello Saulino","first_name":"Nello"}
				Ti.API.info('Actual permissions: ' + JSON.stringify(fb.permissions));
				//id,locale,gender,email,first_name,last_name,region
				var dataToSend = {
					id : e.data.id,
					locale : e.data.locale,
					gender : e.data.gender,
					email : e.data.email,
					first_name : e.data.first_name,
					last_name : e.data.last_name,
					region : 'not_yet'
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
		Ti.API.info(JSON.stringify(e));
	});

	self.logMeIn = function() {
		fb.authorize();
	};

	self.getInvitableFriends = function() {
		fb.authorize();
		fb.requestWithGraphPath('me/friends', {
			fields : 'installed,name,id'
		}, 'GET', function(e) {
			if (e.success) {
				Ti.API.info('request result Get Friends' + JSON.stringify(e.result.data));
				Ti.App.fireEvent('friends_done', {
					data : JSON.stringify(e.result.data)
				});
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	};
	
	self.getInvitableFriendsForChart = function() {
		fb.authorize();
		fb.requestWithGraphPath('me/friends', {
			fields : 'installed,name,id'
		}, 'GET', function(e) {
			if (e.success) {
				Ti.API.info('request result Get Friends' + JSON.stringify(e.result.data));
				var parsed = JSON.parse(e.result.data);
				var toPush = {
					name : Ti.App.Properties.getString('fb_first_name')+' '+Ti.App.Properties.getString('fb_last_name'),
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

	fb.initialize(6000, true);

	self.logMeOut = function() {
		fb.logout();
	};

	return self;

}

module.exports = FacebookHandler;
