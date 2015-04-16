function Picker() {

	var self = Titanium.UI.createView({
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		//top : Titanium.Platform.displayCaps.platformHeight,
		bottom:-250,
		zIndex : 10,
		backgroundColor : 'white'
	});

	var picker = Ti.UI.createPicker({
		type : Ti.UI.PICKER_TYPE_DATE_AND_TIME,
		minDate : new Date(),
		maxDate : new Date(2018, 12, 31),
		value : new Date(),
		top : 0,
		visible : true
	});

	var done = Ti.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.DONE
	});

	var spacer = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	done.addEventListener('click', function() {
		var date = picker.getValue();
		var hourFormat = date.toLocaleTimeString();
		var hourToShow = hourFormat.split(':');
		Ti.App.fireEvent('close_picker',{ date: date.toLocaleDateString() + " "+ hourToShow[0] + ":" + hourToShow[1]});
	});

	var toolView = Ti.UI.iOS.createToolbar({
		items : [spacer,done],
		top : 0,
		borderTop : true,
		borderBottom : false,
		barColor : '#E2BB5A',
		tintColor: 'white'
	});

	self.add(toolView);
	self.add(picker);
	
	self.isShown = false;

	return self;
}

module.exports = Picker;
