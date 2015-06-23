function TrainingLose(win){
	
	var CustomButton = require('ui/customUI/CustomButton');
	var retryButton = new CustomButton();
	retryButton.initialize('Riprova', 40);
	
	var loseSound = ZLSound.createSample({
		media : 'music/loseSound.mp3',
		volume : 1.0
	});

	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	/*var loseIMG = Titanium.UI.createImageView({
		top : 50,
		image : 'images/loseIMG.png',
		backgroundColor : 'transparent',
		width : johnsLib.calculateWidth(250),
		height : johnsLib.calculateHeight(212)
	});*/
	
	var loseIMG = Titanium.UI.createImageView({
		top : 50,
		image : 'images/holes.png',
		backgroundColor : 'transparent',
		width : johnsLib.calculateWidth(260),
		height : johnsLib.calculateHeight(251)
	});

	var label = Titanium.UI.createLabel({
		text : 'Fault!',
		top : 30,
		font : {
			fontSize : 80,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});
	
	var infos = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Hai sparato troppo presto! Attendi il suono della campanella prima di sparare. In un duello reale, sparare prima ti porterà alla sconfitta!',
		textAlign : 'center',
		color : '#aa938b',
		width : '85%'
	});
	
	var closeButton = Titanium.UI.createButton({
		title : 'Chiudi',
		font : {
			fontSize : 19
		},
		color : '#856C64',
		top : 10
	});
	
	var separator = Titanium.UI.createLabel({
		text:'x',
		font:{
     		fontSize:130,
      		fontFamily:"Sughayer Separates 4"
   		},
   		color:'#856C64',
   		top:-85
	});
	
	closeButton.addEventListener('click', function(){
		//Ti.App.fireEvent('back',{});
		win.close();
	});
	
	self.playSound = function(){
		setTimeout(function(){
			loseSound.play();
		},1500);
	};
	
	retryButton.addEventListener('click', function(){
		win.close();
		Ti.App.fireEvent('training_reload',{});
	});

	self.add(loseIMG);
	self.add(label);
	self.add(separator);
	self.add(infos);
	self.add(retryButton);
	self.add(closeButton);

	return self;
	
}

module.exports = TrainingLose;
