function Settings() {
	
	var musicVolume = Ti.App.Properties.getDouble('volume', 0.4)*10;
	var tmp = null;

	var self = Titanium.UI.createWindow({
		navTintColor : 'white',
		tintColor : '#E2BB5A',
		barColor : '#E2BB5A',
		extendEdges : [Ti.UI.EXTEND_EDGE_TOP],
		backgroundColor : '#F5F4F2',
		translucent : true,
		statusBarStyle : Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
		layout : 'composite',
		backButtonTitle : String.format(L('main:back'), '')
	});

	var view = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : '100%',
		height : '100%',
		layout : 'vertical'
	});

	var musicLabel = Titanium.UI.createLabel({
		top : 80,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Volume Musica',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	var slider = Titanium.UI.createSlider({
		top : 20,
		min : 0,
		max : 10,
		width : '70%',
		value : musicVolume
	});
	
	var musicSubtitle = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Il volume della musica si riferisce alla musica di sottofondo dell\'applicazione.',
		textAlign : 'center',
		color : '#aa938b',
		width : '95%'
	});
	
	var ambientLabel = Titanium.UI.createLabel({
		top : 10,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Volume Effetti',
		textAlign : 'center',
		color : '#856C64',
		width : '93%'
	});

	var slider2 = Titanium.UI.createSlider({
		top : 20,
		min : 0,
		max : 10,
		width : '70%',
		value : 5
	});
	
	var ambientSubtitle = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Il volume degli effetti si riferisce agli effetti sonori che vengono riprodotti durante l\'utilizzo dell\'applicazione.',
		textAlign : 'center',
		color : '#aa938b',
		width : '93%'
	});
	
	var separator = Titanium.UI.createLabel({
		text : 'x',
		font : {
			fontSize : 100,
			fontFamily : "Sughayer Separates 4"
		},
		color : '#856C64',
		top : -55
	});
	
	slider.addEventListener('change', function(e){
		tmp = ((e.value)/10).toFixed(1);
		player.volume = tmp;
		Ti.API.info(tmp);
	});
	
	slider.addEventListener('touchend', function(){
		Ti.App.Properties.setDouble('volume',tmp);
		Ti.API.info(player.volume);
	});

	view.add(musicLabel);
	view.add(slider);
	view.add(musicSubtitle);
	view.add(separator);
	view.add(ambientLabel);
	view.add(slider2);
	view.add(ambientSubtitle);

	self.add(view);

	return self;
}

module.exports = Settings;
