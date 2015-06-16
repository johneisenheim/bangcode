function Win(win){
	
	var CustomButton = require('ui/customUI/CustomButton');
	var revengeButton = new CustomButton();
	revengeButton.initialize('Rivincita', 40);
	
	var winSound = ZLSound.createSample({
		media : 'music/winSound.mp3',
		volume : 1.0
	});
	
	var self = Titanium.UI.createScrollView({
		width : '100%',
		height : '100%',
		backgroundColor : '#F5F4F2',
		layout : 'vertical'
	});
	
	var winIMG = Titanium.UI.createImageView({
		top : 50,
		image : 'images/winIMG.png',
		backgroundColor : 'transparent',
		width : johnsLib.calculateWidth(250),
		height : johnsLib.calculateHeight(300)
	});

	var label = Titanium.UI.createLabel({
		text : 'Hai vinto!',
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
		text : 'Hai impiegato '+myTime+' ms per sparare, mentre il tuo avversario ne ha impiegati '+vsTime+'.',
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
	
	closeButton.addEventListener('click', function(){
		win.close();
	});
	
	self.playSound = function(){
		setTimeout(function(){
			winSound.play();
		},1500);
	};
	
	if( myTime == 999999999 || myTime == 888888888 || vsTime == 999999999 || vsTime == 888888888)
		infos.text = '';

	self.add(winIMG);
	self.add(label);
	self.add(infos);
	self.add(revengeButton);
	self.add(closeButton);
	
	return self;
	
}
module.exports = Win;
