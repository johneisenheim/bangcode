function Lib(){
	
	var self = {};
	
	self.calculateHeight = function(inc){
		return (inc * Titanium.Platform.displayCaps.platformHeight)/667;
	};
	
	self.calculateWidth = function(inc){
		return (inc * Titanium.Platform.displayCaps.platformWidth)/375;
	};
	
	return self;
	
}
module.exports = Lib;
