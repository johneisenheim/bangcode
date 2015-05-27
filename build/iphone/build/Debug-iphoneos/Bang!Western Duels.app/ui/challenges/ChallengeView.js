function ChallengeView(tables) {

	var CustomButton = require('ui/customUI/CustomButton');
	var startChallengeButton = new CustomButton();
	var PageTitle = require('ui/customUI/PageTitle');
	var pageTitle = new PageTitle();
	pageTitle.initialize('Sfide', 0);
	var firstPostlayout = true;
	var table1Added = false;
	var table2Added = false;
	var table3Added = false;
	var table4Added = false;
	var noTables = null;

	var self = Titanium.UI.createScrollView({
		backgroundColor : '#F5F4F2',
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		layout : 'vertical',
		top : 65
	});

	var instructionLabel = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 20,
			fontFamily : "Roboto-Light"
		},
		text : 'Ecco l\'elenco delle sfide che hai inviato e che hai ricevuto. Esegui un tap su una di loro per visualizzare i dettagli.',
		textAlign : 'center',
		color : '#856C64',
		width : '95%'
	});

	self.add(pageTitle);
	self.add(instructionLabel);

	if (tables[0] != null) {
		table1Added = true;
		self.add(tables[0]);
		var subtitle = Titanium.UI.createLabel({
			top : 5,
			font : {
				fontSize : 17,
				fontFamily : "Roboto-LightItalic"
			},
			text : 'Questa tabella mostra le sfide che sono pronte per essere giocate.',
			textAlign : 'center',
			color : '#aa938b',
			width : '95%'
		});
		self.add(subtitle);
	}
	if (tables[1] != null) {
		table2Added = true;
		self.add(tables[1]);
		var subtitle = Titanium.UI.createLabel({
			top : 5,
			font : {
				fontSize : 17,
				fontFamily : "Roboto-LightItalic"
			},
			text : 'In questa tabella sono elencate le sfide che devi accettare o negoziare.',
			textAlign : 'center',
			color : '#aa938b',
			width : '95%'
		});
		self.add(subtitle);
	}
	if (tables[2] != null) {
		table3Added = true;
		self.add(tables[2]);
		var subtitle = Titanium.UI.createLabel({
			top : 5,
			font : {
				fontSize : 17,
				fontFamily : "Roboto-LightItalic"
			},
			text : 'Qui ci sono le sfide che sono in attesa di accettazione da parte dello sfidante.',
			textAlign : 'center',
			color : '#aa938b',
			width : '95%'
		});
		self.add(subtitle);
	}
	if (tables[3] != null) {
		table4Added = true;
		self.add(tables[3]);
		var subtitle = Titanium.UI.createLabel({
			top : 5,
			font : {
				fontSize : 17,
				fontFamily : "Roboto-LightItalic"
			},
			text : 'Ecco le sfide che sono state rifiutate dallo sfidante.',
			textAlign : 'center',
			color : '#aa938b',
			width : '95%'
		});
		self.add(subtitle);
	}
	if (!table1Added && !table2Added && !table3Added && !table4Added) {
		noTables = Titanium.UI.createLabel({
			top : '30%',
			font : {
				fontSize : 18,
				fontFamily : "Roboto-Light"
			},
			text : 'Nessuna sfida inviata/ricevuta.',
			textAlign : 'center',
			color : '#856C64',
			width : '95%'
		});
		self.add(noTables);
	}
	
	var fakeView = Titanium.UI.createView({
		width : 1,
		height : 20,
		backgroundColor : 'transparent',
		top : 1 
	});
	
	self.add(fakeView);

	return self;
}

module.exports = ChallengeView;
