function Settings() {

	var musicVolume = Ti.App.Properties.getDouble('volume', 0.4) * 10;
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

	slider.addEventListener('change', function(e) {
		tmp = ((e.value) / 10).toFixed(1);
		player.volume = tmp;
		Ti.API.info(tmp);
	});

	slider.addEventListener('touchend', function() {
		Ti.App.Properties.setDouble('volume', tmp);
		Ti.API.info(player.volume);
	});

	var headerView1 = Titanium.UI.createView({
		backgroundColor : '#E2BB5A',
		width : '100%',
		height : 30,
		layout : 'horizontal'
	});

	var headerView1Title = Titanium.UI.createLabel({
		left : 10,
		top : 3,
		font : {
			fontSize : 19,
			fontFamily : "Roboto-Light"
		},
		text : 'Musica',
		textAlign : 'center',
		color : 'white'
	});

	headerView1.add(headerView1Title);

	var sectionMusic = Ti.UI.createTableViewSection({
		headerView : headerView1
	});

	var track1row = Ti.UI.createTableViewRow({
		title : 'Il buono, il brutto e il cattivo',
		height : 45,
		color : '#856C64',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		index : 1
	});
	sectionMusic.add(track1row);
	var track2row = Ti.UI.createTableViewRow({
		title : 'Per un pugno di dollari',
		height : 45,
		color : '#856C64',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		index : 2
	});
	sectionMusic.add(track2row);
	var track3row = Ti.UI.createTableViewRow({
		title : 'Lo chiamavano Trinità',
		height : 45,
		color : '#856C64',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		index : 3
	});
	sectionMusic.add(track3row);
	var track4row = Ti.UI.createTableViewRow({
		title : 'Bang Bang(My baby shot me down)',
		height : 45,
		color : '#856C64',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		index : 4
	});
	sectionMusic.add(track4row);
	var track5row = Ti.UI.createTableViewRow({
		title : 'Mashup',
		height : 45,
		color : '#856C64',
		font : {
			fontSize : 18,
			fontFamily : "Roboto-Light"
		},
		index : 5
	});
	sectionMusic.add(track5row);

	switch(track) {
	case 1:
		track1row.hasCheck = true;
		track2row.hasCheck = false;
		track3row.hasCheck = false;
		track4row.hasCheck = false;
		track5row.hasCheck = false;
		break;
	case 2:
		track1row.hasCheck = false;
		track2row.hasCheck = true;
		track3row.hasCheck = false;
		track4row.hasCheck = false;
		track5row.hasCheck = false;
		break;
	case 3:
		track1row.hasCheck = false;
		track2row.hasCheck = false;
		track3row.hasCheck = true;
		track4row.hasCheck = false;
		track5row.hasCheck = false;
		break;
	case 4:
		track1row.hasCheck = false;
		track2row.hasCheck = false;
		track3row.hasCheck = false;
		track4row.hasCheck = true;
		track5row.hasCheck = false;
		break;
	case 5:
		track1row.hasCheck = false;
		track2row.hasCheck = false;
		track3row.hasCheck = false;
		track4row.hasCheck = false;
		track5row.hasCheck = true;
		break;
	}

	var table = Ti.UI.createTableView({
		data : [sectionMusic],
		top : 40,
		width : '100%',
		height : 255,
		showVerticalScrollIndicator : true,
		separatorColor : '#B8B1AF',
		backgroundColor : '#FDFDFD',
		scrollable : false,
		selectionStyle : Titanium.UI.iPhone.TableViewCellSelectionStyle.GRAY
	});

	table.addEventListener('click', function(e) {

		switch(e.rowData.index) {
		case 1:
			track1row.hasCheck = true;
			track2row.hasCheck = false;
			track3row.hasCheck = false;
			track4row.hasCheck = false;
			track5row.hasCheck = false;
			player.stop();
			Ti.App.Properties.setInt('track', 1);
			player.media = 'music/track1.mp3';
			player.play();
			break;
		case 2:
			track1row.hasCheck = false;
			track2row.hasCheck = true;
			track3row.hasCheck = false;
			track4row.hasCheck = false;
			track5row.hasCheck = false;
			player.stop();
			Ti.App.Properties.setInt('track', 2);
			player.media = 'music/track2.mp3';
			player.play();
			break;
		case 3:
			track1row.hasCheck = false;
			track2row.hasCheck = false;
			track3row.hasCheck = true;
			track4row.hasCheck = false;
			track5row.hasCheck = false;
			player.stop();
			Ti.App.Properties.setInt('track', 3);
			player.media = 'music/track3.mp3';
			player.play();
			break;
		case 4:
			track1row.hasCheck = false;
			track2row.hasCheck = false;
			track3row.hasCheck = false;
			track4row.hasCheck = true;
			track5row.hasCheck = false;
			player.stop();
			Ti.App.Properties.setInt('track', 4);
			player.media = 'music/track4.mp3';
			player.play();
			break;
		case 5:
			track1row.hasCheck = false;
			track2row.hasCheck = false;
			track3row.hasCheck = false;
			track4row.hasCheck = false;
			track5row.hasCheck = true;
			player.stop();
			Ti.App.Properties.setInt('track', 5);
			player.media = 'music/track5.mp3';
			player.play();
			break;
		}

	});

	view.add(musicLabel);
	view.add(slider);
	view.add(musicSubtitle);
	view.add(separator);
	view.add(ambientLabel);
	view.add(slider2);
	view.add(ambientSubtitle);

	view.add(table);

	self.add(view);

	return self;
}

module.exports = Settings;
