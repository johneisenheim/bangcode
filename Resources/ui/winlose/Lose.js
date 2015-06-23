function Lose(win) {
	
	var CustomButton = require('ui/customUI/CustomButton');
	var revengeButton = new CustomButton();
	revengeButton.initialize('Rivincita', 40);
	
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
		//text : 'Hai perso!',
		top : 30,
		font : {
			fontSize : 80,
			fontFamily : "Western"
		},
		textAlign : 'center',
		color : '#856C64',
		width : '100%'
	});
	
	if( myTime == 88888888 ){
		label.text = 'Troppo presto!';
	}else if( myTime == 999999999 ){
		label.text = 'Mancato!';
	}else{
		label.text = 'Hai perso!';
	}
	
	var infos = Titanium.UI.createLabel({
		top : 5,
		font : {
			fontSize : 17,
			fontFamily : "Roboto-LightItalic"
		},
		text : 'Hai impiegato '+myTime+'ms per sparare, mentre il tuo avversario ne ha impiegati '+vsTime+'.',
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
		Ti.App.fireEvent('back',{});
		win.close();
	});
	
	self.playSound = function(){
		setTimeout(function(){
			loseSound.play();
		},1500);
	};
	
	self.setLabelText = function(txt){
		Ti.API.info('setLabelText');
		infos.text = txt;
	};
	
	revengeButton.addEventListener('click', function(){
		if( amITheMaster ){
			win.close();
			Ti.App.fireEvent('reloadMasterView',{});
		}else if( !amITheMaster)
			Ti.App.fireEvent('reloadFinderView',{});
	});
	
	if( myTime == 999999999 && vsTime == 999999999 ){
		infos.text = 'Avete perso entrambi...Impara bene gringo, rischi la pelle nel vecchio west!';
	}else if( vsTime == 999999999 ){
		infos.text = 'Hai perso! Hai mancato il tuo avversario che ti ha sparato in '+vsTime+'ms!';
	}
	
	/*if( myTime == 999999999 || myTime == 888888888 || vsTime == 999999999 || vsTime == 888888888)
		infos.text = '';*/

	self.add(loseIMG);
	self.add(label);
	self.add(separator);
	self.add(infos);
	self.add(revengeButton);
	self.add(closeButton);

	return self;

}

module.exports = Lose;
