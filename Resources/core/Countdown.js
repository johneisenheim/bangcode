function Countdown(){
	
	var self = {};
	
	self.countIt = function() {
		var year = 2015;
		var month = 06;
		var day = 17;
		var hours = 00;
		var minutes = 00;
		var seconds = 00;

		setTimeout(function() {
			var endDate = new Date(year, (month - 1), day, hours, minutes, seconds, 00);
			var thisDate = new Date();
			var thisDate = new Date(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate(), thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds(), 00, 00);

			self.daysLeft = parseInt((endDate - thisDate) / 86400000);
			self.hoursLeft = parseInt((endDate - thisDate) / 3600000);
			self.minutesLeft = parseInt((endDate - thisDate) / 60000);
			self.secondsLeft = parseInt((endDate - thisDate) / 1000);

			seconds = self.minutesLeft * 60;
			seconds = self.secondsLeft - seconds;

			minutes = self.hoursLeft * 60;
			minutes = self.minutesLeft - minutes;

			hours = self.daysLeft * 24;
			hours = (self.hoursLeft - hours) < 0 ? 0 : self.hoursLeft - hours;

			days = self.daysLeft;

			startCount(days, hours, minutes, seconds);
		}, 1000);
	};

	function startCount(days, hours, minutes, seconds) {
		Ti.App.fireEvent('update_countdown', {
			days : days,
			hours : hours,
			minutes : minutes,
			seconds : seconds
		});
		Ti.API.info("DAYS " + days + ", HOURS " + hours + ", MINUTES " + minutes + ", SECONDS: " + seconds);
		self.countIt();
	};
	return self;
	
}
module.exports = Countdown;
